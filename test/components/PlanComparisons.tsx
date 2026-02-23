import React, { useState } from 'react';
import { DaySelector } from './DaySelector';
import { CaloriesSummary } from './CaloriesSummary';
import { MealTimeline } from './MealTimeline';
import { ScheduleCard } from './ScheduleCard';
import { WEEKLY_PLAN } from '../../data/weeklyPlan';

export const PlanComparisons: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const currentPlan = WEEKLY_PLAN[selectedDayIndex];

  const scheduleItems = [
    {
      time: '06:20 / 07:20',
      title: 'Desayuno Energetico',
      description: 'Yogurt, Avena hidratada, Fruta o Tostadas',
    },
    {
      time: '11:30 - 14:30',
      title: 'Almuerzo Practico',
      description: 'Bowls completos que no necesitan ser calentados',
    },
    {
      time: 'Mar/Jue',
      title: 'Calidad + Recuperacion',
      description: 'Pre-entreno con cafeina fria y Cena con carbos',
    },
  ];

  const meals = [
    { label: 'Desayuno', description: currentPlan.meals.breakfast.description, kcal: currentPlan.meals.breakfast.kcal },
    { label: 'Almuerzo (Vianda)', description: currentPlan.meals.lunch.description, kcal: currentPlan.meals.lunch.kcal },
    { label: 'Merienda / Pre-Entreno', description: currentPlan.meals.snack.description, kcal: currentPlan.meals.snack.kcal },
    { label: 'Cena', description: currentPlan.meals.dinner.description, kcal: currentPlan.meals.dinner.kcal },
  ];

  return (
    <div className="space-y-6">
      <ScheduleCard items={scheduleItems} />

      <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden transition-colors">
        <DaySelector
          days={WEEKLY_PLAN.map(p => p.day)}
          selectedIndex={selectedDayIndex}
          onSelect={setSelectedDayIndex}
        />

        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-theme-text tracking-tight">
                {currentPlan.day}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-theme-accent/10 text-theme-accent border border-theme-accent/20">
                  {currentPlan.training}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-theme-faint uppercase tracking-wide">
                Foco
              </span>
              <p className="text-sm text-theme-secondary mt-0.5">
                {currentPlan.focus}
              </p>
            </div>
          </div>

          <CaloriesSummary
            targetCalories={currentPlan.targetCalories}
            macros={currentPlan.macros}
          />

          <div>
            <h4 className="text-xs font-medium text-theme-muted uppercase tracking-wide mb-4">
              Comidas del dia
            </h4>
            <MealTimeline meals={meals} />
          </div>
        </div>
      </div>
    </div>
  );
};
