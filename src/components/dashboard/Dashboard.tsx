import React, { useState } from 'react';
import { User } from '../../App';
import { Sidebar } from './Sidebar';
import { TeamDashboard } from './TeamDashboard';
import { MitraDashboard } from './MitraDashboard';
import { BusinessDashboard } from './BusinessDashboard';
import { AdminDashboard } from './AdminDashboard';
import { CustomerDashboard } from './CustomerDashboard';
import { Menu, X } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export type DashboardView = 'overview' | 'orders' | 'collections' | 'certifications' | 'products' | 'analytics' | 'settings';

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderDashboard = () => {
    switch (user.role) {
      case 'customer':
        return <CustomerDashboard currentView={currentView} user={user} />;
      case 'team':
        return <TeamDashboard currentView={currentView} />;
      case 'mitra':
        return <MitraDashboard currentView={currentView} />;
      case 'business':
        return <BusinessDashboard currentView={currentView} user={user} />;
      case 'admin':
        return <AdminDashboard currentView={currentView} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          user={user}
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            setSidebarOpen(false);
          }}
          onLogout={onLogout}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {renderDashboard()}
      </main>
    </div>
  );
}