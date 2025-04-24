import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { v4 as uuidv4 } from 'uuid';

// Shed interface to support multiple sheds
interface Shed {
  id: string;
  name: string;
  length: number;
  width: number;
  capacity: number;
  location: string;
  status: 'active' | 'inactive';
}

interface Farmer {
  id: string;
  farmerCode: string;
  name: string;
  companyName: string;
  contact: string;
  secondaryContact: string;
  doorNumber: string;
  village: string;
  district: string;
  state: string;
  aadharNumber: string;
  panNumber: string;
  gstNumber: string;
  accountHolderName: string;
  accountType: 'savings' | 'current' | 'other';
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branch: string;
  sheds: Shed[];
  registrationYear: number;
  activeBatches: number;
  status: 'active' | 'inactive';
}

const dummyFarmers: Farmer[] = [
  {
    id: '1',
    farmerCode: 'F2024-001',
    name: 'Rajesh Kumar',
    companyName: 'RK Farms',
    contact: '+91 98765 43210',
    secondaryContact: '+91 98765 43211',
    doorNumber: '123/A',
    village: 'Hoskote',
    district: 'Bangalore Rural',
    state: 'Karnataka',
    aadharNumber: 'XXXX-XXXX-1234',
    panNumber: 'ABCDE1234F',
    gstNumber: 'GST123456789',
    accountHolderName: 'Rajesh Kumar',
    accountType: 'savings',
    accountNumber: '1234567890123456',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    branch: 'Hoskote',
    sheds: [
      {
        id: '1',
        name: 'RK Farms',
        length: 100,
        width: 50,
        capacity: 5000,
        location: 'Hoskote, Bangalore Rural',
        status: 'active',
      },
    ],
    registrationYear: 2024,
    activeBatches: 2,
    status: 'active',
  },
  {
    id: '2',
    farmerCode: 'F2024-002',
    name: 'Suresh Patel',
    companyName: 'SP Poultry',
    contact: '+91 98765 43210',
    secondaryContact: '+91 98765 43211',
    doorNumber: '45',
    village: 'Tumkur Village',
    district: 'Tumkur',
    state: 'Karnataka',
    aadharNumber: 'XXXX-XXXX-5678',
    panNumber: 'PQRST5678G',
    gstNumber: 'GST567890123',
    accountHolderName: 'Suresh Patel',
    accountType: 'savings',
    accountNumber: '9876543210987654',
    bankName: 'Canara Bank',
    ifscCode: 'CNRB0002345',
    branch: 'Tumkur',
    sheds: [
      {
        id: '2',
        name: 'SP Poultry',
        length: 80,
        width: 40,
        capacity: 3000,
        location: 'Tumkur',
        status: 'active',
      },
    ],
    registrationYear: 2024,
    activeBatches: 1,
    status: 'active',
  },
  {
    id: '3',
    farmerCode: 'F2024-003',
    name: 'Venkatesh Rao',
    companyName: 'VR Farms',
    contact: '+91 98765 43210',
    secondaryContact: '+91 98765 43211',
    doorNumber: '789',
    village: 'Mysore Village',
    district: 'Mysore',
    state: 'Karnataka',
    aadharNumber: 'XXXX-XXXX-9012',
    panNumber: 'UVWXY9012H',
    gstNumber: 'GST901234567',
    accountHolderName: 'Venkatesh Rao',
    accountType: 'current',
    accountNumber: '5678901234567890',
    bankName: 'HDFC Bank',
    ifscCode: 'HDFC0003456',
    branch: 'Mysore',
    sheds: [
      {
        id: '3',
        name: 'VR Farms',
        length: 120,
        width: 60,
        capacity: 4000,
        location: 'Mysore',
        status: 'active',
      },
    ],
    registrationYear: 2024,
    activeBatches: 3,
    status: 'active',
  },
];

// Generate a new farmer code based on current year and series
const generateFarmerCode = () => {
  const currentYear = new Date().getFullYear();
  const lastFarmer = dummyFarmers
    .filter(farmer => farmer.registrationYear === currentYear)
    .sort((a, b) => {
      const aNum = parseInt(a.farmerCode.split('-')[1]);
      const bNum = parseInt(b.farmerCode.split('-')[1]);
      return bNum - aNum;
    })[0];
  
  let seriesNumber = 1;
  if (lastFarmer) {
    seriesNumber = parseInt(lastFarmer.farmerCode.split('-')[1]) + 1;
  }
  
  return `F${currentYear}-${seriesNumber.toString().padStart(3, '0')}`;
};

function FarmerForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const newFarmerCode = generateFarmerCode();
  const [sheds, setSheds] = useState<Shed[]>([
    { id: uuidv4(), name: 'Shed 1', length: 0, width: 0, capacity: 0, location: '', status: 'active' }
  ]);
  const [pincode, setPincode] = useState('');
  const [addressDetails, setAddressDetails] = useState({
    locality: '',
    district: '',
    state: ''
  });

  const handleShedChange = (id: string, field: 'name' | 'length' | 'width' | 'capacity' | 'location', value: string) => {
    setSheds(sheds.map(shed => {
      if (shed.id === id) {
        // Don't allow name change for the first shed
        if (field === 'name' && shed.name === 'Shed 1') {
          return shed;
        }
        
        let updatedShed = { ...shed };
        
        if (field === 'length' || field === 'width') {
          const numValue = parseInt(value) || 0;
          updatedShed = { 
            ...updatedShed, 
            [field]: numValue 
          };
          
          // Auto-calculate capacity if both length and width are available
          if (field === 'length' && updatedShed.width > 0) {
            updatedShed.capacity = Math.floor(numValue * updatedShed.width * 0.989); // 1.1% less
          } else if (field === 'width' && updatedShed.length > 0) {
            updatedShed.capacity = Math.floor(updatedShed.length * numValue * 0.989); // 1.1% less
          }
        } else if (field === 'capacity') {
          updatedShed = { 
            ...updatedShed, 
            [field]: parseInt(value) || 0 
          };
        } else {
          updatedShed = { 
            ...updatedShed, 
            [field]: value 
          };
        }
        
        return updatedShed;
      }
      return shed;
    }));
  };
  
  // Auto generate shed name based on index
  const generateShedName = (index: number) => {
    return `Shed ${index + 1}`;
  };
  
  // Update sheds when adding a new one
  const addShed = () => {
    const newShedIndex = sheds.length;
    const newShed: Shed = {
      id: uuidv4(),
      name: `Shed ${newShedIndex + 1}`,
      length: 0,
      width: 0,
      capacity: 0,
      location: '',
      status: 'active'
    };
    setSheds([...sheds, newShed]);
  };

  const removeShed = (id: string) => {
    if (sheds.length === 1) return; // Always keep at least one shed
    setSheds(sheds.filter(shed => shed.id !== id));
  };

  // Handle pincode auto-fill
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPincode(value);
    
    // Auto-fill address details when pincode is 6 digits
    if (value.length === 6) {
      try {
        // Show some loading state
        setAddressDetails({
          locality: 'Loading...',
          district: 'Loading...',
          state: 'Loading...'
        });
        
        // Fetch pincode data from the API
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();
        
        if (data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
          // Get the first post office data
          const postOffice = data[0].PostOffice[0];
          
          setAddressDetails({
            locality: postOffice.Name,
            district: postOffice.District,
            state: postOffice.State
          });
        } else {
          // If API returns no data or error
          setAddressDetails({
            locality: '',
            district: '',
            state: ''
          });
          alert('No location found for this pincode. Please enter address details manually.');
        }
      } catch (error) {
        console.error('Error fetching pincode data:', error);
        setAddressDetails({
          locality: '',
          district: '',
          state: ''
        });
        alert('Error fetching location data. Please enter address details manually.');
      }
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-8 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            Add New Farmer
          </Dialog.Title>
          
          <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 pb-5">
            <div className="bg-purple-50 p-4 rounded-md mb-4 border border-purple-100">
              <p className="text-sm text-gray-700">Auto-generated Farmer Code: <span className="font-medium text-purple-700">{newFarmerCode}</span></p>
            </div>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Basic Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    id="farmer-name"
                    type="text"
                    placeholder="Enter farmer's full name"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-company-name" className="block text-sm font-medium text-gray-700 mb-2">Company Name (if applicable)</label>
                  <input
                    id="farmer-company-name"
                    type="text"
                    placeholder="Enter company name"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-contact" className="block text-sm font-medium text-gray-700 mb-2">Primary Contact Number</label>
                  <input
                    id="farmer-contact"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-secondary-contact" className="block text-sm font-medium text-gray-700 mb-2">Secondary Contact Number</label>
                  <input
                    id="farmer-secondary-contact"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Address Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-address1" className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                  <input
                    id="farmer-address1"
                    type="text"
                    placeholder="House/Flat number, Street"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-address2" className="block text-sm font-medium text-gray-700 mb-2">Address Line 2 (Optional)</label>
                  <input
                    id="farmer-address2"
                    type="text"
                    placeholder="Area, Landmark"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    id="farmer-pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={pincode}
                    onChange={handlePincodeChange}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-locality" className="block text-sm font-medium text-gray-700 mb-2">Locality/Village</label>
                  <input
                    id="farmer-locality"
                    type="text"
                    placeholder="Locality or village name"
                    value={addressDetails.locality}
                    onChange={(e) => setAddressDetails({...addressDetails, locality: e.target.value})}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-district" className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <input
                    id="farmer-district"
                    type="text"
                    placeholder="District name"
                    value={addressDetails.district}
                    onChange={(e) => setAddressDetails({...addressDetails, district: e.target.value})}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    id="farmer-state"
                    type="text"
                    placeholder="State name"
                    value={addressDetails.state}
                    onChange={(e) => setAddressDetails({...addressDetails, state: e.target.value})}
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">ID Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-aadhar" className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                  <input
                    id="farmer-aadhar"
                    type="text"
                    placeholder="XXXX-XXXX-XXXX"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-pan" className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                  <input
                    id="farmer-pan"
                    type="text"
                    placeholder="ABCDE1234F"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-gst" className="block text-sm font-medium text-gray-700 mb-2">GST Number (if company)</label>
                  <input
                    id="farmer-gst"
                    type="text"
                    placeholder="22AAAAA0000A1Z5"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Bank Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-account-name" className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                  <input
                    id="farmer-account-name"
                    type="text"
                    placeholder="Name as per bank records"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-account-type" className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <select
                    id="farmer-account-type"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  >
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-account-number" className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    id="farmer-account-number"
                    type="text"
                    placeholder="16-20 digit account number"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-bank-name" className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    id="farmer-bank-name"
                    type="text"
                    placeholder="e.g. SBI, HDFC, etc."
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-ifsc" className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                  <input
                    id="farmer-ifsc"
                    type="text"
                    placeholder="11 character code"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-branch" className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  <input
                    id="farmer-branch"
                    type="text"
                    placeholder="Bank branch location"
                    className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  />
                </div>
              </div>
            </fieldset>
            
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Shed Information</legend>
              <div className="space-y-6">
                {sheds.map((shed, index) => (
                  <div key={shed.id} className="p-4 border border-gray-100 rounded-md bg-gray-50 relative">
                    {sheds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeShed(shed.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:max-w-xs">
                        <label htmlFor={`shed-name-${shed.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                          Shed Name
                        </label>
                        <input
                          id={`shed-name-${shed.id}`}
                          type="text"
                          value={shed.name}
                          onChange={(e) => handleShedChange(shed.id, 'name', e.target.value)}
                          placeholder="Name of the shed or farm"
                          className={`block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm ${shed.name === 'Shed 1' ? 'bg-gray-100' : ''}`}
                          disabled={shed.name === 'Shed 1'}
                        />
                      </div>
                      
                      <div className="md:max-w-xs">
                        <label htmlFor={`shed-length-${shed.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                          Shed Length
                        </label>
                        <input
                          id={`shed-length-${shed.id}`}
                          type="number"
                          value={shed.length}
                          onChange={(e) => handleShedChange(shed.id, 'length', e.target.value)}
                          placeholder="Length of the shed"
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                        />
                      </div>
                      
                      <div className="md:max-w-xs">
                        <label htmlFor={`shed-width-${shed.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                          Shed Width
                        </label>
                        <input
                          id={`shed-width-${shed.id}`}
                          type="number"
                          value={shed.width}
                          onChange={(e) => handleShedChange(shed.id, 'width', e.target.value)}
                          placeholder="Width of the shed"
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                        />
                      </div>

                      <div className="md:max-w-xs">
                        <label htmlFor={`shed-capacity-${shed.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                          Capacity (auto-calculated)
                        </label>
                        <input
                          id={`shed-capacity-${shed.id}`}
                          type="text"
                          value={shed.capacity}
                          disabled
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50 shadow-sm text-sm text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Calculated as Length × Width - 1.1%</p>
                      </div>
                      
                      <div className="md:max-w-xs">
                        <label htmlFor={`shed-location-${shed.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                          Shed Location
                        </label>
                        <input
                          id={`shed-location-${shed.id}`}
                          type="text"
                          value={shed.location}
                          onChange={(e) => handleShedChange(shed.id, 'location', e.target.value)}
                          placeholder="Location of the shed"
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div>
                  <button
                    type="button"
                    onClick={addShed}
                    className="inline-flex items-center px-3 py-2 border border-dashed border-purple-300 rounded-md text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shed
                  </button>
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
                type="submit"
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

function FarmerDetails({ isOpen, onClose, farmer }: { isOpen: boolean; onClose: () => void; farmer: Farmer }) {
  const [status, setStatus] = useState<'active' | 'inactive'>(farmer.status);
  const [isEditing, setIsEditing] = useState(false);
  const [farmerData, setFarmerData] = useState({...farmer});
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as 'active' | 'inactive');
  };
  
  const handleShedStatusChange = (shedId: string, status: 'active' | 'inactive') => {
    // Implementation for changing shed status
  };

  const handleInputChange = (field: keyof Farmer, value: string) => {
    setFarmerData({...farmerData, [field]: value});
  };
  
  const saveChanges = () => {
    // In a real app, this would save to backend
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-8 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3 flex justify-between items-center">
            <span>Farmer Details</span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm rounded-md flex items-center"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              {isEditing ? "Cancel Edit" : "Edit Details"}
            </button>
          </Dialog.Title>
          
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pb-5 pr-2">
            {/* Farmer Code and Status */}
            <div className="flex items-start justify-between">
              <div className="bg-purple-50 p-3 rounded-md mb-4 border border-purple-100 w-1/2">
                <p className="text-sm text-gray-700">Farmer Code: <span className="font-medium text-purple-700">{farmerData.farmerCode}</span></p>
              </div>
              
              <div className="w-1/3">
                <label htmlFor="farmer-status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  id="farmer-status"
                  value={status}
                  onChange={handleStatusChange}
                  disabled={!isEditing}
                  className={`block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm ${
                    status === 'active' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  } px-3 py-2`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            {/* Basic Information */}
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Basic Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-name-view" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      id="farmer-name-edit"
                      type="text"
                      value={farmerData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.name}</p>
                  )}
                </div>
                
                <div className="md:max-w-xs">
                  <label htmlFor="farmer-company-name-view" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  {isEditing ? (
                    <input
                      id="farmer-company-name-edit"
                      type="text"
                      value={farmerData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.companyName}</p>
                  )}
                </div>
              </div>
            </fieldset>
            
            {/* Contact Information */}
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Contact Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="farmer-contact-view" className="block text-sm font-medium text-gray-700 mb-2">Primary Contact Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-contact-edit"
                      type="tel"
                      value={farmerData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.contact}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-secondary-contact-view" className="block text-sm font-medium text-gray-700 mb-2">Secondary Contact Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-secondary-contact-edit"
                      type="tel"
                      value={farmerData.secondaryContact}
                      onChange={(e) => handleInputChange('secondaryContact', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.secondaryContact}</p>
                  )}
                </div>
              </div>
            </fieldset>
            
            {/* Address Information */}
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Address Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="farmer-door-view" className="block text-sm font-medium text-gray-700 mb-2">Door/Flat Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-door-edit"
                      type="text"
                      value={farmerData.doorNumber}
                      onChange={(e) => handleInputChange('doorNumber', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.doorNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-village-view" className="block text-sm font-medium text-gray-700 mb-2">Village/Locality</label>
                  {isEditing ? (
                    <input
                      id="farmer-village-edit"
                      type="text"
                      value={farmerData.village}
                      onChange={(e) => handleInputChange('village', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.village}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-district-view" className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  {isEditing ? (
                    <input
                      id="farmer-district-edit"
                      type="text"
                      value={farmerData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.district}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-state-view" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      id="farmer-state-edit"
                      type="text"
                      value={farmerData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.state}</p>
                  )}
                </div>
              </div>
            </fieldset>
            
            {/* ID Information */}
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">ID Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="farmer-aadhar" className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-aadhar-edit"
                      type="text"
                      value={farmerData.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.aadharNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-pan" className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-pan-edit"
                      type="text"
                      value={farmerData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.panNumber}</p>
                  )}
                </div>

                <div className="md:max-w-xs">
                  <label htmlFor="farmer-gst" className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-gst-edit"
                      type="text"
                      value={farmerData.gstNumber}
                      onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.gstNumber}</p>
                  )}
                </div>
              </div>
            </fieldset>
            
            {/* Bank Information */}
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Bank Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="farmer-account-name" className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                  {isEditing ? (
                    <input
                      id="farmer-account-name-edit"
                      type="text"
                      value={farmerData.accountHolderName}
                      onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.accountHolderName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-account-type" className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  {isEditing ? (
                    <select
                      id="farmer-account-type-edit"
                      value={farmerData.accountType}
                      onChange={(e) => handleInputChange('accountType', e.target.value as 'savings' | 'current' | 'other')}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    >
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.accountType}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-account-number" className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  {isEditing ? (
                    <input
                      id="farmer-account-number-edit"
                      type="text"
                      value={farmerData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.accountNumber}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-bank-name" className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  {isEditing ? (
                    <input
                      id="farmer-bank-name-edit"
                      type="text"
                      value={farmerData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.bankName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-ifsc" className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                  {isEditing ? (
                    <input
                      id="farmer-ifsc-edit"
                      type="text"
                      value={farmerData.ifscCode}
                      onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.ifscCode}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="farmer-branch" className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  {isEditing ? (
                    <input
                      id="farmer-branch-edit"
                      type="text"
                      value={farmerData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{farmerData.branch}</p>
                  )}
                </div>
              </div>
            </fieldset>
            
            {/* Shed Information */}
            <fieldset className="p-4 border border-gray-200 rounded-lg">
              <legend className="text-lg font-medium text-gray-800 px-2">Shed Information</legend>
              <div className="space-y-4">
                {farmerData.sheds.map(shed => (
                  <div key={shed.id} className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{shed.name}</h4>
                        <p className="text-sm text-gray-500">{shed.location}</p>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <span className="text-xs text-gray-500">Length</span>
                            <p className="text-sm font-medium">{shed.length} m</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Width</span>
                            <p className="text-sm font-medium">{shed.width} m</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Capacity</span>
                            <p className="text-sm font-medium">{shed.capacity} birds</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {isEditing ? (
                          <select
                            value={shed.status}
                            onChange={(e) => handleShedStatusChange(shed.id, e.target.value as 'active' | 'inactive')}
                            className="mt-1 block pl-3 pr-10 py-1 text-xs border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        ) : (
                          <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            shed.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {shed.status.charAt(0).toUpperCase() + shed.status.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
            
            {/* Active Batches */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Active Batches</h3>
              {farmerData.activeBatches > 0 ? (
                <div className="bg-white border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birds</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shed</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Placeholder for batch data */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">B001</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-02-01</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5000</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmerData.sheds[0].name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-purple-600 hover:text-purple-900">View Details</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No active batches</p>
              )}
            </div>
            
            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={saveChanges}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function FarmerManagement() {
  const [isAddFarmerOpen, setIsAddFarmerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  const filteredFarmers = dummyFarmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openFarmerDetails = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsViewDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Farmers</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your farmer partnerships and shed details.</p>
        </div>
        <button
          onClick={() => setIsAddFarmerOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Farmer
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
            placeholder="Search farmers..."
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sheds
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFarmers.map((farmer) => (
              <tr key={farmer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                  {farmer.farmerCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                      <div className="text-sm text-gray-500">{farmer.contact}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{farmer.district}, {farmer.state}</div>
                  <div className="text-sm text-gray-500">{farmer.village}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{farmer.sheds.length} Sheds</div>
                  <div className="text-sm text-gray-500">
                    {farmer.sheds.map(shed => shed.name).join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      farmer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {farmer.status.charAt(0).toUpperCase() + farmer.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {farmer.activeBatches} Active Batches
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-purple-600 hover:text-purple-900 mr-3"
                    onClick={() => openFarmerDetails(farmer)}
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

      <FarmerForm isOpen={isAddFarmerOpen} onClose={() => setIsAddFarmerOpen(false)} />
      
      {selectedFarmer && (
        <FarmerDetails 
          isOpen={isViewDetailsOpen} 
          onClose={() => setIsViewDetailsOpen(false)} 
          farmer={selectedFarmer} 
        />
      )}
    </div>
  );
}

export default FarmerManagement;