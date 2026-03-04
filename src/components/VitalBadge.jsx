import React from 'react';
import cn from '../utils/cn';

const VitalBadge = ({ icon: Icon, label, value, unit, colorClass }) => {
  if (value === null || value === undefined) return null;

  return (
    <div className="flex items-center gap-2 bg-(--bg-secondary) px-3 py-2 rounded-xl border border-(--border-subtle)">
      <div className={cn("p-1.5 rounded-lg bg-opacity-10", colorClass)}>
        <Icon size={14} className={colorClass.replace('bg-', 'text-')} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-(--text-secondary)">{label}</span>
        <span className="text-sm font-bold text-(--text-primary)">
          {value} <span className="text-[10px] font-medium opacity-60">{unit}</span>
        </span>
      </div>
    </div>
  );
};

export default VitalBadge;