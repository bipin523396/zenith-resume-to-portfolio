import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Briefcase, CheckCircle, Star, ArrowUpRight, Copy, Check, 
  Download, ExternalLink, MessageSquare, Shield, Clock, Zap
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const FreelancerTemplate: React.FC<TemplateProps> = ({
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
    const resumeText = `# ${profile.personal.name} — Independent Engineering Consultant\n${profile.personal.email} | ${profile.personal.location}\n\n${profile.personal.bio || profile.summary}`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_consulting_cv.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans selection:bg-amber-500 selection:text-black pb-28">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-amber-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center font-bold text-amber-400">
              <Briefcase size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-white">{profile.personal.name}</div>
              <div className="text-[11px] text-amber-400 font-mono">{profile.personal.professionalTitle || 'Independent Consultant & Contractor'}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">Overview</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Services & Rates</a>
            <a href="#projects" className="hover:text-amber-400 transition-colors">Client Projects</a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Hire</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
              >
                Book Intake
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12 space-y-20">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-6 pt-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
            <Zap size={13} /> Available for Q1/Q2 Advisory & Engineering Contracts
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            High-velocity software execution with <span className="text-amber-400">zero bureaucratic overhead.</span>
          </h1>

          <p className="text-lg text-slate-300 font-light leading-relaxed">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>
        </section>

        {/* OFFERED SERVICES */}
        <section id="services" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Consulting Services & Deliverables</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Fixed-Fee or Weekly Retainer</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(profile.services && profile.services.length > 0 ? profile.services : [
              {
                id: 'serv_1',
                title: 'High-Scale Architecture & Performance Audit',
                description: 'Comprehensive evaluation of distributed bottlenecks, latency profiling, and cloud infrastructure cost reduction.',
                deliverables: ['Detailed Technical Architecture Audit', 'P99 Latency Remediation Plan', 'Infrastructure Savings Roadmap']
              },
              {
                id: 'serv_2',
                title: 'Full-Stack Rapid Product MVP Delivery',
                description: 'Rapid zero-to-one implementation of enterprise web applications, real-time engines, and AI integrations.',
                deliverables: ['Production-Ready Next.js & Node.js Application', 'Complete CI/CD Automated Pipelines', 'Automated Test Suite & Handover']
              }
            ]).map((serv, idx) => (
              <div key={serv.id || idx} className="p-8 rounded-3xl border border-white/10 bg-[#101018] space-y-4 shadow-xl">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-amber-400 font-bold uppercase">Package #0{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Guaranteed SLAs</span>
                </div>

                <h3 className="font-bold text-xl text-white">{serv.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">{serv.description}</p>

                {serv.deliverables && serv.deliverables.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[11px] font-mono uppercase text-slate-400">Deliverables Included:</div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {serv.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle size={13} className="text-amber-400 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CLIENT PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Case Studies</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Delivered Client Projects</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.projects.length} Shipped Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-3xl border border-white/10 bg-[#101018] hover:border-amber-500/40 hover:bg-[#141420] transition-all space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
                    Client Engagement #{idx + 1}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-light mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {project.technologies.slice(0, 4).map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-mono text-amber-400 group-hover:underline pt-1">
                  View Scope & Solution Architecture →
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Endorsements</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">Client & Leadership Testimonials</h2>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(profile.testimonials && profile.testimonials.length > 0 ? profile.testimonials : [
              {
                id: 'test_1',
                name: 'Marcus Reynolds',
                role: 'VP of Engineering',
                company: 'AetherScale',
                content: 'One of those rare 1-in-a-million engineers who dives deep into low-level code at midnight and then presents a brilliant 5-year architecture plan to the board at 9 AM.'
              },
              {
                id: 'test_2',
                name: 'Elena Rostova',
                role: 'Head of Product',
                company: 'Helix Labs',
                content: 'Working with this consultant was a masterclass in velocity and precision. Our core streaming platform was delivered three weeks ahead of schedule.'
              }
            ]).map((t, idx) => (
              <div key={t.id || idx} className="p-8 rounded-3xl border border-white/10 bg-[#101018] space-y-4">
                <p className="text-sm text-slate-300 font-light italic leading-relaxed">
                  "{t.content}"
                </p>
                <div className="text-xs font-mono pt-2 border-t border-white/5">
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-amber-400">{t.role} · {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTAKE / HIRE SECTION */}
        <section id="contact" className="p-12 rounded-3xl border border-amber-500/30 bg-[#101018] text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's discuss your engineering roadmap.</h2>
          <p className="text-base text-slate-300 max-w-lg mx-auto font-light">
            Now booking technical contracts, architectural advisory, and high-impact sprint deliveries.
          </p>
          {profile.personal.email && (
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={`mailto:${profile.personal.email}?subject=Contract%20Engagement%20Inquiry`}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105"
              >
                Book Advisory Call ({profile.personal.email})
              </a>
              <button
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Independent Consultant Portfolio
      </footer>

    </div>
  );
};
