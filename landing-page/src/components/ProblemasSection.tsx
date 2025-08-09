import React from 'react';

const ProblemasSection = () => {
  const problemas = [
    {
      emoji: '💸',
      titulo: 'Receitas Desorganizadas',
      descricao: 'Dinheiro espalhado entre iFood, Rappi, Uber... Sem controle real dos ganhos diários.'
    },
    {
      emoji: '📄',
      titulo: 'Documentos Esquecidos',
      descricao: 'CNH vencida = sem trabalho. Multas acumulando. MEI bagunçado. Stress constante.'
    },
    {
      emoji: '⚖️',
      titulo: 'Riscos Trabalhistas',
      descricao: 'Restaurantes com medo de processo. Você perdendo oportunidades de trabalho.'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Você está cansado de...
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sabemos exatamente os problemas que você enfrenta todo dia. 
            Por isso criamos a solução definitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemas.map((problema, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 text-center">{problema.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {problema.titulo}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {problema.descricao}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Chega de perder tempo e dinheiro! 😤
          </p>
          <p className="text-lg text-gray-600">
            A solução que você precisa está aqui ⬇️
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemasSection;