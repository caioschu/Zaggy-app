import { 
  EntregadorProfile, 
  ReceitaExterna, 
  GastoEntregador, 
  DocumentoEntregador,
  Vaga,
  Oferta 
} from '../types';

// Mock data para desenvolvimento e demonstração
export const mockEntregadorProfile: EntregadorProfile = {
  id: '1',
  user_id: 'user-1',
  nome: 'João Silva',
  cnh: '12345678901',
  placa: 'ABC1234',
  cnpj_mei: '12.345.678/0001-90',
  pix_key: 'joao.silva@email.com',
  pontuacao: 4.8,
  areas_atuacao: ['Centro', 'Zona Sul', 'Shopping'],
  created_at: '2024-01-01T00:00:00Z'
};

export const mockReceitasExternas: ReceitaExterna[] = [
  {
    id: '1',
    entregador_id: 'user-1',
    app_nome: 'ifood',
    valor_total: 127.30,
    numero_entregas: 9,
    data_trabalho: '2024-12-15',
    created_at: '2024-12-15T20:00:00Z'
  },
  {
    id: '2',
    entregador_id: 'user-1',
    app_nome: 'zaggy',
    valor_total: 85.50,
    numero_entregas: 6,
    data_trabalho: '2024-12-15',
    created_at: '2024-12-15T19:30:00Z'
  },
  {
    id: '3',
    entregador_id: 'user-1',
    app_nome: 'uber',
    valor_total: 67.20,
    numero_entregas: 4,
    data_trabalho: '2024-12-15',
    created_at: '2024-12-15T18:45:00Z'
  },
  {
    id: '4',
    entregador_id: 'user-1',
    app_nome: 'rappi',
    valor_total: 45.80,
    numero_entregas: 3,
    data_trabalho: '2024-12-15',
    created_at: '2024-12-15T17:20:00Z'
  }
];

export const mockGastos: GastoEntregador[] = [
  {
    id: '1',
    entregador_id: 'user-1',
    categoria: 'combustivel',
    valor: 45.00,
    descricao: 'Gasolina - Shell Centro',
    data_gasto: '2024-12-15',
    deducao_ir: true,
    created_at: '2024-12-15T14:30:00Z'
  },
  {
    id: '2',
    entregador_id: 'user-1',
    categoria: 'alimentacao',
    valor: 18.00,
    descricao: 'Almoço - Restaurante do João',
    data_gasto: '2024-12-15',
    deducao_ir: false,
    created_at: '2024-12-15T12:15:00Z'
  },
  {
    id: '3',
    entregador_id: 'user-1',
    categoria: 'manutencao',
    valor: 35.00,
    descricao: 'Troca de óleo',
    data_gasto: '2024-12-14',
    deducao_ir: true,
    created_at: '2024-12-14T16:00:00Z'
  }
];

export const mockDocumentos: DocumentoEntregador[] = [
  {
    id: '1',
    entregador_id: 'user-1',
    tipo: 'cnh',
    numero_documento: '12345678901',
    data_vencimento: '2025-03-15',
    status: 'ativa',
    detalhes: {
      categoria: 'AB',
      pontos_atual: 3,
      situacao: 'ativa'
    },
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    entregador_id: 'user-1',
    tipo: 'multa',
    numero_documento: 'MULTA001',
    valor: 195.23,
    status: 'pendente',
    detalhes: {
      descricao: 'Excesso de velocidade',
      local: 'Av. Brasil, Centro',
      data_infracao: '2024-12-10',
      desconto_prazo: '20% até 10 dias',
      dias_restantes: 8
    },
    created_at: '2024-12-10T00:00:00Z'
  },
  {
    id: '3',
    entregador_id: 'user-1',
    tipo: 'licenciamento',
    data_vencimento: '2025-02-28',
    status: 'em_dia',
    detalhes: {
      placa: 'ABC1234',
      ipva_2025: 'pago',
      seguro: '2025-06-15'
    },
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const mockVagasDisponiveis: Vaga[] = [
  {
    id: '1',
    restaurante_id: 'rest-1',
    tipo: 'turno',
    data_inicio: '2024-12-15',
    horario_inicio: '18:00',
    horario_fim: '22:00',
    quantidade_entregadores: 2,
    valor_entregador: 80.00,
    valor_sobretaxa: 8.00,
    valor_total: 88.00,
    endereco_retirada: {
      rua: 'Av. Brasil',
      numero: '1234',
      bairro: 'Centro',
      cidade: 'Juiz de Fora',
      cep: '36000-000',
      latitude: -21.7642,
      longitude: -43.3467
    },
    raio_maximo: 5,
    observacoes: 'Movimento intenso esperado',
    status: 'aberta',
    only_favoritos: false,
    priority_window_minutes: 15,
    created_at: '2024-12-15T10:00:00Z'
  },
  {
    id: '2',
    restaurante_id: 'rest-2',
    tipo: 'avulsa',
    data_inicio: '2024-12-16',
    horario_inicio: '11:00',
    horario_fim: '15:00',
    quantidade_entregadores: 1,
    valor_entregador: 60.00,
    valor_sobretaxa: 6.00,
    valor_total: 66.00,
    endereco_retirada: {
      rua: 'Rua XV de Novembro',
      numero: '567',
      bairro: 'Centro',
      cidade: 'Juiz de Fora',
      cep: '36000-001',
      latitude: -21.7650,
      longitude: -43.3480
    },
    status: 'aberta',
    only_favoritos: true,
    priority_window_minutes: 30,
    created_at: '2024-12-15T08:00:00Z'
  }
];

export const mockOfertas: Oferta[] = [
  {
    id: '1',
    categoria: 'combustivel',
    titulo: 'Shell Centro - Desconto Zaggy',
    descricao: 'Gasolina comum e aditivada com desconto exclusivo para usuários Zaggy',
    preco_original: 5.85,
    preco_desconto: 5.27,
    desconto: 10,
    distancia: 300,
    avaliacao: 4.8,
    validade: 'Até 18h hoje',
    favorito: true,
    empresa: 'Shell',
    endereco: 'Av. Brasil, 1234 - Centro'
  },
  {
    id: '2',
    categoria: 'manutencao',
    titulo: 'Oficina do João - Troca de Óleo',
    descricao: 'Troca de óleo sintético + filtro com garantia de 6 meses',
    preco_original: 45.00,
    preco_desconto: 36.00,
    desconto: 20,
    distancia: 850,
    avaliacao: 4.9,
    validade: 'Válido até sexta',
    favorito: false,
    empresa: 'Oficina do João',
    endereco: 'Rua das Flores, 567 - Bairro'
  },
  {
    id: '3',
    categoria: 'alimentacao',
    titulo: 'Restaurante Popular - Almoço',
    descricao: 'Prato feito completo: arroz, feijão, carne, salada + bebida',
    preco_original: 18.00,
    preco_desconto: 14.40,
    desconto: 20,
    distancia: 150,
    avaliacao: 4.6,
    validade: 'Até 15h',
    favorito: true,
    empresa: 'Restaurante Popular',
    endereco: 'Rua XV de Novembro, 89'
  },
  {
    id: '4',
    categoria: 'saude',
    titulo: 'Dr. João - Renovação CNH',
    descricao: 'Exame médico completo para renovação de CNH categoria AB',
    preco_original: 200.00,
    preco_desconto: 180.00,
    desconto: 10,
    distancia: 500,
    avaliacao: 4.7,
    validade: 'Agendamento até amanhã',
    favorito: false,
    empresa: 'Dr. João Medicina do Tráfego',
    endereco: 'Av. Independência, 456'
  },
  {
    id: '5',
    categoria: 'combustivel',
    titulo: 'Posto Ipiranga - Cashback',
    descricao: 'Gasolina comum + 3% de cashback no Zaggy Pay',
    preco_original: 5.92,
    preco_desconto: 5.74,
    desconto: 3,
    distancia: 1200,
    avaliacao: 4.5,
    validade: 'Cashback até domingo',
    favorito: false,
    empresa: 'Posto Ipiranga',
    endereco: 'Rua Principal, 789'
  }
];

// Funções utilitárias para dados mock
export const getMockDadosFinanceiros = (periodo: 'hoje' | 'semana' | 'mes') => {
  const baseData = {
    hoje: {
      zaggy: { ganhos: 85.50, entregas: 6, km: 45 },
      ifood: { ganhos: 127.30, entregas: 9, km: 67 },
      rappi: { ganhos: 45.80, entregas: 3, km: 23 },
      uber: { ganhos: 67.20, entregas: 4, km: 31 },
      total_bruto: 325.80,
      gastos: { combustivel: 67.50, alimentacao: 18.00 },
      total_liquido: 240.30,
      ganho_por_hora: 28.23
    },
    semana: {
      total_bruto: 1847.50,
      total_liquido: 1456.20,
      gastos_total: 391.30,
      dias_trabalhados: 6
    },
    mes: {
      total_bruto: 7890.40,
      total_liquido: 6234.80,
      gastos_total: 1655.60,
      dias_trabalhados: 24
    }
  };

  return baseData[periodo];
};

export const getMockDadosMoto = () => ({
  combustivel: {
    nivel_atual: 25,
    km_restantes: 45,
    consumo_medio: 15.6,
    posto_sugerido: {
      nome: "Shell Centro",
      preco: 5.85,
      distancia: 300
    }
  },
  manutencao: {
    km_atual: 45280,
    proxima_revisao: 46000,
    dias_estimados: 8,
    alertas: [
      { tipo: "Troca de óleo", urgencia: "media", km_restantes: 720 },
      { tipo: "Pneu traseiro", desgaste: 78, urgencia: "alta" }
    ]
  },
  gastos_mes: {
    combustivel: 890.50,
    manutencao: 245.00,
    total: 1135.50
  }
});

export const getMockDadosMEI = () => ({
  status: "ativo",
  cnpj: "12.345.678/0001-90",
  vencimento_das: "2025-01-15",
  faturamento_2025: {
    total: 40200.00,
    limite: 81000.00,
    percentual: 49.6,
    por_app: {
      zaggy: 8450.00,
      ifood: 15780.00,
      rappi: 3290.00,
      uber: 12680.00
    }
  },
  nfs_pendentes: 15,
  das_historico: [
    { mes: "Dezembro 2024", valor: 75.00, status: "pago", vencimento: "2024-12-20" },
    { mes: "Janeiro 2025", valor: 75.00, status: "pendente", vencimento: "2025-01-15" }
  ]
});

// Simulação de APIs externas
export const mockAPIResponses = {
  senatran: {
    consultarCNH: async (numeroCNH: string) => {
      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        numero: numeroCNH,
        situacao: 'ativa',
        validade: '2025-03-15',
        categoria: 'AB',
        pontos: 3,
        restricoes: []
      };
    }
  },
  
  detran: {
    consultarMultas: async (numeroDocumento: string) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return [
        {
          numero: 'MULTA001',
          data_infracao: '2024-12-10',
          valor: 195.23,
          descricao: 'Excesso de velocidade',
          local: 'Av. Brasil, Centro',
          status: 'pendente',
          desconto_prazo: '20% até 10 dias'
        }
      ];
    }
  },
  
  receita: {
    validarMEI: async (cnpj: string) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        cnpj,
        situacao: 'ativo',
        atividade_principal: 'Serviços de entrega',
        faturamento_limite: 81000.00,
        ultima_declaracao: '2024-05-31'
      };
    }
  },
  
  pix: {
    criarPagamento: async (dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        id: `pix_${Date.now()}`,
        status: 'processando',
        valor: dados.valor,
        chave_pix: dados.chave_pix,
        qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      };
    },
    
    criarCobranca: async (dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        id: `cobranca_${Date.now()}`,
        status: 'pendente',
        valor: dados.valor,
        vencimento: dados.vencimento,
        link_pagamento: 'https://pagamento.exemplo.com/abc123'
      };
    }
  },
  
  nfeio: {
    emitirNF: async (dados: any) => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      return {
        numero: `NF${String(Date.now()).slice(-6)}`,
        xml_url: 'https://nfe.exemplo.com/xml/abc123.xml',
        pdf_url: 'https://nfe.exemplo.com/pdf/abc123.pdf',
        status: 'emitida',
        valor: dados.valor
      };
    }
  }
};

// Utilitários para cálculos
export const calcularViabilidadeVaga = (vaga: Vaga, localizacaoEntregador?: { lat: number, lng: number }) => {
  const custoKmMedio = 0.45; // R$ por km
  const distanciaEstimada = 5; // km (seria calculado com GPS real)
  const custoTotal = distanciaEstimada * custoKmMedio;
  const tempoEstimado = 60; // minutos (seria calculado com API de rotas)
  const ganhoPorMinuto = (vaga.valor_entregador - custoTotal) / tempoEstimado;
  
  let viabilidade: 'EXCELENTE' | 'BOA' | 'REGULAR' | 'RUIM';
  if (ganhoPorMinuto > 1.5) viabilidade = 'EXCELENTE';
  else if (ganhoPorMinuto > 1.0) viabilidade = 'BOA';
  else if (ganhoPorMinuto > 0.5) viabilidade = 'REGULAR';
  else viabilidade = 'RUIM';
  
  return {
    viabilidade,
    lucro_liquido: vaga.valor_entregador - custoTotal,
    ganho_por_minuto: ganhoPorMinuto,
    custo_estimado: custoTotal,
    tempo_estimado: tempoEstimado,
    recomendacao: viabilidade === 'EXCELENTE' ? 'Aceite agora!' : 
                  viabilidade === 'BOA' ? 'Boa opção!' :
                  viabilidade === 'REGULAR' ? 'Avalie outras opções' : 'Não recomendado'
  };
};

export const calcularEstatisticasFinanceiras = (receitas: ReceitaExterna[], gastos: GastoEntregador[]) => {
  const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor_total, 0);
  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
  const lucroLiquido = totalReceitas - totalGastos;
  
  const receitasPorApp = receitas.reduce((acc, receita) => {
    if (!acc[receita.app_nome]) {
      acc[receita.app_nome] = { total: 0, entregas: 0 };
    }
    acc[receita.app_nome].total += receita.valor_total;
    acc[receita.app_nome].entregas += receita.numero_entregas || 0;
    return acc;
  }, {} as Record<string, { total: number, entregas: number }>);
  
  const gastosPorCategoria = gastos.reduce((acc, gasto) => {
    if (!acc[gasto.categoria]) {
      acc[gasto.categoria] = 0;
    }
    acc[gasto.categoria] += gasto.valor;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total_receitas: totalReceitas,
    total_gastos: totalGastos,
    lucro_liquido: lucroLiquido,
    receitas_por_app: receitasPorApp,
    gastos_por_categoria: gastosPorCategoria,
    margem_lucro: totalReceitas > 0 ? (lucroLiquido / totalReceitas) * 100 : 0
  };
};