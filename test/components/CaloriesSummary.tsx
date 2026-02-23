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

      <div className="grid grid-cols-3 gap-6">
        <div>
          <div className="text-xl font-medium text-theme-text">
            {macros.protein}g
          </div>
          <div className="text-xs text-theme-muted mt-0.5">
            Proteina <span className="text-theme-faint">({proteinPercent}%)</span>
          </div>
        </div>
        <div>
          <div className="text-xl font-medium text-theme-text">
            {macros.carbs}g
          </div>
          <div className="text-xs text-theme-muted mt-0.5">
            Carbos <span className="text-theme-faint">({carbsPercent}%)</span>
          </div>
        </div>
        <div>
          <div className="text-xl font-medium text-theme-text">
            {macros.fat}g
          </div>
          <div className="text-xs text-theme-muted mt-0.5">
            Grasas <span className="text-theme-faint">({fatPercent}%)</span>
          </div>
        </div>
      </div>

      <div className="mt-5 h-1.5 bg-theme-border rounded-full overflow-hidden flex">
        <div
          className="bg-theme-text h-full"
          style={{ width: `${proteinPercent}%` }}
        />
        <div
          className="bg-theme-muted h-full"
          style={{ width: `${carbsPercent}%` }}
        />
        <div
          className="bg-theme-border-hover h-full"
          style={{ width: `${fatPercent}%` }}
        />
      </div>
    </div>
  );
};
