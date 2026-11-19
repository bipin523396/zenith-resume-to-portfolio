import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Terminal, ShieldCheck, Briefcase, GraduationCap, Award, 
  ArrowUpRight, Copy, Check, ExternalLink, Download, Code2, Cpu
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const SoftwareEngineerTemplate: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#080b11] text-slate-100 font-sans selection:bg-cyan-600 selection:text-white pb-24">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#080b11]/90 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 flex items-center justify-center font-bold text-xs">
              SE
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-[11px] text-cyan-400 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">Engineering Focus</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Case Studies</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Stack</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-600/30"
              >
                Inquire
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-20">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-6 pt-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
            <ShieldCheck size={13} /> High-Reliability Software Engineering
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Building deterministic, fault-tolerant software systems for <span className="text-cyan-400">global scale.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Chronology</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Professional Experience</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.experience.length} Positions</span>
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-8 rounded-3xl border border-white/10 bg-[#0d121c] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm text-cyan-400 font-mono">{exp.company} {exp.location ? `· ${exp.location}` : ''}</div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed">{exp.description}</p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">›</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDIES (PROJECTS) */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Engineering Portfolio</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Project Case Studies</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Click to view blueprints</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-white/10 bg-[#0d121c] hover:border-cyan-500/40 hover:bg-[#111825] transition-all space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
                    System #{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-light mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-mono text-cyan-400 group-hover:underline pt-1">
                  Examine Architecture & Problem/Solution →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & EDUCATION */}
        <section id="skills" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl border border-white/10 bg-[#0d121c] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 size={18} className="text-cyan-400" /> Technical Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.all.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div id="education" className="p-8 rounded-3xl border border-white/10 bg-[#0d121c] space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap size={18} className="text-cyan-400" /> Academic Background
            </h3>
            <div className="space-y-3">
              {profile.education.map((edu, i) => (
                <div key={i} className="space-y-0.5 text-xs font-mono">
                  <div className="text-white font-bold">{edu.institution}</div>
                  <div className="text-slate-300">{edu.degree} {edu.grade ? `(${edu.grade})` : ''}</div>
                  <div className="text-slate-500">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-10 rounded-3xl border border-cyan-500/30 bg-[#0d121c] text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Engineering Inquiries & Contact</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto font-light">
            Open to senior engineering opportunities, technical challenges, and distributed systems consulting.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Send Message
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Software Engineer Portfolio
      </footer>

    </div>
  );
};
