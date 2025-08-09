export interface User {
  id: string;
  email: string;
  phone: string;
  user_type: 'entregador' | 'restaurante';
  status: 'ativo' | 'inativo' | 'suspenso';
  created_at: string;
  updated_at: string;
}

export interface EntregadorProfile {
  id: string;
  user_id: string;
  nome: string;
  cnh?: string;
  placa?: string;
  cnpj_mei?: string;
  pix_key?: string;
  pontuacao: number;
  areas_atuacao: string[];
  created_at: string;
}

export interface RestauranteProfile {
  id: string;
  user_id: string;
  nome_fantasia: string;
  cnpj: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    latitude?: number;
    longitude?: number;
  };
  responsavel?: string;
  favoritos: string[];
  created_at: string;
}

export interface Vaga {
  id: string;
  restaurante_id: string;
  tipo: 'avulsa' | 'turno' | 'semanal';
  data_inicio: string;
  data_fim?: string;
  horario_inicio: string;
  horario_fim: string;
  quantidade_entregadores: number;
  valor_entregador: number;
  valor_sobretaxa: number;
  valor_total: number;
  endereco_retirada: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    latitude?: number;
    longitude?: number;
  };
  raio_maximo?: number;
  observacoes?: string;
  status: 'aberta' | 'preenchida' | 'cancelada';
  only_favoritos: boolean;
  priority_window_minutes: number;
  created_at: string;
}

export interface VagaAceite {
  id: string;
  vaga_id: string;
  entregador_id: string;
  data_aceite: string;
  status: 'aceito' | 'cancelado' | 'concluido';
  valor_registrado?: number;
  valor_confirmado?: number;
  confirmado_em?: string;
}

export interface ReceitaExterna {
  id: string;
  entregador_id: string;
  app_nome: string;
  valor_total: number;
  numero_entregas?: number;
  data_trabalho: string;
  observacoes?: string;
  created_at: string;
}

export interface GastoEntregador {
  id: string;
  entregador_id: string;
  categoria: 'combustivel' | 'manutencao' | 'alimentacao';
  valor: number;
  descricao?: string;
  foto_nota?: string;
  data_gasto: string;
  deducao_ir: boolean;
  created_at: string;
}

export interface DocumentoEntregador {
  id: string;
  entregador_id: string;
  tipo: 'cnh' | 'multa' | 'licenciamento';
  numero_documento?: string;
  data_vencimento?: string;
  valor?: number;
  status?: string;
  detalhes?: any;
  created_at: string;
}

export interface Payment {
  id: string;
  vaga_aceite_id: string;
  valor_entregador: number;
  valor_sobretaxa: number;
  valor_total: number;
  status: 'pendente' | 'processando' | 'concluido' | 'falhou';
  pix_entregador_id?: string;
  pix_sobretaxa_id?: string;
  processed_at?: string;
  created_at: string;
}

export interface NotaFiscal {
  id: string;
  payment_id: string;
  tipo: 'entregador_para_restaurante' | 'plataforma_para_restaurante';
  numero_nf?: string;
  xml_content?: string;
  pdf_url?: string;
  status: 'pendente' | 'emitida' | 'cancelada';
  emitida_em?: string;
  created_at: string;
}

export interface Oferta {
  id: string;
  categoria: 'combustivel' | 'manutencao' | 'alimentacao' | 'saude';
  titulo: string;
  descricao: string;
  preco_original: number;
  preco_desconto: number;
  desconto: number;
  distancia: number;
  avaliacao: number;
  validade: string;
  favorito: boolean;
  empresa: string;
  endereco: string;
}