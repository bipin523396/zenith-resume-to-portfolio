import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Sparkles, ArrowUpRight, Copy, Check, ExternalLink, 
  Layers, Compass, Award, GraduationCap, Briefcase
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const AuroraTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [copied, setCopied] = useState(false);

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
      style={{ backgroundColor: '#070b14' }}
    >
      {/* Aceternity / Aurora Shifting Gradient Waves */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 70%)' }}
      />
      <div 
        className="fixed top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c084fc 0%, #ec4899 50%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <header className="flex items-center justify-between p-4 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
              {initials}
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight">{profile.personal.name}</div>
              <div className="text-xs text-cyan-300/80 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Contact'}</span>
              </button>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Github size={16} />
              </a>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
            <Sparkles size={13} /> Aurora Glass Architecture
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Building luminous, high-performance software for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300">modern web.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>
        </section>

        {/* PROJECTS SECTION WITH CRYSTALLINE CARDS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Featured Architectures</h2>
            <span className="text-xs font-mono text-cyan-400">{profile.projects.length} Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-white/15 bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      0{idx + 1}
                    </span>
                    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400 group-hover:underline">
                    View Blueprint Spec →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & EXPERIENCE DUAL */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase size={18} className="text-cyan-400" /> Experience
            </h3>
            <div className="space-y-3">
              {profile.experience.map((exp, i) => (
                <div key={i} className="text-xs space-y-1">
                  <div className="font-bold text-white">{exp.role} <span className="text-cyan-400">@ {exp.company}</span></div>
                  <div className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-400" /> Core Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.all.map(s => (
                <span key={s} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {profile.personal.name} · Aurora Glass Edition
        </footer>

      </div>
    </div>
  );
};
