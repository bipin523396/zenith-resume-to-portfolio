import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, TemplateType } from './types/profile';
import { LandingView } from './components/landing/LandingView';
import { AnalyzingView } from './components/landing/AnalyzingView';
import { VerificationView } from './components/verification/VerificationView';
import { EditorView } from './components/editor/EditorView';
import { PublishedLiveSite } from './components/shared/PublishedLiveSite';
import { PublishModal } from './components/shared/PublishModal';
import { SettingsModal } from './components/shared/SettingsModal';
import { processResumeFile } from './services/parser/documentProcessor';
import { parseResumeWithCerebras, parseResumeHeuristic } from './services/ai/cerebras';
import { validateExtractedProfile, ValidationReport } from './services/validation/aiValidator';
import { DEFAULT_THEME_CONFIG } from './utils/themeEngine';
import { SampleResume } from './services/parser/sampleResumes';
import { COMPREHENSIVE_TEST_RESUME } from './services/parser/testResumeData';
import { generatePortfolioZip } from './utils/zipExporter';
import { getPortfolioFromSupabase } from './services/supabase/portfolioService';

type AppView = 'landing' | 'analyzing' | 'verification' | 'editor' | 'live';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [activeProfile, setActiveProfile] = useState<CanonicalProfile | null>(null);
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);

  // Analyzing state
  const [analyzingFilename, setAnalyzingFilename] = useState('');
  const [pipelineStep, setPipelineStep] = useState(1);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  // Modals & Async Loading
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isLoadingCloudPortfolio, setIsLoadingCloudPortfolio] = useState(false);

  // Auto-route on load if public portfolio URL or test param is requested
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const portfolioSlug = params.get('portfolio');
      const templateParam = params.get('template') as TemplateType | null;
      const testParam = params.get('test');

      if (portfolioSlug) {
        setIsLoadingCloudPortfolio(true);

        getPortfolioFromSupabase(portfolioSlug).then(cloudPortfolio => {
          if (cloudPortfolio) {
            setActiveProfile(cloudPortfolio.profile);
            setActiveTheme(cloudPortfolio.theme || DEFAULT_THEME_CONFIG);
            setCurrentView('live');
            setIsLoadingCloudPortfolio(false);
            return;
          }

          // Fallback to local storage
          const stored = localStorage.getItem(`zenith_published_${portfolioSlug}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.profile) {
              setActiveProfile(parsed.profile);
              setActiveTheme(parsed.theme || DEFAULT_THEME_CONFIG);
              setCurrentView('live');
              setIsLoadingCloudPortfolio(false);
              return;
            }
          }
          
          // Fallback for sample / direct preview slugs
          setActiveProfile(COMPREHENSIVE_TEST_RESUME);
          if (templateParam) {
            setActiveTheme(prev => ({ ...prev, templateId: templateParam }));
          }
          setCurrentView('live');
          setIsLoadingCloudPortfolio(false);
        }).catch(err => {
          console.warn('Error loading cloud portfolio, falling back to local:', err);
          const stored = localStorage.getItem(`zenith_published_${portfolioSlug}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.profile) {
              setActiveProfile(parsed.profile);
              setActiveTheme(parsed.theme || DEFAULT_THEME_CONFIG);
              setCurrentView('live');
              setIsLoadingCloudPortfolio(false);
              return;
            }
          }
          setActiveProfile(COMPREHENSIVE_TEST_RESUME);
          if (templateParam) {
            setActiveTheme(prev => ({ ...prev, templateId: templateParam }));
          }
          setCurrentView('live');
          setIsLoadingCloudPortfolio(false);
        });

        return;
      }

      if (testParam === 'true') {
        setActiveProfile(COMPREHENSIVE_TEST_RESUME);
        if (templateParam) {
          setActiveTheme(prev => ({ ...prev, templateId: templateParam }));
        }
        setCurrentView('editor');
      }
    } catch (e) {
      console.error('URL route initialization error', e);
    }
  }, []);

  // Pipeline Execution
  const runResumePipeline = async (rawText: string, filename: string) => {
    setAnalyzingFilename(filename);
    setCurrentView('analyzing');
    setPipelineStep(1);
    setPipelineProgress(15);
    setPipelineLogs([`Reading document stream from ${filename}...`]);

    try {
      // Step 2: Cleaning
      await new Promise(r => setTimeout(r, 450));
      setPipelineStep(2);
      setPipelineProgress(40);
      setPipelineLogs(prev => [
        ...prev,
        'Running text cleaning layer: Stripping PDF artifacts, repairing line wraps, standardizing sections...'
      ]);

      // Step 3: Cerebras LLM Extraction
      await new Promise(r => setTimeout(r, 550));
      setPipelineStep(3);
      setPipelineProgress(70);
      setPipelineLogs(prev => [
        ...prev,
        'Sending sanitized text to Cerebras Ultra-Fast LLM for Canonical Profile synthesis...'
      ]);

      const extractedProfile = await parseResumeWithCerebras(rawText);

      // Step 4: AI Validation Layer
      setPipelineStep(4);
      setPipelineProgress(92);
      setPipelineLogs(prev => [
        ...prev,
        'Executing AI Verification Layer: Cross-referencing extracted facts vs source text & computing confidence...'
      ]);

      const report = validateExtractedProfile(extractedProfile, rawText);
      setValidationReport(report);

      await new Promise(r => setTimeout(r, 500));
      setPipelineProgress(100);
      setPipelineLogs(prev => [...prev, '✓ Extraction complete! Canonical JSON Profile prepared.']);

      setActiveProfile(extractedProfile);
      setCurrentView('verification');
    } catch (error) {
      console.error('Extraction pipeline encountered an issue, falling back to intelligent heuristic parser', error);
      const fallbackProfile = parseResumeHeuristic(rawText);
      const report = validateExtractedProfile(fallbackProfile, rawText);
      setValidationReport(report);
      setActiveProfile(fallbackProfile);
      setCurrentView('verification');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const doc = await processResumeFile(file);
      await runResumePipeline(doc.cleaned.cleanText, file.name);
    } catch (e) {
      console.error('File processing error', e);
      alert('Could not read resume file. Please ensure it is a valid PDF, DOCX, or TXT file.');
    }
  };

  const handleSelectSample = async (sample: SampleResume) => {
    await runResumePipeline(sample.rawText, `${sample.name}_Resume.pdf`);
  };

  const handleStartScratch = () => {
    const emptyProfile: CanonicalProfile = {
      personal: {
        name: 'Alex Morgan',
        professionalTitle: 'Software Engineer & Architect',
        headline: 'Building intelligent, resilient, and scalable digital platforms.',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'https://alexmorgan.dev',
        profileImage: null,
        bio: 'Full-stack software engineer with a passion for high-performance computing, clean architecture, and intuitive user experiences.',
        openToWork: true
      },
      summary: 'Full-stack software engineer with a passion for high-performance computing.',
      education: [
        {
          id: 'edu_1',
          institution: 'University of Technology',
          degree: 'B.S. in Computer Science',
          startDate: '2021',
          endDate: '2025',
          grade: '3.8 GPA'
        }
      ],
      experience: [
        {
          id: 'exp_1',
          company: 'Acme Systems',
          role: 'Software Engineer',
          startDate: '2024',
          endDate: 'Present',
          current: true,
          description: 'Architected distributed web applications and optimized real-time API latency.',
          highlights: ['Improved throughput by 35%', 'Engineered TypeScript microservices'],
          technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
        }
      ],
      projects: [
        {
          id: 'proj_1',
          slug: 'neural-sync-engine',
          name: 'NeuralSync Real-Time Engine',
          tagline: 'Ultra-low latency streaming architecture',
          description: 'Designed a high-throughput event processing platform with WebSockets and Redis pub/sub.',
          technologies: ['TypeScript', 'Node.js', 'Redis', 'React'],
          startDate: '2025',
          featured: true
        }
      ],
      skills: {
        languages: ['TypeScript', 'Python', 'Go', 'SQL'],
        frameworks: ['React', 'Next.js', 'Node.js', 'FastAPI'],
        tools: ['Docker', 'PostgreSQL', 'Redis', 'Git'],
        aiMl: ['PyTorch', 'Machine Learning'],
        all: ['TypeScript', 'Python', 'Go', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis']
      },
      certifications: [],
      achievements: [
        {
          id: 'ach_1',
          title: 'National Hackathon Champion',
          description: 'Built an emergency broadcast platform in 24 hours',
          date: '2024'
        }
      ],
      hackathons: [],
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com'
      }
    };

    setActiveProfile(emptyProfile);
    setValidationReport({
      isValid: true,
      totalFieldsChecked: 15,
      verifiedFieldsCount: 15,
      flaggedIssuesCount: 0,
      overallConfidence: 1.0,
      issues: []
    });
    setCurrentView('verification');
  };

  const handleVerificationConfirm = (verifiedProfile: CanonicalProfile, chosenTemplate: TemplateType) => {
    setActiveProfile(verifiedProfile);
    setActiveTheme(prev => ({ ...prev, templateId: chosenTemplate }));
    setCurrentView('editor');
  };

  const handleDownloadZip = async (profile: CanonicalProfile, theme: ThemeConfig) => {
    try {
      const blob = await generatePortfolioZip(profile, theme);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${profile.personal.name.toLowerCase().replace(/\s+/g, '_')}_portfolio.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ZIP download error', e);
      alert('Could not package ZIP. Please check browser permissions.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#ddd8cc] font-sans antialiased selection:bg-[#c9a84c] selection:text-[#0d0f14]">
      
      {/* Cloud Loading Screen for Public Portfolios */}
      {isLoadingCloudPortfolio && (
        <div className="fixed inset-0 z-50 bg-[#0d0f14]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-[#12151c] border border-[#c9a84c]/30 flex items-center justify-center shadow-lg mb-4">
            <span className="w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-base font-bold text-[#f5f0e8] mb-1">Loading Live Portfolio</h2>
          <p className="text-xs text-[#8a8478] max-w-xs">
            Fetching verified profile, theme configuration, and interactive projects from the cloud...
          </p>
        </div>
      )}

      {/* 1. Landing View */}
      {currentView === 'landing' && (
        <LandingView
          onFileUpload={handleFileUpload}
          onSelectSample={handleSelectSample}
          onStartScratch={handleStartScratch}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* 2. Analyzing View */}
      {currentView === 'analyzing' && (
        <AnalyzingView
          filename={analyzingFilename}
          step={pipelineStep}
          progress={pipelineProgress}
          logMessages={pipelineLogs}
        />
      )}

      {/* 3. Verification View */}
      {currentView === 'verification' && activeProfile && validationReport && (
        <VerificationView
          initialProfile={activeProfile}
          validationReport={validationReport}
          onConfirm={handleVerificationConfirm}
          onBackToUpload={() => setCurrentView('landing')}
        />
      )}

      {/* 4. Visual Editor View */}
      {currentView === 'editor' && activeProfile && (
        <EditorView
          initialProfile={activeProfile}
          initialTheme={activeTheme}
          onPublish={(p, t) => {
            setActiveProfile(p);
            setActiveTheme(t);
            setIsPublishModalOpen(true);
          }}
          onDownloadZip={handleDownloadZip}
          onBackToVerification={() => setCurrentView('verification')}
        />
      )}

      {/* 5. Published Live Site Mode */}
      {currentView === 'live' && activeProfile && (
        <PublishedLiveSite
          profile={activeProfile}
          theme={activeTheme}
          onBackToEditor={() => setCurrentView('editor')}
        />
      )}

      {/* Publish Modal */}
      {isPublishModalOpen && activeProfile && (
        <PublishModal
          profile={activeProfile}
          theme={activeTheme}
          onClose={() => setIsPublishModalOpen(false)}
          onOpenLiveSite={() => {
            setIsPublishModalOpen(false);
            setCurrentView('live');
          }}
          onDownloadZip={() => handleDownloadZip(activeProfile, activeTheme)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}

    </div>
  );
};
