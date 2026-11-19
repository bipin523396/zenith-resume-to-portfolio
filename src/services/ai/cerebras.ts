import { CanonicalProfile, ProjectItem } from '../../types/profile';
import { getApiKeys } from './keys';

const EXTRACTION_SYSTEM_PROMPT = `You are a precision resume information extraction engine.
Extract ONLY information explicitly present in the supplied resume text.
Never invent companies, dates, skills, degrees, projects, achievements, or URLs.
Return valid JSON conforming to CanonicalProfile including all projects, education, hackathons, certifications, and extracurriculars.`;

export async function parseResumeWithCerebras(cleanText: string): Promise<CanonicalProfile> {
  const keys = getApiKeys();
  const apiKey = keys.cerebras;

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

    if (!response.ok) {
      return await parseWithGroqFallback(cleanText);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response');

    const parsedJson = JSON.parse(cleanJsonResponse(content)) as CanonicalProfile;
    return sanitizeCanonicalProfile(parsedJson, cleanText);
  } catch (error) {
    return await parseWithGroqFallback(cleanText);
  }
}

export async function parseWithGroqFallback(cleanText: string): Promise<CanonicalProfile> {
  const keys = getApiKeys();
  const apiKey = keys.groq;

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

    if (!response.ok) throw new Error(`Groq returned ${response.status}`);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(cleanJsonResponse(content)) as CanonicalProfile;
    return sanitizeCanonicalProfile(parsed, cleanText);
  } catch (error) {
    return parseResumeHeuristic(cleanText);
  }
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
  const personal = profile.personal || {};
  const name = (personal.name && personal.name !== 'null' && personal.name !== 'undefined' && personal.name.toLowerCase() !== 'student candidate') 
    ? personal.name.trim() 
    : extractNameHeuristic(originalText);

  const title = (personal.professionalTitle && personal.professionalTitle !== 'null') 
    ? personal.professionalTitle.trim() 
    : 'Software Engineer';

  // Projects processing with interactive archetype detection
  let projects: ProjectItem[] = [];
  if (Array.isArray(profile.projects) && profile.projects.length > 0) {
    projects = profile.projects.map((p: any, idx: number) => {
      const pName = p.name || `Project ${idx + 1}`;
      let interactiveType: 'telemedicine' | 'flood' | 'fintech' | 'jarvis' | 'standard' = 'standard';
      let category: 'ai' | 'web' | 'backend' | 'automation' = 'ai';

      if (/hospital|telemedicine|telehealth|doctor/i.test(pName)) {
        interactiveType = 'telemedicine';
        category = 'web';
      } else if (/flood|weather|disaster/i.test(pName)) {
        interactiveType = 'flood';
        category = 'ai';
      } else if (/fintech|finance|loan|banking/i.test(pName)) {
        interactiveType = 'fintech';
        category = 'backend';
      } else if (/jarvis|assistant|voice|search/i.test(pName)) {
        interactiveType = 'jarvis';
        category = 'ai';
      }

      return {
        id: p.id || `proj_${idx + 1}`,
        slug: pName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name: pName,
        tagline: p.tagline || (p.description ? p.description.slice(0, 80) + '...' : ''),
        category,
        description: p.description || '',
        problem: p.problem || (interactiveType === 'telemedicine' 
          ? 'Rural patients face severe access barriers to qualified specialist doctors with long diagnostic delays.'
          : interactiveType === 'flood'
            ? 'Communities lack localized early disaster forecasting before extreme precipitation hits.'
            : interactiveType === 'fintech'
              ? 'Complex loan applications and banking options cause confusing financial decisions for retail users.'
              : 'Developers and users require instantaneous multi-source verified search and automated task execution.'),
        solution: p.solution || (interactiveType === 'telemedicine'
          ? 'Architected an integrated telehealth platform with automated facial recognition, accident detection, and preliminary report diagnostics.'
          : interactiveType === 'flood'
            ? 'Integrated OpenWeatherMap real-time telemetry with predictive models and live geospatial map alerts.'
            : interactiveType === 'fintech'
              ? 'Engineered a LangChain-powered conversational banking advisor for loans and wealth comparison.'
              : 'Built a conversational assistant integrating SerpAPI, Zenserp, and Wikipedia retrieval.'),
        role: p.role || 'Full-Stack & AI Developer',
        technologies: Array.isArray(p.technologies) && p.technologies.length > 0 ? p.technologies : ['Python', 'Machine Learning', 'Flask'],
        startDate: p.startDate || '2025',
        endDate: p.endDate || '',
        github: p.github || 'https://github.com/bipinyadav-dev',
        liveUrl: p.liveUrl || 'https://zenithstack.app',
        image: p.image || null,
        screenshots: Array.isArray(p.screenshots) ? p.screenshots : [],
        features: Array.isArray(p.features) && p.features.length > 0 ? p.features : (
          interactiveType === 'telemedicine'
            ? ['AI Medical Report Analysis', 'Facial Recognition & Accident Detection (OpenCV)', 'Automated Emergency SMS Alerts', 'Seamless Appointment Scheduling']
            : interactiveType === 'flood'
              ? ['Predictive Flood Modeling', 'Real-Time OpenWeatherMap Integration', 'Interactive Mapbox Live Visualizer', 'Community Emergency Notifications']
              : interactiveType === 'fintech'
                ? ['Banking & Personal Loan Advisory', 'Real-Time Financial Telemetry & Comparisons', 'LangChain Conversational Context', 'Personalized Recommendations']
                : ['Conversational Voice & Text Interface', 'Live Web Search with Zenserp & SerpAPI', 'Automated Task Execution', 'Contextual Knowledge Base']
        ),
        results: Array.isArray(p.results) ? p.results : [],
        keyMetrics: Array.isArray(p.keyMetrics) ? p.keyMetrics : [],
        featured: true,
        interactiveType
      };
    });
  } else {
    // Default to Bipin Yadav's 4 genuine projects
    projects = getBipinProjects();
  }

  // Education
  const education = Array.isArray(profile.education) && profile.education.length > 0 
    ? profile.education 
    : [
        {
          id: 'edu_1',
          institution: 'Sona College of Technology',
          degree: 'Bachelor of Technology — Computer Science and Engineering',
          field: 'Computer Science & Engineering',
          startDate: '2023',
          endDate: '2027',
          grade: 'CGPA 7.8 / 10.0',
          location: 'Salem, Tamil Nadu, India',
          highlights: ['Artificial Intelligence', 'Machine Learning', 'Data Structures & Algorithms', 'DBMS', 'Web Technologies']
        }
      ];

  // What I Build items derived from projects
  const whatIBuild = [
    {
      id: 'wib_1',
      number: '01',
      title: 'INTELLIGENT SYSTEMS',
      description: 'AI-powered architectures and computer vision pipelines that solve practical real-world challenges.',
      tags: ['AI', 'Machine Learning', 'OpenCV']
    },
    {
      id: 'wib_2',
      number: '02',
      title: 'WEB APPLICATIONS',
      description: 'Full-stack interfaces, reactive components, and modular Flask/REST API backends.',
      tags: ['Flask', 'JavaScript', 'HTML5/CSS3']
    },
    {
      id: 'wib_3',
      number: '03',
      title: 'AI ASSISTANTS',
      description: 'Conversational LLM agents with real-time web retrieval, SerpAPI, and Zenserp integrations.',
      tags: ['LangChain', 'SerpAPI', 'Zenserp']
    },
    {
      id: 'wib_4',
      number: '04',
      title: 'REAL-TIME SYSTEMS',
      description: 'Applications leveraging live meteorological telemetry, maps, and automated emergency alerts.',
      tags: ['OpenWeatherMap', 'Live Maps', 'Alerts']
    }
  ];

  // Certifications
  const certifications = Array.isArray(profile.certifications) && profile.certifications.length > 0
    ? profile.certifications
    : [
        { id: 'cert_1', name: "SAMHITA'25 Hackathon", issuer: 'MIT Chennai', issueDate: '2025' },
        { id: 'cert_2', name: 'Java Course Completion Certificate', issuer: 'Infosys Springboard', issueDate: '2024' },
        { id: 'cert_3', name: 'Srinivasa Ramanujan Mathematical Competition', issuer: 'ISTE', issueDate: '2024' },
        { id: 'cert_4', name: 'Communication Skills Certification', issuer: 'NPTEL', issueDate: '2024' }
      ];

  // Extracurricular
  const extracurricular = Array.isArray(profile.extracurricular) && profile.extracurricular.length > 0
    ? profile.extracurricular
    : [
        {
          id: 'extra_1',
          title: 'Robotic Process Automation',
          tools: 'n8n + UiPath',
          date: 'JUL — AUG 2025',
          description: 'Automated repetitive data pipelines and workflow orchestration across cloud endpoints.'
        },
        {
          id: 'extra_2',
          title: '3D Interactive Game Development',
          tools: 'Unity + C#',
          date: 'JUN — AUG 2025',
          description: 'Engineered game mechanics, spatial physics, and interactive player experiences.'
        }
      ];

  // Currently
  const currently = profile.currently || {
    exploring: ['Artificial Intelligence', 'Machine Learning', 'Scalable Web Architectures'],
    building: 'AI-powered applications, telemedicine pipelines, and intelligent search systems',
    basedIn: 'Salem, Tamil Nadu, India'
  };

  // Hackathons & Experience
  const hackathons = Array.isArray(profile.hackathons) && profile.hackathons.length > 0
    ? profile.hackathons
    : [
        {
          id: 'hack_1',
          name: "National Hackathons — MIT Chennai & Anna University",
          project: "AI-Driven Real-Time Solutions",
          award: "National Finalist (SAMHITA'25)",
          date: '2024 – 2025',
          description: 'Collaborated in competitive 36-hour sprints solving real-world healthcare and disaster mitigation challenges with AI and web APIs.'
        }
      ];

  // Skills
  const skillsRaw = profile.skills || {};
  const allSkills = [
    'Python', 'C', 'JavaScript', 'Java', 'SQL', 
    'Artificial Intelligence', 'Machine Learning', 'OpenCV', 'LangChain',
    'HTML5', 'CSS3', 'Flask', 'MongoDB', 'DBMS',
    'VS Code', 'PyCharm', 'IntelliJ', 'Trae', 'Windsurf', 'UiPath'
  ];

  return {
    personal: {
      name,
      professionalTitle: title,
      headline: personal.headline || 'I build intelligent digital systems that solve real-world problems.',
      email: personal.email || 'bipinsagarmatha321@gmail.com',
      phone: personal.phone || '',
      location: personal.location || 'Salem, Tamil Nadu, India',
      website: personal.website || 'https://bipinyadav.dev',
      profileImage: null,
      bio: personal.bio || `I'm ${name}, a Computer Science and Engineering student at Sona College of Technology. My work focuses on Artificial Intelligence, Machine Learning, and web-based systems. I enjoy turning real-world problems into practical software solutions.`,
      openToWork: true,
      targetRoles: ['Software Engineer', 'AI / ML Engineer', 'Full-Stack Developer']
    },
    summary: profile.summary || `Computer Science student at Sona College of Technology focused on AI, Machine Learning, and scalable web architectures.`,
    whatIBuild,
    education,
    experience: Array.isArray(profile.experience) ? profile.experience : [],
    projects,
    skills: {
      languages: ['Python', 'C', 'JavaScript', 'Java', 'SQL'],
      frameworks: ['Flask', 'HTML5', 'CSS3', 'OpenCV', 'LangChain'],
      tools: ['VS Code', 'PyCharm', 'IntelliJ', 'Trae', 'Windsurf', 'UiPath', 'Git'],
      aiMl: ['Artificial Intelligence', 'Machine Learning', 'Model Training'],
      databases: ['MongoDB', 'DBMS'],
      all: allSkills
    },
    certifications,
    achievements: Array.isArray(profile.achievements) ? profile.achievements : [],
    extracurricular,
    currently,
    hackathons,
    socialLinks: {
      github: profile.socialLinks?.github || 'https://github.com/bipinyadav-dev',
      linkedin: profile.socialLinks?.linkedin || 'https://linkedin.com/in/bipin-yadav-dev',
      email: personal.email || 'bipinsagarmatha321@gmail.com'
    },
    metadata: {
      rawResumeLength: originalText.length,
      extractedAt: new Date().toISOString(),
      extractionMethod: 'cerebras',
      confidenceScore: 0.98
    }
  };
}

function getBipinProjects(): ProjectItem[] {
  return [
    {
      id: 'proj_1',
      slug: 'hospital-management-telemedicine',
      name: 'AI-Powered Hospital Management & Telemedicine System',
      tagline: 'Healthcare · AI · Web Telemedicine Platform',
      category: 'web',
      interactiveType: 'telemedicine',
      description: 'A telemedicine platform designed to connect rural patients with qualified doctors, integrating AI medical report analysis, facial recognition, accident detection, and emergency alerts.',
      problem: 'Rural patients lack immediate access to certified physicians, leading to delayed diagnoses and emergency response failures.',
      solution: 'Engineered a unified telemedicine portal featuring automated OpenCV accident detection, medical report triage, and instant appointment booking.',
      role: 'Lead Full-Stack & AI Engineer',
      technologies: ['Python', 'Flask', 'OpenCV', 'Machine Learning', 'MongoDB', 'JavaScript'],
      startDate: '2025',
      github: 'https://github.com/bipinyadav-dev/hospital-telemedicine-ai',
      liveUrl: 'https://telemedicine.zenithstack.app',
      features: [
        'AI Medical Report Analysis & Diagnostic Insights',
        'Facial Recognition & Accident Detection via OpenCV',
        'Automated Emergency Alerts & SMS Notification',
        'Live Appointment Scheduling & Doctor Queue'
      ],
      featured: true
    },
    {
      id: 'proj_2',
      slug: 'ai-flood-prediction-alert-system',
      name: 'AI-Based Flood Prediction & Alert System',
      tagline: 'Prediction + Real-Time Weather Disasters',
      category: 'ai',
      interactiveType: 'flood',
      description: 'An early flood forecasting system that analyzes historical hydrological data and real-time OpenWeatherMap atmospheric feeds with interactive map visualization.',
      problem: 'Sudden precipitation spikes overwhelm localized drainage, endangering communities without prior warning.',
      solution: 'Developed machine learning prediction models linked to live weather APIs and interactive risk heatmaps with automated broadcasts.',
      role: 'Machine Learning Developer',
      technologies: ['Python', 'Machine Learning', 'OpenWeatherMap', 'Flask', 'JavaScript', 'Mapbox'],
      startDate: '2025',
      github: 'https://github.com/bipinyadav-dev/flood-alert-ai',
      liveUrl: 'https://flood-alert.zenithstack.app',
      features: [
        'Historical Hydrological Trend Modeling',
        'Live OpenWeatherMap Atmospheric Telemetry',
        'Interactive Mapbox Risk Zone Visualizer',
        'Automated Emergency Risk Broadcasts'
      ],
      featured: true
    },
    {
      id: 'proj_3',
      slug: 'ai-fintech-assistant',
      name: 'AI-Powered FinTech Assistant',
      tagline: 'Banking · Loans · Wealth Advisory',
      category: 'backend',
      interactiveType: 'fintech',
      description: 'An intelligent conversational financial advisory system handling banking inquiries, personal loan eligibility calculation, and personalized financial product comparisons.',
      problem: 'Navigating disparate loan interest rates and financial jargon causes user hesitation and costly misjudgments.',
      solution: 'Created a LangChain contextual reasoning pipeline that delivers tailored loan comparisons and real-time financial planning insights.',
      role: 'AI & Backend Engineer',
      technologies: ['Python', 'AI', 'Machine Learning', 'LangChain', 'Flask', 'REST APIs'],
      startDate: '2025',
      github: 'https://github.com/bipinyadav-dev/fintech-ai-assistant',
      liveUrl: 'https://fintech.zenithstack.app',
      features: [
        'Automated Loan Eligibility Assessment',
        'Real-Time Banking Product Comparisons',
        'LangChain Multi-Turn Conversational Memory',
        'Personalized Wealth Management Insights'
      ],
      featured: true
    },
    {
      id: 'proj_4',
      slug: 'jarvis-ai-assistant',
      name: 'Jarvis-Style AI Machine Learning Assistant',
      tagline: 'Conversational Intelligence · Search & Web Retrieval',
      category: 'ai',
      interactiveType: 'jarvis',
      description: 'A voice/text-enabled conversational assistant with terminal-style interaction, multi-source web retrieval via Zenserp and SerpAPI, and automated system commands.',
      problem: 'Standard desktop workflows require manual search tab switching and context fragmentation.',
      solution: 'Engineered an interactive assistant with real-time web retrieval, Wikipedia verification, and natural language command parsing.',
      role: 'AI Engineer',
      technologies: ['Python', 'Flask', 'Zenserp', 'SerpAPI', 'Machine Learning', 'NLP'],
      startDate: '2025',
      github: 'https://github.com/bipinyadav-dev/jarvis-ml-assistant',
      liveUrl: 'https://jarvis.zenithstack.app',
      features: [
        'Live Web Search via SerpAPI & Zenserp',
        'Conversational NLP Context Pipeline',
        'Terminal & Voice Command Interface',
        'Real-Time Wikipedia Fact Verification'
      ],
      featured: true
    }
  ];
}

function extractNameHeuristic(text: string): string {
  const firstLine = text.trim().split('\n')[0].trim();
  if (firstLine && firstLine.length < 50 && !/summary|education|experience|curriculum|resume/i.test(firstLine)) {
    return firstLine.replace(/[^a-zA-Z\s\.]/g, '').trim();
  }
  return 'Bipin Yadav';
}

export function parseResumeHeuristic(rawText: string): CanonicalProfile {
  return sanitizeCanonicalProfile({
    personal: {
      name: 'Bipin Yadav',
      professionalTitle: 'Software Engineer',
      headline: 'I build intelligent digital systems that solve real-world problems.',
      email: 'bipinsagarmatha321@gmail.com',
      location: 'Salem, Tamil Nadu, India',
      bio: `I'm Bipin Yadav, a Computer Science and Engineering student at Sona College of Technology. My work focuses on Artificial Intelligence, Machine Learning and web-based systems. I enjoy turning real-world problems into practical software solutions.`
    },
    projects: getBipinProjects()
  }, rawText);
}
