import React, { useState } from 'react';
import { User, MapPin, Phone, Search, ChevronRight, IndianRupee, Package } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  contact: string;
  location: string;
  totalBirds: number;
  totalAmount: number;
  lastTransaction: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  date: string;
  birds: number;
  amount: number;
  avgWeight: number;
  pricePerKg: number;
}

const dummyTraders: Trader[] = [
  {
    id: 'T001',
    name: 'Mohammed Ali',
    contact: '+91 98765 43210',
    location: 'Bangalore',
    totalBirds: 12500,
    totalAmount: 2500000,
    lastTransaction: '2024-04-15',
    transactions: [
      {
        id: 'TR001',
        date: '2024-04-15',
        birds: 500,
        amount: 100000,
        avgWeight: 2500,
        pricePerKg: 80,
      },
      {
        id: 'TR002',
        date: '2024-04-01',
        birds: 600,
        amount: 120000,
        avgWeight: 2400,
        pricePerKg: 83,
      },
    ],
  },
  {
    id: 'T002',
    name: 'Ramesh Shah',
    contact: '+91 98765 43211',
    location: 'Mysore',
    totalBirds: 8500,
    totalAmount: 1700000,
    lastTransaction: '2024-04-10',
    transactions: [
      {
        id: 'TR003',
        date: '2024-04-10',
        birds: 400,
        amount: 80000,
        avgWeight: 2300,
        pricePerKg: 87,
      },
      {
        id: 'TR004',
        date: '2024-03-25',
        birds: 450,
        amount: 90000,
        avgWeight: 2350,
        pricePerKg: 85,
      },
    ],
  },
];

function Traders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);

  const filteredTraders = dummyTraders.filter(trader =>
    trader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trader.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Traders Management</h2>
        <p className="mt-1 text-sm text-gray-500">View and manage trader information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search traders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            <div className="space-y-2">
              {filteredTraders.map(trader => (
                <div
                  key={trader.id}
                  onClick={() => setSelectedTrader(trader)}
                  className={`p-3 rounded-md cursor-pointer ${
                    selectedTrader?.id === trader.id
                      ? 'bg-purple-50 border border-purple-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{trader.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{trader.location}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedTrader ? (
            <div className="bg-white shadow rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedTrader.name}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-1" />
                    <span>{selectedTrader.contact}</span>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                  Edit Trader
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-purple-700">Total Birds</p>
                      <p className="text-lg font-semibold text-purple-900">
                        {selectedTrader.totalBirds.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Amount</p>
                      <p className="text-lg font-semibold text-blue-900">
                        ₹{selectedTrader.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Last Transaction</p>
                      <p className="text-lg font-semibold text-green-900">
                        {selectedTrader.lastTransaction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h4>
                <div className="space-y-4">
                  {selectedTrader.transactions.map(transaction => (
                    <div key={transaction.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.birds.toLocaleString()} birds
                          </p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ₹{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.avgWeight}g avg • ₹{transaction.pricePerKg}/kg
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">Select a trader to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Traders; 