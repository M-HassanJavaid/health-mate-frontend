import React, { useState } from 'react';
import { 
  LayoutDashboard, FileUp, History, 
  FileText, LogOut, Menu, X, HeartPulse 
} from 'lucide-react';
import SidebarLink from './SidebarLink.jsx';
import Button from './Button.jsx';
import cn from '../utils/cn.js';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/upload', label: 'Upload Document', icon: FileUp },
    { to: '/health-timeline', label: 'Vital Chronology', icon: History },
    { to: '/reports', label: 'Health Reports', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--btn-primary)] text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-72 bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] z-40 transition-transform duration-300 lg:translate-x-0 flex flex-col p-6",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-[var(--btn-primary)] p-2 rounded-xl text-white">
            <HeartPulse size={24} />
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Health<span className="text-[var(--btn-primary)]">Mate</span></h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <SidebarLink key={link.to} {...link} onClick={() => setIsOpen(false)} />
          ))}
        </nav>

        {/* Logout Area */}
        <div className="pt-6 border-t border-[var(--border-subtle)]">
          <Button 
            className="w-full justify-start px-4 bg-transparent text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent"
            onClick={() => console.log("Logging out...")}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;