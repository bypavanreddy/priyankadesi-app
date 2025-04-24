import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  BarChart3,
  User
} from 'lucide-react';
import { useAuthStore } from '../store/auth';

const navigationConfig = {
  supervisor: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/supervisor' },
    { name: 'Daily Entry', icon: Calendar, href: '/supervisor/daily-entry' },
    { name: 'Reports', icon: BarChart3, href: '/supervisor/reports' },
    { name: 'Profile', icon: User, href: '/supervisor/profile' },
  ],
  marketing: [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/marketing' },
    { name: 'Sales', icon: Calendar, href: '/marketing/sales' },
    { name: 'Traders', icon: ShoppingBag, href: '/marketing/traders' },
    { name: 'Profile', icon: User, href: '/marketing/profile' },
  ],
} as const;

function MobileNav() {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user || !['supervisor', 'marketing'].includes(user.role)) return null;

  const navigation = navigationConfig[user.role as 'supervisor' | 'marketing'];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <div className="grid h-16 grid-cols-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;