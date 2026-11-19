import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  ArrowUpRight, Download, Copy, Check, ExternalLink, 
  Sparkles, Crown, Shield, Globe
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const LuxuryTemplate: React.FC<TemplateProps> = ({
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
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_curriculum_vitae.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-stone-200 font-serif selection:bg-[#c5a880] selection:text-black pb-28">
      
      {/* Luxury Obsidian Gold Top Navigation */}
      <nav className="sticky top-0 z-40 bg-[#060608]/90 backdrop-blur-md border-b border-[#c5a880]/20 px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#99794e] to-[#e4ccaa] flex items-center justify-center font-bold text-black text-xs">
              <Crown size={16} />
            </div>
            <div>
              <div className="font-extrabold text-sm uppercase tracking-widest text-[#e8d5be]">{profile.personal.name}</div>
              <div className="text-[10px] text-stone-400 font-mono tracking-wider">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-stone-400">
            <a href="#about" className="hover:text-[#e4ccaa] transition-colors">Prologue</a>
            <a href="#works" className="hover:text-[#e4ccaa] transition-colors">Portfolio</a>
            <a href="#career" className="hover:text-[#e4ccaa] transition-colors">Trajectory</a>
            <a href="#contact" className="hover:text-[#e4ccaa] transition-colors">Inquiries</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadResume}
              className="px-4 py-1.5 rounded-full border border-[#c5a880]/40 text-xs font-mono tracking-wider text-[#e4ccaa] hover:bg-[#c5a880]/10 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Dossier</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-5 py-1.5 rounded-full bg-gradient-to-r from-[#b38f5f] to-[#e4ccaa] text-black font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                Engage
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-20 space-y-28">
        
        {/* HERO SECTION */}
        <section id="about" className="text-center space-y-8 pt-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#e4ccaa] border border-[#c5a880]/30 bg-[#c5a880]/5">
            <Crown size={12} /> Bespoke Technology & Executive Direction
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.12]">
            Architecting digital legacies with <span className="italic font-light text-[#e4ccaa]">uncompromising elegance.</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 font-light max-w-3xl mx-auto leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* WORKS SECTION */}
        <section id="works" className="space-y-12">
          <div className="flex items-end justify-between border-b border-[#c5a880]/20 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">Curated Works</span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white mt-1">Distinguished Architectures</h2>
            </div>
            <span className="text-xs font-mono text-stone-500">{profile.projects.length} Works Commissioned</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 sm:p-10 rounded-2xl border border-[#c5a880]/20 bg-stone-950/40 hover:border-[#c5a880]/60 transition-all duration-500 flex flex-col justify-between space-y-6 shadow-2xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#c5a880] tracking-widest">NO. 0{idx + 1}</span>
                    <ArrowUpRight size={18} className="text-stone-500 group-hover:text-[#e4ccaa] group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-2xl font-normal text-white group-hover:text-[#e4ccaa] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-800">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-[#c5a880] group-hover:underline pt-1">
                    Examine Technical Specification Blueprint →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAREER TRAJECTORY */}
        <section id="career" className="space-y-8">
          <div className="border-b border-[#c5a880]/20 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">Pedigree</span>
            <h2 className="text-3xl sm:text-4xl font-normal text-white mt-1">Professional Appointments</h2>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-8 rounded-2xl border border-stone-800/80 bg-stone-950/20 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs font-mono">
                  <span className="text-xl font-normal text-white font-serif">{exp.role} <span className="text-[#e4ccaa]">@ {exp.company}</span></span>
                  <span className="text-stone-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed pt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 sm:p-16 rounded-3xl border border-[#c5a880]/30 bg-stone-950 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-normal text-white">Private Engagements & Advisory</h2>
          <p className="text-base text-stone-300 max-w-lg mx-auto font-light">
            Direct communication for executive appointments, strategic architecture mandates, and keynote symposiums.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2 font-sans">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b38f5f] to-[#e4ccaa] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Send Communication ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-[#c5a880]/20 py-8 text-center text-xs font-mono text-stone-500">
        © {new Date().getFullYear()} {profile.personal.name} · Luxury Obsidian Gold Edition
      </footer>

    </div>
  );
};
