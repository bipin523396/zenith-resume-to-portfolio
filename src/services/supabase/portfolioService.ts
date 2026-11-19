import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { CanonicalProfile, ThemeConfig } from '../../types/profile';

export interface SupabasePortfolioRecord {
  id?: string;
  slug: string;
  custom_title: string;
  profile: CanonicalProfile;
  theme: ThemeConfig;
  is_public: boolean;
  view_count?: number;
  user_id?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PublishResult {
  success: boolean;
  cloudSynced: boolean;
  message: string;
  error?: string;
  record?: SupabasePortfolioRecord;
}

export interface LoadedPortfolio {
  slug: string;
  customTitle: string;
  profile: CanonicalProfile;
  theme: ThemeConfig;
  isPublic: boolean;
  viewCount: number;
  publishedAt: string;
}

/**
 * Saves or updates a portfolio in Supabase.
 * If Supabase is not configured, it gracefully falls back without failing the caller.
 */
export async function savePortfolioToSupabase(params: {
  slug: string;
  profile: CanonicalProfile;
  theme: ThemeConfig;
  customTitle: string;
  isPublic?: boolean;
}): Promise<PublishResult> {
  const { slug, profile, theme, customTitle, isPublic = true } = params;

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      cloudSynced: false,
      message: 'Supabase is not configured. Portfolio saved to local browser cache.'
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: true,
      cloudSynced: false,
      message: 'Supabase client could not be initialized.'
    };
  }

  try {
    const user = (await client.auth.getUser()).data.user;

    const payload = {
      slug,
      custom_title: customTitle,
      profile,
      theme,
      is_public: isPublic,
      user_id: user?.id || null,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await client
      .from('portfolios')
      .upsert(payload, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.warn('Supabase upsert error:', error);
      return {
        success: false,
        cloudSynced: false,
        message: `Failed to save to Supabase: ${error.message}`,
        error: error.message
      };
    }

    return {
      success: true,
      cloudSynced: true,
      message: 'Successfully published to Supabase Cloud!',
      record: data as SupabasePortfolioRecord
    };
  } catch (err: any) {
    console.error('Unexpected Supabase publish error:', err);
    return {
      success: false,
      cloudSynced: false,
      message: `Network or unexpected error: ${err?.message || 'Unknown error'}`,
      error: err?.message
    };
  }
}

/**
 * Loads a published portfolio by slug from Supabase.
 * Returns null if not found or if Supabase is unconfigured.
 */
export async function getPortfolioFromSupabase(slug: string): Promise<LoadedPortfolio | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const client = getSupabaseClient();
  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .eq('is_public', true)
      .maybeSingle();

    if (error || !data) {
      if (error) {
        console.warn(`Supabase fetch error for slug "${slug}":`, error.message);
      }
      return null;
    }

    // Attempt to increment view count non-blockingly
    incrementViewCount(slug, data.view_count || 0);

    return {
      slug: data.slug,
      customTitle: data.custom_title,
      profile: data.profile as CanonicalProfile,
      theme: data.theme as ThemeConfig,
      isPublic: data.is_public,
      viewCount: (data.view_count || 0) + 1,
      publishedAt: data.created_at || data.updated_at || new Date().toISOString()
    };
  } catch (err) {
    console.warn(`Failed to retrieve portfolio "${slug}" from Supabase:`, err);
    return null;
  }
}

/**
 * Unpublishes a portfolio by setting is_public = false in Supabase.
 */
export async function unpublishPortfolioFromSupabase(slug: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return true;
  }

  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('portfolios')
      .update({ is_public: false, updated_at: new Date().toISOString() })
      .eq('slug', slug);

    if (error) {
      console.warn('Failed to unpublish on Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase unpublish exception:', err);
    return false;
  }
}

/**
 * Fetch all public portfolios (useful for showcasing or portfolio discovery).
 */
export async function listPublicPortfolios(limit = 12): Promise<SupabasePortfolioRecord[]> {
  if (!isSupabaseConfigured()) return [];
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from('portfolios')
      .select('id, slug, custom_title, profile, theme, is_public, view_count, created_at, updated_at')
      .eq('is_public', true)
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Error fetching public portfolios:', error);
      return [];
    }
    return (data || []) as SupabasePortfolioRecord[];
  } catch (e) {
    console.warn('Exception listing public portfolios:', e);
    return [];
  }
}

/**
 * Non-blocking helper to increment view count for a published portfolio.
 */
async function incrementViewCount(slug: string, currentCount: number): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    // First try the RPC function if created
    const { error: rpcError } = await client.rpc('increment_portfolio_views', { portfolio_slug: slug });
    
    // Fallback direct update if RPC is not defined
    if (rpcError) {
      await client
        .from('portfolios')
        .update({ view_count: currentCount + 1 })
        .eq('slug', slug);
    }
  } catch {
    // Non-critical, ignore silent failures
  }
}

