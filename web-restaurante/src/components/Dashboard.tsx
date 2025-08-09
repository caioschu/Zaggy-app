import React from 'react';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Plus,
  Eye,
  MessageSquare
} from 'lucide-react';
import ZaggyLogo from './ZaggyLogo';
import StatsCard from './StatsCard';
import VagaCard from './VagaCard';
import EntregadorCard from './EntregadorCard';

const Dashboard = () => {
  const dadosHoje = {
    vagas_ativas: 3,
    entregadores_trabalhando: 8,
    gastos_total: 340.00,
    entregas_concluidas: 23,
    receita_estimada: 1240.00
  };

  const entregadoresFavoritos = [
    { 
      id: '1',
      nome: "João Silva", 
      pontuacao: 4.8, 
      online: true,
      entregas_hoje: 6,
      valor_ganho: 85.50,
      areas: ['Centro', 'Zona Sul']
    },
    { 
      id: '2',
      nome: "Maria Santos", 
      pontuacao: 4.9, 
      online: false,
      entregas_hoje: 0,
      valor_ganho: 0,
      areas: ['Shopping', 'Centro']
    },
    { 
      id: '3',
      nome: "Carlos Oliveira", 
      pontuacao: 4.7, 
      online: true,
      entregas_hoje: 4,
      valor_ganho: 67.20,
      areas: ['Centro', 'Zona Norte']
    }
  ];

  const vagasAtivas = [
    {
      id: '1',
      tipo: 'turno',
      data: 'Hoje',
      horario: '18:00 - 22:00',
      valor: 80.00,
      candidatos: 5,
      aceites: 2,
      vagas_restantes: 0,
      status: 'preenchida'
    },
    {
      id: '2',
      tipo: 'avulsa',
      data: 'Amanhã',
      horario: '11:00 - 15:00',
      valor: 60.00,
      candidatos: 3,
      aceites: 0,
      vagas_restantes: 1,
      status: 'aberta'
    },
    {
      id: '3',
      tipo: 'semanal',
      data: 'Seg-Sex',
      horario: '17:00 - 23:00',
      valor: 400.00,
      candidatos: 8,
      aceites: 1,
      vagas_restantes: 1,
      status: 'aberta'
    }
  ];

  const alertas = [
    { tipo: 'warning', mensagem: '5 NFs pendentes de emissão', acao: 'Emitir agora' },
    { tipo: 'info', mensagem: '2 vagas vencem hoje às 18h', acao: 'Verificar' },
    { tipo: 'success', mensagem: 'Pagamentos processados com sucesso', acao: 'Ver detalhes' }
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
                <h1 className="text-xl font-bold text-gray-900">Burger King Centro</h1>
                <p className="text-sm text-gray-500">Dashboard Restaurante</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn-secondary">
                <MessageSquare size={20} />
                Suporte
              </button>
              <div className="w-8 h-8 bg-zaggy-orange rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">BK</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alertas */}
        {alertas.length > 0 && (
          <div className="mb-8 space-y-3">
            {alertas.map((alerta, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  alerta.tipo === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  alerta.tipo === 'info' ? 'bg-blue-50 border-blue-200' :
                  'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {alerta.tipo === 'warning' && <AlertTriangle size={20} className="text-warning" />}
                  {alerta.tipo === 'info' && <Clock size={20} className="text-blue-500" />}
                  {alerta.tipo === 'success' && <CheckCircle size={20} className="text-success" />}
                  <span className="text-gray-800">{alerta.mensagem}</span>
                </div>
                <button className="text-zaggy-orange font-semibold hover:text-zaggy-orange-dark">
                  {alerta.acao}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Vagas Ativas"
            value={dadosHoje.vagas_ativas}
            icon={<Briefcase className="text-zaggy-orange" />}
            trend="+2 desde ontem"
            trendUp={true}
          />
          <StatsCard
            title="Entregadores Trabalhando"
            value={dadosHoje.entregadores_trabalhando}
            icon={<Users className="text-success" />}
            trend="5 online agora"
            trendUp={true}
          />
          <StatsCard
            title="Gastos Hoje"
            value={`R$ ${dadosHoje.gastos_total.toFixed(2)}`}
            icon={<DollarSign className="text-danger" />}
            trend="-15% vs ontem"
            trendUp={false}
          />
          <StatsCard
            title="Entregas Concluídas"
            value={dadosHoje.entregas_concluidas}
            icon={<TrendingUp className="text-success" />}
            trend="+8 desde manhã"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vagas Ativas */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Vagas Ativas</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Plus size={20} />
                  Nova Vaga
                </button>
              </div>
              
              <div className="space-y-4">
                {vagasAtivas.map((vaga) => (
                  <VagaCard key={vaga.id} vaga={vaga} />
                ))}
              </div>
            </div>
          </div>

          {/* Entregadores Favoritos */}
          <div>
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Meus Entregadores</h2>
                <button className="text-zaggy-orange font-semibold">Ver todos</button>
              </div>
              
              <div className="space-y-4">
                {entregadoresFavoritos.map((entregador) => (
                  <EntregadorCard key={entregador.id} entregador={entregador} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance dos Últimos 7 Dias</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Gráfico de performance será implementado aqui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;