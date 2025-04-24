import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useAuthStore } from '../store/auth';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = useAuthStore((state) => state.user);
  const isMobileNavEnabled = user?.role === 'supervisor' || user?.role === 'marketing';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen relative">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile sidebar toggle button */}
      <button 
        onClick={toggleSidebar}
        className="fixed z-30 bottom-4 right-4 p-3 rounded-full bg-purple-600 text-white shadow-lg lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 transform z-30 lg:translate-x-0 lg:relative transition duration-300 ease-in-out lg:flex-shrink-0`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50 pb-16 lg:pb-0">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile nav at bottom (for supervisor and marketing roles) */}
      {isMobileNavEnabled && <MobileNav />}
    </div>
  );
}

export default DashboardLayout;