import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { 
  ArrowUpRight, Image as ImageIcon, Sparkles, Copy, Check, 
  ExternalLink, Download, Layers, Layout, Eye, Maximize2
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const ImageFirstTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — Portfolio\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 font-sans selection:bg-rose-600 selection:text-white pb-28">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#090b10]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
              <ImageIcon size={20} />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white">{profile.personal.name}</div>
              <div className="text-[11px] text-rose-300 font-mono">{profile.personal.professionalTitle || 'Visual Case Studies & Architecture'}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-rose-400 transition-colors">Vision</a>
            <a href="#gallery" className="hover:text-rose-400 transition-colors">Visual Works</a>
            <a href="#experience" className="hover:text-rose-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-rose-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-600/30"
              >
                Inquire
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-24">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-6 pt-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-rose-300 bg-rose-500/10 border border-rose-500/20">
            <Sparkles size={13} /> Image-First Portfolio Architecture
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
            Visualizing complex technical systems through <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-indigo-400">immersive case studies.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* IMAGE-FIRST PROJECT SHOWCASE */}
        <section id="gallery" className="space-y-12">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-rose-400 font-bold">Featured Projects</span>
              <h2 className="text-3xl font-extrabold text-white mt-0.5">Visual Showcase & Mockups</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.projects.length} Works</span>
          </div>

          <div className="space-y-16">
            {profile.projects.map((project, idx) => {
              const gradient = getProjectGradient(project.id || idx);
              return (
                <div
                  key={project.id || idx}
                  onClick={() => onSelectProject?.(project)}
                  className="cursor-pointer group rounded-3xl border border-white/10 bg-[#0d1017] hover:border-rose-500/40 overflow-hidden transition-all duration-300 shadow-2xl"
                >
                  {/* Visual Mockup Header Artboard */}
                  <div className={`h-64 sm:h-80 w-full bg-gradient-to-br ${gradient} p-8 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500`}>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-mono font-bold">
                        Case Study 0{idx + 1}
                      </span>
                      <div className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white group-hover:bg-rose-600 transition-colors">
                        <Maximize2 size={16} />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight drop-shadow-md">
                        {project.name}
                      </div>
                      <div className="text-xs sm:text-sm text-white/90 font-mono mt-1 drop-shadow">
                        {project.tagline || 'Interactive System Architecture'}
                      </div>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-8 sm:p-10 space-y-6">
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(t => (
                          <span key={t} className="px-3 py-1 rounded-lg bg-white/5 text-xs font-mono text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="text-xs font-mono text-rose-400 group-hover:underline flex items-center gap-1">
                        <span>Inspect Full Visual Spec</span>
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase text-rose-400 font-bold">Track Record</span>
          <h2 className="text-3xl font-extrabold text-white">Experience Timeline</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-rose-400">@ {exp.company}</span></div>
                  <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-white/[0.04] to-transparent text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's craft visual excellence.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for product design leadership, creative development, and high-impact design engineering.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
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
        © {new Date().getFullYear()} {profile.personal.name} · Image-First Portfolio
      </footer>

    </div>
  );
};
