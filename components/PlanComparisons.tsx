import React, { useState } from 'react';
import { CheckCircle2, XCircle, Flame, Brain, Utensils, Calendar, Leaf, Coffee, Sun, Moon, Droplets, ShieldCheck, Clock } from 'lucide-react';

type DayPlan = {
  day: string;
  training: string;
  focus: string;
  targetCalories: number;
  macros: {
    protein: number;  // gramos
    carbs: number;    // gramos
    fat: number;      // gramos
  };
  meals: {
    breakfast: { description: string; kcal: number };
    lunch: { description: string; kcal: number };
    snack: { description: string; kcal: number };
    dinner: { description: string; kcal: number };
  };
};

// CALORÍAS AJUSTADAS: Basado en TDEE 2,654 kcal + déficit cero para recuperación
// Peso: 63kg | Proteína: 1.8g/kg | Carbos periodizados: 5-10g/kg | Grasas: 1g/kg
const WEEKLY_PLAN: DayPlan[] = [
  {
    day: "Lunes",
    training: "Fondo Suave (12-20km)",
    focus: "Energía Sostenida (Día Largo hasta 20hs)",
    targetCalories: 2950,
    macros: { protein: 115, carbs: 420, fat: 70 },
    meals: {
      breakfast: {
        description: "06:20 AM - Bowl Frío: 250g Yogurt Natural + 1 Banana + 60g avena hidratada + 30g Nueces + 1 cda Miel.",
        kcal: 650
      },
      lunch: {
        description: "11:30 - 14:30 (Vianda): Poke Bowl 'Mediterráneo': 200g Quinoa cocida + 1 lata Atún (170g) + 2 Huevos duros + Tomate + Aceitunas + 1 cda Aceite Oliva.",
        kcal: 780
      },
      snack: {
        description: "18:00 HS: 1 Banana + 2 Tostadas Pan Integral con 2 cdas Mantequilla de Maní + 200ml Leche.",
        kcal: 550
      },
      dinner: {
        description: "21:00 HS - 200g Pechuga de Pollo grillada + 200g Arroz integral + Ensalada completa (Rúcula, Tomate, Remolacha) + 1 cda Aceite de Oliva.",
        kcal: 970
      }
    }
  },
  {
    day: "Martes",
    training: "CALIDAD: 10x1000m a 21km/h",
    focus: "Carga de Glucógeno & Cafeína",
    targetCalories: 3200,
    macros: { protein: 120, carbs: 500, fat: 65 },
    meals: {
      breakfast: {
        description: "07:20 AM - Licuado CARGADO: 2 Bananas + 300ml Leche + 60g avena hidratada + 1 cda Miel. + 2 Tostadas Pan Integral con Mermelada.",
        kcal: 750
      },
      lunch: {
        description: "11:30 - 14:30 (Vianda Carga): Poke Bowl 'Energía': 250g Arroz Blanco + 150g Pollo + Mango + Zanahoria + 1 cda Salsa Soja. + 1 Banana de postre.",
        kcal: 850
      },
      snack: {
        description: "18:00 HS (Pre-Entreno): 2 Sándwiches Pan Integral con Queso y Dulce de Membrillo + Café/Matcha frío + 1 Banana.",
        kcal: 600
      },
      dinner: {
        description: "Post-Series (Recuperación CRÍTICA): 300g Pasta/Fideos cocidos + 150g Merluza + 2 Huevos + 1 cda Aceite Oliva. (Prioridad: Rellenar glucógeno).",
        kcal: 1000
      }
    }
  },
  {
    day: "Miércoles",
    training: "Rodaje Medio (12-14km)",
    focus: "Mantenimiento & Saciedad",
    targetCalories: 2700,
    macros: { protein: 115, carbs: 370, fat: 70 },
    meals: {
      breakfast: {
        description: "06:20 AM - 3 Tostadas Pan Integral con 1 Palta entera pisada + 2 Huevos revueltos + 1 Naranja.",
        kcal: 650
      },
      lunch: {
        description: "11:30 - 14:30 (Vianda): Poke Bowl 'Vegetariano Power': 150g Lentejas + 150g Arroz + 2 Huevos duros + 30g Almendras + Vegetales.",
        kcal: 750
      },
      snack: {
        description: "18:30 HS: Bowl Grande de Frutas (300g) con 200g Yogurt y 40g Mix Frutos Secos + 1 cda Miel.",
        kcal: 500
      },
      dinner: {
        description: "Omelette de 3 huevos con queso + Ensalada de tomate + 2 Rebanadas Pan Integral + 150g Boniato asado.",
        kcal: 800
      }
    }
  },
  {
    day: "Jueves",
    training: "CALIDAD: 10x1000m a 21km/h",
    focus: "Resistencia (Día Largo + Intensidad)",
    targetCalories: 3200,
    macros: { protein: 120, carbs: 500, fat: 65 },
    meals: {
      breakfast: {
        description: "07:20 AM - Overnight Oats CARGADO: 300ml Leche + 80g Avena hidratada + Chía + 2 cdas Mantequilla Maní + 1 Banana picada + Miel.",
        kcal: 750
      },
      lunch: {
        description: "11:30 - 14:30 (Vianda Carga): Poke Bowl 'Criollo': 250g Arroz Yamaní + 150g Carne magra (Peceto) + 150g Calabaza asada + Semillas + 1 fruta.",
        kcal: 850
      },
      snack: {
        description: "17:30 HS (Pre-Series): 3 Tostadas Pan Integral con Mermelada + Queso untable + 1 Banana + 200ml Leche chocolatada.",
        kcal: 650
      },
      dinner: {
        description: "22:00 HS (Post-Series): Wok abundante: 200g Pollo + Vegetales + 250g Boniato al horno + 150g Arroz. (Carbos para recuperar).",
        kcal: 950
      }
    }
  },
  {
    day: "Viernes",
    training: "Descanso Activo / Suave",
    focus: "Nutrición Densa & Recuperación",
    targetCalories: 2600,
    macros: { protein: 115, carbs: 340, fat: 75 },
    meals: {
      breakfast: {
        description: "06:20 AM - Ensalada de Frutas abundante (400g) + 250g Yogurt + 50g Granola + 20g Nueces.",
        kcal: 600
      },
      lunch: {
        description: "11:30 - 14:30 (Vianda): Ensalada de 200g Pasta Integral + 1 lata Atún + 2 Huevos + 1/2 Palta + Aceitunas + Aceite Oliva.",
        kcal: 780
      },
      snack: {
        description: "18:30 HS: 2 Sándwiches de Pan Integral con 100g Pollo y Tomate + 1 Yogurt bebible.",
        kcal: 500
      },
      dinner: {
        description: "150g Salmón/Atún a la plancha + Vegetales al vapor + 200g Papas al natural + Ensalada con Aceite Oliva.",
        kcal: 720
      }
    }
  },
  {
    day: "Sábado",
    training: "Fondo Largo (20km+)",
    focus: "Combustible de Fondo",
    targetCalories: 3300,
    macros: { protein: 115, carbs: 520, fat: 70 },
    meals: {
      breakfast: {
        description: "PRE-LARGO (7:00 AM): 4 Tostadas Pan Integral con Miel + 2 Bananas + té verde o café frío. (Carbos de fácil absorción).",
        kcal: 700
      },
      lunch: {
        description: "POST-LARGO (12:00): Poke Bowl 'Full Carb': 300g Arroz Blanco + 150g Pollo + 2 Huevos + Remolacha + 1 cda Aceite. + Jugo natural (preferir remolacha).",
        kcal: 950
      },
      snack: {
        description: "16:00 - Licuado Recuperador GRANDE: 400ml Leche + 2 Bananas + 2 cdas Cacao + 1 cda Miel + 40g Avena hidratada.",
        kcal: 650
      },
      dinner: {
        description: "Cena Libre GANADA: Pizza casera (3 porciones) o 300g Pasta con salsa y queso + Ensalada.",
        kcal: 1000
      }
    }
  },
  {
    day: "Domingo",
    training: "Descanso Total",
    focus: "Recuperación & Comida Casera",
    targetCalories: 2500,
    macros: { protein: 110, carbs: 320, fat: 80 },
    meals: {
      breakfast: {
        description: "Horario Libre (9-10 AM): Mate/Té + 3 Tostadas integrales con Manteca y Mermelada + 1 Fruta + Jugo.",
        kcal: 550
      },
      lunch: {
        description: "ALMUERZO: 200g Carne al Horno (Colita/Vacío) + 250g Papas/Boniatos/Calabaza asados + Ensalada con Aceite.",
        kcal: 900
      },
      snack: {
        description: "17:00 - 200g Yogurt con frutas frescas + 1 porción de Helado o 2 Medialunas.",
        kcal: 400
      },
      dinner: {
        description: "Cena Completa: Sopa de verduras fría + 2 Tostadas con queso + Ensalada Caprese + 1 fruta de postre.",
        kcal: 650
      }
    }
  }
];

export const PlanComparisons: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const currentPlan = WEEKLY_PLAN[selectedDayIndex];

  return (
    <div className="space-y-8">
      
      {/* 1. Diagnóstico Estratégico */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Clock className="mr-2 text-emerald-400" />
          Horarios & Rendimiento
        </h3>
        <p className="text-slate-300 text-sm mb-4 leading-relaxed">
          • <strong>Lunes y Jueves (Días Largos hasta 20hs):</strong> Merienda power para no llegar con hambre al final del día.
          <br/>
          • <strong>Martes y Jueves (Series 21km/h):</strong> Cena post-entrenamiento con carga de carbohidratos para bajar cortisol y permitir la quema de grasa.
          <br/>
          • <strong>Viandas (11:30 - 14:30):</strong> Todas las opciones de almuerzo están pensadas para comerse frías (Poke Bowls, Ensaladas de Pasta/Lentejas).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-3 rounded border border-slate-700">
            <div className="text-orange-400 font-bold text-xs uppercase mb-1">06:20 / 07:20 AM</div>
            <div className="text-white text-sm">Desayuno Energético</div>
            <div className="text-slate-500 text-xs mt-1">Yogurt, Avena hidratada, Fruta o Tostadas.</div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-700">
            <div className="text-blue-400 font-bold text-xs uppercase mb-1">Vianda 11:30</div>
            <div className="text-white text-sm">Almuerzo Práctico</div>
            <div className="text-slate-500 text-xs mt-1">Bowls completos que no necesitan ser calentados.</div>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-700">
            <div className="text-emerald-400 font-bold text-xs uppercase mb-1">Martes/Jueves</div>
            <div className="text-white text-sm">Calidad + Recuperación</div>
            <div className="text-slate-500 text-xs mt-1">Pre-entreno con cafeína fría y Cena con carbos.</div>
          </div>
        </div>
      </div>

      {/* 2. Selector de Días */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex border-b border-slate-800">
            {WEEKLY_PLAN.map((plan, idx) => (
              <button
                key={plan.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`flex-1 py-4 px-2 text-sm font-medium transition-colors min-w-[100px] ${
                  selectedDayIndex === idx 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {plan.day}
              </button>
            ))}
          </div>
        </div>
        
        {/* Contenido del Día */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Calendar className="mr-2 text-emerald-400" />
                {currentPlan.day}
              </h3>
              <div className="mt-2 flex items-center space-x-2">
                 <span className="bg-emerald-900/50 text-emerald-300 px-3 py-1 rounded text-xs border border-emerald-500/30 flex items-center">
                    <Flame size={12} className="mr-1" />
                    {currentPlan.training}
                 </span>
              </div>
            </div>
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-700">
              Foco: {currentPlan.focus}
            </span>
          </div>

          {/* RESUMEN CALÓRICO DEL DÍA */}
          <div className="bg-gradient-to-r from-emerald-900/30 to-slate-800 rounded-xl p-4 mb-6 border border-emerald-500/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Flame className="text-orange-400" size={24} />
                <div>
                  <div className="text-2xl font-bold text-white">{currentPlan.targetCalories} kcal</div>
                  <div className="text-xs text-slate-400">Objetivo del día</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{currentPlan.macros.protein}g</div>
                  <div className="text-xs text-slate-500">Proteína</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-400">{currentPlan.macros.carbs}g</div>
                  <div className="text-xs text-slate-500">Carbos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{currentPlan.macros.fat}g</div>
                  <div className="text-xs text-slate-500">Grasas</div>
                </div>
              </div>
            </div>
            <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(currentPlan.macros.protein * 4 / currentPlan.targetCalories) * 100}%` }}
                title={`Proteína: ${Math.round((currentPlan.macros.protein * 4 / currentPlan.targetCalories) * 100)}%`}
              />
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${(currentPlan.macros.carbs * 4 / currentPlan.targetCalories) * 100}%` }}
                title={`Carbos: ${Math.round((currentPlan.macros.carbs * 4 / currentPlan.targetCalories) * 100)}%`}
              />
              <div
                className="bg-purple-500 h-full"
                style={{ width: `${(currentPlan.macros.fat * 9 / currentPlan.targetCalories) * 100}%` }}
                title={`Grasas: ${Math.round((currentPlan.macros.fat * 9 / currentPlan.targetCalories) * 100)}%`}
              />
            </div>
          </div>

          <div className="space-y-6 relative">
            {/* Timeline connector */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-800" />

            <div className="relative pl-12 group">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center group-hover:border-emerald-500 transition-colors z-10">
                <Sun size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-slate-400 text-xs font-bold uppercase">Desayuno</h4>
                  <span className="text-amber-400 text-xs font-bold bg-amber-900/30 px-2 py-0.5 rounded">{currentPlan.meals.breakfast.kcal} kcal</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <p className="text-slate-200">{currentPlan.meals.breakfast.description}</p>
                </div>
              </div>
            </div>

            <div className="relative pl-12 group">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center group-hover:border-emerald-500 transition-colors z-10">
                <Utensils size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-slate-400 text-xs font-bold uppercase">Almuerzo (Vianda)</h4>
                  <span className="text-blue-400 text-xs font-bold bg-blue-900/30 px-2 py-0.5 rounded">{currentPlan.meals.lunch.kcal} kcal</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <p className="text-slate-200">{currentPlan.meals.lunch.description}</p>
                </div>
              </div>
            </div>

            <div className="relative pl-12 group">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center bg-emerald-900/20 z-10">
                <Clock size={18} className="text-orange-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-emerald-400 text-xs font-bold uppercase">Merienda / Pre-Entreno</h4>
                  <span className="text-orange-400 text-xs font-bold bg-orange-900/30 px-2 py-0.5 rounded">{currentPlan.meals.snack.kcal} kcal</span>
                </div>
                <div className="bg-gradient-to-r from-emerald-900/10 to-slate-800 p-4 rounded-lg border border-emerald-500/20">
                  <p className="text-white font-medium">{currentPlan.meals.snack.description}</p>
                </div>
              </div>
            </div>

            <div className="relative pl-12 group">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center group-hover:border-emerald-500 transition-colors z-10">
                <Moon size={18} className="text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-slate-400 text-xs font-bold uppercase">Cena</h4>
                  <span className="text-indigo-400 text-xs font-bold bg-indigo-900/30 px-2 py-0.5 rounded">{currentPlan.meals.dinner.kcal} kcal</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <p className="text-slate-200">{currentPlan.meals.dinner.description}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      

    </div>
  );
};
