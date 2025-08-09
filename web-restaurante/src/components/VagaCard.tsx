import React from 'react';
import { Clock, Users, Eye, MessageSquare, MoreHorizontal } from 'lucide-react';

interface Vaga {
  id: string;
  tipo: string;
  data: string;
  horario: string;
  valor: number;
  candidatos: number;
  aceites: number;
  vagas_restantes: number;
  status: 'aberta' | 'preenchida' | 'cancelada';
}

interface VagaCardProps {
  vaga: Vaga;
}

const VagaCard: React.FC<VagaCardProps> = ({ vaga }) => {
  const getStatusColor = () => {
    switch (vaga.status) {
      case 'preenchida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = () => {
    switch (vaga.status) {
      case 'preenchida': return 'Preenchida';
      case 'cancelada': return 'Cancelada';
      default: return 'Aberta';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 capitalize">{vaga.tipo}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {vaga.data} • {vaga.horario}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {vaga.aceites}/{vaga.aceites + vaga.vagas_restantes} vagas
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-success">R$ {vaga.valor.toFixed(2)}</p>
          <p className="text-xs text-gray-500">por entregador</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{vaga.candidatos} candidatos</span>
          {vaga.vagas_restantes > 0 && (
            <span className="text-zaggy-orange ml-2">
              • {vaga.vagas_restantes} vaga{vaga.vagas_restantes > 1 ? 's' : ''} restante{vaga.vagas_restantes > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Eye size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MessageSquare size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VagaCard;