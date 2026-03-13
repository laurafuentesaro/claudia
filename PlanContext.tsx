import React, { createContext, useContext, useState } from 'react';
import { PLANS, DEFAULT_PLAN_ID, type PlanMeta } from './data/plans';

interface PlanContextType {
  activePlanId: string;
  activePlan: PlanMeta;
  setActivePlanId: (id: string) => void;
  plans: PlanMeta[];
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

function loadPlanId(): string {
  try {
    const stored = localStorage.getItem('active-plan');
    if (stored && PLANS.some(p => p.id === stored)) return stored;
  } catch {}
  return DEFAULT_PLAN_ID;
}

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePlanId, setActivePlanIdState] = useState(loadPlanId);

  const activePlan = PLANS.find(p => p.id === activePlanId) ?? PLANS[0];

  const setActivePlanId = (id: string) => {
    setActivePlanIdState(id);
    localStorage.setItem('active-plan', id);
  };

  return (
    <PlanContext.Provider value={{ activePlanId, activePlan, setActivePlanId, plans: PLANS }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
