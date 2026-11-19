import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Sparkles, ArrowUpRight, Copy, Check, Download, ExternalLink, 
  Layers, Cpu, Code2, Globe, Flame, Compass, Briefcase, GraduationCap, Mail
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const GradientModernTemplate: React.FC<TemplateProps> = ({
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
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 relative overflow-x-hidden selection:bg-purple-500 selection:text-white pb-32`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Magic UI Retro Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(168, 85, 247, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />

      {/* Radiant Gradient Spotlights */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[140px] opacity-25 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 space-y-20 relative z-10">
        
        {/* Navigation Bar */}
        <header className="sticky top-4 z-40 flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">
              {initials}
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight">{profile.personal.name}</div>
              <div className="text-[11px] text-purple-300 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-purple-300 transition-colors">Manifesto</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-purple-300 transition-colors">Career</a>
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
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Email'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section id="about" className="text-center space-y-6 pt-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Sparkles size={13} /> Gradient Modern Portfolio Edition
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Crafting scalable systems with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">luminous precision.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-purple-400 font-bold">Featured Works</span>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">Selected Project Blueprints</h2>
            </div>
            <span className="text-xs font-mono text-purple-400">{profile.projects.length} Architectures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 font-mono border border-purple-500/20">
                      0{idx + 1} · {project.category || 'Architecture'}
                    </span>
                    <ArrowUpRight size={18} className="text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-purple-400 group-hover:underline">
                    Inspect Technical Blueprint →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase text-purple-400 font-bold">Track Record</span>
          <h2 className="text-3xl font-extrabold text-white">Experience Timeline</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-3xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-purple-400">@ {exp.company}</span></div>
                  <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-xl font-bold text-white">Technical Arsenal & Stack</h3>
          <div className="flex flex-wrap gap-2.5">
            {profile.skills.all.map(skill => (
              <span key={skill} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's build together.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for engineering appointments, high-load architecture advisory, and technical leadership.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Send Message ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </div>

      {/* FLOATING DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 p-2 rounded-2xl border border-white/20 bg-[#0d0f17]/90 backdrop-blur-2xl shadow-2xl">
          <a href="#about" className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="About">
            <Sparkles size={18} />
          </a>
          <a href="#projects" className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="Projects">
            <Layers size={18} />
          </a>
          {profile.socialLinks.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="GitHub">
              <Github size={18} />
            </a>
          )}
          {profile.personal.email && (
            <button onClick={handleCopyEmail} className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="Copy Email">
              <Mail size={18} />
            </button>
          )}
          <div className="w-[1px] h-6 bg-white/10 mx-1" />
          <div className="px-3 py-1 rounded-xl text-[10px] font-mono text-purple-300 bg-purple-500/20 border border-purple-500/30">
            Gradient Dock
          </div>
        </div>
      </div>

    </div>
  );
};
