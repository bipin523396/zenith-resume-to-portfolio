import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  BookOpen, FileText, GraduationCap, Award, ArrowUpRight, 
  Copy, Check, ExternalLink, Bookmark, Quote
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const AcademicTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyBibtex = () => {
    const bibtex = `@article{${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_2026,
  author = {${profile.personal.name}},
  title = {${profile.personal.headline}},
  institution = {${profile.education[0]?.institution || 'Academic Institute'}},
  year = {2026}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0e1015] text-slate-200 font-serif p-6 sm:p-12 lg:p-16 selection:bg-amber-600 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* SCHOLARLY PAPER HEADER */}
        <header className="border-b border-slate-700 pb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
            <span className="px-3 py-1 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              arXiv:2603.04891 [cs.SE / cs.AI]
            </span>
            <div className="flex items-center gap-3 font-mono">
              <button
                onClick={handleCopyBibtex}
                className="hover:text-white underline underline-offset-4 flex items-center gap-1"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Quote size={12} />}
                <span>{copied ? 'BibTeX Copied' : 'Cite BibTeX'}</span>
              </button>
              {profile.personal.email && (
                <a href={`mailto:${profile.personal.email}`} className="text-slate-400 hover:text-white">
                  {profile.personal.email}
                </a>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {profile.personal.headline}
          </h1>

          <div className="font-sans text-sm text-slate-300 space-y-1">
            <div className="font-bold text-white text-base">{profile.personal.name}</div>
            <div className="text-slate-400">{profile.personal.professionalTitle} · {profile.education[0]?.institution || 'Researcher'}</div>
            {profile.personal.location && <div className="text-xs text-slate-500">{profile.personal.location}</div>}
          </div>
        </header>

        {/* ABSTRACT */}
        <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Abstract</div>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* PUBLICATIONS & RESEARCH PROJECTS */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between font-sans">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">1. Publications & Applied Systems</h2>
            <span className="text-xs font-mono text-slate-500">[{profile.projects.length} Entries]</span>
          </div>

          <div className="space-y-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-xl border border-slate-800/80 hover:border-amber-500/40 bg-slate-900/20 transition-all space-y-3 font-sans"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 font-bold">Paper / Artifact [0{idx + 1}]</span>
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>

                <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {project.name}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACADEMIC BACKGROUND & HONORS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans border-t border-slate-800 pt-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">2. Academic Background</h3>
            <div className="space-y-3">
              {profile.education.map((edu, i) => (
                <div key={i} className="text-xs space-y-1">
                  <div className="font-bold text-white text-sm">{edu.institution}</div>
                  <div className="text-slate-300">{edu.degree}</div>
                  <div className="font-mono text-slate-500">{edu.startDate} – {edu.endDate} {edu.grade ? `(Grade: ${edu.grade})` : ''}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">3. Competency Index</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.all.map(s => (
                <span key={s} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 pt-6 text-center text-xs font-mono text-slate-500">
          Published under Open Scholar License · {profile.personal.name}
        </footer>

      </div>
    </div>
  );
};
