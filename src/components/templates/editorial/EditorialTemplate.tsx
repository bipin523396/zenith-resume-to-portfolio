import React, { useState, useEffect } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, 
  ExternalLink, Calendar, Award, GraduationCap, Briefcase, 
  Terminal, ArrowDown, Check, Copy, Code2, Cpu, Globe, 
  Layers, ShieldCheck, Flame, Compass, ChevronRight, Activity
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const EditorialTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-display';
  const initials = getInitials(profile.personal.name);

  // States
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [archiveFilter, setArchiveFilter] = useState<'all' | 'ai' | 'web' | 'backend' | 'automation'>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Jarvis simulated interactive prompt
  const [jarvisInput, setJarvisInput] = useState('');
  const [jarvisLogs, setJarvisLogs] = useState<string[]>([
    '> initialize assistant...',
    '> connecting AI models (Cerebras & Groq)...',
    '> connected to SerpAPI & Zenserp search engine...',
    '> system ready. Ask about projects or architecture:'
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJarvisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jarvisInput.trim()) return;
    const q = jarvisInput.trim();
    setJarvisLogs(prev => [
      ...prev,
      `> User: ${q}`,
      `> Assistant: Querying knowledge base... Found: ${profile.personal.name} has built ${profile.projects.length} verified projects with technical skills in ${profile.skills.all.slice(0, 5).join(', ')}.`
    ]);
    setJarvisInput('');
  };

  // Tech mapping for interactive Tech Wall tooltip
  const techProjectMap: Record<string, string[]> = {
    'Python': ['Flood Prediction', 'Hospital Telemedicine', 'FinTech Assistant', 'Jarvis AI'],
    'Machine Learning': ['Flood Prediction System', 'Hospital Telemedicine', 'FinTech Assistant'],
    'Flask': ['Hospital Telemedicine', 'Flood Alert AI', 'Jarvis Assistant'],
    'JavaScript': ['Hospital Telemedicine UI', 'Flood Mapbox Visualization'],
    'MongoDB': ['Hospital EHR Database', 'Telemedicine User Records'],
    'OpenCV': ['Hospital Accident Detection', 'Facial Recognition Module'],
    'OpenWeatherMap': ['Real-Time Flood Prediction Meteorological Telemetry'],
    'LangChain': ['FinTech Conversational Advisory Context'],
    'SerpAPI': ['Jarvis AI Live Web Search Retrieval'],
    'Zenserp': ['Jarvis AI Knowledge Base Search'],
    'UiPath': ['Workflow & Data Pipeline Automation'],
    'Unity': ['3D Interactive Game Development (C#)']
  };

  // Map 4 projects cleanly
  const projects = profile.projects || [];
  const proj1 = projects[0]; // Hospital Telemedicine
  const proj2 = projects[1]; // Flood Prediction
  const proj3 = projects[2]; // FinTech
  const proj4 = projects[3]; // Jarvis AI

  // Archive filtered
  const filteredArchive = projects.filter(p => {
    if (archiveFilter === 'all') return true;
    if (archiveFilter === 'ai') return p.category === 'ai' || /ai|learning/i.test(p.name);
    if (archiveFilter === 'web') return p.category === 'web' || /web|flask|hospital/i.test(p.name);
    if (archiveFilter === 'backend') return p.category === 'backend' || /fintech|api/i.test(p.name);
    if (archiveFilter === 'automation') return p.category === 'automation';
    return true;
  });

  return (
    <div 
      className={`min-h-screen text-slate-100 ${fontClass} transition-colors duration-300 relative selection:bg-purple-500 selection:text-white pb-12`}
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {/* Background Subtle Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-25">
        <div 
          className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" 
          style={{ backgroundColor: palette.accent }}
        />
        <div 
          className="absolute top-1/2 -left-48 w-[600px] h-[600px] rounded-full blur-[180px]" 
          style={{ backgroundColor: palette.accentHover }}
        />
        <div 
          className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[160px]" 
          style={{ backgroundColor: palette.accent }}
        />
      </div>

      {/* 01 — STICKY NAVIGATION BAR */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled 
            ? 'py-3 bg-[#090a0f]/90 backdrop-blur-xl border-white/10 shadow-2xl' 
            : 'py-5 bg-transparent border-white/5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-lg transition-transform group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, ${palette.accent}, ${palette.accentHover})` }}
            >
              {initials}
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-sm text-white uppercase">{profile.personal.name}</div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider text-slate-300">
            <button onClick={() => scrollToSection('work')} className="hover:text-purple-300 transition-colors uppercase">Work</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-purple-300 transition-colors uppercase">About</button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-purple-300 transition-colors uppercase">Experience</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-purple-300 transition-colors uppercase">Skills</button>
            <button onClick={() => scrollToSection('certifications')} className="hover:text-purple-300 transition-colors uppercase">Certifications</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-purple-300 transition-colors uppercase">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            {profile.personal.email && (
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 rounded-full text-xs font-bold text-white transition-all transform hover:scale-105 shadow-md flex items-center gap-1.5"
                style={{ backgroundColor: palette.accent }}
              >
                Let's Talk <ArrowUpRight size={13} />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10 space-y-36 pt-12">
        
        {/* 02 — HERO SECTION */}
        <section className="pt-8 sm:pt-16 space-y-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {profile.personal.professionalTitle?.toUpperCase()} {profile.personal.location ? `· BASED IN ${profile.personal.location.toUpperCase()}` : ''}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-[0.95]">
              {profile.personal.name}
            </h1>
            <p className="text-2xl sm:text-4xl md:text-5xl font-light text-slate-300 max-w-4xl leading-tight">
              {profile.personal.headline}
            </p>
          </div>

          {/* Action CTAs & Scroll indicator */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('work')}
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-purple-600/30 flex items-center gap-2 transform hover:scale-105 transition-all"
              style={{ backgroundColor: palette.accent }}
            >
              View Selected Work <ArrowDown size={14} />
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              Contact Me
            </button>

            <div className="ml-auto hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Scroll to explore</span>
              <ArrowDown size={13} className="animate-bounce text-purple-400" />
            </div>
          </div>

          {/* Key Tech Highlights strip */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-400">
            {profile.skills.all.slice(0, 8).map((tech, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-purple-400">•</span>
                <span className="hover:text-white transition-colors">{tech}</span>
              </span>
            ))}
          </div>
        </section>

        {/* 03 — MARQUEE / TECH TICKER */}
        <section className="py-6 border-y border-white/10 overflow-hidden relative">
          <div className="flex gap-8 whitespace-nowrap animate-pulse font-mono text-xs uppercase tracking-widest text-slate-400">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-8">
                {profile.skills.all.slice(0, 6).map((s, si) => (
                  <React.Fragment key={si}>
                    <span className="text-white font-bold flex items-center gap-2">
                      <Sparkles size={12} className="text-purple-400" /> {s.toUpperCase()}
                    </span>
                    <span>•</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* 04 — LARGE VISUAL IDENTITY STATEMENT */}
        <section className="p-8 sm:p-14 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">Verified Portfolio</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              {profile.personal.headline}
            </h2>
            <div className="text-xs font-mono text-slate-400">
              {profile.education[0] ? `${profile.education[0].degree} · ${profile.education[0].institution}` : profile.personal.professionalTitle}
            </div>
          </div>

          <div 
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-2 border-white/20 p-2 flex items-center justify-center shadow-2xl flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${palette.accent}20, ${palette.accentHover}40)` }}
          >
            <div className="w-full h-full rounded-2xl bg-[#090a0f] flex items-center justify-center font-extrabold text-2xl tracking-widest text-white">
              [ {initials} ]
            </div>
          </div>
        </section>

        {/* 05 — ABOUT / INTRODUCTION SECTION */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16 scroll-mt-24">
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">01 / Introduction</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">About My Work</h2>
          </div>

          <div className="md:col-span-8 space-y-8">
            <p className="text-xl sm:text-2xl text-slate-200 font-light leading-relaxed">
              {profile.personal.bio || profile.summary}
            </p>

            {/* "Currently" Context card */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold flex items-center gap-2">
                <Activity size={14} /> Profile Overview
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 font-mono">Role</div>
                  <div className="font-bold text-white mt-0.5">{profile.personal.professionalTitle}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-mono">Location</div>
                  <div className="font-bold text-white mt-0.5">{profile.personal.location || 'Remote'}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-mono">Status</div>
                  <div className="font-bold text-emerald-400 mt-0.5">
                    {profile.personal.openToWork !== false ? 'Available for Work' : 'Active'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — WHAT I BUILD */}
        <section className="border-t border-white/10 pt-16 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">02 / Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">What I Build</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(profile.whatIBuild || []).map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all space-y-3">
                <span className="font-mono text-xs font-bold text-purple-400">{item.number}</span>
                <h3 className="font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">{item.description}</p>
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((t, ti) => (
                      <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 07 — SELECTED WORK (4 DISTINCT ARCHITECTURAL COMPOSITIONS) */}
        <section id="work" className="border-t border-white/10 pt-16 space-y-24 scroll-mt-24">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">03 / Selected Work</span>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">Featured Projects</h2>
            </div>
            <div className="text-xs font-mono text-slate-400 mt-4 sm:mt-0">4 Full Architectural Case Studies</div>
          </div>

          {/* PROJECT 01 — Massive Hero Featured Layout (Hospital Telemedicine) */}
          {proj1 && (
            <article 
              onClick={() => onSelectProject && onSelectProject(proj1)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-8 sm:p-14 space-y-8 transition-all duration-300 shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    SELECTED WORK 01
                  </span>
                  <span className="text-xs font-mono text-slate-400">{proj1.tagline || 'Healthcare · AI · Web Telemedicine'}</span>
                </div>
                <div className="text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Case Study <ArrowUpRight size={15} />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  {proj1.name}
                </h3>
                <p className="text-lg text-slate-300 font-light max-w-3xl leading-relaxed">
                  {proj1.description}
                </p>
              </div>

              {/* Large Project Visual */}
              <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl bg-gradient-to-br from-purple-900/60 via-indigo-950 to-black p-8 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-mono text-purple-300">
                  <span className="flex items-center gap-2"><Sparkles size={14} /> Telemedicine Core Architecture</span>
                  <span>2025 Release</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['AI Medical Report Analysis', 'OpenCV Facial Recognition', 'Accident Detection Alerts', 'Doctor Queue Booking'].map((feat, fi) => (
                    <div key={fi} className="p-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                      <div className="text-[10px] font-mono text-purple-400">0{fi + 1}</div>
                      <div className="text-xs font-bold text-white mt-1">{feat}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack & triggers */}
              <div className="flex flex-wrap gap-2 pt-2">
                {proj1.technologies.map((tech, ti) => (
                  <span key={ti} className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          )}

          {/* PROJECT 02 — Asymmetric Layout (AI Flood Prediction & Weather Telemetry) */}
          {proj2 && (
            <article 
              onClick={() => onSelectProject && onSelectProject(proj2)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-8 sm:p-12 transition-all duration-300 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      SELECTED WORK 02
                    </span>
                    <span className="text-xs font-mono text-slate-400">Disaster Prevention & Live Telemetry</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                    {proj2.name}
                  </h3>

                  <p className="text-base text-slate-300 font-light leading-relaxed">
                    {proj2.description}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-blue-300 font-mono font-semibold">
                      <Compass size={14} /> OpenWeatherMap Telemetry + Machine Learning Model
                    </div>
                    <ul className="space-y-1.5 text-slate-400 pl-4 border-l border-blue-500/30">
                      <li>• Historical hydrological regression & precipitation trends</li>
                      <li>• Interactive live map zone monitoring</li>
                      <li>• Automated emergency risk alerts to residents</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj2.technologies.map((t, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual Widget */}
                <div className="lg:col-span-5 h-72 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-950 via-slate-900 to-black p-6 flex flex-col justify-between shadow-xl">
                  <div className="flex justify-between items-center text-xs font-mono text-blue-300">
                    <span>LIVE WEATHER RADAR</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500/30">Active</span>
                  </div>
                  <div className="space-y-2 text-center my-auto">
                    <div className="text-4xl font-extrabold text-white">94.2%</div>
                    <div className="text-xs font-mono text-blue-300">Flood Prediction Confidence Score</div>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>OpenWeatherMap API</span>
                    <span>Live Mapbox</span>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* PROJECT 03 — FinTech Assistant Split Composition */}
          {proj3 && (
            <article 
              onClick={() => onSelectProject && onSelectProject(proj3)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-8 sm:p-12 transition-all duration-300 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 h-72 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950 via-slate-900 to-black p-6 flex flex-col justify-between order-2 lg:order-1 shadow-xl">
                  <div className="flex justify-between items-center text-xs font-mono text-emerald-300">
                    <span>FINANCIAL ADVISORY MATRIX</span>
                    <Flame size={14} className="text-emerald-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center my-auto">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <div className="text-xs font-bold text-white">BANKING</div>
                      <div className="text-[10px] text-slate-400">Inquiry Engine</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <div className="text-xs font-bold text-white">LOANS</div>
                      <div className="text-[10px] text-slate-400">Eligibility AI</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <div className="text-xs font-bold text-white">FINANCE</div>
                      <div className="text-[10px] text-slate-400">Wealth Advisory</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 text-center">
                    LangChain Multi-Turn Conversational Model
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      SELECTED WORK 03
                    </span>
                    <span className="text-xs font-mono text-slate-400">Intelligent Banking & Wealth Engine</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {proj3.name}
                  </h3>

                  <p className="text-base text-slate-300 font-light leading-relaxed">
                    {proj3.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj3.technologies.map((t, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* PROJECT 04 — Jarvis AI Assistant Interactive Terminal Layout */}
          {proj4 && (
            <article 
              onClick={() => onSelectProject && onSelectProject(proj4)}
              className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-8 sm:p-12 transition-all duration-300 relative overflow-hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      SELECTED WORK 04
                    </span>
                    <span className="text-xs font-mono text-slate-400">Live Search & Knowledge Retrieval</span>
                  </div>
                  <span className="text-xs font-mono text-purple-400 flex items-center gap-1">
                    Explore Project <ArrowUpRight size={14} />
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                    {proj4.name}
                  </h3>
                  <p className="text-base text-slate-300 font-light max-w-3xl">
                    {proj4.description}
                  </p>
                </div>

                {/* Live Interactive Assistant Shell Visual */}
                <div 
                  className="rounded-2xl border border-white/10 bg-black/70 p-6 font-mono text-xs text-purple-300 space-y-4 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-white font-bold">JARVIS AI KNOWLEDGE RETRIEVAL SHELL</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="text-emerald-400">✓ SerpAPI Connected</span>
                      <span className="text-emerald-400">✓ Zenserp Connected</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {jarvisLogs.map((log, li) => (
                      <div key={li} className={log.startsWith('> User:') ? 'text-white font-bold' : 'text-purple-300'}>
                        {log}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleJarvisSubmit} className="flex gap-2 pt-2 border-t border-white/10">
                    <span className="text-purple-400 font-bold self-center">❯</span>
                    <input 
                      type="text"
                      value={jarvisInput}
                      onChange={e => setJarvisInput(e.target.value)}
                      placeholder="Ask assistant anything (e.g. 'What are Bipin\'s skills?')..."
                      className="flex-1 bg-transparent border-none outline-none text-white text-xs placeholder:text-slate-600 focus:ring-0"
                    />
                    <button type="submit" className="px-3 py-1 rounded bg-purple-600 text-white font-bold text-[11px]">
                      Send
                    </button>
                  </form>
                </div>

                <div className="flex flex-wrap gap-2">
                  {proj4.technologies.map((t, ti) => (
                    <span key={ti} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )}

        </section>

        {/* 08 — INTERACTIVE PROJECT ARCHIVE */}
        <section className="border-t border-white/10 pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">04 / Archive</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">All Work Index</h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              {(['all', 'ai', 'web', 'backend'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setArchiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg uppercase transition-all ${
                    archiveFilter === filter 
                      ? 'bg-purple-600 text-white font-bold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {filteredArchive.map((proj, idx) => (
              <div 
                key={proj.id || idx}
                onClick={() => onSelectProject && onSelectProject(proj)}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:bg-white/[0.02] px-4 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-purple-400 font-bold">2025</span>
                  <div>
                    <div className="font-bold text-base text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                      {proj.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs text-slate-400">{proj.tagline || proj.description.slice(0, 60)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {proj.technologies.slice(0, 3).map((t, ti) => (
                    <span key={ti} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {t}
                    </span>
                  ))}
                  <span className="text-xs font-mono text-purple-400 ml-2 hidden sm:inline">Case Study →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 09 — EXPERIENCE / ACTIVITIES / HACKATHONS */}
        <section id="experience" className="border-t border-white/10 pt-16 space-y-10 scroll-mt-24">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">05 / Activities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Experience & Hackathons</h2>
          </div>

          <div className="space-y-6">
            {(profile.hackathons || []).map((hack, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-mono text-purple-400 font-bold">{hack.date || '2024 – 2025'}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{hack.name}</h3>
                    <div className="text-sm text-purple-300 font-medium">{hack.award || 'National Finalist'}</div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Hackathon Track
                  </span>
                </div>

                <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                  {hack.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['AI & Machine Learning', 'Web Development', 'Real-world Problem Solving', 'Team Collaboration', 'API Integration', 'Project Presentation'].map((skill, si) => (
                    <span key={si} className="text-xs font-mono px-3 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10 — EDUCATION SECTION */}
        <section className="border-t border-white/10 pt-16 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">06 / Foundation</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Education</h2>
          </div>

          <div className="space-y-6">
            {profile.education.map((edu, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-purple-400 font-bold">{edu.startDate} — {edu.endDate}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{edu.institution}</h3>
                    <div className="text-base text-slate-300">{edu.degree}</div>
                  </div>

                  {edu.grade && (
                    <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs font-bold w-fit">
                      {edu.grade}
                    </div>
                  )}
                </div>

                {edu.highlights && (
                  <div className="pt-2">
                    <div className="text-xs font-mono text-slate-400 mb-2">Core Technical Coursework:</div>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((h, hi) => (
                        <span key={hi} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 11 — INTERACTIVE VISUAL TECHNOLOGY WALL */}
        <section id="skills" className="border-t border-white/10 pt-16 space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">07 / Stack</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Technical Stack & Usage</h2>
            </div>
            <div className="text-xs font-mono text-slate-400">Hover any tool to inspect associated projects</div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] space-y-8">
            <div className="flex flex-wrap gap-3">
              {profile.skills.all.map((tech, idx) => {
                const projectsUsing = techProjectMap[tech];
                const isHovered = hoveredTech === tech;

                return (
                  <div 
                    key={idx}
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    className="relative"
                  >
                    <button 
                      className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 border ${
                        isHovered 
                          ? 'bg-purple-600 text-white border-purple-400 scale-105 shadow-lg shadow-purple-600/30 font-bold' 
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {tech}
                    </button>

                    {/* Interactive Tooltip showing which project uses it */}
                    {isHovered && projectsUsing && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-3 rounded-xl bg-[#121420] border border-purple-500/40 text-xs shadow-2xl z-30 pointer-events-none animate-fadeIn">
                        <div className="font-bold text-purple-300 font-mono text-[11px] mb-1">{tech} Used In:</div>
                        <ul className="space-y-0.5 text-slate-300 text-[11px]">
                          {projectsUsing.map((pName, pi) => (
                            <li key={pi} className="flex items-center gap-1.5">
                              <span className="text-purple-400">•</span> {pName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 12 — CERTIFICATIONS & RECOGNITION */}
        <section id="certifications" className="border-t border-white/10 pt-16 space-y-8 scroll-mt-24">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">08 / Distinctions</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Certifications & Recognition</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Award size={18} />
                  </div>
                  <span className="text-xs font-mono text-purple-400 font-bold">{cert.issueDate || '2025'}</span>
                </div>
                <h3 className="font-bold text-base text-white">{cert.name}</h3>
                <div className="text-xs text-slate-400 font-mono">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 13 — BEYOND THE RESUME / EXTRACURRICULAR */}
        {profile.extracurricular && profile.extracurricular.length > 0 && (
          <section className="border-t border-white/10 pt-16 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">09 / Ventures</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Beyond The Resume</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profile.extracurricular.map((extra, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-purple-300 font-bold">{extra.tools}</span>
                    <span className="text-slate-400">{extra.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{extra.title}</h3>
                  {extra.description && <p className="text-xs text-slate-400 leading-relaxed font-light">{extra.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 14 — "NOW" / CURRENTLY EXPLORING */}
        <section className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
            <Activity size={14} /> Currently Exploring
          </div>
          <h3 className="text-2xl font-bold text-white">Artificial Intelligence · Machine Learning · Web Systems</h3>
          <p className="text-slate-300 font-light leading-relaxed max-w-3xl">
            {profile.currently?.building || 'Building AI-powered applications, telemedicine pipelines, and intelligent search systems.'}
          </p>
          <div className="text-xs font-mono text-slate-400">Based in {profile.personal.location || 'Remote'}</div>
        </section>

        {/* 15 — CONTACT CALL-TO-ACTION */}
        <section id="contact" className="border-t border-white/10 pt-24 pb-16 text-center space-y-8 scroll-mt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 bg-purple-500/10 border border-purple-500/20">
            <Sparkles size={13} className="text-purple-400" /> Let's Connect
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Let's build something useful.
          </h2>

          <p className="text-lg text-slate-400 max-w-xl mx-auto font-light">
            Have an idea? Want to collaborate? Looking for a dedicated software & AI engineer?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {profile.personal.email && (
              <a 
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-4 rounded-full text-sm font-bold text-white shadow-2xl flex items-center gap-2 transform hover:scale-105 transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                <Mail size={16} /> Email Me Directly
              </a>
            )}

            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-6 py-4 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 flex items-center gap-2 transition-colors"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedEmail ? 'Email Copied!' : profile.personal.email}
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-slate-400">
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono hover:text-white transition-colors">
                <Github size={16} /> GitHub
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono hover:text-white transition-colors">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        </section>

        {/* 16 — EDITORIAL FOOTER */}
        <footer className="border-t border-white/10 pt-10 pb-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            <span className="font-bold text-slate-400">{profile.personal.name}</span> · Software Engineer
          </div>
          <div>
            © {new Date().getFullYear()} {profile.personal.name} · Built with Zenith Stack
          </div>
        </footer>

      </div>
    </div>
  );
};
