import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
}

export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) return null;
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data: { user } } = await client.auth.getUser();
    return user;
  } catch (err) {
    console.error('Error getting Supabase user:', err);
    return null;
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  if (!isSupabaseConfigured()) return null;
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data: { session } } = await client.auth.getSession();
    return session;
  } catch (err) {
    console.error('Error getting Supabase session:', err);
    return null;
  }
}

export async function signInWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase client unavailable' };

  try {
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Sign in error' };
  }
}

export async function signUpWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase client unavailable' };

  try {
    const { error } = await client.auth.signUp({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Sign up error' };
  }
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const client = getSupabaseClient();
  if (!client) return;

  try {
    await client.auth.signOut();
  } catch (err) {
    console.error('Sign out error:', err);
  }
}

export function onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
  if (!isSupabaseConfigured()) {
    return { unsubscribe: () => {} };
  }
  const client = getSupabaseClient();
  if (!client) {
    return { unsubscribe: () => {} };
  }

  const { data: { subscription } } = client.auth.onAuthStateChange(callback);
  return {
    unsubscribe: () => subscription.unsubscribe()
  };
}

