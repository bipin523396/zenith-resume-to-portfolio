import React, { useState, useEffect } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../types/profile';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Sparkles, Edit3, ArrowLeft, Share2, Check } from 'lucide-react';

interface PublishedLiveSiteProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onBackToEditor: () => void;
}

export const PublishedLiveSite: React.FC<PublishedLiveSiteProps> = ({
  profile,
  theme,
  onBackToEditor
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Set document title and SEO meta dynamically
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${profile.personal.name} — ${profile.personal.professionalTitle || 'Portfolio'}`;

    // Update or add meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', profile.personal.headline || profile.summary || '');

    return () => {
      document.title = originalTitle;
    };
  }, [profile]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative">
      
      {/* The Pure Clean Portfolio Website */}
      <TemplateRenderer 
        profile={profile} 
        theme={theme} 
        onSelectProject={proj => setSelectedProject(proj)} 
        isStandalone={true}
      />

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={handleShare}
          className="px-3.5 py-2 rounded-full bg-[#0d0f18]/90 hover:bg-[#151928] border border-white/20 text-white text-xs font-mono font-medium shadow-2xl backdrop-blur-md flex items-center gap-1.5 transition-all transform hover:scale-105"
          title="Copy Public Link"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} className="text-purple-400" />}
          <span>{copied ? 'Copied Link' : 'Share'}</span>
        </button>

        <button
          onClick={onBackToEditor}
          className="px-4 py-2 rounded-full bg-[#0d0f18]/90 hover:bg-[#151928] border border-white/20 text-white text-xs font-mono font-medium shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Edit3 size={14} className="text-purple-400" />
          <span>Edit in Zenith</span>
        </button>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectDetailModal 
        project={selectedProject}
        theme={theme}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};
