import React from 'react';
import { 
  DollarSign, 
  FileText, 
  Bike, 
  Briefcase, 
  Target, 
  Gift,
  BarChart3,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

const FuncionalidadesSection = () => {
  const funcionalidades = [
    {
      icon: <DollarSign className="text-success" size={32} />,
      titulo: 'Central Financeira',
      descricao: 'Dashboard unificado com receitas de todos os apps de delivery',
      detalhes: ['Comparativo de performance', 'Metas e projeções', 'Relatórios automáticos']
    },
    {
      icon: <FileText className="text-blue-600" size={32} />,
      titulo: 'Gestão de Documentos',
      descricao: 'Controle total de CNH, multas, licenciamento e MEI',
      detalhes: ['Alertas de vencimento', 'Renovação expressa', 'Consulta automática']
    },
    {
      icon: <Bike className="text-zaggy-orange" size={32} />,
      titulo: 'Minha Moto',
      descricao: 'Monitor de combustível, manutenção e custos operacionais',
      detalhes: ['Postos mais baratos', 'Manutenção preventiva', 'Custo por km']
    },
    {
      icon: <Briefcase className="text-purple-600" size={32} />,
      titulo: 'MEI Organizado',
      descricao: 'Emissão automática de NF, controle de limite e DAS',
      detalhes: ['NF automática', 'Controle de limite', 'Relatórios contábeis']
    },
    {
      icon: <Target className="text-red-500" size={32} />,
      titulo: 'Vagas Zaggy',
      descricao: 'Marketplace exclusivo com vagas de restaurantes parceiros',
      detalhes: ['Sem comissão abusiva', 'Pagamento garantido', 'Trabalho seguro']
    },
    {
      icon: <Gift className="text-accent" size={32} />,
      titulo: 'Ofertas Exclusivas',
      descricao: 'Descontos em combustível, manutenção e alimentação',
      detalhes: ['Baseado na localização', 'Cashback Zaggy', 'Parcerias locais']
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Tudo que Você Precisa em 
            <span className="text-gradient"> Um Só App</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvido especificamente para entregadores brasileiros. 
            Cada funcionalidade pensada para resolver seus problemas reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {funcionalidades.map((func, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {func.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {func.titulo}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {func.descricao}
              </p>
              
              <div className="space-y-2">
                {func.detalhes.map((detalhe, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-zaggy-orange rounded-full"></div>
                    <span className="text-sm text-gray-600">{detalhe}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Resultados Reais dos Nossos Usuários
            </h3>
            <p className="text-lg text-gray-600">
              Dados coletados de mais de 1.000 entregadores ativos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="text-success" size={32} />
              </div>
              <p className="text-3xl font-bold text-success mb-2">+127%</p>
              <p className="text-gray-600">Aumento na produtividade</p>
            </div>
            
            <div className="text-center">
              <div className="bg-zaggy-orange bg-opacity-10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="text-zaggy-orange" size={32} />
              </div>
              <p className="text-3xl font-bold text-zaggy-orange mb-2">R$ 2.340</p>
              <p className="text-gray-600">Economia média mensal</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="text-blue-600" size={32} />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">100%</p>
              <p className="text-gray-600">Documentos em dia</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Zap className="text-purple-600" size={32} />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">4.9⭐</p>
              <p className="text-gray-600">Avaliação na loja</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionalidadesSection;