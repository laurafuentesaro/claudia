import React from 'react';
import { Check } from 'lucide-react';
import type { AggregatedIngredient } from '../data/shoppingList';

interface ShoppingListItemProps {
  item: AggregatedIngredient;
  checked: boolean;
  onToggle: () => void;
}

// Only show quantities useful for shopping (weight, volume, count)
const SHOPPING_UNITS = new Set(['g', 'ml', 'kg', 'l', 'unidad', 'bandeja']);

function isShoppingRelevant(q: { amount: number | null; unit: string | null; parseable: boolean }): boolean {
  if (!q.parseable || q.amount === null || !q.unit) return false;
  return SHOPPING_UNITS.has(q.unit);
}

function formatQuantity(q: { amount: number | null; unit: string | null; raw: string; parseable: boolean }): string {
  if (q.amount === null || !q.unit) return '';
  const displayAmount = Number.isInteger(q.amount) ? q.amount.toString() : q.amount.toString();
  let displayUnit = q.unit;
  if (q.amount > 1 && q.unit === 'unidad') displayUnit = 'unidades';
  return `${displayAmount} ${displayUnit}`;
}

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  checked,
  onToggle,
}) => {
  const shoppingQuantities = item.quantities.filter(isShoppingRelevant);
  const hasMultipleUnits = shoppingQuantities.length > 1;

  return (
    <div
      className={`flex items-start gap-3 py-2.5 px-6 hover:bg-theme-elevated transition-colors cursor-pointer ${
        checked ? 'opacity-60' : ''
      }`}
      onClick={onToggle}
    >
      {/* Custom checkbox */}
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
            checked
              ? 'bg-theme-accent border-theme-accent'
              : 'border-theme-border-hover'
          }`}
        >
          {checked && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className={`text-sm ${
              checked
                ? 'line-through text-theme-faint'
                : 'text-theme-secondary'
            }`}
          >
            {item.name}
          </span>

          {/* Single quantity — right aligned */}
          {!hasMultipleUnits && shoppingQuantities.length === 1 && (
            <span
              className={`text-sm tabular-nums flex-shrink-0 ${
                checked ? 'line-through text-theme-faint' : 'text-theme-muted'
              }`}
            >
              {formatQuantity(shoppingQuantities[0])}
            </span>
          )}
        </div>

        {/* Multiple units — show each on its own line */}
        {hasMultipleUnits && (
          <div className="mt-0.5 space-y-0.5">
            {shoppingQuantities.map((q, i) => (
              <div
                key={i}
                className={`text-xs tabular-nums ${
                  checked ? 'line-through text-theme-faint' : 'text-theme-muted'
                }`}
              >
                {formatQuantity(q)}
              </div>
            ))}
          </div>
        )}

        {/* Recipe sources */}
        <div
          className={`text-[11px] mt-0.5 ${
            checked ? 'text-theme-faint' : 'text-theme-muted'
          }`}
        >
          {item.sourceRecipes.join(' · ')}
        </div>
      </div>
    </div>
  );
};
