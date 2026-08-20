// ============================================================
// Titan Grid EA — Auth Context (Supabase Auth)
// Runs in two modes:
//   - Supabase configured  -> real auth (login/register/session)
//   - Not configured yet   -> Demo mode (as before, for UI preview)
// ============================================================
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import type { Session } from '@supabase/supabase-js';
import type { UserRole } from '../types';

export interface AuthProfile {
  id: string;
  full_name: string | null;
  telegram: string | null;
  role: 'customer' | 'admin';
  created_at: string;
}

interface AuthContextValue {
  isDemoMode: boolean;
  loading: boolean;
  session: Session | null;
  profile: AuthProfile | null;
  role: UserRole;
  userEmail: string | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string; needsEmailConfirm?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, telegram, role, created_at')
      .eq('id', userId)
      .maybeSingle();
    setProfile((data as AuthProfile) ?? null);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user) await loadProfile(data.session.user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        await loadProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error: error.message };
    // If Supabase email confirmation is ON, no session is returned yet
    return { needsEmailConfirm: !data.session };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) await loadProfile(session.user.id);
  }, [session, loadProfile]);

  const role: UserRole = !isSupabaseConfigured
    ? 'guest' // demo mode: role is controlled by App state as before
    : !session
      ? 'guest'
      : profile?.role === 'admin'
        ? 'admin'
        : 'user';

  return (
    <AuthContext.Provider
      value={{
        isDemoMode: !isSupabaseConfigured,
        loading,
        session,
        profile,
        role,
        userEmail: session?.user?.email ?? null,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
