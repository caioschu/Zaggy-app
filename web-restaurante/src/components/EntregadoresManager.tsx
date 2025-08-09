import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Phone, MessageSquare, Heart, UserPlus, MoreHorizontal } from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';

interface Entregador {
  id: string;
  nome: string;
  pontuacao: number;
  online: boolean;
  areas_atuacao: string[];
  entregas_total: number;
  entregas_mes: number;
  valor_ganho_mes: number;
  telefone: string;
  favorito: boolean;
  mei_status: 'ativo' | 'inativo';
  cnh_valida: boolean;
  ultima_atividade: string;
}

const EntregadoresManager = () => {
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const entregadores: Entregador[] = [
    {
      id: '1',
      nome: 'João Silva',
      pontuacao: 4.8,
      online: true,
      areas_atuacao: ['Centro', 'Zona Sul'],
      entregas_total: 247,
      entregas_mes: 45,
      valor_ganho_mes: 1850.00,
      telefone: '(32) 99999-1111',
      favorito: true,
      mei_status: 'ativo',
      cnh_valida: true,
      ultima_atividade: '2024-12-15T14:30:00Z'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      pontuacao: 4.9,
      online: false,
      areas_atuacao: ['Shopping', 'Centro'],
      entregas_total: 189,
      entregas_mes: 38,
      valor_ganho_mes: 1620.00,
      telefone: '(32) 99999-2222',
      favorito: true,
      mei_status: 'ativo',
      cnh_valida: true,
      ultima_atividade: '2024-12-14T22:15:00Z'
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      pontuacao: 4.7,
      online: true,
      areas_atuacao: ['Centro', 'Zona Norte'],
      entregas_total: 156,
      entregas_mes: 32,
      valor_ganho_mes: 1340.00,
      telefone: '(32) 99999-3333',
      favorito: false,
      mei_status: 'ativo',
      cnh_valida: false,
      ultima_atividade: '2024-12-15T13:45:00Z'
    },
    {
      id: '4',
      nome: 'Ana Costa',
      pontuacao: 4.6,
      online: true,
      areas_atuacao: ['Shopping', 'Zona Sul'],
      entregas_total: 203,
      entregas_mes: 41,
      valor_ganho_mes: 1720.00,
      telefone: '(32) 99999-4444',
      favorito: false,
      mei_status: 'inativo',
      cnh_valida: true,
      ultima_atividade: '2024-12-15T15:20:00Z'
    }
  ];

  const entregadoresFiltrados = entregadores.filter(entregador => {
    if (showFavoritesOnly && !entregador.favorito) return false;
    
    switch (selectedFilter) {
      case 'online': return entregador.online;
      case 'favoritos': return entregador.favorito;
      case 'problemas': return !entregador.cnh_valida || entregador.mei_status === 'inativo';
      default: return true;
    }
  });

  const toggleFavorito = (entregadorId: string) => {
    // Implementar toggle favorito
    console.log('Toggle favorito:', entregadorId);
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
                <h1 className="text-xl font-bold text-gray-900">Meus Entregadores</h1>
                <p className="text-sm text-gray-500">Burger King Centro</p>
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <UserPlus size={20} />
              Convidar Entregador
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros e Busca */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar entregadores por nome, área..."
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {[
              { key: 'todos', label: 'Todos' },
              { key: 'online', label: 'Online' },
              { key: 'favoritos', label: 'Favoritos' },
              { key: 'problemas', label: 'Com Problemas' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-zaggy-orange text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Entregadores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {entregadoresFiltrados.map((entregador) => (
            <div key={entregador.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-zaggy-orange rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {entregador.nome.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {entregador.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{entregador.nome}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{entregador.pontuacao}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleFavorito(entregador.id)}
                    className="p-2 rounded-lg hover:bg-gray-50"
                  >
                    <Heart 
                      size={16} 
                      className={entregador.favorito ? 'text-red-500 fill-current' : 'text-gray-400'} 
                    />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  entregador.mei_status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  MEI {entregador.mei_status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  entregador.cnh_valida ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  CNH {entregador.cnh_valida ? 'válida' : 'problema'}
                </span>
                {entregador.online && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Online
                  </span>
                )}
              </div>

              {/* Estatísticas */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Entregas este mês:</span>
                  <span className="font-medium">{entregador.entregas_mes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ganhos este mês:</span>
                  <span className="font-medium text-success">R$ {entregador.valor_ganho_mes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total entregas:</span>
                  <span className="font-medium">{entregador.entregas_total}</span>
                </div>
              </div>

              {/* Áreas de Atuação */}
              <div className="flex items-center gap-1 mb-4 text-sm text-gray-600">
                <MapPin size={12} />
                <span>{entregador.areas_atuacao.join(', ')}</span>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <button className="flex-1 btn-primary text-sm py-2">
                  Convidar para Vaga
                </button>
                <button className="p-2 text-gray-400 hover:text-zaggy-orange rounded-lg hover:bg-gray-50">
                  <MessageSquare size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-zaggy-orange rounded-lg hover:bg-gray-50">
                  <Phone size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas Gerais */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Cadastrados</h3>
            <p className="text-3xl font-bold text-zaggy-orange">{entregadores.length}</p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Favoritos</h3>
            <p className="text-3xl font-bold text-red-500">
              {entregadores.filter(e => e.favorito).length}
            </p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Agora</h3>
            <p className="text-3xl font-bold text-success">
              {entregadores.filter(e => e.online).length}
            </p>
          </div>
          
          <div className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação Média</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {(entregadores.reduce((acc, e) => acc + e.pontuacao, 0) / entregadores.length).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntregadoresManager;