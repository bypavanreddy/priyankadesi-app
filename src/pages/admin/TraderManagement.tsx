import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, TrendingUp, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface Trader {
  id: string;
  traderCode: string;
  name: string;
  companyName: string; // Company name is mandatory for traders
  contact: string;
  secondaryContact: string;
  email?: string;
  // Address details
  doorNumber: string;
  village: string;
  district: string;
  state: string;
  // ID details
  gstNumber: string; // Mandatory for traders
  aadharNumber: string;
  panNumber: string;
  // Bank details
  accountHolderName: string;
  accountType: 'savings' | 'current' | 'other';
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branch: string;
  // Stats
  totalPurchases: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
  registrationYear: number;
}

const dummyTraders: Trader[] = [
  {
    id: '1',
    traderCode: 'T2024-001',
    name: 'Mohammed Ali',
    companyName: 'Ali Traders',
    contact: '+91 98765 43210',
    secondaryContact: '+91 98765 43211',
    email: 'mohammedali@example.com',
    doorNumber: '123/A',
    village: 'Jayanagar',
    district: 'Bangalore',
    state: 'Karnataka',
    gstNumber: '24A123456789',
    aadharNumber: '1234 5678 9012',
    panNumber: 'ABCD1234E',
    accountHolderName: 'Mohammed Ali',
    accountType: 'savings',
    accountNumber: '1234567890',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    branch: 'Jayanagar Branch',
    totalPurchases: 25000,
    lastPurchase: '2024-03-15',
    status: 'active',
    registrationYear: 2024,
  },
  {
    id: '2',
    traderCode: 'T2024-002',
    name: 'Ramesh Shah',
    companyName: 'Shah Traders',
    contact: '+91 98765 43211',
    secondaryContact: '+91 98765 43212',
    doorNumber: '45',
    village: 'Vijayanagar',
    district: 'Mysore',
    state: 'Karnataka',
    gstNumber: '24A123456789',
    aadharNumber: '1234 5678 9012',
    panNumber: 'ABCD1234E',
    accountHolderName: 'Ramesh Shah',
    accountType: 'savings',
    accountNumber: '1234567890',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    branch: 'Vijayanagar Branch',
    totalPurchases: 15000,
    lastPurchase: '2024-03-14',
    status: 'active',
    registrationYear: 2024,
  },
  {
    id: '3',
    traderCode: 'T2024-003',
    name: 'John D\'Souza',
    companyName: 'D\'Souza Traders',
    contact: '+91 98765 43212',
    secondaryContact: '+91 98765 43213',
    email: 'johnd@example.com',
    doorNumber: '789',
    village: 'Central Area',
    district: 'Mangalore',
    state: 'Karnataka',
    gstNumber: '24A123456789',
    aadharNumber: '1234 5678 9012',
    panNumber: 'ABCD1234E',
    accountHolderName: 'John D\'Souza',
    accountType: 'savings',
    accountNumber: '1234567890',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    branch: 'Mangalore Branch',
    totalPurchases: 18000,
    lastPurchase: '2024-03-10',
    status: 'inactive',
    registrationYear: 2024,
  },
];

// Generate a new trader code based on current year and series
const generateTraderCode = () => {
  const currentYear = new Date().getFullYear();
  const lastTrader = dummyTraders
    .filter(trader => trader.registrationYear === currentYear)
    .sort((a, b) => {
      const aNum = parseInt(a.traderCode.split('-')[1]);
      const bNum = parseInt(b.traderCode.split('-')[1]);
      return bNum - aNum;
    })[0];
  
  let seriesNumber = 1;
  if (lastTrader) {
    seriesNumber = parseInt(lastTrader.traderCode.split('-')[1]) + 1;
  }
  
  return `T${currentYear}-${seriesNumber.toString().padStart(3, '0')}`;
};

function TraderForm({ isOpen, onClose, trader }: { isOpen: boolean; onClose: () => void; trader?: Trader }) {
  const newTraderCode = trader ? trader.traderCode : generateTraderCode();
  const [formData, setFormData] = useState({
    name: trader?.name || '',
    companyName: trader?.companyName || '',
    contact: trader?.contact || '',
    secondaryContact: trader?.secondaryContact || '',
    email: trader?.email || '',
    doorNumber: trader?.doorNumber || '',
    village: trader?.village || '',
    district: trader?.district || '',
    state: trader?.state || '',
    addressLine1: '',
    addressLine2: '',
    locality: '',
    city: '',
    pincode: '',
    gstNumber: trader?.gstNumber || '',
    aadharNumber: trader?.aadharNumber || '',
    panNumber: trader?.panNumber || '',
    accountHolderName: trader?.accountHolderName || '',
    accountType: trader?.accountType || 'savings',
    accountNumber: trader?.accountNumber || '',
    bankName: trader?.bankName || '',
    ifscCode: trader?.ifscCode || '',
    branch: trader?.branch || '',
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({...formData, pincode: value});
    
    // Auto-fill address details when pincode is 6 digits
    if (value.length === 6) {
      try {
        // In a real implementation, you would fetch data from an API
        // For this demo, we'll simulate with sample data
        // Simulating API call delay
        setTimeout(() => {
          // Sample data for demonstration
          if (value === '560001') {
            setFormData({
              ...formData,
              pincode: value,
              locality: 'MG Road',
              district: 'Bangalore Urban',
              city: 'Bangalore',
              state: 'Karnataka'
            });
          } else if (value === '560038') {
            setFormData({
              ...formData,
              pincode: value,
              locality: 'Jayanagar',
              district: 'Bangalore Urban',
              city: 'Bangalore',
              state: 'Karnataka'
            });
          } else {
            // Random data for other pincodes
            setFormData({
              ...formData,
              pincode: value,
              locality: 'Example Locality',
              district: 'Example District',
              city: 'Example City',
              state: 'Example State'
            });
          }
        }, 500);
      } catch (error) {
        console.error('Error fetching pincode data:', error);
      }
    }
  };

  const saveTrader = () => {
    // In a real app, this would save to backend
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-8 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            {trader ? 'Edit Trader' : 'Add New Trader'}
          </Dialog.Title>
          
          <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 pb-5">
            <div className="bg-purple-50 p-4 rounded-md mb-4 border border-purple-100">
              <p className="text-sm text-gray-700">Trader Code: <span className="font-medium text-purple-700">{newTraderCode}</span></p>
            </div>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Basic Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="trader-name" className="block text-sm font-medium text-gray-700 mb-2">Trader Name</label>
                  <input
                    id="trader-name"
                    type="text"
                    placeholder="Enter trader's full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    id="trader-companyName"
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-contact" className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input
                    id="trader-contact"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-secondaryContact" className="block text-sm font-medium text-gray-700 mb-2">Secondary Contact</label>
                  <input
                    id="trader-secondaryContact"
                    type="tel"
                    placeholder="+91 98765 43211"
                    value={formData.secondaryContact}
                    onChange={(e) => handleInputChange('secondaryContact', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-email" className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                  <input
                    id="trader-email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Address Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="trader-address1" className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                  <input
                    id="trader-address1"
                    type="text"
                    placeholder="House/Flat number, Street"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-address2" className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                  <input
                    id="trader-address2"
                    type="text"
                    placeholder="Area, Landmark"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    id="trader-pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-locality" className="block text-sm font-medium text-gray-700 mb-2">Locality/Village</label>
                  <input
                    id="trader-locality"
                    type="text"
                    placeholder="Locality or village name"
                    value={formData.locality}
                    onChange={(e) => handleInputChange('locality', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-district" className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <input
                    id="trader-district"
                    type="text"
                    placeholder="District name"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    id="trader-city"
                    type="text"
                    placeholder="City name"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    id="trader-state"
                    type="text"
                    placeholder="State name"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">ID Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="trader-gstNumber" className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input
                    id="trader-gstNumber"
                    type="text"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-aadharNumber" className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                  <input
                    id="trader-aadharNumber"
                    type="text"
                    placeholder="Aadhar Number"
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-panNumber" className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                  <input
                    id="trader-panNumber"
                    type="text"
                    placeholder="PAN Number"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Bank Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="trader-accountHolderName" className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                  <input
                    id="trader-accountHolderName"
                    type="text"
                    placeholder="Account Holder Name"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-accountType" className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <select
                    id="trader-accountType"
                    value={formData.accountType}
                    onChange={(e) => handleInputChange('accountType', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  >
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="trader-accountNumber" className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    id="trader-accountNumber"
                    type="text"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-bankName" className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    id="trader-bankName"
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="trader-ifscCode" className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                  <input
                    id="trader-ifscCode"
                    type="text"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="trader-branch" className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  <input
                    id="trader-branch"
                    type="text"
                    placeholder="Branch"
                    value={formData.branch}
                    onChange={(e) => handleInputChange('branch', e.target.value)}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveTrader}
                className="px-5 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow transition-colors duration-150"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function TraderManagement() {
  const [isAddTraderOpen, setIsAddTraderOpen] = useState(false);
  const [isEditTraderOpen, setIsEditTraderOpen] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTraders = dummyTraders.filter(trader =>
    trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trader.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditTrader = (trader: Trader) => {
    setSelectedTrader(trader);
    setIsEditTraderOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Traders</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your trader relationships and track sales.</p>
        </div>
        <button
          onClick={() => setIsAddTraderOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Trader
        </button>
      </div>

      <div className="flex items-center max-w-md">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search traders..."
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trader
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Purchases
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Purchase
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTraders.map(trader => (
              <tr key={trader.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{trader.name}</div>
                      <div className="text-sm text-gray-500">{trader.contact}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{trader.district}</div>
                  <div className="text-sm text-gray-500">{trader.state}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{trader.totalPurchases.toLocaleString()} kg</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span>Growing</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(trader.lastPurchase).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    trader.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {trader.status.charAt(0).toUpperCase() + trader.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditTrader(trader)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Trader Dialog */}
      <TraderForm isOpen={isAddTraderOpen} onClose={() => setIsAddTraderOpen(false)} />
      
      {/* Edit Trader Dialog */}
      {selectedTrader && (
        <TraderForm 
          isOpen={isEditTraderOpen} 
          onClose={() => setIsEditTraderOpen(false)} 
          trader={selectedTrader} 
        />
      )}
    </div>
  );
}

export default TraderManagement;