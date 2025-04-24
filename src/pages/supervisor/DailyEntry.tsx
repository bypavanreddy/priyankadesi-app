import React, { useState } from 'react';
import { Calendar, Camera, Package, Clock, Send, Image, Users } from 'lucide-react';
import { Dialog } from '@headlessui/react';

// Feed types enum
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
  hatchingDate: string;
  startDate: string;
  currentBirds: number;
  chickType: string;
  feedStock: number;
  age: number; // in days, calculated from hatchingDate
}

// Dummy batch data for testing
const dummyBatches: Batch[] = [
  {
    id: 'B001',
    batchCode: 'B2024-001',
    farmName: 'RK Farms',
    farmerName: 'Rajesh Kumar',
    hatchingDate: '2024-03-01',
    startDate: '2024-03-01',
    currentBirds: 4950,
    chickType: 'TN Aseel',
    feedStock: 250,
    age: 50, // This would be calculated in a real app
  },
  {
    id: 'B002',
    batchCode: 'B2024-002',
    farmName: 'SP Poultry',
    farmerName: 'Suresh Patel',
    hatchingDate: '2024-03-15',
    startDate: '2024-03-15',
    currentBirds: 2965,
    chickType: 'Indbro Aseel',
    feedStock: 180,
    age: 36, // This would be calculated in a real app
  }
];

interface DailyEntryForm {
  date: string;
  batchId: string;
  mortality: number;
  weakBirds: number;
  legWeakBirds: number;
  feedType: FeedType;
  feedBags: number;
  avgWeight: number;
  image: File | null;
  remarks: string;
}

const DailyEntryForm: React.FC<{
  batch: Batch;
  onSubmit: (formData: DailyEntryForm) => void;
  onClose: () => void;
}> = ({ batch, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<DailyEntryForm>({
    date: new Date().toISOString().split('T')[0],
    batchId: batch.id,
    mortality: 0,
    weakBirds: 0,
    legWeakBirds: 0,
    feedType: FeedType.DESI_STARTER,
    feedBags: 0,
    avgWeight: 0,
    image: null,
    remarks: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'mortality' || name === 'weakBirds' || name === 'legWeakBirds' || name === 'feedBags' || name === 'avgWeight'
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total mortality
    const totalMortality = formData.mortality + formData.weakBirds + formData.legWeakBirds;
    
    console.log('Submitting daily entry:', { ...formData, totalMortality });
    // In a real app, this would be sent to the server
    
    onSubmit(formData);
  };
  
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            Daily Entry - {batch.farmName} (Batch: {batch.batchCode})
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 pb-5">
            <div className="bg-gray-50 p-4 rounded-md mb-4 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-700">
                <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                <span>Hatching Date: {batch.hatchingDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Clock className="h-4 w-4 mr-1 text-purple-600" />
                <span>Bird Age: Day {batch.age}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Users className="h-4 w-4 mr-1 text-purple-600" />
                <span>Current Birds: {batch.currentBirds}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Package className="h-4 w-4 mr-1 text-purple-600" />
                <span>Feed Stock: {batch.feedStock} bags</span>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="entry-date" className="block text-sm font-medium text-gray-700 mb-1">Entry Date</label>
                <input
                  id="entry-date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Mortality Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="mortality" className="block text-sm font-medium text-gray-700 mb-1">Mortality</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="mortality"
                    id="mortality"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                    value={formData.mortality}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="weak-birds" className="block text-sm font-medium text-gray-700 mb-1">Weak Birds</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="weakBirds"
                    id="weakBirds"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                    value={formData.weakBirds}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="leg-weak" className="block text-sm font-medium text-gray-700 mb-1">Leg Weak/Culls</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="legWeakBirds"
                    id="legWeakBirds"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                    value={formData.legWeakBirds}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-700">
                  Total Mortality: {formData.mortality + formData.weakBirds + formData.legWeakBirds} birds
                </p>
              </div>

              <div className="md:col-span-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Photo Upload</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="mb-4">
                    <Camera className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">Upload a photo of the mortality or birds</p>
                  </div>
                  
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span className="flex items-center space-x-2 rounded-md border border-gray-300 px-3 py-2">
                        <Camera className="h-5 w-5 text-gray-400" />
                        <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                      </span>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-md object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Feed Consumption</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="feed-type" className="block text-sm font-medium text-gray-700 mb-1">Feed Type</label>
                <select
                  id="feed-type"
                  name="feedType"
                  value={formData.feedType}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                >
                  {Object.values(FeedType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="feed-bags" className="block text-sm font-medium text-gray-700 mb-1">Feed Bags</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="feedBags"
                    id="feedBags"
                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                    value={formData.feedBags}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-700">
                  Total Weight: {(formData.feedBags * 50).toFixed(1)} kg
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Standard Feed Per Bird: {(formData.feedBags * 50 / (batch.currentBirds || 1)).toFixed(3)} kg
                </p>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-4">Bird Weight</h3>
            <div className="grid grid-cols-1 gap-5">
              {batch.age && batch.age % 7 === 0 ? (
                <div>
                  <label htmlFor="avg-weight" className="block text-sm font-medium text-gray-700 mb-1">Average Weight (g)</label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="number"
                      name="avgWeight"
                      id="avgWeight"
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="0"
                      value={formData.avgWeight}
                      onChange={handleInputChange}
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-3 rounded-md flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm text-gray-700">Weight measurement due on day {Math.ceil((batch.age || 0) / 7) * 7}</p>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150"
                rows={3}
                placeholder="Any observations or notes about the batch condition..."
              ></textarea>
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
                Submit Entry
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
          <p className="text-xs text-gray-500">Type</p>
          <p className="text-sm font-medium">{batch.chickType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Birds</p>
          <p className="text-sm font-medium">{batch.currentBirds}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Batch Start Date</p>
          <p className="text-sm font-medium">{formattedStartDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Age</p>
          <p className="text-sm font-medium">Day {batch.age}</p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <button
          onClick={() => onSelect(batch)}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-md font-medium text-sm hover:bg-purple-700 transition-colors"
        >
          Add Daily Entry
        </button>
      </div>
    </div>
  );
}

function DailyEntry() {
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
          <h2 className="text-2xl font-semibold text-gray-900">Daily Entry</h2>
          <p className="mt-1 text-sm text-gray-500">Record daily updates for your active batches</p>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-800">Active Batches</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyBatches.map(batch => (
          <BatchCard key={batch.id} batch={batch} onSelect={handleBatchSelect} />
        ))}
      </div>
      
      {selectedBatch && (
        <DailyEntryForm 
          batch={selectedBatch} 
          onSubmit={(formData) => {
            console.log('Daily entry submitted:', formData);
            setIsEntryFormOpen(false);
          }}
          onClose={() => setIsEntryFormOpen(false)}
        />
      )}
    </div>
  );
}

export default DailyEntry;