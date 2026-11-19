import React, { useState, useEffect } from 'react';
import { getApiKeys, saveApiKeys, ApiKeysConfig } from '../../services/ai/keys';
import { testSupabaseConnection, isSupabaseConfigured } from '../../services/supabase/supabaseClient';
import { 
  X, Key, ShieldCheck, Check, Cpu, Sparkles, Globe, 
  Database, RefreshCw, AlertCircle, Copy, ChevronDown, ChevronUp, ExternalLink 
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

const SUPABASE_SCHEMA_SQL = `-- 1. Create portfolios table
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  custom_title text,
  profile jsonb not null,
  theme jsonb not null,
  is_public boolean not null default true,
  view_count integer not null default 0,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Indexes
create index if not exists portfolios_slug_idx on public.portfolios (slug);
create index if not exists portfolios_is_public_idx on public.portfolios (is_public);

-- 3. Row Level Security (RLS)
alter table public.portfolios enable row level security;
create policy "Allow public read access to active portfolios"
  on public.portfolios for select using (is_public = true);
create policy "Allow insert or upsert portfolios"
  on public.portfolios for insert with check (true);
create policy "Allow portfolio updates"
  on public.portfolios for update using (true) with check (true);

-- 4. Atomic view counter
create or replace function public.increment_portfolio_views(portfolio_slug text)
returns void as $$
begin
  update public.portfolios
  set view_count = coalesce(view_count, 0) + 1
  where slug = portfolio_slug;
end;
$$ language plpgsql security definer;`;

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [keys, setKeys] = useState<ApiKeysConfig>(() => getApiKeys());
  const [saved, setSaved] = useState(false);
  
  // Supabase Testing State
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    tested: boolean;
    success?: boolean;
    message?: string;
  }>({ tested: false });
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiKeys(keys);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleTestSupabase = async () => {
    // Save current values first so client reads them
    saveApiKeys(keys);
    setTestingSupabase(true);
    setSupabaseStatus({ tested: false });

    try {
      const result = await testSupabaseConnection();
      setSupabaseStatus({
        tested: true,
        success: result.success,
        message: result.message
      });
    } catch (err: any) {
      setSupabaseStatus({
        tested: true,
        success: false,
        message: err?.message || 'Connection failed'
      });
    } finally {
      setTestingSupabase(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const isConfigured = Boolean(keys.supabaseUrl && keys.supabaseAnonKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn font-sans">
      <div 
        className="w-full max-w-2xl rounded-2xl border border-[#E2E8F0] bg-white text-[#172033] shadow-xl p-6 sm:p-7 space-y-6 relative overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200">
              <Database size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#14213D]">Cloud Database & API Credentials</h2>
              <div className="text-xs text-[#64748B]">Connect Supabase to host portfolios globally across devices</div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-[#172033] hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 overflow-y-auto pr-1 flex-1">

          {/* ================= SUPABASE SECTION ================= */}
          <div className="p-4 rounded-xl bg-slate-50 border border-blue-100 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-[#2563EB]" />
                <span className="text-xs font-bold text-[#14213D] uppercase tracking-wide">
                  Supabase Cloud Connection
                </span>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                isConfigured 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {isConfigured ? 'Configured' : 'Not Connected'}
              </span>
            </div>

            <p className="text-xs text-[#64748B]">
              Publishes portfolios to your Supabase PostgreSQL cloud database, making shared links accessible worldwide on any device.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1">
                  Supabase Project URL
                </label>
                <input 
                  type="text"
                  value={keys.supabaseUrl || ''}
                  onChange={e => setKeys(prev => ({ ...prev, supabaseUrl: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] font-mono text-xs focus:outline-none focus:border-[#2563EB]"
                  placeholder="https://your-project-id.supabase.co"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#14213D] mb-1">
                  Supabase Anon Public API Key
                </label>
                <input 
                  type="password"
                  value={keys.supabaseAnonKey || ''}
                  onChange={e => setKeys(prev => ({ ...prev, supabaseAnonKey: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] font-mono text-xs focus:outline-none focus:border-[#2563EB]"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                />
              </div>
            </div>

            {/* Test Connection Button & Status */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={testingSupabase || !keys.supabaseUrl || !keys.supabaseAnonKey}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-slate-100 disabled:opacity-50 text-xs font-semibold text-[#172033] flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw size={12} className={testingSupabase ? 'animate-spin text-[#2563EB]' : 'text-slate-600'} />
                <span>{testingSupabase ? 'Testing Connection...' : 'Test Supabase Connection'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSqlSchema(!showSqlSchema)}
                className="text-xs text-[#2563EB] hover:underline flex items-center gap-1 font-medium"
              >
                <span>{showSqlSchema ? 'Hide SQL Migration' : 'View SQL Schema Script'}</span>
                {showSqlSchema ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>

            {/* Test Results Banner */}
            {supabaseStatus.tested && (
              <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                supabaseStatus.success 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-amber-50 border border-amber-200 text-amber-800'
              }`}>
                {supabaseStatus.success ? (
                  <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className="font-semibold">{supabaseStatus.success ? 'Success: ' : 'Notice: '}</span>
                  {supabaseStatus.message}
                </div>
              </div>
            )}

            {/* SQL Migration Script Box */}
            {showSqlSchema && (
              <div className="p-3 rounded-lg bg-slate-900 text-slate-100 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-[11px] text-slate-400">Run in Supabase Dashboard → SQL Editor:</span>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1 transition-colors"
                  >
                    {copiedSql ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL'}</span>
                  </button>
                </div>
                <pre className="max-h-40 overflow-y-auto text-[11px] leading-relaxed text-slate-300">
                  {SUPABASE_SCHEMA_SQL}
                </pre>
              </div>
            )}
          </div>

          {/* ================= AI ENGINES SECTION ================= */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-[#14213D] uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#2563EB]" />
              <span>AI Extraction & Copilot Credentials</span>
            </div>

            {/* Cerebras */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#14213D] flex items-center gap-1.5">
                  <Cpu size={14} className="text-[#2563EB]" /> Cerebras Inference Key (Resume Extractor)
                </label>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
              <input 
                type="password"
                value={keys.cerebras}
                onChange={e => setKeys(prev => ({ ...prev, cerebras: e.target.value }))}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] font-mono text-xs focus:outline-none focus:border-[#2563EB]"
                placeholder="csk-..."
              />
            </div>

            {/* Groq */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#14213D] flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#2563EB]" /> Groq API Key (AI Copilot & Polish)
                </label>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
              <input 
                type="password"
                value={keys.groq}
                onChange={e => setKeys(prev => ({ ...prev, groq: e.target.value }))}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] font-mono text-xs focus:outline-none focus:border-[#2563EB]"
                placeholder="gsk_..."
              />
            </div>

            {/* Cloudflare */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#14213D] flex items-center gap-1.5">
                  <Globe size={14} className="text-[#2563EB]" /> Cloudflare AI Key (Edge Functions & Fallback)
                </label>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
              <input 
                type="password"
                value={keys.cloudflare}
                onChange={e => setKeys(prev => ({ ...prev, cloudflare: e.target.value }))}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#172033] font-mono text-xs focus:outline-none focus:border-[#2563EB]"
                placeholder="Cloudflare API Token"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Credentials are securely stored client-side in localStorage only.</span>
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-medium text-[#64748B] hover:text-[#172033] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {saved ? <Check size={14} /> : null}
              <span>{saved ? 'Saved!' : 'Save Credentials'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
