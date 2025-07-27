import { Outlet } from 'react-router';
import { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a12]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#1a1a2e] border-b border-[#9d00ff]/30 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#b8b8b8] hover:text-[#00f5ff] focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="w-6"></div>
        </header>

        {/* Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-6"
        >
          <div className="bg-[#1a1a2e] rounded-xl border border-[#9d00ff]/30 p-4 md:p-6">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;