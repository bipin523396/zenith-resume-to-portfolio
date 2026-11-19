import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  ArrowUpRight, Download, Copy, Check, ExternalLink, 
  Sparkles, Star, Zap, Eye, Flame, Bomb
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const NeoBrutalistTemplate: React.FC<TemplateProps> = ({
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
    const resumeText = `# ${profile.personal.name} — Neo-Brutalist Portfolio\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#fefce8] text-black font-sans selection:bg-black selection:text-[#fefce8] pb-28">
      
      {/* Neo-Brutalist Bold Header */}
      <nav className="sticky top-0 z-40 bg-[#fefce8] border-b-4 border-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-sm">
              NB
            </div>
            <div>
              <div className="font-black text-base uppercase tracking-tight">{profile.personal.name}</div>
              <div className="text-[11px] font-mono font-bold text-neutral-700">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-black uppercase tracking-wider">
            <a href="#about" className="hover:bg-yellow-300 px-2 py-1 transition-colors">01. Manifesto</a>
            <a href="#projects" className="hover:bg-yellow-300 px-2 py-1 transition-colors">02. Builds</a>
            <a href="#experience" className="hover:bg-yellow-300 px-2 py-1 transition-colors">03. Career</a>
            <a href="#contact" className="hover:bg-yellow-300 px-2 py-1 transition-colors">04. Hire</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-4 py-1.5 bg-white hover:bg-neutral-100 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase tracking-wider transition-all"
            >
              Resume.txt
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-5 py-1.5 bg-pink-500 hover:bg-pink-400 text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase tracking-wider transition-all"
              >
                Let's Talk
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-24">
        
        {/* HERO SECTION */}
        <section id="about" className="p-8 sm:p-14 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="inline-block px-3 py-1 bg-yellow-400 border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ⚡ {profile.personal.professionalTitle?.toUpperCase() || 'PORTFOLIO MANIFESTO'}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.05]">
            {profile.personal.headline}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-neutral-800 leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs font-bold">
            <span className="px-3 py-1.5 bg-lime-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              📍 {profile.personal.location || 'Worldwide'}
            </span>
            <span className="px-3 py-1.5 bg-cyan-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              🚀 {profile.projects.length} Shipped Architectures
            </span>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <div>
              <span className="text-xs font-mono uppercase font-black text-pink-600">Selected Engineering Works</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">FEATURED BUILDS</h2>
            </div>
            <span className="text-xs font-mono font-bold bg-yellow-300 px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {profile.projects.length} PROJECTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2.5 py-0.5 bg-cyan-300 border-2 border-black font-black uppercase">
                      BUILD #{idx + 1}
                    </span>
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-pink-600 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-sm text-neutral-800 font-medium leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t-2 border-black">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2.5 py-0.5 bg-yellow-200 border-2 border-black text-[11px] font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono font-black text-pink-600 underline">
                    INSPECT SPECIFICATION BLUEPRINT →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight border-b-4 border-black pb-4">
            CAREER APPOINTMENTS
          </h2>

          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-8 bg-white border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono font-black gap-1">
                  <span className="text-xl font-black font-sans uppercase">{exp.role} @ {exp.company}</span>
                  <span className="bg-lime-300 px-3 py-1 border-2 border-black">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-neutral-800 font-medium leading-relaxed pt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS TICKERS */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black uppercase tracking-tight">ARSENAL OF CAPABILITIES</h3>
          <div className="flex flex-wrap gap-3">
            {profile.skills.all.map(skill => (
              <span key={skill} className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono font-black text-xs uppercase">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 sm:p-16 bg-pink-500 text-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">LET'S BUILD SOMETHING LOUD.</h2>
          <p className="text-lg font-bold max-w-xl mx-auto text-pink-100">
            Available for ambitious engineering initiatives, principal consulting, and advisory contracts.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-4 bg-yellow-400 text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 font-black text-sm uppercase tracking-wider transition-all"
              >
                Send Email ({profile.personal.email})
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-6 py-4 bg-white text-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase tracking-wider transition-all"
              >
                {copied ? 'COPIED!' : 'COPY EMAIL'}
              </button>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t-4 border-black py-8 text-center text-xs font-mono font-bold text-neutral-600">
        © {new Date().getFullYear()} {profile.personal.name} · Neo-Brutalist Architecture
      </footer>

    </div>
  );
};
