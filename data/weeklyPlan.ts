export type MealSlot = {
  description: string;
  kcal: number;
  recipeId?: string;
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
        description: "Omelette Caprese: 2 huevos + tomate cherry + semillas de calabaza + te.",
        kcal: 290,
      },
      lunch: {
        description: "Completisima Ensalada de Atun: atun al natural con huevo duro, tomate, aceitunas, zanahoria rallada, almendras, semillas de calabaza + mix de verdes con vinagreta de limon y soja.",
        kcal: 350,
        recipeId: 'ensalada-atun-completa',
      },
      dessertLunch: {
        description: "Trufas de Cacao: 1 trufa congelada.",
        kcal: 70,
        recipeId: 'trufas-cacao',
      },
      snack: {
        description: "(Opcional) Colacion: te con 15g de mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Crocante & Colorida Ensalada con Pollo: tiritas de pollo a la plancha con repollo, zanahoria, remolacha, manzana verde, pistachos y pasas — porcion liviana con abundantes verdes.",
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
        description: "Huevos Revueltos con Jamon Crudo: 2 huevos + 2 fetas de jamon crudo + 1/4 palta + te.",
        kcal: 300,
      },
      lunch: {
        description: "Crocante Ensalada con Pollo: porcion completa del lunes.",
        kcal: 340,
        recipeId: 'ensalada-pollo-crocante',
      },
      dessertLunch: {
        description: "Chocolate Negro 85%: 2-3 cuadraditos.",
        kcal: 70,
      },
      snack: {
        description: "(Opcional) Colacion: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Cabutia Relleno de Carne Picada: zapallo relleno con carne picada, puerro, cebolla, pimenton ahumado, sesamo y semillas — porcion liviana + mix de verdes.",
        kcal: 310,
        recipeId: 'cabutia-relleno',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Algarroba y Canela: 1 trufa.",
        kcal: 65,
        recipeId: 'trufas-algarroba-canela',
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
        description: "Huevos con Semillas + Mani: 2 huevos + semillas de calabaza + 10g mani + te.",
        kcal: 300,
      },
      lunch: {
        description: "Cabutia Relleno: porcion completa del martes + mix de verdes.",
        kcal: 350,
        recipeId: 'cabutia-relleno',
      },
      dessertLunch: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Colacion: te con 10g almendras.",
        kcal: 65,
      },
      dinner: {
        description: "Salmon al Horno Almendrado: filet con costra de almendras, ajo y perejil — porcion liviana + ensalada verde con pepino y repollo.",
        kcal: 300,
        recipeId: 'salmon-almendrado',
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
    day: "Jueves",
    focus: "Sobrante salmon + croquetones de pollo",
    targetCalories: 1200,
    macros: { protein: 86, carbs: 86, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos + Palta: 2 huevos + 1/4 palta + te. Opcional: rebanada de pan de almendras y lino.",
        kcal: 280,
        recipeId: 'pan-almendras-lino',
      },
      lunch: {
        description: "Salmon Almendrado: porcion completa del miercoles con ensalada verde.",
        kcal: 340,
        recipeId: 'salmon-almendrado',
      },
      dessertLunch: {
        description: "Dulce de Leche de Datiles: 1 cda sobre rodajas de banana.",
        kcal: 90,
        recipeId: 'dulce-leche-datiles',
      },
      snack: {
        description: "(Opcional) Colacion: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Croquetones de Pollo estilo Miami Juice: pollo desmenuzado con zanahoria, ajo, sesamo y palta pisada — porcion liviana + abundante mix de verdes y semillas.",
        kcal: 300,
        recipeId: 'croquetones-pollo',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Cacao: 1 trufa congelada.",
        kcal: 70,
        recipeId: 'trufas-cacao',
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
        description: "Omelette de Jamon Crudo: 2 huevos + 2 fetas de jamon crudo + semillas + te.",
        kcal: 290,
      },
      lunch: {
        description: "Croquetones de Pollo: porcion completa del jueves + mix de verdes.",
        kcal: 340,
        recipeId: 'croquetones-pollo',
      },
      dessertLunch: {
        description: "Brownie Raw: 1 porcion chica.",
        kcal: 90,
        recipeId: 'brownie-raw',
      },
      snack: {
        description: "(Opcional) Colacion: te con 15g mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Ensalada de Cuadril para Enamorar: cuadril sellado con rucula, tomates cherry, semillas de calabaza, cebolla colorada y aceto — porcion liviana.",
        kcal: 320,
        recipeId: 'ensalada-cuadril',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Barritas de Avena, Limon y Datiles: 1 barrita.",
        kcal: 75,
        recipeId: 'barritas-avena-datiles',
      },
    }
  },
  {
    day: "Sabado",
    focus: "Sobrante cuadril + wok multicolor liviano",
    targetCalories: 1200,
    macros: { protein: 84, carbs: 90, fat: 44 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos + Palta: 2 huevos + 1/4 palta + te.",
        kcal: 280,
      },
      lunch: {
        description: "Ensalada de Cuadril: porcion completa del viernes con rucula fresca.",
        kcal: 370,
        recipeId: 'ensalada-cuadril',
      },
      dessertLunch: {
        description: "Crumble de Manzanas: 1 porcion.",
        kcal: 110,
        recipeId: 'crumble-manzanas',
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
        description: "Trufas de Algarroba y Canela: 1 trufa.",
        kcal: 65,
        recipeId: 'trufas-algarroba-canela',
      },
    }
  },
  {
    day: "Domingo",
    focus: "Sopa crema + chop suey de pollo",
    targetCalories: 1200,
    macros: { protein: 82, carbs: 96, fat: 42 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos + Tomate: 2 huevos + tomate + semillas + te.",
        kcal: 280,
      },
      lunch: {
        description: "Sopa Crema de Vegetales Verdes: brocoli, coliflor, puerro, apio, espinaca + levadura nutricional, semillas tostadas y 1 huevo duro.",
        kcal: 320,
        recipeId: 'sopa-crema-vegetales-verdes',
      },
      dessertLunch: {
        description: "Chocolate Negro 85%: 2-3 cuadraditos.",
        kcal: 70,
      },
      snack: {
        description: "(Opcional) Colacion: yogurt griego + frutos rojos (80g).",
        kcal: 90,
      },
      dinner: {
        description: "Chop Suey de Pollo & Hongos: pollo en tiritas con puerro, morrones, zanahoria, zucchini, champinones, brotes de soja, salsa de soja + nueces y sesamo.",
        kcal: 310,
        recipeId: 'chop-suey-pollo',
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta: 1 porcion.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  }
];
