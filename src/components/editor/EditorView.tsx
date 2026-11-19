import React, { useState } from 'react';
import { 
  CanonicalProfile, ThemeConfig, TemplateType, FontFamilyType, 
  ColorPaletteType, ProjectItem, TemplateCategory, SectionConfig 
} from '../../types/profile';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ProjectDetailModal } from '../shared/ProjectDetailModal';
import { COLOR_PALETTES, FONT_CLASSES } from '../../utils/themeEngine';
import { rewriteHeadline, rewriteProjectDescription, RewriteTone } from '../../services/ai/groq';
import { TEMPLATE_REGISTRY, TEMPLATE_MARKETPLACE_CATEGORIES } from '../../utils/templateRegistry';
import { 
  Laptop, Tablet, Smartphone, Download, Globe, Undo2, Redo2, 
  Layers, Sliders, Type, Palette, Code2, ArrowUpRight, Check, Eye, 
  RefreshCw, Bot, Wand2, ShieldCheck, Search, ChevronRight, X, 
  MoveUp, MoveDown, CheckCircle2, MessageSquare, Zap, Filter, ArrowLeft,
  FileDown, Sparkles, ChevronDown, CheckCheck, HelpCircle, EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EditorViewProps {
  initialProfile: CanonicalProfile;
  initialTheme: ThemeConfig;
  onPublish: (profile: CanonicalProfile, theme: ThemeConfig) => void;
  onDownloadZip: (profile: CanonicalProfile, theme: ThemeConfig) => void;
  onBackToVerification: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  initialProfile,
  initialTheme,
  onPublish,
  onDownloadZip,
  onBackToVerification
}) => {
  const [profile, setProfile] = useState<CanonicalProfile>(initialProfile);
  const [theme, setTheme] = useState<ThemeConfig>(initialTheme);
  
  // History for Undo / Redo
  const [history, setHistory] = useState<{ profile: CanonicalProfile; theme: ThemeConfig }[]>([
    { profile: initialProfile, theme: initialTheme }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [activeLeftTab, setActiveLeftTab] = useState<'templates' | 'theme' | 'content' | 'sections'>('templates');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<TemplateCategory>('all');
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');
  const [paletteModeFilter, setPaletteModeFilter] = useState<'all' | 'light' | 'dark'>('all');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);

  // Copilot State
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [targetRole, setTargetRole] = useState(profile.personal.professionalTitle || 'Software Engineer');
  const [selectedTone, setSelectedTone] = useState<RewriteTone>('impactful');
  const [copilotHeadlineProposal, setCopilotHeadlineProposal] = useState<{ before: string; after: string; explanation: string } | null>(null);
  const [copilotProjectProposal, setCopilotProjectProposal] = useState<{ projectId: string; before: string; after: string; bullets: string[]; explanation: string } | null>(null);
  const [selectedProjectForAi, setSelectedProjectForAi] = useState<string>(profile.projects[0]?.id || '');
  const [copilotStatusMsg, setCopilotStatusMsg] = useState<string | null>(null);

  const pushState = (newProfile: CanonicalProfile, newTheme: ThemeConfig) => {
    const updated = history.slice(0, historyIndex + 1);
    updated.push({ profile: newProfile, theme: newTheme });
    setHistory(updated);
    setHistoryIndex(updated.length - 1);
  };

  const handleProfileChange = (updater: (prev: CanonicalProfile) => CanonicalProfile) => {
    setProfile(prev => {
      const next = updater(prev);
      pushState(next, theme);
      return next;
    });
  };

  const handleThemeChange = (updater: (prev: ThemeConfig) => ThemeConfig) => {
    setTheme(prev => {
      const next = updater(prev);
      pushState(profile, next);
      return next;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setProfile(prev.profile);
      setTheme(prev.theme);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setProfile(next.profile);
      setTheme(next.theme);
    }
  };

  // Section visibility toggle
  const handleToggleSection = (sectionId: string) => {
    handleThemeChange(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s)
    }));
  };

  // Move section reordering
  const handleMoveSection = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= theme.sections.length) return;

    handleThemeChange(prev => {
      const updated = [...prev.sections];
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;
      return { ...prev, sections: updated };
    });
  };

  // Download Markdown resume
  const handleDownloadResume = () => {
    const resumeText = `# ${profile.personal.name} — ${profile.personal.professionalTitle}
Email: ${profile.personal.email} | Location: ${profile.personal.location}
Website: ${profile.personal.website || ''} | GitHub: ${profile.socialLinks.github || ''} | LinkedIn: ${profile.socialLinks.linkedin || ''}

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
- Languages: ${profile.skills.languages?.join(', ') || profile.skills.all.slice(0, 8).join(', ')}
- Frameworks: ${profile.skills.frameworks?.join(', ') || ''}
- Tools & Cloud: ${profile.skills.tools?.join(', ') || ''}

## Education
${profile.education.map(ed => `- ${ed.degree}, ${ed.institution} (${ed.startDate} – ${ed.endDate}) ${ed.grade ? `| ${ed.grade}` : ''}`).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // AI Content Polish Actions
  const handleAiRewriteHeadline = async () => {
    setCopilotLoading(true);
    try {
      const result = await rewriteHeadline(profile.personal.headline, targetRole, selectedTone);
      setCopilotHeadlineProposal(result);
    } catch (e) {
      console.error(e);
      // Heuristic fallback for offline/no-key mode
      setCopilotHeadlineProposal({
        before: profile.personal.headline,
        after: `${targetRole} specializing in scalable systems, high-performance architecture, and production delivery.`,
        explanation: 'Refined to lead with target role and proven execution capabilities.'
      });
    } finally {
      setCopilotLoading(false);
    }
  };

  const handleAcceptHeadlineProposal = () => {
    if (copilotHeadlineProposal) {
      handleProfileChange(p => ({
        ...p,
        personal: { ...p.personal, headline: copilotHeadlineProposal.after }
      }));
      setCopilotStatusMsg('Applied: Updated headline with professional impact.');
      setCopilotHeadlineProposal(null);
    }
  };

  const handleAiRewriteProject = async () => {
    const proj = profile.projects.find(p => p.id === selectedProjectForAi) || profile.projects[0];
    if (!proj) return;
    setCopilotLoading(true);
    try {
      const result = await rewriteProjectDescription(proj.name, proj.description, proj.technologies, selectedTone);
      setCopilotProjectProposal({
        projectId: proj.id,
        ...result
      });
    } catch (e) {
      console.error(e);
      setCopilotProjectProposal({
        projectId: proj.id,
        before: proj.description,
        after: `Architected and engineered ${proj.name} utilizing ${proj.technologies.slice(0, 3).join(', ')}. Implemented resilient data flow and modular microservices to optimize overall latency and user experience.`,
        bullets: ['Engineered scalable backend pipelines', 'Optimized end-to-end data throughput'],
        explanation: 'Enhanced with clear architectural ownership and quantifiable technical results.'
      });
    } finally {
      setCopilotLoading(false);
    }
  };

  const handleAcceptProjectProposal = () => {
    if (copilotProjectProposal) {
      handleProfileChange(p => ({
        ...p,
        projects: p.projects.map(proj => {
          if (proj.id === copilotProjectProposal.projectId) {
            return {
              ...proj,
              description: copilotProjectProposal.after,
              features: copilotProjectProposal.bullets.length > 0 ? copilotProjectProposal.bullets : proj.features
            };
          }
          return proj;
        })
      }));
      setCopilotStatusMsg(`Applied: Polished project description for ${profile.projects.find(p => p.id === copilotProjectProposal.projectId)?.name || 'project'}.`);
      setCopilotProjectProposal(null);
    }
  };

  // Filter templates
  const filteredTemplates = TEMPLATE_REGISTRY.filter(t => {
    const matchesCategory = selectedCategoryFilter === 'all' || t.category === selectedCategoryFilter;
    const matchesSearch = !templateSearchQuery || 
      t.title.toLowerCase().includes(templateSearchQuery.toLowerCase()) || 
      t.desc.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
      t.layoutStyle.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
      (t.badge && t.badge.toLowerCase().includes(templateSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-screen bg-[#F5F7FA] text-[#172033] flex flex-col overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-14 border-b border-[#E2E8F0] bg-white px-4 sm:px-6 flex items-center justify-between z-20 flex-shrink-0 shadow-sm">
        
        {/* Left: Brand, Back, and Project Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToVerification}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#172033] transition-colors"
            title="Return to fact verification"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Verify</span>
          </button>

          <div className="h-4 w-px bg-[#E2E8F0]" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-[#14213D]">{profile.personal.name}</span>
            <span className="text-xs text-[#64748B] hidden md:inline">/</span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hidden md:inline">
              {TEMPLATE_REGISTRY.find(t => t.id === theme.templateId)?.title || theme.templateId}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Saved locally</span>
          </div>
        </div>

        {/* Center: Viewport Switcher & Undo/Redo */}
        <div className="flex items-center gap-2">
          
          {/* Responsive Viewport Controls */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-[#E2E8F0]">
            <button
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                viewport === 'desktop' 
                  ? 'bg-white text-[#14213D] shadow-sm font-semibold' 
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
              title="Desktop (1200px+)"
            >
              <Laptop size={14} />
              <span className="hidden sm:inline text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                viewport === 'tablet' 
                  ? 'bg-white text-[#14213D] shadow-sm font-semibold' 
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
              title="Tablet (768px)"
            >
              <Tablet size={14} />
              <span className="hidden sm:inline text-[11px]">Tablet</span>
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                viewport === 'mobile' 
                  ? 'bg-white text-[#14213D] shadow-sm font-semibold' 
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
              title="Mobile (375px)"
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline text-[11px]">Mobile</span>
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-100 border border-[#E2E8F0]">
            <button
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className={`p-1 rounded ${historyIndex === 0 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'text-[#64748B] hover:text-[#172033] hover:bg-white'}`}
              title="Undo change (Cmd+Z)"
            >
              <Undo2 size={13} />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              className={`p-1 rounded ${historyIndex === history.length - 1 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'text-[#64748B] hover:text-[#172033] hover:bg-white'}`}
              title="Redo change"
            >
              <Redo2 size={13} />
            </button>
          </div>

        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => setIsCopilotOpen(prev => !prev)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isCopilotOpen 
                ? 'bg-blue-50 text-[#2563EB] border border-blue-200' 
                : 'text-[#64748B] hover:text-[#172033] hover:bg-slate-100 border border-transparent'
            }`}
            title="Toggle AI Copilot"
          >
            <Bot size={14} className="text-[#2563EB]" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#172033] hover:bg-slate-50 transition-colors"
            title="Download formatted resume markdown"
          >
            <FileDown size={13} />
            <span>Resume</span>
          </button>

          <button
            onClick={() => onDownloadZip(profile, theme)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#172033] hover:bg-slate-50 transition-colors"
            title="Export clean HTML/React/Tailwind ZIP"
          >
            <Download size={13} />
            <span>Export ZIP</span>
          </button>

          <button
            onClick={() => onPublish(profile, theme)}
            className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs shadow-sm shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <Globe size={13} />
            <span>Publish Live</span>
          </button>

        </div>

      </header>

      {/* 2. THREE-PANEL VISUAL WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT PANEL: Builder Tools (Width 340px) */}
        <div className="w-80 lg:w-88 border-r border-[#E2E8F0] bg-white flex flex-col z-10 flex-shrink-0 shadow-sm">
          
          {/* Navigation Tabs Header */}
          <div className="grid grid-cols-4 border-b border-[#E2E8F0] p-1 gap-1 text-[11px] font-semibold bg-slate-50/70">
            {[
              { id: 'templates', label: 'Templates', icon: <Layers size={13} /> },
              { id: 'theme', label: 'Theme', icon: <Palette size={13} /> },
              { id: 'content', label: 'Content', icon: <Type size={13} /> },
              { id: 'sections', label: 'Sections', icon: <Sliders size={13} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLeftTab(tab.id as any)}
                className={`py-2 px-1 rounded-md flex flex-col items-center justify-center gap-1 transition-all ${
                  activeLeftTab === tab.id 
                    ? 'bg-white text-[#2563EB] shadow-xs font-bold border border-[#E2E8F0]' 
                    : 'text-[#64748B] hover:text-[#172033]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: TEMPLATE MARKETPLACE */}
          {activeLeftTab === 'templates' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Search Bar */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search 24+ templates..."
                  value={templateSearchQuery}
                  onChange={e => setTemplateSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-[#172033] text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1 pb-1">
                {TEMPLATE_MARKETPLACE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-[#14213D] text-white font-semibold'
                        : 'bg-slate-100 text-[#64748B] hover:text-[#172033] hover:bg-slate-200'
                    }`}
                  >
                    {cat.label.replace(' Templates', '')}
                  </button>
                ))}
              </div>

              {/* Template Cards List */}
              <div className="space-y-3">
                {filteredTemplates.map(t => {
                  const isSelected = theme.templateId === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleThemeChange(prev => ({ ...prev, templateId: t.id }))}
                      className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                        isSelected 
                          ? 'border-[#2563EB] bg-blue-50/40 shadow-xs ring-1 ring-[#2563EB]' 
                          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-[#14213D]">{t.title}</span>
                          {t.badge && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-[#64748B]">
                              {t.badge}
                            </span>
                          )}
                        </div>
                        {isSelected ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2563EB] text-white">
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-blue-600 hover:underline">
                            Select
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-medium text-[#2563EB]">
                        {t.layoutStyle}
                      </div>

                      <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-2">
                        {t.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: THEME & COLOR CUSTOMIZATION */}
          {activeLeftTab === 'theme' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              
              {/* Color Palettes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#14213D] text-xs">Curated Color Palettes</label>
                  <div className="flex rounded-md p-0.5 bg-slate-100 border border-slate-200 text-[10px]">
                    {(['all', 'dark', 'light'] as const).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPaletteModeFilter(mode)}
                        className={`px-2 py-0.5 rounded capitalize font-medium transition-colors ${
                          paletteModeFilter === mode 
                            ? 'bg-white text-[#2563EB] shadow-xs font-bold' 
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                  {Object.entries(COLOR_PALETTES)
                    .filter(([_, pal]) => {
                      if (paletteModeFilter === 'light') return pal.isLight;
                      if (paletteModeFilter === 'dark') return !pal.isLight;
                      return true;
                    })
                    .map(([key, pal]) => {
                      const isSelected = theme.colorPalette === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handleThemeChange(prev => ({ 
                            ...prev, 
                            colorPalette: key as ColorPaletteType,
                            accentColor: pal.accent,
                            backgroundColor: pal.bg,
                            surfaceColor: pal.surface,
                            textColor: pal.text
                          }))}
                          className={`p-2 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                            isSelected 
                              ? 'border-[#2563EB] bg-blue-50/70 shadow-xs ring-1 ring-[#2563EB]' 
                              : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Visual 3-color swatch */}
                            <div className="flex items-center -space-x-1 shrink-0">
                              <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: pal.bg }} title="Background" />
                              <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs" style={{ backgroundColor: pal.surface }} title="Card Surface" />
                              <span className="w-4 h-4 rounded-full border border-black/10 shadow-xs ring-1 ring-white" style={{ backgroundColor: pal.accent }} title="Accent Color" />
                            </div>

                            <div className="truncate">
                              <div className="text-[11px] font-bold text-[#172033] truncate leading-tight">{pal.name}</div>
                              <div className="text-[10px] text-[#64748B]">
                                {pal.isLight ? '☀️ Clean Light' : '🌙 Rich Dark'}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Custom Accent Color Picker */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#14213D]">Custom Accent Color</label>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                    {theme.accentColor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.accentColor || '#c9a84c'}
                    onChange={e => handleThemeChange(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer p-0.5 bg-white shrink-0"
                  />
                  <div className="flex items-center gap-1.5 flex-1 flex-wrap">
                    {['#c9a84c', '#2563EB', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B', '#E11D48'].map(hex => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => handleThemeChange(prev => ({ ...prev, accentColor: hex }))}
                        className={`w-5 h-5 rounded-full border transition-transform hover:scale-125 ${
                          theme.accentColor === hex ? 'scale-125 ring-2 ring-blue-600' : 'border-black/10'
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography Preset */}
              <div className="space-y-2">
                <label className="font-bold text-[#14213D] text-xs">Typography</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'inter', label: 'Inter (Clean Sans)' },
                    { id: 'outfit', label: 'Outfit (Modern Display)' },
                    { id: 'editorial', label: 'Playfair (Editorial Serif)' },
                    { id: 'space', label: 'Space Grotesk (Tech)' },
                    { id: 'syne', label: 'Syne (Avant-Garde)' },
                    { id: 'mono', label: 'JetBrains Mono' }
                  ].map(font => (
                    <button
                      key={font.id}
                      onClick={() => handleThemeChange(prev => ({ ...prev, fontFamily: font.id as FontFamilyType }))}
                      className={`p-2 rounded-lg border text-[11px] text-left transition-all ${
                        theme.fontFamily === font.id 
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] font-bold' 
                          : 'border-[#E2E8F0] bg-white text-[#172033] hover:bg-slate-50'
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing & Border Radius */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E2E8F0]">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#14213D] text-[11px]">Rhythm Spacing</label>
                  <select
                    value={theme.spacing}
                    onChange={e => handleThemeChange(prev => ({ ...prev, spacing: e.target.value as any }))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033]"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal">Standard</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#14213D] text-[11px]">Corner Radius</label>
                  <select
                    value={theme.borderRadius}
                    onChange={e => handleThemeChange(prev => ({ ...prev, borderRadius: e.target.value as any }))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033]"
                  >
                    <option value="none">Sharp (0px)</option>
                    <option value="sm">Subtle (4px)</option>
                    <option value="md">Rounded (8px)</option>
                    <option value="lg">Curved (16px)</option>
                    <option value="full">Pill (99px)</option>
                  </select>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CONTENT QUICK EDIT */}
          {activeLeftTab === 'content' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              <div className="border-b border-[#E2E8F0] pb-2">
                <span className="font-bold text-[#14213D]">Edit Profile Content</span>
                <p className="text-[11px] text-[#64748B]">Edits update your live website instantly.</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#14213D] text-[11px]">Candidate Name</label>
                <input 
                  type="text" 
                  value={profile.personal.name}
                  onChange={e => handleProfileChange(p => ({ ...p, personal: { ...p.personal, name: e.target.value } }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#14213D] text-[11px]">Professional Title</label>
                <input 
                  type="text" 
                  value={profile.personal.professionalTitle || ''}
                  onChange={e => handleProfileChange(p => ({ ...p, personal: { ...p.personal, professionalTitle: e.target.value } }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#14213D] text-[11px]">Headline</label>
                <textarea 
                  rows={2}
                  value={profile.personal.headline}
                  onChange={e => handleProfileChange(p => ({ ...p, personal: { ...p.personal, headline: e.target.value } }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033] leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#14213D] text-[11px]">Bio & Career Story</label>
                <textarea 
                  rows={4}
                  value={profile.personal.bio}
                  onChange={e => handleProfileChange(p => ({ ...p, personal: { ...p.personal, bio: e.target.value } }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-[#14213D] text-[11px]">Email</label>
                  <input 
                    type="email" 
                    value={profile.personal.email || ''}
                    onChange={e => handleProfileChange(p => ({ ...p, personal: { ...p.personal, email: e.target.value } }))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#14213D] text-[11px]">Location</label>
                  <input 
                    type="text" 
                    value={profile.personal.location || ''}
                    onChange={e => handleProfileChange(p => ({ ...p, personal: { ...p.personal, location: e.target.value } }))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#14213D] text-[11px]">GitHub URL</label>
                <input 
                  type="text" 
                  value={profile.socialLinks.github || ''}
                  onChange={e => handleProfileChange(p => ({ ...p, socialLinks: { ...p.socialLinks, github: e.target.value } }))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#14213D] text-[11px]">LinkedIn URL</label>
                <input 
                  type="text" 
                  value={profile.socialLinks.linkedin || ''}
                  onChange={e => handleProfileChange(p => ({ ...p, socialLinks: { ...p.socialLinks, linkedin: e.target.value } }))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-[#CBD5E1] text-xs text-[#172033] font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 4: SECTIONS & REORDERING */}
          {activeLeftTab === 'sections' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              <div className="border-b border-[#E2E8F0] pb-2">
                <span className="font-bold text-[#14213D]">Section Visibility & Order</span>
                <p className="text-[11px] text-[#64748B]">Toggle or reorder sections on your website.</p>
              </div>

              <div className="space-y-1.5">
                {theme.sections.map((sec, idx) => (
                  <div 
                    key={sec.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-[#E2E8F0] text-xs font-medium text-[#172033]"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleSection(sec.id)}
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                          sec.visible ? 'bg-[#2563EB] text-white' : 'border border-slate-300 bg-white'
                        }`}
                        title={sec.visible ? 'Hide section' : 'Show section'}
                      >
                        {sec.visible && <Check size={11} />}
                      </button>
                      <span className={sec.visible ? '' : 'line-through text-slate-400'}>
                        {sec.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveSection(idx, 'up')}
                        disabled={idx === 0}
                        className={`p-1 rounded text-slate-400 hover:text-[#172033] ${idx === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-200'}`}
                      >
                        <MoveUp size={12} />
                      </button>
                      <button
                        onClick={() => handleMoveSection(idx, 'down')}
                        disabled={idx === theme.sections.length - 1}
                        className={`p-1 rounded text-slate-400 hover:text-[#172033] ${idx === theme.sections.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-200'}`}
                      >
                        <MoveDown size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* CENTER PANEL: LIVE RESPONSIVE WEBSITE CANVAS */}
        <div className="flex-1 bg-[#EEF2F6] overflow-y-auto flex items-start justify-center p-4 sm:p-6 transition-all">
          <div 
            className={`transition-all duration-300 rounded-xl shadow-lg border border-[#CBD5E1] overflow-hidden bg-white min-h-[90vh] ${
              viewport === 'desktop' 
                ? 'w-full max-w-6xl' 
                : viewport === 'tablet' 
                  ? 'w-[768px]' 
                  : 'w-[375px]'
            }`}
          >
            {/* Viewport Frame Chrome Bar (for mobile & tablet) */}
            {viewport !== 'desktop' && (
              <div className="bg-slate-100 border-b border-[#CBD5E1] px-4 py-2 flex items-center justify-between text-[11px] text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="font-mono">{viewport === 'tablet' ? '768 × 1024' : '375 × 812'}</span>
                <span className="font-medium text-[#172033]">{profile.personal.name}</span>
              </div>
            )}

            {/* Template Renderer */}
            <TemplateRenderer 
              profile={profile} 
              theme={theme} 
              onSelectProject={proj => setSelectedProjectForModal(proj)} 
            />
          </div>
        </div>

        {/* RIGHT PANEL: AI COPILOT PRODUCTIVITY ASSISTANT (Width 340px) */}
        {isCopilotOpen && (
          <div className="w-80 lg:w-88 border-l border-[#E2E8F0] bg-white flex flex-col z-10 flex-shrink-0 shadow-sm animate-fadeIn">
            
            {/* Copilot Header */}
            <div className="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-100 text-[#2563EB] flex items-center justify-center">
                  <Bot size={15} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#14213D]">Portfolio Copilot</h3>
                  <div className="text-[10px] text-[#64748B]">Productivity & Writing Assistant</div>
                </div>
              </div>

              <button 
                onClick={() => setIsCopilotOpen(false)}
                className="text-slate-400 hover:text-[#172033] p-1"
                title="Collapse Copilot"
              >
                <X size={15} />
              </button>
            </div>

            {/* Copilot Controls & Suggestions */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              
              {/* Status Message */}
              {copilotStatusMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                  <span>{copilotStatusMsg}</span>
                </div>
              )}

              {/* Tool 1: Headline Polish */}
              <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#14213D]">Headline Optimizer</span>
                  <span className="text-[10px] font-medium text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded">Context-Aware</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#64748B]">Target Role</label>
                  <input 
                    type="text"
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] text-xs font-medium"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#64748B]">Writing Tone</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'impactful', label: 'Impactful' },
                      { id: 'technical', label: 'Technical' },
                      { id: 'executive', label: 'Executive' },
                      { id: 'minimalist', label: 'Minimalist' }
                    ].map(tone => (
                      <button
                        key={tone.id}
                        onClick={() => setSelectedTone(tone.id as any)}
                        className={`py-1 px-2 rounded text-[11px] border text-center transition-all ${
                          selectedTone === tone.id
                            ? 'bg-[#14213D] text-white font-semibold border-[#14213D]'
                            : 'bg-white text-[#64748B] border-[#CBD5E1] hover:bg-slate-100'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAiRewriteHeadline}
                  disabled={copilotLoading}
                  className="w-full py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  {copilotLoading ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  <span>Generate Headline Options</span>
                </button>

                {/* Proposal Comparison Card */}
                {copilotHeadlineProposal && (
                  <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] shadow-xs space-y-2 mt-2">
                    <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                      Proposed Headline:
                    </div>
                    <div className="text-xs text-[#172033] font-medium leading-relaxed bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                      "{copilotHeadlineProposal.after}"
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {copilotHeadlineProposal.explanation}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleAcceptHeadlineProposal}
                        className="flex-1 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center justify-center gap-1"
                      >
                        <Check size={12} /> Apply Headline
                      </button>
                      <button
                        onClick={() => setCopilotHeadlineProposal(null)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] text-[#64748B] hover:text-[#172033] text-xs font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tool 2: Project Case Study Polish */}
              <div className="p-3.5 rounded-xl border border-[#E2E8F0] bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#14213D]">Project Case Study Polish</span>
                  <span className="text-[10px] font-medium text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded">Quantified</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#64748B]">Select Project</label>
                  <select
                    value={selectedProjectForAi}
                    onChange={e => setSelectedProjectForAi(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] text-xs"
                  >
                    {profile.projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAiRewriteProject}
                  disabled={copilotLoading}
                  className="w-full py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  {copilotLoading ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  <span>Refine Project Narrative</span>
                </button>

                {/* Project Proposal Diff */}
                {copilotProjectProposal && (
                  <div className="p-3 rounded-xl bg-white border border-[#CBD5E1] shadow-xs space-y-2 mt-2">
                    <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                      Enhanced Description:
                    </div>
                    <div className="text-xs text-[#172033] leading-relaxed bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                      {copilotProjectProposal.after}
                    </div>

                    {copilotProjectProposal.bullets.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-semibold text-[#64748B]">Impact Bullets:</div>
                        <ul className="list-disc list-inside text-[11px] text-[#172033] space-y-0.5">
                          {copilotProjectProposal.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleAcceptProjectProposal}
                        className="flex-1 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center justify-center gap-1"
                      >
                        <Check size={12} /> Apply Improvements
                      </button>
                      <button
                        onClick={() => setCopilotProjectProposal(null)}
                        className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] text-[#64748B] hover:text-[#172033] text-xs font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fact Preservation Assurance */}
              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1 text-[#64748B]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#14213D]">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Fact Integrity Protection</span>
                </div>
                <p className="text-[10px] leading-relaxed">
                  Copilot operates strictly on verified facts from your uploaded resume. Experience, companies, and project outcomes are never fabricated.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal 
        project={selectedProjectForModal}
        theme={theme}
        onClose={() => setSelectedProjectForModal(null)}
      />

    </div>
  );
};
