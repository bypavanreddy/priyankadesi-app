import React, { useState } from 'react';
import { Search, Calendar, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react';

interface Batch {
  id: string;
  farmerId: string;
  farmerName: string;
  startDate: string;
  birdCount: number;
  mortality: number;
  feedUsed: number;
  status: 'active' | 'completed';
}

const dummyBatches: Batch[] = [
  {
    id: 'B001',
    farmerId: 'F001',
    farmerName: 'Rajesh Kumar',
    startDate: '2024-02-01',
    birdCount: 5000,
    mortality: 50,
    feedUsed: 450,
    status: 'active',
  },
  {
    id: 'B002',
    farmerId: 'F002',
    farmerName: 'Suresh Patel',
    startDate: '2024-01-15',
    birdCount: 3000,
    mortality: 35,
    feedUsed: 280,
    status: 'active',
  },
  {
    id: 'B003',
    farmerId: 'F003',
    farmerName: 'Venkatesh Rao',
    startDate: '2023-12-01',
    birdCount: 4000,
    mortality: 120,
    feedUsed: 800,
    status: 'completed',
  },
];

function BatchManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredBatches = dummyBatches.filter(batch => {
    const matchesSearch = batch.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Batches</h2>
          <p className="mt-1 text-sm text-gray-500">Manage and monitor all batches across farms.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search batches..."
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === 'all'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === 'active'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              statusFilter === 'completed'
                ? 'bg-gray-100 text-gray-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredBatches.map((batch) => (
            <div key={batch.id} className="p-4">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <div className="flex items-center">
                    <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                      batch.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <h3 className="text-lg font-medium text-gray-900">
                      Batch #{batch.id}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{batch.farmerName}</p>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{batch.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Mortality: {batch.mortality}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Feed Used: {batch.feedUsed}kg
                    </span>
                  </div>
                  <button className="flex items-center text-purple-600 hover:text-purple-900">
                    <span className="text-sm font-medium">Details</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BatchManagement;