import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Terminal, GitBranch, Shield, Cpu, ArrowUpRight, 
  Copy, Check, ExternalLink, Download, Code2, Server, FolderGit2
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const DevDarkTemplate: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#06080b] text-emerald-400 font-mono selection:bg-emerald-500 selection:text-black pb-24">
      
      {/* Top CLI Navigation */}
      <nav className="sticky top-0 z-40 bg-[#06080b]/90 backdrop-blur-md border-b border-emerald-500/20 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold text-xs uppercase tracking-wider">
              {profile.personal.name} <span className="text-emerald-500/60 font-normal">:: dev_environment</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-emerald-400/80">
            <a href="#about" className="hover:text-emerald-300">cd ~/about</a>
            <a href="#projects" className="hover:text-emerald-300">cd ~/projects</a>
            <a href="#experience" className="hover:text-emerald-300">cd ~/experience</a>
            <a href="#skills" className="hover:text-emerald-300">cd ~/stack</a>
            <a href="#contact" className="hover:text-emerald-300">cd ~/contact</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors flex items-center gap-1.5"
            >
              <Download size={12} />
              <span>resume.md</span>
            </button>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1 rounded bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                {copied ? 'COPIED' : 'SSH CONTACT'}
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-12 space-y-16">
        
        {/* HERO: Developer Terminal Shell */}
        <section id="about" className="rounded-2xl border border-emerald-500/30 bg-[#0a0e14] overflow-hidden shadow-2xl">
          <div className="bg-[#0f141d] px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-mono text-emerald-400 text-[11px]">zsh - {profile.personal.name.toLowerCase().replace(/\s+/g, '_')}@macbook</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-500/60">UTF-8 // UNIX</span>
          </div>

          <div className="p-8 sm:p-12 space-y-6">
            <div className="space-y-2">
              <div className="text-xs text-emerald-500/80 flex items-center gap-2">
                <span className="text-emerald-400">&gt;</span> cat profile.json
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {profile.personal.headline}
              </h1>
            </div>

            <p className="text-sm text-emerald-200/90 font-light leading-relaxed max-w-3xl">
              {profile.personal.bio || profile.summary}
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs border-t border-emerald-500/20">
              <div>
                <span className="text-emerald-500/60 block text-[10px]">ROLE</span>
                <span className="text-white font-bold">{profile.personal.professionalTitle}</span>
              </div>
              <div>
                <span className="text-emerald-500/60 block text-[10px]">LOCATION</span>
                <span className="text-white font-bold">{profile.personal.location || 'Remote'}</span>
              </div>
              <div>
                <span className="text-emerald-500/60 block text-[10px]">PROJECTS</span>
                <span className="text-white font-bold">{profile.projects.length} Repositories</span>
              </div>
              <div>
                <span className="text-emerald-500/60 block text-[10px]">STATUS</span>
                <span className="text-emerald-400 font-bold">READY TO DEPLOY</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <FolderGit2 size={20} className="text-emerald-400" />
              <span>git log --projects</span>
            </div>
            <span className="text-xs text-emerald-500/60">[{profile.projects.length} COMMITS]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-xl border border-emerald-500/25 bg-[#0a0e14] hover:border-emerald-400 hover:bg-[#0e141c] transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    repo/0{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="p-1 hover:text-white">
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="p-1 hover:text-white">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                    {project.name}
                    <ArrowUpRight size={16} className="text-emerald-500 group-hover:text-emerald-300" />
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-light mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-emerald-500/15">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-black/40 border border-emerald-500/20 text-[10px] text-emerald-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-emerald-400 group-hover:underline pt-1">
                    $ view_architecture --inspect →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Server size={20} className="text-emerald-400" />
              <span>cat /var/log/career_experience</span>
            </div>
          </div>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-6 rounded-xl border border-emerald-500/20 bg-[#0a0e14] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                  <div className="font-bold text-white text-sm">
                    {exp.role} <span className="text-emerald-400">@ {exp.company}</span>
                  </div>
                  <span className="text-emerald-500/70">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-emerald-200/80 leading-relaxed font-light">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="text-xs text-emerald-300/80 space-y-1 list-disc list-inside pt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS MATRIX & EDUCATION */}
        <section id="skills" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-emerald-500/20 bg-[#0a0e14] space-y-4">
            <div className="text-white font-bold text-sm flex items-center gap-2">
              <Cpu size={16} className="text-emerald-400" />
              <span>Installed Toolchain Packages</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.skills.all.map(s => (
                <span key={s} className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div id="education" className="p-6 rounded-xl border border-emerald-500/20 bg-[#0a0e14] space-y-4">
            <div className="text-white font-bold text-sm flex items-center gap-2">
              <GitBranch size={16} className="text-emerald-400" />
              <span>Education & Honors</span>
            </div>
            <div className="space-y-3 text-xs">
              {profile.education.map((edu, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-white font-bold">{edu.institution}</div>
                  <div className="text-emerald-300/80">{edu.degree} ({edu.startDate} – {edu.endDate})</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT TERMINAL */}
        <section id="contact" className="p-8 rounded-xl border border-emerald-500/30 bg-[#0a0e14] text-center space-y-4">
          <div className="text-xs text-emerald-500/70">$ ping -c 1 {profile.personal.name.toLowerCase().replace(/\s+/g, '')}.dev</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Initialize Communication</h2>
          {profile.personal.email && (
            <div className="pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="inline-block px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Send Message ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-emerald-500/20 py-6 text-center text-xs text-emerald-600">
        [PROCESS TERMINATED WITH EXIT CODE 0] · {profile.personal.name}
      </footer>

    </div>
  );
};
