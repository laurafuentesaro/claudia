import React, { useState } from 'react';
import { PlanComparisons } from './components/PlanComparisonsNew';
import { ShoppingList } from './components/ShoppingList';
import { ViewToggle, type ViewMode } from './components/ViewToggle';
import { Header } from './components/Header';
import { ThemeProvider } from './ThemeContext';

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>('plan');

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
              Plan semanal de 1,200 kcal
            </p>
          </div>
          <ViewToggle active={view} onChange={setView} />
          {view === 'plan' ? <PlanComparisons /> : <ShoppingList />}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
