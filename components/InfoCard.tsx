import React from 'react';

interface InfoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  alert?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, subtitle, icon, alert }) => {
  return (
    <div className={`p-4 rounded-xl border ${alert ? 'bg-red-900/20 border-red-500/50' : 'bg-slate-800 border-slate-700'} flex items-start space-x-4`}>
      {icon && <div className="p-2 bg-slate-700 rounded-lg text-emerald-400">{icon}</div>}
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};