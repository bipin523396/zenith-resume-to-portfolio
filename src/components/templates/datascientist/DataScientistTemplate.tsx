import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  BarChart3, LineChart, Database, Cpu, ArrowUpRight, 
  Copy, Check, Download, ExternalLink, Activity, Sigma
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const DataScientistTemplate: React.FC<TemplateProps> = ({
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

  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — Data Science & Analytics\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_data_cv.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070b0e] text-emerald-300 font-mono selection:bg-emerald-500 selection:text-black pb-28">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#070b0e]/90 backdrop-blur-md border-b border-emerald-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-bold text-emerald-400">
              <BarChart3 size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-white uppercase">{profile.personal.name}</div>
              <div className="text-[11px] text-emerald-400/80">{profile.personal.professionalTitle || 'Data Science & Quantitative Analysis'}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-emerald-400/80">
            <a href="#about" className="hover:text-emerald-300">Overview</a>
            <a href="#telemetry" className="hover:text-emerald-300">Statistical Telemetry</a>
            <a href="#projects" className="hover:text-emerald-300">Models & Pipelines</a>
            <a href="#experience" className="hover:text-emerald-300">Experience</a>
            <a href="#contact" className="hover:text-emerald-300">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export CV</span>
            </button>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                {copied ? 'ACK' : 'CONNECT'}
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-20">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-6 pt-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20">
            <Activity size={13} /> Empirical Data Science & Statistical Inference
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight font-sans">
            Extracting mathematical signal from <span className="text-emerald-400 font-mono">noisy enterprise data.</span>
          </h1>

          <p className="text-lg text-emerald-200/90 font-light leading-relaxed font-sans">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-emerald-400/80 font-light leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* STATISTICAL TELEMETRY TILES */}
        <section id="telemetry" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">10B+</div>
            <div className="text-[11px] text-emerald-400/80 uppercase">Datapoints Analyzed</div>
          </div>
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">99.4%</div>
            <div className="text-[11px] text-emerald-400/80 uppercase">Model Convergence</div>
          </div>
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">&lt; 20μs</div>
            <div className="text-[11px] text-emerald-400/80 uppercase">Inference Vectoring</div>
          </div>
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-1">
            <div className="text-3xl font-extrabold text-white font-mono">{profile.projects.length}</div>
            <div className="text-[11px] text-emerald-400/80 uppercase">Production Pipelines</div>
          </div>
        </section>

        {/* DATA SCIENCE PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <div>
              <span className="text-xs uppercase text-emerald-400 font-bold">Empirical Models</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-sans">Data Science & ML Pipelines</h2>
            </div>
            <span className="text-xs text-emerald-500/70">{profile.projects.length} PIPELINES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-2xl border border-emerald-500/25 bg-emerald-950/15 hover:border-emerald-400 hover:bg-emerald-950/30 transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    PIPELINE #0{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-emerald-500 group-hover:text-emerald-300" />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-emerald-300 transition-colors font-sans">
                    {project.name}
                  </h3>
                  <p className="text-xs text-emerald-200/80 mt-2 font-sans font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-black/40 border border-emerald-500/20 text-[10px] text-emerald-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-emerald-400 group-hover:underline pt-1">
                  &gt; inspect_pipeline_telemetry --metrics →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs uppercase text-emerald-400 font-bold">Track Record</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">Analytics & Modeling Experience</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-2xl border border-emerald-500/20 bg-emerald-950/15 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-emerald-400">@ {exp.company}</span></div>
                  <span className="text-emerald-500/70">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-emerald-200/80 font-sans font-light leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans">Let's analyze high-dimensional problems.</h2>
          <p className="text-sm text-emerald-200/80 max-w-lg mx-auto font-sans font-light">
            Available for staff data science roles, quantitative modeling, and statistical consulting.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Send Message ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-emerald-500/20 py-8 text-center text-xs text-emerald-600">
        © {new Date().getFullYear()} {profile.personal.name} · Data Science & Analytics Portfolio
      </footer>

    </div>
  );
};
