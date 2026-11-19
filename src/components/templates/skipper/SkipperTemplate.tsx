import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Crosshair, Radio, Shield, Terminal, Zap, ArrowUpRight, 
  Cpu, Copy, Check, ExternalLink, Activity, Wifi, Disc, AlertCircle
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const SkipperTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-mono';
  const initials = getInitials(profile.personal.name);

  const [copied, setCopied] = useState(false);
  const [hudMode, setHudMode] = useState<'nominal' | 'combat' | 'stealth'>('nominal');

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} text-emerald-400 p-4 sm:p-8 lg:p-12 relative overflow-x-hidden selection:bg-emerald-500 selection:text-black`}
      style={{ backgroundColor: '#040907' }}
    >
      {/* Skipper Cyber Grid Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Cyber Glow Accent */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* HUD TELEMETRY HEADER */}
        <header className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center font-bold text-emerald-300">
              {initials}
            </div>
            <div>
              <div className="text-sm font-bold text-emerald-300 tracking-wider uppercase flex items-center gap-2">
                {profile.personal.name} <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">OPERATIVE</span>
              </div>
              <div className="text-[11px] text-emerald-500/80">
                SYS.ID: ZENITH-{profile.personal.name.slice(0, 3).toUpperCase()} · STATUS: ONLINE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Radio size={14} className="animate-pulse" />
              <span>LINK 100%</span>
            </div>
            {profile.personal.email && (
              <button 
                onClick={handleCopyEmail}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={13} /> : <Crosshair size={13} />}
                <span>{copied ? 'ACKNOWLEDGED' : 'TRANSMIT'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HUD HERO SECTION */}
        <section className="p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 space-y-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-[10px] text-emerald-500/60 font-mono">
            COORDINATES: {profile.personal.location || 'SEC-09 // EARTH'}
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-emerald-400/80 flex items-center gap-2">
              <Zap size={13} /> Skipper Cybernetic Directive
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide uppercase leading-tight">
              {profile.personal.headline}
            </h1>
            <p className="text-sm text-emerald-300/80 font-light leading-relaxed">
              {profile.personal.bio || profile.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-500/20 text-xs">
            <div>
              <div className="text-emerald-500/60 uppercase text-[10px]">Title</div>
              <div className="text-white font-bold">{profile.personal.professionalTitle}</div>
            </div>
            <div>
              <div className="text-emerald-500/60 uppercase text-[10px]">Projects Deployed</div>
              <div className="text-white font-bold">{profile.projects.length} Architectures</div>
            </div>
            <div>
              <div className="text-emerald-500/60 uppercase text-[10px]">Core Stack</div>
              <div className="text-white font-bold">{profile.skills.all.slice(0, 3).join(', ')}</div>
            </div>
            <div>
              <div className="text-emerald-500/60 uppercase text-[10px]">Education</div>
              <div className="text-white font-bold">{profile.education[0]?.institution || 'Verified'}</div>
            </div>
          </div>
        </section>

        {/* MISSION ARCHIVES (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
              <Shield size={18} /> Mission Logs & Artifacts
            </h2>
            <span className="text-xs text-emerald-500/70">{profile.projects.length} MISSIONS LOGGED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30 transition-all space-y-4 relative"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    OBJ-0{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-emerald-400 group-hover:underline pt-1">
                  [ EXAMINE TELEMETRY BLUEPRINT ]
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SUBSYSTEMS */}
        <section className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/10 space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
            <Cpu size={18} /> Subsystem Capabilities
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors">
                :: {skill}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-emerald-500/20 pt-6 text-center text-xs text-emerald-500/60">
          TERMINAL PROTOCOL · {profile.personal.name} · SKIPPER UI ARCHITECTURE
        </footer>

      </div>
    </div>
  );
};
