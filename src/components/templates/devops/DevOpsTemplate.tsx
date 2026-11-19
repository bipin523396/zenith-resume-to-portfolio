import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Server, HardDrive, Shield, Activity, Cpu, Terminal, 
  ArrowUpRight, Copy, Check, ExternalLink, Cloud, GitBranch, RefreshCw
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const DevOpsTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const initials = getInitials(profile.personal.name);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-mono p-4 sm:p-8 lg:p-12 relative selection:bg-sky-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* CLUSTER STATUS BAR */}
        <header className="p-4 rounded-xl border border-sky-500/20 bg-sky-950/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center font-bold text-sky-400">
              <Server size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-white uppercase">{profile.personal.name} // CLUSTER</div>
              <div className="text-[10px] text-sky-400/80">NODE: {profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              UPTIME: 99.99% · NOMINAL
            </span>
            {profile.personal.email && (
              <button 
                onClick={handleCopyEmail}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'COPIED' : 'SSH / EMAIL'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO TOPOLOGY */}
        <section className="p-8 sm:p-12 rounded-2xl border border-white/10 bg-[#0c1017] space-y-6">
          <div className="flex items-center gap-2 text-xs text-sky-400">
            <Cloud size={14} /> CLOUD INFRASTRUCTURE & SYSTEMS ARCHITECT
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {profile.personal.headline}
          </h1>

          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed font-sans">
            {profile.personal.bio || profile.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
              REGION: {profile.personal.location || 'us-east-1'}
            </span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
              SERVICES: {profile.projects.length} PODS RUNNING
            </span>
          </div>
        </section>

        {/* SERVICES / CONTAINERIZED PROJECT PODS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
              <HardDrive size={18} className="text-sky-400" /> Deployed Services & Containers
            </h2>
            <span className="text-xs text-slate-500">{profile.projects.length} CONTAINERS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-xl border border-white/10 bg-[#0c1017] hover:border-sky-500/40 hover:bg-[#0f141d] transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    pod/service-0{idx + 1}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Activity size={10} /> HEALTHY
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
                    {project.name}
                    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-sky-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-sans line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] text-sky-400 group-hover:underline pt-1">
                  kubectl describe service/{project.slug || 'spec'} →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLUSTER STACK & EXPERIENCE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-white/10 bg-[#0c1017] space-y-4">
            <h3 className="text-sm font-bold uppercase text-white flex items-center gap-2">
              <Cpu size={16} className="text-sky-400" /> Stack Dependencies
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.skills.all.map(s => (
                <span key={s} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-[#0c1017] space-y-4">
            <h3 className="text-sm font-bold uppercase text-white flex items-center gap-2">
              <GitBranch size={16} className="text-sky-400" /> Deployment History
            </h3>
            <div className="space-y-3 text-xs">
              {profile.experience.map((exp, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-bold text-white">{exp.role} @ {exp.company}</div>
                  <div className="text-[10px] text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                  <div className="text-slate-400 font-sans text-[11px]">{exp.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          SYSTEM SHUTDOWN: NEVER · {profile.personal.name} · DEVOPS TOPOLOGY
        </footer>

      </div>
    </div>
  );
};
