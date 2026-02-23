import React from 'react';

interface SourceBadgeProps {
  source: 'obsidian' | 'manual';
}

const config = {
  obsidian: {
    label: 'Obsidian',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
  manual: {
    label: 'Manual',
    bg: 'bg-theme-accent/10',
    text: 'text-theme-accent',
    border: 'border-theme-accent/20',
  },
};

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source }) => {
  const c = config[source];
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${c.bg} ${c.text} border ${c.border}`}
    >
      {c.label}
    </span>
  );
};
