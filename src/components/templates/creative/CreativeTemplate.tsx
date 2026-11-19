import React from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, 
  ExternalLink, Calendar, Award, GraduationCap, Briefcase, 
  Palette, Orbit, Compass
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-syne';
  const initials = getInitials(profile.personal.name);

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 relative overflow-hidden pb-32`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full blur-[180px] opacity-25 pointer-events-none" style={{ backgroundColor: palette.accent }} />
      <div className="absolute bottom-1/3 -right-48 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20 pointer-events-none" style={{ backgroundColor: palette.accentHover }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 relative z-10 space-y-28">
        
        {/* Navigation */}
        <header className="flex items-center justify-between py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-white/20 p-1 flex items-center justify-center">
              <div 
                className="w-full h-full rounded-full flex items-center justify-center font-bold text-xs text-white shadow-lg"
                style={{ backgroundColor: palette.accent }}
              >
                {initials}
              </div>
            </div>
            <div>
              <div className="font-extrabold text-lg text-white tracking-wider uppercase">{profile.personal.name}</div>
              <div className="text-xs text-slate-400 tracking-widest uppercase">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {profile.personal.email && (
              <a 
                href={`mailto:${profile.personal.email}`}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:border-white transition-all backdrop-blur-md"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                Let's Talk
              </a>
            )}
          </div>
        </header>

        {/* Big Avant-Garde Hero */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest bg-white/5 border border-white/10 text-slate-300">
            <Orbit size={14} style={{ color: palette.accent }} /> Digital Craft & Creative Systems
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
            {profile.personal.name.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
              {profile.personal.name.split(' ').slice(1).join(' ') || 'CREATIVE'}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-3xl leading-relaxed">
            {profile.personal.headline}
          </p>
        </div>

        {/* Projects Section */}
        <div className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">Index of Works</h2>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{profile.projects.length} Works Released</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {profile.projects.map((project, idx) => (
              <div 
                key={project.id || idx}
                onClick={() => onSelectProject && onSelectProject(project)}
                className="group cursor-pointer space-y-6"
              >
                <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 relative group-hover:border-white/40 transition-all duration-500 shadow-2xl">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getProjectGradient(project.name)} p-8 flex flex-col justify-between group-hover:scale-105 transition-transform duration-700 relative`}>
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
                      <div className="relative z-10 flex justify-between items-center text-white/90">
                        <span className="text-xs font-mono font-bold tracking-widest uppercase">0{idx + 1} / WORK</span>
                        <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-3xl font-extrabold text-white drop-shadow uppercase">{project.name}</div>
                        <div className="text-xs font-mono text-white/80 mt-2">{project.technologies.slice(0, 3).join(' • ')}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors uppercase">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-light mt-1 line-clamp-2">{project.description}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{project.startDate || '2025'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-slate-400">Statement</span>
            <p className="text-lg text-slate-300 font-light leading-relaxed">{profile.personal.bio}</p>
          </div>
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-slate-400">Toolbox & Stack</span>
            <div className="flex flex-wrap gap-2">
              {profile.skills.all.map((s, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-xs uppercase tracking-wider bg-white/5 border border-white/10 text-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-16 text-center space-y-6">
          <div className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">Let's create.</div>
          {profile.personal.email && (
            <div>
              <a 
                href={`mailto:${profile.personal.email}`}
                className="inline-block text-xl sm:text-2xl font-light text-purple-400 hover:text-purple-300 underline underline-offset-8 transition-colors"
              >
                {profile.personal.email}
              </a>
            </div>
          )}
        </footer>

      </div>
    </div>
  );
};
