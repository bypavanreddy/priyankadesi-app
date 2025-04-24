import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import {
  Users,
  TrendingUp,
  Package,
  AlertCircle,
  ChevronRight,
  Calendar,
  IndianRupee
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function EnhancedDashboard() {
  const user = useAuthStore((state) => state.user);
  
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (in lakhs)',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.3,
      },
    ],
  };

  const mortalityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Mortality Rate (%)',
        data: [1.2, 1.5, 1.3, 1.1, 1.4, 1.2],
        borderColor: 'rgb(234, 179, 8)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name || 'Admin'}</h1>
        <p className="mt-1 text-sm text-gray-500">Here's an overview of your farm operations.</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="ml-2 text-sm font-medium">Active Batches</span>
            </div>
            <span className="text-lg font-semibold">5</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-blue-500" />
              <span className="ml-2 text-sm font-medium">Total Birds</span>
            </div>
            <span className="text-lg font-semibold">25,000</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="ml-2 text-sm font-medium">Monthly Sales</span>
            </div>
            <span className="text-lg font-semibold">₹12.5L</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <span className="ml-2 text-sm font-medium">Avg. Mortality</span>
            </div>
            <span className="text-lg font-semibold">1.2%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <Line data={revenueData} options={chartOptions} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mortality Rate Trend</h3>
          <Line data={mortalityData} options={chartOptions} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Batch Updates</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((batch) => (
              <div key={batch} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Batch #{batch} Update</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Today, 09:30 AM</span>
                      <span className="mx-2">•</span>
                      <span>By John Doe</span>
                    </div>
                  </div>
                  <Link to={`/admin/batches/${batch}`} className="flex items-center text-purple-600">
                    <span className="text-sm font-medium">View</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
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
                    <p className="font-medium text-gray-900">Sale #{sale}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      <span>₹2.5L</span>
                      <span className="mx-2">•</span>
                      <span>500 birds</span>
                    </div>
                  </div>
                  <button className="flex items-center text-purple-600">
                    <span className="text-sm font-medium">View</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedDashboard; 