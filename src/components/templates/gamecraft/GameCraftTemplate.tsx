import React, { useState } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString, getInitials } from '../../../services/validation/profileSafety';
import { 
  Gamepad2, Sword, Shield, Trophy, Flame, Zap, 
  ArrowUpRight, Copy, Check, Heart, Sparkles, Star
} from 'lucide-react';
import { Github, Linkedin } from '../../shared/BrandIcons';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

export const GameCraftTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const initials = getInitials(profile.personal.name);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.personal.email) {
      navigator.clipboard.writeText(profile.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a12] text-amber-200 font-mono p-4 sm:p-8 lg:p-12 relative selection:bg-amber-500 selection:text-black">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* RPG CHARACTER STAT HEADER */}
        <header className="p-5 rounded-2xl border-2 border-amber-500/40 bg-amber-950/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-amber-950/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-bold text-lg text-amber-300">
              <Gamepad2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">{profile.personal.name}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] text-amber-300 font-bold">LVL 99 ARCHITECT</span>
              </div>
              <div className="text-xs text-amber-400/80">{profile.personal.professionalTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-rose-400"><Heart size={14} className="fill-rose-500" /> HP 100%</span>
              <span className="flex items-center gap-1 text-cyan-400"><Zap size={14} className="fill-cyan-500" /> MP 100%</span>
            </div>
            {profile.personal.email && (
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={13} /> : <Sword size={13} />}
                <span>{copied ? 'EQUIPPED' : 'INVITE TO PARTY'}</span>
              </button>
            )}
          </div>
        </header>

        {/* CHARACTER HERO STATS */}
        <section className="p-8 sm:p-12 rounded-3xl border-2 border-amber-500/30 bg-amber-950/10 space-y-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Flame size={14} /> Hero Class Lore
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
              {profile.personal.headline}
            </h1>
            <p className="text-sm text-amber-100/80 font-light leading-relaxed">
              {profile.personal.bio || profile.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-amber-500/20 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400/80 text-[10px]">MAIN WEAPON</div>
              <div className="text-white font-bold">{profile.skills.languages[0] || 'Code'}</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400/80 text-[10px]">QUESTS COMPLETED</div>
              <div className="text-white font-bold">{profile.projects.length} Boss Dungeons</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400/80 text-[10px]">GUILD FACTION</div>
              <div className="text-white font-bold">{profile.education[0]?.institution || 'Independent'}</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400/80 text-[10px]">LOCATION REALM</div>
              <div className="text-white font-bold">{profile.personal.location || 'Earth'}</div>
            </div>
          </div>
        </section>

        {/* BOSS QUESTS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase text-white flex items-center gap-2">
              <Trophy size={20} className="text-amber-400" /> Completed Quests & Boss Fights
            </h2>
            <span className="text-xs text-amber-400/80">({profile.projects.length} QUESTS)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project, idx) => (
              <div
                key={project.id || idx}
                onClick={() => onSelectProject?.(project)}
                className="cursor-pointer group p-6 rounded-2xl border-2 border-amber-500/30 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-900/30 transition-all space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    QUEST #{idx + 1}
                  </span>
                  <span className="text-amber-400 text-[10px] flex items-center gap-1 font-bold">
                    <Star size={12} className="fill-amber-400" /> +5000 EXP
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    {project.name}
                    <ArrowUpRight size={16} className="text-amber-400 group-hover:translate-x-0.5" />
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-2 font-light line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300">
                      [{t}]
                    </span>
                  ))}
                </div>

                <div className="text-[11px] text-amber-400 group-hover:underline pt-1">
                  &gt;&gt; Open Quest Logs & Architecture Spec
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INVENTORY SKILLS */}
        <section className="p-8 rounded-3xl border-2 border-amber-500/30 bg-amber-950/10 space-y-4">
          <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
            <Shield size={18} className="text-amber-400" /> Inventory Equipment & Spells
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.all.map((skill, idx) => {
              const rarity = idx % 3 === 0 ? 'Legendary' : idx % 2 === 0 ? 'Epic' : 'Rare';
              const border = rarity === 'Legendary' ? 'border-amber-400 text-amber-300' : rarity === 'Epic' ? 'border-purple-400 text-purple-300' : 'border-sky-400 text-sky-300';
              return (
                <span key={skill} className={`px-3 py-1 rounded-lg bg-black/40 border ${border} text-xs transition-transform hover:scale-105`}>
                  {skill} <span className="text-[9px] opacity-70">[{rarity}]</span>
                </span>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-amber-500/20 pt-6 text-center text-xs text-amber-500/60">
          GAME SAVED · {profile.personal.name} · GAMECRAFT RPG EDITION
        </footer>

      </div>
    </div>
  );
};
