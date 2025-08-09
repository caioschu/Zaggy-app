const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface DocumentoCheck {
  entregador_id: string;
  tipo: 'cnh' | 'veiculo' | 'mei';
  numero_documento?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { entregador_id, tipo, numero_documento }: DocumentoCheck = await req.json();

    if (!entregador_id || !tipo) {
      return new Response(
        JSON.stringify({ error: 'Dados obrigatórios faltando' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    let resultado = {};

    switch (tipo) {
      case 'cnh':
        // Simular consulta SENATRAN
        resultado = {
          numero: numero_documento,
          situacao: 'ativa',
          validade: '2025-03-15',
          categoria: 'AB',
          pontos: 3,
          restricoes: [],
          status_check: 'valida'
        };
        break;

      case 'veiculo':
        // Simular consulta DETRAN
        resultado = {
          placa: numero_documento,
          licenciamento: '2025-02-28',
          ipva_status: 'pago',
          multas: [
            {
              numero: 'MULTA001',
              data_infracao: '2024-12-10',
              valor: 195.23,
              descricao: 'Excesso de velocidade',
              status: 'pendente'
            }
          ],
          status_check: 'regular_com_pendencias'
        };
        break;

      case 'mei':
        // Simular consulta Receita Federal
        resultado = {
          cnpj: numero_documento,
          situacao: 'ativo',
          atividade_principal: 'Serviços de entrega',
          faturamento_limite: 81000.00,
          ultima_declaracao: '2024-05-31',
          das_pendentes: 1,
          status_check: 'ativo'
        };
        break;
    }

    // Simular delay da consulta
    await new Promise(resolve => setTimeout(resolve, 1500));

    return new Response(
      JSON.stringify({
        success: true,
        documento: resultado,
        checked_at: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Erro na verificação de documento:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro na verificação do documento',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});