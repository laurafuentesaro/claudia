import type { DayPlan } from './weeklyPlan';

export const WEEKLY_PLAN_V2: DayPlan[] = [
  {
    day: "Lunes",
    focus: "Pastel de carne + tarta de salmón",
    targetCalories: 1200,
    macros: { protein: 90, carbs: 84, fat: 44 },
    meals: {
      breakfast: {
        description: "Omelette Caprese: 2 huevos + tomate cherry + un poco de queso fresco + semillas de calabaza + té con jengibre.",
        kcal: 300,
      },
      lunch: {
        description: "Pastel de Carne con Puré de Calabaza: carne picada con morrón, zanahoria, aceitunas y huevo duro, gratinado con puré de calabaza y parmesano + mix de verdes.",
        kcal: 350,
        recipeId: 'pastel-carne-calabaza',
      },
      dessertLunch: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colación: 2 crackers de semillas + té con jengibre.",
        kcal: 90,
        recipeId: 'cracker-semillas',
      },
      dinner: {
        description: "Tarta de Salmón con Masa de Avena: salmón en cubos con zanahoria, zapallito, morrón, cebolla de verdeo y parmesano sobre masa de avena.",
        kcal: 310,
        recipeId: 'tarta-salmon-avena',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porción.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  },
  {
    day: "Martes",
    focus: "Repite tarta salmón + albóndigas de pollo",
    targetCalories: 1200,
    macros: { protein: 90, carbs: 84, fat: 44 },
    meals: {
      breakfast: {
        description: "Panquequito Frutal: panqueque de huevo con manzana verde rallada y arándanos + té con jengibre.",
        kcal: 280,
        recipeId: 'panquequito-frutal',
      },
      lunch: {
        description: "Tarta de Salmón (receta noche anterior): porción completa + mix de verdes.",
        kcal: 350,
        recipeId: 'tarta-salmon-avena',
      },
      dessertLunch: {
        description: "Trufas de Limón, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limón-coco-almendras',
      },
      snack: {
        description: "(Opcional) Colación: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Albóndigas de Pollo con Verduras: albóndigas al horno con zanahoria, zucchini, jengibre, sésamo y semillas de calabaza + mix de verdes.",
        kcal: 310,
        recipeId: 'albondigas-pollo-verduras',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
    }
  },
  {
    day: "Miércoles",
    focus: "Repite albóndigas + soufflé",
    targetCalories: 1200,
    macros: { protein: 92, carbs: 82, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos con Palta: 2 huevos + 1/4 palta + semillas de sésamo + té con jengibre.",
        kcal: 290,
      },
      lunch: {
        description: "Albóndigas de Pollo (receta noche anterior): porción completa + mix de verdes con limón.",
        kcal: 340,
        recipeId: 'albondigas-pollo-verduras',
      },
      dessertLunch: {
        description: "Tarta de Manzana y Avena: 1 porción.",
        kcal: 100,
        recipeId: 'tarta-manzana-avena',
      },
      snack: {
        description: "(Opcional) Colación: 2 crackers de semillas + té.",
        kcal: 90,
        recipeId: 'cracker-semillas',
      },
      dinner: {
        description: "Soufflé de Zanahorias y Zapallitos: soufflé con queso fresco, sésamo y semillas + mix de verdes con palta y vinagreta.",
        kcal: 300,
        recipeId: 'souffle-zanahorias-zapallitos',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Limón, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limón-coco-almendras',
      },
    }
  },
  {
    day: "Jueves",
    focus: "Repite soufflé + milanesa de pollo al horno",
    targetCalories: 1200,
    macros: { protein: 92, carbs: 82, fat: 44 },
    meals: {
      breakfast: {
        description: "Tostado de Pan de Almendras: 1 rodaja de pan de almendras tostado + 2 fetas de jamón crudo + un poco de queso + semillas de girasol + té.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Soufflé de Zanahorias y Zapallitos (receta noche anterior): porción completa + mix de verdes con palta.",
        kcal: 340,
        recipeId: 'souffle-zanahorias-zapallitos',
      },
      dessertLunch: {
        description: "Mousse de Cacao & Palta: 1 porción.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
      snack: {
        description: "(Opcional) Colación: té con 15g de maní tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Milanesa de Pollo al Horno: pechuga rebozada con almendras, sésamo y lino + mix de verdes con tomates cherry y limón.",
        kcal: 300,
        recipeId: 'milanesa-pollo-horno',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
    }
  },
  {
    day: "Viernes",
    focus: "Repite milanesa + merluza con costra de semillas",
    targetCalories: 1200,
    macros: { protein: 92, carbs: 82, fat: 44 },
    meals: {
      breakfast: {
        description: "Yogurt Griego con Semillas: yogurt griego + semillas de chía y girasol + frutos rojos (80g) + té.",
        kcal: 280,
      },
      lunch: {
        description: "Milanesa de Pollo al Horno (receta noche anterior): porción completa + mix de verdes con tomates cherry.",
        kcal: 340,
        recipeId: 'milanesa-pollo-horno',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porción.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
      snack: {
        description: "(Opcional) Colación: 2 crackers de semillas + té con jengibre.",
        kcal: 90,
        recipeId: 'cracker-semillas',
      },
      dinner: {
        description: "Merluza al Horno con Costra de Semillas: merluza con costra de almendras, sésamo y girasol + ensalada de verdes, tomates cherry y pepino.",
        kcal: 300,
        recipeId: 'merluza-costra-semillas',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porción.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  },
  {
    day: "Sábado",
    focus: "Repite merluza + zapallitos rellenos",
    targetCalories: 1200,
    macros: { protein: 90, carbs: 84, fat: 44 },
    meals: {
      breakfast: {
        description: "Tarta de Manzana y Avena: 1 porción + té con jengibre.",
        kcal: 280,
        recipeId: 'tarta-manzana-avena',
      },
      lunch: {
        description: "Merluza con Costra de Semillas (receta noche anterior): porción completa + mix de verdes con limón.",
        kcal: 340,
        recipeId: 'merluza-costra-semillas',
      },
      dessertLunch: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colación: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Zapallitos Rellenos: zapallitos rellenos de carne picada con cebolla de verdeo, morrón, parmesano y pimentón + mix de verdes.",
        kcal: 320,
        recipeId: 'zapallitos-rellenos',
      },
      dessertDinner: {
        description: "Trufas de Limón, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limón-coco-almendras',
      },
    }
  },
  {
    day: "Domingo",
    focus: "Pollo al horno + salmón thai",
    targetCalories: 1200,
    macros: { protein: 90, carbs: 86, fat: 42 },
    meals: {
      breakfast: {
        description: "Panquequito Frutal: panqueque de huevo con manzana verde rallada y arándanos + té con jengibre.",
        kcal: 280,
        recipeId: 'panquequito-frutal',
      },
      lunch: {
        description: "Pollo al Horno con Verduras Asadas: muslos de pollo marinados con jengibre y limón + zanahoria, zapallitos y morrón asados.",
        kcal: 350,
        recipeId: 'pollo-horno-verduras-asadas',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porción.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
      snack: {
        description: "(Opcional) Colación: 2 crackers de semillas + té.",
        kcal: 90,
        recipeId: 'cracker-semillas',
      },
      dinner: {
        description: "Salmón Thai con Verdes: salmón al horno con costra de maní, lima, soja y cilantro + mix de verdes con semillas.",
        kcal: 310,
        recipeId: 'salmón-thai',
      },
      dessertDinner: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
    }
  }
];
