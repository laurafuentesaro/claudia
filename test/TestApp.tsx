import React from 'react';
import { PlanComparisons } from './components/PlanComparisons';
import { Header } from './components/Header';
import { ThemeProvider } from './ThemeContext';

const TestAppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text selection:bg-theme-accent/10 transition-colors duration-200">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium text-theme-text mb-1">
              Estrategia Nutricional
            </h2>
            <p className="text-sm text-theme-secondary">
              Plan semanal personalizado basado en tu entrenamiento
            </p>
          </div>
          <PlanComparisons />
        </div>
      </main>
    </div>
  );
};

const TestApp: React.FC = () => {
  return (
    <ThemeProvider>
      <TestAppContent />
    </ThemeProvider>
  );
};

export default TestApp;
