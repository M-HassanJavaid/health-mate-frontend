import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="h-20 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4 text-[var(--text-secondary)]">
        <Search size={20} />
        <input 
          type="text" 
          placeholder="Search records..." 
          className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--btn-primary)] transition-colors">
          <Bell size={20} />
        </button>
        <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-subtle)] text-[var(--text-primary)]">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default TopNav;