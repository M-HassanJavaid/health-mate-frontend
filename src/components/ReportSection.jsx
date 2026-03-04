import React from 'react';
import cn from '../utils/cn';

const ReportSection = ({ title, icon: Icon, children, variant = "default" }) => {
  const variants = {
    default: "bg-(--bg-primary) border-(--border-subtle)",
    warning: "bg-red-50/50 border-red-100",
    success: "bg-emerald-50/50 border-emerald-100",
    info: "bg-blue-50/50 border-blue-100"
  };

  return (
    <div className={cn("p-6 rounded-[2rem] border transition-all", variants[variant])}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "p-2.5 rounded-xl",
          variant === "default" ? "bg-(--bg-secondary) text-(--btn-primary)" : "bg-white shadow-sm"
        )}>
          <Icon size={20} />
        </div>
        <h3 className="font-black text-sm uppercase tracking-widest text-(--text-primary)">
          {title}
        </h3>
      </div>
      <div className="text-(--text-secondary) text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default ReportSection;