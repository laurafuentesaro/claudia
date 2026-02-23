import React, { useState } from 'react';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { MealTimelineItem, type MealItemData } from './MealTimelineItem';

interface MealGroup {
  meal: MealItemData;
  dessert?: MealItemData;
}

interface MealTimelineProps {
  groups: MealGroup[];
}

export const MealTimeline: React.FC<MealTimelineProps> = ({ groups }) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const hasAnyRecipe = groups.some(g => g.meal.recipe);

  const allExpanded = groups.every((g, i) => !g.meal.recipe || expanded.has(i));

  const toggleAll = () => {
    if (allExpanded) {
      setExpanded(new Set());
    } else {
      const all = new Set<number>();
      groups.forEach((g, i) => {
        if (g.meal.recipe) all.add(i);
      });
      setExpanded(all);
    }
  };

  const toggleOne = (idx: number) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div>
      {hasAnyRecipe && (
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleAll}
            className="flex items-center gap-1 text-[11px] text-theme-muted hover:text-theme-secondary transition-colors"
          >
            {allExpanded ? (
              <>
                <ChevronsDownUp size={12} />
                Colapsar todo
              </>
            ) : (
              <>
                <ChevronsUpDown size={12} />
                Expandir todo
              </>
            )}
          </button>
        </div>
      )}
      <div className="space-y-0">
        {groups.map((group, idx) => (
          <MealTimelineItem
            key={idx}
            meal={group.meal}
            dessert={group.dessert}
            isExpanded={expanded.has(idx)}
            onToggle={() => toggleOne(idx)}
          />
        ))}
      </div>
    </div>
  );
};
