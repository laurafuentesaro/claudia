import React, { useRef, useEffect, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLButtonElement>('[data-tab]');
    const active = buttons[selectedIndex];
    if (active) {
      setIndicator({
        left: active.offsetLeft,
        width: active.offsetWidth,
      });
      if (!ready) requestAnimationFrame(() => setReady(true));
    }
  }, [selectedIndex, ready]);

  return (
    <div className="border-b border-theme-border relative">
      <div ref={containerRef} className="flex gap-1 overflow-x-auto scrollbar-thin">
        {days.map((day, idx) => (
          <button
            key={day}
            data-tab
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
          </button>
        ))}
      </div>
      <div
        className={`absolute bottom-0 h-0.5 bg-theme-accent ${
          ready ? 'transition-all duration-[250ms] ease-in-out-cubic' : ''
        }`}
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />
    </div>
  );
};
