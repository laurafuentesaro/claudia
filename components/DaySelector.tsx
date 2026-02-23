import React from 'react';

interface DaySelectorProps {
  days: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  selectedIndex,
  onSelect,
}) => {
  return (
    <div className="border-b border-theme-border">
      <div className="flex gap-1 overflow-x-auto scrollbar-thin">
        {days.map((day, idx) => (
          <button
            key={day}
            onClick={() => onSelect(idx)}
            className={`
              relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
              ${selectedIndex === idx
                ? 'text-theme-text'
                : 'text-theme-muted hover:text-theme-secondary'
              }
            `}
          >
            {day}
            {selectedIndex === idx && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-theme-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
