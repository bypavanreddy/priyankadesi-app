import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';

// Define the types for the different master data components
interface FarmerRates {
  farmerGrowerAmount: number;
  birdShortageAmount: number;
  mortalityRate: number;
  mortalityBirdsAbove3Percent: number;
  mortalityBirdsAbove10Percent: number;
  feedAmountPerKg: number;
  chickCost: number;
  farmerManagementIncentive: number;
  adminCost: number;
  standardProductionCost: number;
  productionCostIncentive: number;
}

interface GrossRates {
  chickPriceForCompany: number;
  feedPriceForCompany: number;
  desiPerKg: number;
  starter: number;
  desiFinisher: number;
  otherFeed: number;
}

interface Standards {
  standardFCR: number;
  standardProductionCost: number;
}

// Bird Type interface
interface BirdType {
  id: string;
  name: string;
  description: string;
  defaultPrice: number;
  minWeight: number;
  maxWeight: number;
  isActive: boolean;
}

// Pricing interface
interface Pricing {
  id: string;
  birdTypeId: string;
  birdTypeName: string;
  minWeight: number;
  maxWeight: number;
  pricePerKg: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
}

// Sample data
const initialFarmerRates: FarmerRates = {
  farmerGrowerAmount: 5000,
  birdShortageAmount: 200,
  mortalityRate: 3,
  mortalityBirdsAbove3Percent: 250,
  mortalityBirdsAbove10Percent: 300,
  feedAmountPerKg: 30,
  chickCost: 45,
  farmerManagementIncentive: 2500,
  adminCost: 5000,
  standardProductionCost: 170,
  productionCostIncentive: 5
};

const initialGrossRates: GrossRates = {
  chickPriceForCompany: 42,
  feedPriceForCompany: 28,
  desiPerKg: 120,
  starter: 28,
  desiFinisher: 30,
  otherFeed: 32
};

const initialStandards: Standards = {
  standardFCR: 1.5,
  standardProductionCost: 170
};

// Sample bird types
const initialBirdTypes: BirdType[] = [
  {
    id: '1',
    name: 'TN Aseel',
    description: 'Tamil Nadu local breed Aseel',
    defaultPrice: 230,
    minWeight: 1200,
    maxWeight: 3000,
    isActive: true
  },
  {
    id: '2',
    name: 'Indbro Aseel',
    description: 'Indbro breed Aseel',
    defaultPrice: 240,
    minWeight: 1500,
    maxWeight: 3500,
    isActive: true
  },
  {
    id: '3',
    name: 'Color Broiler',
    description: 'Colored broiler birds',
    defaultPrice: 180,
    minWeight: 1000,
    maxWeight: 2500,
    isActive: true
  },
  {
    id: '4',
    name: 'Broiler',
    description: 'Regular broiler birds',
    defaultPrice: 160,
    minWeight: 800,
    maxWeight: 2200,
    isActive: true
  },
  {
    id: '5',
    name: 'Brown Layered',
    description: 'Brown layered birds for eggs',
    defaultPrice: 200,
    minWeight: 1300,
    maxWeight: 2800,
    isActive: true
  },
  {
    id: '6',
    name: 'Rainbow Roaster',
    description: 'Rainbow roaster variety',
    defaultPrice: 210,
    minWeight: 1400,
    maxWeight: 3200,
    isActive: true
  },
  {
    id: '7',
    name: 'Sonali',
    description: 'Sonali breed birds',
    defaultPrice: 190,
    minWeight: 1100,
    maxWeight: 2600,
    isActive: false
  }
];

// Sample pricing data
const initialPricing: Pricing[] = [
  {
    id: '1',
    birdTypeId: '1',
    birdTypeName: 'TN Aseel',
    minWeight: 1200,
    maxWeight: 2000,
    pricePerKg: 230,
    effectiveFrom: '2024-01-01',
    effectiveTo: null,
    isActive: true
  },
  {
    id: '2',
    birdTypeId: '1',
    birdTypeName: 'TN Aseel',
    minWeight: 2001,
    maxWeight: 3000,
    pricePerKg: 250,
    effectiveFrom: '2024-01-01',
    effectiveTo: null,
    isActive: true
  },
  {
    id: '3',
    birdTypeId: '2',
    birdTypeName: 'Indbro Aseel',
    minWeight: 1500,
    maxWeight: 3500,
    pricePerKg: 240,
    effectiveFrom: '2024-01-01',
    effectiveTo: null,
    isActive: true
  },
  {
    id: '4',
    birdTypeId: '3',
    birdTypeName: 'Color Broiler',
    minWeight: 1000,
    maxWeight: 2500,
    pricePerKg: 180,
    effectiveFrom: '2024-01-01',
    effectiveTo: null,
    isActive: true
  }
];

function FarmerRatesForm() {
  const [rates, setRates] = useState<FarmerRates>(initialFarmerRates);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof FarmerRates, value: number) => {
    setRates(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    console.log('Saving farmer rates:', rates);
    // In a real app, you would save this to your backend/database
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setRates(initialFarmerRates);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Farmer Rates</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit Rates
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={saveChanges}
              className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </button>
            <button
              onClick={cancelChanges}
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer Grower Amount (₹)
            </label>
            <input
              type="number"
              value={rates.farmerGrowerAmount}
              onChange={(e) => handleChange('farmerGrowerAmount', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bird Shortage Amount (₹)
            </label>
            <input
              type="number"
              value={rates.birdShortageAmount}
              onChange={(e) => handleChange('birdShortageAmount', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mortality Rate (%)
            </label>
            <input
              type="number"
              value={rates.mortalityRate}
              onChange={(e) => handleChange('mortalityRate', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              3% Mortality Birds Above Amount (₹)
            </label>
            <input
              type="number"
              value={rates.mortalityBirdsAbove3Percent}
              onChange={(e) => handleChange('mortalityBirdsAbove3Percent', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              10% above mortality Birds Amount (₹)
            </label>
            <input
              type="number"
              value={rates.mortalityBirdsAbove10Percent}
              onChange={(e) => handleChange('mortalityBirdsAbove10Percent', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feed Amount Per KG (₹)
            </label>
            <input
              type="number"
              value={rates.feedAmountPerKg}
              onChange={(e) => handleChange('feedAmountPerKg', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chick Cost (₹)
            </label>
            <input
              type="number"
              value={rates.chickCost}
              onChange={(e) => handleChange('chickCost', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farmer Management Incentive (₹)
            </label>
            <input
              type="number"
              value={rates.farmerManagementIncentive}
              onChange={(e) => handleChange('farmerManagementIncentive', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Cost (₹)
            </label>
            <input
              type="number"
              value={rates.adminCost}
              onChange={(e) => handleChange('adminCost', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard Production Cost (₹)
            </label>
            <input
              type="number"
              value={rates.standardProductionCost}
              onChange={(e) => handleChange('standardProductionCost', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Production Cost Incentive (%)
            </label>
            <input
              type="number"
              value={rates.productionCostIncentive}
              onChange={(e) => handleChange('productionCostIncentive', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GrossRatesForm() {
  const [rates, setRates] = useState<GrossRates>(initialGrossRates);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof GrossRates, value: number) => {
    setRates(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    console.log('Saving gross rates:', rates);
    // In a real app, you would save this to your backend/database
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setRates(initialGrossRates);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Actual Gross Rates</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit Rates
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={saveChanges}
              className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </button>
            <button
              onClick={cancelChanges}
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chick Price for Company (₹)
            </label>
            <input
              type="number"
              value={rates.chickPriceForCompany}
              onChange={(e) => handleChange('chickPriceForCompany', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feed Price for Company (₹)
            </label>
            <input
              type="number"
              value={rates.feedPriceForCompany}
              onChange={(e) => handleChange('feedPriceForCompany', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desi Per KG (₹)
            </label>
            <input
              type="number"
              value={rates.desiPerKg}
              onChange={(e) => handleChange('desiPerKg', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starter (₹)
            </label>
            <input
              type="number"
              value={rates.starter}
              onChange={(e) => handleChange('starter', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desi Finisher (₹)
            </label>
            <input
              type="number"
              value={rates.desiFinisher}
              onChange={(e) => handleChange('desiFinisher', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Feed (₹)
            </label>
            <input
              type="number"
              value={rates.otherFeed}
              onChange={(e) => handleChange('otherFeed', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StandardsForm() {
  const [standards, setStandards] = useState<Standards>(initialStandards);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof Standards, value: number) => {
    setStandards(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    console.log('Saving standards:', standards);
    // In a real app, you would save this to your backend/database
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setStandards(initialStandards);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Standards</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit Standards
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={saveChanges}
              className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </button>
            <button
              onClick={cancelChanges}
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard F.C.R
            </label>
            <input
              type="number"
              step="0.1"
              value={standards.standardFCR}
              onChange={(e) => handleChange('standardFCR', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard Production Cost (₹)
            </label>
            <input
              type="number"
              value={standards.standardProductionCost}
              onChange={(e) => handleChange('standardProductionCost', Number(e.target.value))}
              disabled={!isEditing}
              className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// BirdTypeForm Component
function BirdTypeForm({ isOpen, onClose, birdType }: { isOpen: boolean; onClose: () => void; birdType?: BirdType }) {
  const isEditing = !!birdType;
  const [formData, setFormData] = useState<BirdType>(
    birdType || {
      id: (initialBirdTypes.length + 1).toString(),
      name: '',
      description: '',
      defaultPrice: 0,
      minWeight: 0,
      maxWeight: 0,
      isActive: true
    }
  );

  const handleInputChange = (field: keyof BirdType, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            {isEditing ? 'Edit Bird Type' : 'Add New Bird Type'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Bird Type Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="defaultPrice" className="block text-sm font-medium text-gray-700 mb-1">Default Price (₹/kg)</label>
                <input
                  id="defaultPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.defaultPrice}
                  onChange={(e) => handleInputChange('defaultPrice', parseFloat(e.target.value))}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  value={formData.isActive ? 'active' : 'inactive'}
                  onChange={(e) => handleInputChange('isActive', e.target.value === 'active')}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minWeight" className="block text-sm font-medium text-gray-700 mb-1">Min Weight (g)</label>
                <input
                  id="minWeight"
                  type="number"
                  min="0"
                  value={formData.minWeight}
                  onChange={(e) => handleInputChange('minWeight', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="maxWeight" className="block text-sm font-medium text-gray-700 mb-1">Max Weight (g)</label>
                <input
                  id="maxWeight"
                  type="number"
                  min="0"
                  value={formData.maxWeight}
                  onChange={(e) => handleInputChange('maxWeight', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-5 border-t mt-6">
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
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

// PricingForm Component
function PricingForm({ isOpen, onClose, pricing, birdTypes }: { 
  isOpen: boolean; 
  onClose: () => void; 
  pricing?: Pricing;
  birdTypes: BirdType[]
}) {
  const isEditing = !!pricing;
  const [formData, setFormData] = useState<Pricing>(
    pricing || {
      id: (initialPricing.length + 1).toString(),
      birdTypeId: '',
      birdTypeName: '',
      minWeight: 0,
      maxWeight: 0,
      pricePerKg: 0,
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: null,
      isActive: true
    }
  );

  const handleInputChange = (field: keyof Pricing, value: any) => {
    if (field === 'birdTypeId') {
      const selectedBirdType = birdTypes.find(bt => bt.id === value);
      setFormData({ 
        ...formData, 
        birdTypeId: value,
        birdTypeName: selectedBirdType?.name || '',
        minWeight: selectedBirdType?.minWeight || 0,
        maxWeight: selectedBirdType?.maxWeight || 0,
        pricePerKg: selectedBirdType?.defaultPrice || 0
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            {isEditing ? 'Edit Pricing' : 'Add New Pricing'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="birdType" className="block text-sm font-medium text-gray-700 mb-1">Bird Type</label>
              <select
                id="birdType"
                value={formData.birdTypeId}
                onChange={(e) => handleInputChange('birdTypeId', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                required
              >
                <option value="">Select Bird Type</option>
                {birdTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minWeight" className="block text-sm font-medium text-gray-700 mb-1">Min Weight (g)</label>
                <input
                  id="minWeight"
                  type="number"
                  min="0"
                  value={formData.minWeight}
                  onChange={(e) => handleInputChange('minWeight', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="maxWeight" className="block text-sm font-medium text-gray-700 mb-1">Max Weight (g)</label>
                <input
                  id="maxWeight"
                  type="number"
                  min="0"
                  value={formData.maxWeight}
                  onChange={(e) => handleInputChange('maxWeight', parseInt(e.target.value))}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700 mb-1">Price per Kg (₹)</label>
              <input
                id="pricePerKg"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerKg}
                onChange={(e) => handleInputChange('pricePerKg', parseFloat(e.target.value))}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="effectiveFrom" className="block text-sm font-medium text-gray-700 mb-1">Effective From</label>
                <input
                  id="effectiveFrom"
                  type="date"
                  value={formData.effectiveFrom}
                  onChange={(e) => handleInputChange('effectiveFrom', e.target.value)}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="effectiveTo" className="block text-sm font-medium text-gray-700 mb-1">Effective To (Optional)</label>
                <input
                  id="effectiveTo"
                  type="date"
                  value={formData.effectiveTo || ''}
                  onChange={(e) => handleInputChange('effectiveTo', e.target.value || null)}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) => handleInputChange('isActive', e.target.value === 'active')}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 pt-5 border-t mt-6">
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
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function MasterData() {
  const [birdTypes, setBirdTypes] = useState<BirdType[]>(initialBirdTypes);
  const [pricing, setPricing] = useState<Pricing[]>(initialPricing);
  const [isAddBirdTypeOpen, setIsAddBirdTypeOpen] = useState(false);
  const [isAddPricingOpen, setIsAddPricingOpen] = useState(false);
  const [selectedBirdType, setSelectedBirdType] = useState<BirdType | undefined>(undefined);
  const [selectedPricing, setSelectedPricing] = useState<Pricing | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState(0);

  const openEditBirdType = (birdType: BirdType) => {
    setSelectedBirdType(birdType);
    setIsAddBirdTypeOpen(true);
  };

  const openEditPricing = (pricing: Pricing) => {
    setSelectedPricing(pricing);
    setIsAddPricingOpen(true);
  };

  const closeAddBirdType = () => {
    setSelectedBirdType(undefined);
    setIsAddBirdTypeOpen(false);
  };

  const closeAddPricing = () => {
    setSelectedPricing(undefined);
    setIsAddPricingOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Master Data</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your bird types, pricing, and other master data.</p>
        </div>
      </div>

      <div className="space-y-6">
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-md
              ${selected 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }
              `
            }>
              Farmer Rates
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-md
              ${selected 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }
              `
            }>
              Gross Rates
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-md
              ${selected 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }
              `
            }>
              Standards
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-md
              ${selected 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }
              `
            }>
              Bird Types
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm font-medium leading-5 rounded-md
              ${selected 
                ? 'bg-white shadow text-purple-700' 
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }
              `
            }>
              Pricing
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <FarmerRatesForm />
            </Tab.Panel>
            <Tab.Panel>
              <GrossRatesForm />
            </Tab.Panel>
            <Tab.Panel>
              <StandardsForm />
            </Tab.Panel>
            <Tab.Panel>
              {/* Bird Types Tab */}
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsAddBirdTypeOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bird Type
                  </button>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Default Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Weight Range
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
                      {birdTypes.map((birdType) => (
                        <tr key={birdType.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{birdType.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{birdType.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{birdType.defaultPrice}/kg</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{birdType.minWeight} - {birdType.maxWeight} g</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              birdType.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {birdType.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-purple-600 hover:text-purple-900 mr-3"
                              onClick={() => openEditBirdType(birdType)}
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
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {/* Pricing Tab */}
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsAddPricingOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pricing
                  </button>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bird Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Weight Range
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price per Kg
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Effective Period
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
                      {pricing.map((price) => (
                        <tr key={price.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{price.birdTypeName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{price.minWeight} - {price.maxWeight} g</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹{price.pricePerKg}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(price.effectiveFrom).toLocaleDateString()}
                              {price.effectiveTo ? ` - ${new Date(price.effectiveTo).toLocaleDateString()}` : ' - Present'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              price.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {price.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-purple-600 hover:text-purple-900 mr-3"
                              onClick={() => openEditPricing(price)}
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
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Dialog for adding/editing bird types */}
      {isAddBirdTypeOpen && (
        <BirdTypeForm
          isOpen={isAddBirdTypeOpen}
          onClose={closeAddBirdType}
          birdType={selectedBirdType}
        />
      )}

      {/* Dialog for adding/editing pricing */}
      {isAddPricingOpen && (
        <PricingForm
          isOpen={isAddPricingOpen}
          onClose={closeAddPricing}
          pricing={selectedPricing}
          birdTypes={birdTypes.filter(bt => bt.isActive)}
        />
      )}
    </div>
  );
}

export default MasterData; 