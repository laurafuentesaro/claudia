export interface PatientData {
  name: string;
  gender: 'male' | 'female';
  age: number; // Estimated based on description if not provided, say 30 for calc
  height: number; // cm
  weight: number; // kg
  targetWeight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'heavy' | 'athlete';
  telemetry?: {
    avgDailySteps: number;
    avgDailyCalories: number;
    avgRestingCalories: number;
    avgActiveCalories: number;
    weeklyRunDistance: number; // km
    monthlyRunVolume: number; // km
  };
}

export interface DailyRoutine {
  wakeUp: string;
  workType: string;
  trainingType: string;
  trainingIntensity: 'Low' | 'Moderate' | 'High' | 'Elite';
  symptoms: string[];
}

export interface MacroDistribution {
  name: string;
  value: number;
  fill: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}