import React, { useState, useRef } from 'react';
import { SAMPLE_RESUMES, SampleResume } from '../../services/parser/sampleResumes';
import { 
  Upload, FileText, ArrowRight, ShieldCheck, Zap, 
  Layers, Code2, Globe, Check, Eye, Sparkles, Terminal,
  Layout, Laptop, Smartphone, Download, CheckCircle2, ChevronRight, Key, ExternalLink, Database
} from 'lucide-react';
import { TEMPLATE_REGISTRY } from '../../utils/templateRegistry';
import { TemplateType } from '../../types/profile';
import { TemplatePreviewThumbnail } from '../shared/TemplatePreviewThumbnail';

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

  // Curated showcase templates with Full-Stack on #1 and Architectural Luxury on #2
  const showcaseTemplates = [
    {
      id: 'fullstack' as TemplateType,
      title: 'Full-Stack Developer (Cyber Gold)',
      category: 'developer',
      categoryLabel: 'Full-Stack & Systems',
      styleTag: 'Cyber Obsidian & Gold',
      desc: '3D glass profile card, categorized tech radar, connected vertical timeline with architecture highlights, and featured project grids.',
      badge: 'Premier Flagship #1'
    },
    {
      id: 'luxury' as TemplateType,
      title: 'Architectural Luxury',
      category: 'corporate',
      categoryLabel: 'Corporate & Architecture',
      styleTag: 'Obsidian Minimal Luxury',
      desc: 'Ultra-refined obsidian stealth dark mode, gold and platinum metallic typography, and bespoke architectural spacing.',
      badge: 'Obsidian Gold #2'
    },
    {
      id: 'bentogrid' as TemplateType,
      title: 'Interactive Bento Grid',
      category: 'creative',
      categoryLabel: 'Visual & Interactive',
      styleTag: 'Bento Grid',
      desc: 'Apple and Linear-style modular asymmetric cards, live tech stack metrics, and interactive project cards.',
      badge: 'Interactive #3'
    },
    {
      id: 'minimalist' as TemplateType,
      title: 'Modern Minimalist',
      category: 'corporate',
      categoryLabel: 'Minimalist & Clean',
      styleTag: 'Editorial Swiss',
      desc: 'Generous white space, refined typography, and structured project indexes. Inspired by modern design studios.',
      badge: 'Swiss Clean #4'
    },
    {
      id: 'personalbrand' as TemplateType,
      title: 'Personal Brand Authority',
      category: 'creative',
      categoryLabel: 'Founder & Personal Brand',
      styleTag: 'Visual Authority',
      desc: 'High-impact personal branding with venture metric counters, executive philosophy breakdown, and signature venture cards.',
      badge: 'Founder Favorite'
    },
    {
      id: 'editorial' as TemplateType,
      title: 'Minimal Editorial',
      category: 'corporate',
      categoryLabel: 'Editorial & Storytelling',
      styleTag: 'High-Fashion Serif',
      desc: 'Magazine-grade editorial typography, split narrative flow, and high-impact case study presentation.',
      badge: 'Editorial'
    },
    {
      id: 'datascientist' as TemplateType,
      title: 'Data & Quantitative',
      category: 'developer',
      categoryLabel: 'Data & Analytics',
      styleTag: 'Algorithmic Metrics',
      desc: 'Statistical model telemetry, algorithmic benchmark cards, pipeline telemetry, and quantitative proof points.',
      badge: 'Quantitative'
    }
  ];

  const filteredTemplates = activePreviewCategory === 'all'
    ? showcaseTemplates
    : showcaseTemplates.filter(t => t.category === activePreviewCategory);

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#ddd8cc] flex flex-col justify-between selection:bg-[#c9a84c] selection:text-[#0d0f14] font-sans">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/92 backdrop-blur-md border-b border-[rgba(200,180,120,0.12)] shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8b6914] to-[#c9a84c] flex items-center justify-center text-[#0d0f14] shadow-lg shadow-[#c9a84c]/25">
              <span className="font-extrabold text-base tracking-tighter">Z</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-[#f5f0e8] tracking-tight">Zenith<span className="text-[#c9a84c]">.</span></span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#c9a84c]/10 text-[#e8d5a3] border border-[#c9a84c]/30 font-mono">
                Studio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8a8478]">
            <a href="#templates" className="hover:text-[#f5f0e8] transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-[#f5f0e8] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#f5f0e8] transition-colors">Features</a>
            <a href="#samples" className="hover:text-[#f5f0e8] transition-colors">Examples</a>
          </nav>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenSettings}
              title="Configure Supabase Cloud Database & API Keys"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(200,180,120,0.15)] bg-[rgba(255,255,255,0.02)] text-xs font-medium text-[#8a8478] hover:text-[#f5f0e8] hover:border-[#c9a84c]/50 hover:bg-[#181c25] transition-all"
            >
              <Database size={13} className="text-[#c9a84c]" />
              <span className="hidden sm:inline">Database & Keys</span>
            </button>

            <button 
              onClick={onStartScratch}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[rgba(200,180,120,0.15)] bg-[rgba(255,255,255,0.02)] text-xs font-semibold text-[#ddd8cc] hover:bg-[#181c25] hover:border-[#c9a84c]/50 hover:text-[#f5f0e8] transition-all"
            >
              Manual Start
            </button>

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#8b6914] to-[#c9a84c] hover:from-[#c9a84c] hover:to-[#e8d5a3] text-[#0d0f14] text-xs font-bold shadow-md shadow-[#c9a84c]/25 transition-all hover:-translate-y-0.5"
            >
              <Upload size={13} />
              <span>Upload Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        {/* Ambient Dark Gold Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-[#8b6914]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Subtle Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-[#12151c] text-[#e8d5a3] border border-[#c9a84c]/30 shadow-inner font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            Commercial SaaS Resume-to-Portfolio Builder
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#f5f0e8] leading-[1.12]">
            Turn your resume into a <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] via-[#e8d5a3] to-[#c9a84c]">
              professional portfolio website
            </span>.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#8a8478] max-w-2xl mx-auto leading-relaxed">
            Upload your resume in PDF or Word. Zenith synthesizes your genuine career achievements into a verified canonical profile, then deploys a responsive website across 24+ distinct design architectures.
          </p>

          {/* 3. Integrated Resume Upload Hub */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-10 transition-all bg-[#12151c] shadow-2xl relative group ${
                isDragging 
                  ? 'border-[#c9a84c] bg-[#181c25] scale-[1.01]' 
                  : 'border-[rgba(200,180,120,0.18)] hover:border-[#c9a84c] hover:bg-[#181c25]'
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
                <div className="w-14 h-14 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] shadow-inner group-hover:scale-105 transition-transform">
                  <Upload size={24} />
                </div>

                <div className="space-y-1">
                  <div className="text-base font-semibold text-[#f5f0e8]">
                    Drop your resume here, or <span className="text-[#e8d5a3] underline underline-offset-2">browse files</span>
                  </div>
                  <p className="text-xs text-[#8a8478]">
                    Supports PDF, DOCX, and TXT files up to 20MB
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-[#8a8478]">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>100% Client-Side Privacy Guaranteed · Zero Hallucinations</span>
                </div>
              </div>
            </div>

            {/* Quick Sample Selector */}
            <div id="samples" className="mt-6 pt-6 border-t border-[rgba(200,180,120,0.12)] space-y-3">
              <div className="text-xs font-medium text-[#8a8478] uppercase tracking-wider font-mono">
                Or test instantly with a verified sample resume:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_RESUMES.map(sample => (
                  <button
                    key={sample.id}
                    onClick={() => onSelectSample(sample)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] hover:bg-[#181c25] hover:border-[#c9a84c]/60 text-left transition-all shadow-md group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#181c25] text-[#e8d5a3] font-bold text-xs flex items-center justify-center group-hover:bg-[#c9a84c]/20 group-hover:text-[#c9a84c] transition-colors border border-[rgba(200,180,120,0.16)]">
                      {sample.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#f5f0e8] truncate group-hover:text-[#e8d5a3] transition-colors">
                        {sample.name}
                      </div>
                      <div className="text-[11px] text-[#8a8478] truncate">
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
      <section id="templates" className="py-20 px-6 bg-[#0d0f14] border-y border-[rgba(200,180,120,0.12)]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] font-mono">
                01 / Marketplace Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f0e8] tracking-tight">
                24+ genuinely distinct design architectures.
              </h2>
              <p className="text-sm sm:text-base text-[#8a8478] max-w-2xl">
                Not just color variations. Every portfolio template has its own visual identity, typography system, grid composition, and component architecture.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#12151c] border border-[rgba(200,180,120,0.12)]">
              {[
                { id: 'all', label: 'All Layouts' },
                { id: 'developer', label: 'Developer & Systems' },
                { id: 'corporate', label: 'Corporate & Editorial' },
                { id: 'creative', label: 'Design & Bento' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActivePreviewCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewCategory === cat.id
                      ? 'bg-[#181c25] text-[#e8d5a3] shadow-sm border border-[#c9a84c]/40'
                      : 'text-[#8a8478] hover:text-[#f5f0e8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rendered Template Cards Grid with Real Thumbnail Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(tpl => (
              <div 
                key={tpl.id}
                className="rounded-2xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#c9a84c]/50 hover:bg-[#181c25] transition-all flex flex-col justify-between group"
              >
                {/* Visual Architecture Preview Graphic */}
                <div className="p-3 bg-[#0d0f14] border-b border-[rgba(200,180,120,0.12)]">
                  <TemplatePreviewThumbnail 
                    templateId={tpl.id}
                    title={tpl.title}
                    badge={tpl.badge}
                    className="h-44 w-full"
                  />
                </div>

                {/* Card Details & Actions */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-[#f5f0e8] text-base group-hover:text-[#e8d5a3] transition-colors">
                        {tpl.title}
                      </h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        tpl.id === 'fullstack' 
                          ? 'text-[#e8d5a3] bg-[#c9a84c]/20 border-[#c9a84c]/40'
                          : tpl.id === 'luxury'
                            ? 'text-[#f2e6d6] bg-[#c5a880]/20 border-[#c5a880]/40'
                            : 'text-[#e8d5a3] bg-[#c9a84c]/10 border-[#c9a84c]/30'
                      }`}>
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#8a8478] leading-relaxed">
                      {tpl.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[rgba(200,180,120,0.12)] flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#8a8478]">
                      {tpl.categoryLabel}
                    </span>
                    <button
                      onClick={() => {
                        const sample = SAMPLE_RESUMES[0];
                        onSelectSample(sample);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#c9a84c] hover:text-[#e8d5a3]"
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
            <p className="text-xs text-[#8a8478]">
              Every template binds seamlessly to your verified career data. Switch templates anytime inside the editor without losing edits.
            </p>
          </div>

        </div>
      </section>

      {/* 5. How It Works (3 SaaS Steps) */}
      <section id="how-it-works" className="py-20 px-6 bg-[#0d0f14]">
        <div className="max-w-6xl mx-auto space-y-14">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] font-mono">
              02 / Streamlined Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f0e8] tracking-tight">
              From raw resume to live website in under 2 minutes.
            </h2>
            <p className="text-sm text-[#8a8478]">
              No complicated site builders, no dummy placeholder cards, and no fabricated AI text.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#12151c] border border-[rgba(200,180,120,0.14)] shadow-xl space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center font-bold text-sm text-[#c9a84c] font-mono">
                01
              </div>
              <h3 className="font-bold text-lg text-[#f5f0e8]">
                Drop Your Resume
              </h3>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Upload your PDF, DOCX, or text file. Our text cleaning engine strips PDF artifacts and standardizes complex multi-column resumes into clean sections.
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> PDF & DOCX stream processing
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#12151c] border border-[rgba(200,180,120,0.14)] shadow-xl space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center font-bold text-sm text-[#c9a84c] font-mono">
                02
              </div>
              <h3 className="font-bold text-lg text-[#f5f0e8]">
                Fact-Checked Verification
              </h3>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Review extracted experience, technical skills, projects, and coursework. Edit every single field directly in structured tables without AI hallucinations.
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> 100% editable canonical profile
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#12151c] border border-[rgba(200,180,120,0.14)] shadow-xl space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center font-bold text-sm text-[#c9a84c] font-mono">
                03
              </div>
              <h3 className="font-bold text-lg text-[#f5f0e8]">
                Publish or Export ZIP
              </h3>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Customize with our 3-panel visual editor, use the AI Copilot to polish descriptions, then publish to a live URL or export complete self-hostable code.
              </p>
              <div className="pt-2 text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Zero vendor lock-in code ZIP
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Commercial SaaS Features Grid */}
      <section id="features" className="py-20 px-6 bg-[#0d0f14] border-t border-[rgba(200,180,120,0.12)]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#c9a84c] font-mono">
              03 / Engineered For Quality
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f5f0e8] tracking-tight">
              Built like modern developer tooling, not a toy.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-base text-[#f5f0e8]">Fact Verification Engine</h4>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Our parsing model checks every extracted company, dates, and metric directly against source text to guarantee zero hallucinated claims.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center">
                <Layout size={20} />
              </div>
              <h4 className="font-bold text-base text-[#f5f0e8]">24+ Genuinely Distinct Layouts</h4>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                From Full-Stack Systems radar and Architectural Luxury to arXiv research papers and bento grids, each design has its own complete DOM composition.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h4 className="font-bold text-base text-[#f5f0e8]">Productivity AI Copilot</h4>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Context-aware headline and bullet optimizer. Compares before/after side-by-side with clear explanations before you accept any suggestion.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center">
                <Download size={20} />
              </div>
              <h4 className="font-bold text-base text-[#f5f0e8]">Clean Standalone Code Export</h4>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Download a fully structured ZIP containing semantic HTML, modular CSS, assets, and project data ready to deploy on Vercel, Netlify, or GitHub Pages.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center">
                <Laptop size={20} />
              </div>
              <h4 className="font-bold text-base text-[#f5f0e8]">3-Panel Visual Editor</h4>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Work like in Linear or Webflow. Toggle responsive Desktop, Tablet, and Mobile views in real-time with full interactive preview fidelity.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[rgba(200,180,120,0.14)] bg-[#12151c] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex items-center justify-center">
                <Terminal size={20} />
              </div>
              <h4 className="font-bold text-base text-[#f5f0e8]">High Performance & Accessible</h4>
              <p className="text-xs text-[#8a8478] leading-relaxed">
                Built with semantic HTML5, zero unnecessary JavaScript bloat, clean contrast ratios, and fast sub-second initial load speeds.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-16 px-6 bg-[#0d0f14] border-t border-[rgba(200,180,120,0.12)] text-[#f5f0e8]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to build your professional portfolio?
          </h2>
          <p className="text-[#8a8478] text-sm sm:text-base max-w-xl mx-auto">
            Upload your resume now or start with an industry sample. You will have a live, recruiter-ready website in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8b6914] to-[#c9a84c] hover:from-[#c9a84c] hover:to-[#e8d5a3] text-[#0d0f14] font-bold text-sm shadow-xl shadow-[#c9a84c]/25 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Upload size={16} />
              <span>Upload Resume (PDF / DOCX)</span>
            </button>
            <button
              onClick={onStartScratch}
              className="px-5 py-3 rounded-xl bg-[#12151c] hover:bg-[#181c25] border border-[rgba(200,180,120,0.18)] text-[#ddd8cc] hover:text-[#f5f0e8] hover:border-[#c9a84c]/50 font-medium text-sm transition-all"
            >
              Start From Scratch
            </button>
          </div>
        </div>
      </section>

      {/* 8. Professional Footer */}
      <footer className="bg-[#0d0f14] border-t border-[rgba(200,180,120,0.12)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8b6914] to-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-extrabold text-sm">
              Z
            </div>
            <span className="font-bold text-sm text-[#f5f0e8]">Zenith Portfolio Platform</span>
            <span className="text-xs text-[#8a8478]">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#8a8478]">
            <a href="#templates" className="hover:text-[#f5f0e8] transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-[#f5f0e8] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#f5f0e8] transition-colors">Features</a>
            <button onClick={onOpenSettings} className="hover:text-[#f5f0e8] transition-colors">Cloud & API Keys</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
