import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const reportTypes = [
  { id: 'revenue', name: 'Revenue Analysis' },
  { id: 'production', name: 'Production Metrics' },
  { id: 'mortality', name: 'Mortality Rates' },
  { id: 'sales', name: 'Sales Distribution' },
] as const;

function Reports() {
  const [selectedReport, setSelectedReport] = useState<typeof reportTypes[number]['id']>('revenue');

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.3,
      },
      {
        label:  'Expenses',
        data: [8, 12, 10, 15, 14, 18],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.3,
      },
    ],
  };

  const productionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Birds Produced',
        data: [5000, 4800, 5200, 4900, 5100, 5300],
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
      },
    ],
  };

  const mortalityData = {
    labels: ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5'],
    datasets: [
      {
        label: 'Mortality Rate (%)',
        data: [2.1, 1.8, 2.3, 1.9, 2.0],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.3,
      },
    ],
  };

  const salesData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [
      {
        label: 'Sales Distribution',
        data: [12000, 15000, 9000, 11000, 13000],
        backgroundColor: [
          'rgba(147, 51, 234, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
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
        <h2 className="text-2xl font-semibold text-gray-900">Reports</h2>
        <p className="mt-1 text-sm text-gray-500">
          Analyze your business performance and trends.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="sm:hidden">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value as typeof selectedReport)}
              className="block w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    type.id === selectedReport
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {selectedReport === 'revenue' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue vs Expenses</h3>
                <div className="h-80">
                  <Line data={revenueData} options={chartOptions} />
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-semibold text-purple-900">₹123L</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                    <p className="text-2xl font-semibold text-red-900">₹77L</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Net Profit</p>
                    <p className="text-2xl font-semibold text-green-900">₹46L</p>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'production' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Production</h3>
                <div className="h-80">
                  <Bar data={productionData} options={chartOptions} />
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Total Production</p>
                    <p className="text-2xl font-semibold text-purple-900">30,300 birds</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Average per Week</p>
                    <p className="text-2xl font-semibold text-blue-900">5,050 birds</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Growth Rate</p>
                    <p className="text-2xl font-semibold text-green-900">+6%</p>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'mortality' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mortality Trends</h3>
                <div className="h-80">
                  <Line data={mortalityData} options={chartOptions} />
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Average Rate</p>
                    <p className="text-2xl font-semibold text-red-900">2.02%</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600 font-medium">Highest Rate</p>
                    <p className="text-2xl font-semibold text-yellow-900">2.3%</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Lowest Rate</p>
                    <p className="text-2xl font-semibold text-green-900">1.8%</p>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'sales' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Sales Distribution</h3>
                <div className="h-80">
                  <Bar data={salesData} options={chartOptions} />
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Total Sales</p>
                    <p className="text-2xl font-semibold text-purple-900">60,000 birds</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Best Region</p>
                    <p className="text-2xl font-semibold text-blue-900">South</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Growth Potential</p>
                    <p className="text-2xl font-semibold text-green-900">East +20%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {[
              { event: 'Monthly report generated', date: '2024-03-15' },
              { event: 'Quarterly analysis completed', date: '2024-03-10' },
              { event: 'New sales milestone reached', date: '2024-03-05' },
            ].map((update, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-sm text-gray-900">{update.event}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(update.date), 'MMM d, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;