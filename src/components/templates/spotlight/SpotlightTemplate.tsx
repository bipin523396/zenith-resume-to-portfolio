import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Sparkles, ArrowUpRight, Copy, Check, ExternalLink, 
  Search, Layers, Cpu, Compass, Briefcase, GraduationCap
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const SpotlightTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const initials = getInitials(profile.personal.name);

  const [copied, setCopied] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredSkills = profile.skills.all.filter(s => 
    s.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen bg-[#07080c] text-slate-100 font-sans p-4 sm:p-8 lg:p-12 relative selection:bg-purple-500 selection:text-white"
    >
      {/* Background Interactive Radial Glow */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: palette.accent }}
      />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
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
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Contact Me'}</span>
              </button>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Github size={16} />
              </a>
            )}
          </div>
        </header>

        {/* HERO SPOTLIGHT */}
        <section className="p-8 sm:p-14 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
            <Sparkles size={12} style={{ color: palette.accent }} /> Cursor Spotlight Edition
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Illuminating complex software with <span style={{ color: palette.accent }}>clarity & performance.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
            {profile.personal.headline}
          </p>
        </section>

        {/* SPOTLIGHT CARDS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Highlighted Works</h2>
            <span className="text-xs font-mono text-purple-400">{profile.projects.length} Architectures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-purple-300 border border-white/10">
                      0{idx + 1}
                    </span>
                    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-purple-400 group-hover:underline">
                    Inspect Architecture Spec →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEARCHABLE SKILLS RADAR */}
        <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">Interactive Skills Explorer</h3>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={skillSearch}
                onChange={e => setSkillSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {filteredSkills.map(s => (
              <span key={s} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:border-purple-500 transition-colors">
                {s}
              </span>
            ))}
            {filteredSkills.length === 0 && (
              <span className="text-xs font-mono text-slate-500">No matching skills found</span>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {profile.personal.name} · Spotlight Interactive Edition
        </footer>

      </div>
    </div>
  );
};
