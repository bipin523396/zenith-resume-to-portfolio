import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Palette, MousePointer2, Layers, Layout, ArrowUpRight, 
  Copy, Check, ExternalLink, Sparkles, Sliders, Eye
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const ProductDesignerTemplate: React.FC<TemplateProps> = ({
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

  const swatches = [
    { label: 'Primary', hex: '#6366f1' },
    { label: 'Accent', hex: '#ec4899' },
    { label: 'Surface', hex: '#18181b' },
    { label: 'Text', hex: '#fafafa' }
  ];

  return (
    <div className="min-h-screen bg-[#121215] text-zinc-100 font-sans p-4 sm:p-8 lg:p-12 relative selection:bg-indigo-500 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* FIGMA STYLE CANVAS TOP BAR */}
        <header className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              <MousePointer2 size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-white">{profile.personal.name}</div>
              <div className="text-[10px] text-zinc-400 font-mono">Frame: Portfolio / 1440px</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {profile.personal.openToWork && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px]">
                Open for Design Roles
              </span>
            )}
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Share Prototype'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO ARTBOARD */}
        <section className="p-8 sm:p-14 rounded-3xl border border-zinc-800 bg-zinc-900/40 relative overflow-hidden space-y-6">
          <div className="absolute top-4 right-4 text-[11px] font-mono text-zinc-500">
            [ Artboard_Hero · 100% ]
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles size={12} /> Product Design & UI/UX Systems
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Designing intuitive interfaces that merge <span className="text-indigo-400">form</span> and <span className="text-pink-400">function.</span>
            </h1>

            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              {profile.personal.headline}
            </p>
          </div>

          {/* Color Tokens Swatches */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-zinc-500">Design Tokens:</span>
            {swatches.map(s => (
              <div key={s.label} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: s.hex }} />
                <span className="text-zinc-300">{s.label}</span>
                <span className="text-zinc-500 text-[10px]">{s.hex}</span>
              </div>
            ))}
          </div>
        </section>

        {/* DESIGN CASE STUDIES (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layout size={20} className="text-indigo-400" /> Case Studies & Prototypes
            </h2>
            <span className="text-xs font-mono text-zinc-500">{profile.projects.length} Prototype Artboards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20">
                    Artboard #{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md bg-zinc-800 text-[10px] font-mono text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-indigo-400 group-hover:underline pt-1">
                  Inspect User Flow & Design Blueprint →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & CRAFT TOOLING */}
        <section className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders size={18} className="text-indigo-400" /> Design System Tooling & Competencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-200">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-800 pt-6 text-center text-xs font-mono text-zinc-500">
          © {new Date().getFullYear()} {profile.personal.name} · Figma Canvas Edition
        </footer>

      </div>
    </div>
  );
};
