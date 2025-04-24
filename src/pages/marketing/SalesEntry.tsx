import React, { useState } from 'react';
import { Calendar, Package, Truck, ShoppingBag, DollarSign, Send, User } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Batch {
  id: string;
  batchCode: string;
  farmName: string;
  farmerName: string;
  startDate: string;
  currentBirds: number;
  birdWeightAvg: number;
  status: 'active' | 'completed';
}

interface Trader {
  id: string;
  traderCode: string;
  name: string;
  contact: string;
  doorNumber: string;
  village: string;
  district: string;
}

// Dummy batch data for testing
const dummyBatches: Batch[] = [
  {
    id: 'B001',
    batchCode: 'B2024-001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    startDate: '2024-03-01',
    currentBirds: 4950,
    birdWeightAvg: 2500,
    status: 'active',
  },
  {
    id: 'B002',
    batchCode: 'B2024-002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    startDate: '2024-03-15',
    currentBirds: 2965,
    birdWeightAvg: 2300,
    status: 'active',
  }
];

// Dummy trader data for testing
const dummyTraders: Trader[] = [
  {
    id: 'T001',
    traderCode: 'T2024-001',
    name: 'Mohammed Ali',
    contact: '+91 98765 43210',
    doorNumber: '123/A',
    village: 'Jayanagar',
    district: 'Bangalore',
  },
  {
    id: 'T002',
    traderCode: 'T2024-002',
    name: 'Ramesh Shah',
    contact: '+91 98765 43211',
    doorNumber: '45',
    village: 'Vijayanagar',
    district: 'Mysore',
  }
];

interface SalesEntryForm {
  date: string;
  dcNumber: string;
  batchId: string;
  traderId: string;
  numberOfBirds: number;
  avgWeight: number;
  pricePerKg: number;
  totalAmount: number;
  transportType: 'company' | 'customer';
  driverName?: string;
  vehicleNumber?: string;
  transportAmount?: number;
}

function SalesEntryForm({ isOpen, onClose, selectedBatch }: { 
  isOpen: boolean; 
  onClose: () => void;
  selectedBatch: Batch | null;
}) {
  const [entryData, setEntryData] = useState<SalesEntryForm>({
    date: new Date().toISOString().split('T')[0],
    dcNumber: '',
    batchId: selectedBatch?.id || '',
    traderId: '',
    numberOfBirds: 0,
    avgWeight: selectedBatch?.birdWeightAvg || 0,
    pricePerKg: 120, // Default price
    totalAmount: 0,
    transportType: 'company',
    driverName: '',
    vehicleNumber: '',
    transportAmount: 0
  });

  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);

  const handleInputChange = (field: keyof SalesEntryForm, value: any) => {
    setEntryData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Recalculate total amount when birds, weight, or price changes
      if (field === 'numberOfBirds' || field === 'avgWeight' || field === 'pricePerKg') {
        const birds = field === 'numberOfBirds' ? value : newData.numberOfBirds;
        const weight = field === 'avgWeight' ? value : newData.avgWeight;
        const price = field === 'pricePerKg' ? value : newData.pricePerKg;
        
        newData.totalAmount = birds * (weight / 1000) * price;
      }
      
      return newData;
    });
  };

  const handleTraderChange = (traderId: string) => {
    const trader = dummyTraders.find(t => t.id === traderId);
    setSelectedTrader(trader || null);
    handleInputChange('traderId', traderId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting sales entry:', entryData);
    // In a real app, this would be sent to the server
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            Sales Entry - {selectedBatch?.farmName} (Batch: {selectedBatch?.batchCode})
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 pb-5">
            <div className="bg-gray-50 p-4 rounded-md mb-4 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                <span>Batch Started: {selectedBatch?.startDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Package className="h-4 w-4 mr-1 text-purple-600" />
                <span>Current Birds: {selectedBatch?.currentBirds}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <ShoppingBag className="h-4 w-4 mr-1 text-purple-600" />
                <span>Avg. Weight: {selectedBatch?.birdWeightAvg}g</span>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Sale Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="entry-date" className="block text-sm font-medium text-gray-700 mb-1">Sale Date</label>
                <input
                  id="entry-date"
                  type="date"
                  value={entryData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                />
              </div>
              
              <div>
                <label htmlFor="dc-number" className="block text-sm font-medium text-gray-700 mb-1">DC Number</label>
                <input
                  id="dc-number"
                  type="text"
                  value={entryData.dcNumber}
                  onChange={(e) => handleInputChange('dcNumber', e.target.value)}
                  placeholder="Enter DC number"
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                />
              </div>
              
              <div>
                <label htmlFor="trader-select" className="block text-sm font-medium text-gray-700 mb-1">Select Trader</label>
                <select
                  id="trader-select"
                  value={entryData.traderId}
                  onChange={(e) => handleTraderChange(e.target.value)}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                >
                  <option value="">-- Select Trader --</option>
                  {dummyTraders.map(trader => (
                    <option key={trader.id} value={trader.id}>
                      {trader.traderCode} - {trader.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedTrader && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-purple-600" />
                  Trader Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-sm font-medium">{selectedTrader.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm font-medium">
                      {selectedTrader.doorNumber}, {selectedTrader.village}, {selectedTrader.district}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Sale Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="number-of-birds" className="block text-sm font-medium text-gray-700 mb-1">Number of Birds</label>
                <input
                  id="number-of-birds"
                  type="number"
                  min="1"
                  max={selectedBatch?.currentBirds || 0}
                  value={entryData.numberOfBirds}
                  onChange={(e) => handleInputChange('numberOfBirds', Number(e.target.value))}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                />
              </div>
              
              <div>
                <label htmlFor="avg-weight" className="block text-sm font-medium text-gray-700 mb-1">Average Weight (g)</label>
                <input
                  id="avg-weight"
                  type="number"
                  min="0"
                  value={entryData.avgWeight}
                  onChange={(e) => handleInputChange('avgWeight', Number(e.target.value))}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                />
              </div>
              
              <div>
                <label htmlFor="price-per-kg" className="block text-sm font-medium text-gray-700 mb-1">Price per KG (₹)</label>
                <input
                  id="price-per-kg"
                  type="number"
                  min="0"
                  value={entryData.pricePerKg}
                  onChange={(e) => handleInputChange('pricePerKg', Number(e.target.value))}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                />
              </div>
              
              <div className="md:col-span-3 bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">
                    Total Weight: {((entryData.numberOfBirds * entryData.avgWeight) / 1000).toFixed(2)} kg
                  </p>
                  <p className="text-lg font-medium text-green-600 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Total Amount: ₹{entryData.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Transport Details</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="transportType"
                    value="company"
                    checked={entryData.transportType === 'company'}
                    onChange={() => handleInputChange('transportType', 'company')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Company Transport</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="transportType"
                    value="customer"
                    checked={entryData.transportType === 'customer'}
                    onChange={() => handleInputChange('transportType', 'customer')}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Customer Transport</span>
                </label>
              </div>
              
              {entryData.transportType === 'company' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="driver-name" className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                    <input
                      id="driver-name"
                      type="text"
                      value={entryData.driverName || ''}
                      onChange={(e) => handleInputChange('driverName', e.target.value)}
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vehicle-number" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                    <input
                      id="vehicle-number"
                      type="text"
                      value={entryData.vehicleNumber || ''}
                      onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="transport-amount" className="block text-sm font-medium text-gray-700 mb-1">Transport Amount (₹)</label>
                    <input
                      id="transport-amount"
                      type="number"
                      min="0"
                      value={entryData.transportAmount || 0}
                      onChange={(e) => handleInputChange('transportAmount', Number(e.target.value))}
                      className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow transition-colors duration-150 flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Sale
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function BatchCard({ batch, onSelect }: { batch: Batch, onSelect: (batch: Batch) => void }) {
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedStartDate = new Date(batch.startDate).toLocaleDateString(undefined, dateOptions);
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-medium text-gray-900">{batch.farmName} - #{batch.batchCode}</h3>
        <p className="text-sm text-gray-500">Farmer: {batch.farmerName}</p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Current Birds</p>
          <p className="text-sm font-medium">{batch.currentBirds}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Avg. Weight</p>
          <p className="text-sm font-medium">{batch.birdWeightAvg}g</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Batch Start Date</p>
          <p className="text-sm font-medium">{formattedStartDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <p className={`text-sm font-medium ${batch.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
            {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <button
          onClick={() => onSelect(batch)}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md font-medium text-sm hover:bg-purple-700 transition-colors"
        >
          Record Sale
        </button>
      </div>
    </div>
  );
}

function SalesEntry() {
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  
  const handleBatchSelect = (batch: Batch) => {
    setSelectedBatch(batch);
    setIsEntryFormOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Sales Entry</h2>
          <p className="mt-1 text-sm text-gray-500">Record sales for active batches</p>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-800">Active Batches</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyBatches.filter(batch => batch.status === 'active').map(batch => (
          <BatchCard key={batch.id} batch={batch} onSelect={handleBatchSelect} />
        ))}
      </div>
      
      {dummyBatches.filter(batch => batch.status === 'active').length === 0 && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <Truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Active Batches</h3>
          <p className="text-gray-500">There are currently no active batches available for sales.</p>
        </div>
      )}
      
      {selectedBatch && (
        <SalesEntryForm 
          isOpen={isEntryFormOpen} 
          onClose={() => setIsEntryFormOpen(false)}
          selectedBatch={selectedBatch}
        />
      )}
    </div>
  );
}

export default SalesEntry;