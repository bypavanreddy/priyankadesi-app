import React, { useState } from 'react';
import { Calendar, Users, Package, AlertCircle, ChevronRight } from 'lucide-react';

interface Batch {
  id: string;
  farmName: string;
  startDate: string;
  endDate: string | null;
  totalBirds: number;
  currentBirds: number;
  feedStock: number;
  mortalityRate: number;
  status: 'active' | 'completed';
}

const dummyBatches: Batch[] = [
  {
    id: 'B001',
    farmName: 'RK Farms',
    startDate: '2024-03-01',
    endDate: null,
    totalBirds: 5000,
    currentBirds: 4950,
    feedStock: 250,
    mortalityRate: 1.0,
    status: 'active',
  },
  {
    id: 'B002',
    farmName: 'SP Poultry',
    startDate: '2024-03-15',
    endDate: null,
    totalBirds: 3000,
    currentBirds: 2965,
    feedStock: 180,
    mortalityRate: 1.2,
    status: 'active',
  },
  {
    id: 'B003',
    farmName: 'RK Farms',
    startDate: '2024-01-01',
    endDate: '2024-03-01',
    totalBirds: 5000,
    currentBirds: 4800,
    feedStock: 0,
    mortalityRate: 4.0,
    status: 'completed',
  },
];

function Reports() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBatches = dummyBatches
    .filter(batch => batch.status === activeTab)
    .filter(batch => 
      batch.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Batch Reports</h2>
        <p className="mt-1 text-sm text-gray-500">View active and completed batches</p>
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search by farm name or batch ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'active'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active Batches
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'completed'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed Batches
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {activeTab === 'active' ? 'Active Batches' : 'Completed Batches'}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredBatches.map((batch) => (
            <div key={batch.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {batch.farmName} - Batch #{batch.id}
                  </p>
                  <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {batch.startDate} - {batch.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>
                        {batch.currentBirds}/{batch.totalBirds} birds
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Package className="h-4 w-4 mr-1" />
                      <span>{batch.feedStock} bags</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{batch.mortalityRate}% mortality</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center text-purple-600">
                  <span className="text-sm font-medium">View Details</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports; 