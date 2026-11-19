import React, { useState, useEffect, useRef } from 'react';
import { CanonicalProfile, ThemeConfig, ProjectItem } from '../../../types/profile';
import { safeString } from '../../../services/validation/profileSafety';
import { Terminal, Sparkles, Folder, FileText, ArrowRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';

interface TemplateProps {
  profile: CanonicalProfile;
  theme: ThemeConfig;
  onSelectProject?: (project: ProjectItem) => void;
  isStandalone?: boolean;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalTemplate: React.FC<TemplateProps> = ({
  profile,
  theme,
  onSelectProject,
  isStandalone = false
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [themeMode, setThemeMode] = useState<'matrix' | 'amber' | 'cyan'>('matrix');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const username = (profile.personal.name.split(' ')[0] || 'dev').toLowerCase();
  const promptStr = `${username}@zenith:~$`;

  // Color schemas for terminal
  const themeColors = {
    matrix: {
      bg: '#050a05',
      text: '#4ade80',
      accent: '#22c55e',
      border: '#14532d',
      prompt: '#86efac'
    },
    amber: {
      bg: '#0a0804',
      text: '#fbbf24',
      accent: '#f59e0b',
      border: '#78350f',
      prompt: '#fde68a'
    },
    cyan: {
      bg: '#04090c',
      text: '#38bdf8',
      accent: '#0ea5e9',
      border: '#0c4a6e',
      prompt: '#bae6fd'
    }
  }[themeMode];

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const main = parts[0];
    const arg = parts[1];

    let output: React.ReactNode = null;

    switch (main) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="font-bold text-white mb-2">Available Shell Commands:</div>
            <div><span className="font-bold">whoami</span> — Display personal identity and headline</div>
            <div><span className="font-bold">cat about.md</span> — Read career background and biography</div>
            <div><span className="font-bold">ls projects</span> — List all architectural projects</div>
            <div><span className="font-bold">project [id]</span> — Inspect detailed project case study</div>
            <div><span className="font-bold">cat skills.txt</span> — Display categorized technical radar</div>
            <div><span className="font-bold">cat education.log</span> — Inspect academic degrees & distinctions</div>
            <div><span className="font-bold">contact</span> — Get direct communication channels</div>
            <div><span className="font-bold">theme [matrix|amber|cyan]</span> — Switch terminal phosphor phosphor</div>
            <div><span className="font-bold">clear</span> — Reset terminal output history</div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="p-3 rounded border border-current/20 space-y-2">
            <div className="text-base font-bold text-white">{profile.personal.name}</div>
            <div className="text-xs uppercase tracking-widest">{profile.personal.professionalTitle}</div>
            <div className="text-xs opacity-90">{profile.personal.headline}</div>
            {profile.personal.location && <div className="text-[11px] opacity-75">📍 {profile.personal.location}</div>}
          </div>
        );
        break;

      case 'cat':
        if (arg === 'about.md' || arg === 'about') {
          output = (
            <div className="space-y-2 leading-relaxed text-sm">
              <div className="font-bold">--- BIOGRAPHY & PHILOSOPHY ---</div>
              <p>{profile.personal.bio}</p>
              {profile.summary && <p className="opacity-80">{profile.summary}</p>}
            </div>
          );
        } else if (arg === 'skills.txt' || arg === 'skills') {
          output = (
            <div className="space-y-2">
              <div className="font-bold">--- TECHNICAL RADAR ---</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="font-bold">Languages:</span> {profile.skills.languages.join(', ') || 'N/A'}</div>
                <div><span className="font-bold">Frameworks:</span> {profile.skills.frameworks.join(', ') || 'N/A'}</div>
                <div><span className="font-bold">Tools/Cloud:</span> {profile.skills.tools.join(', ') || 'N/A'}</div>
                <div><span className="font-bold">AI / ML:</span> {profile.skills.aiMl.join(', ') || 'N/A'}</div>
              </div>
            </div>
          );
        } else if (arg === 'education.log' || arg === 'education') {
          output = (
            <div className="space-y-2">
              <div className="font-bold">--- ACADEMIC LOG ---</div>
              {profile.education.map((e, idx) => (
                <div key={idx} className="text-xs">
                  • {e.institution} — {e.degree} ({e.startDate} - {e.endDate}) {e.grade ? `[${e.grade}]` : ''}
                </div>
              ))}
            </div>
          );
        } else {
          output = <div className="text-red-400">File not found. Try: cat about.md, cat skills.txt, cat education.log</div>;
        }
        break;

      case 'ls':
        output = (
          <div className="space-y-3">
            <div className="font-bold">Directory: /projects</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {profile.projects.map((p, idx) => (
                <div 
                  key={idx}
                  onClick={() => onSelectProject && onSelectProject(p)}
                  className="p-2.5 rounded border border-current/20 hover:bg-white/5 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white text-xs">{idx + 1}. {p.name}</div>
                    <div className="text-[11px] opacity-75">{p.technologies.slice(0, 3).join(', ')}</div>
                  </div>
                  <Play size={12} className="opacity-75" />
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'project':
        const pIndex = parseInt(arg) - 1;
        const targetProj = profile.projects[pIndex] || profile.projects[0];
        if (targetProj) {
          if (onSelectProject) onSelectProject(targetProj);
          output = (
            <div className="p-3 rounded border border-current/30 space-y-2">
              <div className="font-bold text-white text-sm">{targetProj.name}</div>
              <p className="text-xs">{targetProj.description}</p>
              <div className="text-[11px]">Stack: {targetProj.technologies.join(' · ')}</div>
            </div>
          );
        } else {
          output = <div className="text-red-400">Project index not found. Run `ls projects` first.</div>;
        }
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs">
            <div>Email: {profile.personal.email || 'N/A'}</div>
            <div>GitHub: {profile.socialLinks.github || 'N/A'}</div>
            <div>LinkedIn: {profile.socialLinks.linkedin || 'N/A'}</div>
          </div>
        );
        break;

      case 'theme':
        if (arg === 'matrix' || arg === 'amber' || arg === 'cyan') {
          setThemeMode(arg);
          output = <div>Terminal phosphor switched to {arg}.</div>;
        } else {
          output = <div>Usage: theme [matrix | amber | cyan]</div>;
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = <div className="text-red-400">Command not recognized: "{cmd}". Type <span className="underline font-bold">help</span> to list commands.</div>;
    }

    setHistory(prev => [...prev, { command: cmd, output, timestamp: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    // Initial welcome banner
    handleCommand('whoami');
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <div 
      className="min-h-screen font-mono p-4 sm:p-8 transition-colors duration-300 flex flex-col justify-center items-center"
      style={{ backgroundColor: themeColors.bg, color: themeColors.text }}
    >
      <div 
        className="w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col h-[85vh]"
        style={{ borderColor: themeColors.border, backgroundColor: themeColors.bg }}
      >
        {/* Terminal Titlebar */}
        <div 
          className="px-4 py-3 border-b flex items-center justify-between text-xs"
          style={{ borderColor: themeColors.border, backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-bold tracking-wider opacity-80">{username}@zenith-os v2.4 (x86_64-apple-darwin)</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setThemeMode('matrix')}
              className={`px-2 py-0.5 rounded text-[10px] ${themeMode === 'matrix' ? 'bg-green-500/20 text-green-400 border border-green-500' : 'opacity-60'}`}
            >
              Matrix
            </button>
            <button 
              onClick={() => setThemeMode('amber')}
              className={`px-2 py-0.5 rounded text-[10px] ${themeMode === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500' : 'opacity-60'}`}
            >
              Amber
            </button>
            <button 
              onClick={() => setThemeMode('cyan')}
              className={`px-2 py-0.5 rounded text-[10px] ${themeMode === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500' : 'opacity-60'}`}
            >
              Cyan
            </button>
          </div>
        </div>

        {/* Interactive Command Quick-Buttons */}
        <div 
          className="p-2.5 border-b flex flex-wrap items-center gap-2 text-xs overflow-x-auto"
          style={{ borderColor: themeColors.border, backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <span className="text-[11px] opacity-60 mr-1">Quick Run:</span>
          {['whoami', 'cat about.md', 'ls projects', 'cat skills.txt', 'cat education.log', 'contact', 'help'].map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-current/20 text-[11px] transition-all flex items-center gap-1"
            >
              <Play size={10} /> {cmd}
            </button>
          ))}
          <button
            onClick={() => setHistory([])}
            className="ml-auto px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-[11px] text-red-400 flex items-center gap-1"
          >
            <RotateCcw size={10} /> clear
          </button>
        </div>

        {/* Terminal Logs & Output Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
          <div className="opacity-70 text-xs border-b border-current/20 pb-3">
            Type <span className="font-bold underline">help</span> to list all interactive commands or click the buttons above.
          </div>

          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 font-bold" style={{ color: themeColors.prompt }}>
                <span>{promptStr}</span>
                <span className="text-white">{item.command}</span>
                <span className="text-[10px] opacity-40 ml-auto font-normal">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-current/30">
                {item.output}
              </div>
            </div>
          ))}

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Line */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 border-t flex items-center gap-3"
          style={{ borderColor: themeColors.border, backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <span className="font-bold text-sm" style={{ color: themeColors.prompt }}>{promptStr}</span>
          <input 
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-white focus:ring-0 placeholder:text-current/40"
            autoFocus
          />
          <button 
            type="submit"
            className="px-4 py-1.5 rounded text-xs font-bold text-black shadow"
            style={{ backgroundColor: themeColors.accent }}
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
};
