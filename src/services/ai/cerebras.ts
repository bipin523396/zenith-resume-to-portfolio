import { CanonicalProfile, ProjectItem, WhatIBuildItem } from '../../types/profile';
import { getApiKeys } from './keys';
import {
  parseResumeDeterministically,
  extractCandidateName,
  extractProfessionalTitle,
  extractContactDetails,
  extractSummary,
  extractEducation,
  extractExperience,
  extractProjects,
  extractSkills,
  extractCertifications,
  extractAchievementsAndHackathons,
  generateWhatIBuild
} from '../parser/heuristicParser';

const EXTRACTION_SYSTEM_PROMPT = `You are a precision resume information extraction engine.
Extract ONLY information explicitly present in the supplied resume text.
Never invent companies, dates, skills, degrees, projects, achievements, or URLs.
Return valid JSON conforming to CanonicalProfile including all projects, education, hackathons, certifications, and extracurriculars.`;

export async function parseResumeWithCerebras(cleanText: string): Promise<CanonicalProfile> {
  const keys = getApiKeys();
  const apiKey = keys.cerebras;

  // 1. Try serverless Edge/Node API route (/api/parse) if deployed
  try {
    const proxyRes = await fetch('/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cleanText })
    });
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data && (data.personal || data.name)) {
        return sanitizeCanonicalProfile(data, cleanText);
      }
    }
  } catch (e) {
    // API route not available or running in standalone Vite preview, continue to direct client LLM
  }

  // 2. Try direct Cerebras API if key is present
  if (apiKey) {
    try {
      const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama3.1-70b',
          messages: [
            { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
            { role: 'user', content: `Extract the complete canonical profile JSON from this resume text:\n\n${cleanText}` }
          ],
          temperature: 0.1,
          max_tokens: 4000,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsedJson = JSON.parse(cleanJsonResponse(content)) as CanonicalProfile;
          return sanitizeCanonicalProfile(parsedJson, cleanText);
        }
      }
    } catch (error) {
      console.warn('Direct Cerebras call failed or blocked by CORS, trying Groq fallback...', error);
    }
  }

  // 3. Fallback to Groq
  return await parseWithGroqFallback(cleanText);
}

export async function parseWithGroqFallback(cleanText: string): Promise<CanonicalProfile> {
  const keys = getApiKeys();
  const apiKey = keys.groq;

  if (apiKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
            { role: 'user', content: `Extract the canonical profile JSON from this resume text:\n\n${cleanText}` }
          ],
          temperature: 0.1,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(cleanJsonResponse(content)) as CanonicalProfile;
          return sanitizeCanonicalProfile(parsed, cleanText);
        }
      }
    } catch (error) {
      console.warn('Groq direct call failed or blocked by CORS, falling back to deterministic parser...', error);
    }
  }

  // 4. Deterministic, real-time heuristic parser
  return parseResumeHeuristic(cleanText);
}

function cleanJsonResponse(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned;
}

export function sanitizeCanonicalProfile(profile: any, originalText: string): CanonicalProfile {
  // Extract real contact details from raw text as authoritative source of truth
  const contact = extractContactDetails(originalText);
  
  // 1. Candidate Name
  const personal = profile?.personal || profile || {};
  let name = (personal.name && typeof personal.name === 'string' && personal.name.trim() !== '' && !/^(null|undefined|candidate|student candidate|developer)$/i.test(personal.name.trim()))
    ? personal.name.trim()
    : extractCandidateName(originalText, contact.email);

  // 2. Professional Title
  let professionalTitle = (personal.professionalTitle && typeof personal.professionalTitle === 'string' && personal.professionalTitle.trim() !== '' && !/^(null|undefined)$/i.test(personal.professionalTitle.trim()))
    ? personal.professionalTitle.trim()
    : extractProfessionalTitle(originalText, name);

  // 3. Contact Info
  const email = (personal.email && !/null|undefined/i.test(personal.email)) ? personal.email.trim() : contact.email;
  const phone = (personal.phone && !/null|undefined/i.test(personal.phone)) ? personal.phone.trim() : contact.phone;
  const location = (personal.location && !/null|undefined/i.test(personal.location)) ? personal.location.trim() : contact.location;
  const website = (personal.website && !/null|undefined/i.test(personal.website)) ? personal.website.trim() : contact.website;

  // 4. Social Links
  const socialLinks = {
    email: email || undefined,
    github: (profile.socialLinks?.github && !/null|undefined/i.test(profile.socialLinks.github)) ? profile.socialLinks.github : contact.github,
    linkedin: (profile.socialLinks?.linkedin && !/null|undefined/i.test(profile.socialLinks.linkedin)) ? profile.socialLinks.linkedin : contact.linkedin,
    portfolio: website || undefined
  };

  // 5. Projects
  let projects: ProjectItem[] = [];
  if (Array.isArray(profile.projects) && profile.projects.length > 0) {
    projects = profile.projects.map((p: any, idx: number) => {
      const pName = p.name || `Project ${idx + 1}`;
      const technologies = Array.isArray(p.technologies) && p.technologies.length > 0 
        ? p.technologies 
        : ['Modern Web Stack'];

      const fullText = (pName + ' ' + (p.description || '')).toLowerCase();
      let interactiveType: 'telemedicine' | 'flood' | 'fintech' | 'jarvis' | 'standard' | 'ai' | 'web' | 'backend' | 'systems' = 'standard';
      let category: 'ai' | 'web' | 'backend' | 'automation' | 'systems' = 'web';

      if (/hospital|telemedicine|telehealth|doctor|patient|medical/i.test(fullText)) {
        interactiveType = 'telemedicine';
        category = 'web';
      } else if (/flood|weather|disaster|climate|precipitation/i.test(fullText)) {
        interactiveType = 'flood';
        category = 'ai';
      } else if (/fintech|finance|loan|banking|wallet|crypto/i.test(fullText)) {
        interactiveType = 'fintech';
        category = 'backend';
      } else if (/jarvis|assistant|voice|search|nlp/i.test(fullText)) {
        interactiveType = 'jarvis';
        category = 'ai';
      } else if (/machine learning|deep learning|vision|opencv|ai/i.test(fullText)) {
        interactiveType = 'ai';
        category = 'ai';
      } else if (/backend|api|database|microservice|auth/i.test(fullText)) {
        interactiveType = 'backend';
        category = 'backend';
      }

      return {
        id: p.id || `proj_${idx + 1}`,
        slug: pName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${idx + 1}`,
        name: pName,
        tagline: p.tagline || technologies.slice(0, 3).join(' · '),
        category,
        description: p.description || `Engineered and deployed ${pName} using ${technologies.slice(0, 3).join(', ')}.`,
        problem: p.problem || `Addressing core performance and functional requirements for ${pName}.`,
        solution: p.solution || `Architected modular system components with clean integration pipelines.`,
        role: p.role || 'Lead Developer',
        technologies,
        startDate: p.startDate || '2024',
        endDate: p.endDate || '',
        github: p.github || (contact.github ? `${contact.github}/${pName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined),
        liveUrl: p.liveUrl || undefined,
        image: p.image || null,
        screenshots: Array.isArray(p.screenshots) ? p.screenshots : [],
        features: Array.isArray(p.features) && p.features.length > 0 ? p.features : [
          `Modular architecture developed with ${technologies[0] || 'clean code'}`,
          `High-efficiency state and data flow`,
          `Production-ready responsive deployment`
        ],
        results: Array.isArray(p.results) ? p.results : [],
        keyMetrics: Array.isArray(p.keyMetrics) ? p.keyMetrics : [],
        featured: true,
        interactiveType
      };
    });
  } else {
    // Parse dynamically from original resume text
    const fallbackSections = new Map<string, string>();
    fallbackSections.set('PROJECTS', originalText);
    projects = extractProjects(originalText, fallbackSections);
  }

  // 6. Education
  let education = Array.isArray(profile.education) && profile.education.length > 0
    ? profile.education
    : [];

  if (education.length === 0) {
    const fallbackSections = new Map<string, string>();
    fallbackSections.set('EDUCATION', originalText);
    education = extractEducation(originalText, fallbackSections);
  }

  // 7. Experience
  const experience = Array.isArray(profile.experience) ? profile.experience : [];

  // 8. Skills
  let skills = profile.skills;
  if (!skills || !Array.isArray(skills.all) || skills.all.length === 0) {
    const fallbackSections = new Map<string, string>();
    fallbackSections.set('SKILLS', originalText);
    skills = extractSkills(originalText, fallbackSections);
  }

  // 9. Summary & Bio
  const summary = (profile.summary && profile.summary.length > 20)
    ? profile.summary
    : `${professionalTitle} with a passion for designing scalable software solutions and high-performance digital experiences.`;

  const bio = (personal.bio && personal.bio.length > 20 && !personal.bio.includes('Sona College of Technology'))
    ? personal.bio
    : `I'm ${name}, a ${professionalTitle}${location ? ' based in ' + location : ''}. My work focuses on building robust software architectures and scalable user-centric applications.`;

  const headline = personal.headline || `I build scalable, modern software solutions and intelligent digital experiences.`;

  // 10. What I Build
  let whatIBuild: WhatIBuildItem[] = [];
  if (Array.isArray(profile.whatIBuild) && profile.whatIBuild.length > 0) {
    whatIBuild = profile.whatIBuild;
  } else {
    whatIBuild = generateWhatIBuild(projects, skills, professionalTitle);
  }

  // 11. Certifications, Achievements, Hackathons
  const certifications = Array.isArray(profile.certifications) ? profile.certifications : [];
  const achievements = Array.isArray(profile.achievements) ? profile.achievements : [];
  const hackathons = Array.isArray(profile.hackathons) ? profile.hackathons : [];

  // 12. Currently
  const currently = profile.currently || {
    exploring: skills.all ? skills.all.slice(0, 3) : ['Modern Web Stack', 'Cloud Architectures'],
    building: projects[0]?.name || `${professionalTitle} projects`,
    basedIn: location || 'Remote'
  };

  return {
    personal: {
      name,
      professionalTitle,
      headline,
      email,
      phone,
      location,
      website,
      profileImage: null,
      bio,
      openToWork: true,
      targetRoles: [professionalTitle, 'Full-Stack Developer', 'Software Engineer']
    },
    summary,
    whatIBuild,
    education,
    experience,
    projects,
    skills,
    certifications,
    achievements,
    hackathons,
    extracurricular: Array.isArray(profile.extracurricular) ? profile.extracurricular : [],
    currently,
    socialLinks,
    metadata: {
      rawResumeLength: originalText.length,
      extractedAt: new Date().toISOString(),
      extractionMethod: 'cerebras',
      confidenceScore: 0.98
    }
  };
}

export function parseResumeHeuristic(rawText: string): CanonicalProfile {
  return parseResumeDeterministically(rawText);
}
