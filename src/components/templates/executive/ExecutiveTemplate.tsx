import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Building2, Award, Briefcase, GraduationCap, ArrowUpRight, 
  Copy, Check, Mail, ExternalLink, Download, Phone, MapPin, 
  ChevronRight, Shield, Globe, FileText, CheckCircle2
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — ${profile.personal.professionalTitle}
Email: ${profile.personal.email} | Location: ${profile.personal.location}
Website: ${profile.personal.website}

## Summary
${profile.personal.bio || profile.summary}

## Professional Experience
${profile.experience.map(e => `### ${e.role} — ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})\n${e.description}\n${(e.highlights || []).map(h => `* ${h}`).join('\n')}`).join('\n\n')}

## Education
${profile.education.map(ed => `* ${ed.degree} - ${ed.institution} (${ed.startDate} - ${ed.endDate}) ${ed.grade ? `[${ed.grade}]` : ''}`).join('\n')}

## Core Competencies
${profile.skills.all.join(', ')}
`;
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 selection:bg-indigo-600 selection:text-white`}
      style={{ backgroundColor: '#0a0d14' }}
    >
      {/* Top Professional Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0d121c]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-md"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-wide text-white uppercase">{profile.personal.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="hover:text-white transition-colors">Strategic Work</a>
            <a href="#skills" className="hover:text-white transition-colors">Competencies</a>
            <a href="#education" className="hover:text-white transition-colors">Credentials</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all"
            >
              <Download size={13} />
              <span>Resume</span>
            </button>
            {profile.personal.email && (
              <a
                href="#contact"
                className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider text-white shadow-md transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                Inquire
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Main Executive Body */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-24">
        
        {/* HERO SECTION */}
        <section id="about" className="space-y-8 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-indigo-300 border border-indigo-500/30 bg-indigo-500/10">
            <Shield size={12} /> Executive Leadership & Systems Architecture
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                {profile.personal.headline}
              </h1>
              <p className="text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
                {profile.personal.bio || profile.summary}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-slate-400">
                {profile.personal.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} style={{ color: palette.accent }} /> {profile.personal.location}
                  </span>
                )}
                {profile.personal.openToWork && (
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Strategic Engagements
                  </span>
                )}
              </div>
            </div>

            {/* Executive Stat Panel */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0d121c] space-y-6 shadow-xl">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold border-b border-white/10 pb-3">
                Key Performance Indicators
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
                    {profile.experience.length}+ Roles
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Proven Corporate Track Record</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
                    {profile.projects.length} Major Systems
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Architected & Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
                    {profile.certifications.length + profile.education.length} Credentials
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Advanced Institutional Honors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE TIMELINE */}
        <section id="experience" className="space-y-8 border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">Career Progression</div>
              <h2 className="text-3xl font-extrabold text-white mt-1">Executive Work Experience</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.experience.length} Documented Appointments</span>
          </div>

          <div className="space-y-8">
            {profile.experience.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="p-8 rounded-2xl border border-white/10 bg-[#0d121c]/70 hover:border-white/20 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-semibold text-indigo-300 mt-0.5 flex items-center gap-2">
                      <Building2 size={16} />
                      {exp.company}
                      {exp.location && <span className="text-xs text-slate-400 font-normal">· {exp.location}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-300 px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Core Accomplishments:</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map(t => (
                      <span key={t} className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* STRATEGIC PROJECTS / ARCHITECTURES */}
        <section id="projects" className="space-y-8 border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">Selected Deliverables</div>
              <h2 className="text-3xl font-extrabold text-white mt-1">Strategic Projects & Case Studies</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Click any project to inspect full blueprint</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-8 rounded-2xl border border-white/10 bg-[#0d121c]/70 hover:border-indigo-500/50 hover:bg-[#111724] transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      Case Study #0{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={e => e.stopPropagation()} 
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={e => e.stopPropagation()} 
                          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                      {project.name}
                      <ArrowUpRight size={18} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-2 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.keyMetrics && project.keyMetrics.length > 0 && (
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Impact Metric:</div>
                      <div className="text-xs font-bold text-indigo-300">{project.keyMetrics[0]}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-mono text-indigo-400 group-hover:underline flex items-center gap-1">
                    <span>Inspect System Blueprint</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE SKILLS & CAPABILITIES */}
        <section id="skills" className="space-y-6 border-t border-white/10 pt-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">Capabilities</div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Core Competencies & Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d121c]/70 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold">Programming & Core</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d121c]/70 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold">Architecture & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.frameworks.map(fw => (
                  <span key={fw} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#0d121c]/70 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-bold">Cloud, AI & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {[...(profile.skills.tools || []), ...(profile.skills.aiMl || [])].slice(0, 8).map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS DUAL */}
        <section id="education" className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-white/10 pt-16">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">Academics</div>
              <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                <GraduationCap size={22} className="text-indigo-400" /> Education History
              </h2>
            </div>

            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div key={edu.id || idx} className="p-6 rounded-2xl border border-white/10 bg-[#0d121c]/70 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-base">{edu.institution}</h3>
                    {edu.grade && (
                      <span className="text-[11px] font-mono text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-300">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                  <div className="text-[11px] font-mono text-slate-500">{edu.startDate} – {edu.endDate} {edu.location ? `· ${edu.location}` : ''}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">Credentials</div>
              <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                <Award size={22} className="text-indigo-400" /> Certifications & Honors
              </h2>
            </div>

            <div className="space-y-4">
              {profile.certifications.length > 0 ? (
                profile.certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="p-6 rounded-2xl border border-white/10 bg-[#0d121c]/70 space-y-1.5">
                    <h3 className="font-bold text-white text-sm">{cert.name}</h3>
                    <div className="text-xs text-indigo-300">{cert.issuer} · Issued {cert.issueDate}</div>
                    {cert.credentialId && (
                      <div className="text-[10px] font-mono text-slate-500">Credential ID: {cert.credentialId}</div>
                    )}
                  </div>
                ))
              ) : (
                profile.achievements.map((ach, idx) => (
                  <div key={ach.id || idx} className="p-6 rounded-2xl border border-white/10 bg-[#0d121c]/70 space-y-1.5">
                    <h3 className="font-bold text-white text-sm">{ach.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>
                    {ach.date && <div className="text-[10px] font-mono text-slate-500">{ach.date}</div>}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* PROFESSIONAL CONTACT SECTION */}
        <section id="contact" className="p-10 sm:p-14 rounded-3xl border border-white/10 bg-[#0d121c] text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
            <Mail size={12} /> Contact & Corporate Inquiries
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's discuss high-impact initiatives.</h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Available for principal architecture mandates, executive advisory, and senior leadership positions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {profile.personal.email && (
              <a
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-xl transition-all transform hover:scale-105"
                style={{ backgroundColor: palette.accent }}
              >
                Send Message
              </a>
            )}
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-200 transition-all flex items-center gap-2"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10 text-slate-400 text-xs font-mono">
            {profile.socialLinks.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Linkedin size={15} /> LinkedIn
              </a>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Github size={15} /> GitHub
              </a>
            )}
            {profile.personal.website && (
              <a href={profile.personal.website} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Globe size={15} /> Website
              </a>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} · Executive Professional Architecture
      </footer>

    </div>
  );
};
