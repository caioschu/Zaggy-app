const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface PaymentRequest {
  vaga_aceite_id: string;
  valor_entregador: number;
  valor_sobretaxa: number;
  pix_entregador: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { vaga_aceite_id, valor_entregador, valor_sobretaxa, pix_entregador }: PaymentRequest = await req.json();

    // Validar dados
    if (!vaga_aceite_id || !valor_entregador || !pix_entregador) {
      return new Response(
        JSON.stringify({ error: 'Dados obrigatórios faltando' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Simular processamento de pagamento PIX
    const payment_id = `pix_${Date.now()}`;
    
    // Em produção, aqui seria integração com:
    // - Banco Central (PIX)
    // - Gateway de pagamento
    // - Sistema bancário

    const paymentResult = {
      id: payment_id,
      status: 'processando',
      valor_entregador,
      valor_sobretaxa,
      valor_total: valor_entregador + valor_sobretaxa,
      pix_entregador,
      created_at: new Date().toISOString(),
      estimated_completion: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutos
    };

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    return new Response(
      JSON.stringify({
        success: true,
        payment: paymentResult,
        message: 'Pagamento iniciado com sucesso'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Erro no processamento de pagamento:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});