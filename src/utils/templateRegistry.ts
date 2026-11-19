import { TemplateMetadata, TemplateCategory, TemplateType } from '../types/profile';

export interface CategoryOption {
  id: TemplateCategory;
  label: string;
  description: string;
  iconName?: string;
}

export const TEMPLATE_MARKETPLACE_CATEGORIES: CategoryOption[] = [
  {
    id: 'all',
    label: 'All Templates',
    description: 'Explore all 24+ professional portfolio architectures.'
  },
  {
    id: 'developer',
    label: 'Developer',
    description: 'Engineering-first layouts with code environments, terminal details, and architecture callouts.'
  },
  {
    id: 'softwareengineer',
    label: 'Software Engineer',
    description: 'Technical leadership, systems design blueprints, and deep architectural case studies.'
  },
  {
    id: 'datascientist',
    label: 'Data Scientist',
    description: 'Algorithmic dashboards, statistical modeling, telemetry metrics, and quantitative analysis.'
  },
  {
    id: 'aiml',
    label: 'AI/ML Engineer',
    description: 'Neural matrix layout, model parameter benchmarks, arXiv paper links, and inference telemetry.'
  },
  {
    id: 'designer',
    label: 'Designer',
    description: 'Visual-first artboard galleries, Figma/case study breakdowns, and high-impact visual design.'
  },
  {
    id: 'productmanager',
    label: 'Product Manager',
    description: 'Product vision, OKRs, KPI metric highlights (MRR, retention, NPS), and release roadmaps.'
  },
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Crisp, authoritative, and structured designs for enterprise professionals and consultants.'
  },
  {
    id: 'student',
    label: 'Student',
    description: 'Curated layouts highlighting education, coursework, hackathons, and high-velocity projects.'
  },
  {
    id: 'researcher',
    label: 'Researcher',
    description: 'arXiv-styled paper overviews, BibTeX citation generators, and publication archives.'
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    description: 'Direct service packaging, client testimonials, transparent deliverables, and instant contact CTA.'
  },
  {
    id: 'creative',
    label: 'Creative',
    description: 'Oversized expressive typography, bento grid showcases, and creative studio portfolios.'
  },
  {
    id: 'executive',
    label: 'Executive',
    description: 'C-level executive timeline, strategic business achievements, and board advisory milestones.'
  }
];

export const TEMPLATE_CATEGORIES = TEMPLATE_MARKETPLACE_CATEGORIES;

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  // 1. Full-Stack (Premier Flagship #1)
  {
    id: 'fullstack',
    title: 'Full-Stack Architecture',
    category: 'developer',
    categoryLabel: 'Developer & Full-Stack',
    layoutStyle: 'Cyber Obsidian & Gold Systems',
    desc: 'Flagship developer experience: 3D glass profile card, categorized tech radar, connected vertical timeline with architecture highlights, and featured project grids.',
    previewColor: 'from-[#0d0f14] via-[#181c25] to-[#c9a84c]/20',
    badge: 'Premier Flagship #1',
    tags: ['Full Stack', 'Developer', 'Architecture', 'TypeScript', 'Obsidian Gold'],
    targetRoles: ['Full-Stack Developer', 'Software Engineer', 'Systems Architect', 'Frontend/Backend'],
    isPopular: true
  },

  // 2. Architectural Luxury (Place #2)
  {
    id: 'luxury',
    title: 'Architectural Luxury',
    category: 'corporate',
    categoryLabel: 'Corporate & Architecture',
    layoutStyle: 'Obsidian Minimal Luxury',
    desc: 'Ultra-refined obsidian stealth dark mode, gold and platinum metallic typography, and bespoke architectural spacing.',
    previewColor: 'from-zinc-900 via-stone-900 to-black',
    badge: 'Obsidian Gold',
    tags: ['Luxury', 'Obsidian', 'Architectural', 'Bespoke', 'C-Level'],
    targetRoles: ['Architect', 'High-End Consultant', 'Principal', 'Executive'],
    isPopular: true
  },

  // 3. Minimalist
  {
    id: 'minimalist',
    title: 'Modern Minimalist',
    category: 'corporate',
    categoryLabel: 'Corporate & Modern',
    layoutStyle: 'Swiss Clean Minimal',
    desc: 'Refined editorial whitespace, clean monochromatic hierarchy, structured project index, and instant resume access.',
    previewColor: 'from-slate-100 via-slate-200 to-slate-300',
    badge: 'Flagship Clean',
    tags: ['Minimalist', 'Editorial', 'Clean', 'Universal'],
    targetRoles: ['Software Engineer', 'Product Manager', 'Student', 'Consultant'],
    isPopular: true
  },

  // 3. Editorial
  {
    id: 'editorial',
    title: 'Minimal Editorial',
    category: 'creative',
    categoryLabel: 'Creative & Editorial',
    layoutStyle: 'High-Fashion Editorial',
    desc: 'Magazine-grade serif typography, two-column narrative flow, split layout story, and curated project showcases.',
    previewColor: 'from-amber-50 via-stone-100 to-neutral-200',
    badge: 'Editorial Award',
    tags: ['Editorial', 'Typography', 'Storytelling', 'Executive'],
    targetRoles: ['Writer', 'Designer', 'Executive', 'Product Strategist'],
    isPopular: true
  },

  // 4. Executive
  {
    id: 'executive',
    title: 'Executive Corporate',
    category: 'executive',
    categoryLabel: 'Executive & Leadership',
    layoutStyle: 'C-Level Strategic',
    desc: 'Authoritative C-level layout with strategic achievements, board advisory highlights, and career scale milestones.',
    previewColor: 'from-slate-800 via-slate-900 to-navy-950',
    badge: 'Executive',
    tags: ['Executive', 'Leadership', 'Metrics', 'Corporate'],
    targetRoles: ['VP Engineering', 'CTO', 'Director', 'Founder'],
    isPopular: true
  },

  // 7. Software Engineer
  {
    id: 'softwareengineer',
    title: 'Technical Documentation',
    category: 'softwareengineer',
    categoryLabel: 'Software Engineer',
    layoutStyle: 'Technical Documentation',
    desc: 'Linear-inspired developer documentation format with deep system specs, performance benchmarks, and RFC-style projects.',
    previewColor: 'from-cyan-900 via-blue-950 to-slate-950',
    badge: 'Linear Docs',
    tags: ['Technical Docs', 'Linear UI', 'Systems', 'High-Scale'],
    targetRoles: ['Staff Engineer', 'Core Systems Developer'],
    isPopular: true
  },

  // 8. AI/ML Researcher
  {
    id: 'aimlresearcher',
    title: 'AI / ML Researcher',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    layoutStyle: 'Neural Frontier AI',
    desc: 'Neural matrix layout with model parameter counters, arXiv paper abstracts, benchmark plots, and inference metrics.',
    previewColor: 'from-violet-950 via-purple-900 to-black',
    badge: 'Neural AI',
    tags: ['AI/ML', 'PyTorch', 'Research', 'LLMs'],
    targetRoles: ['AI Engineer', 'ML Researcher', 'Data Scientist'],
    isPopular: true
  },

  // 9. Bento Grid
  {
    id: 'bentogrid',
    title: 'Interactive Bento Grid',
    category: 'creative',
    categoryLabel: 'Creative & Visual',
    layoutStyle: 'Modular Bento Grid',
    desc: 'Apple/Linear-style modular asymmetric cards, interactive stat counters, live tech stack radar, and micro-cards.',
    previewColor: 'from-indigo-600 via-purple-700 to-sky-600',
    badge: 'Bento Grid',
    tags: ['Bento Grid', 'Modern', 'Interactive', 'Cards'],
    targetRoles: ['Product Designer', 'Frontend Engineer', 'Founder'],
    isPopular: true
  },

  // 10. Creative Designer
  {
    id: 'creativedesigner',
    title: 'Creative Studio',
    category: 'designer',
    categoryLabel: 'Designer & Creative',
    layoutStyle: 'Studio Showcase',
    desc: 'Artistic composition, ambient light gradients, oversized title typography, and dynamic visual design showcases.',
    previewColor: 'from-amber-600 via-pink-600 to-purple-800',
    badge: 'Studio',
    tags: ['Creative', 'Studio', 'Visual', 'Showcase'],
    targetRoles: ['Brand Designer', 'Art Director', 'Creative Technologist'],
    isPopular: false
  },

  // 11. Bold Typography
  {
    id: 'boldtypography',
    title: 'Minimal Typography',
    category: 'creative',
    categoryLabel: 'Creative & Editorial',
    layoutStyle: 'High-Impact Typography',
    desc: 'Massive impactful headlines, high-contrast visual identity, animated marquee ticker, and bold personal branding.',
    previewColor: 'from-amber-500 via-orange-600 to-red-700',
    badge: 'Bold Type',
    tags: ['Typography', 'Bold', 'High Contrast', 'Impact'],
    targetRoles: ['Creative Developer', 'Copywriter', 'Strategist'],
    isPopular: false
  },

  // 12. Image-First / Visual Case Study
  {
    id: 'imagefirst',
    title: 'Visual Case Study',
    category: 'designer',
    categoryLabel: 'Designer & PM',
    layoutStyle: 'Visual Artboard Gallery',
    desc: 'Visual-first gallery view, full-width mockups, interactive project previews, and structured problem/solution cards.',
    previewColor: 'from-rose-600 via-pink-700 to-indigo-900',
    badge: 'Case Study',
    tags: ['Gallery', 'Case Study', 'Visual', 'Product'],
    targetRoles: ['Product Designer', 'Design Lead', 'UX Researcher'],
    isPopular: true
  },

  // 13. Data Scientist
  {
    id: 'datascientist',
    title: 'Data & Quantitative',
    category: 'datascientist',
    categoryLabel: 'Data Scientist & Analytics',
    layoutStyle: 'Analytical Quantitative',
    desc: 'Algorithmic charts, statistical model benchmarks, ETL telemetry cards, and quantitative impact breakdowns.',
    previewColor: 'from-emerald-700 via-teal-800 to-slate-950',
    badge: 'Data Quant',
    tags: ['Data Science', 'Analytics', 'Quantitative', 'Python'],
    targetRoles: ['Data Scientist', 'Quantitative Analyst', 'Data Engineer'],
    isPopular: true
  },

  // 14. Academic Research
  {
    id: 'academic',
    title: 'Academic Research',
    category: 'researcher',
    categoryLabel: 'Researcher & Scholar',
    layoutStyle: 'arXiv Academic Paper',
    desc: 'arXiv paper format, abstract overview, BibTeX citation export, peer-reviewed publication list, and grant awards.',
    previewColor: 'from-stone-700 via-amber-900 to-stone-900',
    badge: 'arXiv Paper',
    tags: ['Academic', 'Research', 'Papers', 'Scholar'],
    targetRoles: ['PhD Candidate', 'Postdoc', 'University Researcher'],
    isPopular: false
  },

  // 15. Product Manager
  {
    id: 'productmanager',
    title: 'Product Manager',
    category: 'productmanager',
    categoryLabel: 'Product & Metrics',
    layoutStyle: 'Product Vision Roadmap',
    desc: 'Product strategy roadmaps, metric KPIs (MRR, retention, NPS), user research insights, and launch case studies.',
    previewColor: 'from-blue-700 via-indigo-800 to-slate-900',
    badge: 'Product & KPI',
    tags: ['Product Management', 'Roadmaps', 'KPIs', 'Growth'],
    targetRoles: ['Product Manager', 'Group PM', 'Head of Product'],
    isPopular: true
  },

  // 16. Freelancer
  {
    id: 'freelancer',
    title: 'Freelancer & Services',
    category: 'freelancer',
    categoryLabel: 'Freelancer & Independent',
    layoutStyle: 'Client Service Marketplace',
    desc: 'Offered service packages, client testimonials, transparent deliverables, and instant hire booking actions.',
    previewColor: 'from-orange-600 via-amber-600 to-emerald-700',
    badge: 'Services & Hire',
    tags: ['Freelance', 'Services', 'Consulting', 'Client Work'],
    targetRoles: ['Freelance Engineer', 'Independent Consultant'],
    isPopular: true
  },

  // 17. Timeline
  {
    id: 'timeline',
    title: 'Professional Timeline',
    category: 'student',
    categoryLabel: 'Student & Career Journey',
    layoutStyle: 'Chronological Journey Spine',
    desc: 'Chronological career journey spine with interactive milestone scrubbers, hackathon branches, and history nodes.',
    previewColor: 'from-blue-600 via-indigo-700 to-purple-800',
    badge: 'Journey Spine',
    tags: ['Timeline', 'Milestones', 'Career Path', 'Student'],
    targetRoles: ['Student', 'Junior Engineer', 'Career Transitioner'],
    isPopular: true
  },

  // 18. Personal Brand
  {
    id: 'personalbrand',
    title: 'Personal Brand & Founder',
    category: 'executive',
    categoryLabel: 'Founder & Personal Brand',
    layoutStyle: 'Founder Keynote Story',
    desc: 'Story-driven founder portfolio, personal philosophy, keynote talks, media features, and newsletter CTA.',
    previewColor: 'from-purple-800 via-indigo-900 to-slate-950',
    badge: 'Founder Brand',
    tags: ['Founder', 'Brand', 'Keynote', 'Story'],
    targetRoles: ['Founder', 'Tech Influencer', 'Angel Investor'],
    isPopular: false
  },

  // 19. Neo-Brutalist
  {
    id: 'neobrutalist',
    title: 'Neo-Brutalist',
    category: 'creative',
    categoryLabel: 'Creative & Neo-Brutalism',
    layoutStyle: 'Playful Neo-Brutalism',
    desc: 'High-contrast bold borders, punchy saturated colors, retro sticker badges, and uninhibited dynamic layout.',
    previewColor: 'from-yellow-400 via-orange-400 to-pink-500',
    badge: 'Neo-Brutalism',
    tags: ['Neo-Brutalism', 'Bold', 'Stickers', 'Creative'],
    targetRoles: ['Creative Technologist', 'Indie Hacker', 'Designer'],
    isPopular: false
  },

  // 21. Glassmorphism
  {
    id: 'glassmorphism',
    title: 'Glassmorphism',
    category: 'creative',
    categoryLabel: 'Modern Glass Design',
    layoutStyle: 'Crystalline Frosted Glass',
    desc: 'Layered frosted glass cards, crystalline border reflections, and soft luminous ambient lighting.',
    previewColor: 'from-sky-500 via-indigo-600 to-purple-600',
    badge: 'Glass Prism',
    tags: ['Glassmorphism', 'Frosted', 'Luminous'],
    targetRoles: ['Frontend Developer', 'UI Designer'],
    isPopular: false
  },

  // 22. ThreeD
  {
    id: 'threed',
    title: '3D Interactive',
    category: 'developer',
    categoryLabel: 'Interactive & 3D',
    layoutStyle: '3D Perspective Tilt',
    desc: 'Hover.dev inspired 3D tilt perspective cards, magnetic buttons, and dynamic cursor spotlights.',
    previewColor: 'from-blue-600 via-cyan-600 to-emerald-600',
    badge: 'Hover 3D',
    tags: ['3D Tilt', 'Interactive', 'Motion'],
    targetRoles: ['Creative Developer', 'Interactive Engineer'],
    isPopular: false
  },

  // 23. Motion
  {
    id: 'motion',
    title: 'Motion Portfolio',
    category: 'designer',
    categoryLabel: 'Motion & Fluid',
    layoutStyle: 'Framer Kinetic Motion',
    desc: 'Framer-inspired fluid kinetic transitions, pill navigation, morphing layouts, and spring animations.',
    previewColor: 'from-pink-600 via-rose-600 to-indigo-700',
    badge: 'Framer Motion',
    tags: ['Framer', 'Motion', 'Kinetic', 'Fluid'],
    targetRoles: ['Product Designer', 'Motion Designer'],
    isPopular: false
  },

  // 24. Gradient Modern
  {
    id: 'gradientmodern',
    title: 'Gradient Modern',
    category: 'corporate',
    categoryLabel: 'Modern Commercial SaaS',
    layoutStyle: 'Magic UI Modern SaaS',
    desc: 'Clean modern grid, floating dock navigation, subtle multi-stop gradient wave backgrounds, and shimmer buttons.',
    previewColor: 'from-violet-600 via-purple-600 to-pink-500',
    badge: 'Modern SaaS',
    tags: ['Modern SaaS', 'Gradient', 'Clean'],
    targetRoles: ['Software Engineer', 'SaaS Founder'],
    isPopular: false
  }
];

/**
 * Normalizes any template identifier (including legacy aliases) to a canonical template
 */
export function normalizeTemplateId(templateId: string): TemplateType {
  const map: Record<string, TemplateType> = {
    // Aliases
    bento: 'bentogrid',
    devdark: 'fullstack',
    swissgrid: 'fullstack',
    terminal: 'fullstack',
    casestudy: 'softwareengineer',
    creative: 'creativedesigner',
    magicui: 'gradientmodern',
    hoverdev: 'threed',
    framer: 'motion',
    skipper: 'fullstack',
    aurora: 'glassmorphism',
    devops: 'fullstack',
    aiml: 'aimlresearcher',
    gamecraft: 'freelancer',
    productdesigner: 'imagefirst',
    mobiledev: 'productmanager',
    fintech: 'datascientist',
    glassdark: 'luxury',
    matrixcode: 'fullstack',
    spotlight: 'personalbrand'
  };

  if (map[templateId]) {
    return map[templateId];
  }

  const match = TEMPLATE_REGISTRY.find(t => t.id === templateId);
  return match ? (templateId as TemplateType) : 'fullstack';
}
