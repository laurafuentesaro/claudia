import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-theme-border sticky top-0 z-50 bg-theme-bg/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-theme-text font-semibold text-sm tracking-tight">
            Samuel Sämano
          </span>
          <span className="text-theme-muted">/</span>
          <span className="text-theme-secondary text-sm">
            Plan Nutricional
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-theme-card transition-colors text-theme-secondary hover:text-theme-text"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
