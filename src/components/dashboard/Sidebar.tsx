import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Award, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Coins,
  Users,
  MapPin,
  FileText,
  Building,
  Cog,
  ShoppingBag
} from 'lucide-react';
import { User as UserType } from '../../App';
import { DashboardView } from './Dashboard';

interface SidebarProps {
  user: UserType;
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onLogout: () => void;
}

export function Sidebar({ user, currentView, onViewChange, onLogout }: SidebarProps) {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'overview' as DashboardView, icon: LayoutDashboard, label: 'Overview' }
    ];

    switch (user.role) {
      case 'customer':
        return [
          ...baseItems,
          { id: 'orders' as DashboardView, icon: ShoppingCart, label: 'My Orders' },
          { id: 'settings' as DashboardView, icon: Settings, label: 'Settings' }
        ];
      case 'team':
        return [
          ...baseItems,
          { id: 'orders' as DashboardView, icon: ShoppingCart, label: 'Order Fulfillment' },
          { id: 'products' as DashboardView, icon: Package, label: 'Inventory Management' },
          { id: 'collections' as DashboardView, icon: Truck, label: 'Mitra Management' },
          { id: 'analytics' as DashboardView, icon: BarChart3, label: 'Production Dashboard' },
          { id: 'settings' as DashboardView, icon: Settings, label: 'Settings' }
        ];
      case 'mitra':
        return [
          ...baseItems,
          { id: 'collections' as DashboardView, icon: Truck, label: 'Collection Logging' },
          { id: 'analytics' as DashboardView, icon: Coins, label: 'Earnings Tracker' },
          { id: 'certifications' as DashboardView, icon: MapPin, label: 'Drop-off Locator' },
          { id: 'settings' as DashboardView, icon: Settings, label: 'Training & Resources' }
        ];
      case 'business':
        return [
          ...baseItems,
          { id: 'collections' as DashboardView, icon: BarChart3, label: 'Waste Analytics' },
          { id: 'certifications' as DashboardView, icon: Award, label: 'ESG Certificates' },
          { id: 'orders' as DashboardView, icon: ShoppingCart, label: 'Exclusive Products' },
          { id: 'settings' as DashboardView, icon: Settings, label: 'Settings' }
        ];
      case 'admin':
        return [
          ...baseItems,
          { id: 'orders' as DashboardView, icon: ShoppingCart, label: 'All Orders' },
          { id: 'collections' as DashboardView, icon: Truck, label: 'Collections' },
          { id: 'products' as DashboardView, icon: Package, label: 'Products' },
          { id: 'analytics' as DashboardView, icon: BarChart3, label: 'System Analytics' },
          { id: 'certifications' as DashboardView, icon: Users, label: 'User Management' },
          { id: 'settings' as DashboardView, icon: Settings, label: 'Settings' }
        ];
      default:
        return baseItems;
    }
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'customer':
        return 'Customer';
      case 'team':
        return 'Team Member';
      case 'mitra':
        return 'ReForm Mitra';
      case 'business':
        return 'Business Client';
      case 'admin':
        return 'Administrator';
      default:
        return role;
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'customer':
        return <ShoppingBag className="h-4 w-4 lg:h-6 lg:w-6 text-purple-600" />;
      case 'team':
        return <Cog className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />;
      case 'mitra':
        return <Users className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />;
      case 'business':
        return <Building className="h-4 w-4 lg:h-6 lg:w-6 text-teal-600" />;
      case 'admin':
        return <User className="h-4 w-4 lg:h-6 lg:w-6 text-gray-600" />;
      default:
        return <User className="h-4 w-4 lg:h-6 lg:w-6 text-gray-600" />;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-full lg:w-64 bg-white shadow-lg flex flex-col">
      <div className="p-4 lg:p-6 border-b">
        <div className="flex items-center">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex items-center justify-center">
            {getRoleIcon(user.role)}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{user.name}</h3>
            <p className="text-xs lg:text-sm text-gray-500">{getRoleDisplayName(user.role)}</p>
            {user.company && (
              <p className="text-xs text-gray-400">{user.company}</p>
            )}
          </div>
        </div>
        {user.credits && (
          <div className="mt-3 lg:mt-4 p-2 lg:p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Coins className="h-4 w-4 lg:h-5 lg:w-5 text-green-600 mr-2" />
              <span className="text-xs lg:text-sm font-medium text-green-700">{user.credits} GreenCredits</span>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 p-2 lg:p-4 overflow-y-auto">
        <ul className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center px-3 lg:px-4 py-2 lg:py-3 text-left rounded-lg transition-colors text-sm lg:text-base ${
                    isActive
                      ? 'bg-teal-100 text-teal-700 border-r-2 border-teal-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-2 lg:p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-3 lg:px-4 py-2 lg:py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm lg:text-base"
        >
          <LogOut className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}