import React, { useState } from 'react';
import { Package, Pill, Truck, IndianRupee, Plus, Search } from 'lucide-react';

interface Purchase {
  id: string;
  date: string;
  type: 'feed' | 'medicine';
  itemName: string;
  supplier: string;
  quantity: number;
  unit: string;
  amount: number;
  purchasedBy: string;
  farm?: string;
  batch?: string;
}

const dummyPurchases: Purchase[] = [
  {
    id: '1',
    date: '2024-03-05',
    type: 'feed',
    itemName: 'Desi Starter',
    supplier: 'Feed Supplier Co.',
    quantity: 100,
    unit: 'bags',
    amount: 180000,
    purchasedBy: 'John Doe',
    farm: 'RK Farms',
    batch: 'B001'
  },
  {
    id: '2',
    date: '2024-03-20',
    type: 'feed',
    itemName: 'Desi Grower',
    supplier: 'Feed Supplier Co.',
    quantity: 150,
    unit: 'bags',
    amount: 262500,
    purchasedBy: 'John Doe',
    farm: 'RK Farms',
    batch: 'B001'
  },
  {
    id: '3',
    date: '2024-03-10',
    type: 'medicine',
    itemName: 'Vitamin Supplement',
    supplier: 'MediVet',
    quantity: 10,
    unit: 'bottles',
    amount: 5000,
    purchasedBy: 'John Doe',
    farm: 'RK Farms',
    batch: 'B001'
  },
  {
    id: '4',
    date: '2024-03-25',
    type: 'medicine',
    itemName: 'Antibiotic',
    supplier: 'PharmaVet',
    quantity: 5,
    unit: 'packs',
    amount: 7500,
    purchasedBy: 'Jane Smith',
    farm: 'RK Farms',
    batch: 'B001'
  }
];

function Purchases() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'feed' | 'medicine'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const feedPurchases = dummyPurchases.filter(purchase => purchase.type === 'feed');
  const medicinePurchases = dummyPurchases.filter(purchase => purchase.type === 'medicine');
  
  const totalFeedPurchases = feedPurchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  const totalMedicinePurchases = medicinePurchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  const totalPurchasesAmount = totalFeedPurchases + totalMedicinePurchases;

  const filteredPurchases = dummyPurchases.filter(purchase => {
    // Filter by type
    if (activeFilter !== 'all' && purchase.type !== activeFilter) return false;
    
    // Filter by search term
    if (searchTerm && !purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Purchases</h2>
          <p className="mt-1 text-sm text-gray-500">Manage feed and medicine purchases across all farms.</p>
        </div>
        <button
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Purchase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-indigo-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-indigo-700">Total Purchases</p>
              <p className="text-lg font-semibold text-indigo-900">
                ₹{totalPurchasesAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-700">Feed Purchases</p>
              <p className="text-lg font-semibold text-blue-900">
                ₹{totalFeedPurchases.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Pill className="h-5 w-5 text-purple-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-purple-700">Medicine Purchases</p>
              <p className="text-lg font-semibold text-purple-900">
                ₹{totalMedicinePurchases.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="flex mb-4 sm:mb-0 border-b pb-2">
              <button 
                className={`mr-4 pb-2 ${activeFilter === 'all' ? 'text-purple-600 font-medium border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveFilter('all')}
              >
                All Purchases
              </button>
              <button 
                className={`mr-4 pb-2 ${activeFilter === 'feed' ? 'text-purple-600 font-medium border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveFilter('feed')}
              >
                Feed
              </button>
              <button 
                className={`pb-2 ${activeFilter === 'medicine' ? 'text-purple-600 font-medium border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveFilter('medicine')}
              >
                Medicine
              </button>
            </div>
            
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Search purchases..."
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farm/Batch
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.quantity} {purchase.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{purchase.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {purchase.farm} {purchase.batch && `/ ${purchase.batch}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        purchase.type === 'feed' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {purchase.type === 'feed' ? 'Feed' : 'Medicine'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      <button className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchases;