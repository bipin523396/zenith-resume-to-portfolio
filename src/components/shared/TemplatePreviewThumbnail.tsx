import React from 'react';
import { TemplateType } from '../../types/profile';

interface TemplatePreviewThumbnailProps {
  templateId: TemplateType;
  title?: string;
  badge?: string;
  className?: string;
}

export const TemplatePreviewThumbnail: React.FC<TemplatePreviewThumbnailProps> = ({
  templateId,
  title,
  badge,
  className = 'h-28 w-full'
}) => {
  switch (templateId) {
    // 1. Full-Stack Architecture (Premier #1 Flagship)
    case 'fullstack':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#090b10] border border-[#c9a84c]/40 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          {/* Subtle Cyber Gold Mesh Background */}
          <div className="absolute inset-0 bg-radial from-[#c9a84c]/15 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          {/* Terminal / Browser Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#c9a84c]/20 pb-1.5">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              <span className="text-[9px] font-mono text-[#c9a84c] ml-1.5 font-bold">fullstack.ts</span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-[#c9a84c]/20 text-[#e8d5a3] border border-[#c9a84c]/40 font-semibold">
              ● PROD
            </span>
          </div>

          {/* Mini Fullstack Layout Mockup */}
          <div className="relative z-10 grid grid-cols-12 gap-1.5 my-auto items-center">
            {/* Left: 3D Profile Card */}
            <div className="col-span-4 rounded bg-[#131722] border border-[#c9a84c]/30 p-1 text-center shadow-xs">
              <div className="w-5 h-5 mx-auto rounded-full bg-gradient-to-tr from-[#c9a84c] to-amber-200 border border-amber-300 shadow-xs flex items-center justify-center text-[7px] font-black text-black">
                FS
              </div>
              <div className="h-1 bg-[#c9a84c]/80 rounded w-3/4 mx-auto mt-1" />
              <div className="h-0.5 bg-slate-500 rounded w-1/2 mx-auto mt-0.5" />
            </div>

            {/* Right: Code & Architecture Radar */}
            <div className="col-span-8 space-y-1">
              <div className="p-1 rounded bg-[#0d1017] border border-slate-800 text-[8px] font-mono leading-tight">
                <div className="text-emerald-400 font-bold">&gt; stack: [React, Node, DB]</div>
                <div className="text-[#c9a84c] text-[7px]">&gt; status: 99.9% Uptime</div>
              </div>
              <div className="flex gap-1">
                <span className="h-1.5 bg-[#c9a84c]/70 rounded w-1/3" />
                <span className="h-1.5 bg-blue-500/60 rounded w-1/4" />
                <span className="h-1.5 bg-emerald-500/60 rounded w-1/3" />
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-[#e8d5a3]/70 pt-1 border-t border-[#c9a84c]/15">
            <span className="text-[#c9a84c] font-semibold">Cyber Obsidian & Gold</span>
            <span>Flagship #1</span>
          </div>
        </div>
      );

    // 2. Architectural Luxury (Place #2)
    case 'luxury':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#050507] border border-[#c5a880]/40 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          {/* Satin Gold Radial Glow */}
          <div className="absolute inset-0 bg-radial from-[#c5a880]/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between border-b border-[#c5a880]/20 pb-1.5">
            <span className="text-[8px] tracking-[0.2em] uppercase font-serif text-[#e5d4be] font-bold">
              ATELIER LUXURY
            </span>
            <span className="text-[8px] text-[#c5a880] font-mono tracking-widest">
              N° 02
            </span>
          </div>

          {/* Luxury Minimalist Typography & Monogram */}
          <div className="relative z-10 my-auto text-center space-y-1">
            <div className="w-6 h-6 mx-auto rounded-full border border-[#c5a880]/60 flex items-center justify-center font-serif text-[9px] text-[#e5d4be] tracking-wider shadow-xs">
              ✦
            </div>
            <div className="text-[10px] font-serif tracking-[0.15em] text-[#f2e6d6] uppercase font-bold">
              Bespoke Portfolio
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#c5a880]/60 to-transparent w-3/4 mx-auto" />
            <div className="text-[7px] tracking-[0.1em] text-[#a89580] uppercase">
              Architectural · Stealth Obsidian
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] font-serif text-[#c5a880]/80 pt-1 border-t border-[#c5a880]/15">
            <span>Fine Gold & Charcoal</span>
            <span>Place #2</span>
          </div>
        </div>
      );

    // 3. Interactive Bento Grid
    case 'bentogrid':
    case 'bento':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#0b0f19] border border-blue-500/30 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-[9px] font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Bento Grid Matrix
            </span>
            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-blue-500/20 text-blue-300">
              LINEAR UI
            </span>
          </div>

          {/* 4 Mini Bento Cells */}
          <div className="relative z-10 grid grid-cols-3 gap-1 my-auto">
            <div className="col-span-2 rounded bg-[#131b2e] border border-blue-900/50 p-1 flex items-center gap-1.5">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[7px] text-white font-bold">
                UI
              </div>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="h-1 bg-blue-300/80 rounded w-4/5" />
                <div className="h-0.5 bg-slate-500 rounded w-1/2" />
              </div>
            </div>
            <div className="rounded bg-[#131b2e] border border-emerald-900/50 p-1 flex flex-col justify-center text-center">
              <span className="text-[7px] text-emerald-400 font-mono font-bold">+94%</span>
              <div className="h-0.5 bg-emerald-500/40 rounded w-full mt-0.5" />
            </div>
            <div className="rounded bg-[#131b2e] border border-purple-900/50 p-1 flex items-center justify-center">
              <div className="flex gap-0.5">
                <span className="w-1 h-2 rounded bg-purple-400" />
                <span className="w-1 h-3 rounded bg-purple-500" />
                <span className="w-1 h-1.5 rounded bg-purple-300" />
              </div>
            </div>
            <div className="col-span-2 rounded bg-[#131b2e] border border-slate-800 p-1 flex items-center justify-between">
              <div className="h-1 bg-slate-300 rounded w-1/2" />
              <span className="text-[7px] text-blue-400 font-mono">24+ apps</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Modular Asymmetric</span>
            <span className="text-blue-400">Interactive</span>
          </div>
        </div>
      );

    // 4. Modern Minimalist
    case 'minimalist':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#0e1117] border border-slate-700/60 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-[9px] font-bold text-white tracking-wider uppercase font-sans">
              MINIMAL SWISS
            </span>
            <span className="text-[8px] font-mono text-slate-400">INDEX.01</span>
          </div>

          <div className="my-auto space-y-1.5">
            <div className="text-[11px] font-bold text-white tracking-tight">
              Software Engineer
            </div>
            <div className="space-y-1 pl-1.5 border-l-2 border-white">
              <div className="h-1 bg-slate-300 rounded w-3/4" />
              <div className="h-0.5 bg-slate-500 rounded w-full" />
              <div className="h-0.5 bg-slate-600 rounded w-2/3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>High Contrast</span>
            <span className="text-white">Clean</span>
          </div>
        </div>
      );

    // 5. Editorial Showcase
    case 'editorial':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#141210] border border-stone-700/60 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="flex items-center justify-between border-b border-stone-800 pb-1">
            <span className="text-[9px] font-serif italic text-amber-200">The Editorial</span>
            <span className="text-[8px] uppercase tracking-widest text-stone-400">VOL. XXIV</span>
          </div>

          <div className="my-auto space-y-1">
            <div className="text-[11px] font-serif text-stone-100 font-bold leading-tight">
              Selected Works &amp; Essays
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <div className="h-4 rounded bg-stone-800/80 border border-stone-700" />
              <div className="h-4 rounded bg-stone-800/80 border border-stone-700" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-serif text-stone-400 pt-1 border-t border-stone-800">
            <span>Serif Typography</span>
            <span className="text-amber-300">Magazine</span>
          </div>
        </div>
      );

    // 6. AI/ML Researcher
    case 'aiml':
    case 'aimlresearcher':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#080312] border border-violet-500/40 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="flex items-center justify-between border-b border-violet-900/40 pb-1">
            <span className="text-[9px] font-mono text-violet-300 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Neural Matrix
            </span>
            <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-violet-900/40 text-violet-300 border border-violet-700/40">
              arXiv:2603
            </span>
          </div>

          <div className="my-auto py-1 flex items-center justify-around">
            {/* Neural Net Nodes Graphic */}
            <div className="flex flex-col gap-1">
              <span className="w-2 h-2 rounded-full bg-violet-400 shadow-xs shadow-violet-500/50" />
              <span className="w-2 h-2 rounded-full bg-violet-400 shadow-xs shadow-violet-500/50" />
            </div>
            <div className="h-px bg-gradient-to-r from-violet-500 to-fuchsia-500 w-6" />
            <div className="flex flex-col gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-xs shadow-fuchsia-500/50" />
            </div>
            <div className="h-px bg-gradient-to-r from-fuchsia-500 to-cyan-400 w-6" />
            <div className="flex flex-col gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-xs shadow-cyan-500/50" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-xs shadow-cyan-500/50" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-violet-400/80 pt-1 border-t border-violet-900/30">
            <span>PyTorch · Weights</span>
            <span>70B LLM</span>
          </div>
        </div>
      );

    // 7. Data Scientist
    case 'datascientist':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#040e14] border border-teal-500/40 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="flex items-center justify-between border-b border-teal-900/40 pb-1">
            <span className="text-[9px] font-mono text-teal-300 font-bold">Telemetry Stream</span>
            <span className="text-[8px] font-mono text-emerald-400">R² = 0.992</span>
          </div>

          {/* SVG Sparkline Graph */}
          <div className="my-auto h-7 flex items-end">
            <svg className="w-full h-full text-teal-400 overflow-visible" viewBox="0 0 100 28" fill="none">
              <path d="M0,24 Q25,8 45,18 T75,4 T100,10" stroke="currentColor" strokeWidth="2" />
              <path d="M0,24 Q25,8 45,18 T75,4 T100,10 L100,28 L0,28 Z" fill="rgba(45,212,191,0.15)" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-teal-400/80 pt-1 border-t border-teal-900/30">
            <span>Python · SQL · Telemetry</span>
            <span>Metrics</span>
          </div>
        </div>
      );

    // 8. Personal Brand Authority
    case 'personalbrand':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#0f0b1e] border border-purple-500/40 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-1">
            <span className="text-[9px] font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Executive Authority
            </span>
            <span className="text-[8px] font-semibold text-purple-300">FOUNDER</span>
          </div>

          <div className="my-auto space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-[7px] text-white font-bold">
                ✓
              </div>
              <div className="h-1.5 bg-white rounded w-2/3" />
            </div>
            <div className="flex gap-1 pt-0.5">
              <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                $10M+ ARR
              </span>
              <span className="text-[7px] font-mono px-1 py-0.2 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
                150K Users
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-purple-300/80 pt-1 border-t border-purple-900/30">
            <span>Keynote &amp; Venture</span>
            <span>Authority</span>
          </div>
        </div>
      );

    // 9. Modern Spotlight
    case 'spotlight':
      return (
        <div className={`relative overflow-hidden rounded-lg bg-black border border-blue-500/40 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          {/* Conical Spotlight Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-radial from-blue-500/40 via-cyan-500/10 to-transparent rounded-full pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-[9px] font-mono text-cyan-300 font-bold">Spotlight Beam</span>
            <span className="text-[8px] font-mono text-slate-400">KINETIC</span>
          </div>

          <div className="relative z-10 my-auto text-center space-y-1">
            <div className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/50 text-cyan-200 text-[8px] font-mono">
              ★ Spotlight Feature
            </div>
            <div className="h-1 bg-white/90 rounded w-2/3 mx-auto" />
          </div>

          <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-cyan-400/70 pt-1 border-t border-slate-800">
            <span>Dynamic Ray Tracing</span>
            <span>Focus</span>
          </div>
        </div>
      );

    // 10. Default / Fallback for other templates
    default:
      return (
        <div className={`relative overflow-hidden rounded-lg bg-[#0e121b] border border-slate-700/60 p-2.5 flex flex-col justify-between shadow-md ${className}`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-[9px] font-bold text-white font-mono uppercase truncate max-w-[120px]">
              {title || templateId}
            </span>
            {badge && (
              <span className="text-[8px] font-semibold px-1 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {badge}
              </span>
            )}
          </div>

          <div className="my-auto space-y-1">
            <div className="h-2 bg-slate-300 rounded w-3/4" />
            <div className="h-1 bg-slate-500 rounded w-full" />
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="h-3 rounded bg-slate-800 border border-slate-700" />
              <div className="h-3 rounded bg-slate-800 border border-slate-700" />
              <div className="h-3 rounded bg-slate-800 border border-slate-700" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Architectural Layout</span>
            <span className="text-blue-400">Responsive</span>
          </div>
        </div>
      );
  }
};
