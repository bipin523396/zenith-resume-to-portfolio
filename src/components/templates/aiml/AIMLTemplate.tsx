import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Cpu, Sparkles, Brain, ArrowUpRight, Copy, Check, 
  ExternalLink, Layers, GitPullRequest, Database, Zap, BookOpen
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const AIMLTemplate: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#08070d] text-slate-100 font-sans p-4 sm:p-8 lg:p-12 relative selection:bg-purple-500 selection:text-white">
      {/* Ambient Neural Glow */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 rounded-2xl border border-purple-500/20 bg-purple-950/20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-purple-200">
              <Brain size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-xs text-purple-300 font-mono">Neural AI / ML Architect</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.personal.email && (
              <button 
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-mono text-purple-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Contact ML Lab'}</span>
              </button>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Github size={16} />
              </a>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Sparkles size={12} /> Neural Architectures & Frontier Models
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Engineering intelligence with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">deep learning</span> & production inference.
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          {/* AI Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-2xl font-extrabold text-purple-400 font-mono">{profile.projects.length}</div>
              <div className="text-xs text-slate-400 font-mono">Models & Systems</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-2xl font-extrabold text-indigo-400 font-mono">{profile.skills.all.length}+</div>
              <div className="text-xs text-slate-400 font-mono">Frameworks & Tools</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-2xl font-extrabold text-pink-400 font-mono">&lt; 15ms</div>
              <div className="text-xs text-slate-400 font-mono">Target Inference</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 font-mono">Reproducibility</div>
            </div>
          </div>
        </section>

        {/* AI & ML MODELS / PROJECTS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Database size={20} className="text-purple-400" /> Model Deployments & Architectures
            </h2>
            <span className="text-xs font-mono text-purple-400">{profile.projects.length} Architectures</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-purple-500/20 bg-purple-950/10 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      MODEL-0{idx + 1}
                    </span>
                    <ArrowUpRight size={16} className="text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-purple-200">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-purple-400 group-hover:underline">
                    Inspect Benchmark & Weights Spec →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH PHILOSOPHY & SKILLS */}
        <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu size={18} className="text-purple-400" /> Deep Learning Tech Matrix
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map(s => (
              <span key={s} className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-200 hover:border-purple-400 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} {profile.personal.name} · Neural AI Matrix Edition
        </footer>

      </div>
    </div>
  );
};
