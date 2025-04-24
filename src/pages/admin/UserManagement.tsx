import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Shield, Users, UserCheck } from 'lucide-react';
import { Dialog } from '@headlessui/react';

enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  SALES = 'salesperson'
}

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  assignedFarms?: string[];
  lastActive: string;
  status: 'active' | 'inactive';
}

// Sample users data
const dummyUsers: User[] = [
  {
    id: '1',
    username: 'johnadmin',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    role: UserRole.ADMIN,
    lastActive: '2024-04-24',
    status: 'active'
  },
  {
    id: '2',
    username: 'sarapsupervisor',
    name: 'Sara Johnson',
    email: 'sara@example.com',
    phone: '+91 98765 43211',
    role: UserRole.SUPERVISOR,
    assignedFarms: ['RK Farms', 'SP Poultry'],
    lastActive: '2024-04-23',
    status: 'active'
  },
  {
    id: '3',
    username: 'mikesales',
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+91 98765 43212',
    role: UserRole.SALES,
    lastActive: '2024-04-20',
    status: 'inactive'
  },
  {
    id: '4',
    username: 'lisasupervisor',
    name: 'Lisa Chen',
    email: 'lisa@example.com',
    phone: '+91 98765 43213',
    role: UserRole.SUPERVISOR,
    assignedFarms: ['VR Farms'],
    lastActive: '2024-04-22',
    status: 'active'
  }
];

function UserForm({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user?: User }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || UserRole.SUPERVISOR,
    status: user?.status || 'active'
  });

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    // In a real app, save user data to backend
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 w-full">
          <Dialog.Title className="text-xl font-medium text-gray-900 mb-6 border-b pb-3">
            {user ? 'Edit User' : 'Add New User'}
          </Dialog.Title>
          
          <form className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 pb-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
              >
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.SUPERVISOR}>Supervisor</option>
                <option value={UserRole.SALES}>Salesperson</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {!user && (
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Password Settings</h3>
                <div className="flex items-center space-x-2">
                  <input
                    id="generate-password"
                    name="password-option"
                    type="radio"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="generate-password" className="block text-sm text-gray-700">Generate random password</label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    id="temp-password"
                    name="password-option"
                    type="radio"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="temp-password" className="block text-sm text-gray-700">Set temporary password:</label>
                </div>
                <input
                  type="password"
                  placeholder="Set temporary password"
                  className="mt-2 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition duration-150 text-sm"
                  disabled
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-5 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow transition-colors duration-150"
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

function UserManagement() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const toggleUserStatus = (userId: string) => {
    // In a real app, update user status in backend
    console.log(`Toggling status for user ${userId}`);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield size={16} className="text-red-500" />;
      case UserRole.SUPERVISOR:
        return <UserCheck size={16} className="text-blue-500" />;
      case UserRole.SALES:
        return <Users size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">User Administration</h2>
          <p className="mt-1 text-sm text-gray-500">Add, edit, and manage user accounts and permissions.</p>
        </div>
        <button
          onClick={() => setIsAddUserOpen(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-auto sm:flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search users..."
          />
        </div>
        
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        >
          <option value="all">All Roles</option>
          <option value={UserRole.ADMIN}>Admins</option>
          <option value={UserRole.SUPERVISOR}>Supervisors</option>
          <option value={UserRole.SALES}>Salespersons</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
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
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRoleIcon(user.role)}
                    <span className="ml-1.5 text-sm text-gray-900 capitalize">{user.role}</span>
                  </div>
                  {user.assignedFarms && (
                    <div className="text-xs text-gray-500 mt-1">
                      Assigned: {user.assignedFarms.join(', ')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.lastActive).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span 
                        className={`${
                          user.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                    <span className="ml-2 text-sm text-gray-900 capitalize">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleEditUser(user)}
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

      {/* Add User Dialog */}
      <UserForm isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} />
      
      {/* Edit User Dialog */}
      {selectedUser && (
        <UserForm 
          isOpen={isEditUserOpen} 
          onClose={() => setIsEditUserOpen(false)} 
          user={selectedUser} 
        />
      )}
    </div>
  );
}

export default UserManagement; 