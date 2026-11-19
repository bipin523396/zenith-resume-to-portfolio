import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getApiKeys } from '../ai/keys';

let cachedClient: SupabaseClient | null = null;
let cachedUrl: string | null = null;
let cachedKey: string | null = null;

export function getSupabaseCredentials(): { url: string; anonKey: string } {
  const keys = getApiKeys();
  const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_URL : '';
  const envKey = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SUPABASE_ANON_KEY : '';

  const url = (keys.supabaseUrl || envUrl || '').trim();
  const anonKey = (keys.supabaseAnonKey || envKey || '').trim();

  return { url, anonKey };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(
    url && 
    anonKey && 
    (url.startsWith('https://') || url.startsWith('http://')) && 
    anonKey.length > 20
  );
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey) {
    return null;
  }

  // Re-create if credentials changed
  if (cachedClient && cachedUrl === url && cachedKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    cachedUrl = url;
    cachedKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  tableExists?: boolean;
  error?: string;
}

export async function testSupabaseConnection(): Promise<ConnectionTestResult> {
  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey) {
    return {
      success: false,
      message: 'Supabase URL or Anon Key is missing. Please provide both credentials.'
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Could not create Supabase client. Please check the URL format.'
    };
  }

  try {
    // Attempt a light HEAD request to check the 'portfolios' table
    const { error, status } = await client
      .from('portfolios')
      .select('id', { count: 'exact', head: true });

    if (error) {
      // 42P01 in PostgreSQL or PGRST205 in PostgREST: table does not exist
      if (
        error.code === '42P01' || 
        error.code === 'PGRST205' || 
        error.message?.toLowerCase().includes('does not exist') ||
        error.message?.toLowerCase().includes('schema cache')
      ) {
        return {
          success: true,
          tableExists: false,
          message: 'Connected to Supabase successfully! The "portfolios" table was not found yet. Run the SQL schema to create it.'
        };
      }

      // Check for auth/permission errors
      if (status === 401 || status === 403 || error.message?.toLowerCase().includes('jwt')) {
        return {
          success: false,
          message: `Authentication error: ${error.message}. Double-check your Anon Public Key.`,
          error: error.message
        };
      }

      return {
        success: false,
        message: `Supabase query returned: ${error.message}`,
        error: error.message
      };
    }

    return {
      success: true,
      tableExists: true,
      message: 'Supabase connection verified! The "portfolios" table is ready for cloud publishing.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Connection failed: ${err?.message || 'Network error or invalid domain'}`,
      error: err?.message
    };
  }
}

