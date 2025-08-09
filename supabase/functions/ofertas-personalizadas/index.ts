const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface OfertasRequest {
  entregador_id: string;
  localizacao?: {
    latitude: number;
    longitude: number;
  };
  categoria?: string;
  raio_km?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { entregador_id, localizacao, categoria, raio_km = 10 }: OfertasRequest = await req.json();

    if (!entregador_id) {
      return new Response(
        JSON.stringify({ error: 'ID do entregador é obrigatório' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Simular algoritmo de ofertas personalizadas
    const ofertasBase = [
      {
        id: '1',
        categoria: 'combustivel',
        titulo: 'Shell Centro - Desconto Zaggy',
        descricao: 'Gasolina comum e aditivada com desconto exclusivo',
        empresa: 'Shell',
        valor_original: 5.85,
        valor_desconto: 5.27,
        percentual_desconto: 10,
        codigo_promocional: 'ZAGGY10',
        distancia: 300,
        avaliacao: 4.8,
        validade: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 horas
        endereco: 'Av. Brasil, 1234 - Centro'
      },
      {
        id: '2',
        categoria: 'manutencao',
        titulo: 'Oficina do João - Troca de Óleo',
        descricao: 'Troca de óleo sintético + filtro com garantia',
        empresa: 'Oficina do João',
        valor_original: 45.00,
        valor_desconto: 36.00,
        percentual_desconto: 20,
        codigo_promocional: 'OLEO20',
        distancia: 850,
        avaliacao: 4.9,
        validade: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 horas
        endereco: 'Rua das Flores, 567'
      },
      {
        id: '3',
        categoria: 'alimentacao',
        titulo: 'Restaurante Popular - Almoço',
        descricao: 'Prato feito completo com bebida inclusa',
        empresa: 'Restaurante Popular',
        valor_original: 18.00,
        valor_desconto: 14.40,
        percentual_desconto: 20,
        codigo_promocional: 'ALMOCO20',
        distancia: 150,
        avaliacao: 4.6,
        validade: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 horas
        endereco: 'Rua XV de Novembro, 89'
      }
    ];

    // Filtrar por categoria se especificada
    let ofertas = categoria && categoria !== 'todas' ? 
      ofertasBase.filter(o => o.categoria === categoria) : 
      ofertasBase;

    // Filtrar por distância se localização fornecida
    if (localizacao) {
      ofertas = ofertas.filter(o => o.distancia <= raio_km * 1000);
      
      // Ordenar por distância
      ofertas.sort((a, b) => a.distancia - b.distancia);
    }

    // Adicionar score de relevância
    ofertas = ofertas.map(oferta => ({
      ...oferta,
      relevancia_score: calcularRelevancia(oferta, entregador_id),
      cashback_zaggy: Math.round(oferta.valor_desconto * 0.03 * 100) / 100 // 3% cashback
    }));

    // Ordenar por relevância
    ofertas.sort((a, b) => b.relevancia_score - a.relevancia_score);

    return new Response(
      JSON.stringify({
        success: true,
        ofertas,
        total: ofertas.length,
        filtros_aplicados: {
          categoria: categoria || 'todas',
          raio_km,
          localizacao: !!localizacao
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Erro ao buscar ofertas:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro ao buscar ofertas personalizadas',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function calcularRelevancia(oferta: any, entregador_id: string): number {
  let score = 0;
  
  // Desconto (40% do score)
  if (oferta.percentual_desconto >= 20) score += 40;
  else if (oferta.percentual_desconto >= 10) score += 30;
  else score += 20;
  
  // Distância (30% do score)
  if (oferta.distancia <= 500) score += 30;
  else if (oferta.distancia <= 1000) score += 20;
  else score += 10;
  
  // Avaliação (20% do score)
  if (oferta.avaliacao >= 4.8) score += 20;
  else if (oferta.avaliacao >= 4.5) score += 15;
  else score += 10;
  
  // Categoria (10% do score)
  if (oferta.categoria === 'combustivel') score += 10; // Mais relevante
  else if (oferta.categoria === 'alimentacao') score += 8;
  else score += 5;
  
  return score;
}