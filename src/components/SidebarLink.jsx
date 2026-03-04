import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from '../utils/cn';

const SidebarLink = ({ to, icon: Icon, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group";
  const activeClasses = "bg-[var(--btn-primary)] text-white shadow-lg shadow-blue-200";
  const inactiveClasses = "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--btn-primary)]";

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
    >
      <Icon size={20} className={cn("transition-colors", isActive ? "text-white" : "group-hover:text-[var(--btn-primary)]")} />
      <span className="text-sm tracking-wide">{label}</span>
    </Link>
  );
};

export default SidebarLink;