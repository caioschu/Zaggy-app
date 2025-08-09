import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Eye, Filter } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

const FinanceiroRestaurante = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const dadosFinanceiros = {
    mes: {
      gastos_total: 4580.00,
      vagas_criadas: 47,
      entregadores_pagos: 23,
      sobretaxa_zaggy: 458.00,
      economia_vs_apps: 1240.00,
      ticket_medio: 97.45
    },
    semana: {
      gastos_total: 1120.00,
      vagas_criadas: 12,
      entregadores_pagos: 8,
      sobretaxa_zaggy: 112.00,
      economia_vs_apps: 340.00,
      ticket_medio: 93.33
    },
    hoje: {
      gastos_total: 340.00,
      vagas_criadas: 3,
      entregadores_pagos: 8,
      sobretaxa_zaggy: 34.00,
      economia_vs_apps: 85.00,
      ticket_medio: 42.50
    }
  };

  const dados = dadosFinanceiros[selectedPeriod];

  const pagamentosRecentes = [
    {
      id: '1',
      entregador: 'João Silva',
      vaga: 'Turno 18h-22h',
      valor: 80.00,
      sobretaxa: 8.00,
      total: 88.00,
      status: 'pago',
      data: '2024-12-15T20:30:00Z',
      nf_emitida: true
    },
    {
      id: '2',
      entregador: 'Maria Santos',
      vaga: 'Avulsa 11h-15h',
      valor: 60.00,
      sobretaxa: 6.00,
      total: 66.00,
      status: 'processando',
      data: '2024-12-15T15:45:00Z',
      nf_emitida: false
    },
    {
      id: '3',
      entregador: 'Carlos Oliveira',
      vaga: 'Turno 18h-22h',
      valor: 80.00,
      sobretaxa: 8.00,
      total: 88.00,
      status: 'pendente',
      data: '2024-12-15T22:15:00Z',
      nf_emitida: false
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
                <h1 className="text-xl font-bold text-gray-900">Financeiro</h1>
                <p className="text-sm text-gray-500">Burger King Centro</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Download size={16} />
                Exportar
              </button>
              <button className="btn-secondary">
                <Filter size={16} />
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

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gastos Totais</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dados.gastos_total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {dados.vagas_criadas} vagas criadas
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <DollarSign className="text-danger" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sobretaxa Zaggy</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R$ {dados.sobretaxa_zaggy.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  10% sobre pagamentos
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="text-zaggy-orange" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Economia vs Apps</p>
                <p className="text-2xl font-bold text-success mt-1">
                  R$ {dados.economia_vs_apps.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  vs iFood/Rappi/Uber
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingDown className="text-success" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Comparativo com Apps Tradicionais */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Comparativo de Custos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Apps Tradicionais</h3>
              <p className="text-3xl font-bold text-red-600 mb-2">30%</p>
              <p className="text-sm text-gray-600">de comissão média</p>
              <p className="text-lg font-semibold text-red-600 mt-2">
                R$ {(dados.gastos_total * 1.3).toFixed(2)}
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Zaggy</h3>
              <p className="text-3xl font-bold text-success mb-2">10%</p>
              <p className="text-sm text-gray-600">sobretaxa fixa</p>
              <p className="text-lg font-semibold text-success mt-2">
                R$ {dados.gastos_total.toFixed(2)}
              </p>
            </div>
            
            <div className="text-center p-6 bg-zaggy-orange bg-opacity-10 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Sua Economia</h3>
              <p className="text-3xl font-bold text-zaggy-orange mb-2">20%</p>
              <p className="text-sm text-gray-600">menos custos</p>
              <p className="text-lg font-semibold text-zaggy-orange mt-2">
                R$ {dados.economia_vs_apps.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Pagamentos Recentes */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Pagamentos Recentes</h2>
            <button className="text-zaggy-orange font-semibold">Ver todos</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Entregador</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Vaga</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Valor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">NF</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pagamentosRecentes.map((pagamento) => (
                  <tr key={pagamento.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{pagamento.entregador}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{pagamento.vaga}</td>
                    <td className="py-3 px-4">
                      <div className="text-gray-900">R$ {pagamento.valor.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">+ R$ {pagamento.sobretaxa.toFixed(2)} taxa</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      R$ {pagamento.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pagamento.status === 'pago' ? 'bg-green-100 text-green-800' :
                        pagamento.status === 'processando' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {pagamento.status.charAt(0).toUpperCase() + pagamento.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {pagamento.nf_emitida ? (
                        <span className="text-success text-sm">✓ Emitida</span>
                      ) : (
                        <span className="text-warning text-sm">Pendente</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-1 text-gray-400 hover:text-zaggy-orange">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroRestaurante;