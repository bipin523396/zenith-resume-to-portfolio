import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Code, Sparkles, Terminal, Copy, Check, 
  ExternalLink, Layers, Cpu, Laptop, Compass, Activity, 
  CheckCircle2, Flame, FolderGit2, Briefcase, GraduationCap
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const HoverDevTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [activeTab, setActiveTab] = useState<'stack' | 'experience' | 'education'>('stack');
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 p-4 sm:p-8 lg:p-12 transition-colors duration-300 relative overflow-x-hidden`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Background Hover.dev glowing radial ambient mesh */}
      <div 
        className="fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: palette.accent }}
      />
      <div 
        className="fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ backgroundColor: '#38bdf8' }}
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Top Navbar */}
        <header className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-xs text-slate-400 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.personal.openToWork && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready to Hire
              </span>
            )}
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-all transform active:scale-95"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Email'}</span>
              </button>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all">
                <Github size={16} />
              </a>
            )}
          </div>
        </header>

        {/* HERO SECTION: Hover.dev Interactive Spring Card */}
        <section className="relative group p-8 sm:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
              <Sparkles size={12} style={{ color: palette.accent }} />
              Hover.dev Interactive Architecture
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Designing software with <span style={{ color: palette.accent }}>micro-delight</span> & robust engineering.
            </h1>

            <p className="text-lg text-slate-300 font-light leading-relaxed">
              {profile.personal.headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#projects"
                className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-white shadow-lg flex items-center gap-2 transform hover:-translate-y-1 transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                <span>Browse Interactive Projects</span>
                <ArrowUpRight size={15} />
              </a>
              {profile.personal.website && (
                <a 
                  href={profile.personal.website} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 rounded-2xl font-mono text-xs text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
                >
                  <ExternalLink size={14} /> Live Site
                </a>
              )}
            </div>
          </div>
        </section>

        {/* HOVER.DEV TABBED SWITCHER (Stack vs Experience vs Education) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'stack' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tech Matrix
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'experience' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Experience ({profile.experience.length})
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  activeTab === 'education' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Education & Awards
              </button>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">Hover.dev Slide Tabs</span>
          </div>

          {/* TAB 1: TECH STACK MATRIX */}
          {activeTab === 'stack' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                <div className="text-xs font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
                  <Terminal size={14} /> Languages
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills.languages || []).map(lang => (
                    <span key={lang} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:border-purple-500 transition-colors">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                <div className="text-xs font-mono text-indigo-400 uppercase font-bold flex items-center gap-1.5">
                  <Laptop size={14} /> Frameworks & Libraries
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills.frameworks || []).map(fw => (
                    <span key={fw} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:border-indigo-500 transition-colors">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                <div className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                  <Cpu size={14} /> AI & Infrastructure
                </div>
                <div className="flex flex-wrap gap-2">
                  {[...(profile.skills.aiMl || []), ...(profile.skills.tools || [])].slice(0, 8).map(tool => (
                    <span key={tool} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:border-emerald-500 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-4 animate-fadeIn">
              {profile.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-base">{exp.role} · <span className="text-purple-400">{exp.company}</span></h3>
                    <span className="text-xs font-mono text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: EDUCATION */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {profile.education.map((edu, idx) => (
                <div key={edu.id || idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <h3 className="font-bold text-white text-base">{edu.institution}</h3>
                  <div className="text-xs text-slate-300">{edu.degree}</div>
                  <div className="text-xs font-mono text-slate-500">{edu.startDate} – {edu.endDate} {edu.grade ? `· ${edu.grade}` : ''}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FEATURED PROJECTS WITH HOVER 3D SPOTLIGHT CARDS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Featured Builds</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Interactive Project Decks</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.projects.length} Systems</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project, idx) => {
              const isHovered = hoveredCard === idx;
              return (
                <div
                  key={project.id || idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => onSelectProject?.(project)}
                  className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group ${
                    isHovered 
                      ? 'border-purple-500 bg-white/[0.05] shadow-2xl -translate-y-1.5' 
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-purple-300 border border-white/10">
                        {project.category || 'Engineering'}
                      </span>
                      <ArrowUpRight size={15} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1 -translate-y-1 text-purple-400' : 'text-slate-500'}`} />
                    </div>

                    <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] font-mono text-purple-400 flex items-center justify-between pt-1 border-t border-white/5">
                      <span>Inspect Architecture</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© {new Date().getFullYear()} {profile.personal.name} · Hover.dev Architecture</div>
          {profile.personal.email && (
            <a href={`mailto:${profile.personal.email}`} className="text-purple-400 hover:underline">
              {profile.personal.email}
            </a>
          )}
        </footer>

      </div>
    </div>
  );
};
