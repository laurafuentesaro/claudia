export type MealSlot = {
  description: string;
  kcal: number;
  recipeId?: string;
  altRecipeId?: string;   // alternative recipe option
  sideRecipeId?: string;  // companion recipe (dip, side dish, starter)
  cookForDays?: number;
};

export type DayPlan = {
  day: string;
  focus: string;
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: {
    breakfast: MealSlot;
    lunch: MealSlot;
    dessertLunch: MealSlot;
    dinner: MealSlot;
    dessertDinner: MealSlot;
    snack?: MealSlot;
  };
};

export const WEEKLY_PLAN: DayPlan[] = [
  {
    day: "Lunes",
    focus: "Inicio de semana — ensalada de atún + ensalada pollo crocante",
    targetCalories: 1200,
    macros: { protein: 86, carbs: 90, fat: 44 },
    meals: {
      breakfast: {
        description: "Omelette Caprese: 2 huevos + tomate cherry + un poco de queso fresco + semillas de calabaza + té.",
        kcal: 300,
      },
      lunch: {
        description: "Completísima Ensalada de Atún: atún al natural con huevo duro, tomate, aceitunas, zanahoria rallada, almendras, semillas de calabaza + mix de verdes con vinagreta de limón y soja.",
        kcal: 350,
        recipeId: 'ensalada-atún-completa',
      },
      dessertLunch: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colación: té con 15g de maní tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Crocante & Colorida Ensalada con Pollo: tiritas de pollo a la plancha con repollo, zanahoria, remolacha, manzana verde, pistachos y almendras fileteadas con abundantes verdes.",
        kcal: 300,
        recipeId: 'ensalada-pollo-crocante',
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
    focus: "Sobrante ensalada pollo + cabutia relleno",
    targetCalories: 1200,
    macros: { protein: 84, carbs: 92, fat: 44 },
    meals: {
      breakfast: {
        description: "Tostado de Pan de Almendras: 1 rodaja de pan de almendras tostado + 2 fetas de jamón crudo + un poco de queso + semillas de girasol + té.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Crocante Ensalada con Pollo: porción completa del lunes.",
        kcal: 340,
        recipeId: 'ensalada-pollo-crocante',
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
        description: "Cabutia Relleno de Carne Picada: zapallo relleno con carne picada, puerro, cebolla de verdeo, pimentón ahumado, sésamo y semillas + mix de verdes.",
        kcal: 310,
        recipeId: 'cabutia-relleno',
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
    day: "Miércoles",
    focus: "Sobrante cabutia + salmón almendrado",
    targetCalories: 1200,
    macros: { protein: 84, carbs: 88, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos con Palta: 2 huevos + 1/4 palta + semillas de sésamo + té. Opcional: 1 rodaja de pan de almendras.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Cabutia Relleno: porción completa del martes + mix de verdes.",
        kcal: 350,
        recipeId: 'cabutia-relleno',
      },
      dessertLunch: {
        description: "Trufas de Limón, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limón-coco-almendras',
      },
      snack: {
        description: "(Opcional) Colación: té con 10g almendras.",
        kcal: 65,
      },
      dinner: {
        description: "Salmón al Horno Almendrado: filet con costra de almendras, ajo y perejil + ensalada verde con pepino y repollo.",
        kcal: 300,
        recipeId: 'salmón-almendrado',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Crumble de Manzanas: 1 porción.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
    }
  },
  {
    day: "Jueves",
    focus: "Sobrante salmón + croquetones de pollo",
    targetCalories: 1200,
    macros: { protein: 86, carbs: 86, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos con Palta y Tomate: 2 huevos + 1/4 palta + tomate + semillas de calabaza + té. Opcional: 1 rodaja de pan de almendras.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Salmón Almendrado: porción completa del miércoles con ensalada verde.",
        kcal: 340,
        recipeId: 'salmón-almendrado',
      },
      dessertLunch: {
        description: "Mousse de Cacao & Palta: 1 porción.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
      snack: {
        description: "(Opcional) Colación: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Croquetones de Pollo estilo Miami Juice: pollo desmenuzado con zanahoria, cebolla de verdeo, sésamo y palta pisada + abundante mix de verdes y semillas.",
        kcal: 300,
        recipeId: 'croquetones-pollo',
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
    day: "Viernes",
    focus: "Sobrante croquetones + ensalada de cuadril",
    targetCalories: 1200,
    macros: { protein: 88, carbs: 84, fat: 46 },
    meals: {
      breakfast: {
        description: "Tostado de Pan de Almendras: 1 rodaja de pan de almendras tostado + 2 fetas de jamón crudo + semillas de chía + té.",
        kcal: 280,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Croquetones de Pollo: porción completa del jueves + mix de verdes.",
        kcal: 340,
        recipeId: 'croquetones-pollo',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porción.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
      snack: {
        description: "(Opcional) Colación: té con 15g maní tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Ensalada de Cuadril para Enamorar: cuadril sellado con rúcula, tomates cherry, semillas de calabaza, cebolla de verdeo y aceto.",
        kcal: 320,
        recipeId: 'ensalada-cuadril',
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
    focus: "Sobrante cuadril + wok multicolor",
    targetCalories: 1200,
    macros: { protein: 84, carbs: 90, fat: 44 },
    meals: {
      breakfast: {
        description: "Yogurt Griego con Semillas: yogurt griego + semillas de girasol + frutos rojos (80g) + té. Opcional: 1 rodaja de pan de almendras.",
        kcal: 280,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Ensalada de Cuadril: porción completa del viernes con rúcula fresca.",
        kcal: 370,
        recipeId: 'ensalada-cuadril',
      },
      dessertLunch: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colación: té con 15g de maní tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Wok Multicolor de Vegetales: verduras salteadas con sésamo, castañas de caju y salsa de soja + 1 huevo duro.",
        kcal: 300,
        recipeId: 'wok-multicolor',
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porción.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  },
  {
    day: "Domingo",
    focus: "Churrasco + chop suey de pollo",
    targetCalories: 1200,
    macros: { protein: 82, carbs: 96, fat: 42 },
    meals: {
      breakfast: {
        description: "Huevos con Palta y Semillas: 2 huevos + 1/4 palta + semillas de calabaza y girasol + té. Opcional: 1 rodaja de pan de almendras.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Churrasco de Carne + Ensalada Mediterránea: churrasco a la plancha con tomates cherry, albahaca, lechuga morada, almendras y semillas de calabaza. Alternativa: Colorida Quinoa con Huevos Revueltos.",
        kcal: 340,
        recipeId: 'churrasco-ensalada-mediterranea',
        altRecipeId: 'quinoa-huevos-revueltos',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porción.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
      snack: {
        description: "(Opcional) Colación: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Chop Suey de Pollo: pollo en tiritas con puerro, morrones, zanahoria, zucchini, brotes, salsa de soja + nueces y sésamo.",
        kcal: 310,
        recipeId: 'chop-suey-pollo',
      },
      dessertDinner: {
        description: "Pudding de Chía & Frutos Rojos: 1 porción.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
    }
  }
];
