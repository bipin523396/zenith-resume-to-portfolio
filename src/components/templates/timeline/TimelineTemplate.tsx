import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials, getProjectGradient } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Mail, MapPin, Sparkles, ExternalLink, 
  Calendar, Award, GraduationCap, Briefcase, Clock, 
  GitBranch, Terminal, Filter, CheckCircle2, Copy, Download, ChevronRight
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  type: 'experience' | 'project' | 'hackathon' | 'education' | 'certification' | 'achievement';
  description: string;
  tags?: string[];
  link?: string;
  projectRef?: ProjectItem;
}

export const TimelineTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const initials = getInitials(profile.personal.name);

  const [activeFilter, setActiveFilter] = useState<'all' | 'experience' | 'projects' | 'hackathons' | 'education' | 'certifications'>('all');
  const [copied, setCopied] = useState(false);

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

  // Build Chronological Events Array combining all milestones
  const events: TimelineEvent[] = [];

  // 1. Work Experience
  profile.experience.forEach(exp => {
    events.push({
      id: exp.id,
      year: `${exp.startDate} — ${exp.current ? 'Present' : exp.endDate}`,
      title: exp.role,
      subtitle: `${exp.company} ${exp.location ? `• ${exp.location}` : ''}`,
      type: 'experience',
      description: exp.description || (exp.highlights ? exp.highlights.join('; ') : ''),
      tags: exp.technologies
    });
  });

  // 2. Projects
  profile.projects.forEach(proj => {
    events.push({
      id: proj.id,
      year: proj.startDate || 'Recent',
      title: proj.name,
      subtitle: proj.tagline || (proj.category ? `${proj.category.toUpperCase()} Engineering` : 'Technical System'),
      type: 'project',
      description: proj.description,
      tags: proj.technologies,
      link: proj.liveUrl || proj.github,
      projectRef: proj
    });
  });

  // 3. Hackathons & Competitions
  profile.hackathons.forEach(hack => {
    events.push({
      id: hack.id,
      year: hack.date || '2024',
      title: hack.name,
      subtitle: hack.award || 'Winner & Finalist',
      type: 'hackathon',
      description: hack.description,
      tags: hack.technologies || ['AI/ML', 'Rapid Prototyping']
    });
  });

  // 4. Education
  profile.education.forEach(edu => {
    events.push({
      id: edu.id,
      year: `${edu.startDate} — ${edu.endDate}`,
      title: edu.degree,
      subtitle: `${edu.institution} ${edu.location ? `• ${edu.location}` : ''}`,
      type: 'education',
      description: `${edu.grade ? `Academic standing: ${edu.grade}. ` : ''}${edu.highlights ? edu.highlights.join(' • ') : ''}`,
      tags: [edu.field || 'Computer Science']
    });
  });

  // 5. Certifications
  profile.certifications.forEach(cert => {
    events.push({
      id: cert.id,
      year: cert.issueDate || 'Recent',
      title: cert.name,
      subtitle: cert.issuer,
      type: 'certification',
      description: `Credential verified through ${cert.issuer}${cert.credentialId ? ` (ID: ${cert.credentialId})` : ''}.`,
      link: cert.url
    });
  });

  // 6. Major Achievements
  profile.achievements.forEach(ach => {
    events.push({
      id: ach.id,
      year: ach.date || 'Honors',
      title: ach.title,
      subtitle: ach.issuer || 'Industry Recognition',
      type: 'achievement',
      description: ach.description,
      link: ach.link
    });
  });

  const filteredEvents = events.filter(e => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'experience') return e.type === 'experience';
    if (activeFilter === 'projects') return e.type === 'project';
    if (activeFilter === 'hackathons') return e.type === 'hackathon' || e.type === 'achievement';
    if (activeFilter === 'education') return e.type === 'education';
    if (activeFilter === 'certifications') return e.type === 'certification';
    return true;
  });

  return (
    <div 
      className={`min-h-screen ${fontClass} text-slate-100 transition-colors duration-300 relative selection:bg-purple-500 selection:text-white pb-24`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Background Subtle Grid & Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, ${palette.accent}35 0%, transparent 60%)`
        }}
      />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-lg transition-transform group-hover:scale-105"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-white block text-sm group-hover:text-purple-300 transition-colors">
                {profile.personal.name}
              </span>
              <span className="text-[11px] font-mono text-purple-400 block tracking-wider">
                CHRONOLOGICAL SPINE
              </span>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-slate-300">
            <button onClick={() => scrollTo('timeline-section')} className="hover:text-white transition-colors">Timeline</button>
            <button onClick={() => scrollTo('skills-section')} className="hover:text-white transition-colors">Tech Arsenal</button>
            <button onClick={() => scrollTo('contact-section')} className="hover:text-white transition-colors">Connect</button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
                const a = document.createElement('a');
                a.href = jsonStr;
                a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.json`;
                a.click();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 hover:bg-white/15 text-slate-200 transition-all border border-white/10"
            >
              <Download size={13} /> JSON Resume
            </button>
            {profile.personal.email && (
              <a 
                href={`mailto:${profile.personal.email}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-1.5 hover:scale-105 transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                <Mail size={13} /> Contact
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Hero Header */}
        <div className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-purple-300">
            <Clock size={13} /> Career Milestones & Technical Journey
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            {profile.personal.name}
          </h1>

          <p className="text-xl sm:text-2xl text-purple-300 font-mono">
            {profile.personal.professionalTitle}
          </p>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
            {profile.personal.headline}
          </p>

          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            {profile.personal.bio || profile.summary}
          </p>

          {/* Social and Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {profile.personal.email && (
              <button 
                onClick={copyEmail}
                className="px-4 py-2.5 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all flex items-center gap-2"
              >
                {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? 'Email Copied!' : profile.personal.email}
              </button>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Github size={16} />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Linkedin size={16} />
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                <Twitter size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Milestone Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <div>
            <div className="text-2xl font-bold text-white">{events.length}</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Logged Milestones</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.experience.length}</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Roles & Leadership</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.projects.length}</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Systems Built</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.skills.all.length}</div>
            <div className="text-xs text-slate-400 font-mono uppercase">Skills Mastered</div>
          </div>
        </div>

        {/* Timeline Interactive Filter Bar */}
        <div id="timeline-section" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GitBranch size={18} className="text-purple-400" /> Chronological Journey Spine
            </h2>
            <span className="text-xs font-mono text-slate-400">Showing {filteredEvents.length} events</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'all' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              All ({events.length})
            </button>
            <button 
              onClick={() => setActiveFilter('experience')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'experience' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Experience ({profile.experience.length})
            </button>
            <button 
              onClick={() => setActiveFilter('projects')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'projects' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Projects ({profile.projects.length})
            </button>
            <button 
              onClick={() => setActiveFilter('education')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'education' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Education ({profile.education.length})
            </button>
            <button 
              onClick={() => setActiveFilter('hackathons')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'hackathons' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Honors & Hacks
            </button>
            <button 
              onClick={() => setActiveFilter('certifications')}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === 'certifications' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Certifications ({profile.certifications.length})
            </button>
          </div>
        </div>

        {/* Chronological Vertical Spine */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-10">
          {filteredEvents.map((evt, idx) => (
            <div 
              key={evt.id || idx} 
              className={`relative group ${evt.projectRef ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (evt.projectRef && onSelectProject) {
                  onSelectProject(evt.projectRef);
                }
              }}
            >
              {/* Spine Node Point */}
              <div 
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-[#090a0f] flex items-center justify-center transition-all group-hover:scale-125"
                style={{ backgroundColor: palette.accent }}
              />

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-white/10 text-purple-300">
                    {evt.year}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    {evt.type === 'experience' && <Briefcase size={12} />}
                    {evt.type === 'project' && <Terminal size={12} />}
                    {evt.type === 'education' && <GraduationCap size={12} />}
                    {evt.type === 'certification' && <Award size={12} />}
                    {evt.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                    {evt.title}
                    {evt.projectRef && (
                      <span className="text-xs font-mono font-normal text-purple-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ArrowUpRight size={14} />
                      </span>
                    )}
                  </h3>
                  <div className="text-sm text-slate-400 font-medium">{evt.subtitle}</div>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {evt.description}
                </p>

                {evt.tags && evt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {evt.tags.map((t, ti) => (
                      <span key={ti} className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {evt.link && !evt.projectRef && (
                  <div className="pt-2">
                    <a 
                      href={evt.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-purple-400 hover:underline"
                    >
                      Official Link <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mastered Technologies & Skills Section */}
        <div id="skills-section" className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                CORE CAPABILITIES
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1">Technical Stack & Tools</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">{profile.skills.all.length} Skills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profile.skills.languages.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold">Languages</div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.languages.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills.frameworks.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold">Frameworks</div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.frameworks.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills.aiMl.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold">AI / ML Systems</div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.aiMl.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-section" className="text-center py-12 border-t border-white/10 space-y-6">
          <h2 className="text-3xl font-black text-white">Let’s Connect</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Reach out directly for collaborations, engineering opportunities, or technical inquiries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {profile.personal.email && (
              <a 
                href={`mailto:${profile.personal.email}`}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-2 hover:scale-105 transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                <Mail size={14} /> Send Email
              </a>
            )}
            <button 
              onClick={copyEmail}
              className="px-6 py-3 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all flex items-center gap-2"
            >
              {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard!' : profile.personal.email || 'Copy Email'}
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-xs font-mono text-slate-500">
        © {new Date().getFullYear()} {profile.personal.name} • Timeline Portfolio Engine
      </footer>
    </div>
  );
};
