import React from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, 
  ExternalLink, Calendar, Award, GraduationCap, Briefcase, 
  Terminal, Code2, Cpu, Globe, CheckCircle2, Flame, Compass, Activity
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const BentoTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 p-4 sm:p-8 lg:p-12 transition-colors duration-300`}
      style={{ backgroundColor: palette.bg }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Floating Header */}
        <header className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-lg">
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

          <div className="flex items-center gap-3 text-xs font-mono">
            {profile.personal.openToWork && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
                <Github size={16} />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
                <Linkedin size={16} />
              </a>
            )}
          </div>
        </header>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CARD 1: Hero Identity (Col 8) */}
          <div className="md:col-span-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: palette.accent }} />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
                <Sparkles size={12} /> Bento Modular Architecture
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

          {/* CARD 2: Quick Metrics Bento (Col 4) */}
          <div className="md:col-span-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">System Metrics</span>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs text-slate-400 font-mono">Current Focus</div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <Cpu size={16} style={{ color: palette.accent }} />
                  {profile.personal.professionalTitle}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-2xl font-bold text-white">{profile.projects.length}</div>
                  <div className="text-[11px] font-mono text-slate-400">AI / Web Projects</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <div className="text-2xl font-bold text-white">{profile.skills.all.length}</div>
                  <div className="text-[11px] font-mono text-slate-400">Technologies</div>
                </div>
              </div>
            </div>

            {profile.personal.email && (
              <a 
                href={`mailto:${profile.personal.email}`}
                className="mt-6 w-full py-3 rounded-xl text-center text-xs font-bold text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg"
                style={{ backgroundColor: palette.accent }}
              >
                <Mail size={14} /> Connect Directly
              </a>
            )}
          </div>

          {/* CARD 3: About Bento (Col 6) */}
          <div className="md:col-span-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">About & Background</span>
            <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
              {profile.personal.bio}
            </p>
            {profile.education[0]?.grade && (
              <div className="pt-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Academic Performance: {profile.education[0].grade}
                </span>
              </div>
            )}
          </div>

          {/* CARD 4: Skills Bento (Col 6) */}
          <div className="md:col-span-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Technical Radar</span>
              <Code2 size={16} className="text-slate-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile.skills.all.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 5: All 4 Projects Showcase Bento (Col 12) */}
          <div className="md:col-span-12 space-y-4 pt-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Selected Works (4 Projects)</span>
              <span className="text-xs font-mono text-slate-400">Click any card to inspect full architecture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map((project, idx) => (
                <div
                  key={project.id || idx}
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-8 space-y-4 transition-all duration-300 flex flex-col justify-between hover:border-purple-500/40"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/20 text-purple-300">
                        0{idx + 1} / {project.category?.toUpperCase() || 'SYSTEM'}
                      </span>
                      <ArrowUpRight size={18} className="text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>

                    <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((t, ti) => (
                        <span key={ti} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 6: Hackathons & Distinctions (Col 8) */}
          <div className="md:col-span-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Hackathons & Distinctions</span>
            <div className="space-y-4">
              {(profile.hackathons || []).map((h, hi) => (
                <div key={hi} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-sm text-white">{h.name}</div>
                    <span className="text-xs font-mono text-purple-300">{h.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 7: Certifications (Col 4) */}
          <div className="md:col-span-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Certifications</span>
              {profile.certifications.map((c, ci) => (
                <div key={ci} className="text-xs text-slate-300 flex items-start gap-2">
                  <Award size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.issuer}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-500 text-center">
              © {profile.personal.name} · Bento Architecture
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
