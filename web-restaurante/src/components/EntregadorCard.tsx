import React from 'react';
import { Star, MapPin, MessageSquare, Phone } from 'lucide-react';

interface Entregador {
  id: string;
  nome: string;
  pontuacao: number;
  online: boolean;
  entregas_hoje: number;
  valor_ganho: number;
  areas: string[];
}

interface EntregadorCardProps {
  entregador: Entregador;
}

const EntregadorCard: React.FC<EntregadorCardProps> = ({ entregador }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-zaggy-orange rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
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
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MessageSquare size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Phone size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Entregas hoje:</span>
          <span className="font-medium">{entregador.entregas_hoje}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ganhos hoje:</span>
          <span className="font-medium text-success">R$ {entregador.valor_ganho.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin size={12} />
          <span>{entregador.areas.join(', ')}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <button className="w-full btn-primary text-sm py-2">
          Convidar para Vaga
        </button>
      </div>
    </div>
  );
};

export default EntregadorCard;