/*
  # Schema Completo Zaggy - Sistema de Autenticação e Perfis

  1. Tabelas Base
    - `profiles` - Perfis base de usuários
    - `entregador_profiles` - Dados específicos de entregadores
    - `empresa_profiles` - Dados específicos de empresas
    
  2. Tabelas Operacionais
    - `receitas_externas` - Receitas de apps externos
    - `gastos_entregadores` - Controle de gastos
    - `documentos_entregadores` - Gestão de documentos
    - `vagas` - Sistema de vagas
    - `vaga_aceites` - Aceites de vagas
    - `ofertas` - Sistema de ofertas
    - `notifications` - Sistema de notificações

  3. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas específicas por tipo de usuário
*/

-- Perfis base (expandir existente)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('entregador', 'empresa')) NOT NULL,
  status TEXT CHECK (status IN ('ativo', 'inativo', 'suspenso')) DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Perfis de entregadores
CREATE TABLE IF NOT EXISTS public.entregador_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cnh TEXT,
  placa TEXT,
  cnpj_mei TEXT,
  pix_key TEXT,
  pontuacao DECIMAL(3,2) DEFAULT 5.0,
  areas_atuacao TEXT[] DEFAULT '{}',
  status_documentos JSONB DEFAULT '{}',
  configuracoes_app JSONB DEFAULT '{}',
  estatisticas JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Perfis de empresas
CREATE TABLE IF NOT EXISTS public.empresa_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  nome_fantasia TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  endereco JSONB NOT NULL,
  responsavel TEXT,
  favoritos TEXT[] DEFAULT '{}',
  configuracoes JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Receitas externas
CREATE TABLE IF NOT EXISTS public.receitas_externas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entregador_id UUID REFERENCES public.entregador_profiles(id) ON DELETE CASCADE,
  app_nome TEXT NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  numero_entregas INTEGER,
  data_trabalho DATE NOT NULL,
  horario_inicio TIME,
  horario_fim TIME,
  km_rodados INTEGER,
  observacoes TEXT,
  comprovante_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gastos de entregadores
CREATE TABLE IF NOT EXISTS public.gastos_entregadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entregador_id UUID REFERENCES public.entregador_profiles(id) ON DELETE CASCADE,
  categoria TEXT CHECK (categoria IN ('combustivel', 'manutencao', 'alimentacao', 'equipamentos', 'outros')) NOT NULL,
  subcategoria TEXT,
  valor DECIMAL(10,2) NOT NULL,
  descricao TEXT,
  foto_nota TEXT,
  km_atual INTEGER,
  data_gasto DATE NOT NULL,
  deducao_ir BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documentos de entregadores
CREATE TABLE IF NOT EXISTS public.documentos_entregadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entregador_id UUID REFERENCES public.entregador_profiles(id) ON DELETE CASCADE,
  tipo_documento TEXT CHECK (tipo_documento IN ('cnh', 'veiculo', 'mei', 'outros')) NOT NULL,
  numero_documento TEXT,
  data_vencimento DATE,
  status TEXT CHECK (status IN ('valido', 'vencido', 'vencendo', 'pendente')) DEFAULT 'pendente',
  observacoes TEXT,
  arquivo_url TEXT,
  detalhes JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sistema de vagas (expandir existente)
CREATE TABLE IF NOT EXISTS public.vagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES public.empresa_profiles(id) ON DELETE CASCADE,
  tipo TEXT CHECK (tipo IN ('avulsa', 'turno', 'semanal')) NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  horario_inicio TIME NOT NULL,
  horario_fim TIME NOT NULL,
  quantidade_entregadores INTEGER NOT NULL DEFAULT 1,
  valor_entregador DECIMAL(10,2) NOT NULL,
  valor_sobretaxa DECIMAL(10,2) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  endereco_retirada JSONB NOT NULL,
  raio_maximo INTEGER DEFAULT 10,
  observacoes TEXT,
  requisitos JSONB DEFAULT '{}',
  beneficios JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('aberta', 'preenchida', 'cancelada')) DEFAULT 'aberta',
  only_favoritos BOOLEAN DEFAULT false,
  priority_window_minutes INTEGER DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aceites de vagas
CREATE TABLE IF NOT EXISTS public.vaga_aceites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vaga_id UUID REFERENCES public.vagas(id) ON DELETE CASCADE,
  entregador_id UUID REFERENCES public.entregador_profiles(id) ON DELETE CASCADE,
  data_aceite TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('aceito', 'cancelado', 'concluido')) DEFAULT 'aceito',
  valor_registrado DECIMAL(10,2),
  valor_confirmado DECIMAL(10,2),
  confirmado_em TIMESTAMP WITH TIME ZONE,
  avaliacao_empresa INTEGER CHECK (avaliacao_empresa >= 1 AND avaliacao_empresa <= 5),
  avaliacao_entregador INTEGER CHECK (avaliacao_entregador >= 1 AND avaliacao_entregador <= 5),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sistema de ofertas
CREATE TABLE IF NOT EXISTS public.ofertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria TEXT CHECK (categoria IN ('combustivel', 'manutencao', 'alimentacao', 'documentos', 'equipamentos')) NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  empresa TEXT NOT NULL,
  valor_original DECIMAL(10,2),
  valor_desconto DECIMAL(10,2),
  percentual_desconto INTEGER,
  codigo_promocional TEXT,
  data_inicio DATE DEFAULT CURRENT_DATE,
  data_fim DATE,
  publico_alvo JSONB DEFAULT '{}',
  localizacao JSONB,
  raio_km INTEGER DEFAULT 10,
  status TEXT CHECK (status IN ('ativa', 'pausada', 'expirada')) DEFAULT 'ativa',
  limite_uso INTEGER,
  usos_atual INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sistema de notificações
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  categoria TEXT,
  titulo TEXT NOT NULL,
  conteudo TEXT,
  data_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lida BOOLEAN DEFAULT false,
  acao_url TEXT,
  dados_contexto JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entregador_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresa_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas_externas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gastos_entregadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos_entregadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaga_aceites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Políticas RLS para entregador_profiles
CREATE POLICY "Entregadores can read own profile"
  ON public.entregador_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Entregadores can update own profile"
  ON public.entregador_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Empresas can read entregador profiles for vagas"
  ON public.entregador_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'empresa'
    )
  );

-- Políticas RLS para empresa_profiles
CREATE POLICY "Empresas can read own profile"
  ON public.empresa_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Empresas can update own profile"
  ON public.empresa_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Políticas RLS para receitas_externas
CREATE POLICY "Entregadores can manage own receitas"
  ON public.receitas_externas
  FOR ALL
  TO authenticated
  USING (
    entregador_id IN (
      SELECT id FROM public.entregador_profiles WHERE user_id = auth.uid()
    )
  );

-- Políticas RLS para gastos_entregadores
CREATE POLICY "Entregadores can manage own gastos"
  ON public.gastos_entregadores
  FOR ALL
  TO authenticated
  USING (
    entregador_id IN (
      SELECT id FROM public.entregador_profiles WHERE user_id = auth.uid()
    )
  );

-- Políticas RLS para documentos_entregadores
CREATE POLICY "Entregadores can manage own documentos"
  ON public.documentos_entregadores
  FOR ALL
  TO authenticated
  USING (
    entregador_id IN (
      SELECT id FROM public.entregador_profiles WHERE user_id = auth.uid()
    )
  );

-- Políticas RLS para vagas
CREATE POLICY "Empresas can manage own vagas"
  ON public.vagas
  FOR ALL
  TO authenticated
  USING (
    empresa_id IN (
      SELECT id FROM public.empresa_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Entregadores can read available vagas"
  ON public.vagas
  FOR SELECT
  TO authenticated
  USING (
    status = 'aberta' AND
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND user_type = 'entregador'
    )
  );

-- Políticas RLS para vaga_aceites
CREATE POLICY "Entregadores can manage own aceites"
  ON public.vaga_aceites
  FOR ALL
  TO authenticated
  USING (
    entregador_id IN (
      SELECT id FROM public.entregador_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Empresas can read aceites of own vagas"
  ON public.vaga_aceites
  FOR SELECT
  TO authenticated
  USING (
    vaga_id IN (
      SELECT v.id FROM public.vagas v
      JOIN public.empresa_profiles ep ON v.empresa_id = ep.id
      WHERE ep.user_id = auth.uid()
    )
  );

-- Políticas RLS para ofertas
CREATE POLICY "Everyone can read active ofertas"
  ON public.ofertas
  FOR SELECT
  TO authenticated
  USING (status = 'ativa');

-- Políticas RLS para notifications
CREATE POLICY "Users can read own notifications"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_entregador_profiles_user_id ON public.entregador_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_empresa_profiles_user_id ON public.empresa_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_receitas_externas_entregador_data ON public.receitas_externas(entregador_id, data_trabalho);
CREATE INDEX IF NOT EXISTS idx_gastos_entregadores_entregador_data ON public.gastos_entregadores(entregador_id, data_gasto);
CREATE INDEX IF NOT EXISTS idx_vagas_status_data ON public.vagas(status, data_inicio);
CREATE INDEX IF NOT EXISTS idx_notifications_user_lida ON public.notifications(user_id, lida);