import React from 'react';
import { CheckCircle, Smartphone } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

const SolucoesSection = () => {
  const solucoes = [
    {
      icon: '💰',
      titulo: 'Central Financeira Multi-Apps',
      descricao: 'Todas suas receitas de iFood, Rappi, Uber em um dashboard único. Compare performance e otimize seus ganhos.',
      beneficios: ['Dashboard unificado', 'Comparativo de apps', 'Metas e projeções']
    },
    {
      icon: '🆔',
      titulo: 'Documentos Sempre em Dia',
      descricao: 'Alertas automáticos para CNH, multas, licenciamento, MEI. Nunca mais perca oportunidades por documento vencido.',
      beneficios: ['Alertas inteligentes', 'Renovação expressa', 'Clínicas próximas']
    },
    {
      icon: '🏍️',
      titulo: 'Gestão Completa da Moto',
      descricao: 'Controle combustível, manutenção, custos. Postos mais baratos na rota e economia real.',
      beneficios: ['Monitor combustível', 'Manutenção preventiva', 'Economia de custos']
    },
    {
      icon: '📋',
      titulo: 'MEI Organizado',
      descricao: 'Nota fiscal automática, relatórios prontos para contabilidade, DAS sempre em dia.',
      beneficios: ['NF automática', 'Relatórios prontos', 'Controle de limite']
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
              A Solução Completa que 
              <span className="text-gradient"> Você Precisava</span>
            </h2>
            
            <div className="space-y-8">
              {solucoes.map((solucao, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-4xl">{solucao.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {solucao.titulo}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {solucao.descricao}
                    </p>
                    <div className="space-y-1">
                      {solucao.beneficios.map((beneficio, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-success" />
                          <span className="text-sm text-gray-600">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <button className="btn-primary flex items-center gap-3 text-lg">
                <Smartphone size={24} />
                Começar Agora - É Grátis!
              </button>
            </div>
          </div>

          {/* App Screenshots */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Screenshot 1 - Dashboard */}
              <div className="bg-gray-900 rounded-2xl p-2 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-light rounded-xl p-3 h-80">
                  <div className="flex items-center gap-2 mb-4">
                    <ZaggyLogo size="small" />
                    <div>
                      <p className="text-xs font-semibold">João Silva</p>
                      <p className="text-xs text-gray-600">Dashboard</p>
                    </div>
                  </div>
                  <div className="bg-zaggy-orange rounded-lg p-3 mb-3">
                    <p className="text-white text-xs font-semibold mb-2">Hoje</p>
                    <p className="text-white text-lg font-bold">R$ 240,30</p>
                    <p className="text-white text-xs opacity-80">22 entregas</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded p-2 flex justify-between text-xs">
                      <span>iFood</span>
                      <span className="font-bold text-success">R$ 127</span>
                    </div>
                    <div className="bg-white rounded p-2 flex justify-between text-xs">
                      <span>Zaggy</span>
                      <span className="font-bold text-success">R$ 85</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot 2 - Documentos */}
              <div className="bg-gray-900 rounded-2xl p-2 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8">
                <div className="bg-light rounded-xl p-3 h-80">
                  <h3 className="font-bold text-sm mb-4">Meus Documentos</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-800">CNH</p>
                      <p className="text-xs text-green-600">Válida até Mar/2025</p>
                      <p className="text-xs text-green-600">✓ 45 dias restantes</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-yellow-800">DAS MEI</p>
                      <p className="text-xs text-yellow-600">Vence em 5 dias</p>
                      <p className="text-xs text-yellow-600">⚠️ R$ 75,00</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-800">Licenciamento</p>
                      <p className="text-xs text-blue-600">Em dia até Fev/2025</p>
                      <p className="text-xs text-blue-600">✓ IPVA pago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg">
              <p className="text-sm font-bold text-zaggy-orange">+127% produtividade</p>
            </div>
            <div className="absolute -bottom-8 right-8 bg-white rounded-full px-4 py-2 shadow-lg">
              <p className="text-sm font-bold text-success">R$ 2.340 economizados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolucoesSection;