import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Target, TrendingUp, Users, ArrowUpRight, Copy, Check, 
  Download, ExternalLink, Briefcase, Award, CheckCircle2, BarChart2
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const ProductManagerTemplate: React.FC<TemplateProps> = ({
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
    const resumeText = `# ${profile.personal.name} — ${profile.personal.professionalTitle}\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_product_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080d19] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-28">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#080d19]/90 backdrop-blur-md border-b border-blue-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300">
              <Target size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-[11px] text-blue-400 font-mono">{profile.personal.professionalTitle || 'Product Management & Strategy'}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition-colors">Product Vision</a>
            <a href="#impact" className="hover:text-blue-400 transition-colors">Business Impact</a>
            <a href="#launches" className="hover:text-blue-400 transition-colors">Product Launches</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/30"
              >
                Inquire
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-20">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-6 pt-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20">
            <TrendingUp size={13} /> Product Strategy, Growth & Execution Leadership
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Transforming ambiguous user problems into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">scalable market-leading products.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* BUSINESS IMPACT KPI TILES */}
        <section id="impact" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1527] space-y-1">
            <div className="text-3xl font-extrabold text-blue-400 font-mono">40M+</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Monthly Active Users</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1527] space-y-1">
            <div className="text-3xl font-extrabold text-sky-400 font-mono">3.8x</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Conversion Growth</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1527] space-y-1">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Launch On-Time Rate</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0d1527] space-y-1">
            <div className="text-3xl font-extrabold text-indigo-400 font-mono">{profile.projects.length}</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Products Shipped</div>
          </div>
        </section>

        {/* PRODUCT LAUNCH CASE STUDIES */}
        <section id="launches" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-blue-400 font-bold">Launches & Impact</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Shipped Product Case Studies</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.projects.length} Case Studies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-3xl border border-white/10 bg-[#0d1527] hover:border-blue-500/40 hover:bg-[#111c34] transition-all space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-mono border border-blue-500/20">
                    Product #{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-light mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.problem && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Problem Solved:</span>
                    <p className="text-slate-300 font-light">{project.problem}</p>
                  </div>
                )}

                <div className="text-xs font-mono text-blue-400 group-hover:underline pt-2">
                  View Case Study Rationale & Metrics →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Leadership History</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Product Leadership Experience</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-7 rounded-3xl border border-white/10 bg-[#0d1527] space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="text-white font-bold text-base font-sans">{exp.role} <span className="text-blue-400">@ {exp.company}</span></div>
                  <span className="text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside pt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-blue-500/30 bg-[#0d1527] text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's build products that win.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Available for product leadership appointments, advisory, and fractional CPO engagements.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Connect via Email ({profile.personal.email})
              </a>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Product Manager Portfolio
      </footer>

    </div>
  );
};
