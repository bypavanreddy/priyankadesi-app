import React, { useState } from 'react';
import { Search, Calendar, Download, Plus, Filter } from 'lucide-react';

// Interface for the Activity type
type ActivityType = 'daily' | 'sales' | 'medication' | 'feed';

// Define feed types enum
enum FeedType {
  DESI_STARTER = 'Desi Starter',
  DESI_FINISHER = 'Desi Finisher',
  DESI_GROWER = 'Desi Grower',
  DESI_FREE_STARTER = 'Desi Free Starter'
}

// Define chicken types enum
enum ChickType {
  TN_ASEEL = 'TN Aseel',
  INDBRO_ASEEL = 'Indbro Aseel',
  COLOR_BROILER = 'Color Broiler',
  BROILER = 'Broiler',
  BROWN_LAYERED = 'Brown Layered',
  RAINBOW_ROASTER = 'Rainbow Roaster',
  SONALI = 'Sonali'
}

// Demo data for daily entries
interface DailyEntry {
  id: string;
  batchId: string;
  batchNumber: string;
  farmName: string;
  farmerName: string;
  farmerId: string;
  batchStatus: 'active' | 'completed';
  date: string;
  birdAge: number;
  mortality: number;
  weakBirds: number;
  legWeakBirds: number;
  totalMortality: number;
  feedUsed: number;
  feedType: string;
  feedBags: number;
  avgWeight: number;
  waterConsumption: number;
  addedBy: string;
  timestamp: string;
}

// Demo data for sales entries
interface SalesEntry {
  id: string;
  batchId: string;
  batchNumber: string;
  farmName: string;
  farmerName: string;
  farmerId: string;
  batchStatus: 'active' | 'completed';
  date: string;
  dcNumber: string;
  trader: string;
  traderId: string;
  birds: number;
  avgWeight: number;
  pricePerKg: number;
  totalAmount: number;
  transportType: 'company' | 'customer';
  driverName?: string;
  vehicleNumber?: string;
  transportAmount?: number;
  addedBy: string;
  timestamp: string;
}

// Demo data for medication entries
interface MedicationEntry {
  id: string;
  batchId: string;
  batchNumber: string;
  farmName: string;
  farmerName: string;
  farmerId: string;
  batchStatus: 'active' | 'completed';
  date: string;
  medicineName: string;
  quantity: number;
  unit: string;
  notes?: string;
  addedBy: string;
  timestamp: string;
}

// Demo data for feed entries
interface FeedEntry {
  id: string;
  batchId: string;
  batchNumber: string;
  farmName: string;
  farmerName: string;
  farmerId: string;
  batchStatus: 'active' | 'completed';
  date: string;
  feedType: string;
  quantity: number;
  bagSize: number;
  totalWeight: number;
  entryType: 'in' | 'out';
  addedBy: string;
  timestamp: string;
}

// Sample data - would come from API in real app
const dummyDailyEntries: DailyEntry[] = [
  {
    id: 'DE001',
    batchId: 'B001',
    batchNumber: 'B2024-001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    farmerId: 'F001',
    batchStatus: 'active',
    date: '2024-05-01',
    birdAge: 30,
    mortality: 5,
    weakBirds: 2,
    legWeakBirds: 1,
    totalMortality: 8,
    feedUsed: 25,
    feedType: 'Desi Starter',
    feedBags: 1,
    avgWeight: 350,
    waterConsumption: 200,
    addedBy: 'John Doe',
    timestamp: '2024-05-01 08:30 AM',
  },
  {
    id: 'DE002',
    batchId: 'B002',
    batchNumber: 'B2024-002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    farmerId: 'F002',
    batchStatus: 'active',
    date: '2024-05-01',
    birdAge: 25,
    mortality: 3,
    weakBirds: 1,
    legWeakBirds: 0,
    totalMortality: 4,
    feedUsed: 20,
    feedType: 'Desi Grower',
    feedBags: 1,
    avgWeight: 300,
    waterConsumption: 180,
    addedBy: 'Jane Smith',
    timestamp: '2024-05-01 09:15 AM',
  },
];

const dummySalesEntries: SalesEntry[] = [
  {
    id: 'SE001',
    batchId: 'B001',
    batchNumber: 'B2024-001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    farmerId: 'F001',
    batchStatus: 'active',
    date: '2024-05-01',
    dcNumber: 'DC-001',
    trader: 'Mohammed Ali',
    traderId: 'T001',
    birds: 100,
    avgWeight: 1.2,
    pricePerKg: 120,
    totalAmount: 14400,
    transportType: 'company',
    addedBy: 'John Doe',
    timestamp: '2024-05-01 10:30 AM',
  },
  {
    id: 'SE002',
    batchId: 'B002',
    batchNumber: 'B2024-002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    farmerId: 'F002',
    batchStatus: 'active',
    date: '2024-05-02',
    dcNumber: 'DC-002',
    trader: 'Ramesh Shah',
    traderId: 'T002',
    birds: 150,
    avgWeight: 1.3,
    pricePerKg: 125,
    totalAmount: 24375,
    transportType: 'customer',
    driverName: 'Raj Kumar',
    vehicleNumber: 'KA-01-1234',
    transportAmount: 2000,
    addedBy: 'Jane Smith',
    timestamp: '2024-05-02 11:00 AM',
  },
];

const dummyMedicationEntries: MedicationEntry[] = [
  {
    id: 'ME001',
    batchId: 'B001',
    batchNumber: 'B2024-001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    farmerId: 'F001',
    batchStatus: 'active',
    date: '2024-05-01',
    medicineName: 'Enrofloxacin',
    quantity: 500,
    unit: 'ml',
    addedBy: 'John Doe',
    timestamp: '2024-05-01 08:45 AM',
  },
  {
    id: 'ME002',
    batchId: 'B002',
    batchNumber: 'B2024-002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    farmerId: 'F002',
    batchStatus: 'active',
    date: '2024-05-02',
    medicineName: 'Vitamins',
    quantity: 1,
    unit: 'kg',
    notes: 'Mixed with water',
    addedBy: 'Jane Smith',
    timestamp: '2024-05-02 09:30 AM',
  },
];

const dummyFeedEntries: FeedEntry[] = [
  {
    id: 'FE001',
    batchId: 'B001',
    batchNumber: 'B2024-001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    farmerId: 'F001',
    batchStatus: 'active',
    date: '2024-05-01',
    feedType: 'Desi Starter',
    quantity: 10,
    bagSize: 50,
    totalWeight: 500,
    entryType: 'in',
    addedBy: 'John Doe',
    timestamp: '2024-05-01 07:30 AM',
  },
  {
    id: 'FE002',
    batchId: 'B002',
    batchNumber: 'B2024-002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    farmerId: 'F002',
    batchStatus: 'active',
    date: '2024-05-02',
    feedType: 'Desi Grower',
    quantity: 8,
    bagSize: 50,
    totalWeight: 400,
    entryType: 'out',
    addedBy: 'Jane Smith',
    timestamp: '2024-05-02 08:15 AM',
  },
];

// List of unique farmers
const uniqueFarmers = [
  { id: 'F001', name: 'Rajesh Kumar' },
  { id: 'F002', name: 'Suresh Patel' },
  { id: 'F003', name: 'Venkatesh Rao' },
];

// Utility function to export data to CSV (mock)
const exportToCSV = (data: any[], filename: string) => {
  console.log(`Exporting ${data.length} records to ${filename}`);
  // In a real app, this would create and download a CSV file
  alert(`${data.length} records have been exported to ${filename}`);
};

function Activities() {
  // State for active activity type
  const [activeTab, setActiveTab] = useState<ActivityType>('daily');
  
  // Common filter states
  const [selectedFarmers, setSelectedFarmers] = useState<string[]>([]);
  const [isFarmerDropdownOpen, setIsFarmerDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showActiveOnly, setShowActiveOnly] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Get filtered data based on active tab
  const getFilteredData = () => {
    switch (activeTab) {
      case 'daily':
        return dummyDailyEntries
          .filter(entry => selectedFarmers.length === 0 || selectedFarmers.includes(entry.farmerId))
          .filter(entry => !startDate || entry.date >= startDate)
          .filter(entry => !endDate || entry.date <= endDate)
          .filter(entry => !showActiveOnly || entry.batchStatus === 'active')
          .filter(entry => 
            entry.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.batchId.toLowerCase().includes(searchQuery.toLowerCase())
          );
      case 'sales':
        return dummySalesEntries
          .filter(entry => selectedFarmers.length === 0 || selectedFarmers.includes(entry.farmerId))
          .filter(entry => !startDate || entry.date >= startDate)
          .filter(entry => !endDate || entry.date <= endDate)
          .filter(entry => !showActiveOnly || entry.batchStatus === 'active')
          .filter(entry => 
            entry.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.trader.toLowerCase().includes(searchQuery.toLowerCase())
          );
      case 'medication':
        return dummyMedicationEntries
          .filter(entry => selectedFarmers.length === 0 || selectedFarmers.includes(entry.farmerId))
          .filter(entry => !startDate || entry.date >= startDate)
          .filter(entry => !endDate || entry.date <= endDate)
          .filter(entry => !showActiveOnly || entry.batchStatus === 'active')
          .filter(entry => 
            entry.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
          );
      case 'feed':
        return dummyFeedEntries
          .filter(entry => selectedFarmers.length === 0 || selectedFarmers.includes(entry.farmerId))
          .filter(entry => !startDate || entry.date >= startDate)
          .filter(entry => !endDate || entry.date <= endDate)
          .filter(entry => !showActiveOnly || entry.batchStatus === 'active')
          .filter(entry => 
            entry.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.feedType.toLowerCase().includes(searchQuery.toLowerCase())
          );
      default:
        return [];
    }
  };
  
  // Use specific typing for the filtered data based on the active tab
  const getDailyEntries = () => getFilteredData() as DailyEntry[];
  const getSalesEntries = () => getFilteredData() as SalesEntry[];
  const getMedicationEntries = () => getFilteredData() as MedicationEntry[];
  const getFeedEntries = () => getFilteredData() as FeedEntry[];
  
  // Reset filters
  const resetFilters = () => {
    setSelectedFarmers([]);
    setStartDate('');
    setEndDate('');
    setShowActiveOnly(true);
    setSearchQuery('');
  };
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Activities</h2>
          <p className="mt-1 text-sm text-gray-500">Manage daily entries, sales, medication, and feed records</p>
        </div>
        <button
          onClick={() => console.log(`Adding new ${activeTab} entry`)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Entry
        </button>
      </div>
      
      {/* Activity Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'daily'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Daily Entries
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'sales'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sales History
          </button>
          <button
            onClick={() => setActiveTab('medication')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'medication'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Medication
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'feed'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Feed
          </button>
        </nav>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="relative flex-grow max-w-sm mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder={`Search ${activeTab} entries...`}
            />
          </div>
          
          <div>
            <label htmlFor="farmer-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Farmer</label>
            <div className="relative">
              <button 
                type="button"
                onClick={() => setIsFarmerDropdownOpen(!isFarmerDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200"
              >
                {selectedFarmers.length === 0 
                  ? 'All Farmers' 
                  : selectedFarmers.length === 1 
                    ? uniqueFarmers.find(f => f.id === selectedFarmers[0])?.name || 'Selected Farmer'
                    : `${selectedFarmers.length} Farmers Selected`
                }
                <Filter className="h-4 w-4 text-gray-500 ml-2" />
              </button>
              
              {isFarmerDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
                  <div className="p-2 border-b">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="select-all-farmers"
                        checked={selectedFarmers.length === 0}
                        onChange={() => setSelectedFarmers([])}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="select-all-farmers" className="ml-2 block text-sm text-gray-700">
                        All Farmers
                      </label>
                    </div>
                  </div>
                  
                  {uniqueFarmers.map(farmer => (
                    <div key={farmer.id} className="p-2 hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`farmer-${farmer.id}`}
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={() => {
                            if (selectedFarmers.includes(farmer.id)) {
                              setSelectedFarmers(selectedFarmers.filter(id => id !== farmer.id));
                            } else {
                              setSelectedFarmers([...selectedFarmers, farmer.id]);
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`farmer-${farmer.id}`} className="ml-2 block text-sm text-gray-700">
                          {farmer.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
            <input
              type="date"
              id="date-filter"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="end-date-filter" className="block text-sm font-medium text-gray-700 mb-1">to</label>
            <input
              type="date"
              id="end-date-filter"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active-only"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="active-only" className="ml-2 block text-sm text-gray-700">
              Active Batches Only
            </label>
          </div>
          
          <div>
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Reset Filters
            </button>
          </div>
          
          <div className="ml-auto">
            <button
              onClick={() => exportToCSV(getFilteredData(), `${activeTab}_entries.csv`)}
              className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Export Data
            </button>
          </div>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {activeTab === 'daily' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mortality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Weight</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getDailyEntries().map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.farmerName}</div>
                    <div className="text-sm text-gray-500">{entry.farmName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.batchId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.feedUsed}kg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.mortality} birds</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.avgWeight}g</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {activeTab === 'sales' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trader</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birds & Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getSalesEntries().map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.farmName}</div>
                    <div className="text-sm text-gray-500">Batch {entry.batchNumber} • {entry.farmerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.trader}
                    <div className="text-xs text-gray-500">{entry.transportType} transport</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.birds} birds</div>
                    <div className="text-xs text-gray-500">{entry.avgWeight}kg avg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">₹{entry.totalAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">₹{entry.pricePerKg}/kg</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {activeTab === 'medication' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getMedicationEntries().map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.farmName}</div>
                    <div className="text-sm text-gray-500">Batch {entry.batchNumber} • {entry.farmerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.medicineName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.quantity} {entry.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.addedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {activeTab === 'feed' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feed Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFeedEntries().map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.farmName}</div>
                    <div className="text-sm text-gray-500">Batch {entry.batchNumber} • {entry.farmerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.feedType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.quantity} bags ({entry.totalWeight}kg)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.entryType === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {entry.entryType === 'in' ? 'In' : 'Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Activities; 