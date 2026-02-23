import React from 'react';

interface Meal {
  label: string;
  description: string;
  kcal: number;
}

interface MealTimelineProps {
  meals: Meal[];
}

export const MealTimeline: React.FC<MealTimelineProps> = ({ meals }) => {
  return (
    <div className="space-y-0">
      {meals.map((meal, idx) => (
        <div
          key={idx}
          className="group relative pl-6 py-4 border-l border-theme-border hover:border-theme-accent/50 transition-colors"
        >
          <div className="absolute left-0 top-5 w-2 h-2 -translate-x-[4.5px] rounded-full bg-theme-border-hover group-hover:bg-theme-accent transition-colors" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-xs font-medium text-theme-muted uppercase tracking-wide">
                  {meal.label}
                </h4>
              </div>
              <p className="text-sm text-theme-secondary leading-relaxed">
                {meal.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-sm font-medium text-theme-text">
                {meal.kcal}
              </span>
              <span className="text-xs text-theme-faint ml-1">kcal</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
