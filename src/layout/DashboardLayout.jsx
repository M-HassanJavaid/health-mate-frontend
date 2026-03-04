import React from 'react';
import Sidebar from '../components/Sidebar.jsx'; // Importing the Sidebar we built previously
import TopNav from '../components/TopNav.jsx';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col lg:ml-72">
        {/* <TopNav /> */}

        {/* Dynamic Content */}
        <main className="p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;