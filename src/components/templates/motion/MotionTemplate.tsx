import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Sparkles, Copy, Check, Download, ExternalLink, 
  Layers, Code2, Globe, Heart, ShieldCheck, Zap, Briefcase, GraduationCap
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const MotionTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [activeCategory, setActiveCategory] = useState<string>('all');
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

  const categories = ['all', 'systems', 'ai', 'web'];

  const filteredProjects = profile.projects.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'systems') return p.category === 'systems' || p.technologies.some(t => /rust|go|c\+\+|docker|k8s|cloud/i.test(t));
    if (activeCategory === 'ai') return p.category === 'ai' || p.technologies.some(t => /ai|ml|python|pytorch|tensor/i.test(t));
    if (activeCategory === 'web') return p.category === 'web' || p.technologies.some(t => /react|next|vue|typescript|node/i.test(t));
    return true;
  });

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 relative selection:bg-pink-500 selection:text-white pb-28`}
      style={{ backgroundColor: '#09080e' }}
    >
      {/* Motion Ambient Kinetic Orbs */}
      <div className="fixed top-12 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] bg-pink-600/15 pointer-events-none" />
      <div className="fixed bottom-12 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] bg-indigo-600/15 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-10 space-y-20 relative z-10">
        
        {/* Floating Dynamic Motion Pill Bar */}
        <header className="sticky top-6 z-40 flex items-center justify-between p-3.5 rounded-full border border-white/10 bg-[#0d0f17]/90 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow">
              {initials}
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xs text-white">{profile.personal.name}</span>
            </div>
          </div>

          <nav className="flex items-center gap-2 sm:gap-4 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-pink-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">About</a>
            <a href="#work" className="hover:text-pink-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">Work</a>
            <a href="#experience" className="hover:text-pink-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">Experience</a>
            <a href="#contact" className="hover:text-pink-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="hidden sm:inline-flex px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-slate-200 hover:bg-white/5"
            >
              Resume
            </button>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow transition-all bg-gradient-to-r from-pink-500 to-indigo-600 hover:scale-105"
              >
                {copied ? 'Copied ✓' : "Let's Talk"}
              </button>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section id="about" className="text-center space-y-6 pt-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono bg-pink-500/10 border border-pink-500/20 text-pink-300">
            <Sparkles size={12} /> Kinetic Motion Portfolio
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            I craft seamless digital experiences that <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">resonate & scale.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* PROJECTS SECTION WITH CATEGORY PILLS */}
        <section id="work" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">Selected Works</span>
              <h2 className="text-3xl font-extrabold text-white">Interactive Systems</h2>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full capitalize transition-all ${
                    activeCategory === cat ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-pink-500/40 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl"
              >
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                      0{idx + 1} · {project.category || 'Architecture'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{project.startDate || '2024'}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-pink-300 transition-colors flex items-center gap-2">
                    {project.name}
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400" />
                  </h3>

                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col items-center gap-2 self-end md:self-center">
                  <button className="px-4 py-2 rounded-full bg-white/5 group-hover:bg-pink-600 text-xs font-mono text-slate-300 group-hover:text-white transition-all">
                    View Blueprint →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">Track Record</span>
          <h2 className="text-3xl font-extrabold text-white">Career Progression</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-3xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-pink-400">@ {exp.company}</span></div>
                  <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-xl font-bold text-white">Technical Arsenal</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map(skill => (
              <span key={skill} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-pink-500/30 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's build something kinetic.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for high-impact engineering leadership and creative technology ventures.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Send Message ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </div>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Motion Portfolio Edition
      </footer>

    </div>
  );
};
