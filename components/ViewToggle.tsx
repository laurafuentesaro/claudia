import React from 'react';
import { UtensilsCrossed, ShoppingBasket, BookOpen } from 'lucide-react';

export type ViewMode = 'plan' | 'shopping' | 'recetario';

interface ViewToggleProps {
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const TABS: { mode: ViewMode; label: string; icon: React.ReactNode }[] = [
  { mode: 'plan', label: 'Día a Día', icon: <UtensilsCrossed size={14} /> },
  { mode: 'shopping', label: 'Lista de Compras', icon: <ShoppingBasket size={14} /> },
  { mode: 'recetario', label: 'Recetario', icon: <BookOpen size={14} /> },
];

export const ViewToggle: React.FC<ViewToggleProps> = ({ active, onChange }) => {
  return (
    <div className="inline-flex bg-theme-elevated rounded-lg p-1">
      {TABS.map(({ mode, label, icon }) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
            active === mode
              ? 'bg-theme-card text-theme-text shadow-sm'
              : 'text-theme-muted hover:text-theme-secondary'
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};
