import React, { useState } from 'react';
import {
  ChevronRight,
  Beef,
  Carrot,
  Cherry,
  Milk,
  Wheat,
  Flame,
  Droplets,
  Candy,
  Package,
} from 'lucide-react';
import { ShoppingListItem } from './ShoppingListItem';
import type { AggregatedIngredient } from '../data/shoppingList';
import type { IngredientCategory } from '../data/ingredientCategories';
import { CATEGORY_INFO } from '../data/ingredientCategories';

const CATEGORY_ICONS: Record<IngredientCategory, React.FC<{ size?: number; className?: string }>> = {
  proteinas: Beef,
  verduras: Carrot,
  frutas: Cherry,
  lacteos: Milk,
  granos: Wheat,
  condimentos: Flame,
  aceites: Droplets,
  endulzantes: Candy,
  otros: Package,
};

interface ShoppingListCategoryProps {
  category: IngredientCategory;
  items: AggregatedIngredient[];
  checkedItems: Set<string>;
  onToggleItem: (id: string) => void;
}

export const ShoppingListCategory: React.FC<ShoppingListCategoryProps> = ({
  category,
  items,
  checkedItems,
  onToggleItem,
}) => {
  const [expanded, setExpanded] = useState(true);
  const info = CATEGORY_INFO[category];
  const Icon = CATEGORY_ICONS[category];

  return (
    <div>
      {/* Category header */}
      <button
        className="w-full flex items-center gap-2 px-6 py-4 hover:bg-theme-elevated transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <Icon size={14} className="text-theme-accent flex-shrink-0" />
        <span className="text-xs font-medium text-theme-muted uppercase tracking-wide">
          {info.label}
        </span>
        <ChevronRight
          size={14}
          className={`text-theme-muted transition-transform duration-200 ${
            expanded ? 'rotate-90' : ''
          }`}
        />
        <span className="ml-auto text-xs text-theme-faint">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </button>

      {/* Expandable items */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
        }}
      >
        <div className="min-h-0">
          <div className="divide-y divide-theme-border/30">
            {items.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                checked={checkedItems.has(item.id)}
                onToggle={() => onToggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
