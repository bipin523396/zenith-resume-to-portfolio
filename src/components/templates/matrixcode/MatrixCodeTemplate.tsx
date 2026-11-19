import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Terminal, ShieldAlert, Cpu, ArrowUpRight, Copy, Check, 
  ExternalLink, Key, Lock, Eye, Bug
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const MatrixCodeTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 sm:p-8 lg:p-12 relative selection:bg-green-500 selection:text-black">
      {/* Cyber Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        
        {/* MATRIX TERMINAL TOP */}
        <header className="p-4 border border-green-500/40 bg-green-950/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-green-400 animate-pulse font-bold text-lg">&gt;_</span>
            <div>
              <div className="text-white font-bold text-sm tracking-widest">{profile.personal.name}</div>
              <div className="text-xs text-green-500/80">ROOT PRIVILEGES ACTIVE · {profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-300">
              SEC_CLEARANCE: TOP_SECRET
            </span>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={12} /> : <Terminal size={12} />}
                <span>{copied ? 'ACK_PAYLOAD' : 'SEND_SIGNAL'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO MATRIX DISCLOSURE */}
        <section className="p-8 border border-green-500/30 bg-green-950/10 rounded-2xl space-y-4">
          <div className="text-xs text-green-500/80 flex items-center gap-2">
            <ShieldAlert size={14} /> DECRYPTED EXECUTIVE PROFILE
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide leading-tight">
            {profile.personal.headline}
          </h1>

          <p className="text-xs sm:text-sm text-green-300/80 font-light leading-relaxed">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* EXPLOITS & DEFENSIVE ARCHITECTURES (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-green-500/30 pb-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bug size={16} className="text-green-400" /> Security Audits & Engineered Exploits
            </h2>
            <span className="text-xs text-green-500/70">[{profile.projects.length} PAYLOADS]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-xl border border-green-500/30 bg-green-950/20 hover:border-green-400 hover:bg-green-900/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-300 font-bold">CVE-2026-0{idx + 1}</span>
                  <ArrowUpRight size={14} className="text-green-500 group-hover:text-white" />
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-green-300 transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs text-green-300/80 font-light line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-black/60 border border-green-500/20 text-[10px] text-green-400">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-[10px] text-green-400 group-hover:underline pt-1">
                  sh run_exploit.sh --inspect-architecture →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS BINARY HEX */}
        <section className="p-6 border border-green-500/30 bg-green-950/10 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold uppercase text-white">Hex Dump / Injected Toolchain</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {profile.skills.all.map(s => (
              <span key={s} className="px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-300">
                0x{s}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-green-500/20 pt-6 text-center text-xs text-green-600">
          [END OF TRANSMISSION] · {profile.personal.name} · CYBER MATRIX ARCHITECTURE
        </footer>

      </div>
    </div>
  );
};
