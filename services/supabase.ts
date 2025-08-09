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

// Profile helpers
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

export const getEmpresaProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('empresa_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

// Vagas helpers
export const getVagasDisponiveis = async (entregadorId: string) => {
  const { data, error } = await supabase
    .from('vagas')
    .select(`
      *,
      empresa_profiles!inner(nome_fantasia, endereco)
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

// Receitas helpers
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
  horario_inicio?: string;
  horario_fim?: string;
  km_rodados?: number;
  observacoes?: string;
}) => {
  const { data, error } = await supabase
    .from('receitas_externas')
    .insert(receita)
    .select()
    .single();
  return { data, error };
};

// Gastos helpers
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
  categoria: 'combustivel' | 'manutencao' | 'alimentacao' | 'equipamentos' | 'outros';
  subcategoria?: string;
  valor: number;
  descricao?: string;
  foto_nota?: string;
  km_atual?: number;
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

// Documentos helpers
export const getDocumentos = async (entregadorId: string) => {
  const { data, error } = await supabase
    .from('documentos_entregadores')
    .select('*')
    .eq('entregador_id', entregadorId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const atualizarDocumento = async (documentoId: string, dados: any) => {
  const { data, error } = await supabase
    .from('documentos_entregadores')
    .update(dados)
    .eq('id', documentoId)
    .select()
    .single();
  return { data, error };
};

// Ofertas helpers
export const getOfertas = async (categoria?: string, localizacao?: { lat: number, lng: number }) => {
  let query = supabase
    .from('ofertas')
    .select('*')
    .eq('status', 'ativa')
    .order('created_at', { ascending: false });

  if (categoria && categoria !== 'todas') {
    query = query.eq('categoria', categoria);
  }

  const { data, error } = await query;
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

// Estatísticas e relatórios
export const getEstatisticasFinanceiras = async (entregadorId: string, periodo: 'hoje' | 'semana' | 'mes') => {
  const hoje = new Date();
  let dataInicio: string;

  switch (periodo) {
    case 'hoje':
      dataInicio = hoje.toISOString().split('T')[0];
      break;
    case 'semana':
      const inicioSemana = new Date(hoje);
      inicioSemana.setDate(hoje.getDate() - hoje.getDay());
      dataInicio = inicioSemana.toISOString().split('T')[0];
      break;
    case 'mes':
      dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
      break;
  }

  const { data: receitas } = await getReceitasExternas(entregadorId, dataInicio);
  const { data: gastos } = await getGastos(entregadorId, dataInicio);

  const totalReceitas = receitas?.reduce((acc, r) => acc + r.valor_total, 0) || 0;
  const totalGastos = gastos?.reduce((acc, g) => acc + g.valor, 0) || 0;
  const totalEntregas = receitas?.reduce((acc, r) => acc + (r.numero_entregas || 0), 0) || 0;

  return {
    receita_total: totalReceitas,
    gastos_total: totalGastos,
    lucro_liquido: totalReceitas - totalGastos,
    total_entregas: totalEntregas,
    ticket_medio: totalEntregas > 0 ? totalReceitas / totalEntregas : 0,
    receitas_por_app: receitas?.reduce((acc, r) => {
      acc[r.app_nome] = (acc[r.app_nome] || 0) + r.valor_total;
      return acc;
    }, {} as Record<string, number>) || {},
    gastos_por_categoria: gastos?.reduce((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] || 0) + g.valor;
      return acc;
    }, {} as Record<string, number>) || {}
  };
};