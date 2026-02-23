import React from 'react';
import { Repeat } from 'lucide-react';

interface CookBadgeProps {
  days: number;
}

export const CookBadge: React.FC<CookBadgeProps> = ({ days }) => {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-theme-accent/10 text-theme-accent border border-theme-accent/20">
      <Repeat size={10} />
      Rinde {days} dias
    </span>
  );
};
