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
    focus: "Inicio de semana — ensalada de atun y pollo crocante",
    targetCalories: 1200,
    macros: { protein: 76, carbs: 98, fat: 46 },
    meals: {
      breakfast: {
        description: "Omelette Caprese: 2 huevos + tomate cherry + mozzarella (30g) + albahaca fresca + cafe con leche deslactosada.",
        kcal: 300,
      },
      lunch: {
        description: "Completisima Ensalada de Atun: atun al natural con huevo duro, tomate, aceitunas, zanahoria rallada, almendras, semillas de calabaza + mix de verdes con vinagreta de limon y soja.",
        kcal: 350,
        recipeId: 'ensalada-atun-completa',
      },
      dessertLunch: {
        description: "Trufas de Cacao by Cora: 1 trufa congelada.",
        kcal: 70,
        recipeId: 'trufas-cacao',
      },
      snack: {
        description: "(Opcional) Merienda: cafe con 15g de mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Crocante & Colorida Ensalada con Pollo: tiritas de pollo a la plancha con repollo, zanahoria, remolacha, manzana verde, pistachos y pasas con vinagreta de mostaza y lima.",
        kcal: 340,
        recipeId: 'ensalada-pollo-crocante',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta by Cora: 1 porcion.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  },
  {
    day: "Martes",
    focus: "Sobrante ensalada pollo + cabutia relleno",
    targetCalories: 1200,
    macros: { protein: 74, carbs: 100, fat: 44 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos + Palta: 2 huevos + 1/4 palta + cafe con leche deslactosada.",
        kcal: 280,
      },
      lunch: {
        description: "Crocante Ensalada con Pollo: porcion del lunes.",
        kcal: 340,
        recipeId: 'ensalada-pollo-crocante',
      },
      dessertLunch: {
        description: "Brownie de Cora: 1 porcion.",
        kcal: 100,
        recipeId: 'brownie-cora',
      },
      snack: {
        description: "(Opcional) Merienda: yogur descremado con frutos rojos (80g).",
        kcal: 80,
      },
      dinner: {
        description: "Cabutia Relleno de Carne Picada: zapallo relleno con carne picada, puerro, cebolla, pimenton ahumado, queso y sesamo + mix de verdes.",
        kcal: 350,
        recipeId: 'cabutia-relleno',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Algarroba y Canela by Cora: 1 trufa.",
        kcal: 65,
        recipeId: 'trufas-algarroba-canela',
      },
    }
  },
  {
    day: "Miercoles",
    focus: "Sobrante cabutia + salmon a la mostaza",
    targetCalories: 1200,
    macros: { protein: 72, carbs: 96, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos con Queso + Mani: 2 huevos + 20g queso + 10g mani + cafe con leche deslactosada.",
        kcal: 310,
      },
      lunch: {
        description: "Cabutia Relleno: porcion del martes.",
        kcal: 350,
        recipeId: 'cabutia-relleno',
      },
      dessertLunch: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Merienda: cafe con 10g almendras.",
        kcal: 65,
      },
      dinner: {
        description: "Salmon a la Mostaza: filet al horno con cobertura de mostaza Dijon y mermelada de damascos + ensalada de rucula, cherry, cilantro y almendras tostadas.",
        kcal: 340,
        recipeId: 'salmon-mostaza',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta by Cora: 1 porcion.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  },
  {
    day: "Jueves",
    focus: "Sobrante salmon + croquetones de pollo",
    targetCalories: 1200,
    macros: { protein: 76, carbs: 94, fat: 46 },
    meals: {
      breakfast: {
        description: "Tostada + Palta + Huevo: 1 tostada integral + 1/4 palta + 1 huevo + cafe con leche deslactosada.",
        kcal: 300,
      },
      lunch: {
        description: "Salmon a la Mostaza: porcion del miercoles con mix de verdes.",
        kcal: 340,
        recipeId: 'salmon-mostaza',
      },
      dessertLunch: {
        description: "Dulce de Leche de Datiles by Cora: 1 cda sobre rodajas de banana.",
        kcal: 90,
        recipeId: 'dulce-leche-datiles',
      },
      snack: {
        description: "(Opcional) Merienda: frutos rojos (80g).",
        kcal: 40,
      },
      dinner: {
        description: "Croquetones de Pollo estilo Miami Juice: pollo desmenuzado con zanahoria, ajo, sesamo y palta pisada como mayonesa saludable + abundante mix de verdes.",
        kcal: 340,
        recipeId: 'croquetones-pollo',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Cacao by Cora: 1 trufa congelada.",
        kcal: 70,
        recipeId: 'trufas-cacao',
      },
    }
  },
  {
    day: "Viernes",
    focus: "Sobrante croquetones + ensalada de cuadril",
    targetCalories: 1200,
    macros: { protein: 78, carbs: 88, fat: 48 },
    meals: {
      breakfast: {
        description: "Omelette de Jamon: 2 huevos + 30g jamon + 20g queso + cafe con leche deslactosada.",
        kcal: 290,
      },
      lunch: {
        description: "Croquetones de Pollo: porcion del jueves.",
        kcal: 340,
        recipeId: 'croquetones-pollo',
      },
      dessertLunch: {
        description: "Brownie Raw: 1 porcion chica.",
        kcal: 90,
        recipeId: 'brownie-raw',
      },
      snack: {
        description: "(Opcional) Merienda: 15g mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Ensalada de Cuadril para Enamorar: cuadril sellado con rucula, tomates cherry, parmesano laminado y aceto balsamico.",
        kcal: 380,
        recipeId: 'ensalada-cuadril',
        cookForDays: 2,
      },
      dessertDinner: {
        description: "Trufas de Algarroba y Canela by Cora: 1 trufa.",
        kcal: 65,
        recipeId: 'trufas-algarroba-canela',
      },
    }
  },
  {
    day: "Sabado",
    focus: "Sobrante cuadril + churrasco mediterraneo",
    targetCalories: 1200,
    macros: { protein: 80, carbs: 90, fat: 46 },
    meals: {
      breakfast: {
        description: "Huevos Revueltos + Palta: 2 huevos + 1/4 palta + cafe con leche deslactosada.",
        kcal: 280,
      },
      lunch: {
        description: "Ensalada de Cuadril: porcion del viernes con rucula fresca.",
        kcal: 380,
        recipeId: 'ensalada-cuadril',
      },
      dessertLunch: {
        description: "Pudding de Chia & Frutos Rojos: 1 porcion.",
        kcal: 85,
        recipeId: 'pudding-chia-frutos-rojos',
      },
      snack: {
        description: "(Opcional) Merienda: cafe con 15g de mani tostado.",
        kcal: 90,
      },
      dinner: {
        description: "Churrasco de Carne + Ensalada Mediterranea: churrasco a la sarten con tomates cherry, albahaca fresca, lechuga morada, almendras y semillas de calabaza.",
        kcal: 350,
        recipeId: 'churrasco-ensalada-mediterranea',
      },
      dessertDinner: {
        description: "Brownie de Cora: 1 porcion.",
        kcal: 100,
        recipeId: 'brownie-cora',
      },
    }
  },
  {
    day: "Domingo",
    focus: "Sopa de Cora + chop suey de pollo",
    targetCalories: 1200,
    macros: { protein: 70, carbs: 102, fat: 42 },
    meals: {
      breakfast: {
        description: "Huevos con Queso: 2 huevos + 20g queso + tomate + cafe con leche deslactosada.",
        kcal: 290,
      },
      lunch: {
        description: "Sopa Crema de Vegetales Verdes de Cora: brocoli, coliflor, puerro, apio, espinaca + levadura nutricional y semillas tostadas. Con 1 huevo duro.",
        kcal: 320,
        recipeId: 'sopa-crema-vegetales-verdes',
      },
      dessertLunch: {
        description: "Crepes de Avena & Almendras by Cora: 1 crepe con fruta.",
        kcal: 100,
        recipeId: 'crepes-avena-almendras',
      },
      snack: {
        description: "(Opcional) Merienda: frutos rojos (80g).",
        kcal: 40,
      },
      dinner: {
        description: "Chop Suey de Pollo & Hongos: pollo en tiritas con puerro, morrones, zanahoria, zucchini, champinones, brotes de soja, salsa de soja + nueces y sesamo.",
        kcal: 320,
        recipeId: 'chop-suey-pollo',
      },
      dessertDinner: {
        description: "Mousse de Cacao & Palta by Cora: 1 porcion.",
        kcal: 90,
        recipeId: 'mousse-cacao-palta',
      },
    }
  }
];
