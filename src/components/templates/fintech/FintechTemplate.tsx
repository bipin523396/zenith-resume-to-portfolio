import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  TrendingUp, Activity, DollarSign, ArrowUpRight, Copy, Check, 
  ExternalLink, BarChart3, LineChart, ShieldCheck, Zap
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const FintechTemplate: React.FC<TemplateProps> = ({
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
    <div className="min-h-screen bg-[#070b0d] text-emerald-400 font-mono p-4 sm:p-8 lg:p-12 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* FINANCIAL TICKER MARQUEE */}
        <div className="overflow-hidden whitespace-nowrap border-y border-emerald-500/20 py-2 text-xs text-emerald-500/80 flex items-center gap-8">
          <span className="flex items-center gap-1 font-bold text-white">
            <TrendingUp size={12} className="text-emerald-400" /> ZENITH/USD $94,280 (+4.8%)
          </span>
          <span>LATENCY: 18μs</span>
          <span>ALPHA: 2.45</span>
          <span>SHARPE: 3.12</span>
          <span>EXECUTION: 99.999%</span>
          <span>ALGO_STATUS: ARBITRAGE_ACTIVE</span>
        </div>

        {/* HEADER */}
        <header className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-white">
              <BarChart3 size={18} className="text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-white uppercase">{profile.personal.name}</div>
              <div className="text-xs text-emerald-400/80">Quantitative & Financial Systems Engineer</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={13} /> : <Zap size={13} />}
                <span>{copied ? 'ACKNOWLEDGED' : 'TRANSACT / CONTACT'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO QUANTITATIVE METRICS */}
        <section className="p-8 sm:p-12 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-6">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs uppercase text-emerald-500/80">HIGH-FREQUENCY ALGORITHMIC ARCHITECT</div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {profile.personal.headline}
            </h1>
            <p className="text-sm text-emerald-200/80 font-sans font-light leading-relaxed">
              {profile.personal.bio || profile.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-500/20 text-xs">
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="text-emerald-500/60 text-[10px]">EXECUTION LATENCY</div>
              <div className="text-white font-bold">&lt; 25 Microseconds</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="text-emerald-500/60 text-[10px]">PRODUCTION ENGINES</div>
              <div className="text-white font-bold">{profile.projects.length} Trading Systems</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="text-emerald-500/60 text-[10px]">RISK TOLERANCE</div>
              <div className="text-white font-bold">Deterministic VaR</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="text-emerald-500/60 text-[10px]">STATION</div>
              <div className="text-white font-bold">{profile.personal.location || 'NYC / Global'}</div>
            </div>
          </div>
        </section>

        {/* FINANCIAL & SYSTEM ENGINES (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
              <LineChart size={18} className="text-emerald-400" /> Algorithmic Systems & Order Routers
            </h2>
            <span className="text-xs text-emerald-500/80">({profile.projects.length} PRODUCTION DEPLOYMENTS)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30 transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    ORDER-ENGINE #0{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-emerald-400 group-hover:translate-x-0.5" />
                </div>

                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-emerald-200/80 mt-2 font-sans font-light line-clamp-3 leading-relaxed">
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
                  View Low-Latency Architecture & Benchmarks →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ORDER BOOK SKILLS */}
        <section className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-4">
          <h3 className="text-sm font-bold uppercase text-white">Order-Book Stack Depth</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {profile.skills.all.map(s => (
              <span key={s} className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-emerald-500/20 pt-6 text-center text-xs text-emerald-500/60">
          ORDER FULFILLED · {profile.personal.name} · FINTECH QUANTITATIVE TERMINAL
        </footer>

      </div>
    </div>
  );
};
