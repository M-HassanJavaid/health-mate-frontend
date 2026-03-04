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
      // Layout & Spacing: Adjusted p-6 to p-5 for mobile, gap-5 to gap-4
      "flex flex-col gap-4 sm:gap-5 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem]",
      // Themes & Borders
      "bg-(--bg-primary) border border-(--border-subtle)",
      // Effects
      "shadow-sm shadow-blue-500/5 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
      className
    )}>
      {/* Icon Container - Scaled down slightly for mobile */}
      <div className={cn(
        "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-(--bg-secondary) shrink-0", 
        iconColor
      )}>
        <Icon size={22} className="sm:hidden" strokeWidth={2.5} /> {/* Smaller icon for mobile */}
        <Icon size={26} className="hidden sm:block" strokeWidth={2.5} />
      </div>

      {/* Data Section */}
      <div className="space-y-0.5 sm:space-y-1 overflow-hidden">
        <p className="text-(--text-secondary) text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] ml-0.5 truncate">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <h3 className="text-2xl sm:text-3xl font-black text-(--text-primary) tracking-tight truncate">
            {value}
          </h3>
          {unit && (
            <span className="text-(--text-secondary) text-xs sm:text-sm font-semibold italic opacity-60">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;