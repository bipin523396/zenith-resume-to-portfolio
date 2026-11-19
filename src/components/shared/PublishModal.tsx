import React, { useState, useEffect } from 'react';
import { CanonicalProfile, ThemeConfig } from '../../types/profile';
import { safeProfile } from '../../services/validation/profileSafety';
import { 
  savePortfolioToSupabase, 
  unpublishPortfolioFromSupabase 
} from '../../services/supabase/portfolioService';
import { isSupabaseConfigured } from '../../services/supabase/supabaseClient';
import { 
  X, Globe, Check, Copy, ExternalLink, ShieldCheck, 
  Download, Eye, Share2, CheckCircle2, RefreshCw, Trash2, Database, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PublishModalProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onClose: () => void;
  onOpenLiveSite: () => void;
  onDownloadZip: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  profile,
  theme,
  onClose,
  onOpenLiveSite,
  onDownloadZip
}) => {
  const safe = safeProfile(profile);
  const slug = safe.personal.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'portfolio';
  
  // Real working direct URL and vanity URL
  const publicShareUrl = `${window.location.origin}/?portfolio=${slug}`;
  const vanityUrl = `https://${slug}.zenithstack.app`;

  const [copied, setCopied] = useState(false);
  const [copiedVanity, setCopiedVanity] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [customTitle, setCustomTitle] = useState(`${safe.personal.name} — ${safe.personal.professionalTitle || 'Portfolio'}`);
  const [isUnpublished, setIsUnpublished] = useState(false);
  
  // Cloud Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<{
    synced: boolean;
    configured: boolean;
    message: string;
  }>({
    synced: false,
    configured: isSupabaseConfigured(),
    message: isSupabaseConfigured() ? 'Syncing to Supabase Cloud...' : 'Local storage only'
  });

  // Persist to localStorage & Supabase upon publish
  useEffect(() => {
    let isMounted = true;

    const publishFlow = async () => {
      // 1. Local storage persistence (instant)
      try {
        const payload = {
          slug,
          profile,
          theme,
          customTitle,
          isPublic: true,
          publishedAt: new Date().toISOString()
        };
        localStorage.setItem(`zenith_published_${slug}`, JSON.stringify(payload));
        localStorage.setItem('zenith_latest_published_slug', slug);

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 }
        });
      } catch (e) {
        console.error('Local persistence error', e);
      }

      // 2. Supabase Cloud Sync
      if (isSupabaseConfigured()) {
        setIsSyncing(true);
        try {
          const res = await savePortfolioToSupabase({
            slug,
            profile,
            theme,
            customTitle,
            isPublic: true
          });

          if (isMounted) {
            setCloudStatus({
              synced: res.cloudSynced,
              configured: true,
              message: res.cloudSynced 
                ? 'Cloud Synced with Supabase (Globally accessible on any device)' 
                : (res.error || res.message)
            });
          }
        } catch (err: any) {
          if (isMounted) {
            setCloudStatus({
              synced: false,
              configured: true,
              message: err?.message || 'Failed to sync with Supabase'
            });
          }
        } finally {
          if (isMounted) setIsSyncing(false);
        }
      } else {
        setCloudStatus({
          synced: false,
          configured: false,
          message: 'Saved to local browser. Configure Supabase in Settings for global cloud access.'
        });
      }
    };

    publishFlow();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnpublish = async () => {
    if (window.confirm('Are you sure you want to unpublish this portfolio? The public link will become inactive.')) {
      localStorage.removeItem(`zenith_published_${slug}`);
      setIsUnpublished(true);
      await unpublishPortfolioFromSupabase(slug);
    }
  };

  const handleRepublish = async () => {
    const payload = {
      slug,
      profile,
      theme,
      customTitle,
      isPublic: true,
      publishedAt: new Date().toISOString()
    };
    localStorage.setItem(`zenith_published_${slug}`, JSON.stringify(payload));
    setIsUnpublished(false);
    confetti({ particleCount: 50, spread: 60 });

    if (isSupabaseConfigured()) {
      setIsSyncing(true);
      const res = await savePortfolioToSupabase({
        slug,
        profile,
        theme,
        customTitle,
        isPublic: true
      });
      setIsSyncing(false);
      setCloudStatus({
        synced: res.cloudSynced,
        configured: true,
        message: res.cloudSynced ? 'Cloud Synced with Supabase' : res.message
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn font-sans selection:bg-[#c9a84c] selection:text-[#0d0f14]">
      <div 
        className="w-full max-w-lg rounded-2xl border border-[rgba(200,180,120,0.18)] bg-[#12151c] text-[#ddd8cc] shadow-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(200,180,120,0.14)] pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isUnpublished ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20'
            }`}>
              <Globe size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#f5f0e8]">
                {isUnpublished ? 'Portfolio Unpublished' : 'Portfolio is Live!'}
              </h2>
              <div className="text-xs text-[#8a8478]">
                {isUnpublished ? 'Public access is currently suspended' : 'Accessible worldwide via custom URL'}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#8a8478] hover:text-[#f5f0e8] hover:bg-[#181c25] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live URL Box */}
        {!isUnpublished ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#ddd8cc]">Public Live Website URL</label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={publicShareUrl}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0d0f14] border border-[rgba(200,180,120,0.18)] text-xs font-mono text-[#f5f0e8] select-all focus:outline-none focus:border-[#c9a84c]"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#8b6914] to-[#c9a84c] hover:brightness-110 text-[#0d0f14] text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#c9a84c]/20"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Cloud Persistence Status Card */}
            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
              cloudStatus.synced 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : cloudStatus.configured 
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                  : 'bg-[#181c25] border-[rgba(200,180,120,0.14)] text-[#ddd8cc]'
            }`}>
              <div className="flex items-center gap-2">
                {isSyncing ? (
                  <RefreshCw size={14} className="text-[#c9a84c] animate-spin" />
                ) : cloudStatus.synced ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/30" />
                ) : (
                  <Database size={14} className="text-[#8a8478]" />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-[11px] text-[#f5f0e8]">
                    {cloudStatus.synced ? 'Supabase Cloud Database' : 'Storage Mode'}
                  </span>
                  <span className="text-[11px] opacity-80 text-[#8a8478]">
                    {cloudStatus.message}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenLiveSite}
                className="text-xs font-semibold text-[#c9a84c] hover:underline flex items-center gap-1 shrink-0 ml-2"
              >
                <span>Open Website</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-2">
            <p>Your portfolio has been removed from public access. Only local drafts exist in your browser.</p>
            <button
              onClick={handleRepublish}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#8b6914] to-[#c9a84c] text-[#0d0f14] font-bold text-xs transition-colors"
            >
              Re-Publish Website
            </button>
          </div>
        )}

        {/* Actions Grid */}
        <div className="pt-2 border-t border-[rgba(200,180,120,0.14)] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onDownloadZip}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#8a8478] hover:text-[#f5f0e8] transition-colors"
          >
            <Download size={13} />
            <span>Download Standalone ZIP</span>
          </button>

          <div className="flex items-center gap-2">
            {!isUnpublished && (
              <button
                onClick={handleUnpublish}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors"
              >
                Unpublish
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#181c25] hover:bg-[#1f2430] border border-[rgba(200,180,120,0.18)] text-[#f5f0e8] text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
