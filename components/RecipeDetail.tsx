import React, { useState } from 'react';
import { Clock, Users, ChefHat, ChevronDown, ExternalLink } from 'lucide-react';
import { SourceBadge } from './SourceBadge';
import type { RecipeData } from '../data/recipes';

interface RecipeDetailProps {
  recipe: RecipeData;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="mt-3 pt-3 border-t border-theme-border/50">
      <div className="flex items-center gap-2 mb-3">
        <SourceBadge source={recipe.source} />
        {recipe.sourceUrl && (
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            Ver en Cookidoo
            <ExternalLink size={10} />
          </a>
        )}
        <div className="flex items-center gap-3 text-xs text-theme-muted">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {recipe.cookTime} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Users size={12} />
            {recipe.servings} porc.
          </span>
          <span className="inline-flex items-center gap-1">
            <ChefHat size={12} />
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Ingredients grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-3">
        {recipe.ingredients.map((ing, i) => (
          <div key={i} className="flex items-baseline justify-between text-xs py-0.5">
            <span className="text-theme-secondary">{ing.name}</span>
            <span className="text-theme-muted ml-2 shrink-0">{ing.quantity}</span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {recipe.notes && recipe.notes.length > 0 && (
        <div className="mb-3">
          {recipe.notes.map((note, i) => (
            <p key={i} className="text-[11px] text-theme-muted italic">
              {note}
            </p>
          ))}
        </div>
      )}

      {/* Instructions toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowSteps(!showSteps); }}
        className="flex items-center gap-1 text-xs font-medium text-theme-accent hover:text-theme-accent-hover transition-colors"
      >
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${showSteps ? 'rotate-180' : ''}`}
        />
        {showSteps ? 'Ocultar pasos' : 'Ver pasos'}
      </button>

      {/* Instructions */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out-quint"
        style={{
          display: 'grid',
          gridTemplateRows: showSteps ? '1fr' : '0fr',
        }}
      >
        <div className="min-h-0">
          <ol className="mt-3 space-y-2">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-2 text-xs text-theme-secondary">
                <span className="shrink-0 w-5 h-5 rounded-full bg-theme-elevated flex items-center justify-center text-[10px] font-medium text-theme-muted">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
