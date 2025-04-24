import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Egg, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import type { UserRole } from '../types/auth';

const roleConfig = {
  admin: {
    icon: Users,
    color: 'bg-purple-600 hover:bg-purple-700',
    title: 'Administrator',
    description: 'Full access to all features',
  },
  supervisor: {
    icon: Egg,
    color: 'bg-blue-600 hover:bg-blue-700',
    title: 'Supervisor',
    description: 'Manage daily operations and farm visits',
  },
  marketing: {
    icon: TrendingUp,
    color: 'bg-green-600 hover:bg-green-700',
    title: 'Marketing',
    description: 'Handle sales and trader management',
  },
} as const;

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Egg className="w-12 h-12 text-purple-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Priyanka Desi Foods
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Chick Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {(Object.entries(roleConfig) as [UserRole, typeof roleConfig[keyof typeof roleConfig]][]).map(([role, config]) => (
              <button
                key={role}
                onClick={() => handleLogin(role)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-white ${config.color} transition-colors`}
              >
                <div className="flex items-center">
                  <config.icon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{config.title}</div>
                    <div className="text-sm opacity-90">{config.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Coming soon
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                disabled
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 cursor-not-allowed opacity-60"
              >
                Login with credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;