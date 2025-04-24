import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuthStore } from '../store/auth';
import { Calendar, AlertCircle, ChevronRight, FileText } from 'lucide-react';
import DailyEntry from './supervisor/DailyEntry';
import Reports from './supervisor/Reports';
import Profile from './Profile';

function DashboardHome() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">You have 5 farm visits scheduled for today.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="ml-2 text-sm font-medium">Today's Visits</span>
            </div>
            <span className="text-lg font-semibold">5</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-sm font-medium">Pending</span>
            </div>
            <span className="text-lg font-semibold">2</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((visit) => (
            <div key={visit} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Farm Visit #{visit}</p>
                  <p className="text-sm text-gray-500">10:00 AM • Batch #123</p>
                </div>
                <button className="flex items-center text-purple-600">
                  <span className="text-sm font-medium">Start</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Remember to collect weight data for Batch #123 today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupervisorDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="daily-entry" element={<DailyEntry />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
}

export default SupervisorDashboard;