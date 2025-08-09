import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              {trendUp ? (
                <TrendingUp size={16} className="text-success mr-1" />
              ) : (
                <TrendingDown size={16} className="text-danger mr-1" />
              )}
              <span className={`text-sm ${trendUp ? 'text-success' : 'text-danger'}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;