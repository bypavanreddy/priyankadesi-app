import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuthStore } from '../store/auth';
import { TrendingUp, ShoppingBag, ChevronRight } from 'lucide-react';
import SalesEntry from './marketing/SalesEntry';
import Traders from './marketing/Traders';
import Profile from './Profile';

function DashboardHome() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Track sales and manage trader relationships.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="ml-2 text-sm font-medium">Today's Sales</span>
            </div>
            <span className="text-lg font-semibold">2,450</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm font-medium">Traders</span>
            </div>
            <span className="text-lg font-semibold">18</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Sales</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((sale) => (
            <div key={sale} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Trader {sale}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>850 birds</span>
                    <span className="mx-2">•</span>
                    <span>2.5 kg avg</span>
                  </div>
                </div>
                <button className="flex items-center text-purple-600">
                  <span className="text-sm font-medium">Details</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Traders</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((trader) => (
            <div key={trader} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Trader {trader}</p>
                    <p className="text-sm text-gray-500">5,230 birds this month</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketingDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="traders" element={<Traders />} />
        <Route path="sales" element={<SalesEntry />} />
        <Route path="reports" element={<div>Reports (Coming Soon)</div>} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
}

export default MarketingDashboard;