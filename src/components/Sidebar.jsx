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
      {/* Mobile Top Bar - Improved accessibility and visual balance */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-(--bg-primary) border-b border-(--border-subtle) z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-(--btn-primary) p-1.5 rounded-lg text-white">
            <HeartPulse size={20} />
          </div>
          <span className="font-bold text-lg">Health<span className="text-(--btn-primary)">Mate</span></span>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-(--btn-primary) text-white rounded-xl shadow-md active:scale-95 transition-transform fixed top-5 right-5 lg:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Backdrop for mobile - Increased blur for premium feel */}
      {isOpen && (
        <div 
          className="fixe inset-0 bg-slate-900/40 backdrop-blur-md z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-[100dvh] w-72 bg-(--bg-primary) border-r border-(--border-subtle) z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col p-6 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Logo - Hidden on mobile because it's in the Top Bar */}
        <div className="hidden lg:flex items-center gap-3 mb-10 px-2">
          <div className="bg-(--btn-primary) p-2 rounded-xl text-white">
            <HeartPulse size={24} />
          </div>
          <h1 className="text-xl font-bold text-(--text-primary)">
            Health<span className="text-(--btn-primary)">Mate</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 sm:space-y-2 mt-4 lg:mt-0">
          {navLinks.map((link) => (
            <SidebarLink 
              key={link.to} 
              {...link} 
              onClick={() => setIsOpen(false)} 
            />
          ))}
        </nav>

        {/* Logout Area */}
        <div className="pt-6 mt-auto border-t border-(--border-subtle)">
          <Button 
            className="w-full justify-start px-4 bg-transparent text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent transition-colors group"
            onClick={() => console.log("Logging out...")}
          >
            <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-bold">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Spacer for mobile to push content below the fixed Top Bar */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Sidebar;