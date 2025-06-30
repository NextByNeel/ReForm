import React from 'react';
import { Users, Building, Shield, Cog, ShoppingBag } from 'lucide-react';
import { UserRole } from '../App';

interface PortalsProps {
  onPortalAccess: (role: UserRole) => void;
}

export function Portals({ onPortalAccess }: PortalsProps) {
  const portals = [
    {
      icon: <Cog className="h-12 w-12" />,
      title: "Team Portal",
      subtitle: "Internal Operations",
      description: "Comprehensive business management including inventory tracking, order fulfillment, production monitoring, and Mitra coordination",
      role: 'team' as UserRole,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      features: ["Inventory Management", "Order Fulfillment", "Production Dashboard", "Mitra Management"]
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "ReForm Mitra Portal", 
      subtitle: "Collector Empowerment",
      description: "Empowering waste collectors with digital tools for collection logging, earnings tracking, and professional development",
      role: 'mitra' as UserRole,
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      features: ["Collection Logging", "Earnings Tracker", "Drop-off Locator", "Training Resources"]
    },
    {
      icon: <Building className="h-12 w-12" />,
      title: "Business Portal",
      subtitle: "B2B Clients",
      description: "Corporate sustainability dashboard with waste tracking, GreenCredits system, and ESG reporting capabilities",
      role: 'business' as UserRole,
      color: "bg-teal-600",
      hoverColor: "hover:bg-teal-700",
      features: ["Waste Analytics", "GreenCredits System", "ESG Certificates", "Exclusive Products"]
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Admin Dashboard",
      subtitle: "Global Oversight",
      description: "Complete platform management with user oversight, system analytics, content management, and financial controls",
      role: 'admin' as UserRole,
      color: "bg-gray-800",
      hoverColor: "hover:bg-gray-900",
      features: ["User Management", "System Analytics", "Content Management", "Financial Oversight"]
    }
  ];

  return (
    <section id="portals" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Four Interconnected Portals</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive platform serves every stakeholder in the waste-to-resource ecosystem, 
            from individual collectors to corporate clients, with specialized tools and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {portals.map((portal, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`${portal.color} p-6 text-white`}>
                <div className="flex items-center mb-4">
                  <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                    {portal.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{portal.title}</h3>
                    <p className="text-white text-opacity-90 font-medium">{portal.subtitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{portal.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {portal.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full mr-2 ${portal.color.replace('bg-', 'bg-')}`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => onPortalAccess(portal.role)}
                  className={`w-full ${portal.color} ${portal.hoverColor} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  Access Portal
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Portal Section */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 text-center">
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Customer Portal</h3>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Browse and purchase our unique upcycled products through our integrated shopping experience. 
            Track orders, manage your account, and discover the story behind each sustainable product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Shop Products
            </a>
            <button
              onClick={() => onPortalAccess('customer')}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Customer Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}