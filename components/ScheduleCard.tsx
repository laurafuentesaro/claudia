import React from 'react';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

interface ScheduleCardProps {
  items: ScheduleItem[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ items }) => {
  return (
    <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden transition-colors">
      <div className="divide-y divide-theme-border">
        {items.map((item, idx) => (
          <div key={idx} className="px-5 py-4 hover:bg-theme-elevated transition-colors">
            <div className="text-xs font-mono text-theme-accent mb-1">
              {item.time}
            </div>
            <div className="text-sm font-medium text-theme-text mb-0.5">
              {item.title}
            </div>
            <div className="text-xs text-theme-faint">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
