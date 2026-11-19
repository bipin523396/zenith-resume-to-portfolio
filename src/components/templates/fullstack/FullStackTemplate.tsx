import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Download, Copy, Check, ExternalLink, 
  MapPin, Mail, Calendar, Award, GraduationCap, Briefcase, 
  Code2, Terminal, Server, Database, Cpu, Globe, Laptop,
  Layers, CheckCircle2, Zap, Shield, Sparkles, ChevronDown, ArrowDown
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const FullStackTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [copied, setCopied] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — Full-Stack Developer
Email: ${profile.personal.email} | Location: ${profile.personal.location}
Website: ${profile.personal.website || ''} | GitHub: ${profile.socialLinks?.github || ''}

## Summary
${profile.personal.bio || profile.summary}

## Work Experience
${profile.experience.map(e => `### ${e.role} — ${e.company} (${e.startDate} – ${e.endDate})
${e.description}
${e.highlights?.length ? e.highlights.map(h => `- ${h}`).join('\n') : ''}
Technologies: ${(e.technologies || []).join(', ')}
`).join('\n')}

## Featured Projects
${profile.projects.map(p => `### ${p.name}
${p.description}
Technologies: ${p.technologies.join(', ')}
${p.github ? `GitHub: ${p.github}` : ''} ${p.liveUrl ? `Live: ${p.liveUrl}` : ''}
`).join('\n')}

## Technical Skills
${profile.skills.all.join(', ')}

## Education
${profile.education.map(ed => `- ${ed.degree}, ${ed.institution} (${ed.startDate} – ${ed.endDate})`).join('\n')}
`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Derive dynamic years of experience and project metrics
  const calculatedYears = Math.max(1, profile.experience.length * 2);
  const hackathonsCount = profile.hackathons?.length || profile.achievements?.length || 2;

  return (
    <div 
      className={`min-h-screen ${fontClass} text-[#e6e2d8] selection:bg-amber-400 selection:text-black transition-colors duration-300 relative overflow-x-hidden`}
      style={{ backgroundColor: '#0d0f14' }}
    >
      {/* ── Background Subtle Tech Grid & Ambient Glows ── */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #c9a84c 1px, transparent 1px), linear-gradient(to bottom, #c9a84c 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
      <div 
        className="fixed -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: palette.accent || '#c9a84c' }}
      />
      <div 
        className="fixed bottom-0 right-10 w-[500px] h-[350px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ backgroundColor: '#e8d5a3' }}
      />

      {/* ── 1. Top Navbar ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0d0f14]/85 border-b border-[#c9a84c]/15 px-6 sm:px-12 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8b6914] via-[#c9a84c] to-[#e8d5a3] p-[1px] shadow-lg shadow-[#c9a84c]/20">
              <div className="w-full h-full bg-[#0d0f14] rounded-[11px] flex items-center justify-center font-black text-sm text-[#e8d5a3]">
                {initials.slice(0, 2)}
              </div>
            </div>
            <div className="font-mono font-bold text-base tracking-wider text-white group-hover:text-[#e8d5a3] transition-colors">
              {profile.personal.name.split(' ')[0]}<span className="text-[#c9a84c]">.</span>
            </div>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-widest text-[#a8a29e]">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors">Skills</button>
            <button onClick={() => scrollTo('experience')} className="hover:text-white transition-colors">Experience</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors">Projects</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 hover:bg-[#c9a84c]/15 text-xs font-mono text-[#e8d5a3] transition-all hover:scale-105"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>

            {profile.personal.email && (
              <button
                onClick={() => scrollTo('contact')}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8b6914] via-[#c9a84c] to-[#e8d5a3] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#c9a84c]/25 hover:scale-105"
              >
                Let's Talk
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 space-y-32 py-16 relative z-10">

        {/* ══════════════════════════════════════
             SECTION 1 — HERO
        ══════════════════════════════════════ */}
        <section id="hero" className="min-h-[75vh] flex flex-col justify-center items-center text-center space-y-8 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#e8d5a3] bg-[#c9a84c]/10 border border-[#c9a84c]/30 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Hello, World 👋</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl">
            I'm <span className="bg-gradient-to-r from-[#c9a84c] via-[#e8d5a3] to-amber-200 bg-clip-text text-transparent">{profile.personal.name}</span>
            <br />
            <span className="text-2xl sm:text-4xl md:text-5xl font-medium text-[#c9a84c] font-mono block mt-2">
              {profile.personal.professionalTitle || 'Full-Stack Developer & Systems Builder'}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#a8a29e] max-w-2xl mx-auto leading-relaxed font-light">
            {profile.personal.headline || profile.summary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo('projects')}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#8b6914] via-[#c9a84c] to-[#e8d5a3] text-black font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#c9a84c]/25 hover:scale-105 hover:brightness-110 flex items-center gap-2"
            >
              <span>View My Work</span>
              <ArrowUpRight size={15} />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-[#c9a84c]/30 text-white font-mono text-xs uppercase tracking-widest transition-all hover:border-[#c9a84c] flex items-center gap-2"
            >
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 flex flex-col items-center gap-2 text-xs font-mono text-[#78716c] opacity-80 animate-bounce">
            <ArrowDown size={14} className="text-[#c9a84c]" />
            <span className="tracking-widest uppercase text-[10px]">Scroll Down</span>
          </div>
        </section>


        {/* ══════════════════════════════════════
             SECTION 2 — ABOUT (3D Glass Card & Bio)
        ══════════════════════════════════════ */}
        <section id="about" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] font-bold block">
              01 // About
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Who Am I?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: 3D Interactive Profile Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl border border-[#c9a84c]/25 bg-gradient-to-b from-[#181c25]/90 to-[#12151c]/90 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Avatar with Glow Ring */}
                <div className="flex flex-col items-center text-center space-y-3 pt-2">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full blur-md bg-gradient-to-tr from-[#8b6914] to-[#e8d5a3] opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-24 h-24 rounded-full bg-[#181c25] border-2 border-[#c9a84c] flex items-center justify-center overflow-hidden shadow-inner">
                      {profile.personal.profileImage ? (
                        <img 
                          src={profile.personal.profileImage} 
                          alt={profile.personal.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span className="font-extrabold text-2xl text-[#e8d5a3] font-mono">
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-lg text-white">{profile.personal.name}</h3>
                    <p className="text-xs font-mono text-[#c9a84c]">{profile.personal.professionalTitle}</p>
                  </div>
                </div>

                {/* 3 Metric Stats */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 text-center font-mono">
                  <div className="p-2 rounded-xl bg-white/[0.02]">
                    <div className="text-xl font-bold text-white">{calculatedYears}+</div>
                    <div className="text-[10px] text-[#a8a29e] uppercase mt-0.5">Years Coding</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02]">
                    <div className="text-xl font-bold text-[#c9a84c]">{profile.projects.length}+</div>
                    <div className="text-[10px] text-[#a8a29e] uppercase mt-0.5">Projects</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02]">
                    <div className="text-xl font-bold text-white">{hackathonsCount}+</div>
                    <div className="text-[10px] text-[#a8a29e] uppercase mt-0.5">Milestones</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-2 text-xs font-mono text-[#a8a29e] pt-1">
                  {profile.personal.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#c9a84c]" />
                      <span>{profile.personal.location}</span>
                    </div>
                  )}
                  {profile.personal.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#c9a84c]" />
                      <span className="truncate">{profile.personal.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Narrative Bio & Tech Tags */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-[#d6d3d1] font-light">
                {profile.personal.bio || profile.summary}
              </p>

              <p className="text-sm leading-relaxed text-[#a8a29e] font-light">
                Specialized in engineering robust full-stack architectures, high-performance REST and GraphQL APIs, distributed database models, and modern user experiences that solve real-world problems.
              </p>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  ...(profile.skills.frameworks || []),
                  ...(profile.skills.languages || []),
                  ...(profile.skills.tools || [])
                ].slice(0, 10).map((tag, i) => (
                  <span 
                    key={tag + i} 
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#181c25] border border-[#c9a84c]/20 text-[#e8d5a3] hover:border-[#c9a84c] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={handleDownloadResume}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b6914] to-[#c9a84c] text-black font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-[#c9a84c]/20"
                >
                  <Download size={14} />
                  <span>Download Verified CV</span>
                </button>
              </div>
            </div>

          </div>
        </section>


        {/* ══════════════════════════════════════
             SECTION 3 — SKILLS (Categorized Systems)
        ══════════════════════════════════════ */}
        <section id="skills" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] font-bold block">
              02 // Skills
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What I Build With
            </h2>
            <p className="text-xs font-mono text-[#a8a29e]">Production-proven stacks and architectural competencies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Frontend Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center font-bold">
                  <Laptop size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a8a29e]">Client Layer</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#e8d5a3] transition-colors">
                Frontend Architecture
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Responsive reactive interfaces, accessible design systems, client state management, and modern component frameworks.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(profile.skills.frameworks || ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']).map(fw => (
                  <span key={fw} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.04] border border-white/10 text-[#e6e2d8]">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center font-bold">
                  <Server size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a8a29e]">Server Layer</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#e8d5a3] transition-colors">
                Backend & Distributed Systems
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Scalable REST APIs, event-driven microservices, auth flows (JWT/RBAC), and streaming endpoints.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(profile.skills.languages || ['Node.js', 'Express', 'Python', 'Go']).map(lang => (
                  <span key={lang} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.04] border border-white/10 text-[#e6e2d8]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases Card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center font-bold">
                  <Database size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a8a29e]">Persistence</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#e8d5a3] transition-colors">
                Databases & Telemetry
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Relational schema design, ACID transactions, document stores, indexing, caching, and cloud databases like Supabase.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['PostgreSQL', 'MongoDB', 'Supabase', 'Redis', 'Prisma'].map(db => (
                  <span key={db} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.04] border border-white/10 text-[#e6e2d8]">
                    {db}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & DevOps */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center font-bold">
                  <Terminal size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a8a29e]">Operations</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#e8d5a3] transition-colors">
                DevOps & Infrastructure
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Containerization with Docker, Git branch workflows, CI/CD automated deployment, and cloud infrastructure.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(profile.skills.tools || ['Git', 'Docker', 'Linux', 'Vercel', 'Netlify']).map(tool => (
                  <span key={tool} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.04] border border-white/10 text-[#e6e2d8]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* AI & ML */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 transition-all duration-300 space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center font-bold">
                  <Cpu size={20} />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a8a29e]">Intelligence</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#e8d5a3] transition-colors">
                AI & Applied Systems
              </h3>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                LLM integrations, prompt pipeline engineering, vector similarity search, and automated intelligence layers.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {(profile.skills.aiMl || ['PyTorch', 'LLMs', 'Cerebras', 'Groq', 'LangChain']).map(ai => (
                  <span key={ai} className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.04] border border-white/10 text-[#e6e2d8]">
                    {ai}
                  </span>
                ))}
              </div>
            </div>

            {/* All Core Disciplines */}
            <div className="p-6 rounded-2xl border border-dashed border-[#c9a84c]/30 bg-[#c9a84c]/[0.02] flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a84c]">Competency Index</span>
                <h3 className="text-lg font-bold text-white mt-1">Full Technical Arsenal</h3>
                <p className="text-xs text-[#a8a29e] mt-1 leading-relaxed">
                  Over {profile.skills.all.length}+ indexed and verified tools, libraries, and protocols in continuous active use.
                </p>
              </div>
              <div className="pt-2">
                <div className="text-2xl font-black text-[#e8d5a3] font-mono">{profile.skills.all.length} Skills</div>
                <div className="text-[11px] font-mono text-[#78716c]">100% Production Ready</div>
              </div>
            </div>

          </div>
        </section>


        {/* ══════════════════════════════════════
             SECTION 4 — EXPERIENCE (Connected Vertical Timeline)
        ══════════════════════════════════════ */}
        <section id="experience" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] font-bold block">
              03 // Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Where I've Worked
            </h2>
            <p className="text-xs font-mono text-[#a8a29e]">Real-world product engineering, systems refactoring & delivery</p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#c9a84c] before:via-[#c9a84c]/40 before:to-transparent">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="relative group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-6 sm:-left-8 top-6 w-4 h-4 rounded-full bg-[#0d0f14] border-2 border-[#c9a84c] shadow-md shadow-[#c9a84c]/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                </div>

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 transition-all duration-300 space-y-5 shadow-xl">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 flex items-center justify-center font-bold">
                        <Layers size={18} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#e8d5a3] transition-colors">
                          {exp.company}
                        </h3>
                        <p className="text-xs font-mono text-[#c9a84c]">
                          {exp.role} 
                          {exp.location && (
                            <span className="text-[#a8a29e] ml-2 text-[11px]">
                              · {exp.location}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#a8a29e] flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#c9a84c]" />
                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                        <Check size={12} />
                        <span>{exp.current ? 'Active' : 'Completed'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#d6d3d1] font-light">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {exp.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-start gap-2.5 text-xs text-[#a8a29e] leading-relaxed">
                          <Zap size={13} className="text-[#c9a84c] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies Tags */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map(t => (
                        <span 
                          key={t}
                          className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/10 text-[#c9a84c]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════
             SECTION 5 — PROJECTS (Featured Work)
        ══════════════════════════════════════ */}
        <section id="projects" className="space-y-10 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] font-bold block">
              04 // Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-xs font-mono text-[#a8a29e]">Production applications, hackathon builds & architectural solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-white/10 bg-[#12151c]/90 hover:border-[#c9a84c]/40 hover:bg-[#181c25] transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#c9a84c]/10 text-[#e8d5a3] border border-[#c9a84c]/20 font-bold">
                      0{idx + 1} // {project.category?.toUpperCase() || 'FULL-STACK'}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={e => e.stopPropagation()} 
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#a8a29e] hover:text-white transition-colors"
                          title="View GitHub Source"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={e => e.stopPropagation()} 
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#c9a84c] hover:text-[#e8d5a3] transition-colors flex items-center gap-1 text-[11px] font-mono"
                          title="Open Live Deployment"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-xl text-white group-hover:text-[#e8d5a3] transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <ArrowUpRight size={16} className="text-[#a8a29e] group-hover:text-[#c9a84c] transition-colors" />
                  </h3>

                  <p className="text-xs leading-relaxed text-[#a8a29e] font-light line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map(tech => (
                      <span 
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#d6d3d1] border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[#c9a84c] group-hover:underline flex items-center gap-1">
                    <span>Explore System Details</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ══════════════════════════════════════
             SECTION 6 — EDUCATION & CREDENTIALS
        ══════════════════════════════════════ */}
        {profile.education && profile.education.length > 0 && (
          <section id="education" className="space-y-8 scroll-mt-24">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] font-bold block">
                05 // Academic Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Education & Degrees
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {profile.education.map((edu, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl border border-white/10 bg-[#12151c]/90 space-y-2"
                >
                  <div className="flex items-center gap-2 text-[#c9a84c]">
                    <GraduationCap size={18} />
                    <span className="text-xs font-mono">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <h3 className="font-bold text-lg text-white">{edu.institution}</h3>
                  <div className="text-sm font-semibold text-[#e8d5a3]">{edu.degree}</div>
                  {edu.grade && (
                    <div className="text-xs font-mono text-[#a8a29e]">Grade / GPA: {edu.grade}</div>
                  )}
                  {edu.coursework && (
                    <div className="text-xs text-[#a8a29e] pt-1">
                      Key Modules: {edu.coursework.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}


        {/* ══════════════════════════════════════
             SECTION 7 — CONTACT & GET IN TOUCH
        ══════════════════════════════════════ */}
        <section id="contact" className="scroll-mt-24">
          <div className="p-8 sm:p-14 rounded-3xl border border-[#c9a84c]/30 bg-gradient-to-b from-[#181c25] to-[#0d0f14] text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-3 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] font-bold">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Let's Build Something Great Together
              </h2>
              <p className="text-sm text-[#a8a29e] font-light leading-relaxed">
                Whether you're looking to discuss high-concurrency systems, low-latency APIs, full-stack development, or explore new ventures — my inbox is always open.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              {profile.personal.email && (
                <a
                  href={`mailto:${profile.personal.email}`}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8b6914] via-[#c9a84c] to-[#e8d5a3] text-black font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-[#c9a84c]/25 hover:scale-105 hover:brightness-110 flex items-center gap-2"
                >
                  <Mail size={15} />
                  <span>Send Direct Email</span>
                </a>
              )}

              {profile.personal.email && (
                <button
                  onClick={handleCopyEmail}
                  className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-[#c9a84c]/30 text-white font-mono text-xs uppercase tracking-widest transition-all hover:border-[#c9a84c] flex items-center gap-2"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Email Copied!' : profile.personal.email}</span>
                </button>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-[#a8a29e] relative z-10">
              {profile.socialLinks?.github && (
                <a 
                  href={profile.socialLinks.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:text-white transition-all"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a 
                  href={profile.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:text-white transition-all"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {profile.socialLinks?.twitter && (
                <a 
                  href={profile.socialLinks.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:text-white transition-all"
                  title="Twitter"
                >
                  <Twitter size={16} />
                </a>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-xs font-mono text-[#78716c] space-y-2">
        <div>
          Designed & Built with <span className="text-[#c9a84c]">Zenith</span> · {profile.personal.name}
        </div>
        <div>
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </footer>

    </div>
  );
};
