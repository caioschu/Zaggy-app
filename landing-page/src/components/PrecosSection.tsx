import React from 'react';
import { Check, Smartphone, Users, Zap } from 'lucide-react';

const PrecosSection = () => {
  const planos = [
    {
      nome: 'Entregador',
      preco: 'Grátis',
      periodo: 'para sempre',
      descricao: 'Tudo que você precisa para organizar sua vida profissional',
      cor: 'zaggy-orange',
      popular: true,
      funcionalidades: [
        'Central financeira multi-apps',
        'Controle de documentos',
        'Gestão completa da moto',
        'MEI organizado',
        'Ofertas exclusivas',
        'Suporte via WhatsApp',
        'Relatórios ilimitados',
        'Alertas inteligentes'
      ],
      cta: 'Baixar Grátis',
      icon: <Smartphone size={32} />
    },
    {
      nome: 'Restaurante',
      preco: 'R$ 10',
      periodo: 'por vaga + entregador',
      descricao: 'Plataforma completa para gestão de entregadores',
      cor: 'blue-600',
      popular: false,
      funcionalidades: [
        'Dashboard de gestão',
        'Criação de vagas',
        'Pagamentos automáticos',
        'Nota fiscal automática',
        'Entregadores favoritos',
        'Relatórios financeiros',
        'Suporte prioritário',
        'API para integração'
      ],
      cta: 'Começar Teste Grátis',
      icon: <Users size={32} />
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Preços Justos e 
            <span className="text-gradient"> Transparentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sem pegadinhas, sem taxas escondidas. Você sabe exatamente o que paga.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {planos.map((plano, index) => (
            <div 
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-xl relative transform hover:scale-105 transition-all duration-300 ${
                plano.popular ? 'ring-4 ring-zaggy-orange ring-opacity-20' : ''
              }`}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-zaggy-orange text-white px-6 py-2 rounded-full text-sm font-bold">
                    ⭐ MAIS POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`bg-${plano.cor} bg-opacity-10 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center`}>
                  <div className={`text-${plano.cor}`}>
                    {plano.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plano.nome}</h3>
                <p className="text-gray-600 mb-6">{plano.descricao}</p>
                
                <div className="mb-6">
                  <span className={`text-5xl font-black text-${plano.cor}`}>
                    {plano.preco}
                  </span>
                  <span className="text-lg text-gray-600 ml-2">
                    {plano.periodo}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plano.funcionalidades.map((func, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`bg-${plano.cor} bg-opacity-10 rounded-full p-1`}>
                      <Check className={`text-${plano.cor}`} size={16} />
                    </div>
                    <span className="text-gray-700">{func}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                plano.popular 
                  ? 'bg-zaggy-orange text-white hover:bg-zaggy-orange-dark shadow-lg hover:shadow-xl' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}>
                {plano.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Comparativo com Concorrentes */}
        <div className="mt-20 bg-white rounded-3xl p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare com os Apps Tradicionais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-red-50 rounded-xl">
              <h4 className="text-xl font-bold text-red-600 mb-4">Apps Tradicionais</h4>
              <div className="space-y-3">
                <p className="text-red-600">❌ 30% de comissão</p>
                <p className="text-red-600">❌ Sem controle financeiro</p>
                <p className="text-red-600">❌ Documentos por conta própria</p>
                <p className="text-red-600">❌ Sem suporte real</p>
              </div>
            </div>
            
            <div className="text-center p-6 bg-zaggy-orange bg-opacity-10 rounded-xl ring-4 ring-zaggy-orange ring-opacity-20">
              <h4 className="text-xl font-bold text-zaggy-orange mb-4">Zaggy</h4>
              <div className="space-y-3">
                <p className="text-zaggy-orange">✅ 10% sobretaxa justa</p>
                <p className="text-zaggy-orange">✅ Central financeira completa</p>
                <p className="text-zaggy-orange">✅ Documentos organizados</p>
                <p className="text-zaggy-orange">✅ Suporte especializado</p>
              </div>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <h4 className="text-xl font-bold text-success mb-4">Sua Economia</h4>
              <div className="space-y-3">
                <p className="text-success">💰 R$ 2.340/mês</p>
                <p className="text-success">⏰ 15h/semana</p>
                <p className="text-success">📈 +127% produtividade</p>
                <p className="text-success">😌 Menos stress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrecosSection;