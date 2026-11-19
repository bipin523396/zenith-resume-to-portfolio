import React from 'react';
import { Cpu, CheckCircle2, Loader2, FileText, ShieldCheck, Terminal } from 'lucide-react';

interface AnalyzingViewProps {
  filename: string;
  step: number; // 1 to 4
  progress: number; // 0 to 100
  logMessages: string[];
}

export const AnalyzingView: React.FC<AnalyzingViewProps> = ({
  filename,
  step,
  progress,
  logMessages
}) => {
  const steps = [
    { title: 'Document Ingestion', desc: 'Parsing PDF text layers, formatting, and structural data' },
    { title: 'Sanitization & Structure', desc: 'Stripping layout artifacts, standardizing sections and dates' },
    { title: 'LLM Canonical Extraction', desc: 'Synthesizing verified Career Profile with strict anti-hallucination rules' },
    { title: 'Fact Verification Layer', desc: 'Cross-verifying dates, metrics, and computing fact confidence scores' }
  ];

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] flex flex-col items-center justify-center p-6 selection:bg-blue-600 selection:text-white font-sans">
      
      <div className="w-full max-w-xl space-y-6 text-center">
        
        {/* Processing Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#11141E] border border-blue-500/30 shadow-xl flex items-center justify-center text-[#3B82F6] mx-auto">
          <Loader2 size={28} className="animate-spin text-[#3B82F6]" />
        </div>

        {/* Title & Document Badge */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Synthesizing Your Career Profile
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141926] border border-[#22283A] text-xs font-medium text-[#94A3B8]">
            <FileText size={13} className="text-[#3B82F6]" />
            <span className="font-semibold text-white">{filename || 'resume_document.pdf'}</span>
          </div>
        </div>

        {/* SaaS Progress Bar */}
        <div className="p-6 rounded-2xl bg-[#11141E] border border-[#1E2330] shadow-2xl space-y-5 text-left">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-white">
              <span>Extraction Pipeline Progress</span>
              <span className="text-[#3B82F6] font-bold">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-[#181C28] overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-3 pt-2 border-t border-[#1E2330]">
            {steps.map((s, idx) => {
              const stepNum = idx + 1;
              const isDone = step > stepNum;
              const isCurrent = step === stepNum;

              return (
                <div 
                  key={idx}
                  className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                    isCurrent 
                      ? 'bg-blue-500/10 border border-blue-500/30' 
                      : isDone 
                        ? 'bg-[#141824] border border-transparent' 
                        : 'opacity-40'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isDone ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 size={18} className="text-[#3B82F6] animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{s.title}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Active
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[10px] font-semibold text-emerald-400">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Pipeline Terminal Output */}
          <div className="p-3 rounded-xl bg-[#090A0F] border border-[#1E2330] space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-slate-400 pb-1 border-b border-[#1E2330]">
              <Terminal size={12} className="text-[#3B82F6]" />
              <span className="font-semibold text-slate-300">Live Synthesis Telemetry</span>
            </div>
            
            <div className="space-y-0.5 max-h-24 overflow-y-auto text-[#94A3B8]">
              {logMessages.length === 0 ? (
                <div className="text-slate-500">Initializing document stream...</div>
              ) : (
                logMessages.map((msg, i) => (
                  <div key={i} className="leading-tight truncate">
                    <span className="text-blue-400">&gt;</span> {msg}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#94A3B8]">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Local client processing · Isolated execution</span>
        </div>

      </div>

    </div>
  );
};
