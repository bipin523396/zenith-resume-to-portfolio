import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, 
  ExternalLink, Calendar, Award, GraduationCap, Briefcase, 
  Terminal, Code2, Cpu, Globe, CheckCircle2, Flame, Compass, Activity, Download, Copy, Check
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const BentoGridTemplate: React.FC<TemplateProps> = ({
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
      className={`min-h-screen ${fontClass} text-slate-100 p-4 sm:p-8 lg:p-12 transition-colors duration-300 pb-28`}
      style={{ backgroundColor: palette.bg }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Floating Header */}
        <header className="sticky top-4 z-40 flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#0c101b]/90 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <div className="font-bold text-sm leading-tight text-white">{profile.personal.name}</div>
              <div className="text-xs text-slate-400 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about-card" className="hover:text-purple-300 transition-colors">Identity</a>
            <a href="#projects-grid" className="hover:text-purple-300 transition-colors">Bento Projects</a>
            <a href="#career-card" className="hover:text-purple-300 transition-colors">Career</a>
            <a href="#contact-card" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={handleDownloadResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl text-white font-bold transition-all flex items-center gap-1.5"
                style={{ backgroundColor: palette.accent }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Email'}</span>
              </button>
            )}
          </div>
        </header>

        {/* ASYMMETRIC BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CARD 1: Hero Identity (Col 8) */}
          <div id="about-card" className="md:col-span-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: palette.accent }} />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
                <Sparkles size={12} /> Bento Modular Portfolio Architecture
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hey, I'm <span style={{ color: palette.accent }}>{profile.personal.name}</span>.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                {profile.personal.headline}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              {profile.personal.location && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <MapPin size={14} style={{ color: palette.accent }} /> {profile.personal.location}
                </span>
              )}
              {profile.education[0]?.institution && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <GraduationCap size={14} style={{ color: palette.accent }} /> {profile.education[0].institution}
                </span>
              )}
            </div>
          </div>

          {/* CARD 2: Live Metrics (Col 4) */}
          <div className="md:col-span-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Live Telemetry</span>
              <h3 className="font-bold text-white text-lg">System Metrics</h3>
            </div>

            <div className="space-y-4 font-mono">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-400">Projects Shipped</span>
                <span className="text-xl font-bold text-white" style={{ color: palette.accent }}>{profile.projects.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-400">Tech Stack Depth</span>
                <span className="text-xl font-bold text-white" style={{ color: palette.accent }}>{profile.skills.all.length}+</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-400">Career Progression</span>
                <span className="text-xl font-bold text-white" style={{ color: palette.accent }}>{profile.experience.length} Roles</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Initiatives</span>
            </div>
          </div>

          {/* CARD 3 & 4: Projects Modules (Col 6 each) */}
          <div id="projects-grid" className="col-span-12 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Featured Project Modules</h2>
              <span className="text-xs font-mono text-slate-400">Interactive Click to Inspect</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project, idx) => (
                <div
                  key={project.id || idx}
                  onClick={() => onSelectProject?.(project)}
                  className="cursor-pointer group p-7 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-purple-300 font-mono border border-white/10">
                        Module #0{idx + 1}
                      </span>
                      <ArrowUpRight size={16} className="text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                    </div>

                    <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] font-mono text-purple-400 group-hover:underline">
                      Examine Architecture Spec →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 5: Career & Experience (Col 7) */}
          <div id="career-card" className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase size={20} style={{ color: palette.accent }} /> Career Experience
            </h3>
            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <div className="text-white font-bold text-sm font-sans">{exp.role} <span style={{ color: palette.accent }}>@ {exp.company}</span></div>
                    <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 6: Technical Radar & Skills (Col 5) */}
          <div className="md:col-span-5 rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu size={20} style={{ color: palette.accent }} /> Technical Radar
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.all.map(skill => (
                <span key={skill} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 7: Contact Card (Col 12) */}
          <div id="contact-card" className="col-span-12 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-950/30 via-indigo-950/20 to-black p-10 text-center space-y-4 shadow-xl">
            <h2 className="text-3xl font-extrabold text-white">Let's build something together.</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto font-light">
              Available for full-time engineering appointments, consulting, and technical advisory.
            </p>
            {profile.personal.email && (
              <div className="pt-2 flex justify-center gap-4">
                <a
                  href={`mailto:${profile.personal.email}`}
                  className="px-8 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                  style={{ backgroundColor: palette.accent }}
                >
                  Send Direct Message
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {profile.personal.name} · Bento Grid Portfolio
        </footer>

      </div>
    </div>
  );
};
