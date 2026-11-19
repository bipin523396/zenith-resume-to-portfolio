import React from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, 
  ExternalLink, Calendar, Award, GraduationCap, Briefcase, 
  CheckCircle2, Layers, Cpu, Target
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const CaseStudyTemplate: React.FC<TemplateProps> = ({
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
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 pb-28`}
      style={{ backgroundColor: palette.bg }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 space-y-20">
        
        {/* Navigation */}
        <header className="flex items-center justify-between py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <div className="font-bold text-base text-white">{profile.personal.name}</div>
              <div className="text-xs text-slate-400 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {profile.personal.email && (
              <a 
                href={`mailto:${profile.personal.email}`}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                <Mail size={14} /> Contact
              </a>
            )}
          </div>
        </header>

        {/* Hero */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
            <Target size={13} /> Visual Case Studies & Engineering Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Architecting intelligent digital solutions from first principles.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-3xl leading-relaxed">
            {profile.personal.headline}
          </p>
        </div>

        {/* CASE STUDIES LIST */}
        <div className="space-y-24">
          {profile.projects.map((project, idx) => (
            <div 
              key={project.id || idx}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-2xl"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    CASE STUDY 0{idx + 1}
                  </span>
                  {project.startDate && (
                    <span className="text-xs font-mono text-slate-400">{project.startDate}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-white">
                      <Github size={14} /> Codebase
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-purple-300">
                      <ExternalLink size={14} /> Live System
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {project.name}
                </h2>
                {project.tagline && (
                  <p className="text-lg text-purple-200/90 font-medium">{project.tagline}</p>
                )}
              </div>

              {/* Visual Banner */}
              <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                {project.image ? (
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getProjectGradient(project.name)} p-8 flex flex-col justify-between relative`}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    <div className="relative z-10 flex justify-between items-center text-white/90">
                      <span className="font-mono text-sm uppercase tracking-widest font-bold">Zenith Case Study</span>
                      <Sparkles size={20} />
                    </div>
                    <div className="relative z-10 space-y-2">
                      <div className="text-2xl sm:text-4xl font-bold text-white drop-shadow">{project.name}</div>
                      <div className="text-sm font-mono text-white/80">{project.technologies.join(' • ')}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Problem vs Solution 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    <Target size={14} /> The Problem & Challenge
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {project.problem || `Traditional workflows lacked automated intelligence, creating latency and high operational bottlenecks.`}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    <CheckCircle2 size={14} /> Engineering Solution
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {project.solution || project.description}
                  </p>
                </div>
              </div>

              {/* Tech Stack & Deep Dive CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, ti) => (
                    <span key={ti} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-slate-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  Inspect Full Architecture <ArrowUpRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Interested in architectural collaboration?</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">{profile.personal.bio}</p>
          {profile.personal.email && (
            <a 
              href={`mailto:${profile.personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-xl"
              style={{ backgroundColor: palette.accent }}
            >
              <Mail size={14} /> Reach Out Directly
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
