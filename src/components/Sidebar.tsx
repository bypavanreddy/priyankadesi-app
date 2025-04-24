import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut,
  Egg,
  Package,
  ChevronLeft,
  Menu,
  Database,
  UserCog,
  Scale,
  Truck
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import type { UserRole } from '../types/auth';

const navigationConfig = {
  admin: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Farmers', icon: Users, href: '/admin/farmers' },
    { name: 'Traders', icon: ShoppingBag, href: '/admin/traders' },
    { name: 'Batches', icon: Package, href: '/admin/batches' },
    { name: 'Activities', icon: Calendar, href: '/admin/activities' },
    { name: 'Inventory', icon: Scale, href: '/admin/inventory' },
    { name: 'Purchases', icon: Truck, href: '/admin/purchases' },
    { name: 'Reports', icon: BarChart3, href: '/admin/reports' },
    { name: 'Master Data', icon: Database, href: '/admin/master-data' },
    { name: 'User Management', icon: UserCog, href: '/admin/users' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ],
  supervisor: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/supervisor' },
    { name: 'Daily Entry', icon: Calendar, href: '/supervisor/daily-entry' },
    { name: 'Reports', icon: BarChart3, href: '/supervisor/reports' },
  ],
  marketing: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/marketing' },
    { name: 'Traders', icon: ShoppingBag, href: '/marketing/traders' },
    { name: 'Sales Entry', icon: Calendar, href: '/marketing/sales' },
    { name: 'Reports', icon: BarChart3, href: '/marketing/reports' },
  ],
} as const;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) return null;

  const navigation = navigationConfig[user.role as keyof typeof navigationConfig];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex h-16 shrink-0 items-center px-6 justify-between">
        {!isCollapsed && (
          <>
            <Egg className="h-8 w-8 text-purple-600" />
            <span className="ml-3 text-lg font-semibold text-gray-900">Priyanka Foods</span>
          </>
        )}
        {isCollapsed && (
          <Egg className="h-8 w-8 text-purple-600 mx-auto" />
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== '/' + user.role && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon
                className={`${isCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>
      <div className="shrink-0 flex border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="flex items-center w-full">
            <div>
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="mx-auto p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;