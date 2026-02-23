import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { computeShoppingList } from '../data/shoppingList';
import { CATEGORY_ORDER } from '../data/ingredientCategories';
import { ShoppingListCategory } from './ShoppingListCategory';

const STORAGE_KEY = 'shopping-list-checked';

function loadChecked(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {}
  return new Set();
}

function saveChecked(checked: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));
}

export const ShoppingList: React.FC = () => {
  const data = useMemo(() => computeShoppingList(), []);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => loadChecked());

  useEffect(() => {
    saveChecked(checkedItems);
  }, [checkedItems]);

  const toggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setCheckedItems(new Set());
  }, []);

  const checkedCount = checkedItems.size;
  const totalCount = data.totalItems;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress Summary Card */}
      <div className="bg-theme-card border border-theme-border rounded-lg p-5 transition-colors">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-3xl font-semibold text-theme-text tracking-tight">
              {checkedCount}
              <span className="text-theme-muted text-lg font-normal"> / {totalCount}</span>
            </div>
            <div className="text-sm text-theme-faint mt-1">
              ingredientes tachados
            </div>
          </div>
          {checkedCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs font-medium text-theme-accent hover:text-theme-accent-hover transition-colors"
            >
              Limpiar todo
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-theme-border rounded-full overflow-hidden">
          <div
            className="h-full bg-theme-accent rounded-full transition-all duration-300 ease-out-quint"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs text-theme-muted mt-2 text-right">
          {progressPercent}%
        </div>

        {/* Stats */}
        <div className="text-xs text-theme-muted mt-3">
          {data.totalRecipes} recetas &middot; {data.totalCategories} categorias
        </div>
      </div>

      {/* Categories */}
      <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden">
        <div className="divide-y divide-theme-border/50">
          {CATEGORY_ORDER.filter((cat) => data.byCategory.has(cat)).map((cat) => (
            <ShoppingListCategory
              key={cat}
              category={cat}
              items={data.byCategory.get(cat)!}
              checkedItems={checkedItems}
              onToggleItem={toggleItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
