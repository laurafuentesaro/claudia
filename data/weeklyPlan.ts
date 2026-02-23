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
    focus: "Inicio de semana — ensalada de atun + ensalada pollo crocante",
    targetCalories: 1200,
    macros: { protein: 86, carbs: 90, fat: 44 },
    meals: {
      breakfast: {
        description: "Omelette Caprese: 2 huevos + tomate cherry + un poco de queso fresco + semillas de calabaza + te.",
        kcal: 300,
      },
      lunch: {
        description: "Completisima Ensalada de Atun: atun al natural con huevo duro, tomate, aceitunas, zanahoria rallada, almendras, semillas de calabaza + mix de verdes con vinagreta de limon y soja.",
        kcal: 350,
        recipeId: 'ensalada-atun-completa',
      },
      dessertLunch: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colacion: te con 15g de mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Crocante & Colorida Ensalada con Pollo: tiritas de pollo a la plancha con repollo, zanahoria, remolacha, manzana verde, pistachos y almendras fileteadas con abundantes verdes.",
        kcal: 300,
        recipeId: 'ensalada-pollo-crocante',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porcion.",
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
        description: "Tostado de Pan de Almendras: 1 rodaja de pan de almendras tostado + 2 fetas de jamon crudo + un poco de queso + semillas de girasol + te.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Crocante Ensalada con Pollo: porcion completa del lunes.",
        kcal: 340,
        recipeId: 'ensalada-pollo-crocante',
      },
      dessertLunch: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colacion: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Cabutia Relleno de Carne Picada: zapallo relleno con carne picada, puerro, cebolla de verdeo, pimenton ahumado, sesamo y semillas + mix de verdes.",
        kcal: 310,
        recipeId: 'cabutia-relleno',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Limon, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limon-coco-almendras',
      },
    }
  },
  {
    day: "Miercoles",
    focus: "Sobrante cabutia + salmon almendrado",
    targetCalories: 1200,
    macros: { protein: 84, carbs: 88, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos con Palta: 2 huevos + 1/4 palta + semillas de sesamo + te. Opcional: 1 rodaja de pan de almendras.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Cabutia Relleno: porcion completa del martes + mix de verdes.",
        kcal: 350,
        recipeId: 'cabutia-relleno',
      },
      dessertLunch: {
        description: "Trufas de Limon, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limon-coco-almendras',
      },
      snack: {
        description: "(Opcional) Colacion: te con 10g almendras.",
        kcal: 65,
      },
      dinner: {
        description: "Salmon al Horno Almendrado: filet con costra de almendras, ajo y perejil + ensalada verde con pepino y repollo.",
        kcal: 300,
        recipeId: 'salmon-almendrado',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Crumble de Manzanas: 1 porcion.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
    }
  },
  {
    day: "Jueves",
    focus: "Sobrante salmon + croquetones de pollo",
    targetCalories: 1200,
    macros: { protein: 86, carbs: 86, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos con Palta y Tomate: 2 huevos + 1/4 palta + tomate + semillas de calabaza + te. Opcional: 1 rodaja de pan de almendras.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Salmon Almendrado: porcion completa del miercoles con ensalada verde.",
        kcal: 340,
        recipeId: 'salmon-almendrado',
      },
      dessertLunch: {
        description: "Mousse de Cacao & Palta: 1 porcion.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
      snack: {
        description: "(Opcional) Colacion: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Croquetones de Pollo estilo Miami Juice: pollo desmenuzado con zanahoria, cebolla de verdeo, sesamo y palta pisada + abundante mix de verdes y semillas.",
        kcal: 300,
        recipeId: 'croquetones-pollo',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Limon, Coco y Almendras: 1 trufa.",
        kcal: 85,
        recipeId: 'trufas-limon-coco-almendras',
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
        description: "Tostado de Pan de Almendras: 1 rodaja de pan de almendras tostado + 2 fetas de jamon crudo + semillas de chia + te.",
        kcal: 280,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Croquetones de Pollo: porcion completa del jueves + mix de verdes.",
        kcal: 340,
        recipeId: 'croquetones-pollo',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porcion.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
      snack: {
        description: "(Opcional) Colacion: te con 15g mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Ensalada de Cuadril para Enamorar: cuadril sellado con rucula, tomates cherry, semillas de calabaza, cebolla de verdeo y aceto.",
        kcal: 320,
        recipeId: 'ensalada-cuadril',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porcion.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  },
  {
    day: "Sabado",
    focus: "Sobrante cuadril + wok multicolor",
    targetCalories: 1200,
    macros: { protein: 84, carbs: 90, fat: 44 },
    meals: {
      breakfast: {
        description: "Yogurt Griego con Semillas: yogurt griego + semillas de girasol + frutos rojos (80g) + te. Opcional: 1 rodaja de pan de almendras.",
        kcal: 280,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Ensalada de Cuadril: porcion completa del viernes con rucula fresca.",
        kcal: 370,
        recipeId: 'ensalada-cuadril',
      },
      dessertLunch: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colacion: te con 15g de mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Wok Multicolor de Vegetales: verduras salteadas con sesamo, castanas de caju y salsa de soja + 1 huevo duro.",
        kcal: 300,
        recipeId: 'wok-multicolor',
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porcion.",
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
        description: "Huevos con Palta y Semillas: 2 huevos + 1/4 palta + semillas de calabaza y girasol + te. Opcional: 1 rodaja de pan de almendras.",
        kcal: 290,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Churrasco de Carne + Ensalada Mediterranea: churrasco a la plancha con tomates cherry, albahaca, lechuga morada, almendras y semillas de calabaza. Alternativa: Colorida Quinoa con Huevos Revueltos.",
        kcal: 340,
        recipeId: 'churrasco-ensalada-mediterranea',
        altRecipeId: 'quinoa-huevos-revueltos',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porcion.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
      },
      snack: {
        description: "(Opcional) Colacion: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Chop Suey de Pollo: pollo en tiritas con puerro, morrones, zanahoria, zucchini, brotes, salsa de soja + nueces y sesamo.",
        kcal: 310,
        recipeId: 'chop-suey-pollo',
      },
      dessertDinner: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
    }
  }
];
