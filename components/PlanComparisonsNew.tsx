import React, { useState } from 'react';
import { DaySelector } from './DaySelector';
import { CaloriesSummary } from './CaloriesSummary';
import { MealTimeline } from './MealTimeline';
import { WEEKLY_PLAN } from '../data/weeklyPlan';
import { getRecipe } from '../data/recipes';
import type { MealItemData } from './MealTimelineItem';

export const PlanComparisons: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const currentPlan = WEEKLY_PLAN[selectedDayIndex];


  const buildMealItem = (
    label: string,
    slot: { description: string; kcal: number; recipeId?: string; sideRecipeId?: string; cookForDays?: number }
  ): MealItemData => ({
    label,
    description: slot.description,
    kcal: slot.kcal,
    recipeId: slot.recipeId,
    cookForDays: slot.cookForDays,
    recipe: slot.recipeId ? getRecipe(slot.recipeId) : undefined,
    sideRecipe: slot.sideRecipeId ? getRecipe(slot.sideRecipeId) : undefined,
  });

  const buildDessertItem = (
    slot: { description: string; kcal: number; recipeId?: string }
  ): MealItemData => ({
    label: 'Postre',
    description: slot.description,
    kcal: slot.kcal,
    recipeId: slot.recipeId,
    recipe: slot.recipeId ? getRecipe(slot.recipeId) : undefined,
    isDessert: true,
  });

  const mealGroups = [
    {
      meal: buildMealItem('Desayuno', currentPlan.meals.breakfast),
    },
    {
      meal: buildMealItem('Almuerzo', currentPlan.meals.lunch),
      dessert: buildDessertItem(currentPlan.meals.dessertLunch),
    },
    ...(currentPlan.meals.snack ? [{
      meal: buildMealItem('Merienda', currentPlan.meals.snack),
    }] : []),
    {
      meal: buildMealItem('Cena', currentPlan.meals.dinner),
      dessert: buildDessertItem(currentPlan.meals.dessertDinner),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden transition-colors">
        <DaySelector
          days={WEEKLY_PLAN.map(p => p.day)}
          selectedIndex={selectedDayIndex}
          onSelect={setSelectedDayIndex}
        />

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-theme-text tracking-tight">
              {currentPlan.day}
            </h3>
          </div>

          <CaloriesSummary
            targetCalories={currentPlan.targetCalories}
            macros={currentPlan.macros}
          />

          <div>
            <h4 className="text-xs font-medium text-theme-muted uppercase tracking-wide mb-4">
              Comidas del dia
            </h4>
            <MealTimeline groups={mealGroups} />
          </div>
        </div>
      </div>
    </div>
  );
};
