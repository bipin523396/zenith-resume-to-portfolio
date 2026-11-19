import React, { useState } from 'react';
import { CanonicalProfile, TemplateRecommendation, TemplateType, ProjectItem, EducationItem, ExperienceItem, CertificationItem, AchievementItem } from '../../types/profile';
import { ValidationReport } from '../../services/validation/aiValidator';
import { recommendTemplateAI } from '../../services/ai/groq';
import { 
  CheckCircle2, AlertTriangle, ArrowRight, User, 
  GraduationCap, Briefcase, Code2, Award, Plus, Trash2,
  Terminal, ShieldCheck, Check, Layers, ExternalLink, Globe, Mail, MapPin, Phone, ArrowLeft
} from 'lucide-react';
import { Github, Linkedin } from '../shared/BrandIcons';
import { TEMPLATE_REGISTRY } from '../../utils/templateRegistry';
import { TemplatePreviewThumbnail } from '../shared/TemplatePreviewThumbnail';
import confetti from 'canvas-confetti';

interface VerificationViewProps {
  initialProfile: CanonicalProfile;
  validationReport: ValidationReport;
  onConfirm: (verifiedProfile: CanonicalProfile, chosenTemplate: TemplateType) => void;
  onBackToUpload: () => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  initialProfile,
  validationReport,
  onConfirm,
  onBackToUpload
}) => {
  const [profile, setProfile] = useState<CanonicalProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'projects' | 'skills' | 'education' | 'achievements'>('personal');
  const [recommendations] = useState<TemplateRecommendation[]>(() => recommendTemplateAI(initialProfile));
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => recommendations[0]?.templateId || 'fullstack');
  const [newSkill, setNewSkill] = useState('');

  // Handle personal info changes
  const handlePersonalChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  // Handle skills add/remove
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const skill = newSkill.trim();
    if (!profile.skills.all.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          all: [...prev.skills.all, skill]
        }
      }));
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        all: prev.skills.all.filter(s => s !== skillToRemove),
        languages: (prev.skills.languages || []).filter(s => s !== skillToRemove),
        frameworks: (prev.skills.frameworks || []).filter(s => s !== skillToRemove),
        tools: (prev.skills.tools || []).filter(s => s !== skillToRemove),
        aiMl: (prev.skills.aiMl || []).filter(s => s !== skillToRemove)
      }
    }));
  };

  // Projects modification
  const handleProjectChange = (idx: number, field: keyof ProjectItem, value: any) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleAddProject = () => {
    const newP: ProjectItem = {
      id: `proj_${Date.now()}`,
      slug: `new-project-${profile.projects.length + 1}`,
      name: 'New Featured Project',
      tagline: 'High impact architecture',
      description: 'Engineered an end-to-end scalable application.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      featured: true
    };
    setProfile(prev => ({ ...prev, projects: [...prev.projects, newP] }));
  };

  const handleRemoveProject = (idx: number) => {
    setProfile(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }));
  };

  // Experience modification
  const handleExperienceChange = (idx: number, field: keyof ExperienceItem, value: any) => {
    setProfile(prev => {
      const updated = [...prev.experience];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp_${Date.now()}`,
      company: 'Tech Company Inc',
      role: 'Software Engineer',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      highlights: [],
      description: 'Built scalable backend systems and high-throughput microservices.',
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL']
    };
    setProfile(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const handleRemoveExperience = (idx: number) => {
    setProfile(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }));
  };

  // Education modification
  const handleEducationChange = (idx: number, field: keyof EducationItem, value: any) => {
    setProfile(prev => {
      const updated = [...prev.education];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu_${Date.now()}`,
      institution: 'University / Institute',
      degree: 'Degree & Specialization',
      startDate: '2021',
      endDate: '2025'
    };
    setProfile(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleRemoveEducation = (idx: number) => {
    setProfile(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));
  };

  // Final submission
  const handleSubmit = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    onConfirm(profile, selectedTemplate);
  };

  // Find template metadata for display
  const getTemplateMeta = (tplId: TemplateType) => {
    return TEMPLATE_REGISTRY.find(t => t.id === tplId) || TEMPLATE_REGISTRY[0];
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] font-sans pb-24 selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#0D0F17]/95 backdrop-blur-md border-b border-[#1E2330] px-6 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToUpload}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to Upload
            </button>
            <div className="h-4 w-px bg-[#1E2330]" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">{profile.personal.name || 'Candidate'}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 size={12} /> Fact-Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-[#94A3B8]">
              Selected Layout: <strong className="text-white">{getTemplateMeta(selectedTemplate).title}</strong>
            </span>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-xs shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all"
            >
              <span>Continue to Visual Editor</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* 2. Candidate Overview Card */}
        <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Verify Extracted Profile
            </h1>
            <p className="text-xs text-[#94A3B8]">
              All fields below are fully editable. This canonical profile dynamically drives all 24+ portfolio templates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
            <div className="px-3 py-1.5 rounded-lg bg-[#181C28] border border-[#252B3B] text-slate-200">
              <strong className="text-blue-400">{profile.projects.length}</strong> Projects
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#181C28] border border-[#252B3B] text-slate-200">
              <strong className="text-emerald-400">{profile.experience.length}</strong> Experience Records
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#181C28] border border-[#252B3B] text-slate-200">
              <strong className="text-purple-400">{profile.skills.all.length}</strong> Skills
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#181C28] border border-[#252B3B] text-slate-200">
              <strong className="text-amber-400">{profile.education.length}</strong> Degrees
            </div>
          </div>
        </div>

        {/* 3. Template Selection Section (Visually Organized Marketplace Preview) */}
        <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E2330] pb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Recommended Portfolio Architecture
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Choose your starting design. You can switch templates anytime inside the editor without losing your data.
              </p>
            </div>
            <span className="text-xs text-[#94A3B8]">
              Showing curated match for <span className="font-semibold text-blue-400">{profile.personal.professionalTitle || 'Engineering'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.slice(0, 4).map(rec => {
              const isSelected = selectedTemplate === rec.templateId;
              const meta = getTemplateMeta(rec.templateId);

              return (
                <div
                  key={rec.templateId}
                  onClick={() => setSelectedTemplate(rec.templateId)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between space-y-3 ${
                    isSelected 
                      ? 'border-[#3B82F6] bg-[#141C2E] shadow-lg ring-1 ring-[#3B82F6]' 
                      : 'border-[#1E2330] bg-[#0E111A] hover:border-[#2F374C] hover:bg-[#131724]'
                  }`}
                >
                  {/* Visual Mockup Preview Box */}
                  <TemplatePreviewThumbnail 
                    templateId={rec.templateId}
                    title={rec.title}
                    badge={rec.badge}
                    className="h-28 w-full"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-xs text-white">{rec.title}</h3>
                      {rec.badge && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          rec.templateId === 'fullstack' 
                            ? 'text-[#e8d5a3] bg-[#c9a84c]/20 border border-[#c9a84c]/40'
                            : rec.templateId === 'luxury'
                              ? 'text-[#f2e6d6] bg-[#c5a880]/20 border border-[#c5a880]/40'
                              : 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                        }`}>
                          {rec.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-2">
                      {rec.reason}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1E2330] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#94A3B8]">{meta.categoryLabel}</span>
                    {isSelected ? (
                      <span className="text-[#3B82F6] font-bold text-xs flex items-center gap-1">
                        <Check size={13} /> Selected
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium text-xs hover:text-white transition-colors">Select</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Structured Tabs for Profile Verification */}
        <div className="space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D0F17] border border-[#1E2330] overflow-x-auto text-xs font-semibold">
            {[
              { id: 'personal', label: 'Personal & Contact', icon: <User size={13} /> },
              { id: 'experience', label: `Experience (${profile.experience.length})`, icon: <Briefcase size={13} /> },
              { id: 'projects', label: `Projects (${profile.projects.length})`, icon: <Code2 size={13} /> },
              { id: 'skills', label: `Skills (${profile.skills.all.length})`, icon: <Terminal size={13} /> },
              { id: 'education', label: `Education (${profile.education.length})`, icon: <GraduationCap size={13} /> },
              { id: 'achievements', label: `Achievements (${profile.achievements.length})`, icon: <Award size={13} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-[#1E2435] text-white shadow-sm border border-slate-700/60' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Personal & Contact */}
          {activeTab === 'personal' && (
            <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-xl space-y-6">
              <div className="border-b border-[#1E2330] pb-3">
                <h3 className="text-base font-bold text-white">Personal & Contact Details</h3>
                <p className="text-xs text-[#94A3B8]">Primary candidate identifiers used in portfolio hero, header, and metadata.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <input 
                    type="text"
                    value={profile.personal.name}
                    onChange={e => handlePersonalChange('name', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Professional Title</label>
                  <input 
                    type="text"
                    value={profile.personal.professionalTitle}
                    onChange={e => handlePersonalChange('professionalTitle', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Headline</label>
                  <input 
                    type="text"
                    value={profile.personal.headline}
                    onChange={e => handlePersonalChange('headline', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <input 
                    type="email"
                    value={profile.personal.email}
                    onChange={e => handlePersonalChange('email', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Location</label>
                  <input 
                    type="text"
                    value={profile.personal.location}
                    onChange={e => handlePersonalChange('location', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">GitHub Profile</label>
                  <input 
                    type="text"
                    value={profile.socialLinks.github || ''}
                    onChange={e => setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, github: e.target.value } }))}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none font-mono text-xs"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">LinkedIn Profile</label>
                  <input 
                    type="text"
                    value={profile.socialLinks.linkedin || ''}
                    onChange={e => setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, linkedin: e.target.value } }))}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none font-mono text-xs"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Professional Bio & Summary</label>
                  <textarea 
                    rows={4}
                    value={profile.personal.bio}
                    onChange={e => handlePersonalChange('bio', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white focus:border-[#3B82F6] focus:outline-none text-xs leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Work Experience</h3>
                  <p className="text-xs text-[#94A3B8]">Professional career roles, accomplishments, and tech stacks.</p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={13} /> Add Role
                </button>
              </div>

              {profile.experience.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#11141E] border border-[#1E2330] text-center text-xs text-[#94A3B8]">
                  No formal corporate roles detected. (Student / project-focused portfolio mode is active)
                </div>
              ) : (
                profile.experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="p-5 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1E2330] pb-2">
                      <span className="text-xs font-bold text-white">
                        Role {idx + 1}: {exp.role || 'Position'} at {exp.company || 'Company'}
                      </span>
                      <button 
                        onClick={() => handleRemoveExperience(idx)}
                        className="text-[#94A3B8] hover:text-red-400 p-1 transition-colors"
                        title="Remove role"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Company</label>
                        <input 
                          type="text"
                          value={exp.company}
                          onChange={e => handleExperienceChange(idx, 'company', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Role / Title</label>
                        <input 
                          type="text"
                          value={exp.role}
                          onChange={e => handleExperienceChange(idx, 'role', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-medium"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Start Date – End Date</label>
                        <input 
                          type="text"
                          value={`${exp.startDate} – ${exp.endDate}`}
                          onChange={e => {
                            const [s, end] = e.target.value.split('–').map(x => x.trim());
                            handleExperienceChange(idx, 'startDate', s || '');
                            handleExperienceChange(idx, 'endDate', end || '');
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Technologies</label>
                        <input 
                          type="text"
                          value={(exp.technologies || []).join(', ')}
                          onChange={e => handleExperienceChange(idx, 'technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                          placeholder="e.g. React, Node.js, AWS"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Role Description</label>
                        <textarea 
                          rows={2}
                          value={exp.description}
                          onChange={e => handleExperienceChange(idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Featured Projects</h3>
                  <p className="text-xs text-[#94A3B8]">Detailed case studies, architectural highlights, and live URLs.</p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={13} /> Add Project
                </button>
              </div>

              <div className="space-y-4">
                {profile.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="p-5 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1E2330] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#181C28] text-blue-400 border border-[#252B3B]">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{proj.name}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveProject(idx)}
                        className="text-[#94A3B8] hover:text-red-400 p-1 transition-colors"
                        title="Remove project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Project Name</label>
                        <input 
                          type="text"
                          value={proj.name}
                          onChange={e => handleProjectChange(idx, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Technologies (comma separated)</label>
                        <input 
                          type="text"
                          value={(proj.technologies || []).join(', ')}
                          onChange={e => handleProjectChange(idx, 'technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Project Overview</label>
                        <textarea 
                          rows={2}
                          value={proj.description}
                          onChange={e => handleProjectChange(idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">GitHub Repository URL</label>
                        <input 
                          type="text"
                          value={proj.github || ''}
                          onChange={e => handleProjectChange(idx, 'github', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                          placeholder="https://github.com/..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-[#94A3B8]">Live Deployment URL</label>
                        <input 
                          type="text"
                          value={proj.liveUrl || ''}
                          onChange={e => handleProjectChange(idx, 'liveUrl', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Skills */}
          {activeTab === 'skills' && (
            <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-xl space-y-6">
              <div className="border-b border-[#1E2330] pb-3">
                <h3 className="text-base font-bold text-white">Technical Skills Inventory</h3>
                <p className="text-xs text-[#94A3B8]">Extracted programming languages, frameworks, developer tools, and libraries.</p>
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2 max-w-md">
                <input 
                  type="text"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  placeholder="Add skill (e.g. PyTorch, Rust, Docker)..."
                  className="flex-1 px-3.5 py-2 rounded-lg bg-[#0D0F17] border border-[#22283A] text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold"
                >
                  Add Skill
                </button>
              </form>

              <div className="flex flex-wrap gap-2 pt-2">
                {profile.skills.all.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="group px-3 py-1 rounded-lg text-xs font-medium bg-[#181C28] border border-[#252B3B] text-slate-200 flex items-center gap-1.5 hover:border-red-400 transition-colors"
                  >
                    <span>{skill}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                      title="Remove skill"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Education & Degrees</h3>
                  <p className="text-xs text-[#94A3B8]">University degrees, relevant coursework, and academic accomplishments.</p>
                </div>
                <button
                  onClick={handleAddEducation}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={13} /> Add Education
                </button>
              </div>

              {profile.education.map((edu, idx) => (
                <div key={edu.id || idx} className="p-5 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1E2330] pb-2">
                    <span className="text-xs font-bold text-white">
                      Degree {idx + 1}: {edu.degree || 'Degree'}
                    </span>
                    <button 
                      onClick={() => handleRemoveEducation(idx)}
                      className="text-[#94A3B8] hover:text-red-400 p-1 transition-colors"
                      title="Remove degree"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-[#94A3B8]">Institution</label>
                      <input 
                        type="text"
                        value={edu.institution}
                        onChange={e => handleEducationChange(idx, 'institution', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-[#94A3B8]">Degree & Field of Study</label>
                      <input 
                        type="text"
                        value={edu.degree}
                        onChange={e => handleEducationChange(idx, 'degree', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-[#94A3B8]">Start – End Year</label>
                      <input 
                        type="text"
                        value={`${edu.startDate} – ${edu.endDate}`}
                        onChange={e => {
                          const [s, end] = e.target.value.split('–').map(x => x.trim());
                          handleEducationChange(idx, 'startDate', s || '');
                          handleEducationChange(idx, 'endDate', end || '');
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-[#94A3B8]">Grade / GPA / Percentage</label>
                      <input 
                        type="text"
                        value={edu.grade || ''}
                        onChange={e => handleEducationChange(idx, 'grade', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F17] border border-[#22283A] text-white text-xs font-mono"
                        placeholder="e.g. 3.9 GPA or 7.8/10.0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 6: Achievements */}
          {activeTab === 'achievements' && (
            <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-xl space-y-4">
              <div className="border-b border-[#1E2330] pb-3">
                <h3 className="text-base font-bold text-white">Recognitions, Honors & Awards</h3>
                <p className="text-xs text-[#94A3B8]">Verified certifications, hackathon awards, and competitive honors.</p>
              </div>

              {profile.achievements.map((ach, idx) => (
                <div key={ach.id || idx} className="p-4 rounded-xl bg-[#0D0F17] border border-[#1E2330] space-y-2">
                  <input 
                    type="text"
                    value={ach.title}
                    onChange={e => {
                      const updated = [...profile.achievements];
                      updated[idx].title = e.target.value;
                      setProfile(prev => ({ ...prev, achievements: updated }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#11141E] border border-[#22283A] text-white text-xs font-bold"
                  />
                  <textarea 
                    rows={2}
                    value={ach.description}
                    onChange={e => {
                      const updated = [...profile.achievements];
                      updated[idx].description = e.target.value;
                      setProfile(prev => ({ ...prev, achievements: updated }));
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#11141E] border border-[#22283A] text-white text-xs"
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* 5. Bottom Navigation Bar */}
        <div className="pt-6 border-t border-[#1E2330] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#94A3B8]">
            All changes are saved automatically. Press below to launch the live interactive editor.
          </div>

          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Launch Visual Editor & Website</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </main>

    </div>
  );
};
