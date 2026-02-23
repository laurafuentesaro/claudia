import React from 'react';
import { Activity, Scale, BatteryWarning, TrendingDown, Clock, Dumbbell, Footprints, Flame, CheckCircle2, AlertTriangle } from 'lucide-react';
import { InfoCard } from './InfoCard';
import { PatientData } from '../types';

interface PatientDashboardProps {
  patient: PatientData;
}

// Plan calórico semanal ajustado
const WEEKLY_CALORIES = {
  plan: [2950, 3200, 2700, 3200, 2600, 3300, 2500], // Lun-Dom
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  training: ['Fondo', 'Series', 'Rodaje', 'Series', 'Desc.', 'Largo', 'Desc.'],
  estimated_expenditure: [2900, 3100, 2650, 3100, 2500, 3200, 2400] // Gasto estimado por día
};

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient }) => {
  const tdee = patient.telemetry?.avgDailyCalories || 2650;
  const weeklyPlanTotal = WEEKLY_CALORIES.plan.reduce((a, b) => a + b, 0);
  const weeklyExpenditure = WEEKLY_CALORIES.estimated_expenditure.reduce((a, b) => a + b, 0);
  const weeklyBalance = weeklyPlanTotal - weeklyExpenditure;
  
  return (
    <div className="space-y-6">
      {/* Telemetry Section */}
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">
          <Activity size={16} className="mr-2" />
          Datos Reales (Media 4 Semanas)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            title="Pasos Diarios" 
            value={patient.telemetry?.avgDailySteps?.toLocaleString() || "0"} 
            subtitle="Promedio diario"
            icon={<Footprints size={20} />}
            alert={true}
          />
          <InfoCard 
            title="Gasto Calórico Total" 
            value={patient.telemetry?.avgDailyCalories?.toLocaleString() || "0"} 
            subtitle="Promedio medido (Reloj)"
            icon={<Flame size={20} />}
          />
          <InfoCard 
            title="Distancia Semanal" 
            value={`${patient.telemetry?.weeklyRunDistance} km`} 
            subtitle="Promedio semanal"
            icon={<Dumbbell size={20} />}
          />
          <InfoCard 
            title="Calorías Activas" 
            value={patient.telemetry?.avgActiveCalories || "0"} 
            subtitle="Ejercicio + Trabajo Físico"
            icon={<Activity size={20} />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metabolic Analysis */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BatteryWarning className="mr-2 text-red-500" />
            Análisis de Carga Alostática
          </h3>
          <p className="text-slate-300 mb-4 text-sm leading-relaxed">
            Las gráficas revelan una discrepancia crítica. Con <strong>21,000 pasos diarios</strong> sumados a 85km de carrera semanal, el gasto calórico de 2650 kcal es probablemente el <em>piso</em> metabólico, no el techo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="text-white font-medium text-sm">Riesgo de LEA (Baja Disponibilidad)</h4>
              <p className="text-slate-400 text-xs mt-1">
                Si la ingesta es &lt; 2500 kcal, el cuerpo apaga funciones no esenciales (reproducción, quema de grasa) para preservar energía vital. Esto explica la fatiga.
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="text-white font-medium text-sm">Variabilidad Diaria</h4>
              <p className="text-slate-400 text-xs mt-1">
                Gráficas muestran días de 1700 kcal vs 2800 kcal. El plan nutricional DEBE ondular. Comer igual un lunes (2800 gasto) que un sábado (1700 gasto) es el error.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-slate-400 text-xs uppercase font-bold mb-2">Metabolismo Basal (Medido)</div>
            <div className="text-2xl text-white font-mono">~{patient.telemetry?.avgRestingCalories} kcal</div>
            <div className="text-xs text-slate-500 mt-1">Lo que quema solo por existir.</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-slate-400 text-xs uppercase font-bold mb-2">NEAT Estimado</div>
            <div className="text-2xl text-emerald-400 font-mono">Alto Impacto</div>
            <div className="text-xs text-slate-500 mt-1">Debido al trabajo manual + 20k pasos.</div>
          </div>
        </div>
      </div>

      {/* Balance Calórico Semanal - NUEVO */}
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
        <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">
          <CheckCircle2 size={16} className="mr-2" />
          Balance Calórico Semanal (Plan Ajustado)
        </h3>

        {/* Resumen semanal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-500/30">
            <div className="text-emerald-400 text-xs uppercase font-bold mb-1">Plan Semanal</div>
            <div className="text-2xl text-white font-bold">{weeklyPlanTotal.toLocaleString()} kcal</div>
            <div className="text-xs text-slate-400 mt-1">Promedio: {Math.round(weeklyPlanTotal / 7).toLocaleString()} kcal/día</div>
          </div>
          <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
            <div className="text-orange-400 text-xs uppercase font-bold mb-1">Gasto Estimado</div>
            <div className="text-2xl text-white font-bold">{weeklyExpenditure.toLocaleString()} kcal</div>
            <div className="text-xs text-slate-400 mt-1">Basado en telemetría + entrenamiento</div>
          </div>
          <div className={`p-4 rounded-lg border ${weeklyBalance >= 0 ? 'bg-blue-900/30 border-blue-500/30' : 'bg-red-900/30 border-red-500/30'}`}>
            <div className={`text-xs uppercase font-bold mb-1 ${weeklyBalance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>Balance Semanal</div>
            <div className="text-2xl text-white font-bold">{weeklyBalance >= 0 ? '+' : ''}{weeklyBalance.toLocaleString()} kcal</div>
            <div className="text-xs text-slate-400 mt-1">{weeklyBalance >= 0 ? 'Superávit ligero para recuperación' : 'Déficit - ajustar'}</div>
          </div>
        </div>

        {/* Gráfico de barras día a día */}
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <div className="text-slate-400 text-xs uppercase font-bold mb-4">Plan vs Gasto por Día</div>
          <div className="flex items-end justify-between gap-2 h-40">
            {WEEKLY_CALORIES.labels.map((label, idx) => {
              const plan = WEEKLY_CALORIES.plan[idx];
              const expenditure = WEEKLY_CALORIES.estimated_expenditure[idx];
              const maxVal = 3500;
              const planHeight = (plan / maxVal) * 100;
              const expHeight = (expenditure / maxVal) * 100;
              const balance = plan - expenditure;
              const isSeriesDay = WEEKLY_CALORIES.training[idx] === 'Series' || WEEKLY_CALORIES.training[idx] === 'Largo';

              return (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex justify-center gap-1 h-32">
                    {/* Barra de Plan */}
                    <div
                      className={`w-3 rounded-t transition-all ${isSeriesDay ? 'bg-emerald-500' : 'bg-emerald-600/70'}`}
                      style={{ height: `${planHeight}%` }}
                      title={`Plan: ${plan} kcal`}
                    />
                    {/* Barra de Gasto */}
                    <div
                      className="w-3 bg-orange-500/60 rounded-t transition-all"
                      style={{ height: `${expHeight}%` }}
                      title={`Gasto: ${expenditure} kcal`}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-bold ${isSeriesDay ? 'text-emerald-400' : 'text-slate-400'}`}>{label}</div>
                    <div className="text-[10px] text-slate-500">{WEEKLY_CALORIES.training[idx]}</div>
                    <div className={`text-[10px] font-medium ${balance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                      {balance >= 0 ? '+' : ''}{balance}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded" />
              <span className="text-slate-400">Plan (ingesta)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500/60 rounded" />
              <span className="text-slate-400">Gasto estimado</span>
            </div>
          </div>
        </div>

        {/* Nota de periodización */}
        <div className="mt-4 bg-emerald-900/20 border border-emerald-500/20 p-3 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-emerald-200 font-bold text-sm">Plan Periodizado Correctamente</h4>
            <p className="text-emerald-100/70 text-xs mt-1">
              Días de series (Mar/Jue) y fondo largo (Sáb): +3,200-3,300 kcal. Días de descanso: ~2,500 kcal.
              Esto respeta la variabilidad de gasto detectada en la telemetría y evita el déficit crónico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};