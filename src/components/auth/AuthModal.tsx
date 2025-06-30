import React, { useState } from 'react';
import { X, User, Mail, Lock, Building, ShoppingBag } from 'lucide-react';
import { UserRole } from '../../App';

interface AuthModalProps {
  type: 'login' | 'register';
  selectedRole: UserRole;
  onLogin: (email: string, password: string, role: UserRole) => void;
  onClose: () => void;
  onSwitchType: (type: 'login' | 'register') => void;
}

export function AuthModal({ type, selectedRole, onLogin, onClose, onSwitchType }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<UserRole>(selectedRole || 'customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  const roleOptions = [
    { 
      value: 'customer', 
      label: 'Customer Portal', 
      description: 'Shop sustainable products and track orders',
      icon: <ShoppingBag className="h-5 w-5" />
    },
    { 
      value: 'team', 
      label: 'Team Portal', 
      description: 'Internal operations and management',
      icon: <Building className="h-5 w-5" />
    },
    { 
      value: 'mitra', 
      label: 'ReForm Mitra Portal', 
      description: 'Waste collection and earnings tracking',
      icon: <User className="h-5 w-5" />
    },
    { 
      value: 'business', 
      label: 'Business Portal', 
      description: 'Corporate sustainability and GreenCredits',
      icon: <Building className="h-5 w-5" />
    },
    { 
      value: 'admin', 
      label: 'Admin Dashboard', 
      description: 'System administration and oversight',
      icon: <Lock className="h-5 w-5" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {type === 'login' ? 'Welcome Back' : 'Join ReForm'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {type === 'login' ? 'Sign in to access your portal' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {type === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {(role === 'business' || role === 'team') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {role === 'business' ? 'Company Name' : 'Department'}
                  </label>
                  <div className="relative">
                    <Building className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder={role === 'business' ? 'Enter company name' : 'Enter department'}
                      required
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Portal Access</label>
            <div className="space-y-3">
              {roleOptions.map((option) => (
                <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="text-gray-600 mr-3">
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{option.label}</p>
                      <p className="text-xs text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm sm:text-base"
          >
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {type === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => onSwitchType(type === 'login' ? 'register' : 'login')}
              className="text-teal-600 hover:text-teal-700 font-medium ml-1"
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}