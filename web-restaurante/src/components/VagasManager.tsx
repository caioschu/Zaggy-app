import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, Clock, Users, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

interface Vaga {
  id: string;
  tipo: 'avulsa' | 'turno' | 'semanal';
  data_inicio: string;
  data_fim?: string;
  horario_inicio: string;
  horario_fim: string;
  quantidade_entregadores: number;
  valor_entregador: number;
  endereco_retirada: string;
  observacoes?: string;
  status: 'aberta' | 'preenchida' | 'cancelada';
  candidatos: number;
  aceites: number;
  created_at: string;
}

const VagasManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('todas');

  const vagas: Vaga[] = [
    {
      id: '1',
      tipo: 'turno',
      data_inicio: '2024-12-15',
      horario_inicio: '18:00',
      horario_fim: '22:00',
      quantidade_entregadores: 2,
      valor_entregador: 80.00,
      endereco_retirada: 'Av. Brasil, 1234 - Centro',
      observacoes: 'Movimento intenso esperado',
      status: 'preenchida',
      candidatos: 8,
      aceites: 2,
      created_at: '2024-12-15T10:00:00Z'
    },
    {
      id: '2',
      tipo: 'avulsa',
      data_inicio: '2024-12-16',
      horario_inicio: '11:00',
      horario_fim: '15:00',
      quantidade_entregadores: 1,
      valor_entregador: 60.00,
      endereco_retirada: 'Av. Brasil, 1234 - Centro',
      status: 'aberta',
      candidatos: 5,
      aceites: 0,
      created_at: '2024-12-15T08:00:00Z'
    },
    {
      id: '3',
      tipo: 'semanal',
      data_inicio: '2024-12-16',
      data_fim: '2024-12-20',
      horario_inicio: '17:00',
      horario_fim: '23:00',
      quantidade_entregadores: 3,
      valor_entregador: 400.00,
      endereco_retirada: 'Av. Brasil, 1234 - Centro',
      observacoes: 'Semana de promoções',
      status: 'aberta',
      candidatos: 12,
      aceites: 1,
      created_at: '2024-12-14T15:00:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preenchida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preenchida': return 'Preenchida';
      case 'cancelada': return 'Cancelada';
      default: return 'Aberta';
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <ZaggyLogo size="medium" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gestão de Vagas</h1>
                <p className="text-sm text-gray-500">Burger King Centro</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Nova Vaga
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar vagas..."
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {['todas', 'abertas', 'preenchidas', 'canceladas'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === filter
                    ? 'bg-zaggy-orange text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Vagas */}
        <div className="space-y-4">
          {vagas.map((vaga) => (
            <div key={vaga.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      Vaga {vaga.tipo}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vaga.status)}`}>
                      {getStatusText(vaga.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>
                        {vaga.data_fim ? 
                          `${new Date(vaga.data_inicio).toLocaleDateString('pt-BR')} - ${new Date(vaga.data_fim).toLocaleDateString('pt-BR')}` :
                          new Date(vaga.data_inicio).toLocaleDateString('pt-BR')
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{vaga.horario_inicio} - {vaga.horario_fim}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{vaga.quantidade_entregadores} entregador{vaga.quantidade_entregadores > 1 ? 'es' : ''}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{vaga.endereco_retirada}</span>
                  </div>
                  
                  {vaga.observacoes && (
                    <p className="mt-2 text-sm text-gray-600 italic">"{vaga.observacoes}"</p>
                  )}
                </div>

                <div className="text-right ml-6">
                  <p className="text-2xl font-bold text-success">R$ {vaga.valor_entregador.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">por entregador</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total: R$ {(vaga.valor_entregador * vaga.quantidade_entregadores * 1.1).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-gray-600">
                    <strong>{vaga.candidatos}</strong> candidatos
                  </span>
                  <span className="text-gray-600">
                    <strong>{vaga.aceites}</strong> aceites
                  </span>
                  <span className="text-gray-600">
                    <strong>{vaga.quantidade_entregadores - vaga.aceites}</strong> restantes
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-zaggy-orange rounded-lg hover:bg-gray-50">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-zaggy-orange rounded-lg hover:bg-gray-50">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Rápidas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vagas Este Mês</h3>
            <p className="text-3xl font-bold text-zaggy-orange">47</p>
            <p className="text-sm text-gray-600 mt-1">+12% vs mês anterior</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Taxa Preenchimento</h3>
            <p className="text-3xl font-bold text-success">94%</p>
            <p className="text-sm text-gray-600 mt-1">Excelente performance</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gasto Médio/Vaga</h3>
            <p className="text-3xl font-bold text-gray-900">R$ 88</p>
            <p className="text-sm text-gray-600 mt-1">Incluindo sobretaxa</p>
          </div>
        </div>
      </div>

      {/* Modal Criar Vaga */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Criar Nova Vaga</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Vaga
                  </label>
                  <select className="input">
                    <option value="avulsa">Avulsa</option>
                    <option value="turno">Turno</option>
                    <option value="semanal">Semanal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade de Entregadores
                  </label>
                  <input type="number" min="1" className="input" placeholder="1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Início
                  </label>
                  <input type="date" className="input" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Fim (opcional)
                  </label>
                  <input type="date" className="input" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário Início
                  </label>
                  <input type="time" className="input" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário Fim
                  </label>
                  <input type="time" className="input" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor por Entregador
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                  <input type="number" step="0.01" className="input pl-8" placeholder="0,00" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  + 10% sobretaxa Zaggy será adicionada automaticamente
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço de Retirada
                </label>
                <input type="text" className="input" placeholder="Rua, número - Bairro" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações (opcional)
                </label>
                <textarea 
                  className="input h-20 resize-none" 
                  placeholder="Informações adicionais para os entregadores..."
                ></textarea>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="only-favoritos" className="rounded" />
                  <label htmlFor="only-favoritos" className="text-sm text-gray-700">
                    Apenas entregadores favoritos
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Janela de prioridade para favoritos (minutos)
                  </label>
                  <input type="number" className="input" defaultValue="15" min="0" max="60" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button className="btn-primary">
                Publicar Vaga
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VagasManager;