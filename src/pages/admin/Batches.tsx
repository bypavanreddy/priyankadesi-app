import React, { useState, useEffect } from 'react';
import { Calendar, Users, Package, AlertCircle, Search, ChevronRight, Plus, Filter, TrendingUp, IndianRupee, Download, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import DateRangePicker, { DateRange } from '../../components/DateRangePicker';
import { startOfMonth, endOfDay, startOfDay, subDays, subMonths, endOfMonth } from 'date-fns';

// Add chicken types enum
enum ChickType {
  TN_ASEEL = 'TN Aseel',
  INDBRO_ASEEL = 'Indbro Aseel',
  COLOR_BROILER = 'Color Broiler',
  BROILER = 'Broiler',
  BROWN_LAYERED = 'Brown Layered',
  RAINBOW_ROASTER = 'Rainbow Roaster',
  SONALI = 'Sonali'
}

// Add feed types enum
enum FeedType {
  DESI_STARTER = 'Desi Starter',
  DESI_FINISHER = 'Desi Finisher',
  DESI_GROWER = 'Desi Grower',
  DESI_FREE_STARTER = 'Desi Free Starter'
}

interface Batch {
  id: string;
  batchCode: string;
  farmName: string;
  farmerName: string;
  farmerId: string;
  chickType: ChickType;
  hatchingDate: string;
  startDate: string;
  endDate: string | null;
  totalBirds: number;
  currentBirds: number;
  feedStock: number;
  feedUsed: number;
  mortalityRate: number;
  weakBirds: number;
  legWeakBirds: number;
  totalMortality: number;
  birdWeightAvg: number;
  fcr: number; // Feed Conversion Rate
  productionCost: number;
  status: 'active' | 'completed';
  supervisor: string;
  grossAmount: number;
  farmerShare: number;
  dailyEntries: DailyEntry[];
  salesEntries: SalesEntry[];
  feedEntries: FeedEntry[];
  medicineEntries: MedicineEntry[];
  eggEntries: EggEntry[];
  expenseEntries: ExpenseEntry[];
}

interface DailyEntry {
  id: string;
  batchId: string;
  date: string;
  birdAge: number; // in days
  mortality: number;
  weakBirds: number;
  legWeakBirds: number;
  totalMortality: number;
  feedUsed: number;
  feedType: FeedType;
  feedBags: number;
  avgWeight: number;
  waterConsumption: number;
  temperature: number;
  humidity: number;
  imageUrl?: string;
  addedBy: string;
  timestamp: string;
}

interface SalesEntry {
  id: string;
  batchId: string;
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

interface FeedEntry {
  id: string;
  batchId: string;
  date: string;
  dcNumber: string;
  entryType: 'purchase' | 'transfer-in' | 'transfer-out';
  source: 'farmer' | 'company';
  sourceName: string;
  sourceId: string;
  feedType: FeedType;
  numberOfBags: number;
  bagQuantity: number; // in kg
  totalWeight: number;
  price?: number;
  discount?: number;
  totalAmount?: number;
  averageKgRate?: number;
  addedBy: string;
  timestamp: string;
}

interface MedicineEntry {
  id: string;
  batchId: string;
  date: string;
  dcNumber: string;
  companyName: string;
  vaccineName: string;
  medicineName: string;
  unit: string; // kg, mg, dosage, etc.
  quantity: number;
  amount: number;
  expiryDate: string;
  addedBy: string;
  timestamp: string;
}

interface EggEntry {
  id: string;
  batchId: string;
  date: string;
  dcNumber: string;
  numberOfEggs: number;
  rate: number;
  totalAmount: number;
  transportType: 'company' | 'customer';
  driverName?: string;
  vehicleNumber?: string;
  transportAmount?: number;
  traderId: string;
  traderName: string;
  addedBy: string;
  timestamp: string;
}

interface ExpenseEntry {
  id: string;
  batchId: string;
  date: string;
  billDc: string;
  purpose: string;
  paymentMode: 'cash' | 'bank' | 'upi';
  amount: number;
  addedBy: string;
  timestamp: string;
}

// Create dummy batch data with South Indian names
const dummyBatches: Batch[] = [
  {
    id: 'B001',
    batchCode: '#B001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    farmerId: 'F2024-001',
    chickType: ChickType.TN_ASEEL,
    hatchingDate: '2024-03-01',
    startDate: '2024-03-01',
    endDate: null,
    totalBirds: 5000,
    currentBirds: 4950,
    feedStock: 250,
    feedUsed: 150,
    mortalityRate: 1.0,
    weakBirds: 50,
    legWeakBirds: 3,
    totalMortality: 5,
    birdWeightAvg: 2500,
    fcr: 1.5,
    productionCost: 1125000,
    status: 'active',
    supervisor: 'John Doe',
    grossAmount: 1500000,
    farmerShare: 1125000,
    dailyEntries: [
      {
        id: 'DE001',
        batchId: 'B001',
        date: '2024-04-18',
        birdAge: 30,
        mortality: 5,
        weakBirds: 0,
        legWeakBirds: 0,
        totalMortality: 5,
        feedUsed: 10,
        feedType: FeedType.DESI_STARTER,
        feedBags: 2,
        avgWeight: 2500,
        waterConsumption: 500,
        temperature: 28,
        humidity: 65,
        imageUrl: '',
        addedBy: 'John Doe',
        timestamp: '2024-04-18 09:30 AM',
      },
      {
        id: 'DE002',
        batchId: 'B001',
        date: '2024-04-17',
        birdAge: 29,
        mortality: 3,
        weakBirds: 0,
        legWeakBirds: 0,
        totalMortality: 3,
        feedUsed: 12,
        feedType: FeedType.DESI_FINISHER,
        feedBags: 2.4,
        avgWeight: 2450,
        waterConsumption: 480,
        temperature: 27,
        humidity: 68,
        imageUrl: '',
        addedBy: 'John Doe',
        timestamp: '2024-04-17 09:45 AM',
      },
    ],
    salesEntries: [
      {
        id: 'SE001',
        batchId: 'B001',
        date: '2024-04-18',
        dcNumber: 'DC001',
        trader: 'Mohammed Ali',
        traderId: 'T001',
        birds: 500,
        avgWeight: 2500,
        pricePerKg: 120,
        totalAmount: 150000,
        transportType: 'company',
        driverName: 'John Doe',
        vehicleNumber: 'MH05-1234',
        transportAmount: 1000,
        addedBy: 'Sales Team',
        timestamp: '2024-04-18 02:30 PM',
      },
    ],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
  {
    id: 'B002',
    batchCode: '#B002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    farmerId: 'F2024-002',
    chickType: ChickType.INDBRO_ASEEL,
    hatchingDate: '2024-03-15',
    startDate: '2024-03-15',
    endDate: null,
    totalBirds: 3000,
    currentBirds: 2965,
    feedStock: 180,
    feedUsed: 120,
    mortalityRate: 1.2,
    weakBirds: 35,
    legWeakBirds: 2,
    totalMortality: 4,
    birdWeightAvg: 2300,
    fcr: 1.3,
    productionCost: 675000,
    status: 'active',
    supervisor: 'Jane Smith',
    grossAmount: 900000,
    farmerShare: 675000,
    dailyEntries: [
      {
        id: 'DE003',
        batchId: 'B002',
        date: '2024-04-18',
        birdAge: 30,
        mortality: 4,
        weakBirds: 0,
        legWeakBirds: 0,
        totalMortality: 4,
        feedUsed: 8,
        feedType: FeedType.DESI_GROWER,
        feedBags: 1.6,
        avgWeight: 2300,
        waterConsumption: 400,
        temperature: 29,
        humidity: 62,
        imageUrl: '',
        addedBy: 'Jane Smith',
        timestamp: '2024-04-18 10:30 AM',
      },
      {
        id: 'DE004',
        batchId: 'B002',
        date: '2024-04-17',
        birdAge: 29,
        mortality: 2,
        weakBirds: 0,
        legWeakBirds: 0,
        totalMortality: 2,
        feedUsed: 9,
        feedType: FeedType.DESI_FREE_STARTER,
        feedBags: 1.8,
        avgWeight: 2250,
        waterConsumption: 380,
        temperature: 28,
        humidity: 65,
        imageUrl: '',
        addedBy: 'Jane Smith',
        timestamp: '2024-04-17 11:15 AM',
      },
    ],
    salesEntries: [
      {
        id: 'SE002',
        batchId: 'B002',
        date: '2024-04-17',
        dcNumber: 'DC002',
        trader: 'Ahmed Khan',
        traderId: 'T002',
        birds: 300,
        avgWeight: 2250,
        pricePerKg: 118,
        totalAmount: 79650,
        transportType: 'customer',
        driverName: 'Jane Smith',
        vehicleNumber: 'MH05-5678',
        transportAmount: 500,
        addedBy: 'Sales Team',
        timestamp: '2024-04-17 03:45 PM',
      },
    ],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
  {
    id: 'B003',
    batchCode: '#B003',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    farmerId: 'F2024-001',
    chickType: ChickType.COLOR_BROILER,
    hatchingDate: '2024-01-01',
    startDate: '2024-01-01',
    endDate: '2024-03-01',
    totalBirds: 5000,
    currentBirds: 4800,
    feedStock: 0,
    feedUsed: 300,
    mortalityRate: 4.0,
    weakBirds: 200,
    legWeakBirds: 10,
    totalMortality: 200,
    birdWeightAvg: 2400,
    fcr: 1.2,
    productionCost: 1875000,
    status: 'completed',
    supervisor: 'John Doe',
    grossAmount: 2500000,
    farmerShare: 1875000,
    dailyEntries: [],
    salesEntries: [],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
];

// Create dummy batch data with South Indian names
const testBatches: Batch[] = [
  {
    id: 'B004',
    batchCode: '#B004',
    farmName: 'Venkateshwara Farms',
    farmerName: 'Ramakrishna Reddy',
    farmerId: 'F2024-003',
    chickType: ChickType.TN_ASEEL,
    hatchingDate: '2024-04-01',
    startDate: '2024-04-01',
    endDate: null,
    totalBirds: 4000,
    currentBirds: 3980,
    feedStock: 200,
    feedUsed: 100,
    mortalityRate: 0.5,
    weakBirds: 10,
    legWeakBirds: 1,
    totalMortality: 20,
    birdWeightAvg: 2100,
    fcr: 1.4,
    productionCost: 800000,
    status: 'active',
    supervisor: 'Vijay Kumar',
    grossAmount: 1200000,
    farmerShare: 900000,
    dailyEntries: [],
    salesEntries: [],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
  {
    id: 'B005',
    batchCode: '#B005',
    farmName: 'Sri Lakshmi Poultry',
    farmerName: 'Venkata Naidu',
    farmerId: 'F2024-004',
    chickType: ChickType.BROILER,
    hatchingDate: '2024-04-05',
    startDate: '2024-04-05',
    endDate: null,
    totalBirds: 4500,
    currentBirds: 4480,
    feedStock: 220,
    feedUsed: 80,
    mortalityRate: 0.45,
    weakBirds: 8,
    legWeakBirds: 0,
    totalMortality: 20,
    birdWeightAvg: 1800,
    fcr: 1.35,
    productionCost: 850000,
    status: 'active',
    supervisor: 'Srinivas Rao',
    grossAmount: 1150000,
    farmerShare: 850000,
    dailyEntries: [],
    salesEntries: [],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
  {
    id: 'B006',
    batchCode: '#B006',
    farmName: 'Sai Krishna Farms',
    farmerName: 'Subramaniam Iyer',
    farmerId: 'F2024-005',
    chickType: ChickType.BROWN_LAYERED,
    hatchingDate: '2024-03-20',
    startDate: '2024-03-20',
    endDate: '2024-04-15',
    totalBirds: 3500,
    currentBirds: 3400,
    feedStock: 0,
    feedUsed: 200,
    mortalityRate: 2.9,
    weakBirds: 40,
    legWeakBirds: 5,
    totalMortality: 100,
    birdWeightAvg: 2200,
    fcr: 1.6,
    productionCost: 720000,
    status: 'completed',
    supervisor: 'Arjun Reddy',
    grossAmount: 950000,
    farmerShare: 720000,
    dailyEntries: [],
    salesEntries: [],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
  {
    id: 'B007',
    batchCode: '#B007',
    farmName: 'Annapurna Poultry',
    farmerName: 'Parvathi Devi',
    farmerId: 'F2024-006',
    chickType: ChickType.RAINBOW_ROASTER,
    hatchingDate: '2024-04-10',
    startDate: '2024-04-10',
    endDate: null,
    totalBirds: 5500,
    currentBirds: 5490,
    feedStock: 300,
    feedUsed: 60,
    mortalityRate: 0.18,
    weakBirds: 5,
    legWeakBirds: 0,
    totalMortality: 10,
    birdWeightAvg: 1500,
    fcr: 1.2,
    productionCost: 1100000,
    status: 'active',
    supervisor: 'Karthik Raja',
    grossAmount: 1450000,
    farmerShare: 1100000,
    dailyEntries: [],
    salesEntries: [],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
  {
    id: 'B008',
    batchCode: '#B008',
    farmName: 'Krishna Farms',
    farmerName: 'Murali Mohan',
    farmerId: 'F2024-007',
    chickType: ChickType.SONALI,
    hatchingDate: '2024-02-15',
    startDate: '2024-02-15',
    endDate: '2024-04-01',
    totalBirds: 4200,
    currentBirds: 4050,
    feedStock: 0,
    feedUsed: 250,
    mortalityRate: 3.6,
    weakBirds: 60,
    legWeakBirds: 8,
    totalMortality: 150,
    birdWeightAvg: 2350,
    fcr: 1.4,
    productionCost: 880000,
    status: 'completed',
    supervisor: 'Ravi Shankar',
    grossAmount: 1180000,
    farmerShare: 885000,
    dailyEntries: [],
    salesEntries: [],
    feedEntries: [],
    medicineEntries: [],
    eggEntries: [],
    expenseEntries: [],
  },
];

// Get all daily entries across all batches
const getAllDailyEntries = () => {
  return dummyBatches.flatMap(batch => 
    batch.dailyEntries.map(entry => ({
      ...entry,
      farmName: batch.farmName,
      batchNumber: batch.id,
      farmerName: batch.farmerName,
      farmerId: batch.farmerId,
      batchStatus: batch.status
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get all sales entries across all batches
const getAllSalesEntries = () => {
  return dummyBatches.flatMap(batch => 
    batch.salesEntries.map(entry => ({
      ...entry,
      farmName: batch.farmName,
      batchNumber: batch.id,
      farmerName: batch.farmerName,
      farmerId: batch.farmerId,
      batchStatus: batch.status
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get all unique farmers from batches for filter dropdowns
const getUniqueFarmers = () => {
  const farmersSet = new Set<string>();
  dummyBatches.forEach(batch => {
    farmersSet.add(batch.farmerId);
  });
  
  return Array.from(farmersSet).map(farmerId => {
    const batch = dummyBatches.find(b => b.farmerId === farmerId);
    return {
      id: farmerId,
      name: batch?.farmerName || 'Unknown',
      farmerName: batch?.farmerName || 'Unknown',
      farmName: batch?.farmName || 'Unknown'
    };
  });
};

// Export entries to CSV
const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csvContent = headers.join(',') + '\n';
  
  data.forEach(item => {
    const row = headers.map(header => {
      // Handle special cases and ensure proper CSV formatting
      let value = item[header];
      if (value === null || value === undefined) {
        return '';
      }
      if (typeof value === 'string') {
        // Escape quotes and wrap in quotes if contains comma
        if (value.includes(',') || value.includes('"')) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
      }
      return String(value);
    });
    csvContent += row.join(',') + '\n';
  });
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function BatchDetailsForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedChickType, setSelectedChickType] = useState<ChickType>(ChickType.TN_ASEEL);
  const [selectedFeed, setSelectedFeed] = useState<FeedType>(FeedType.DESI_STARTER);
  const newBatchCode = generateBatchCode();
  
  // Let's generate a batch code
  function generateBatchCode() {
    const currentYear = new Date().getFullYear();
    const lastBatch = dummyBatches.sort((a, b) => {
      const aNum = parseInt(a.batchCode.split('-')[1]);
      const bNum = parseInt(b.batchCode.split('-')[1]);
      return bNum - aNum;
    })[0];
    
    let seriesNumber = 1;
    if (lastBatch) {
      seriesNumber = parseInt(lastBatch.batchCode.split('-')[1]) + 1;
    }
    
    return `B${currentYear}-${seriesNumber.toString().padStart(3, '0')}`;
  }
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            Add New Batch
          </Dialog.Title>
          
          <form className="space-y-5 max-h-[70vh] overflow-y-auto pb-5 pr-2">
            <div className="bg-purple-50 p-4 rounded-md mb-4 border border-purple-100">
              <p className="text-sm text-gray-700">Auto-generated Batch Code: <span className="font-medium text-purple-700">{newBatchCode}</span></p>
            </div>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Farm Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="farmer-select" className="block text-sm font-medium text-gray-700 mb-1">Farmer</label>
                  <select
                    id="farmer-select"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  >
                    <option value="">Select a farmer</option>
                    {getUniqueFarmers().map(farmer => (
                      <option key={farmer.id} value={farmer.id}>{farmer.farmerName} - {farmer.farmName}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="supervisor-select" className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label>
                  <select
                    id="supervisor-select"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  >
                    <option value="">Assign a supervisor</option>
                    <option value="1">John Doe</option>
                    <option value="2">Jane Smith</option>
                  </select>
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Batch Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="chick-type" className="block text-sm font-medium text-gray-700 mb-1">Chick Type</label>
                  <select
                    id="chick-type"
                    value={selectedChickType}
                    onChange={(e) => setSelectedChickType(e.target.value as ChickType)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  >
                    {Object.values(ChickType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="total-birds" className="block text-sm font-medium text-gray-700 mb-1">Total Birds</label>
                  <input
                    id="total-birds"
                    type="number"
                    placeholder="Enter number of birds"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="hatching-date" className="block text-sm font-medium text-gray-700 mb-1">Hatching Date</label>
                  <input
                    id="hatching-date"
                    type="date"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Feed Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="feed-type" className="block text-sm font-medium text-gray-700 mb-1">Feed Type</label>
                  <select
                    id="feed-type"
                    value={selectedFeed}
                    onChange={(e) => setSelectedFeed(e.target.value as FeedType)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  >
                    {Object.values(FeedType).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="feed-stock" className="block text-sm font-medium text-gray-700 mb-1">Initial Feed Stock (bags)</label>
                  <input
                    id="feed-stock"
                    type="number"
                    placeholder="Number of feed bags"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex justify-end space-x-3 pt-5 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow"
              >
                Create Batch
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function BatchReportCard({ batch }: { batch: Batch }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-medium text-gray-900">{batch.farmName} - {batch.batchCode}</h3>
            <p className="text-sm text-gray-600">Farmer: {batch.farmerName}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        <div>
          <p className="text-xs text-gray-600">Start Date</p>
          <p className="text-sm font-medium">{new Date(batch.startDate).toISOString().split('T')[0]}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Birds</p>
          <p className="text-sm font-medium">{batch.currentBirds}/{batch.totalBirds}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Supervisor</p>
          <p className="text-sm font-medium">{batch.supervisor}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Mortality</p>
          <p className="text-sm font-medium">{batch.mortalityRate}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Price per Kg</p>
          <p className="text-sm font-medium">₹{batch.salesEntries.length > 0 ? batch.salesEntries[0].pricePerKg : '--'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Gross Amount</p>
          <p className="text-sm font-medium">₹{batch.grossAmount.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex border-t">
        <Link
          to={`/admin/batches/${batch.id}`}
          className="flex-1 p-2 text-center text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors"
        >
          Details <ChevronRight className="h-3 w-3 inline-block" />
        </Link>
      </div>
    </div>
  );
}

function Batches() {
  const today = new Date();
  const firstDayOfMonth = startOfMonth(today);
  
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [selectedBirdTypes, setSelectedBirdTypes] = useState<ChickType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const batchesPerPage = 9; // Show 9 batches per page (3 rows of 3)
  
  // Use test batches to ensure we have data
  const allBatches = [...testBatches, ...dummyBatches];
  
  // Filter batches by status (active/completed), bird types and search term
  const filteredBatches = allBatches.filter(batch => {
    const matchesStatus = batch.status === activeTab;
    const matchesType = selectedBirdTypes.length === 0 || selectedBirdTypes.includes(batch.chickType);
    
    const matchesSearch = searchTerm === '' || 
                         batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });
  
  // Get current batches for pagination
  const indexOfLastBatch = currentPage * batchesPerPage;
  const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
  const currentBatches = filteredBatches.slice(indexOfFirstBatch, indexOfLastBatch);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredBatches.length / batchesPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Toggle bird type selection
  const toggleBirdType = (type: ChickType) => {
    setSelectedBirdTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
    setCurrentPage(1);
  };
  
  const clearFilters = () => {
    setSelectedBirdTypes([]);
    setSearchTerm('');
    setCurrentPage(1);
  };
  
  // Change tab
  const handleTabChange = (tab: 'active' | 'completed') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Batches</h2>
          <p className="mt-1 text-sm text-gray-500">View and manage all your batch operations.</p>
        </div>
        <button
          onClick={() => setIsAddBatchOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Batch
        </button>
      </div>

      {/* Tab navigation */}
      <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 max-w-md">
        <button
          onClick={() => handleTabChange('active')}
          className={`flex-1 rounded-md py-1.5 px-3 text-sm font-medium ${
            activeTab === 'active'
              ? 'bg-purple-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Active Batches
        </button>
        <button
          onClick={() => handleTabChange('completed')}
          className={`flex-1 rounded-md py-1.5 px-3 text-sm font-medium ${
            activeTab === 'completed'
              ? 'bg-gray-300 text-gray-800'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed Batches
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative flex-grow max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search batches..."
          />
        </div>
        
        {/* Filter dropdown */}
        <div className="flex gap-2">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)} 
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            Bird Type Filter
            {selectedBirdTypes.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                {selectedBirdTypes.length}
              </span>
            )}
          </button>
          
          {selectedBirdTypes.length > 0 && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Clear filters
            </button>
          )}
          
          {/* Multi-select dropdown */}
          {isFilterOpen && (
            <div className="absolute mt-12 right-4 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">Select Bird Types</h3>
              </div>
              <div className="p-2 max-h-60 overflow-y-auto">
                {Object.values(ChickType).map(type => (
                  <div key={type} className="py-1 px-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBirdTypes.includes(type)}
                        onChange={() => toggleBirdType(type)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedBirdTypes([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear selection
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Batch Cards Grid */}
      {filteredBatches.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBatches.map(batch => (
              <BatchReportCard key={batch.id} batch={batch} />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
                  // Only show current page, first page, last page, and 1 page before/after current
                  const shouldShow = 
                    number === 1 || 
                    number === totalPages || 
                    Math.abs(currentPage - number) <= 1;
                    
                  // Show ellipsis instead of sequential page numbers
                  if (!shouldShow) {
                    if (number === 2 && currentPage > 3) return <span key={`ellipsis-1`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>;
                    if (number === totalPages - 1 && currentPage < totalPages - 2) return <span key={`ellipsis-2`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>;
                    return null;
                  }
                  
                  return (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No batches found</h3>
          <p className="mt-2 text-sm text-gray-500">
            No batches match your current filters. Try adjusting your search or filters.
          </p>
          {selectedBirdTypes.length > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Add Batch Dialog */}
      <BatchDetailsForm isOpen={isAddBatchOpen} onClose={() => setIsAddBatchOpen(false)} />
    </div>
  );
}

export default Batches; 