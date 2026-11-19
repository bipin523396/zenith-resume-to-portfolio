import React from 'react';
import { ProjectItem, ThemeConfig } from '../../types/profile';
import { getProjectGradient } from '../../services/validation/profileSafety';
import { COLOR_PALETTES } from '../../utils/themeEngine';
import { X, ExternalLink, CheckCircle2, Target, Cpu, Calendar, Tag, Layers } from 'lucide-react';
import { Github } from './BrandIcons';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  theme: ThemeConfig;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  theme,
  onClose
}) => {
  if (!project) return null;

  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn font-sans selection:bg-[#c9a84c] selection:text-[#0d0f14]">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-[rgba(200,180,120,0.18)] bg-[#12151c] text-[#ddd8cc] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[rgba(200,180,120,0.14)] bg-[#0d0f14]">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#181c25] text-[#c9a84c] border border-[rgba(200,180,120,0.2)]">
              Project Architecture
            </span>
            <span className="text-xs font-mono text-[#8a8478]">/{project.slug || 'case-study'}</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#8a8478] hover:text-[#f5f0e8] hover:bg-[#181c25] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f5f0e8] tracking-tight">{project.name}</h1>
            {project.tagline && (
              <p className="text-sm font-medium text-[#c9a84c]">{project.tagline}</p>
            )}
            <p className="text-xs sm:text-sm text-[#8a8478] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Links & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[rgba(200,180,120,0.14)]">
            <div className="flex items-center gap-4 text-xs text-[#8a8478]">
              {project.startDate && (
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar size={13} className="text-[#c9a84c]" /> {project.startDate} {project.endDate ? `– ${project.endDate}` : ''}
                </span>
              )}
              {project.role && (
                <span className="flex items-center gap-1.5 font-medium text-[#ddd8cc]">
                  <Cpu size={13} className="text-[#c9a84c]" /> {project.role}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3 py-1.5 rounded-lg bg-[#181c25] hover:bg-[#202532] border border-[rgba(200,180,120,0.18)] text-xs font-semibold text-[#f5f0e8] flex items-center gap-1.5 transition-colors"
                >
                  <Github size={13} /> Source Code
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#0d0f14] bg-gradient-to-r from-[#8b6914] to-[#c9a84c] hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-[#c9a84c]/20 transition-all"
                >
                  <ExternalLink size={13} /> Live Deployment
                </a>
              )}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0d0f14] border border-[rgba(200,180,120,0.14)] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <Target size={13} /> Problem Statement
              </div>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                {project.problem || `Traditional workflows lacked automated intelligence, creating latency and high operational bottlenecks.`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0f14] border border-[rgba(200,180,120,0.14)] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 size={13} /> Engineering Solution
              </div>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                {project.solution || project.description}
              </p>
            </div>
          </div>

          {/* Key Features & Results */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#f5f0e8] uppercase tracking-wider">Key Architectural Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#0d0f14] border border-[rgba(200,180,120,0.14)] flex items-start gap-2">
                    <span className="text-[#c9a84c] font-mono text-[11px] font-bold mt-0.5">0{idx + 1}</span>
                    <span className="text-xs text-[#ddd8cc] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#f5f0e8] uppercase tracking-wider flex items-center gap-1.5">
              <Tag size={13} className="text-[#c9a84c]" /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#181c25] text-[#e8d5a3] border border-[rgba(200,180,120,0.18)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
