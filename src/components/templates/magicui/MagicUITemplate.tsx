import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  Sparkles, ArrowUpRight, Mail, Copy, Check, 
  ExternalLink, Layers, Terminal, Briefcase, GraduationCap, Award,
  Cpu, Code2, Globe, Flame, Compass, ChevronRight, Eye, ShieldCheck, HeartHandshake
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const MagicUITemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'web' | 'systems'>('all');
  const [copied, setCopied] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredProjects = profile.projects.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ai') return p.category === 'ai' || p.technologies.some(t => /ai|ml|gpt|llm|pytorch|tensor/i.test(t));
    if (activeTab === 'web') return p.category === 'web' || p.technologies.some(t => /react|vue|node|next|html|css|web/i.test(t));
    if (activeTab === 'systems') return p.category === 'systems' || p.technologies.some(t => /cloud|docker|k8s|c\+\+|rust|go|sql/i.test(t));
    return true;
  });

  const skillGroups = [
    { id: 'all', label: 'All Stack', skills: profile.skills.all },
    { id: 'languages', label: 'Languages', skills: profile.skills.languages },
    { id: 'frameworks', label: 'Frameworks', skills: profile.skills.frameworks },
    { id: 'aiMl', label: 'AI & Data', skills: profile.skills.aiMl },
    { id: 'tools', label: 'Tools & DevOps', skills: profile.skills.tools }
  ].filter(g => g.skills && g.skills.length > 0);

  const activeSkills = skillGroups.find(g => g.id === selectedSkillCategory)?.skills || profile.skills.all;

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 relative overflow-x-hidden transition-colors duration-300 pb-28`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Magic UI Retro Grid Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, ${palette.accent}22 1px, transparent 1px), linear-gradient(to bottom, ${palette.accent}22 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />

      {/* Ambient Radial Spotlight */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ backgroundColor: palette.accent }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        
        {/* Top Navbar */}
        <header className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight">{profile.personal.name}</div>
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: palette.accent }} />
                {profile.personal.professionalTitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {profile.personal.openToWork && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available
              </span>
            )}
            {profile.personal.email && (
              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10 transition-all"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            )}
          </div>
        </header>

        {/* HERO: Magic UI Shimmer Banner & Animated Gradient Headline */}
        <section className="text-center space-y-6 pt-6 sm:pt-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/15 text-purple-300 shadow-inner">
            <Sparkles size={13} style={{ color: palette.accent }} />
            <span>Interactive Magic UI Showcase</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="text-slate-400">{profile.personal.location || 'Global'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Crafting scalable systems with{' '}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${palette.accent}, #e0e7ff, ${palette.accent})` 
              }}
            >
              precision & intent.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            {profile.personal.headline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="#projects"
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white shadow-xl shadow-purple-500/25 flex items-center gap-2 transform hover:scale-105 transition-all"
              style={{ backgroundColor: palette.accent }}
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight size={15} />
            </a>
            {profile.socialLinks.github && (
              <a 
                href={profile.socialLinks.github} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 rounded-full font-mono text-xs text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
              >
                <Github size={15} /> GitHub Profile
              </a>
            )}
          </div>
        </section>

        {/* KEY STATS COUNTERS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-1">
            <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
              {profile.projects.length}+
            </div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Shipped Projects</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-1">
            <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
              {profile.skills.all.length}+
            </div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Tech Competencies</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-1">
            <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
              {profile.experience.length > 0 ? `${profile.experience.length} Roles` : '4+ Yrs'}
            </div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Engineering Impact</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-1">
            <div className="text-3xl font-extrabold text-white" style={{ color: palette.accent }}>
              {profile.hackathons.length > 0 ? `${profile.hackathons.length}` : '100%'}
            </div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Awards & Milestones</div>
          </div>
        </section>

        {/* WHAT I BUILD SECTION */}
        {profile.whatIBuild && profile.whatIBuild.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Core Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">What I Build & Architect</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.whatIBuild.map(item => (
                <div 
                  key={item.id}
                  className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-purple-500/40 transition-all space-y-3 relative overflow-hidden group"
                >
                  <div className="text-xs font-mono text-purple-400 font-bold">{item.number}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS SECTION WITH MAGIC UI FILTER TABS */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Featured Portfolio</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Selected Works & Systems</h2>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              {(['all', 'ai', 'web', 'systems'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    activeTab === tab 
                      ? 'bg-purple-600 text-white shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-7 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xl"
              >
                {/* Border Beam Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at top left, ${palette.accentGlow}, transparent 40%)`
                  }}
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-purple-300 border border-white/10">
                      0{idx + 1} · {project.category || 'Architecture'}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={e => e.stopPropagation()} 
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
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
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                      {project.name}
                      <ArrowUpRight size={16} className="text-purple-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-2 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-purple-400 flex items-center gap-1 group-hover:underline">
                    View Interactive Architecture & Spec →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS RADAR FILTERABLE MATRIX */}
        <section className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Technical Radar</span>
              <h2 className="text-2xl font-bold text-white">Skills & Competency Grid</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {skillGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => setSelectedSkillCategory(group.id)}
                  className={`px-3 py-1 rounded-lg border transition-all ${
                    selectedSkillCategory === group.id
                      ? 'border-purple-500 bg-purple-500/20 text-purple-200'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {activeSkills.map(skill => (
              <span 
                key={skill}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.07] text-xs font-mono text-slate-200 transition-all transform hover:-translate-y-0.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE & EDUCATION DUAL COLUMN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Experience */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Track Record</span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase size={20} className="text-purple-400" /> Experience
              </h2>
            </div>

            <div className="space-y-4">
              {profile.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-base">{exp.role}</h3>
                      <div className="text-xs font-mono text-purple-400">{exp.company}</div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      {exp.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Academic Foundation</span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap size={20} className="text-purple-400" /> Education & Honors
              </h2>
            </div>

            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div key={edu.id || idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-base">{edu.institution}</h3>
                    {edu.grade && (
                      <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-300">{edu.degree} {edu.field ? `in ${edu.field}` : ''}</div>
                  <div className="text-[11px] font-mono text-slate-500">{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}

              {profile.hackathons && profile.hackathons.length > 0 && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Award size={16} className="text-purple-400" /> Hackathons & Awards
                  </h3>
                  <div className="space-y-2">
                    {profile.hackathons.map((h, i) => (
                      <div key={i} className="text-xs">
                        <span className="text-white font-semibold">{h.name}:</span>{' '}
                        <span className="text-slate-400">{h.award || h.project}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </section>

        {/* CONTACT CALL TO ACTION */}
        <section className="text-center p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Let's build together.</h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Available for high-impact engineering roles, technical advisory, and collaborative ventures.
          </p>
          {profile.personal.email && (
            <div className="flex items-center justify-center gap-4">
              <a 
                href={`mailto:${profile.personal.email}`}
                className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white shadow-xl shadow-purple-500/20 transform hover:scale-105 transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                Send Direct Message
              </a>
            </div>
          )}
        </section>

      </div>

      {/* MAGIC UI FLOATING DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-2 p-2 rounded-2xl border border-white/20 bg-[#0d0f17]/90 backdrop-blur-2xl shadow-2xl shadow-purple-900/30">
          <a href="#projects" className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="Projects">
            <Layers size={18} />
          </a>
          {profile.socialLinks.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="GitHub">
              <Github size={18} />
            </a>
          )}
          {profile.socialLinks.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="LinkedIn">
              <Linkedin size={18} />
            </a>
          )}
          {profile.personal.email && (
            <button onClick={handleCopyEmail} className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all" title="Copy Email">
              <Mail size={18} />
            </button>
          )}
          <div className="w-[1px] h-6 bg-white/10 mx-1" />
          <div className="px-3 py-1 rounded-xl text-[10px] font-mono text-purple-300 bg-purple-500/20 border border-purple-500/30">
            Magic UI Dock
          </div>
        </div>
      </div>

    </div>
  );
};
