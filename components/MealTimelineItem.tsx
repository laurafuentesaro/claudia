import React, { useState } from 'react';
import { ChevronRight, CakeSlice, UtensilsCrossed } from 'lucide-react';
import { CookBadge } from './CookBadge';
import { RecipeDetail } from './RecipeDetail';
import type { RecipeData } from '../data/recipes';

export interface MealItemData {
  label: string;
  description: string;
  kcal: number;
  recipeId?: string;
  cookForDays?: number;
  recipe?: RecipeData;
  sideRecipe?: RecipeData;
  isDessert?: boolean;
}

interface MealTimelineItemProps {
  meal: MealItemData;
  isExpanded: boolean;
  onToggle: () => void;
  dessert?: MealItemData;
}

export const MealTimelineItem: React.FC<MealTimelineItemProps> = ({
  meal,
  isExpanded,
  onToggle,
  dessert,
}) => {
  const hasRecipe = !!meal.recipe;
  const [dessertExpanded, setDessertExpanded] = useState(false);
  const hasDessertRecipe = !!dessert?.recipe;

  return (
    <div className="group relative pl-6 border-l border-theme-border hover:border-theme-accent/50 transition-colors">
      {/* Timeline dot */}
      <div className="absolute left-0 top-5 w-2 h-2 -translate-x-[4.5px] rounded-full bg-theme-border-hover group-hover:bg-theme-accent transition-colors" />

      {/* Main meal row */}
      <div
        className={`py-4 ${hasRecipe ? 'cursor-pointer' : ''}`}
        onClick={hasRecipe ? onToggle : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xs font-medium text-theme-muted uppercase tracking-wide">
                {meal.label}
              </h4>
              {meal.cookForDays && <CookBadge days={meal.cookForDays} />}
              {hasRecipe && (
                <ChevronRight
                  size={14}
                  className={`text-theme-muted transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              )}
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

        {/* Expanded recipe detail */}
        {meal.recipe && (
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
            }}
          >
            <div className="min-h-0">
              <RecipeDetail recipe={meal.recipe} />

              {/* Side recipe (acompanamiento) */}
              {meal.sideRecipe && (
                <div className="mt-4 pt-3 border-t border-dashed border-theme-border/50">
                  <div className="flex items-center gap-1.5 mb-2">
                    <UtensilsCrossed size={12} className="text-theme-accent" />
                    <span className="text-[10px] font-medium text-theme-accent uppercase tracking-wider">
                      Acompanamiento
                    </span>
                  </div>
                  <RecipeDetail recipe={meal.sideRecipe} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dessert sub-row */}
      {dessert && (
        <div
          className={`ml-2 pb-3 border-t border-dashed border-theme-border/50 ${hasDessertRecipe ? 'cursor-pointer' : ''}`}
          onClick={hasDessertRecipe ? () => setDessertExpanded(!dessertExpanded) : undefined}
        >
          <div className="flex items-start justify-between gap-4 pt-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <CakeSlice size={12} className="text-theme-accent" />
                <span className="text-[10px] font-medium text-theme-accent uppercase tracking-wider">
                  Postre
                </span>
                {hasDessertRecipe && (
                  <ChevronRight
                    size={12}
                    className={`text-theme-muted transition-transform duration-200 ${
                      dessertExpanded ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </div>
              <p className="text-xs text-theme-muted leading-relaxed">
                {dessert.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-xs font-medium text-theme-secondary">
                {dessert.kcal}
              </span>
              <span className="text-[10px] text-theme-faint ml-1">kcal</span>
            </div>
          </div>

          {/* Expanded dessert recipe detail */}
          {dessert.recipe && (
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                display: 'grid',
                gridTemplateRows: dessertExpanded ? '1fr' : '0fr',
              }}
            >
              <div className="min-h-0">
                <RecipeDetail recipe={dessert.recipe} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
