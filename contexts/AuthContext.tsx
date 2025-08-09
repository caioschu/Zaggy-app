import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { User } from '@supabase/supabase-js';
import { EntregadorProfile, EmpresaProfile } from '@/types';

interface Profile {
  id: string;
  email: string;
  phone?: string;
  user_type: 'entregador' | 'empresa';
  status: 'ativo' | 'inativo' | 'suspenso';
  created_at: string;
  updated_at: string;
}

interface SignUpData {
  nome: string;
  email: string;
  telefone?: string;
  password: string;
  userType: 'entregador' | 'empresa';
  cnpj?: string;
  nome_fantasia?: string;
  endereco?: any;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  entregadorProfile: EntregadorProfile | null;
  empresaProfile: EmpresaProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (userData: SignUpData) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: any) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [entregadorProfile, setEntregadorProfile] = useState<EntregadorProfile | null>(null);
  const [empresaProfile, setEmpresaProfile] = useState<EmpresaProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await loadUserProfile(session.user.id);
          }
          
          setInitialized(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro na inicialização:', error);
        if (mounted) {
          setLoading(false);
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setProfile(null);
          setEntregadorProfile(null);
          setEmpresaProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Erro ao carregar perfil:', profileError);
        return;
      }

      if (!profileData) {
        console.log('Perfil não encontrado');
        return;
      }

      setProfile(profileData);

      // Carregar perfil específico
      if (profileData.user_type === 'entregador') {
        const { data: entregadorData } = await supabase
          .from('entregador_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        
        if (entregadorData) {
          setEntregadorProfile(entregadorData);
        }
      } else if (profileData.user_type === 'empresa') {
        const { data: empresaData } = await supabase
          .from('empresa_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        
        if (empresaData) {
          setEmpresaProfile(empresaData);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar perfis:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (userData: SignUpData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) return { error: authError };
      if (!authData.user) return { error: new Error('Usuário não criado') };

      // Aguardar criação do usuário
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: userData.email,
          phone: userData.telefone,
          user_type: userData.userType,
        });

      if (profileError) return { error: profileError };

      await new Promise(resolve => setTimeout(resolve, 500));

      if (userData.userType === 'entregador') {
        const { error: entregadorError } = await supabase
          .from('entregador_profiles')
          .insert({
            user_id: authData.user.id,
            nome: userData.nome,
          });

        if (entregadorError) return { error: entregadorError };
      } else if (userData.userType === 'empresa') {
        const { error: empresaError } = await supabase
          .from('empresa_profiles')
          .insert({
            user_id: authData.user.id,
            nome_fantasia: userData.nome_fantasia || userData.nome,
            cnpj: userData.cnpj || '',
            endereco: userData.endereco || {},
          });

        if (empresaError) return { error: empresaError };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setEntregadorProfile(null);
    setEmpresaProfile(null);
  };

  const updateProfile = async (data: any) => {
    if (!user) return { error: new Error('Usuário não autenticado') };

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (!error) {
      await refreshProfile();
    }

    return { error };
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      entregadorProfile,
      empresaProfile,
      loading: loading || !initialized,
      signIn,
      signUp,
      signOut,
      updateProfile,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}