import React from 'react';
import cn from '../utils/cn';

const Card = ({ 
  label, 
  value, 
  unit, 
  icon: Icon, 
  iconColor = "text-(--btn-primary)",
  className = "" 
}) => {
  return (
    <div className={cn(
      // Layout & Spacing
      "flex flex-col gap-5 p-6 rounded-[2.5rem]",
      // Themes & Borders
      "bg-(--bg-primary) border border-(--border-subtle)",
      // Effects
      "shadow-sm shadow-blue-500/5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
      className
    )}>
      {/* Icon Container */}
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center bg-(--bg-secondary)", 
        iconColor
      )}>
        <Icon size={26} strokeWidth={2.5} />
      </div>

      {/* Data Section */}
      <div className="space-y-1">
        <p className="text-(--text-secondary) text-[11px] font-black uppercase tracking-[0.15em] ml-0.5">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5">
          <h3 className="text-3xl font-black text-(--text-primary) tracking-tight">
            {value}
          </h3>
          {unit && (
            <span className="text-(--text-secondary) text-sm font-semibold italic opacity-60">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;