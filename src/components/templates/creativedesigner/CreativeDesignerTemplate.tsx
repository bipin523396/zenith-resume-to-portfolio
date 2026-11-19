import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Palette, Sparkles, ArrowUpRight, Copy, Check, 
  ExternalLink, Download, Eye, Layers, Compass, Star
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const CreativeDesignerTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — Creative Designer & Art Director\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_design_cv.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} text-amber-100 transition-colors duration-300 pb-28 relative overflow-x-hidden`}
      style={{ backgroundColor: palette.bg }}
    >
      
      {/* Avant-Garde Ambient Orbs */}
      <div className="fixed -top-40 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] bg-gradient-to-r from-amber-600/20 via-pink-600/15 to-purple-800/20 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-l from-orange-600/15 via-rose-600/15 to-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#09080e]/85 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center font-bold text-black shadow-lg shadow-amber-500/20">
              <Palette size={20} />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-wide">{profile.personal.name}</div>
              <div className="text-[11px] text-amber-300 font-mono">{profile.personal.professionalTitle || 'Creative Director & Visual Designer'}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">Manifesto</a>
            <a href="#works" className="hover:text-amber-400 transition-colors">Selected Gallery</a>
            <a href="#experience" className="hover:text-amber-400 transition-colors">Career Timeline</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Connect</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Folio CV</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
              >
                Inquire
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-24 relative z-10">
        
        {/* HERO SECTION */}
        <section id="about" className="text-center space-y-6 pt-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 shadow-inner">
            <Sparkles size={13} /> Avant-Garde Creative Design Showcase
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Crafting emotive visual identities & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400">digital futures.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* CREATIVE GALLERY (PROJECTS) */}
        <section id="works" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Exhibition</span>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">Selected Creative Works</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.projects.length} Works Exhibited</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber-500/40 transition-all duration-300 space-y-6 shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-amber-300 font-mono border border-amber-500/30">
                      Folio #0{idx + 1}
                    </span>
                    <ArrowUpRight size={18} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-300 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-amber-400 group-hover:underline pt-1">
                    Examine Creative Rationale & Design Spec →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase text-amber-400 font-bold">Artistic Journey</span>
          <h2 className="text-3xl font-extrabold text-white">Experience & Residencies</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-amber-400">@ {exp.company}</span></div>
                  <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ARTISTIC TOOLKIT */}
        <section className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass size={20} className="text-amber-400" /> Creative Tools & Mediums
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {profile.skills.all.map(s => (
              <span key={s} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-amber-100 hover:border-amber-400 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's create something extraordinary.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for art direction commissions, brand transformations, and visionary creative leadership.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Inquire via Email
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Creative Designer Portfolio
      </footer>

    </div>
  );
};
