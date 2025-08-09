const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface NotaFiscalRequest {
  payment_id: string;
  tipo: 'entregador_para_empresa' | 'plataforma_para_empresa';
  valor: number;
  cnpj_tomador: string;
  descricao_servico: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { payment_id, tipo, valor, cnpj_tomador, descricao_servico }: NotaFiscalRequest = await req.json();

    // Validar dados
    if (!payment_id || !valor || !cnpj_tomador) {
      return new Response(
        JSON.stringify({ error: 'Dados obrigatórios faltando' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Simular emissão de NF
    const nf_numero = `NF${String(Date.now()).slice(-6)}`;
    
    // Em produção, aqui seria integração com:
    // - NFe.io
    // - Focus NFe
    // - Prefeitura local
    // - Sistema de NF-e

    const notaFiscal = {
      numero: nf_numero,
      serie: '001',
      valor,
      cnpj_tomador,
      descricao_servico: descricao_servico || 'Serviços de entrega',
      data_emissao: new Date().toISOString(),
      status: 'emitida',
      xml_url: `https://nfe.zaggy.com.br/xml/${nf_numero}.xml`,
      pdf_url: `https://nfe.zaggy.com.br/pdf/${nf_numero}.pdf`,
      chave_acesso: `35${Date.now()}${Math.random().toString().slice(2, 10)}`
    };

    // Simular delay de emissão
    await new Promise(resolve => setTimeout(resolve, 3000));

    return new Response(
      JSON.stringify({
        success: true,
        nota_fiscal: notaFiscal,
        message: 'Nota fiscal emitida com sucesso'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Erro na emissão de NF:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro na emissão da nota fiscal',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});