import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  ArrowUpRight, Copy, Check, Download, ExternalLink, 
  MapPin, Mail, Grid, Minus, Layers
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const SwissGridTemplate: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#0d0d0f] text-neutral-100 font-sans selection:bg-red-600 selection:text-white pb-24">
      
      {/* Swiss Modular Header */}
      <header className="sticky top-0 z-40 bg-[#0d0d0f]/95 backdrop-blur-md border-b-2 border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-12 divide-x-2 divide-neutral-800">
          <div className="col-span-12 sm:col-span-5 p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">DESIGN SYSTEM / SWISS-01</span>
              <span className="font-extrabold text-sm uppercase tracking-tight text-white">{profile.personal.name}</span>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">[ CH-8001 ]</span>
          </div>

          <div className="hidden sm:flex col-span-5 items-center justify-around text-xs font-mono uppercase tracking-wider text-neutral-400 p-4">
            <a href="#about" className="hover:text-red-500 transition-colors">01. Bio</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">02. Works</a>
            <a href="#experience" className="hover:text-red-500 transition-colors">03. Career</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">04. Index</a>
          </div>

          <div className="col-span-12 sm:col-span-2 p-3 flex items-center justify-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
            >
              <Download size={13} /> Resume
            </button>
          </div>
        </div>
      </header>

      {/* Main Swiss Grid Container */}
      <main className="max-w-7xl mx-auto border-x-2 border-neutral-800 divide-y-2 divide-neutral-800">
        
        {/* HERO: Asymmetric Swiss Statement */}
        <section id="about" className="grid grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-neutral-800">
          <div className="col-span-12 lg:col-span-8 p-8 sm:p-14 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              [ SECTION 01 — ARCHITECTURAL MANIFESTO ]
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white uppercase leading-[1.05]">
              {profile.personal.headline}
            </h1>

            <p className="text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl">
              {profile.personal.bio || profile.summary}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 p-8 flex flex-col justify-between space-y-8 bg-neutral-900/30">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block">COORDINATES & SPECS</span>
              <div className="text-xs font-mono space-y-2">
                <div><span className="text-neutral-500">ROLE:</span> <strong className="text-white">{profile.personal.professionalTitle}</strong></div>
                {profile.personal.location && <div><span className="text-neutral-500">BASE:</span> <strong className="text-white">{profile.personal.location}</strong></div>}
                <div><span className="text-neutral-500">MODULES:</span> <strong className="text-white">{profile.projects.length} Architectures</strong></div>
                <div><span className="text-neutral-500">STATUS:</span> <strong className="text-emerald-400">Online</strong></div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              {profile.personal.email && (
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-3 border-2 border-neutral-700 hover:border-red-500 text-xs font-mono uppercase tracking-widest text-white transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'EMAIL COPIED' : 'COPY CONTACT'}</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* PROJECTS: Structured Swiss Matrix */}
        <section id="projects" className="space-y-0">
          <div className="p-6 bg-neutral-900/40 border-b-2 border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              [ SECTION 02 — INDEXED WORK ]
            </span>
            <span className="text-xs font-mono text-neutral-400">{profile.projects.length} WORKS REGISTERED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-neutral-800">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 sm:p-10 space-y-6 hover:bg-neutral-900/50 transition-colors flex flex-col justify-between border-b-2 border-neutral-800"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2 py-0.5 bg-red-600 text-white font-bold">SWISS.0{idx + 1}</span>
                    <span className="text-neutral-500">{project.startDate || '2024'}</span>
                  </div>

                  <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white group-hover:text-red-500 transition-colors flex items-center justify-between">
                    {project.name}
                    <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-red-500 transition-colors" />
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 border border-neutral-700 text-[10px] font-mono text-neutral-400 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-red-500 group-hover:underline flex items-center justify-between">
                    <span>SPECIFICATION BLUEPRINT</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE & ACADEMICS */}
        <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-neutral-800">
          
          <div className="col-span-12 lg:col-span-7 p-8 sm:p-10 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold block">
              [ SECTION 03 — CAREER TRAJECTORY ]
            </span>
            <div className="space-y-6 divide-y-2 divide-neutral-800/80">
              {profile.experience.map((exp, i) => (
                <div key={i} className={i > 0 ? 'pt-6 space-y-2' : 'space-y-2'}>
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="text-white font-bold uppercase">{exp.role}</span>
                    <span className="text-neutral-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="text-xs font-bold text-red-500 uppercase">{exp.company}</div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 p-8 sm:p-10 space-y-6 bg-neutral-900/20">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold block">
              [ ACADEMIC FOUNDATION ]
            </span>
            <div className="space-y-4">
              {profile.education.map((edu, i) => (
                <div key={i} className="p-4 border border-neutral-800 bg-black/40 space-y-1 font-mono text-xs">
                  <div className="text-white font-bold uppercase">{edu.institution}</div>
                  <div className="text-neutral-400">{edu.degree}</div>
                  <div className="text-[10px] text-neutral-500">{edu.startDate} – {edu.endDate} {edu.grade ? `[${edu.grade}]` : ''}</div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* SKILLS INDEX */}
        <section id="skills" className="p-8 sm:p-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              [ SECTION 04 — TAXONOMY OF SKILLS ]
            </span>
            <span className="text-xs font-mono text-neutral-500">STANDARDIZED INDEX</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {profile.skills.all.map((skill, idx) => (
              <span key={skill} className="px-3 py-1 border border-neutral-700 bg-neutral-900/60 font-mono text-xs uppercase text-neutral-200">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}. {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT ROW */}
        <section id="contact" className="p-8 sm:p-12 text-center space-y-6 bg-neutral-950">
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">COMMUNICATION CHANNEL</h2>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">Available for contractual and direct corporate appointments</p>
          {profile.personal.email && (
            <div className="flex justify-center pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono uppercase tracking-widest transition-colors"
              >
                Send Transmission: {profile.personal.email}
              </a>
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto border-x-2 border-b-2 border-neutral-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div>SWISS GRID INTERNATIONAL TYPOGRAPHIC PORTFOLIO</div>
        <div>© {new Date().getFullYear()} {profile.personal.name}</div>
      </footer>

    </div>
  );
};
