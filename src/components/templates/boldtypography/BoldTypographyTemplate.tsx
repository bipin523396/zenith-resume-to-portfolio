import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  ArrowUpRight, ArrowDownRight, Copy, Check, Download, 
  Sparkles, ExternalLink, Flame, Star
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const BoldTypographyTemplate: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#0a0706] text-[#fff5ee] font-sans selection:bg-orange-600 selection:text-white pb-28">
      
      {/* Bold Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0706]/90 backdrop-blur-md border-b-4 border-orange-600 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white">
            {profile.personal.name} <span className="text-orange-500 font-mono text-sm">/ BRAND</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
            <a href="#statement" className="hover:text-orange-500 transition-colors">Vision</a>
            <a href="#work" className="hover:text-orange-500 transition-colors">Works</a>
            <a href="#experience" className="hover:text-orange-500 transition-colors">Trajectory</a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">Connect</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-4 py-1.5 border-2 border-white hover:bg-white hover:text-black font-black text-xs uppercase tracking-wider transition-all"
            >
              Resume
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Hire Me
              </a>
            )}
          </div>
        </div>
      </header>

      {/* MARQUEE BANNER */}
      <div className="overflow-hidden whitespace-nowrap bg-orange-600 text-black font-black text-xs tracking-widest uppercase py-2">
        <div className="inline-block animate-marquee">
          {profile.personal.professionalTitle} · HIGH-IMPACT ARCHITECT · AVAILABLE WORLDWIDE · {profile.skills.all.slice(0, 8).join(' · ')} · {profile.personal.name}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-28">
        
        {/* OVERSIZED HERO SECTION */}
        <section id="statement" className="space-y-8">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">
            [ PERSONAL BRAND STATEMENT ]
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white uppercase tracking-tighter leading-[0.95]">
            BUILDING WHAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-red-500">MATTERS.</span>
          </h1>

          <p className="text-xl sm:text-3xl text-neutral-200 font-light max-w-4xl leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-base text-neutral-400 font-light max-w-3xl leading-relaxed">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* WORKS SECTION (OVERSIZED TYPOGRAPHY CARDS) */}
        <section id="work" className="space-y-12">
          <div className="flex items-end justify-between border-b-4 border-white pb-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">SELECTED WORK</h2>
            <span className="text-sm font-mono text-orange-500 font-bold">[{profile.projects.length} PROJECTS]</span>
          </div>

          <div className="space-y-10">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 sm:p-14 border-4 border-neutral-800 hover:border-orange-500 bg-neutral-900/30 transition-all space-y-6"
              >
                <div className="flex justify-between items-start font-mono text-xs">
                  <span className="text-orange-500 font-bold text-sm">PROJECT #0{idx + 1}</span>
                  <ArrowUpRight size={28} className="text-neutral-500 group-hover:text-orange-500 group-hover:translate-x-2 transition-all" />
                </div>

                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  {project.name}
                </h3>

                <p className="text-base text-neutral-300 font-light max-w-3xl leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-3 py-1 bg-neutral-800 text-xs font-mono font-bold text-neutral-200 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAREER TRAJECTORY */}
        <section id="experience" className="space-y-8">
          <div className="flex items-end justify-between border-b-4 border-white pb-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">TRAJECTORY</h2>
            <span className="text-sm font-mono text-orange-500 font-bold">CAREER HISTORY</span>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-8 border-2 border-neutral-800 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-mono">
                  <span className="text-2xl font-black text-white uppercase">{exp.role}</span>
                  <span className="text-orange-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-sm font-mono text-neutral-400 font-bold uppercase">{exp.company}</div>
                <p className="text-sm text-neutral-300 font-light pt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS WALL */}
        <section className="space-y-6">
          <h3 className="text-2xl font-black uppercase text-white">TAXONOMY & CAPABILITIES</h3>
          <div className="flex flex-wrap gap-3">
            {profile.skills.all.map(skill => (
              <span key={skill} className="px-5 py-2.5 border-2 border-neutral-800 hover:border-orange-500 font-mono text-sm font-bold uppercase text-white transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* BOLD CONTACT FOOTER */}
        <section id="contact" className="p-12 sm:p-20 border-4 border-orange-600 bg-orange-600 text-black space-y-6">
          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tight leading-none">
            READY TO COLLABORATE?
          </h2>
          <p className="text-lg font-bold max-w-xl">
            Direct communication channel for senior appointments and strategic advisory.
          </p>
          {profile.personal.email && (
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-4 bg-black text-white hover:bg-neutral-900 font-black text-sm uppercase tracking-wider transition-colors shadow-2xl"
              >
                Send Email ({profile.personal.email})
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-6 py-4 border-2 border-black font-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                {copied ? 'Copied ✓' : 'Copy Email'}
              </button>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-neutral-800 py-8 text-center text-xs font-mono text-neutral-500">
        © {new Date().getFullYear()} {profile.personal.name} · Bold Typography Portfolio
      </footer>

    </div>
  );
};
