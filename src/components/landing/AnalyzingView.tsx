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
    <div className="min-h-screen bg-[#F5F7FA] text-[#172033] flex flex-col items-center justify-center p-6 selection:bg-blue-600 selection:text-white font-sans">
      
      <div className="w-full max-w-xl space-y-6 text-center">
        
        {/* Processing Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#2563EB] mx-auto">
          <Loader2 size={28} className="animate-spin text-[#2563EB]" />
        </div>

        {/* Title & Document Badge */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] tracking-tight">
            Synthesizing Your Career Profile
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-[#E2E8F0] text-xs font-medium text-[#64748B]">
            <FileText size={13} className="text-[#2563EB]" />
            <span className="font-semibold text-[#172033]">{filename || 'resume_document.pdf'}</span>
          </div>
        </div>

        {/* SaaS Progress Bar */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-5 text-left">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#14213D]">
              <span>Extraction Pipeline Progress</span>
              <span className="text-[#2563EB] font-bold">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#2563EB] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
            {steps.map((s, idx) => {
              const stepNum = idx + 1;
              const isDone = step > stepNum;
              const isCurrent = step === stepNum;

              return (
                <div 
                  key={idx}
                  className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                    isCurrent 
                      ? 'bg-blue-50/70 border border-blue-200' 
                      : isDone 
                        ? 'bg-slate-50 border border-transparent' 
                        : 'opacity-40'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isDone ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 size={18} className="text-[#2563EB] animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#14213D] flex items-center justify-between">
                      <span>{s.title}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                          Active
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[10px] font-semibold text-emerald-700">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Realtime Terminal Console Output */}
        {logMessages.length > 0 && (
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0F172A] text-left font-mono text-[11px] text-slate-300 space-y-1.5 max-h-32 overflow-y-auto shadow-inner">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-1 pb-1 border-b border-slate-800">
              <Terminal size={11} className="text-blue-400" />
              <span>Realtime Parser Telemetry</span>
            </div>
            {logMessages.map((msg, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300 leading-snug">
                <span className="text-blue-400 select-none">❯</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-[#64748B] flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Strict fact extraction — no fabricated achievements or experiences</span>
        </div>

      </div>

    </div>
  );
};
