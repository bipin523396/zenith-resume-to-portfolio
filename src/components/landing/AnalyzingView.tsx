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
    <div className="min-h-screen bg-[#0d0f14] text-[#ddd8cc] flex flex-col items-center justify-center p-6 selection:bg-[#c9a84c] selection:text-[#0d0f14] font-sans">
      
      <div className="w-full max-w-xl space-y-6 text-center">
        
        {/* Processing Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#12151c] border border-[#c9a84c]/30 shadow-xl flex items-center justify-center text-[#c9a84c] mx-auto shadow-[#c9a84c]/15">
          <Loader2 size={28} className="animate-spin text-[#c9a84c]" />
        </div>

        {/* Title & Document Badge */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f5f0e8] tracking-tight">
            Synthesizing Your Career Profile
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c25] border border-[rgba(200,180,120,0.18)] text-xs font-medium text-[#8a8478] font-mono">
            <FileText size={13} className="text-[#c9a84c]" />
            <span className="font-semibold text-[#f5f0e8]">{filename || 'resume_document.pdf'}</span>
          </div>
        </div>

        {/* SaaS Progress Bar */}
        <div className="p-6 rounded-2xl bg-[#12151c] border border-[rgba(200,180,120,0.14)] shadow-2xl space-y-5 text-left">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#f5f0e8] font-mono">
              <span>Extraction Pipeline Progress</span>
              <span className="text-[#e8d5a3] font-bold">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-[#0d0f14] overflow-hidden border border-[rgba(200,180,120,0.1)]">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-[#8b6914] via-[#c9a84c] to-[#e8d5a3] transition-all duration-300 ease-out shadow-sm shadow-[#c9a84c]/30"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-3 pt-2 border-t border-[rgba(200,180,120,0.12)]">
            {steps.map((s, idx) => {
              const stepNum = idx + 1;
              const isDone = step > stepNum;
              const isCurrent = step === stepNum;

              return (
                <div 
                  key={idx}
                  className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                    isCurrent 
                      ? 'bg-[#c9a84c]/10 border border-[#c9a84c]/30' 
                      : isDone 
                        ? 'bg-[#181c25] border border-transparent' 
                        : 'opacity-40'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isDone ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 size={18} className="text-[#c9a84c] animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#f5f0e8] flex items-center justify-between">
                      <span>{s.title}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#c9a84c]/20 text-[#e8d5a3] border border-[#c9a84c]/30 font-mono">
                          Active
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[10px] font-semibold text-emerald-400 font-mono">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8a8478] mt-0.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Pipeline Terminal Output */}
          <div className="p-3 rounded-xl bg-[#0d0f14] border border-[rgba(200,180,120,0.14)] space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-slate-400 pb-1 border-b border-[rgba(200,180,120,0.1)]">
              <Terminal size={12} className="text-[#c9a84c]" />
              <span className="font-semibold text-[#f5f0e8]">Live Synthesis Telemetry</span>
            </div>
            
            <div className="space-y-0.5 max-h-24 overflow-y-auto text-[#8a8478]">
              {logMessages.length === 0 ? (
                <div className="text-slate-500">Initializing document stream...</div>
              ) : (
                logMessages.map((msg, i) => (
                  <div key={i} className="leading-tight truncate">
                    <span className="text-[#c9a84c]">&gt;</span> {msg}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#8a8478]">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Local client processing · Isolated execution</span>
        </div>

      </div>

    </div>
  );
};
