export interface PersonalInfo {
  name: string;
  professionalTitle: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  profileImage: string | null;
  bio: string;
  openToWork?: boolean;
  targetRoles?: string[];
}

export interface WhatIBuildItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  grade?: string;
  location?: string;
  coursework?: string[];
  highlights?: string[];
  needsReview?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  needsReview?: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  category?: 'ai' | 'web' | 'backend' | 'automation' | 'systems';
  description: string;
  problem?: string;
  solution?: string;
  role?: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  github?: string;
  liveUrl?: string;
  image?: string | null;
  screenshots?: string[];
  features?: string[];
  results?: string[];
  keyMetrics?: string[];
  featured?: boolean;
  interactiveType?: 'telemedicine' | 'flood' | 'fintech' | 'jarvis' | 'standard' | 'ai' | 'web' | 'backend' | 'systems';
  needsReview?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillsData {
  languages: string[];
  frameworks: string[];
  tools: string[];
  aiMl: string[];
  databases?: string[];
  softSkills?: string[];
  all: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  issuer?: string;
  link?: string;
}

export interface ExtracurricularItem {
  id: string;
  title: string;
  tools: string;
  date: string;
  description?: string;
}

export interface CurrentlyExploring {
  exploring: string[];
  building: string;
  basedIn: string;
}

export interface HackathonItem {
  id: string;
  name: string;
  project: string;
  award?: string;
  date?: string;
  description: string;
  technologies?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  email?: string;
  leetcode?: string;
  kaggle?: string;
  substack?: string;
  medium?: string;
  dribbble?: string;
  behance?: string;
  discord?: string;
}

export interface ReviewIssue {
  field: string;
  issue: string;
  confidence: number;
  suggestion?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  deliverables?: string[];
  rate?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
}

export interface CanonicalProfile {
  personal: PersonalInfo;
  summary: string;
  whatIBuild?: WhatIBuildItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillsData;
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  publications?: PublicationItem[];
  services?: ServiceItem[];
  testimonials?: TestimonialItem[];
  extracurricular?: ExtracurricularItem[];
  currently?: CurrentlyExploring;
  hackathons: HackathonItem[];
  socialLinks: SocialLinks;
  metadata?: {
    rawResumeLength?: number;
    extractedAt?: string;
    extractionMethod?: 'cerebras' | 'groq' | 'cloudflare' | 'local_heuristic';
    confidenceScore?: number;
    issues?: ReviewIssue[];
  };
}

export type TemplateCategory = 
  | 'all'
  | 'developer'
  | 'softwareengineer'
  | 'datascientist'
  | 'aiml'
  | 'designer'
  | 'productmanager'
  | 'corporate'
  | 'student'
  | 'researcher'
  | 'freelancer'
  | 'creative'
  | 'executive'
  | 'interactive'
  | 'specialized'
  | 'premium';

export type TemplateType = 
  // Category A: Corporate and Professional
  | 'executive'
  | 'minimalist'
  | 'swissgrid'
  | 'editorial'
  // Category B: Developer and Technology
  | 'devdark'
  | 'fullstack'
  | 'softwareengineer'
  | 'aimlresearcher'
  // Category C: Creative and Visual
  | 'creativedesigner'
  | 'bentogrid'
  | 'boldtypography'
  | 'imagefirst'
  // Category D: Modern Interactive Websites
  | 'glassmorphism'
  | 'threed'
  | 'motion'
  | 'gradientmodern'
  // Category E: Specialized Professional Portfolios
  | 'academic'
  | 'productmanager'
  | 'datascientist'
  | 'freelancer'
  // Category F: Premium and Unique
  | 'neobrutalist'
  | 'luxury'
  | 'personalbrand'
  | 'timeline'
  // Backwards-compatible aliases
  | 'bento'
  | 'terminal'
  | 'casestudy'
  | 'creative'
  | 'magicui'
  | 'hoverdev'
  | 'framer'
  | 'skipper'
  | 'aurora'
  | 'devops'
  | 'aiml'
  | 'gamecraft'
  | 'productdesigner'
  | 'mobiledev'
  | 'fintech'
  | 'glassdark'
  | 'matrixcode'
  | 'spotlight';

export type FontFamilyType = 'inter' | 'outfit' | 'editorial' | 'space' | 'syne' | 'mono';

export type ColorPaletteType = 
  | 'zenith' 
  | 'midnight' 
  | 'emerald' 
  | 'amber' 
  | 'crimson' 
  | 'cyberpunk' 
  | 'monochrome' 
  | 'nordic'
  | 'modernLight'
  | 'sunsetVibrant'
  | 'oceanTeal'
  | 'lavenderLight'
  | 'luxuryChampagne'
  | 'neonMatrix'
  | 'tokyoNeo';

export interface SectionConfig {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  subsections?: { id: string; name: string; visible: boolean }[];
}

export interface ThemeConfig {
  templateId: TemplateType;
  fontFamily: FontFamilyType;
  colorPalette: ColorPaletteType;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  spacing: 'compact' | 'normal' | 'spacious';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  glassmorphism: boolean;
  showAnimations: boolean;
  sections: SectionConfig[];
  customCSS?: string;
}

export interface TemplateRecommendation {
  templateId: TemplateType;
  title: string;
  matchScore: number;
  reason: string;
  badge?: string;
}

export interface TemplateMetadata {
  id: TemplateType;
  title: string;
  category: TemplateCategory;
  categoryLabel: string;
  layoutStyle: string;
  desc: string;
  previewColor: string;
  badge?: string;
  tags?: string[];
  targetRoles?: string[];
  isPopular?: boolean;
  isPremium?: boolean;
}

