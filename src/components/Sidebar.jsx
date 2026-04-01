import React, { useState } from 'react';
import { 
  LayoutDashboard, FileUp, History, 
  FileText, LogOut, Menu, X, HeartPulse 
} from 'lucide-react';
import SidebarLink from './SidebarLink.jsx';
import Button from './Button.jsx';
import cn from '../utils/cn.js';
import { useLogoutMutation } from '../services/auth.js';
import { useDispatch } from 'react-redux';
import { setLogout } from '../features/authSlice.js';

import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchLogout ] = useLogoutMutation();

  async function handleLogout() {
    try {
      let res = await fetchLogout().unwrap();
      console.log(res)
      if (!res.success) {
        throw new Error(res.message)
      }
      dispatch(setLogout());
      // alert('You have successfully logged out.')
      navigate('/login', { replace: true });
    } catch (error) {
       alert(error?.data?.message || 'Something went wrong during logout')
    }
  }


  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/upload', label: 'Upload Document', icon: FileUp },
    { to: '/health-timeline', label: 'Vital Chronology', icon: History },
    { to: '/reports', label: 'Health Reports', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Top Bar - Visible only on mobile when sidebar is closed */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-(--bg-primary) border-b border-(--border-subtle) z-30 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-(--btn-primary) p-1.5 rounded-lg text-white">
            <HeartPulse size={20} />
          </div>
          <span className="font-bold text-lg text-(--text-primary)">
            Health<span className="text-(--btn-primary)">Mate</span>
          </span>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-(--bg-secondary) text-(--text-primary) rounded-xl active:scale-95 transition-transform"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 w-full h-screen bg-slate-900/40 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-[100dvh] w-72 bg-(--bg-primary) border-r border-(--border-subtle) z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col p-6 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Sidebar Header: Logo & Internal Cross Button */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="bg-(--btn-primary) p-2 rounded-xl text-white">
              <HeartPulse size={24} />
            </div>
            <h1 className="text-xl font-bold text-(--text-primary)">
              Health<span className="text-(--btn-primary)">Mate</span>
            </h1>
          </div>

          {/* Close button inside sidebar (mobile only) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-(--bg-secondary) rounded-xl text-(--text-secondary) transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 sm:space-y-2">
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
            onClick={handleLogout}
          >
            <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-bold">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Spacer for mobile layout */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Sidebar;