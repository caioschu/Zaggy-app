import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Database helpers
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const getEntregadorProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('entregador_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const getVagasDisponiveis = async (entregadorId: string) => {
  const { data, error } = await supabase
    .from('vagas')
    .select(`
      *,
      restaurante_profiles!inner(nome_fantasia, endereco)
    `)
    .eq('status', 'aberta')
    .gte('data_inicio', new Date().toISOString().split('T')[0])
    .order('created_at', { ascending: false });
  return { data, error };
};

export const aceitarVaga = async (vagaId: string, entregadorId: string) => {
  const { data, error } = await supabase
    .from('vaga_aceites')
    .insert({
      vaga_id: vagaId,
      entregador_id: entregadorId,
    })
    .select()
    .single();
  return { data, error };
};

export const getReceitasExternas = async (entregadorId: string, dataInicio?: string, dataFim?: string) => {
  let query = supabase
    .from('receitas_externas')
    .select('*')
    .eq('entregador_id', entregadorId)
    .order('data_trabalho', { ascending: false });

  if (dataInicio) {
    query = query.gte('data_trabalho', dataInicio);
  }
  if (dataFim) {
    query = query.lte('data_trabalho', dataFim);
  }

  const { data, error } = await query;
  return { data, error };
};

export const adicionarReceitaExterna = async (receita: {
  entregador_id: string;
  app_nome: string;
  valor_total: number;
  numero_entregas?: number;
  data_trabalho: string;
  observacoes?: string;
}) => {
  const { data, error } = await supabase
    .from('receitas_externas')
    .insert(receita)
    .select()
    .single();
  return { data, error };
};

export const getGastos = async (entregadorId: string, dataInicio?: string, dataFim?: string) => {
  let query = supabase
    .from('gastos_entregadores')
    .select('*')
    .eq('entregador_id', entregadorId)
    .order('data_gasto', { ascending: false });

  if (dataInicio) {
    query = query.gte('data_gasto', dataInicio);
  }
  if (dataFim) {
    query = query.lte('data_gasto', dataFim);
  }

  const { data, error } = await query;
  return { data, error };
};

export const adicionarGasto = async (gasto: {
  entregador_id: string;
  categoria: 'combustivel' | 'manutencao' | 'alimentacao';
  valor: number;
  descricao?: string;
  foto_nota?: string;
  data_gasto: string;
  deducao_ir?: boolean;
}) => {
  const { data, error } = await supabase
    .from('gastos_entregadores')
    .insert(gasto)
    .select()
    .single();
  return { data, error };
};

export const getDocumentos = async (entregadorId: string) => {
  const { data, error } = await supabase
    .from('documentos_entregadores')
    .select('*')
    .eq('entregador_id', entregadorId)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Real-time subscriptions
export const subscribeToVagas = (callback: (payload: any) => void) => {
  return supabase
    .channel('vagas-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'vagas' 
      }, 
      callback
    )
    .subscribe();
};

export const subscribeToUserNotifications = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`user-${userId}`)
    .on('postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
};