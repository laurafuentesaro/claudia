import React from 'react';

interface CaloriesSummaryProps {
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export const CaloriesSummary: React.FC<CaloriesSummaryProps> = ({
  targetCalories,
  macros,
}) => {
  const proteinPercent = Math.round((macros.protein * 4 / targetCalories) * 100);
  const carbsPercent = Math.round((macros.carbs * 4 / targetCalories) * 100);
  const fatPercent = Math.round((macros.fat * 9 / targetCalories) * 100);

  return (
    <div className="bg-theme-card border border-theme-border rounded-lg p-5 transition-colors">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <div className="text-3xl font-semibold text-theme-text tracking-tight">
            {targetCalories.toLocaleString()}
            <span className="text-theme-accent ml-1 text-lg font-normal">kcal</span>
          </div>
          <div className="text-sm text-theme-faint mt-1">
            objetivo del dia
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 border border-theme-border rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-theme-accent shrink-0" />
            <span className="text-lg font-medium text-theme-text">{macros.protein}g</span>
          </div>
          <div className="text-xs text-theme-muted mt-1 ml-4">Proteina</div>
          <div className="text-xs text-theme-faint ml-4">{proteinPercent}%</div>
        </div>
        <div className="flex-1 border border-theme-border rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-theme-muted shrink-0" />
            <span className="text-lg font-medium text-theme-text">{macros.carbs}g</span>
          </div>
          <div className="text-xs text-theme-muted mt-1 ml-4">Carbos</div>
          <div className="text-xs text-theme-faint ml-4">{carbsPercent}%</div>
        </div>
        <div className="flex-1 border border-theme-border rounded-lg px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-theme-faint shrink-0" />
            <span className="text-lg font-medium text-theme-text">{macros.fat}g</span>
          </div>
          <div className="text-xs text-theme-muted mt-1 ml-4">Grasas</div>
          <div className="text-xs text-theme-faint ml-4">{fatPercent}%</div>
        </div>
      </div>
    </div>
  );
};
