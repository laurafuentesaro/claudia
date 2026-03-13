import { WEEKLY_PLAN } from './weeklyPlan';
import { WEEKLY_PLAN_V2 } from './weeklyPlanV2';
import type { DayPlan } from './weeklyPlan';

export interface PlanMeta {
  id: string;
  name: string;
  description: string;
  plan: DayPlan[];
}

export const PLANS: PlanMeta[] = [
  { id: 'plan-1', name: 'Plan 1', description: '1200 kcal · 82-88g proteína', plan: WEEKLY_PLAN },
  { id: 'plan-2', name: 'Plan 2', description: '1200 kcal · ~90g proteína · menos fermentables', plan: WEEKLY_PLAN_V2 },
];

export const DEFAULT_PLAN_ID = 'plan-2';
