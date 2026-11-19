import React, { useState, useRef } from 'react';
import { SAMPLE_RESUMES, SampleResume } from '../../services/parser/sampleResumes';
import { 
  Upload, FileText, ArrowRight, ShieldCheck, Zap, 
  Layers, Code2, Globe, Check, Eye, Sparkles, Terminal,
  Layout, Laptop, Smartphone, Download, CheckCircle2, ChevronRight, Key, ExternalLink, Database
} from 'lucide-react';
import { TEMPLATE_REGISTRY } from '../../utils/templateRegistry';
import { TemplateType } from '../../types/profile';

interface LandingViewProps {
  onFileUpload: (file: File) => void;
  onSelectSample: (sample: SampleResume) => void;
  onStartScratch: () => void;
  onOpenSettings: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onFileUpload,
  onSelectSample,
  onStartScratch,
  onOpenSettings
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activePreviewCategory, setActivePreviewCategory] = useState<'all' | 'developer' | 'minimalist' | 'corporate' | 'creative'>('all');
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState<TemplateType | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  // Curated showcase templates
  const showcaseTemplates = [
    {
      id: 'fullstack' as TemplateType,
      title: 'Full-Stack Developer (Cyber Gold)',
      category: 'developer',
      categoryLabel: 'Full-Stack & Systems',
      styleTag: 'Cyber Obsidian & Gold',
      desc: '3D glass profile card, categorized tech radar, connected vertical timeline with architecture highlights, and featured project grids.',
      previewBg: 'bg-[#0d0f14] text-[#e8d5a3] border border-[#c9a84c]/30',
      badge: 'Trending Flagship'
    },
    {
      id: 'luxury' as TemplateType,
      title: 'Architectural Luxury',
      category: 'corporate',
      categoryLabel: 'Corporate & Architecture',
      styleTag: 'Obsidian Minimal Luxury',
      desc: 'Ultra-refined obsidian stealth dark mode, gold and platinum metallic typography, and bespoke architectural spacing.',
      previewBg: 'bg-[#060608] text-[#e8d5be] border border-[#c5a880]/30',
      badge: 'Obsidian Gold'
    },
    {
      id: 'minimalist' as TemplateType,
      title: 'Modern Minimalist',
      category: 'corporate',
      categoryLabel: 'Minimalist & Clean',
      styleTag: 'Editorial Swiss',
      desc: 'Generous white space, refined typography, and structured project indexes. Inspired by modern design studios.',
      previewBg: 'bg-white text-slate-900 border border-slate-200',
      badge: 'Most Popular'
    },
    {
      id: 'personalbrand' as TemplateType,
      title: 'Personal Brand Authority',
      category: 'creative',
      categoryLabel: 'Founder & Personal Brand',
      styleTag: 'Visual Authority',
      desc: 'High-impact personal branding with venture metric counters, executive philosophy breakdown, and signature venture cards.',
      previewBg: 'bg-[#0f172a] text-purple-200 border border-purple-500/30',
      badge: 'Founder Favorite'
    },
    {
      id: 'bentogrid' as TemplateType,
      title: 'Interactive Bento Grid',
      category: 'creative',
      categoryLabel: 'Visual & Interactive',
      styleTag: 'Bento Grid',
      desc: 'Apple and Linear-style modular asymmetric cards, live tech stack metrics, and interactive project cards.',
      previewBg: 'bg-slate-900 text-white border border-slate-800',
      badge: 'Interactive'
    },
    {
      id: 'editorial' as TemplateType,
      title: 'Minimal Editorial',
      category: 'corporate',
      categoryLabel: 'Editorial & Storytelling',
      styleTag: 'High-Fashion Serif',
      desc: 'Magazine-grade editorial typography, split narrative flow, and high-impact case study presentation.',
      previewBg: 'bg-[#FBFBFA] text-[#191919] border border-stone-200',
      badge: 'Editorial'
    },
    {
      id: 'datascientist' as TemplateType,
      title: 'Data & Quantitative',
      category: 'developer',
      categoryLabel: 'Data & Analytics',
      styleTag: 'Algorithmic Metrics',
      desc: 'Statistical model telemetry, algorithmic benchmark cards, pipeline telemetry, and quantitative proof points.',
      previewBg: 'bg-[#061A23] text-teal-50 border border-teal-900/60',
      badge: 'Quantitative'
    }
  ];

  const filteredTemplates = activePreviewCategory === 'all'
    ? showcaseTemplates
    : showcaseTemplates.filter(t => t.category === activePreviewCategory);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#172033] flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/15">
              <span className="font-extrabold text-base tracking-tighter">Z</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-[#14213D] tracking-tight">Zenith</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Studio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#64748B]">
            <a href="#templates" className="hover:text-[#172033] transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-[#172033] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#172033] transition-colors">Features</a>
            <a href="#showcase" className="hover:text-[#172033] transition-colors">Examples</a>
          </nav>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenSettings}
              title="Configure Supabase Cloud Database & API Keys"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#64748B] hover:text-[#172033] hover:bg-slate-50 transition-colors"
            >
              <Database size={13} className="text-[#2563EB]" />
              <span className="hidden sm:inline">Database & Keys</span>
            </button>

            <button 
              onClick={onStartScratch}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#172033] hover:bg-slate-50 transition-colors"
            >
              Manual Start
            </button>

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm transition-all shadow-blue-500/20"
            >
              <Upload size={13} />
              <span>Upload Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Subtle Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Commercial SaaS Resume-to-Portfolio Builder
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#14213D] leading-[1.12]">
            Turn your resume into a <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">professional portfolio website</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Upload your resume in PDF or Word. Zenith synthesizes your genuine career achievements into a verified canonical profile, then deploys a responsive website across 24+ distinct design architectures.
          </p>

          {/* 3. Integrated Resume Upload Hub */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-10 transition-all bg-white shadow-sm ${
                isDragging 
                  ? 'border-[#2563EB] bg-blue-50/50 scale-[1.01]' 
                  : 'border-[#CBD5E1] hover:border-[#2563EB] hover:shadow-md'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInput} 
                accept=".pdf,.docx,.txt" 
                className="hidden" 
              />

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shadow-sm">
                  <Upload size={24} />
                </div>

                <div className="space-y-1">
                  <div className="text-base font-semibold text-[#14213D]">
                    Drop your resume here, or <span className="text-[#2563EB] underline underline-offset-2">browse files</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Supports PDF, DOCX, and TXT files up to 20MB
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-[#64748B]">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>100% Client-Side Privacy Guaranteed · Zero Hallucinations</span>
                </div>
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div className="mt-6 pt-6 border-t border-[#E2E8F0] space-y-3">
              <div className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                Or test instantly with a verified sample resume:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_RESUMES.map(sample => (
                  <button
                    key={sample.id}
                    onClick={() => onSelectSample(sample)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 hover:border-[#CBD5E1] text-left transition-all shadow-sm group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#14213D] font-bold text-xs flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {sample.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#14213D] truncate group-hover:text-blue-600 transition-colors">
                        {sample.name}
                      </div>
                      <div className="text-[11px] text-[#64748B] truncate">
                        {sample.category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Live Portfolio Template Showcase */}
      <section id="templates" className="py-20 px-6 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Marketplace Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight">
                24+ genuinely distinct design architectures.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl">
                Not just color variations. Every portfolio template has its own visual identity, typography system, grid composition, and component architecture.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-[#E2E8F0]">
              {[
                { id: 'all', label: 'All Layouts' },
                { id: 'developer', label: 'Developer & CLI' },
                { id: 'corporate', label: 'Corporate & Editorial' },
                { id: 'creative', label: 'Design & Bento' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActivePreviewCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewCategory === cat.id
                      ? 'bg-white text-[#14213D] shadow-sm'
                      : 'text-[#64748B] hover:text-[#172033]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rendered Template Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(tpl => (
              <div 
                key={tpl.id}
                className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Visual Architecture Representation */}
                <div className={`p-6 h-52 relative overflow-hidden flex flex-col justify-between ${tpl.previewBg}`}>
                  
                  {/* Top Bar of Preview */}
                  <div className="flex items-center justify-between text-[11px] opacity-80 border-b pb-2 border-current/10">
                    <span className="font-mono font-bold uppercase">{tpl.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-black/10 font-medium">
                      {tpl.styleTag}
                    </span>
                  </div>

                  {/* Mock Content Layout Structure */}
                  <div className="space-y-3 my-auto">
                    <div className="space-y-1.5">
                      <div className="h-3.5 bg-current opacity-85 rounded w-3/4 font-bold" />
                      <div className="h-2 bg-current opacity-40 rounded w-full" />
                      <div className="h-2 bg-current opacity-30 rounded w-4/5" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="h-8 rounded bg-current/10 border border-current/10" />
                      <div className="h-8 rounded bg-current/10 border border-current/10" />
                      <div className="h-8 rounded bg-current/10 border border-current/10" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="flex items-center justify-between text-[10px] opacity-75 pt-2 border-t border-current/10 font-mono">
                    <span>Dynamic Profile Binding</span>
                    <span>Responsive 100%</span>
                  </div>
                </div>

                {/* Card Details & Actions */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-[#14213D] text-base group-hover:text-blue-600 transition-colors">
                        {tpl.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {tpl.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#64748B]">
                      {tpl.categoryLabel}
                    </span>
                    <button
                      onClick={() => {
                        const sample = SAMPLE_RESUMES[0];
                        onSelectSample(sample);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
                    >
                      <span>Build With This</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-[#64748B]">
              Every template binds seamlessly to your verified career data. Switch templates anytime inside the editor without losing edits.
            </p>
          </div>

        </div>
      </section>

      {/* 5. How It Works (3 SaaS Steps) */}
      <section id="how-it-works" className="py-20 px-6 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto space-y-14">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Streamlined Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight">
              From raw resume to live website in under 2 minutes.
            </h2>
            <p className="text-sm text-[#64748B]">
              No complicated site builders, no dummy placeholder cards, and no fabricated AI text.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-sm text-[#2563EB]">
                01
              </div>
              <h3 className="font-bold text-lg text-[#14213D]">
                Drop Your Resume
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Upload your PDF, DOCX, or text file. Our text cleaning engine strips PDF artifacts and standardizes complex multi-column resumes into clean sections.
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> PDF & DOCX stream processing
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-sm text-[#2563EB]">
                02
              </div>
              <h3 className="font-bold text-lg text-[#14213D]">
                Fact-Checked Verification
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Review extracted experience, technical skills, projects, and coursework. Edit every single field directly in structured tables without AI hallucinations.
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> 100% editable canonical profile
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-sm text-[#2563EB]">
                03
              </div>
              <h3 className="font-bold text-lg text-[#14213D]">
                Publish or Export ZIP
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Customize with our 3-panel visual editor, use the AI Copilot to polish descriptions, then publish to a live URL or export complete self-hostable code.
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Zero vendor lock-in code ZIP
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Commercial SaaS Features Grid */}
      <section id="features" className="py-20 px-6 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Engineered For Quality
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight">
              Built like modern developer tooling, not a toy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-base text-[#14213D]">Fact Verification Engine</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Our parsing model checks every extracted company, dates, and metric directly against source text to guarantee zero hallucinated claims.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
                <Layout size={20} />
              </div>
              <h4 className="font-bold text-base text-[#14213D]">24+ Genuinely Distinct Layouts</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                From Terminal CLIs and Swiss grids to arXiv research papers and executive timeline spines, each design has its own complete DOM composition.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h4 className="font-bold text-base text-[#14213D]">Productivity AI Copilot</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Context-aware headline and bullet optimizer. Compares before/after side-by-side with clear explanations before you accept any suggestion.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
                <Download size={20} />
              </div>
              <h4 className="font-bold text-base text-[#14213D]">Clean Standalone Code Export</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Download a fully structured ZIP containing semantic HTML, modular CSS, assets, and project data ready to deploy on Vercel, Netlify, or GitHub Pages.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
                <Laptop size={20} />
              </div>
              <h4 className="font-bold text-base text-[#14213D]">3-Panel Visual Editor</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Work like in Linear or Webflow. Toggle responsive Desktop, Tablet, and Mobile views in real-time with full interactive preview fidelity.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E2E8F0] bg-[#F5F7FA] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center">
                <Terminal size={20} />
              </div>
              <h4 className="font-bold text-base text-[#14213D]">High Performance & Accessible</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Built with semantic HTML5, zero unnecessary JavaScript bloat, clean contrast ratios, and fast sub-second initial load speeds.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-16 px-6 bg-[#14213D] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to build your professional portfolio?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Upload your resume now or start with an industry sample. You will have a live, recruiter-ready website in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Upload size={16} />
              <span>Upload Resume (PDF / DOCX)</span>
            </button>
            <button
              onClick={onStartScratch}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-sm transition-all"
            >
              Start From Scratch
            </button>
          </div>
        </div>
      </section>

      {/* 8. Professional Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm">
              Z
            </div>
            <span className="font-bold text-sm text-[#14213D]">Zenith Portfolio Platform</span>
            <span className="text-xs text-[#64748B]">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#64748B]">
            <a href="#templates" className="hover:text-[#172033] transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-[#172033] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#172033] transition-colors">Features</a>
            <button onClick={onOpenSettings} className="hover:text-[#172033] transition-colors">Cloud & API Keys</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
