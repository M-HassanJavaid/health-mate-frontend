import React from 'react';
import Sidebar from '../components/Sidebar.jsx'; 
import TopNav from '../components/TopNav.jsx';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-(--bg-secondary) flex flex-col lg:flex-row">
      {/* Sidebar handles its own fixed positioning and mobile toggle logic */}
      <Sidebar />

      {/* flex-1: takes up remaining space
          lg:ml-72: matches the Sidebar width only on desktop
          min-w-0: prevents flexbox layout breaking from long code or tables
      */}
      <div className="flex-1 flex flex-col lg:ml-72 min-w-0">
        {/* <TopNav /> */}

        {/* Dynamic Content */}
        {/* p-4: small padding for mobile
            sm:p-6: medium padding for tablets
            lg:p-10: generous padding for desktop
        */}
        <main className="p-4 sm:p-6 lg:p-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;