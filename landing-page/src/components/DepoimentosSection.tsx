import React from 'react';
import { Star, Quote } from 'lucide-react';

const DepoimentosSection = () => {
  const depoimentos = [
    {
      nome: 'João Silva',
      cidade: 'São Paulo, SP',
      foto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      avaliacao: 5,
      texto: 'Zaggy mudou minha vida! Agora sei exatamente quanto ganho em cada app e nunca mais perco documento. Aumentei meus ganhos em 40% só organizando melhor.',
      ganho_aumento: '+40%'
    },
    {
      nome: 'Maria Santos',
      cidade: 'Rio de Janeiro, RJ',
      foto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      avaliacao: 5,
      texto: 'Antes eu perdia tempo indo em vários postos. Agora o app me mostra o mais barato na rota. Só de combustível economizo R$ 300 por mês!',
      economia: 'R$ 300/mês'
    },
    {
      nome: 'Carlos Oliveira',
      cidade: 'Belo Horizonte, MG',
      foto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      avaliacao: 5,
      texto: 'O MEI organizado automaticamente é sensacional! Minha contadora fica impressionada com os relatórios. Nunca mais atraso o DAS.',
      beneficio: 'MEI em dia'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            O que Nossos 
            <span className="text-gradient"> Entregadores Dizem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 1.000 entregadores já transformaram suas vidas profissionais com o Zaggy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((depoimento, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -top-4 left-8">
                <div className="bg-zaggy-orange rounded-full p-3">
                  <Quote className="text-white" size={24} />
                </div>
              </div>

              <div className="pt-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i <= depoimento.avaliacao ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{depoimento.texto}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={depoimento.foto}
                    alt={depoimento.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{depoimento.nome}</p>
                    <p className="text-sm text-gray-600">{depoimento.cidade}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-zaggy-orange bg-opacity-10 rounded-lg p-3 text-center">
                    <p className="text-zaggy-orange font-bold">
                      {depoimento.ganho_aumento || depoimento.economia || depoimento.beneficio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-zaggy-orange bg-opacity-10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Junte-se a Mais de 1.000 Entregadores Satisfeitos! 🚀
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Baixe grátis e comece a organizar sua vida profissional hoje mesmo
            </p>
            <button className="btn-primary text-lg">
              📱 Baixar Zaggy Grátis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepoimentosSection;