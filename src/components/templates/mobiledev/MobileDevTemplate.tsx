import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Smartphone, Star, ArrowDownToLine, Sparkles, ArrowUpRight, 
  Copy, Check, ExternalLink, ShieldCheck, Zap, Heart
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const MobileDevTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
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
    <div className="min-h-screen bg-[#090b10] text-slate-100 font-sans p-4 sm:p-8 lg:p-12 relative selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* APP STORE STYLE HEADER */}
        <header className="flex items-center justify-between p-4 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              <Smartphone size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-xs text-blue-400 font-mono">Mobile App Architect (iOS & Android)</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} /> : <ArrowDownToLine size={14} />}
                <span>{copied ? 'INSTALLED' : 'GET IN TOUCH'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO SECTION WITH DYNAMIC ISLAND MOCKUP */}
        <section className="p-8 sm:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-8 relative overflow-hidden">
          
          {/* Dynamic Island pill */}
          <div className="mx-auto w-48 h-8 rounded-full bg-black border border-white/20 flex items-center justify-between px-4 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dynamic Island</span>
            <span className="text-blue-400">ZenithOS</span>
          </div>

          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Engineering fluid mobile apps that feel <span className="text-blue-400">native</span> & delightful.
            </h1>
            <p className="text-base text-slate-300 font-light leading-relaxed">
              {profile.personal.headline}
            </p>

            <div className="flex items-center justify-center gap-2 pt-2 text-amber-400 text-xs font-mono">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold">5.0</span>
              <span className="text-slate-500">· {profile.projects.length} Apps Published</span>
            </div>
          </div>
        </section>

        {/* APP STORE CARDS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Featured App Releases</h2>
            <span className="text-xs font-mono text-blue-400">Top Charts #1</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                      {project.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono">v1.4 · Free with In-App Pro</div>
                    </div>
                  </div>

                  <button className="px-4 py-1.5 rounded-full bg-blue-600/20 group-hover:bg-blue-600 text-blue-300 group-hover:text-white font-bold text-xs uppercase tracking-wider transition-all">
                    GET
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-blue-400 group-hover:underline">
                    View Release Notes & Architecture →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS ARSENAL */}
        <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-lg font-bold text-white">Mobile Stack & SDK Competencies</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map(s => (
              <span key={s} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {profile.personal.name} · iOS App Store Edition
        </footer>

      </div>
    </div>
  );
};
