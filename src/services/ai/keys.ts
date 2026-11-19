// API Keys & Supabase configuration with environment variables and localStorage override capabilities

export interface ApiKeysConfig {
  cerebras: string;
  groq: string;
  cloudflare: string;
  serpapi: string;
  zenserp: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const getDefaultKeys = (): ApiKeysConfig => ({
  cerebras: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CEREBRAS_API_KEY) || '',
  groq: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_API_KEY) || '',
  cloudflare: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_API_KEY) || '',
  serpapi: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SERPAPI_API_KEY) || '',
  zenserp: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ZENSERP_API_KEY) || '',
  supabaseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://feqlmnakfdpawlgbpjbn.supabase.co',
  supabaseAnonKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || ''
});

const STORAGE_KEY = 'zenith_api_keys_v1';

export function getApiKeys(): ApiKeysConfig {
  const defaults = getDefaultKeys();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaults, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to read saved keys', e);
  }
  return defaults;
}

export function saveApiKeys(keys: Partial<ApiKeysConfig>): void {
  try {
    const current = getApiKeys();
    const updated = { ...current, ...keys };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save keys', e);
  }
}
