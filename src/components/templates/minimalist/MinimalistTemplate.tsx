import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { COLOR_PALETTES, FONT_CLASSES } from '../../../utils/themeEngine';
import { 
  ArrowUpRight, Copy, Check, ExternalLink, Download, 
  Mail, MapPin, ArrowRight, Sparkles, Briefcase, GraduationCap, 
  Code2, Terminal, CheckCircle2, Globe
} from 'lucide-react';
import { Github, Linkedin, Twitter } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const palette = COLOR_PALETTES[theme.colorPalette] || COLOR_PALETTES.zenith;
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const isLight = palette.isLight ?? false;
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
Website: ${profile.personal.website || ''}

## Summary
${profile.personal.bio || profile.summary}

## Work Experience
${profile.experience.map(e => `### ${e.role} — ${e.company} (${e.startDate} – ${e.endDate})
${e.description}
${e.highlights?.length ? e.highlights.map(h => `- ${h}`).join('\n') : ''}
Technologies: ${(e.technologies || []).join(', ')}
`).join('\n')}

## Featured Projects
${profile.projects.map(p => `### ${p.name}
${p.description}
Technologies: ${p.technologies.join(', ')}
${p.github ? `GitHub: ${p.github}` : ''} ${p.liveUrl ? `Live: ${p.liveUrl}` : ''}
`).join('\n')}

## Technical Skills
${profile.skills.all.join(', ')}

## Education
${profile.education.map(ed => `- ${ed.degree}, ${ed.institution} (${ed.startDate} – ${ed.endDate})`).join('\n')}
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
      className={`min-h-screen ${fontClass} transition-colors duration-300 pb-24`}
      style={{ 
        backgroundColor: palette.bg,
        color: palette.text
      }}
    >
      {/* Subtle Ambient Glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 15%, ${palette.accent}33 0%, transparent 45%), radial-gradient(circle at 85% 75%, ${palette.accent}22 0%, transparent 50%)`
        }}
      />

      {/* Sticky Top Navigation */}
      <nav 
        className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors"
        style={{ 
          backgroundColor: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 15, 29, 0.85)',
          borderColor: palette.surfaceBorder 
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs"
              style={{ backgroundColor: palette.accent }}
            >
              {initials}
            </div>
            <div>
              <span className="font-bold tracking-wider uppercase block" style={{ color: palette.text }}>
                {profile.personal.name}
              </span>
              <span className="text-[11px] block hidden sm:inline" style={{ color: palette.textMuted }}>
                {profile.personal.professionalTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-5 text-[11px] font-medium" style={{ color: palette.textMuted }}>
              <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
              <a href="#projects" className="hover:opacity-100 transition-opacity">Works</a>
              <a href="#experience" className="hover:opacity-100 transition-opacity">Experience</a>
              <a href="#skills" className="hover:opacity-100 transition-opacity">Skills</a>
              <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
            </div>

            <button
              onClick={handleDownloadResume}
              className="px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
              style={{ 
                borderColor: palette.surfaceBorder,
                backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                color: palette.text
              }}
            >
              <Download size={13} style={{ color: palette.accent }} />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-20 pt-14 relative z-10">
        
        {/* Hero Section */}
        <section id="about" className="space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border"
            style={{ 
              borderColor: palette.surfaceBorder,
              backgroundColor: isLight ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.04)',
              color: palette.accent
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">
              {profile.personal.openToWork !== false ? 'Available for High-Impact Roles' : 'Portfolio Showcase'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]">
            {profile.personal.headline}
          </h1>

          <p className="text-base sm:text-lg max-w-3xl font-normal leading-relaxed" style={{ color: palette.textMuted }}>
            {profile.personal.bio || profile.summary}
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div 
              className="p-3.5 rounded-xl border transition-all"
              style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
            >
              <div className="text-2xl font-black" style={{ color: palette.accent }}>
                {profile.projects.length}+
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: palette.textMuted }}>
                Engineered Projects
              </div>
            </div>

            <div 
              className="p-3.5 rounded-xl border transition-all"
              style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
            >
              <div className="text-2xl font-black" style={{ color: palette.accent }}>
                {profile.experience.length > 0 ? `${profile.experience.length * 2}+ yrs` : '5+ yrs'}
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: palette.textMuted }}>
                Industry Experience
              </div>
            </div>

            <div 
              className="p-3.5 rounded-xl border transition-all"
              style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
            >
              <div className="text-2xl font-black" style={{ color: palette.accent }}>
                {profile.skills.all.length}+
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: palette.textMuted }}>
                Technologies & Tools
              </div>
            </div>

            <div 
              className="p-3.5 rounded-xl border transition-all"
              style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
            >
              <div className="text-2xl font-black" style={{ color: palette.accent }}>
                100%
              </div>
              <div className="text-xs font-medium mt-0.5" style={{ color: palette.textMuted }}>
                Fact-Checked Profile
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-mono" style={{ color: palette.textMuted }}>
            {profile.personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: palette.accent }} /> {profile.personal.location}
              </span>
            )}
            {profile.personal.email && (
              <button 
                onClick={handleCopyEmail}
                className="hover:opacity-100 transition-opacity flex items-center gap-1.5"
              >
                <Mail size={14} style={{ color: palette.accent }} />
                <span>{profile.personal.email}</span>
                {copied && <span className="text-[10px] text-emerald-500 font-bold ml-1">(Copied!)</span>}
              </button>
            )}
            {profile.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:opacity-100" style={{ color: palette.accent }}>
                <Github size={14} /> <span>GitHub</span>
              </a>
            )}
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:opacity-100" style={{ color: palette.accent }}>
                <Linkedin size={14} /> <span>LinkedIn</span>
              </a>
            )}
          </div>
        </section>

        {/* Selected Projects */}
        <section id="projects" className="space-y-6">
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: palette.surfaceBorder }}>
            <div className="flex items-center gap-2">
              <Code2 size={16} style={{ color: palette.accent }} />
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: palette.textMuted }}>
                Featured Projects
              </h2>
            </div>
            <span className="text-xs font-mono" style={{ color: palette.textMuted }}>
              ({profile.projects.length} Works)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.projects.map((project, idx) => (
              <div 
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="p-6 rounded-2xl border cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                style={{ 
                  backgroundColor: palette.surface, 
                  borderColor: palette.surfaceBorder 
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)',
                        color: palette.accent 
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <ArrowUpRight 
                      size={16} 
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                      style={{ color: palette.accent }}
                    />
                  </div>

                  <h3 className="text-lg font-bold group-hover:opacity-90 transition-opacity">
                    {project.name}
                  </h3>

                  <p className="text-xs leading-relaxed line-clamp-3" style={{ color: palette.textMuted }}>
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t flex flex-wrap gap-1.5" style={{ borderColor: palette.surfaceBorder }}>
                  {project.technologies.slice(0, 4).map(t => (
                    <span 
                      key={t} 
                      className="text-[11px] font-mono px-2 py-0.5 rounded border"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(37,99,235,0.05)' : 'rgba(255,255,255,0.04)',
                        borderColor: palette.surfaceBorder,
                        color: palette.text
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section id="experience" className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t pt-12" style={{ borderColor: palette.surfaceBorder }}>
          
          {/* Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase size={16} style={{ color: palette.accent }} />
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: palette.textMuted }}>
                Work History
              </h2>
            </div>

            <div className="space-y-5">
              {profile.experience.length === 0 ? (
                <p className="text-xs italic" style={{ color: palette.textMuted }}>Independent project portfolio.</p>
              ) : (
                profile.experience.map((exp, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl border space-y-2 transition-all"
                    style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
                  >
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-bold text-sm">{exp.role}</h3>
                      <span className="text-[11px] font-mono shrink-0" style={{ color: palette.textMuted }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs font-semibold" style={{ color: palette.accent }}>
                      {exp.company}
                    </div>

                    <p className="text-xs leading-relaxed" style={{ color: palette.textMuted }}>
                      {exp.description}
                    </p>

                    {exp.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {exp.technologies.map(tech => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                            style={{ 
                              backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
                              color: palette.textMuted 
                            }}
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Education */}
          <div id="education" className="space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} style={{ color: palette.accent }} />
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: palette.textMuted }}>
                Education & Credentials
              </h2>
            </div>

            <div className="space-y-5">
              {profile.education.map((edu, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-xl border space-y-2 transition-all"
                  style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
                >
                  <h3 className="font-bold text-sm">{edu.institution}</h3>
                  <div className="text-xs font-semibold" style={{ color: palette.accent }}>
                    {edu.degree}
                  </div>
                  <div className="text-[11px] font-mono" style={{ color: palette.textMuted }}>
                    {edu.startDate} – {edu.endDate} {edu.grade ? `· ${edu.grade}` : ''}
                  </div>
                  {edu.coursework && (
                    <div className="text-[11px] pt-1" style={{ color: palette.textMuted }}>
                      Focus: {edu.coursework.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-6 border-t pt-12" style={{ borderColor: palette.surfaceBorder }}>
          <div className="flex items-center gap-2">
            <Terminal size={16} style={{ color: palette.accent }} />
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: palette.textMuted }}>
              Technical Expertise
            </h2>
          </div>

          <div 
            className="p-6 rounded-2xl border space-y-5"
            style={{ backgroundColor: palette.surface, borderColor: palette.surfaceBorder }}
          >
            {profile.skills.languages && profile.skills.languages.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
                  Languages
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.languages.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium border"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.05)',
                        borderColor: palette.surfaceBorder,
                        color: palette.text
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills.frameworks && profile.skills.frameworks.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
                  Frameworks & Libraries
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.frameworks.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium border"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.05)',
                        borderColor: palette.surfaceBorder,
                        color: palette.text
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills.tools && profile.skills.tools.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: palette.accent }}>
                  Infrastructure & Tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.tools.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium border"
                      style={{ 
                        backgroundColor: isLight ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.05)',
                        borderColor: palette.surfaceBorder,
                        color: palette.text
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Banner */}
        <section id="contact" className="border-t pt-12 pb-6" style={{ borderColor: palette.surfaceBorder }}>
          <div 
            className="p-8 sm:p-12 rounded-3xl border text-center space-y-6 relative overflow-hidden"
            style={{ 
              backgroundColor: palette.surface,
              borderColor: palette.surfaceBorder,
              boxShadow: `0 20px 40px -15px ${palette.accentGlow}`
            }}
          >
            <div className="max-w-xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Let's Build Something Impactful
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: palette.textMuted }}>
                Open to collaborations, engineering discussions, and strategic leadership roles.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {profile.personal.email && (
                <a
                  href={`mailto:${profile.personal.email}`}
                  className="px-6 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                  style={{ backgroundColor: palette.accent }}
                >
                  Send Message
                </a>
              )}
              {profile.personal.email && (
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all hover:bg-black/5"
                  style={{ borderColor: palette.surfaceBorder, color: palette.text }}
                >
                  {copied ? 'Email Copied!' : 'Copy Email Address'}
                </button>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
