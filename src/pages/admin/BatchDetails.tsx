import React, { useState } from 'react';
import { Calendar, Users, Package, AlertCircle, IndianRupee, TrendingUp, FileText, Scale, Home, Pill, Truck, Banknote, BarChart2, FileBarChart, ChevronLeft, Plus, PackageCheck, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BatchDetails {
  id: string;
  farmName: string;
  farmerName: string;
  chickType: string;
  startDate: string;
  endDate: string | null;
  totalBirds: number;
  currentBirds: number;
  feedStock: number;
  totalFeedUsed: number;
  mortalityRate: number;
  status: 'active' | 'completed';
  supervisor: string;
  totalSales: number;
  averageWeight: number;
  dailyEntries: DailyEntry[];
  salesEntries: SalesEntry[];
  feedEntries: FeedEntry[];
  medicineEntries: MedicineEntry[];
  expenseEntries: ExpenseEntry[];
  grossAmount: number;
  farmerShare: number;
  fcr: number;
  productionCost: number;
}

interface DailyEntry {
  date: string;
  mortality: number;
  feedUsed: number;
  avgWeight: number;
  waterConsumption: number;
  temperature: number;
  humidity: number;
  addedBy: string;
  timestamp: string;
}

interface SalesEntry {
  date: string;
  trader: string;
  birds: number;
  avgWeight: number;
  pricePerKg: number;
  totalAmount: number;
  transportType: 'company' | 'customer';
  addedBy: string;
  timestamp: string;
}

interface FeedEntry {
  date: string;
  entryType: 'purchase' | 'transfer-in' | 'transfer-out';
  source: 'farmer' | 'company';
  sourceName: string;
  feedType: string;
  numberOfBags: number;
  totalWeight: number;
  price?: number;
  totalAmount?: number;
  addedBy: string;
  timestamp: string;
}

interface MedicineEntry {
  date: string;
  medicineName: string;
  companyName: string;
  quantity: number;
  unit: string;
  amount: number;
  addedBy: string;
  timestamp: string;
}

interface ExpenseEntry {
  date: string;
  purpose: string;
  paymentMode: 'cash' | 'bank' | 'upi';
  amount: number;
  addedBy: string;
  timestamp: string;
}

const dummyBatchDetails: BatchDetails = {
  id: 'B001',
  farmName: 'RK Farms',
  farmerName: 'Rajesh Kumar',
  chickType: 'TN Aseel',
  startDate: '2024-03-01',
  endDate: null,
  totalBirds: 5000,
  currentBirds: 4950,
  feedStock: 250,
  totalFeedUsed: 150,
  mortalityRate: 1.0,
  status: 'active',
  supervisor: 'John Doe',
  totalSales: 150000,
  averageWeight: 2500,
  fcr: 1.5,
  productionCost: 1125000,
  grossAmount: 1500000,
  farmerShare: 1125000,
  dailyEntries: [
    {
      date: '2024-04-18',
      mortality: 5,
      feedUsed: 10,
      avgWeight: 2500,
      waterConsumption: 500,
      temperature: 28,
      humidity: 65,
      addedBy: 'John Doe',
      timestamp: '2024-04-18 09:30 AM',
    },
    {
      date: '2024-04-17',
      mortality: 3,
      feedUsed: 12,
      avgWeight: 2450,
      waterConsumption: 480,
      temperature: 27,
      humidity: 68,
      addedBy: 'John Doe',
      timestamp: '2024-04-17 09:45 AM',
    },
  ],
  salesEntries: [
    {
      date: '2024-04-18',
      trader: 'Mohammed Ali',
      birds: 500,
      avgWeight: 2500,
      pricePerKg: 120,
      totalAmount: 150000,
      transportType: 'company',
      addedBy: 'Sales Team',
      timestamp: '2024-04-18 02:30 PM',
    },
  ],
  feedEntries: [
    {
      date: '2024-03-05',
      entryType: 'purchase',
      source: 'company',
      sourceName: 'Feed Supplier Co.',
      feedType: 'Desi Starter',
      numberOfBags: 100,
      totalWeight: 5000,
      price: 1800,
      totalAmount: 180000,
      addedBy: 'John Doe',
      timestamp: '2024-03-05 10:15 AM',
    },
    {
      date: '2024-03-20',
      entryType: 'purchase',
      source: 'company',
      sourceName: 'Feed Supplier Co.',
      feedType: 'Desi Grower',
      numberOfBags: 150,
      totalWeight: 7500,
      price: 1750,
      totalAmount: 262500,
      addedBy: 'John Doe',
      timestamp: '2024-03-20 11:30 AM',
    },
  ],
  medicineEntries: [
    {
      date: '2024-03-10',
      medicineName: 'Vitamin Supplement',
      companyName: 'MediVet',
      quantity: 10,
      unit: 'bottles',
      amount: 5000,
      addedBy: 'John Doe',
      timestamp: '2024-03-10 09:45 AM',
    },
    {
      date: '2024-03-25',
      medicineName: 'Antibiotic',
      companyName: 'PharmaVet',
      quantity: 5,
      unit: 'packs',
      amount: 7500,
      addedBy: 'Jane Smith',
      timestamp: '2024-03-25 02:30 PM',
    },
  ],
  expenseEntries: [
    {
      date: '2024-03-15',
      purpose: 'Labor charges',
      paymentMode: 'cash',
      amount: 15000,
      addedBy: 'John Doe',
      timestamp: '2024-03-15 05:30 PM',
    },
    {
      date: '2024-04-01',
      purpose: 'Electricity bill',
      paymentMode: 'bank',
      amount: 8500,
      addedBy: 'John Doe',
      timestamp: '2024-04-01 10:15 AM',
    },
  ],
};

function BatchDetails() {
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'sales' | 'feed' | 'medicine' | 'expenses' | 'batch-report' | 'gross-report'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Link to="/admin/batches" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ChevronLeft className="h-4 w-4" />
              Back to Batches
            </Link>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-2">
            {dummyBatchDetails.farmName} - Batch #{dummyBatchDetails.id}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Started on {dummyBatchDetails.startDate} • Supervisor: {dummyBatchDetails.supervisor}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100">
            Download Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
            Edit Batch
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'daily'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Daily Entries
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'sales'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <IndianRupee className="h-4 w-4 mr-2" />
              Sales
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'feed'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="h-4 w-4 mr-2" />
              Feed
            </button>
            <button
              onClick={() => setActiveTab('medicine')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'medicine'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Pill className="h-4 w-4 mr-2" />
              Medicine
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'expenses'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Banknote className="h-4 w-4 mr-2" />
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('batch-report')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'batch-report'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart2 className="h-4 w-4 mr-2" />
              Batch Report
            </button>
            <button
              onClick={() => setActiveTab('gross-report')}
              className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                activeTab === 'gross-report'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileBarChart className="h-4 w-4 mr-2" />
              Gross Report
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-purple-700">Current Birds</p>
                      <p className="text-lg font-semibold text-purple-900">
                        {dummyBatchDetails.currentBirds}/{dummyBatchDetails.totalBirds}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Feed Used</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {dummyBatchDetails.totalFeedUsed}/{dummyBatchDetails.feedStock} bags
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Avg Weight</p>
                      <p className="text-lg font-semibold text-green-900">
                        {dummyBatchDetails.averageWeight}g
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Mortality Rate</p>
                      <p className="text-lg font-semibold text-yellow-900">
                        {dummyBatchDetails.mortalityRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Batch Information</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Farmer</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.farmerName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.startDate}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Chicken Type</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.chickType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Total Birds</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.totalBirds}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Current Birds</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.currentBirds}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Average Weight</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.averageWeight}g</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Feed Stock</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.feedStock} bags</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          dummyBatchDetails.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {dummyBatchDetails.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Total Sales</dt>
                      <dd className="text-sm text-gray-900">₹{dummyBatchDetails.totalSales.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Gross Amount</dt>
                      <dd className="text-sm text-gray-900">₹{dummyBatchDetails.grossAmount.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Farmer Share</dt>
                      <dd className="text-sm text-gray-900">₹{dummyBatchDetails.farmerShare.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Production Cost</dt>
                      <dd className="text-sm text-gray-900">₹{dummyBatchDetails.productionCost.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">FCR</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.fcr.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Mortality Rate</dt>
                      <dd className="text-sm text-gray-900">{dummyBatchDetails.mortalityRate}%</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {[...dummyBatchDetails.dailyEntries, ...dummyBatchDetails.salesEntries]
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .slice(0, 5)
                      .map((entry, index) => (
                        <li key={index} className="py-4">
                          <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                  {'trader' in entry ? 'Sales Entry' : 'Daily Entry'}
                                </h3>
                                <p className="text-sm text-gray-500">{entry.date}</p>
                              </div>
                              <p className="text-sm text-gray-500">
                                {'trader' in entry
                                  ? `Sold ${entry.birds} birds to ${entry.trader} at ₹${entry.pricePerKg}/kg`
                                  : `Mortality: ${entry.mortality}, Feed Used: ${entry.feedUsed} bags`}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'daily' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-purple-700">Current Birds</p>
                      <p className="text-lg font-semibold text-purple-900">
                        {dummyBatchDetails.currentBirds}/{dummyBatchDetails.totalBirds}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Avg Weight</p>
                      <p className="text-lg font-semibold text-green-900">
                        {dummyBatchDetails.averageWeight}g
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Mortality Rate</p>
                      <p className="text-lg font-semibold text-yellow-900">
                        {dummyBatchDetails.mortalityRate}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Feed Used</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {dummyBatchDetails.totalFeedUsed}/{dummyBatchDetails.feedStock} bags
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Daily Entries</h3>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Entry
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mortality
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feed
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Weight
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Environment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyBatchDetails.dailyEntries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.date}
                          <span className="block text-xs text-gray-500">{entry.timestamp.split(' ')[1]}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.mortality} birds
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.feedUsed} bags
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.avgWeight}g
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.temperature}°C, {entry.humidity}% humidity
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.addedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Total Sales</p>
                      <p className="text-lg font-semibold text-green-900">
                        ₹{dummyBatchDetails.totalSales.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-purple-700">Birds Sold</p>
                      <p className="text-lg font-semibold text-purple-900">
                        {dummyBatchDetails.salesEntries.reduce((total, entry) => total + entry.birds, 0)} birds
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Scale className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Avg. Price</p>
                      <p className="text-lg font-semibold text-blue-900">
                        ₹{dummyBatchDetails.salesEntries.length ? Math.round(dummyBatchDetails.salesEntries.reduce((sum, entry) => sum + entry.pricePerKg, 0) / dummyBatchDetails.salesEntries.length) : 0}/kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Sales History</h3>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Sale
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trader
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Birds & Weight
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transport
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyBatchDetails.salesEntries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.date}
                          <span className="block text-xs text-gray-500">{entry.timestamp.split(' ')[1]}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.trader}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.birds} birds @ {entry.avgWeight}g
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.pricePerKg}/kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.transportType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-green-600">
                          ₹{entry.totalAmount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'feed' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Feed Stock</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {dummyBatchDetails.feedStock} bags
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-purple-700">Feed Used</p>
                      <p className="text-lg font-semibold text-purple-900">
                        {dummyBatchDetails.totalFeedUsed} bags
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">FCR</p>
                      <p className="text-lg font-semibold text-green-900">
                        {dummyBatchDetails.fcr.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-indigo-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-indigo-700">Feed Cost</p>
                      <p className="text-lg font-semibold text-indigo-900">
                        ₹{dummyBatchDetails.feedEntries.reduce((sum, entry) => sum + (entry.totalAmount || 0), 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Feed Entries</h3>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feed Entry
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entry Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feed Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyBatchDetails.feedEntries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.date}
                          <span className="block text-xs text-gray-500">{entry.timestamp.split(' ')[1]}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.entryType === 'purchase'
                              ? 'bg-blue-100 text-blue-800'
                              : entry.entryType === 'transfer-in'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {entry.entryType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.sourceName}
                          <span className="block text-xs text-gray-500">{entry.source}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.feedType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.numberOfBags} bags ({entry.totalWeight} kg)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.totalAmount ? `₹${entry.totalAmount.toLocaleString()}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'medicine' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Pill className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-purple-700">Medicine Types</p>
                      <p className="text-lg font-semibold text-purple-900">
                        {dummyBatchDetails.medicineEntries.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Medicine Cost</p>
                      <p className="text-lg font-semibold text-green-900">
                        ₹{dummyBatchDetails.medicineEntries.reduce((sum, entry) => sum + entry.amount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Last Treatment</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {dummyBatchDetails.medicineEntries.length > 0 ? 
                          new Date(Math.max(...dummyBatchDetails.medicineEntries.map(e => new Date(e.date).getTime()))).toLocaleDateString() : 
                          'No treatments'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Medicine Entries</h3>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Medicine
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medicine
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyBatchDetails.medicineEntries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.date}
                          <span className="block text-xs text-gray-500">{entry.timestamp.split(' ')[1]}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.medicineName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.companyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.quantity} {entry.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.addedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Banknote className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-red-700">Total Expenses</p>
                      <p className="text-lg font-semibold text-red-900">
                        ₹{dummyBatchDetails.expenseEntries.reduce((sum, entry) => sum + entry.amount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Banknote className="h-5 w-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Avg. Expense</p>
                      <p className="text-lg font-semibold text-yellow-900">
                        ₹{dummyBatchDetails.expenseEntries.length > 0 ? 
                          Math.round(dummyBatchDetails.expenseEntries.reduce((sum, entry) => sum + entry.amount, 0) / 
                          dummyBatchDetails.expenseEntries.length).toLocaleString() : '0'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Last Expense</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {dummyBatchDetails.expenseEntries.length > 0 ? 
                          new Date(Math.max(...dummyBatchDetails.expenseEntries.map(e => new Date(e.date).getTime()))).toLocaleDateString() : 
                          'No expenses'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Expense Entries</h3>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Expense
                </button>
              </div>
              
              <div className="bg-white shadow overflow-hidden rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purpose
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Mode
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dummyBatchDetails.expenseEntries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.date}
                          <span className="block text-xs text-gray-500">{entry.timestamp.split(' ')[1]}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.purpose}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            entry.paymentMode === 'cash'
                              ? 'bg-yellow-100 text-yellow-800'
                              : entry.paymentMode === 'bank'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {entry.paymentMode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{entry.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.addedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'batch-report' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Batch Performance Report</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Total Birds</p>
                  <p className="text-xl font-semibold text-gray-900">{dummyBatchDetails.totalBirds}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Current Birds</p>
                  <p className="text-xl font-semibold text-gray-900">{dummyBatchDetails.currentBirds}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Birds Sold</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {dummyBatchDetails.salesEntries.reduce((total, entry) => total + entry.birds, 0)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Total Mortality</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {dummyBatchDetails.dailyEntries.reduce((total, entry) => total + entry.mortality, 0)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Mortality Rate</p>
                  <p className="text-xl font-semibold text-gray-900">{dummyBatchDetails.mortalityRate}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Feed Conversion Ratio (FCR)</p>
                  <p className="text-xl font-semibold text-gray-900">{dummyBatchDetails.fcr.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-white p-6 shadow rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Feed Consumption Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Feed Used</p>
                    <p className="text-lg font-semibold text-gray-900">{dummyBatchDetails.totalFeedUsed} bags</p>
                    <p className="text-sm text-gray-500">{dummyBatchDetails.totalFeedUsed * 50} kg</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Feed Per Bird</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {((dummyBatchDetails.totalFeedUsed * 50) / dummyBatchDetails.currentBirds).toFixed(2)} kg/bird
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Feed Cost</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{dummyBatchDetails.feedEntries
                        .reduce((total, entry) => total + (entry.totalAmount || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 shadow rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Growth Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Average Weight</p>
                    <p className="text-lg font-semibold text-gray-900">{dummyBatchDetails.averageWeight}g</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Daily Weight Gain (Avg)</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {(dummyBatchDetails.averageWeight / 
                        Math.max(1, Math.floor((new Date().getTime() - new Date(dummyBatchDetails.startDate).getTime()) / (1000 * 60 * 60 * 24)))).toFixed(1)}g/day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gross-report' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Financial Performance Report</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-green-700">Gross Revenue</p>
                  <p className="text-xl font-semibold text-green-900">₹{dummyBatchDetails.grossAmount.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-blue-700">Farmer Share</p>
                  <p className="text-xl font-semibold text-blue-900">₹{dummyBatchDetails.farmerShare.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-purple-700">Company Share</p>
                  <p className="text-xl font-semibold text-purple-900">
                    ₹{(dummyBatchDetails.grossAmount - dummyBatchDetails.farmerShare).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 shadow rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Expense Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Feed Cost</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{dummyBatchDetails.feedEntries
                        .reduce((total, entry) => total + (entry.totalAmount || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Medicine Cost</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{dummyBatchDetails.medicineEntries
                        .reduce((total, entry) => total + entry.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Other Expenses</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{dummyBatchDetails.expenseEntries
                        .reduce((total, entry) => total + entry.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 shadow rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Profitability Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Production Cost</p>
                    <p className="text-lg font-semibold text-gray-900">₹{dummyBatchDetails.productionCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Net Profit</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(dummyBatchDetails.grossAmount - dummyBatchDetails.productionCost).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cost Per Bird</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(dummyBatchDetails.productionCost / dummyBatchDetails.totalBirds).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue Per Bird</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{(dummyBatchDetails.grossAmount / 
                        (dummyBatchDetails.salesEntries.reduce((total, entry) => total + entry.birds, 0) || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 shadow rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Sales Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Birds Sold</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {dummyBatchDetails.salesEntries.reduce((total, entry) => total + entry.birds, 0)} birds
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Sale Price</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{dummyBatchDetails.salesEntries.length > 0
                        ? (dummyBatchDetails.salesEntries.reduce((total, entry) => total + entry.pricePerKg, 0) / 
                          dummyBatchDetails.salesEntries.length).toFixed(2)
                        : '0'}/kg
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{dummyBatchDetails.salesEntries
                        .reduce((total, entry) => total + entry.totalAmount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BatchDetails; 