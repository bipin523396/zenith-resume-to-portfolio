import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, ExternalLink, 
  Calendar, Award, GraduationCap, Briefcase, CheckCircle2, 
  Copy, Download, ChevronRight, MessageSquare, Mic, BookOpen, Star, Globe
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const PersonalBrandTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'work' | 'media' | 'advisory'>('work');

  const copyEmail = () => {
    if (!profile.personal.email) return;
    navigator.clipboard.writeText(profile.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 relative selection:bg-purple-500 selection:text-white`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Ambient Radial Gradient Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 10%, ${palette.accent}40 0%, transparent 60%), radial-gradient(circle at 90% 80%, ${palette.accent}20 0%, transparent 50%)`
        }}
      />

      {/* Sticky Header / Brand Monogram */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group text-left"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white shadow-lg transition-transform group-hover:scale-105"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white block leading-tight text-base group-hover:text-purple-300 transition-colors">
                {profile.personal.name}
              </span>
              <span className="text-[11px] font-mono text-slate-400 block tracking-wider uppercase">
                {profile.personal.professionalTitle}
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">Philosophy</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors">Ventures & Work</button>
            <button onClick={() => scrollTo('journey')} className="hover:text-white transition-colors">Trajectory</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors">Expertise</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Connect</button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
                const a = document.createElement('a');
                a.href = jsonStr;
                a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_profile.json`;
                a.click();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 transition-all border border-white/10"
            >
              <Download size={13} /> Resume
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
              style={{ backgroundColor: palette.accent }}
            >
              <Sparkles size={13} /> Let's Connect
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section: Personal Manifesto & Personal Brand Identity */}
      <section className="relative px-6 pt-20 pb-28 max-w-6xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/5 border border-white/10 text-purple-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Strategic Advisory & Keynote Talks
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Architecting the next era of <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">technology & product</span> impact.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {profile.personal.headline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-6 py-3.5 rounded-full font-bold text-sm text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                style={{ backgroundColor: palette.accent }}
              >
                Explore Signature Work <ArrowUpRight size={16} />
              </button>
              <button 
                onClick={copyEmail}
                className="px-6 py-3.5 rounded-full font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all flex items-center gap-2"
              >
                {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? 'Email Copied!' : 'Copy Direct Email'}
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.projects.length}+
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Shipped Ventures</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.experience.length * 2}+
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile.skills.all.length}+
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Core Disciplines</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  100%
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Execution Rate</div>
              </div>
            </div>
          </div>

          {/* Founder Visual Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div 
                className="absolute -inset-1 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity"
                style={{ backgroundColor: palette.accent }}
              />
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl">
                {profile.personal.profileImage ? (
                  <img 
                    src={profile.personal.profileImage} 
                    alt={profile.personal.name} 
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                ) : (
                  <div 
                    className="w-full h-80 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-purple-900/50 to-slate-950"
                  >
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center font-black text-4xl text-white mb-4 border border-white/20">
                      {initials}
                    </div>
                    <div className="text-xl font-bold text-white">{profile.personal.name}</div>
                    <div className="text-xs text-purple-300 font-mono mt-1">{profile.personal.professionalTitle}</div>
                    <div className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                      <MapPin size={13} /> {profile.personal.location || 'Global Remote'}
                    </div>
                  </div>
                )}

                <div className="mt-4 px-2 pb-2 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    {profile.personal.location || 'Remote'}
                  </div>
                  <div className="flex items-center gap-2">
                    {profile.socialLinks.github && (
                      <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                        <Github size={15} />
                      </a>
                    )}
                    {profile.socialLinks.linkedin && (
                      <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                        <Linkedin size={15} />
                      </a>
                    )}
                    {profile.socialLinks.twitter && (
                      <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                        <Twitter size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section: The Philosophy & Bio */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              01 // PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Values, Vision & Conviction
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p className="font-light">
              {profile.personal.bio || profile.summary}
            </p>
            {profile.whatIBuild && profile.whatIBuild.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {profile.whatIBuild.map((item, idx) => (
                  <div key={item.id || idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
                      <Star size={13} /> {item.title}
                    </div>
                    <p className="text-sm text-slate-300 leading-normal">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section: Signature Projects & Ventures */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              02 // SIGNATURE VENTURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Select Projects & Architecture
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Hand-crafted solutions designed for scale, resilience, and extraordinary user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.projects.map((proj, idx) => {
            const grad = getProjectGradient(proj.name);
            return (
              <div 
                key={proj.id || idx}
                onClick={() => onSelectProject && onSelectProject(proj)}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-7 transition-all duration-300 hover:border-purple-500/40 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Banner / Category Pill */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300">
                      {proj.category || 'Featured Venture'}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-purple-300 transition-colors">
                      <span className="text-xs font-mono">Inspect Deep-Dive</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {proj.name}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Highlights / Features */}
                  {proj.features && proj.features.length > 0 && (
                    <ul className="space-y-1 pt-2">
                      {proj.features.slice(0, 2).map((feat, fi) => (
                        <li key={fi} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-purple-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 4).map((tech, ti) => (
                      <span key={ti} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 4 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                        <Github size={14} />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Trajectory / Professional Experience */}
      <section id="journey" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              03 // TRAJECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Leadership & Experience
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              A track record of shipping zero-to-one systems, driving product growth, and scaling high-velocity engineering organizations.
            </p>
          </div>

          <div className="md:col-span-8 space-y-8">
            {profile.experience.map((exp, idx) => (
              <div 
                key={exp.id || idx}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-semibold text-purple-400">{exp.company}</div>
                  </div>
                  <div className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 self-start sm:self-auto">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {exp.highlights.map((high, hi) => (
                      <div key={hi} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                        <span>{high}</span>
                      </div>
                    ))}
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {exp.technologies.map((t, ti) => (
                      <span key={ti} className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Academic Foundation & Honors */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Education */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                04 // FOUNDATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Education & Pedigree
              </h2>
            </div>

            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div key={edu.id || idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 font-bold">{edu.startDate} — {edu.endDate}</span>
                    {edu.grade && <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">{edu.grade}</span>}
                  </div>
                  <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                  <div className="text-xs text-slate-400 font-medium">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <p className="text-xs text-slate-400 pt-1">{edu.highlights.join(' • ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Key Honors */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                05 // CREDENTIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Certifications & Honors
              </h2>
            </div>

            <div className="space-y-4">
              {profile.certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 font-semibold">{cert.issuer}</span>
                    <span className="text-xs font-mono text-slate-400">{cert.issueDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{cert.name}</h3>
                  {cert.credentialId && (
                    <div className="text-xs font-mono text-slate-500">ID: {cert.credentialId}</div>
                  )}
                </div>
              ))}

              {profile.achievements.map((ach, idx) => (
                <div key={ach.id || idx} className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                    <Award size={14} /> Major Recognition
                  </div>
                  <h3 className="text-base font-bold text-white">{ach.title}</h3>
                  <p className="text-xs text-slate-300">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section: Technical Arsenal & Disciplines */}
      <section id="skills" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
            06 // TECHNICAL ARSENAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Skill Matrix
          </h2>
          <p className="text-slate-400 text-sm">
            Technologies, frameworks, architectural disciplines, and leadership competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">Languages</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.languages.map((l, i) => (
                <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-200 border border-white/5">
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">Frameworks & Libs</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.frameworks.map((f, i) => (
                <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-200 border border-white/5">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">AI / ML & Systems</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.aiMl.map((a, i) => (
                <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-200 border border-white/5">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">Infrastructure & Tools</div>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.tools.map((t, i) => (
                <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-200 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Direct Channel / Contact */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-white/10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300">
          <MessageSquare size={13} /> Direct Communication Channel
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Let’s create something exceptional together.
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Open to executive leadership roles, keynote invitations, high-leverage advisory, and groundbreaking engineering ventures.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {profile.personal.email && (
            <a 
              href={`mailto:${profile.personal.email}`}
              className="px-8 py-4 rounded-full font-bold text-sm text-white shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
              style={{ backgroundColor: palette.accent }}
            >
              <Mail size={16} /> Send Direct Message
            </a>
          )}
          <button 
            onClick={copyEmail}
            className="px-8 py-4 rounded-full font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all flex items-center gap-2"
          >
            {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Email Copied!' : profile.personal.email || 'Copy Email'}
          </button>
        </div>

        {/* Social Network Links */}
        <div className="flex items-center justify-center gap-4 pt-8">
          {profile.socialLinks.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
              <Github size={20} />
            </a>
          )}
          {profile.socialLinks.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
              <Linkedin size={20} />
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
              <Twitter size={20} />
            </a>
          )}
          {profile.personal.website && (
            <a href={profile.personal.website} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all">
              <Globe size={20} />
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {profile.personal.name}. All rights reserved.
          </div>
          <div>
            Built with Zenith Stack — AI Portfolio Engine
          </div>
        </div>
      </footer>
    </div>
  );
};
