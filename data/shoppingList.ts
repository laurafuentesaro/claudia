import { RECIPES, type RecipeData } from './recipes';
import { WEEKLY_PLAN, type DayPlan } from './weeklyPlan';
import {
  normalizeIngredientName,
  getIngredientCategory,
  CATEGORY_ORDER,
  type IngredientCategory,
} from './ingredientCategories';

// ─── Task 1: Quantity parser ───────────────────────────────────────────

export interface ParsedQuantity {
  amount: number | null;
  unit: string | null;
  raw: string;
  parseable: boolean;
}

const UNIT_NORMALIZATIONS: Record<string, string> = {
  cdas: 'cda',
  cditas: 'cdita',
  unidades: 'unidad',
  dientes: 'diente',
  pellizcos: 'pellizco',
  ramitas: 'ramita',
  pizca: 'pizca',
  grandes: 'grande',
};

function normalizeUnit(unit: string): string {
  return UNIT_NORMALIZATIONS[unit] || unit;
}

function parseFraction(str: string): number | null {
  // "1/2" → 0.5
  const fracMatch = str.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (fracMatch) {
    return parseInt(fracMatch[1]) / parseInt(fracMatch[2]);
  }
  // "1.5" or "1"
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

export function parseQuantity(raw: string): ParsedQuantity {
  const trimmed = raw.trim();

  // Non-parseable cases
  if (
    trimmed === 'a gusto' ||
    trimmed === 'pizca' ||
    trimmed === '1 pizca'
  ) {
    return { amount: null, unit: null, raw: trimmed, parseable: false };
  }

  // Strip parenthetical notes: "240g (1 lata)" → "240g", "400g (1 lata)" → "400g"
  const withoutParens = trimmed.replace(/\s*\([^)]*\)/, '').trim();

  // Weight/volume suffixes without space: "400g", "100ml", "200g"
  const suffixMatch = withoutParens.match(/^(\d+(?:\.\d+)?)\s*(g|ml|kg|l)$/i);
  if (suffixMatch) {
    return {
      amount: parseFloat(suffixMatch[1]),
      unit: suffixMatch[2].toLowerCase(),
      raw: trimmed,
      parseable: true,
    };
  }

  // Ranges: "1-2 dientes" → take max
  const rangeMatch = withoutParens.match(/^(\d+)\s*-\s*(\d+)\s+(.+)$/);
  if (rangeMatch) {
    return {
      amount: parseInt(rangeMatch[2]),
      unit: normalizeUnit(rangeMatch[3]),
      raw: trimmed,
      parseable: true,
    };
  }

  // Mixed fraction: "1 1/2 cditas" → 1.5
  const mixedFracMatch = withoutParens.match(/^(\d+)\s+(\d+\/\d+)\s+(.+)$/);
  if (mixedFracMatch) {
    const whole = parseInt(mixedFracMatch[1]);
    const frac = parseFraction(mixedFracMatch[2]);
    if (frac !== null) {
      return {
        amount: whole + frac,
        unit: normalizeUnit(mixedFracMatch[3]),
        raw: trimmed,
        parseable: true,
      };
    }
  }

  // Fraction with unit: "1/2 unidad", "1/2 cdita"
  const fracUnitMatch = withoutParens.match(/^(\d+\/\d+)\s+(.+)$/);
  if (fracUnitMatch) {
    const amount = parseFraction(fracUnitMatch[1]);
    if (amount !== null) {
      return {
        amount,
        unit: normalizeUnit(fracUnitMatch[2]),
        raw: trimmed,
        parseable: true,
      };
    }
  }

  // Number with unit: "3 cdas", "1 cdita", "2 unidades", "1 unidad", "4 unidades"
  const numUnitMatch = withoutParens.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
  if (numUnitMatch) {
    return {
      amount: parseFloat(numUnitMatch[1]),
      unit: normalizeUnit(numUnitMatch[2]),
      raw: trimmed,
      parseable: true,
    };
  }

  // Just a number (rare)
  const justNum = parseFloat(withoutParens);
  if (!isNaN(justNum)) {
    return { amount: justNum, unit: null, raw: trimmed, parseable: true };
  }

  // Non-parseable (e.g. "1 cm", "1 pequeno", etc.)
  return { amount: null, unit: null, raw: trimmed, parseable: false };
}

export function canSumQuantities(a: ParsedQuantity, b: ParsedQuantity): boolean {
  if (!a.parseable || !b.parseable) return false;
  if (a.unit === null || b.unit === null) return false;
  return a.unit === b.unit;
}

export function sumQuantities(quantities: ParsedQuantity[]): ParsedQuantity[] {
  // Group by unit
  const byUnit = new Map<string, number>();
  const unparseable: ParsedQuantity[] = [];

  for (const q of quantities) {
    if (!q.parseable || q.unit === null || q.amount === null) {
      unparseable.push(q);
      continue;
    }
    byUnit.set(q.unit, (byUnit.get(q.unit) || 0) + q.amount);
  }

  const results: ParsedQuantity[] = [];
  for (const [unit, amount] of byUnit) {
    // Round to avoid floating point noise (e.g. 2.9999999 → 3)
    const rounded = Math.round(amount * 100) / 100;
    results.push({
      amount: rounded,
      unit,
      raw: `${rounded} ${unit}`,
      parseable: true,
    });
  }

  return [...results, ...unparseable];
}

// ─── Task 2: Recipe collector with cookForDays logic ───────────────────

export interface RecipeNeed {
  recipeId: string;
  recipe: RecipeData;
  portionsNeeded: number;
  appearsOnDays: string[];
  isBatchCook: boolean;
}

export function collectWeeklyRecipes(plan: DayPlan[]): RecipeNeed[] {
  const needs = new Map<string, RecipeNeed>();
  // Track which (recipeId, dayIndex) combos are already covered by a batch cook
  const coveredByBatch = new Set<string>();

  const mealSlots = ['breakfast', 'lunch', 'dessertLunch', 'dinner', 'dessertDinner', 'snack'] as const;

  for (let dayIndex = 0; dayIndex < plan.length; dayIndex++) {
    const day = plan[dayIndex];

    for (const slot of mealSlots) {
      const meal = day.meals[slot as keyof typeof day.meals];
      if (!meal || !meal.recipeId) continue;

      // Process main recipe and side recipe
      const recipeIds = [meal.recipeId];
      if (meal.sideRecipeId) recipeIds.push(meal.sideRecipeId);

      for (const recipeId of recipeIds) {
        const key = `${recipeId}:${dayIndex}`;
        if (coveredByBatch.has(key)) continue;

        const recipe = RECIPES[recipeId];
        if (!recipe) continue;

        const existing = needs.get(recipeId);
        if (existing) {
          existing.portionsNeeded += 1;
          if (!existing.appearsOnDays.includes(day.day)) {
            existing.appearsOnDays.push(day.day);
          }
        } else {
          needs.set(recipeId, {
            recipeId,
            recipe,
            portionsNeeded: 1,
            appearsOnDays: [day.day],
            isBatchCook: false,
          });
        }

        // Handle cookForDays: mark future days as covered
        const cookForDays = recipeId === meal.recipeId ? meal.cookForDays : undefined;
        if (cookForDays && cookForDays > 1) {
          const need = needs.get(recipeId)!;
          need.isBatchCook = true;
          for (let d = 1; d < cookForDays; d++) {
            const futureDay = dayIndex + d;
            if (futureDay < plan.length) {
              coveredByBatch.add(`${recipeId}:${futureDay}`);
              if (!need.appearsOnDays.includes(plan[futureDay].day)) {
                need.appearsOnDays.push(plan[futureDay].day);
              }

              // If the main recipe has a side recipe and it appears on the future day too, cover it
              if (meal.sideRecipeId) {
                coveredByBatch.add(`${meal.sideRecipeId}:${futureDay}`);
                const sideNeed = needs.get(meal.sideRecipeId);
                if (sideNeed && !sideNeed.appearsOnDays.includes(plan[futureDay].day)) {
                  sideNeed.appearsOnDays.push(plan[futureDay].day);
                }
              }
            }
          }
        }
      }
    }
  }

  return Array.from(needs.values());
}

// ─── Task 3: Ingredient aggregation and categorization ─────────────────

export interface QuantityEntry {
  amount: number | null;
  unit: string | null;
  raw: string;
  parseable: boolean;
}

export interface AggregatedIngredient {
  id: string; // normalized name as key
  name: string;
  category: IngredientCategory;
  quantities: QuantityEntry[];
  sourceRecipes: string[]; // recipe names
  isAGusto: boolean;
}

export function aggregateIngredients(needs: RecipeNeed[]): AggregatedIngredient[] {
  // Map: normalized name → { raw quantities, source recipes }
  const ingredientMap = new Map<
    string,
    {
      name: string;
      quantities: ParsedQuantity[];
      sourceRecipes: Set<string>;
    }
  >();

  for (const need of needs) {
    const { recipe } = need;
    // Use full recipe quantities (batch-cooked, servings >= needed)
    for (const ingredient of recipe.ingredients) {
      const normalizedName = normalizeIngredientName(ingredient.name);
      const parsed = parseQuantity(ingredient.quantity);

      const existing = ingredientMap.get(normalizedName);
      if (existing) {
        existing.quantities.push(parsed);
        existing.sourceRecipes.add(recipe.name);
      } else {
        ingredientMap.set(normalizedName, {
          name: normalizedName,
          quantities: [parsed],
          sourceRecipes: new Set([recipe.name]),
        });
      }
    }
  }

  // Aggregate quantities and build final list
  const result: AggregatedIngredient[] = [];

  for (const [normalizedName, data] of ingredientMap) {
    const summed = sumQuantities(data.quantities);
    const isAGusto =
      summed.length === 0 ||
      summed.every((q) => !q.parseable);

    result.push({
      id: normalizedName,
      name: normalizedName,
      category: getIngredientCategory(normalizedName),
      quantities: summed,
      sourceRecipes: Array.from(data.sourceRecipes),
      isAGusto,
    });
  }

  // Sort by category order, then alphabetically
  result.sort((a, b) => {
    const catA = CATEGORY_ORDER.indexOf(a.category);
    const catB = CATEGORY_ORDER.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    return a.name.localeCompare(b.name);
  });

  return result;
}

// Shopping list quantity overrides — buy whole units instead of fractions
const SHOPPING_OVERRIDES: Record<string, string> = {
  'Morrón rojo': '1 unidad',
  'Morron': '1 unidad',
  'Pepino': '1 unidad',
  'Pepinos': '1 unidad',
  'Limon': '2 unidades',
  'Lima': '2 unidades',
  'Lima o limon': '2 unidades',
  'Aceite de coco': '1 frasco chico',
  'Lechuga morada': '1 unidad',
  'Mix de lechugas, rucula y albahaca': '1 unidad',
  'Remolacha rallada': '1 unidad',
  'Manzana verde': '1 unidad',
  'Manzanas Pink Lady o Fuji': '4 unidades',
  'Limon (ralladura y jugo)': '2 unidades',
  'Limon organico (ralladura)': 'REMOVE',
  'Limon (jugo)': 'REMOVE',
  'Lima (jugo y ralladura)': '2 unidades',
  'Repollo blanco': '0.5 unidad',
  'Repollo blanco (juliana)': '1 bolsita (opcional)',
  'Repollo colorado': '0.5 unidad',
  'Zanahoria rallada fina': 'REMOVE',
  'Zanahoria rallada': '1 bolsita',
  'Agua': 'REMOVE',
  'Sal marina': '1 paquete',
  'Sal marina y pimienta': 'REMOVE',
  'Sal marina, pimienta, pimenton ahumado': 'REMOVE',
  'Sal marina o rosa': 'REMOVE',
  'Sal gruesa': 'REMOVE',
  'Sal y pimienta': 'REMOVE',
  'Sal': 'REMOVE',
  'Puerro (parte verde)': '1 unidad',
  'Puerro (parte blanca)': 'REMOVE',
};

function applyShoppingOverrides(ingredients: AggregatedIngredient[]): AggregatedIngredient[] {
  return ingredients.filter((item) => {
    const override = SHOPPING_OVERRIDES[item.name];
    if (override === 'REMOVE') return false;
    if (override) {
      const parsed = parseQuantity(override);
      item.quantities = [parsed];
    }
    return true;
  });
}

// ─── Convenience: compute full shopping list from global data ──────────

export function computeShoppingList() {
  const recipeNeeds = collectWeeklyRecipes(WEEKLY_PLAN);
  const raw = aggregateIngredients(recipeNeeds);

  // Apply shopping overrides (buy whole units, remove duplicates)
  const ingredients = applyShoppingOverrides(raw);

  // Group by category
  const byCategory = new Map<IngredientCategory, AggregatedIngredient[]>();
  for (const item of ingredients) {
    const list = byCategory.get(item.category) || [];
    list.push(item);
    byCategory.set(item.category, list);
  }

  // Count unique recipes
  const uniqueRecipes = new Set(recipeNeeds.map((n) => n.recipeId));

  return {
    ingredients,
    byCategory,
    totalItems: ingredients.length,
    totalRecipes: uniqueRecipes.size,
    totalCategories: byCategory.size,
  };
}
