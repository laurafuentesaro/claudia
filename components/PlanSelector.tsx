import React from 'react';
import { usePlan } from '../PlanContext';

export const PlanSelector: React.FC = () => {
  const { activePlanId, setActivePlanId, plans } = usePlan();

  return (
    <div className="inline-flex bg-theme-elevated rounded-lg p-1">
      {plans.map((plan) => (
        <button
          key={plan.id}
          onClick={() => setActivePlanId(plan.id)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
            activePlanId === plan.id
              ? 'bg-theme-card text-theme-text shadow-sm'
              : 'text-theme-muted hover:text-theme-secondary'
          }`}
        >
          {plan.name}
        </button>
      ))}
    </div>
  );
};
