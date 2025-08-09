import { ReceitaExterna, GastoEntregador, Vaga } from '../types';

// Constantes para cálculos
export const CONSTANTS = {
  CUSTO_KM_MEDIO: 0.45, // R$ por km
  VELOCIDADE_MEDIA_URBANA: 25, // km/h
  CONSUMO_MEDIO_MOTO: 15.6, // km/L
  SOBRETAXA_ZAGGY: 0.10, // 10%
  LIMITE_MEI_ANUAL: 81000.00, // R$
  VALOR_DAS_MEI: 75.00, // R$
};

export interface ViabilidadeVaga {
  viabilidade: 'EXCELENTE' | 'BOA' | 'REGULAR' | 'RUIM';
  lucro_liquido: number;
  ganho_por_minuto: number;
  custo_estimado: number;
  tempo_estimado: number;
  recomendacao: string;
  score: number; // 0-100
}

export const calcularViabilidadeVaga = (
  vaga: Vaga, 
  localizacaoEntregador?: { lat: number, lng: number }
): ViabilidadeVaga => {
  // Distância estimada (seria calculada com GPS real)
  const distanciaEstimada = localizacaoEntregador ? 
    calcularDistanciaGPS(localizacaoEntregador, {
      lat: vaga.endereco_retirada.latitude || -21.7642,
      lng: vaga.endereco_retirada.longitude || -43.3467
    }) : 5; // 5km default
  
  const custoTotal = distanciaEstimada * CONSTANTS.CUSTO_KM_MEDIO;
  const tempoEstimado = (distanciaEstimada / CONSTANTS.VELOCIDADE_MEDIA_URBANA) * 60; // minutos
  const lucroLiquido = vaga.valor_entregador - custoTotal;
  const ganhoPorMinuto = lucroLiquido / tempoEstimado;
  
  // Score baseado em múltiplos fatores
  let score = 0;
  
  // Ganho por minuto (40% do score)
  if (ganhoPorMinuto > 1.5) score += 40;
  else if (ganhoPorMinuto > 1.0) score += 30;
  else if (ganhoPorMinuto > 0.5) score += 20;
  else score += 10;
  
  // Distância (30% do score)
  if (distanciaEstimada < 2) score += 30;
  else if (distanciaEstimada < 5) score += 20;
  else if (distanciaEstimada < 10) score += 10;
  
  // Valor absoluto (20% do score)
  if (vaga.valor_entregador > 80) score += 20;
  else if (vaga.valor_entregador > 60) score += 15;
  else if (vaga.valor_entregador > 40) score += 10;
  else score += 5;
  
  // Duração do turno (10% do score)
  const duracaoTurno = calcularDuracaoTurno(vaga.horario_inicio, vaga.horario_fim);
  if (duracaoTurno >= 4 && duracaoTurno <= 6) score += 10;
  else if (duracaoTurno >= 2) score += 5;
  
  let viabilidade: ViabilidadeVaga['viabilidade'];
  let recomendacao: string;
  
  if (score >= 80) {
    viabilidade = 'EXCELENTE';
    recomendacao = 'Aceite agora! Excelente oportunidade!';
  } else if (score >= 60) {
    viabilidade = 'BOA';
    recomendacao = 'Boa opção! Vale a pena aceitar.';
  } else if (score >= 40) {
    viabilidade = 'REGULAR';
    recomendacao = 'Avalie outras opções antes de aceitar.';
  } else {
    viabilidade = 'RUIM';
    recomendacao = 'Não recomendado. Procure outras vagas.';
  }
  
  return {
    viabilidade,
    lucro_liquido: lucroLiquido,
    ganho_por_minuto: ganhoPorMinuto,
    custo_estimado: custoTotal,
    tempo_estimado: tempoEstimado,
    recomendacao,
    score
  };
};

export const calcularDistanciaGPS = (
  ponto1: { lat: number, lng: number }, 
  ponto2: { lat: number, lng: number }
): number => {
  const R = 6371; // Raio da Terra em km
  const dLat = (ponto2.lat - ponto1.lat) * Math.PI / 180;
  const dLng = (ponto2.lng - ponto1.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(ponto1.lat * Math.PI / 180) * Math.cos(ponto2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calcularDuracaoTurno = (inicio: string, fim: string): number => {
  const [inicioHora, inicioMinuto] = inicio.split(':').map(Number);
  const [fimHora, fimMinuto] = fim.split(':').map(Number);
  
  const inicioMinutos = inicioHora * 60 + inicioMinuto;
  const fimMinutos = fimHora * 60 + fimMinuto;
  
  return (fimMinutos - inicioMinutos) / 60; // retorna em horas
};

export const calcularEstatisticasReceitas = (receitas: ReceitaExterna[]) => {
  if (receitas.length === 0) {
    return {
      total: 0,
      media_diaria: 0,
      melhor_app: null,
      total_entregas: 0,
      ticket_medio: 0
    };
  }
  
  const total = receitas.reduce((acc, receita) => acc + receita.valor_total, 0);
  const totalEntregas = receitas.reduce((acc, receita) => acc + (receita.numero_entregas || 0), 0);
  
  // Agrupar por app
  const porApp = receitas.reduce((acc, receita) => {
    if (!acc[receita.app_nome]) {
      acc[receita.app_nome] = { total: 0, entregas: 0 };
    }
    acc[receita.app_nome].total += receita.valor_total;
    acc[receita.app_nome].entregas += receita.numero_entregas || 0;
    return acc;
  }, {} as Record<string, { total: number, entregas: number }>);
  
  // Encontrar melhor app
  const melhorApp = Object.entries(porApp).reduce((melhor, [app, dados]) => {
    return dados.total > melhor.total ? { app, total: dados.total } : melhor;
  }, { app: '', total: 0 });
  
  // Calcular dias únicos
  const diasUnicos = new Set(receitas.map(r => r.data_trabalho)).size;
  
  return {
    total,
    media_diaria: total / diasUnicos,
    melhor_app: melhorApp.app || null,
    total_entregas: totalEntregas,
    ticket_medio: totalEntregas > 0 ? total / totalEntregas : 0,
    por_app: porApp
  };
};

export const calcularEstatisticasGastos = (gastos: GastoEntregador[]) => {
  if (gastos.length === 0) {
    return {
      total: 0,
      por_categoria: {},
      media_diaria: 0,
      deducoes_ir: 0
    };
  }
  
  const total = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
  
  const porCategoria = gastos.reduce((acc, gasto) => {
    if (!acc[gasto.categoria]) {
      acc[gasto.categoria] = 0;
    }
    acc[gasto.categoria] += gasto.valor;
    return acc;
  }, {} as Record<string, number>);
  
  const deducoesIR = gastos
    .filter(gasto => gasto.deducao_ir)
    .reduce((acc, gasto) => acc + gasto.valor, 0);
  
  const diasUnicos = new Set(gastos.map(g => g.data_gasto)).size;
  
  return {
    total,
    por_categoria: porCategoria,
    media_diaria: total / diasUnicos,
    deducoes_ir: deducoesIR
  };
};

export const calcularProjecaoMEI = (faturamentoAtual: number, mesAtual: number) => {
  const mesesRestantes = 12 - mesAtual;
  const mediaFaturamentoMensal = faturamentoAtual / mesAtual;
  const projecaoAnual = faturamentoAtual + (mediaFaturamentoMensal * mesesRestantes);
  
  const percentualLimite = (projecaoAnual / CONSTANTS.LIMITE_MEI_ANUAL) * 100;
  const risco = percentualLimite > 100 ? 'ALTO' : 
                percentualLimite > 90 ? 'MÉDIO' : 'BAIXO';
  
  return {
    projecao_anual: projecaoAnual,
    percentual_limite: percentualLimite,
    valor_restante: CONSTANTS.LIMITE_MEI_ANUAL - projecaoAnual,
    risco_ultrapassar: risco,
    media_mensal: mediaFaturamentoMensal,
    meses_restantes: mesesRestantes
  };
};

export const calcularCombustivel = (nivelAtual: number, consumoMedio: number, capacidadeTanque: number = 15) => {
  const litrosRestantes = (nivelAtual / 100) * capacidadeTanque;
  const kmRestantes = litrosRestantes * consumoMedio;
  
  let status: 'critico' | 'atencao' | 'ok';
  if (nivelAtual < 20) status = 'critico';
  else if (nivelAtual < 40) status = 'atencao';
  else status = 'ok';
  
  return {
    litros_restantes: litrosRestantes,
    km_restantes: Math.floor(kmRestantes),
    status,
    recomendacao: status === 'critico' ? 'Abasteça imediatamente!' :
                  status === 'atencao' ? 'Considere abastecer em breve' :
                  'Nível adequado'
  };
};

export const calcularEconomiaRota = (vagas: Vaga[], localizacaoAtual: { lat: number, lng: number }) => {
  if (vagas.length < 2) return null;
  
  // Calcular distância individual para cada vaga
  const distanciasIndividuais = vagas.map(vaga => {
    const distanciaIda = calcularDistanciaGPS(localizacaoAtual, {
      lat: vaga.endereco_retirada.latitude || -21.7642,
      lng: vaga.endereco_retirada.longitude || -43.3467
    });
    const distanciaVolta = distanciaIda; // Assumindo volta ao ponto inicial
    return distanciaIda + distanciaVolta;
  });
  
  const distanciaTotalIndividual = distanciasIndividuais.reduce((acc, dist) => acc + dist, 0);
  
  // Calcular rota otimizada (simplificado)
  const distanciaOtimizada = distanciaTotalIndividual * 0.7; // 30% de economia estimada
  
  const economiaKm = distanciaTotalIndividual - distanciaOtimizada;
  const economiaCombustivel = economiaKm / CONSTANTS.CONSUMO_MEDIO_MOTO;
  const economiaReais = economiaKm * CONSTANTS.CUSTO_KM_MEDIO;
  
  return {
    economia_km: economiaKm,
    economia_combustivel: economiaCombustivel,
    economia_reais: economiaReais,
    distancia_original: distanciaTotalIndividual,
    distancia_otimizada: distanciaOtimizada,
    percentual_economia: (economiaKm / distanciaTotalIndividual) * 100
  };
};

export const calcularMetricas = (receitas: ReceitaExterna[], gastos: GastoEntregador[]) => {
  const estatisticasReceitas = calcularEstatisticasReceitas(receitas);
  const estatisticasGastos = calcularEstatisticasGastos(gastos);
  
  const lucroLiquido = estatisticasReceitas.total - estatisticasGastos.total;
  const margemLucro = estatisticasReceitas.total > 0 ? 
    (lucroLiquido / estatisticasReceitas.total) * 100 : 0;
  
  // ROI (Return on Investment)
  const roi = estatisticasGastos.total > 0 ? 
    (lucroLiquido / estatisticasGastos.total) * 100 : 0;
  
  // Eficiência (receita por entrega)
  const eficiencia = estatisticasReceitas.total_entregas > 0 ?
    estatisticasReceitas.total / estatisticasReceitas.total_entregas : 0;
  
  return {
    receitas: estatisticasReceitas,
    gastos: estatisticasGastos,
    lucro_liquido: lucroLiquido,
    margem_lucro: margemLucro,
    roi,
    eficiencia,
    custo_por_entrega: estatisticasReceitas.total_entregas > 0 ?
      estatisticasGastos.total / estatisticasReceitas.total_entregas : 0
  };
};

export const calcularProjetarReceita = (
  receitasHistoricas: ReceitaExterna[],
  diasProjecao: number
) => {
  if (receitasHistoricas.length === 0) return 0;
  
  // Calcular média dos últimos 30 dias
  const ultimosTrintaDias = receitasHistoricas.filter(receita => {
    const dataReceita = new Date(receita.data_trabalho);
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
    return dataReceita >= trintaDiasAtras;
  });
  
  const mediaDiaria = ultimosTrintaDias.length > 0 ?
    ultimosTrintaDias.reduce((acc, receita) => acc + receita.valor_total, 0) / ultimosTrintaDias.length :
    0;
  
  return mediaDiaria * diasProjecao;
};

export const analisarTendencias = (receitas: ReceitaExterna[], periodo: number = 30) => {
  if (receitas.length < 2) return null;
  
  const agora = new Date();
  const dataCorte = new Date();
  dataCorte.setDate(agora.getDate() - periodo);
  
  const receitasRecentes = receitas.filter(receita => 
    new Date(receita.data_trabalho) >= dataCorte
  );
  
  if (receitasRecentes.length < 2) return null;
  
  // Agrupar por semana
  const receitasPorSemana = receitasRecentes.reduce((acc, receita) => {
    const data = new Date(receita.data_trabalho);
    const semana = getWeekNumber(data);
    
    if (!acc[semana]) {
      acc[semana] = 0;
    }
    acc[semana] += receita.valor_total;
    return acc;
  }, {} as Record<number, number>);
  
  const semanas = Object.keys(receitasPorSemana).map(Number).sort();
  if (semanas.length < 2) return null;
  
  const primeiraSemana = receitasPorSemana[semanas[0]];
  const ultimaSemana = receitasPorSemana[semanas[semanas.length - 1]];
  
  const crescimento = ((ultimaSemana - primeiraSemana) / primeiraSemana) * 100;
  
  return {
    crescimento_percentual: crescimento,
    tendencia: crescimento > 5 ? 'CRESCENDO' : 
               crescimento < -5 ? 'DECRESCENDO' : 'ESTÁVEL',
    primeira_semana: primeiraSemana,
    ultima_semana: ultimaSemana,
    media_semanal: Object.values(receitasPorSemana).reduce((acc, val) => acc + val, 0) / semanas.length
  };
};

const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

export const calcularCustoOperacional = (gastos: GastoEntregador[], kmRodados: number) => {
  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
  const custoPorKm = kmRodados > 0 ? totalGastos / kmRodados : 0;
  
  const gastosPorCategoria = gastos.reduce((acc, gasto) => {
    if (!acc[gasto.categoria]) {
      acc[gasto.categoria] = 0;
    }
    acc[gasto.categoria] += gasto.valor;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    custo_total: totalGastos,
    custo_por_km: custoPorKm,
    por_categoria: gastosPorCategoria,
    percentual_combustivel: gastosPorCategoria.combustivel ? 
      (gastosPorCategoria.combustivel / totalGastos) * 100 : 0,
    percentual_manutencao: gastosPorCategoria.manutencao ? 
      (gastosPorCategoria.manutencao / totalGastos) * 100 : 0
  };
};

export const calcularMetaDiaria = (metaMensal: number, diasUteis: number) => {
  return metaMensal / diasUteis;
};

export const calcularProgressoMeta = (valorAtual: number, meta: number) => {
  const progresso = (valorAtual / meta) * 100;
  return {
    percentual: Math.min(progresso, 100),
    valor_restante: Math.max(meta - valorAtual, 0),
    status: progresso >= 100 ? 'ATINGIDA' :
            progresso >= 80 ? 'PRÓXIMO' :
            progresso >= 50 ? 'NO_CAMINHO' : 'DISTANTE'
  };
};

// Funções específicas para MEI
export const calcularImpostosMEI = (faturamento: number) => {
  // MEI tem valor fixo independente do faturamento
  return {
    inss: 66.00,
    icms: 1.00,
    iss: 5.00,
    total: 75.00,
    percentual_faturamento: faturamento > 0 ? (75.00 / faturamento) * 100 : 0
  };
};

export const verificarLimiteMEI = (faturamentoAtual: number, mesAtual: number) => {
  const projecao = calcularProjecaoMEI(faturamentoAtual, mesAtual);
  
  return {
    dentro_limite: projecao.projecao_anual <= CONSTANTS.LIMITE_MEI_ANUAL,
    percentual_usado: (faturamentoAtual / CONSTANTS.LIMITE_MEI_ANUAL) * 100,
    valor_disponivel: CONSTANTS.LIMITE_MEI_ANUAL - faturamentoAtual,
    projecao_anual: projecao.projecao_anual,
    risco: projecao.risco_ultrapassar
  };
};