import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Sparkles, ArrowUpRight, Copy, Check, Download, 
  ExternalLink, Layers, Compass, Award, GraduationCap, Briefcase
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const GlassmorphismTemplate: React.FC<TemplateProps> = ({
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
      className={`min-h-screen ${fontClass} text-slate-100 p-4 sm:p-8 lg:p-12 transition-colors duration-300 relative overflow-x-hidden selection:bg-cyan-500 selection:text-black pb-28`}
      style={{ backgroundColor: '#070b14' }}
    >
      {/* Shifting Glassmorphic Gradients */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #818cf8 50%, transparent 70%)' }}
      />
      <div 
        className="fixed top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c084fc 0%, #ec4899 50%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Frosted Glass Header */}
        <header className="sticky top-4 z-40 flex items-center justify-between p-4 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
              {initials}
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight">{profile.personal.name}</div>
              <div className="text-xs text-cyan-300 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-cyan-300 transition-colors">Manifesto</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Works</a>
            <a href="#experience" className="hover:text-cyan-300 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Contact'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section id="about" className="text-center space-y-6 pt-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
            <Sparkles size={13} /> Layered Glassmorphic Portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Building luminous, high-performance software for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300">modern web.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* PROJECTS SECTION WITH CRYSTALLINE CARDS */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Featured Works</span>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">Glassmorphic Architectures</h2>
            </div>
            <span className="text-xs font-mono text-cyan-400">{profile.projects.length} Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] hover:border-cyan-400/50 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl"
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

                <div className="space-y-3 pt-2 border-t border-white/5">
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

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Career Progression</span>
          <h2 className="text-3xl font-extrabold text-white">Experience Timeline</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-xl space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-cyan-400">@ {exp.company}</span></div>
                  <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" /> Technical Capabilities
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {profile.skills.all.map(s => (
              <span key={s} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's connect.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for engineering roles, technical advisory, and high-impact software projects.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Send Email ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </div>

      <footer className="border-t border-white/10 pt-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Glassmorphism Portfolio
      </footer>

    </div>
  );
};
