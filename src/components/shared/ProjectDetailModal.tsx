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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn font-sans">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-[#E2E8F0] bg-white text-[#172033] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header / Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
              Project Architecture
            </span>
            <span className="text-xs font-mono text-[#64748B]">/{project.slug || 'case-study'}</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-[#172033] hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Title & Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight">{project.name}</h1>
            {project.tagline && (
              <p className="text-sm font-medium text-[#2563EB]">{project.tagline}</p>
            )}
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Links & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[#E2E8F0]">
            <div className="flex items-center gap-4 text-xs text-[#64748B]">
              {project.startDate && (
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar size={13} className="text-[#2563EB]" /> {project.startDate} {project.endDate ? `– ${project.endDate}` : ''}
                </span>
              )}
              {project.role && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Cpu size={13} className="text-[#2563EB]" /> {project.role}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#172033] flex items-center gap-1.5 transition-colors"
                >
                  <Github size={13} /> Source Code
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <ExternalLink size={13} /> Live Deployment
                </a>
              )}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                <Target size={13} /> Problem Statement
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {project.problem || `Traditional workflows lacked automated intelligence, creating latency and high operational bottlenecks.`}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A]">
                <CheckCircle2 size={13} /> Engineering Solution
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {project.solution || project.description}
              </p>
            </div>
          </div>

          {/* Key Features & Results */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider">Key Architectural Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-start gap-2">
                    <span className="text-[#2563EB] font-mono text-[11px] font-bold mt-0.5">0{idx + 1}</span>
                    <span className="text-xs text-[#172033] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#14213D] uppercase tracking-wider flex items-center gap-1.5">
              <Tag size={13} /> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 text-[#172033] border border-[#CBD5E1]">
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
