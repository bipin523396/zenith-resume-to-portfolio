import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Sparkles, Terminal, Copy, Check, Download, 
  ExternalLink, Layers, Cpu, Laptop, Compass, Activity, Briefcase
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const ThreeDTemplate: React.FC<TemplateProps> = ({
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

  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — ${profile.personal.professionalTitle}\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 p-4 sm:p-8 lg:p-12 transition-colors duration-300 relative overflow-x-hidden selection:bg-purple-600 selection:text-white pb-28`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* 3D Radial Depth Ambient Lights */}
      <div 
        className="fixed -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: palette.accent }}
      />
      <div 
        className="fixed -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ backgroundColor: '#38bdf8' }}
      />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Navigation */}
        <header className="sticky top-4 z-40 flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#0c101b]/90 backdrop-blur-xl shadow-2xl">
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

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-purple-300 transition-colors">Manifesto</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">3D Decks</a>
            <a href="#tabs" className="hover:text-purple-300 transition-colors">Matrix</a>
            <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Contact'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO SECTION: 3D Depth Card */}
        <section id="about" className="relative group p-8 sm:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
              <Sparkles size={12} style={{ color: palette.accent }} /> 3D Interactive Architecture
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Designing software with <span style={{ color: palette.accent }}>micro-delight</span>, depth & robust engineering.
            </h1>

            <p className="text-lg text-slate-300 font-light leading-relaxed">
              {profile.personal.headline}
            </p>

            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {profile.personal.bio || profile.summary}
            </p>
          </div>
        </section>

        {/* 3D PERSPECTIVE PROJECT CARDS */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-purple-400 font-bold">Featured Decks</span>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">3D Interactive Project Decks</h2>
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
                  className={`cursor-pointer p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-xl ${
                    isHovered 
                      ? 'border-purple-500 bg-white/[0.06] shadow-2xl -translate-y-2' 
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-purple-300 border border-white/10">
                        {project.category || 'System'}
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

                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] font-mono text-purple-400 flex items-center justify-between pt-1">
                      <span>Inspect Architecture Spec</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE TAB SWITCHER (Stack vs Experience vs Education) */}
        <section id="tabs" className="space-y-6">
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
                Education
              </button>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">3D Interactive Tabs</span>
          </div>

          {activeTab === 'stack' && (
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
              <h3 className="text-lg font-bold text-white">Full Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.all.map(s => (
                  <span key={s} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:border-purple-500 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white font-bold text-sm font-sans">{exp.role} @ {exp.company}</span>
                    <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Connect & Collaborate.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for engineering appointments and architectural engagements worldwide.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Send Message ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </div>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · 3D Interactive Portfolio
      </footer>

    </div>
  );
};
