import React, { useState } from 'react';
import { PlanComparisons } from './components/PlanComparisonsNew';
import { ShoppingList } from './components/ShoppingList';
import { Recetario } from './components/Recetario';
import { ViewToggle, type ViewMode } from './components/ViewToggle';
import { Header } from './components/Header';
import { ThemeProvider } from './ThemeContext';
import { PlanProvider, usePlan } from './PlanContext';
import { PlanSelector } from './components/PlanSelector';

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>('plan');
  const { activePlan } = usePlan();

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
              {activePlan.description}
            </p>
          </div>
          <PlanSelector />
          <ViewToggle active={view} onChange={setView} />
          <div key={view} className="animate-fade-in">
            {view === 'plan' && <PlanComparisons />}
            {view === 'shopping' && <ShoppingList />}
            {view === 'recetario' && <Recetario />}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PlanProvider>
        <AppContent />
      </PlanProvider>
    </ThemeProvider>
  );
};

export default App;
