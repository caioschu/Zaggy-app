import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download, 
  FileText,
  Smartphone,
  BarChart3,
  Target,
  Clock,
  MapPin
} from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

const EntregadorDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const dadosFinanceiros = {
    mes: {
      receita_total: 7890.40,
      receita_zaggy: 2340.00,
      receita_ifood: 2890.50,
      receita_rappi: 1450.20,
      receita_uber: 1209.70,
      gastos_total: 1655.60,
      lucro_liquido: 6234.80,
      entregas_total: 156,
      dias_trabalhados: 24,
      horas_trabalhadas: 192,
      km_rodados: 1240
    },
    semana: {
      receita_total: 1847.50,
      receita_zaggy: 580.00,
      receita_ifood: 670.30,
      receita_rappi: 340.20,
      receita_uber: 257.00,
      gastos_total: 391.30,
      lucro_liquido: 1456.20,
      entregas_total: 38,
      dias_trabalhados: 6,
      horas_trabalhadas: 48,
      km_rodados: 290
    },
    hoje: {
      receita_total: 325.80,
      receita_zaggy: 85.50,
      receita_ifood: 127.30,
      receita_rappi: 45.80,
      receita_uber: 67.20,
      gastos_total: 85.50,
      lucro_liquido: 240.30,
      entregas_total: 22,
      dias_trabalhados: 1,
      horas_trabalhadas: 8.5,
      km_rodados: 67
    }
  };

  const dados = dadosFinanceiros[selectedPeriod];

  const vagasZaggyDisponiveis = [
    {
      id: '1',
      restaurante: 'Burger King Centro',
      tipo: 'turno',
      data: 'Hoje',
      horario: '18:00 - 22:00',
      valor: 80.00,
      distancia: 1.2,
      viabilidade: 'EXCELENTE'
    },
    {
      id: '2',
      restaurante: "McDonald's Shopping",
      tipo: 'avulsa',
      data: 'Amanhã',
      horario: '11:00 - 15:00',
      valor: 60.00,
      distancia: 2.8,
      viabilidade: 'BOA'
    }
  ];

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <ZaggyLogo size="medium" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Portal Entregador</h1>
                <p className="text-sm text-gray-500">João Silva</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Smartphone size={16} />
                Baixar App
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Download size={16} />
                Relatórios
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seletor de Período */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 border border-gray-200">
            {[
              { key: 'hoje', label: 'Hoje' },
              { key: 'semana', label: 'Esta Semana' },
              { key: 'mes', label: 'Este Mês' }
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
                  selectedPeriod === period.key
                    ? 'bg-zaggy-orange text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dados.receita_total.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="text-success" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dados.lucro_liquido.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-zaggy-orange bg-opacity-10 rounded-lg">
                <TrendingUp className="text-zaggy-orange" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entregas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dados.entregas_total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Target className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ganho/Hora</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {(dados.lucro_liquido / dados.horas_trabalhadas).toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Clock className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Receitas por App */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Receitas por Aplicativo</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium">iFood</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R$ {dados.receita_ifood.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {((dados.receita_ifood / dados.receita_total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-zaggy-orange rounded-full"></div>
                    <span className="font-medium">Zaggy</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R$ {dados.receita_zaggy.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {((dados.receita_zaggy / dados.receita_total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span className="font-medium">Rappi</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R$ {dados.receita_rappi.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {((dados.receita_rappi / dados.receita_total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <span className="font-medium">Uber Eats</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R$ {dados.receita_uber.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {((dados.receita_uber / dados.receita_total) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vagas Zaggy Disponíveis */}
          <div>
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Vagas Zaggy</h2>
              
              <div className="space-y-4">
                {vagasZaggyDisponiveis.map((vaga) => (
                  <div key={vaga.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{vaga.restaurante}</h3>
                        <p className="text-sm text-gray-600">{vaga.data} • {vaga.horario}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vaga.viabilidade === 'EXCELENTE' ? 'bg-green-100 text-green-800' :
                        vaga.viabilidade === 'BOA' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vaga.viabilidade}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-success">R$ {vaga.valor.toFixed(2)}</span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={12} />
                        <span>{vaga.distancia}km</span>
                      </div>
                    </div>
                    
                    <button className="w-full btn-primary text-sm py-2">
                      Aceitar Vaga
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Relatórios Detalhados */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Relatórios Detalhados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <BarChart3 size={32} className="text-zaggy-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Performance Mensal</h3>
              <p className="text-sm text-gray-600 mb-4">
                Análise completa de receitas, gastos e produtividade
              </p>
              <button className="btn-primary w-full text-sm">
                Gerar Relatório
              </button>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FileText size={32} className="text-zaggy-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Relatório MEI</h3>
              <p className="text-sm text-gray-600 mb-4">
                Dados organizados para sua contabilidade
              </p>
              <button className="btn-primary w-full text-sm">
                Baixar PDF
              </button>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Calendar size={32} className="text-zaggy-orange mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Histórico Anual</h3>
              <p className="text-sm text-gray-600 mb-4">
                Todos os dados de 2024 para Imposto de Renda
              </p>
              <button className="btn-primary w-full text-sm">
                Exportar Excel
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas Avançadas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Médio</h3>
            <p className="text-2xl font-bold text-zaggy-orange">
              R$ {(dados.receita_total / dados.entregas_total).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-1">por entrega</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Custo por KM</h3>
            <p className="text-2xl font-bold text-gray-900">
              R$ {(dados.gastos_total / dados.km_rodados).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-1">média operacional</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Margem Lucro</h3>
            <p className="text-2xl font-bold text-success">
              {((dados.lucro_liquido / dados.receita_total) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 mt-1">líquida</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Produtividade</h3>
            <p className="text-2xl font-bold text-blue-600">
              {(dados.entregas_total / dados.horas_trabalhadas).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 mt-1">entregas/hora</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntregadorDashboard;