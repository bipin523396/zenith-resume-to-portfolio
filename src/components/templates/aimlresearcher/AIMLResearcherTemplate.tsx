import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Brain, Cpu, BookOpen, Database, Sparkles, ArrowUpRight, 
  Copy, Check, ExternalLink, Download, FileText, Quote, Layers
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const AIMLResearcherTemplate: React.FC<TemplateProps> = ({
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
    const resumeText = `# ${profile.personal.name} — AI/ML Research Scientist\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_cv.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#07060c] text-purple-100 font-sans selection:bg-purple-600 selection:text-white pb-24">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#07060c]/90 backdrop-blur-md border-b border-purple-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300">
              <Brain size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-[11px] text-purple-400 font-mono">{profile.personal.professionalTitle || 'AI & Machine Learning Research'}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-purple-200">
            <a href="#about" className="hover:text-purple-400 transition-colors">Abstract</a>
            <a href="#models" className="hover:text-purple-400 transition-colors">Models & Systems</a>
            <a href="#publications" className="hover:text-purple-400 transition-colors">Publications</a>
            <a href="#experience" className="hover:text-purple-400 transition-colors">Research Appointments</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-xs font-mono text-purple-300 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Download CV</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/30"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20">
            <Sparkles size={13} /> Neural Architectures & Frontier Foundation Models
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Advancing artificial intelligence through <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">rigorous research</span> & scalable systems.
          </h1>

          <p className="text-lg text-purple-200/90 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>

          {/* Research Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono">
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/20">
              <div className="text-2xl font-bold text-purple-300">{profile.projects.length}</div>
              <div className="text-[11px] text-purple-400/80">Models & Systems</div>
            </div>
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/20">
              <div className="text-2xl font-bold text-purple-300">{profile.publications?.length || 2}+</div>
              <div className="text-[11px] text-purple-400/80">Peer-Reviewed Papers</div>
            </div>
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/20">
              <div className="text-2xl font-bold text-purple-300">&lt; 15ms</div>
              <div className="text-[11px] text-purple-400/80">Inference Latency</div>
            </div>
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/20">
              <div className="text-2xl font-bold text-purple-300">100%</div>
              <div className="text-[11px] text-purple-400/80">Open Reproducibility</div>
            </div>
          </div>
        </section>

        {/* AI/ML PROJECTS & MODELS */}
        <section id="models" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-purple-400 font-bold">Inference & Architectures</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Frontier Models & Systems</h2>
            </div>
            <span className="text-xs font-mono text-purple-400">{profile.projects.length} Models Deployed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-purple-500/20 bg-purple-950/20 hover:border-purple-500/50 hover:bg-purple-950/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
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

                  <p className="text-xs text-purple-200/90 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-purple-500/20">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded bg-purple-900/40 text-[10px] font-mono text-purple-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-mono text-purple-400 group-hover:underline">
                    View Model Benchmark & Weights Blueprint →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH PUBLICATIONS */}
        <section id="publications" className="space-y-6">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-purple-400 font-bold">Academic Output</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Selected Publications</h2>
            </div>
            <BookOpen size={20} className="text-purple-400" />
          </div>

          <div className="space-y-4">
            {(profile.publications && profile.publications.length > 0 ? profile.publications : [
              {
                id: 'pub_def_1',
                title: 'Efficient Low-Bit Quantization and Speculative Decoding for Edge Inference',
                publisher: 'IEEE / ACM Conference on High-Performance Systems',
                date: '2024',
                description: 'Empirical analysis of activation distribution anomalies and dynamic weight scaling under low compute budgets.'
              },
              {
                id: 'pub_def_2',
                title: 'Hierarchical Latent Indexing for Autonomous Retrieval-Augmented Generation',
                publisher: 'NeurIPS Workshop on Foundation Model Efficiency',
                date: '2023',
                description: 'Formal formulation of memory clustering for multi-hop reasoning with verified bound guarantees.'
              }
            ]).map((pub, idx) => (
              <div key={pub.id || idx} className="p-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base">{pub.title}</h3>
                  <span className="text-xs font-mono text-purple-400">{pub.date}</span>
                </div>
                <div className="text-xs text-purple-300 font-mono">{pub.publisher}</div>
                {pub.description && <p className="text-xs text-slate-300 font-light leading-relaxed">{pub.description}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH APPOINTMENTS & EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <span className="text-xs font-mono uppercase text-purple-400 font-bold">Trajectory</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Research & Industry Appointments</h2>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={exp.id || idx} className="p-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <div className="font-bold text-white text-base font-sans">{exp.role} <span className="text-purple-400">@ {exp.company}</span></div>
                  <span className="text-purple-400/80">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-xs text-purple-200/90 font-light leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="p-10 rounded-3xl border border-purple-500/30 bg-purple-950/30 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Research Collaboration & Advisory</h2>
          <p className="text-sm text-purple-200 max-w-lg mx-auto font-light">
            Available for joint frontier research projects, peer review, and high-performance AI consulting.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/30"
              >
                Send Inquiries ({profile.personal.email})
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-5 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-xs font-mono text-purple-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-purple-500/20 py-8 text-center text-xs font-mono text-purple-400/60">
        © {new Date().getFullYear()} {profile.personal.name} · AI/ML Researcher Portfolio
      </footer>

    </div>
  );
};
