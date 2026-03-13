import React, { useState, useMemo } from 'react';
import { RECIPES, type RecipeData } from '../data/recipes';
import { RecipeDetail } from './RecipeDetail';
import { ChevronRight } from 'lucide-react';
import { usePlan } from '../PlanContext';
import type { DayPlan } from '../data/weeklyPlan';

function getRecipeIdsFromPlan(plan: DayPlan[]): Set<string> {
  const ids = new Set<string>();
  for (const day of plan) {
    for (const meal of Object.values(day.meals)) {
      if (meal?.recipeId) ids.add(meal.recipeId);
      if (meal?.altRecipeId) ids.add(meal.altRecipeId);
      if (meal?.sideRecipeId) ids.add(meal.sideRecipeId);
    }
  }
  return ids;
}

function RecipeRow({ recipe, isExpanded, onToggle }: { recipe: RecipeData; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-theme-elevated/50 transition-colors"
      >
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-theme-text truncate">
            {recipe.name}
          </h4>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-theme-muted">
            <span>{recipe.cookTime} min</span>
            <span>{recipe.servings} porc.</span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
        <ChevronRight
          size={16}
          className={`text-theme-muted shrink-0 transition-transform duration-200 ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out-quint"
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
        }}
      >
        <div className="min-h-0">
          <div className="px-5 pb-4">
            <RecipeDetail recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Recetario: React.FC = () => {
  const { activePlan, plans } = usePlan();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { planRecipes, extras } = useMemo(() => {
    const planIds = getRecipeIdsFromPlan(activePlan.plan);

    // IDs in ALL plans
    const allPlanIds = new Set<string>();
    for (const p of plans) {
      for (const id of getRecipeIdsFromPlan(p.plan)) {
        allPlanIds.add(id);
      }
    }

    const planRecipes: RecipeData[] = [];
    const extras: RecipeData[] = [];

    for (const id of planIds) {
      const r = RECIPES[id];
      if (r) planRecipes.push(r);
    }

    // Extras: recipes that exist but aren't in the active plan
    for (const [id, r] of Object.entries(RECIPES)) {
      if (!planIds.has(id)) {
        extras.push(r);
      }
    }

    return { planRecipes, extras };
  }, [activePlan, plans]);

  return (
    <div className="space-y-6">
      {/* Plan recipes */}
      <div>
        <h3 className="text-xs font-medium text-theme-muted uppercase tracking-wide mb-3">
          Recetas del {activePlan.name} ({planRecipes.length})
        </h3>
        <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden divide-y divide-theme-border/50">
          {planRecipes.map((recipe) => (
            <RecipeRow
              key={recipe.id}
              recipe={recipe}
              isExpanded={expandedId === recipe.id}
              onToggle={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
            />
          ))}
        </div>
      </div>

      {/* Optional extras */}
      {extras.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-theme-muted uppercase tracking-wide mb-3">
            Recetas opcionales IMO-friendly ({extras.length})
          </h3>
          <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden divide-y divide-theme-border/50">
            {extras.map((recipe) => (
              <RecipeRow
                key={recipe.id}
                recipe={recipe}
                isExpanded={expandedId === recipe.id}
                onToggle={() => setExpandedId(expandedId === recipe.id ? null : recipe.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
