import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Sparkles, ArrowUpRight, Copy, Check, ExternalLink, 
  Layers, ShieldCheck, Flame, Compass
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const GlassDarkTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
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
    <div className="min-h-screen bg-[#050507] text-slate-100 font-sans p-4 sm:p-8 lg:p-12 relative selection:bg-purple-600 selection:text-white">
      {/* Obsidian Refraction Glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-900/20 via-indigo-900/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Top Navbar */}
        <header className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-bold text-white text-xs">
              {initials}
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            {profile.personal.email && (
              <button 
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Contact'}</span>
              </button>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300">
                <Github size={15} />
              </a>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-purple-300">
            <Sparkles size={12} /> Luminescence Obsidian Edition
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Engineering robust systems with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-white">stealth precision.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>
        </section>

        {/* OBSIDIAN GLASS CARDS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Selected Works</h2>
            <span className="text-xs font-mono text-slate-400">{profile.projects.length} Architectures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] text-purple-300 border border-white/[0.08]">
                      0{idx + 1}
                    </span>
                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-purple-400 group-hover:underline">
                    Inspect Technical Blueprint →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS ARSENAL */}
        <section className="p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-4">
          <h3 className="text-lg font-bold text-white">Technical Radar & Stack</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map(s => (
              <span key={s} className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300 hover:border-purple-500/50 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.08] pt-6 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {profile.personal.name} · Luminescence Obsidian
        </footer>

      </div>
    </div>
  );
};
