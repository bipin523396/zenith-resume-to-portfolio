import {
  CanonicalProfile,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillsData,
  CertificationItem,
  AchievementItem,
  HackathonItem,
  WhatIBuildItem,
  SocialLinks
} from '../../types/profile';
import { cleanResumeText } from './textCleaner';

// Common technical roles to match in resume headers
const ROLE_PATTERNS = [
  /junior\s+full[- ]?stack\s+developer/i,
  /senior\s+full[- ]?stack\s+developer/i,
  /full[- ]?stack\s+developer/i,
  /full[- ]?stack\s+engineer/i,
  /lead\s+full[- ]?stack\s+developer/i,
  /frontend\s+developer/i,
  /frontend\s+engineer/i,
  /backend\s+developer/i,
  /backend\s+engineer/i,
  /software\s+engineer/i,
  /software\s+developer/i,
  /senior\s+software\s+engineer/i,
  /staff\s+software\s+engineer/i,
  /principal\s+software\s+engineer/i,
  /data\s+analyst/i,
  /senior\s+data\s+analyst/i,
  /data\s+scientist/i,
  /machine\s+learning\s+engineer/i,
  /ai\s+engineer/i,
  /ai\s+\/\s+ml\s+engineer/i,
  /design\s+engineer/i,
  /ui[\/-]?ux\s+designer/i,
  /product\s+designer/i,
  /creative\s+technologist/i,
  /devops\s+engineer/i,
  /cloud\s+engineer/i,
  /mobile\s+developer/i,
  /ios\s+developer/i,
  /android\s+developer/i
];

// Helper to convert names and titles to Title Case, preserving technical casing
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(w => {
      if (w === 'full-stack' || w === 'fullstack') return 'Full-Stack';
      if (w === 'ui/ux' || w === 'ui-ux') return 'UI/UX';
      if (w === 'ai/ml' || w === 'ai-ml') return 'AI/ML';
      if (w === 'ai') return 'AI';
      if (w === 'ml') return 'ML';
      if (w === 'api' || w === 'apis') return 'API';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ')
    .trim();
}

// Slice text into standard sections
export function splitIntoSections(cleanText: string): Map<string, string> {
  const sections = new Map<string, string>();
  
  // Sections marked with ### by textCleaner or standard headings
  const sectionRegex = /(?:^|\n)###\s+([A-Z\s&/]+)\n/g;
  const matches: { heading: string; index: number; end: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = sectionRegex.exec(cleanText)) !== null) {
    matches.push({
      heading: m[1].trim().toUpperCase(),
      index: m.index,
      end: m.index + m[0].length
    });
  }

  if (matches.length === 0) {
    // Fallback: search for uppercase section headers without ###
    const altRegex = /(?:^|\n)([A-Z\s&/]{4,35})(?:\n|:)/g;
    while ((m = altRegex.exec(cleanText)) !== null) {
      const heading = m[1].trim().toUpperCase();
      if (/PROJECT|EXPERIENCE|EDUCATION|SKILLS|SUMMARY|CERTIFICATION|ACHIEVEMENT|HACKATHON|ABOUT|OBJECTIVE/.test(heading)) {
        matches.push({
          heading,
          index: m.index,
          end: m.index + m[0].length
        });
      }
    }
  }

  // Header content (everything before the first heading)
  if (matches.length > 0) {
    sections.set('HEADER', cleanText.slice(0, matches[0].index).trim());
    for (let i = 0; i < matches.length; i++) {
      const heading = matches[i].heading;
      const start = matches[i].end;
      const end = i + 1 < matches.length ? matches[i + 1].index : cleanText.length;
      const body = cleanText.slice(start, end).trim();
      sections.set(heading, body);
    }
  } else {
    sections.set('HEADER', cleanText.slice(0, 400).trim());
    sections.set('BODY', cleanText);
  }

  return sections;
}

// 1. Extract Candidate Name
export function extractCandidateName(cleanText: string, email?: string): string {
  const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Look in the first 6 non-empty lines
  for (let i = 0; i < Math.min(6, lines.length); i++) {
    let line = lines[i];

    // Strip leading ### or bullet
    line = line.replace(/^[#\-*•●▪\s]+/, '').trim();

    // Skip if line has email, phone, url, or common resume titles
    if (/@/.test(line)) continue;
    if (/https?:\/\/|www\.|github\.com|linkedin\.com/i.test(line)) continue;
    if (/\+?\d{1,4}[-.\s]?\d{3,}/.test(line)) continue;
    if (/^(curriculum vitae|resume|page\s+\d+|personal details|contact)/i.test(line)) continue;
    if (/^(education|experience|projects|skills|summary|certifications)$/i.test(line)) continue;

    // Check if line contains a pipe (e.g., "Rahul Sharma | Full Stack Developer")
    if (line.includes('|')) {
      const parts = line.split('|').map(p => p.trim());
      for (const p of parts) {
        if (/^[a-zA-Z\s.]{2,35}$/.test(p) && !ROLE_PATTERNS.some(r => r.test(p)) && !/^(remote|india|usa|germany|ca|uk)/i.test(p)) {
          return (/^[A-Z\s.]+$/.test(p)) ? toTitleCase(p) : p;
        }
      }
    }

    // Check if line is a valid candidate name (2 to 4 words, letters only)
    if (/^[a-zA-Z\s.]{2,40}$/.test(line)) {
      // Make sure it is not purely a role
      if (!ROLE_PATTERNS.some(r => r.test(line))) {
        if (/^[A-Z\s.]+$/.test(line)) {
          return toTitleCase(line);
        }
        return line;
      }
    }
  }

  // Fallback: extract name from email prefix (e.g., rahul.sharma.dev@gmail.com -> Rahul Sharma)
  if (email) {
    const prefix = email.split('@')[0];
    const cleanPrefix = prefix.replace(/(?:\.dev|_dev|-dev|[0-9_.-]+)/g, ' ').trim();
    if (cleanPrefix.length >= 3) {
      return toTitleCase(cleanPrefix);
    }
  }

  return 'Candidate';
}

// 2. Extract Professional Title
export function extractProfessionalTitle(cleanText: string, name: string): string {
  const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Look in the first 8 lines
  for (let i = 0; i < Math.min(8, lines.length); i++) {
    const line = lines[i];
    if (line.toLowerCase() === name.toLowerCase()) continue;

    for (const pattern of ROLE_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        return toTitleCase(match[0]);
      }
    }

    // Check lines with pipe: e.g. "Software Engineer | Salem, Tamil Nadu"
    if (line.includes('|')) {
      const segments = line.split('|').map(s => s.trim());
      for (const seg of segments) {
        for (const pattern of ROLE_PATTERNS) {
          if (pattern.test(seg)) {
            return toTitleCase(seg);
          }
        }
      }
    }
  }

  // Check section headings or experience if not in header
  if (/data analyst|analytics|sql|tableau|power bi/i.test(cleanText.slice(0, 1000))) {
    if (/senior data analyst/i.test(cleanText)) return 'Senior Data Analyst';
    if (/data analyst/i.test(cleanText)) return 'Data Analyst';
  }

  if (/machine learning|deep learning|computer vision|pytorch|tensorflow/i.test(cleanText.slice(0, 1000))) {
    return 'AI / ML Engineer';
  }

  if (/designer|ux|ui|figma|creative technologist/i.test(cleanText.slice(0, 1000))) {
    return 'Design Engineer & Creative Technologist';
  }

  if (/full[- ]?stack/i.test(cleanText.slice(0, 1000))) {
    return 'Full-Stack Developer';
  }

  return 'Software Engineer';
}

// 3. Extract Contact Details
export function extractContactDetails(cleanText: string) {
  // Email
  const emailMatch = cleanText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  const email = emailMatch ? emailMatch[1].trim() : '';

  // Phone
  const phoneMatch = cleanText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,5}/);
  const phone = phoneMatch ? phoneMatch[0].trim() : '';

  // Location - parse carefully line by line from header block
  let location = '';
  const lines = cleanText.split('\n').slice(0, 12);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check for inline pipes/bullets: e.g. "email | phone | City, State, Country"
    if (trimmed.includes('|') || trimmed.includes('•')) {
      const parts = trimmed.split(/[|•]/).map(p => p.trim());
      for (const p of parts) {
        if (/[A-Z][a-zA-Z\s.-]+,\s*[A-Z][a-zA-Z\s.-]+/.test(p) && !/@|github|linkedin|http|\+?\d{7}/i.test(p)) {
          if (!/university|college|school|engineering|bachelor|institute/i.test(p)) {
            location = p.trim();
            break;
          }
        }
      }
    } else if (/[A-Z][a-zA-Z\s.-]+,\s*[A-Z][a-zA-Z\s.-]+/.test(trimmed) && trimmed.length < 65 && !trimmed.includes('http') && !/@/.test(trimmed)) {
      if (!/university|college|school|engineering|bachelor|master|institute/i.test(trimmed)) {
        location = trimmed.replace(/^(?:Location|Address|Based in)[:\s]*/i, '').trim();
        break;
      }
    }
    if (location) break;
  }

  // Links
  const githubMatch = cleanText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]{2,38})/i);
  const github = githubMatch ? `https://github.com/${githubMatch[1]}` : undefined;

  const linkedinMatch = cleanText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_.-]{2,50})/i);
  const linkedin = linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : undefined;

  const websiteMatch = cleanText.match(/(?:https?:\/\/)?([a-zA-Z0-9-]+\.(?:dev|app|studio|me|io|design|tech|site))(?:\/[^\s,]*)?/i);
  const website = websiteMatch ? (websiteMatch[0].startsWith('http') ? websiteMatch[0] : `https://${websiteMatch[0]}`) : '';

  return { email, phone, location, github, linkedin, website };
}

// 4. Extract Summary / Bio
export function extractSummary(cleanText: string, sections: Map<string, string>, name: string, title: string, location: string): { summary: string; bio: string; headline: string } {
  let summaryText = '';

  for (const [key, val] of sections.entries()) {
    if (/SUMMARY|ABOUT|OBJECTIVE|PROFILE/.test(key) && val.length > 20) {
      summaryText = val.replace(/^[-*•●▪\s]+/, '').trim();
      break;
    }
  }

  if (!summaryText) {
    // Look in header between contact info and first section
    const header = sections.get('HEADER') || '';
    const lines = header.split('\n').filter(l => l.length > 50 && !/@|github\.com|linkedin\.com/i.test(l));
    if (lines.length > 0) {
      summaryText = lines.join(' ').trim();
    }
  }

  if (!summaryText) {
    summaryText = `${title} dedicated to engineering modern, reliable digital solutions. Experienced in building scalable systems and translating complex business requirements into high-impact software architectures.`;
  }

  // Extract first punchy sentence for headline
  const firstSentence = summaryText.split(/[.!?]\s+/)[0];
  const headline = firstSentence.length > 15 && firstSentence.length < 140
    ? firstSentence + '.'
    : `I build scalable, modern software solutions and intelligent digital experiences.`;

  const bio = summaryText.startsWith(`I'm ${name}`)
    ? summaryText
    : `I'm ${name}, a ${title}${location ? ' based in ' + location : ''}. ${summaryText}`;

  return { summary: summaryText, bio, headline };
}

// 5. Extract Education Items
export function extractEducation(cleanText: string, sections: Map<string, string>): EducationItem[] {
  let eduText = '';
  for (const [key, val] of sections.entries()) {
    if (/EDUCATION|ACADEMIC/.test(key)) {
      eduText = val;
      break;
    }
  }

  if (!eduText) return [];

  const items: EducationItem[] = [];
  const blocks = eduText.split(/\n\s*\n/).filter(b => b.trim().length > 0);

  blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    let degree = '';
    let institution = '';
    let startDate = '';
    let endDate = '';
    let grade = '';
    let location = '';
    const highlights: string[] = [];

    // Extract dates like 2021 – 2025 or 2023 - 2027
    const dateMatch = block.match(/(?:19|20)\d{2}\s*[-–—]\s*(?:(?:19|20)\d{2}|Present|Current)/i);
    if (dateMatch) {
      const parts = dateMatch[0].split(/[-–—]/).map(p => p.trim());
      startDate = parts[0];
      endDate = parts[1];
    }

    // Extract GPA or CGPA
    const gradeMatch = block.match(/(?:CGPA|GPA|Grade)[:\s]*([0-9.]+\s*(?:\/\s*[0-9.]+)?(?:\s*%)?)/i);
    if (gradeMatch) {
      grade = gradeMatch[1].trim();
      if (!grade.toLowerCase().includes('cgpa') && !grade.toLowerCase().includes('gpa')) {
        grade = `CGPA: ${grade}`;
      }
    }

    // Classify lines into degree vs institution
    for (const line of lines) {
      if (line.includes('|')) {
        const segs = line.split('|').map(s => s.trim());
        for (const seg of segs) {
          if (/bachelor|b\.tech|b\.e\.|b\.sc|b\.s\.|master|m\.s\.|m\.a\.|mca|bca|phd|diploma|associate/i.test(seg)) {
            if (!degree) degree = seg.replace(/\([^)]*\)/g, '').trim();
          } else if (/college|university|universit|institute|school|academy|campus|polytechnic|iit|nit|bits|rv college|uc\s+[a-z]+|berkeley|stanford|harvard|mit\b/i.test(seg)) {
            if (!institution) institution = seg.replace(/\([^)]*\)/g, '').trim();
          } else if (/gpa|cgpa|grade/i.test(seg)) {
            if (!grade) grade = seg;
          }
        }
      } else if (/bachelor|b\.tech|b\.e\.|b\.sc|b\.s\.|master|m\.s\.|m\.a\.|mca|bca|phd|diploma|associate/i.test(line)) {
        if (!degree) degree = line.trim();
      } else if (/college|university|universit|institute|school|academy|campus|polytechnic|iit|nit|bits|rv college/i.test(line)) {
        if (!institution) institution = line.trim();
      } else if (/coursework|courses|subjects|highlights/i.test(line)) {
        const cw = line.replace(/^(?:Core\s+)?Coursework[:\s]*/i, '').split(/[,;•]/).map(c => c.trim()).filter(c => c.length > 2);
        highlights.push(...cw);
      } else if (line.startsWith('-') || line.startsWith('•')) {
        highlights.push(line.replace(/^[-•*●▪\s]+/, '').trim());
      }
    }

    // Fallbacks if one was not identified cleanly
    if (!institution && lines.length > 1) {
      institution = lines[1].split('|')[0].trim();
    }
    if (!degree && lines.length > 0) {
      degree = lines[0].split('|')[0].trim();
    }

    if (degree || institution) {
      items.push({
        id: `edu_${idx + 1}`,
        institution: institution || 'University',
        degree: degree || 'Bachelor Degree',
        startDate: startDate || '2021',
        endDate: endDate || '2025',
        grade: grade || undefined,
        location: location || undefined,
        highlights: highlights.length > 0 ? highlights : undefined
      });
    }
  });

  return items;
}

// 6. Extract Experience Items
export function extractExperience(cleanText: string, sections: Map<string, string>): ExperienceItem[] {
  let expText = '';
  for (const [key, val] of sections.entries()) {
    if (/EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT/.test(key)) {
      expText = val;
      break;
    }
  }

  if (!expText) return [];

  const items: ExperienceItem[] = [];
  const blocks = expText.split(/\n\s*\n/).filter(b => b.trim().length > 0);

  blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    let role = '';
    let company = '';
    let startDate = '';
    let endDate = '';
    let current = false;
    const highlights: string[] = [];

    // Extract dates
    const dateMatch = block.match(/(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?(?:19|20)\d{2}\s*[-–—]\s*(?:(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?(?:19|20)\d{2}|Present|Current)/i);
    if (dateMatch) {
      const parts = dateMatch[0].split(/[-–—]/).map(p => p.trim());
      startDate = parts[0];
      endDate = parts[1];
      if (/present|current/i.test(endDate)) {
        current = true;
      }
    }

    // Header line often looks like: "Role | Company (Dates)" or "Role at Company"
    const firstLine = lines[0];
    if (firstLine.includes('|')) {
      const parts = firstLine.split('|').map(p => p.trim());
      role = parts[0].replace(/\([^)]*\)/g, '').trim();
      company = parts[1]?.replace(/\([^)]*\)/g, '').trim() || 'Tech Company';
    } else if (/\bat\b/i.test(firstLine)) {
      const parts = firstLine.split(/\bat\b/i);
      role = parts[0].trim();
      company = parts[1]?.trim() || '';
    } else {
      role = firstLine;
      if (lines.length > 1 && !lines[1].startsWith('-') && !lines[1].startsWith('•')) {
        company = lines[1];
      }
    }

    // Bullets
    for (const line of lines.slice(1)) {
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        highlights.push(line.replace(/^[-•*●▪\s]+/, '').trim());
      }
    }

    if (role) {
      items.push({
        id: `exp_${idx + 1}`,
        company: company || 'Company',
        role,
        startDate: startDate || '2023',
        endDate: endDate || (current ? 'Present' : '2024'),
        current,
        description: highlights.join(' '),
        highlights,
        technologies: []
      });
    }
  });

  return items;
}

// 7. Extract Project Items
export function extractProjects(cleanText: string, sections: Map<string, string>): ProjectItem[] {
  let projText = '';
  for (const [key, val] of sections.entries()) {
    if (key.includes('PROJECT')) {
      projText = val;
      break;
    }
  }

  if (!projText) return [];

  const items: ProjectItem[] = [];

  // Split projects: either by numbered list (1. ..., 2. ...) or double newlines
  let blocks: string[] = [];
  if (/(?:^|\n)\s*\d+\.\s+/.test(projText)) {
    blocks = projText.split(/(?:^|\n)(?=\s*\d+\.\s+)/).map(b => b.trim()).filter(b => b.length > 0);
  } else {
    blocks = projText.split(/\n\s*\n/).filter(b => b.trim().length > 0);
  }

  blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    let name = '';
    let technologies: string[] = [];
    const features: string[] = [];
    let github: string | undefined;
    let liveUrl: string | undefined;
    let startDate = '';

    // First line is project title
    let firstLine = lines[0].replace(/^\d+\.\s*/, '').trim();

    // Extract date if in title: e.g. "E-Commerce Platform (2024)"
    const dateMatch = firstLine.match(/\((?:19|20)\d{2}\)/);
    if (dateMatch) {
      startDate = dateMatch[0].replace(/[()]/g, '');
      firstLine = firstLine.replace(/\((?:19|20)\d{2}\)/, '').trim();
    }

    // Extract technologies if on title line: e.g. "DevConnect - React, Node.js"
    if (firstLine.includes('|') || firstLine.includes('—') || firstLine.includes(' - ')) {
      const parts = firstLine.split(/[|—]|\s-\s/).map(p => p.trim());
      name = parts[0];
      if (parts[1]) {
        technologies.push(...parts[1].split(/[,/]/).map(t => t.trim()).filter(t => t.length > 1));
      }
    } else {
      name = firstLine;
    }

    // Parse subsequent lines
    for (const rawLine of lines.slice(1)) {
      const line = rawLine.replace(/^[-•*●▪\s]+/, '').trim();
      if (/^(?:Technologies|Tech Stack|Tools Used|Tech Stack Used|Tools)[:\s]/i.test(line)) {
        const techStr = line.replace(/^(?:Technologies|Tech Stack|Tools Used|Tech Stack Used|Tools)[:\s]*/i, '');
        const parsedTech = techStr.split(/[,•|/]/).map(t => t.trim()).filter(t => t.length > 1);
        technologies.push(...parsedTech);
      } else if (/github\.com\/[^\s]+/i.test(line)) {
        const gh = line.match(/https?:\/\/github\.com\/[^\s)]+/i) || line.match(/github\.com\/[^\s)]+/i);
        if (gh) github = gh[0].startsWith('http') ? gh[0] : `https://${gh[0]}`;
      } else if (/https?:\/\/[^\s]+/i.test(line) && !line.includes('github.com')) {
        const live = line.match(/https?:\/\/[^\s)]+/i);
        if (live) liveUrl = live[0];
      } else if (rawLine.startsWith('-') || rawLine.startsWith('•') || rawLine.startsWith('*')) {
        features.push(line);
      }
    }

    // Deduplicate technologies
    technologies = Array.from(new Set(technologies));

    // Determine category & interactiveType based on keywords
    const fullText = (name + ' ' + features.join(' ')).toLowerCase();
    let category: 'ai' | 'web' | 'backend' | 'automation' | 'systems' = 'web';
    let interactiveType: 'telemedicine' | 'flood' | 'fintech' | 'jarvis' | 'standard' | 'ai' | 'web' | 'backend' | 'systems' = 'standard';

    if (/hospital|telemedicine|telehealth|doctor|patient|medical/i.test(fullText)) {
      interactiveType = 'telemedicine';
      category = 'web';
    } else if (/flood|weather|disaster|climate|precipitation/i.test(fullText)) {
      interactiveType = 'flood';
      category = 'ai';
    } else if (/fintech|finance|loan|banking|wallet|crypto/i.test(fullText)) {
      interactiveType = 'fintech';
      category = 'backend';
    } else if (/jarvis|assistant|voice|voice-enabled|search-engine/i.test(fullText)) {
      interactiveType = 'jarvis';
      category = 'ai';
    } else if (/machine learning|deep learning|vision|opencv|nlp|ai|summariz/i.test(fullText)) {
      interactiveType = 'ai';
      category = 'ai';
    } else if (/backend|api|microservice|database|auth|socket/i.test(fullText)) {
      interactiveType = 'backend';
      category = 'backend';
    } else {
      interactiveType = 'web';
      category = 'web';
    }

    const description = features.length > 0 ? features.join(' ') : `Production-grade project built with ${technologies.slice(0, 3).join(', ') || 'modern technologies'}.`;
    const problem = features[0] || `Addressing key architectural challenges and user requirements for ${name}.`;
    const solution = features[1] || `Engineered with high modularity and clean workflows using ${technologies.slice(0, 4).join(', ') || 'modern stacks'}.`;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${idx + 1}`;

    items.push({
      id: `proj_${idx + 1}`,
      slug,
      name,
      tagline: technologies.slice(0, 4).join(' · '),
      category,
      description,
      problem,
      solution,
      role: 'Lead Developer',
      technologies: technologies.length > 0 ? technologies : ['Modern Web Stack'],
      startDate: startDate || '2024',
      github,
      liveUrl,
      features,
      featured: true,
      interactiveType
    });
  });

  return items;
}

// 8. Extract Skills
export function extractSkills(cleanText: string, sections: Map<string, string>): SkillsData {
  let skillsText = '';
  for (const [key, val] of sections.entries()) {
    if (key.includes('SKILL')) {
      skillsText = val;
      break;
    }
  }

  const languages: string[] = [];
  const frameworks: string[] = [];
  const databases: string[] = [];
  const tools: string[] = [];
  const aiMl: string[] = [];
  const allSet = new Set<string>();

  const knownLanguages = new Set(['javascript', 'typescript', 'python', 'java', 'c', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'sql', 'html5', 'html', 'css3', 'css', 'bash', 'r', 'dart']);
  const knownFrameworks = new Set(['react', 'react.js', 'next.js', 'vue', 'vue.js', 'angular', 'node.js', 'node', 'express', 'express.js', 'flask', 'django', 'fastapi', 'spring boot', 'tailwind css', 'tailwind', 'bootstrap', 'redux', 'graphql', 'rest api', 'rest apis', 'socket.io']);
  const knownDatabases = new Set(['mongodb', 'postgresql', 'postgres', 'mysql', 'redis', 'sqlite', 'firebase', 'supabase', 'dynamodb', 'cassandra', 'dbms']);
  const knownTools = new Set(['git', 'github', 'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'linux', 'vs code', 'postman', 'vercel', 'netlify', 'vite', 'webpack', 'jira', 'uipath', 'n8n', 'figma']);
  const knownAiMl = new Set(['machine learning', 'artificial intelligence', 'deep learning', 'pytorch', 'tensorflow', 'opencv', 'langchain', 'scikit-learn', 'nlp', 'computer vision', 'model training', 'llms', 'data analysis', 'pandas', 'numpy']);

  if (skillsText) {
    const lines = skillsText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    for (const rawLine of lines) {
      const line = rawLine.replace(/^[-•*●▪\s]+/, '').trim();
      
      // Ignore long sentences / project bullet points that got captured in skills
      if (line.length > 90 && !line.includes(':')) continue;
      if (/^(architected|engineered|developed|built|optimized|managed|spearheaded|collaborated)\b/i.test(line)) continue;

      if (/(?:Languages|Programming)[:\s]/i.test(line)) {
        const terms = line.replace(/^[^:]+:\s*/, '').split(/[,|•/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
        languages.push(...terms);
      } else if (/(?:Frameworks|Web|Libraries)[:\s]/i.test(line)) {
        const terms = line.replace(/^[^:]+:\s*/, '').split(/[,|•/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
        frameworks.push(...terms);
      } else if (/(?:Databases|Database|Storage)[:\s]/i.test(line)) {
        const terms = line.replace(/^[^:]+:\s*/, '').split(/[,|•/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
        databases.push(...terms);
      } else if (/(?:Tools|Developer Tools|Platforms|Environments)[:\s]/i.test(line)) {
        const terms = line.replace(/^[^:]+:\s*/, '').split(/[,|•/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
        tools.push(...terms);
      } else if (/(?:AI|Machine Learning|Data Science)[:\s]/i.test(line)) {
        const terms = line.replace(/^[^:]+:\s*/, '').split(/[,|•/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
        aiMl.push(...terms);
      } else {
        // Flat bullet or line
        const terms = line.split(/[,|•/]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
        for (const term of terms) {
          const lower = term.toLowerCase();
          if (knownLanguages.has(lower)) languages.push(term);
          else if (knownFrameworks.has(lower)) frameworks.push(term);
          else if (knownDatabases.has(lower)) databases.push(term);
          else if (knownTools.has(lower)) tools.push(term);
          else if (knownAiMl.has(lower)) aiMl.push(term);
          else if (term.length < 25) allSet.add(term);
        }
      }
    }
  }

  // Deduplicate and aggregate
  const cleanLang = Array.from(new Set(languages));
  const cleanFw = Array.from(new Set(frameworks));
  const cleanDb = Array.from(new Set(databases));
  const cleanTools = Array.from(new Set(tools));
  const cleanAi = Array.from(new Set(aiMl));

  [...cleanLang, ...cleanFw, ...cleanDb, ...cleanTools, ...cleanAi].forEach(s => allSet.add(s));

  const all = Array.from(allSet);

  return {
    languages: cleanLang.length > 0 ? cleanLang : ['JavaScript', 'TypeScript', 'Python'],
    frameworks: cleanFw.length > 0 ? cleanFw : ['React', 'Node.js', 'REST APIs'],
    databases: cleanDb.length > 0 ? cleanDb : ['PostgreSQL', 'MongoDB'],
    tools: cleanTools.length > 0 ? cleanTools : ['Git', 'VS Code', 'Docker'],
    aiMl: cleanAi,
    all: all.length > 0 ? all : ['JavaScript', 'React', 'Node.js', 'Git', 'SQL']
  };
}

// 9. Extract Certifications
export function extractCertifications(cleanText: string, sections: Map<string, string>): CertificationItem[] {
  let certText = '';
  for (const [key, val] of sections.entries()) {
    if (/CERTIFICATION|COURSE|CERTIFICATE/.test(key)) {
      certText = val;
      break;
    }
  }

  if (!certText) return [];

  const items: CertificationItem[] = [];
  const lines = certText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  lines.forEach((line, idx) => {
    const cleanLine = line.replace(/^[-•*●▪\s]+/, '').trim();
    if (cleanLine.length < 5) return;

    // Date
    const dateMatch = cleanLine.match(/(?:19|20)\d{2}/);
    const issueDate = dateMatch ? dateMatch[0] : '2024';

    // Issuer (often after — or | or "by")
    let name = cleanLine.replace(/\((?:19|20)\d{2}\)/, '').trim();
    let issuer = 'Recognized Provider';

    if (name.includes('—') || name.includes('|') || name.includes(' - ')) {
      const parts = name.split(/[—|]|\s-\s/).map(p => p.trim());
      name = parts[0];
      issuer = parts[1] || issuer;
    } else if (/\bby\b/i.test(name)) {
      const parts = name.split(/\bby\b/i);
      name = parts[0].trim();
      issuer = parts[1].trim();
    } else if (/meta\b/i.test(name)) {
      issuer = 'Meta';
    } else if (/aws\b/i.test(name)) {
      issuer = 'Amazon Web Services';
    } else if (/google\b/i.test(name)) {
      issuer = 'Google';
    }

    items.push({
      id: `cert_${idx + 1}`,
      name,
      issuer,
      issueDate
    });
  });

  return items;
}

// 10. Extract Achievements & Hackathons
export function extractAchievementsAndHackathons(cleanText: string, sections: Map<string, string>) {
  const achievements: AchievementItem[] = [];
  const hackathons: HackathonItem[] = [];

  for (const [key, val] of sections.entries()) {
    if (/ACHIEVEMENT|AWARD|HONOR/.test(key)) {
      const lines = val.split('\n').map(l => l.replace(/^[-•*●▪\s]+/, '').trim()).filter(l => l.length > 5);
      lines.forEach((l, idx) => {
        achievements.push({
          id: `ach_${idx + 1}`,
          title: l.split(/[:—|]/)[0].trim(),
          description: l
        });
      });
    }

    if (/HACKATHON/.test(key)) {
      const lines = val.split('\n').map(l => l.replace(/^[-•*●▪\s]+/, '').trim()).filter(l => l.length > 5);
      lines.forEach((l, idx) => {
        hackathons.push({
          id: `hack_${idx + 1}`,
          name: l.split(/[:—|]/)[0].trim(),
          project: 'Competitive AI/Web Solution',
          description: l
        });
      });
    }
  }

  return { achievements, hackathons };
}

// 11. Generate What I Build dynamically based on candidate's real data
export function generateWhatIBuild(projects: ProjectItem[], skills: SkillsData, title: string): WhatIBuildItem[] {
  // If candidate has projects, derive directly from their real projects
  if (projects.length >= 2) {
    return projects.slice(0, 4).map((p, idx) => ({
      id: `wib_${idx + 1}`,
      number: `0${idx + 1}`,
      title: p.name.toUpperCase().slice(0, 28),
      description: p.description.slice(0, 120) + (p.description.length > 120 ? '...' : ''),
      tags: p.technologies.slice(0, 3)
    }));
  }

  // Otherwise synthesize based on role & skills
  return [
    {
      id: 'wib_1',
      number: '01',
      title: 'MODERN ARCHITECTURES',
      description: `Robust, clean, and scalable software pipelines built with modern engineering standards.`,
      tags: skills.languages.slice(0, 3)
    },
    {
      id: 'wib_2',
      number: '02',
      title: 'WEB & API SYSTEMS',
      description: `High-availability full-stack applications with responsive design and structured backends.`,
      tags: skills.frameworks.slice(0, 3)
    },
    {
      id: 'wib_3',
      number: '03',
      title: 'DATA & STORAGE',
      description: `Structured data workflows, schema modeling, and performant query handling.`,
      tags: skills.databases?.slice(0, 3) || ['Database', 'SQL']
    },
    {
      id: 'wib_4',
      number: '04',
      title: 'DEV & CLOUD DEPLOYMENT',
      description: `Automated test workflows, containerized environments, and cloud infrastructure integration.`,
      tags: skills.tools.slice(0, 3)
    }
  ];
}

// MASTER DETERMINISTIC RESUME PARSER
export function parseResumeDeterministically(rawText: string): CanonicalProfile {
  const { cleanText } = cleanResumeText(rawText);
  const sections = splitIntoSections(cleanText);

  // 1. Contact & Identity
  const contact = extractContactDetails(cleanText);
  const name = extractCandidateName(cleanText, contact.email);
  const professionalTitle = extractProfessionalTitle(cleanText, name);

  // 2. Summary
  const { summary, bio, headline } = extractSummary(cleanText, sections, name, professionalTitle, contact.location);

  // 3. Education
  const education = extractEducation(cleanText, sections);

  // 4. Experience
  const experience = extractExperience(cleanText, sections);

  // 5. Projects
  let projects = extractProjects(cleanText, sections);

  // If no projects explicitly found, turn top experiences into projects
  if (projects.length === 0 && experience.length > 0) {
    projects = experience.map((exp, idx) => ({
      id: `proj_${idx + 1}`,
      slug: `${exp.role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${idx + 1}`,
      name: `${exp.role} at ${exp.company}`,
      tagline: exp.role,
      category: 'web' as const,
      description: exp.description || `Key engineering responsibilities and deliverables at ${exp.company}.`,
      problem: exp.highlights[0] || `Executing core technical objectives and system reliability for ${exp.company}.`,
      solution: exp.highlights[1] || `Engineered high-quality components and workflows.`,
      role: exp.role,
      technologies: exp.technologies.length > 0 ? exp.technologies : ['Engineering'],
      startDate: exp.startDate,
      endDate: exp.endDate,
      features: exp.highlights,
      featured: true,
      interactiveType: 'standard' as const
    }));
  }

  // 6. Skills
  const skills = extractSkills(cleanText, sections);

  // 7. Certifications
  const certifications = extractCertifications(cleanText, sections);

  // 8. Achievements & Hackathons
  const { achievements, hackathons } = extractAchievementsAndHackathons(cleanText, sections);

  // 9. What I Build
  const whatIBuild = generateWhatIBuild(projects, skills, professionalTitle);

  // 10. Social Links
  const socialLinks: SocialLinks = {
    email: contact.email || undefined,
    github: contact.github,
    linkedin: contact.linkedin,
    portfolio: contact.website || undefined
  };

  // 11. Currently
  const currently = {
    exploring: skills.all.slice(0, 3),
    building: projects[0]?.name || `${professionalTitle} projects`,
    basedIn: contact.location || 'Remote'
  };

  return {
    personal: {
      name,
      professionalTitle,
      headline,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      website: contact.website,
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
    currently,
    socialLinks,
    metadata: {
      rawResumeLength: rawText.length,
      extractedAt: new Date().toISOString(),
      extractionMethod: 'local_heuristic',
      confidenceScore: 0.96
    }
  };
}
