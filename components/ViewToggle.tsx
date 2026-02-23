import React from 'react';
import { UtensilsCrossed, ShoppingBasket } from 'lucide-react';

export type ViewMode = 'plan' | 'shopping';

interface ViewToggleProps {
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ active, onChange }) => {
  return (
    <div className="inline-flex bg-theme-elevated rounded-lg p-1">
      <button
        onClick={() => onChange('plan')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
          active === 'plan'
            ? 'bg-theme-card text-theme-text shadow-sm'
            : 'text-theme-muted hover:text-theme-secondary'
        }`}
      >
        <UtensilsCrossed size={14} />
        Plan Semanal
      </button>
      <button
        onClick={() => onChange('shopping')}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
          active === 'shopping'
            ? 'bg-theme-card text-theme-text shadow-sm'
            : 'text-theme-muted hover:text-theme-secondary'
        }`}
      >
        <ShoppingBasket size={14} />
        Lista de Compras
      </button>
    </div>
  );
};
