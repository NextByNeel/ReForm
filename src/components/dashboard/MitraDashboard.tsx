import React, { useState } from 'react';
import { DashboardView } from './Dashboard';
import { Truck, MapPin, Clock, CheckCircle, Calendar, Route, Package, AlertTriangle, TrendingUp, Users, BarChart3, Settings, FileText, DollarSign, Star, Award, Coins, Plus, X, Search, Filter, Eye, Edit } from 'lucide-react';
import { useSharedData } from '../../contexts/SharedDataContext';
import { downloadFile, formatCurrency, formatDate } from '../../utils/downloadUtils';

interface MitraDashboardProps {
  currentView: DashboardView;
}

export function MitraDashboard({ currentView }: MitraDashboardProps) {
  const { 
    collections, 
    businesses, 
    addCollection, 
    updateCollection,
    getCollectionsByMitra 
  } = useSharedData();
  
  // Mock current mitra ID - in real app, this would come from auth context
  const currentMitraId = 'mitra-001';
  const mitraCollections = getCollectionsByMitra(currentMitraId);
  const todaysCollections = mitraCollections.filter(c => c.date === new Date().toISOString().split('T')[0]);
  const completedToday = todaysCollections.filter(c => c.status === 'completed');
  const monthlyEarnings = mitraCollections
    .filter(c => c.date.startsWith('2024-12'))
    .reduce((sum, c) => sum + c.earnings, 0);

  const [showLogModal, setShowLogModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newCollection, setNewCollection] = useState({
    wasteType: 'Electronic Waste',
    weight: 0,
    location: '',
    businessName: '',
    notes: ''
  });

  const handleLogCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const business = businesses.find(b => b.name === newCollection.businessName);
    if (business) {
      const earnings = calculateEarnings(newCollection.wasteType, newCollection.weight);
      addCollection({
        mitraId: currentMitraId,
        mitraName: 'Raj Kumar', // In real app, get from auth context
        businessId: business.id,
        businessName: business.name,
        wasteType: newCollection.wasteType,
        weight: newCollection.weight,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        location: newCollection.location || business.address,
        status: 'completed',
        earnings,
        notes: newCollection.notes
      });
      setShowLogModal(false);
      setNewCollection({
        wasteType: 'Electronic Waste',
        weight: 0,
        location: '',
        businessName: '',
        notes: ''
      });
    }
  };

  const calculateEarnings = (wasteType: string, weight: number) => {
    const rates = {
      'Electronic Waste': 30,
      'Plastic Waste': 10,
      'Paper & Cardboard': 15,
      'Metal Waste': 55,
      'Mixed Waste': 20
    };
    return (rates[wasteType as keyof typeof rates] || 20) * weight;
  };

  const generateMitraPerformanceReport = (): string => {
    let content = `MITRA PERFORMANCE REPORT\n\n`;
    content += `Mitra Name: Raj Kumar\n`;
    content += `Mitra ID: ${currentMitraId}\n`;
    content += `Report Date: ${formatDate(new Date())}\n`;
    content += `Report Period: ${new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}\n\n`;

    content += `MONTHLY SUMMARY:\n`;
    content += `Total Collections: ${mitraCollections.filter(c => c.date.startsWith('2024-12')).length}\n`;
    content += `Total Earnings: ${formatCurrency(monthlyEarnings)}\n`;
    content += `Total Waste Collected: ${mitraCollections.reduce((sum, c) => sum + c.weight, 0)} kg\n`;
    content += `Efficiency Rating: 98%\n`;
    content += `Customer Rating: 4.8/5\n\n`;

    content += `DAILY PERFORMANCE:\n`;
    content += `Today's Collections: ${todaysCollections.length}\n`;
    content += `Completed Today: ${completedToday.length}\n`;
    content += `Today's Earnings: ${formatCurrency(todaysCollections.reduce((sum, c) => sum + c.earnings, 0))}\n\n`;

    content += `COLLECTION BREAKDOWN BY TYPE:\n`;
    const wasteTypes = ['Electronic Waste', 'Plastic Waste', 'Paper & Cardboard', 'Metal Waste', 'Mixed Waste'];
    wasteTypes.forEach(type => {
      const typeCollections = mitraCollections.filter(c => c.wasteType === type);
      const typeWeight = typeCollections.reduce((sum, c) => sum + c.weight, 0);
      const typeEarnings = typeCollections.reduce((sum, c) => sum + c.earnings, 0);
      if (typeWeight > 0) {
        content += `${type}: ${typeCollections.length} collections, ${typeWeight} kg, ${formatCurrency(typeEarnings)}\n`;
      }
    });

    content += `\nRECENT COLLECTIONS:\n`;
    mitraCollections.slice(0, 10).forEach((collection, index) => {
      content += `${index + 1}. ${formatDate(collection.date)} - ${collection.businessName} - ${collection.wasteType} - ${collection.weight} kg - ${formatCurrency(collection.earnings)}\n`;
    });

    content += `\nPERFORMANCE METRICS:\n`;
    content += `Average Collection Weight: ${(mitraCollections.reduce((sum, c) => sum + c.weight, 0) / mitraCollections.length).toFixed(1)} kg\n`;
    content += `Average Earnings per Collection: ${formatCurrency(mitraCollections.reduce((sum, c) => sum + c.earnings, 0) / mitraCollections.length)}\n`;
    content += `Most Collected Waste Type: Electronic Waste\n`;
    content += `Top Business Partner: ${businesses[0]?.name || 'Green Corp Ltd'}\n\n`;

    content += `ACHIEVEMENTS:\n`;
    content += `- Top 5% performer in efficiency rating\n`;
    content += `- Consistent 4.8+ customer rating\n`;
    content += `- ${mitraCollections.length} successful collections completed\n`;
    content += `- ${(mitraCollections.reduce((sum, c) => sum + c.weight, 0) * 0.001).toFixed(2)} tons of CO₂ emissions prevented\n\n`;

    content += `RECOMMENDATIONS:\n`;
    content += `- Continue maintaining high efficiency standards\n`;
    content += `- Focus on electronic waste collections for higher earnings\n`;
    content += `- Explore new business partnerships in your area\n`;
    content += `- Consider upgrading vehicle capacity for larger collections\n\n`;

    return content;
  };

  const handleDownloadReport = () => {
    const reportContent = generateMitraPerformanceReport();
    const filename = `ReForm_Mitra_Performance_Report_${new Date().toISOString().split('T')[0]}.txt`;
    downloadFile(reportContent, filename, 'Mitra Performance Report');
  };

  // Filter collections based on search and status
  const filteredCollections = mitraCollections.filter(collection => {
    const matchesSearch = searchQuery === '' || 
      collection.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || collection.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (currentView === 'overview') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ReForm Mitra Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Your digital companion for waste collection and earnings</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Today's Collections</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{todaysCollections.length}</p>
                <p className="text-xs sm:text-sm text-green-600">{completedToday.length} completed</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Monthly Earnings</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{monthlyEarnings.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-green-600">+15% vs last month</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Efficiency Rating</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">98%</p>
                <p className="text-xs sm:text-sm text-purple-600">Top performer</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Collections</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.length}</p>
                <p className="text-xs sm:text-sm text-teal-600">All time</p>
              </div>
              <div className="bg-teal-100 p-2 sm:p-3 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Collections</h3>
              <button 
                onClick={() => setShowLogModal(true)}
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Log New
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {mitraCollections.slice(0, 4).map((collection, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      collection.status === 'completed' ? 'bg-green-500' :
                      collection.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{collection.businessName}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{collection.wasteType} • {collection.weight} kg</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{collection.date}</p>
                    <p className="text-xs text-green-600">₹{collection.earnings}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Earnings Breakdown</h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { type: 'Electronic Waste', collections: mitraCollections.filter(c => c.wasteType === 'Electronic Waste').length, earnings: mitraCollections.filter(c => c.wasteType === 'Electronic Waste').reduce((sum, c) => sum + c.earnings, 0) },
                { type: 'Plastic Waste', collections: mitraCollections.filter(c => c.wasteType === 'Plastic Waste').length, earnings: mitraCollections.filter(c => c.wasteType === 'Plastic Waste').reduce((sum, c) => sum + c.earnings, 0) },
                { type: 'Paper & Cardboard', collections: mitraCollections.filter(c => c.wasteType === 'Paper & Cardboard').length, earnings: mitraCollections.filter(c => c.wasteType === 'Paper & Cardboard').reduce((sum, c) => sum + c.earnings, 0) },
                { type: 'Metal Waste', collections: mitraCollections.filter(c => c.wasteType === 'Metal Waste').length, earnings: mitraCollections.filter(c => c.wasteType === 'Metal Waste').reduce((sum, c) => sum + c.earnings, 0) }
              ].map((earning, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{earning.type}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{earning.collections} collections</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">₹{earning.earnings.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Log Collection Modal */}
        {showLogModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Log New Collection</h2>
                <button
                  onClick={() => setShowLogModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleLogCollection} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <select
                    required
                    value={newCollection.businessName}
                    onChange={(e) => setNewCollection({...newCollection, businessName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Business</option>
                    {businesses.map(business => (
                      <option key={business.id} value={business.name}>{business.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type *</label>
                  <select
                    required
                    value={newCollection.wasteType}
                    onChange={(e) => setNewCollection({...newCollection, wasteType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Electronic Waste">Electronic Waste</option>
                    <option value="Plastic Waste">Plastic Waste</option>
                    <option value="Paper & Cardboard">Paper & Cardboard</option>
                    <option value="Metal Waste">Metal Waste</option>
                    <option value="Mixed Waste">Mixed Waste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={newCollection.weight}
                    onChange={(e) => setNewCollection({...newCollection, weight: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                  <input
                    type="text"
                    value={newCollection.location}
                    onChange={(e) => setNewCollection({...newCollection, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Specific location if different"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={newCollection.notes}
                    onChange={(e) => setNewCollection({...newCollection, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional notes about the collection"
                  />
                </div>

                {newCollection.weight > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      Estimated Earnings: <span className="font-semibold">₹{calculateEarnings(newCollection.wasteType, newCollection.weight)}</span>
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Log Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'collections') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Collection Logging</h1>
            <p className="text-gray-600 text-sm sm:text-base">Track and manage your waste collection activities</p>
          </div>
          <button 
            onClick={() => setShowLogModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log New Collection
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Collections</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.length}</p>
                <p className="text-xs sm:text-sm text-blue-600">All time</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">This Month</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.filter(c => c.date.startsWith('2024-12')).length}</p>
                <p className="text-xs sm:text-sm text-green-600">+8% growth</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.filter(c => c.status === 'completed').length}</p>
                <p className="text-xs sm:text-sm text-purple-600">Success rate: 96%</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Weight</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.reduce((sum, c) => sum + c.weight, 0)} kg</p>
                <p className="text-xs sm:text-sm text-teal-600">Waste collected</p>
              </div>
              <div className="bg-teal-100 p-2 sm:p-3 rounded-lg">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="scheduled">Scheduled</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredCollections.length} of {mitraCollections.length} collections
            </div>
          </div>
        </div>

        {/* Collections List */}
        {filteredCollections.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCollections.map((collection, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatDate(collection.date)}</div>
                        <div className="text-sm text-gray-500">{collection.time}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{collection.businessName}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{collection.location}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {collection.wasteType}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {collection.weight} kg
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          collection.status === 'completed' ? 'bg-green-100 text-green-800' :
                          collection.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          collection.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {collection.status.charAt(0).toUpperCase() + collection.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{collection.earnings.toLocaleString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No collections found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start logging your waste collections to track your progress'
              }
            </p>
            {(!searchQuery && statusFilter === 'all') && (
              <button 
                onClick={() => setShowLogModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Log Your First Collection
              </button>
            )}
          </div>
        )}

        {/* Log Collection Modal */}
        {showLogModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Log New Collection</h2>
                <button
                  onClick={() => setShowLogModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleLogCollection} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <select
                    required
                    value={newCollection.businessName}
                    onChange={(e) => setNewCollection({...newCollection, businessName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Business</option>
                    {businesses.map(business => (
                      <option key={business.id} value={business.name}>{business.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type *</label>
                  <select
                    required
                    value={newCollection.wasteType}
                    onChange={(e) => setNewCollection({...newCollection, wasteType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Electronic Waste">Electronic Waste</option>
                    <option value="Plastic Waste">Plastic Waste</option>
                    <option value="Paper & Cardboard">Paper & Cardboard</option>
                    <option value="Metal Waste">Metal Waste</option>
                    <option value="Mixed Waste">Mixed Waste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={newCollection.weight}
                    onChange={(e) => setNewCollection({...newCollection, weight: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                  <input
                    type="text"
                    value={newCollection.location}
                    onChange={(e) => setNewCollection({...newCollection, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Specific location if different"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={newCollection.notes}
                    onChange={(e) => setNewCollection({...newCollection, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional notes about the collection"
                  />
                </div>

                {newCollection.weight > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      Estimated Earnings: <span className="font-semibold">₹{calculateEarnings(newCollection.wasteType, newCollection.weight)}</span>
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Log Collection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'analytics') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Earnings Tracker</h1>
            <p className="text-gray-600 text-sm sm:text-base">Track your earnings and performance metrics</p>
          </div>
          <button 
            onClick={handleDownloadReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-sm sm:text-base"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Monthly Earnings</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{monthlyEarnings.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-green-600">+15% vs last month</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Collections This Month</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.filter(c => c.date.startsWith('2024-12')).length}</p>
                <p className="text-xs sm:text-sm text-blue-600">+8% growth</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Efficiency Rating</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">98%</p>
                <p className="text-xs sm:text-sm text-purple-600">Top 5% performer</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Waste Processed</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{mitraCollections.reduce((sum, c) => sum + c.weight, 0)} kg</p>
                <p className="text-xs sm:text-sm text-teal-600">Total collected</p>
              </div>
              <div className="bg-teal-100 p-2 sm:p-3 rounded-lg">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Weekly Earnings</h3>
            <div className="space-y-4">
              {[
                { week: 'Week 1', collections: 8, earnings: 2400, efficiency: '96%' },
                { week: 'Week 2', collections: 12, earnings: 3600, efficiency: '98%' },
                { week: 'Week 3', collections: 10, earnings: 3000, efficiency: '94%' },
                { week: 'Week 4', collections: 15, earnings: 4500, efficiency: '99%' }
              ].map((week, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{week.week}</p>
                    <p className="text-sm text-gray-600">{week.collections} collections</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{week.earnings.toLocaleString()}</p>
                    <p className="text-sm text-green-600">{week.efficiency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Collection Types Performance</h3>
            <div className="space-y-4">
              {[
                { type: 'Electronic Waste', count: mitraCollections.filter(c => c.wasteType === 'Electronic Waste').length, earnings: mitraCollections.filter(c => c.wasteType === 'Electronic Waste').reduce((sum, c) => sum + c.earnings, 0), rate: '₹30/kg' },
                { type: 'Metal Waste', count: mitraCollections.filter(c => c.wasteType === 'Metal Waste').length, earnings: mitraCollections.filter(c => c.wasteType === 'Metal Waste').reduce((sum, c) => sum + c.earnings, 0), rate: '₹55/kg' },
                { type: 'Paper & Cardboard', count: mitraCollections.filter(c => c.wasteType === 'Paper & Cardboard').length, earnings: mitraCollections.filter(c => c.wasteType === 'Paper & Cardboard').reduce((sum, c) => sum + c.earnings, 0), rate: '₹15/kg' },
                { type: 'Plastic Waste', count: mitraCollections.filter(c => c.wasteType === 'Plastic Waste').length, earnings: mitraCollections.filter(c => c.wasteType === 'Plastic Waste').reduce((sum, c) => sum + c.earnings, 0), rate: '₹10/kg' }
              ].map((type, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{type.type}</p>
                    <p className="text-sm text-gray-600">{type.count} collections • {type.rate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{type.earnings.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'certifications') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Drop-off Locator</h1>
          <p className="text-gray-600 text-sm sm:text-base">Find nearby waste drop-off points and collection centers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Search Drop-off Points</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base">
                  <option value="">All Waste Types</option>
                  <option value="electronic">Electronic Waste</option>
                  <option value="plastic">Plastic Waste</option>
                  <option value="paper">Paper & Cardboard</option>
                  <option value="metal">Metal Waste</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map would be displayed here</p>
                <p className="text-sm text-gray-500">Showing nearby drop-off locations</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Nearby Locations</h3>
              <div className="space-y-4">
                {[
                  { name: 'Green Corp Ltd', distance: '0.8 km', types: ['Electronic', 'Metal'], rating: 4.8 },
                  { name: 'EcoTech Solutions', distance: '1.2 km', types: ['Plastic', 'Paper'], rating: 4.6 },
                  { name: 'Sustainable Industries', distance: '2.1 km', types: ['All Types'], rating: 4.9 },
                  { name: 'Clean Energy Co', distance: '2.8 km', types: ['Electronic', 'Metal'], rating: 4.7 }
                ].map((location, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{location.name}</h4>
                      <span className="text-sm text-gray-600">{location.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {location.types.map((type, idx) => (
                          <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {type}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{location.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Call ahead to confirm acceptance of your waste type</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Separate different waste types before drop-off</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Bring proper identification for verification</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Check operating hours before visiting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'settings') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Training & Resources</h1>
          <p className="text-gray-600 text-sm sm:text-base">Enhance your skills and knowledge with our training materials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Training Modules</h3>
            <div className="space-y-4">
              {[
                { title: 'Waste Identification & Sorting', progress: 100, duration: '45 min', status: 'completed' },
                { title: 'Safety Protocols & Equipment', progress: 80, duration: '30 min', status: 'in-progress' },
                { title: 'Customer Service Excellence', progress: 60, duration: '25 min', status: 'in-progress' },
                { title: 'Digital Tools & App Usage', progress: 0, duration: '20 min', status: 'not-started' }
              ].map((module, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <span className="text-sm text-gray-600">{module.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{module.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      module.status === 'completed' ? 'bg-green-100 text-green-700' :
                      module.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {module.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                      {module.status === 'completed' ? 'Review' : 'Continue'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <div className="space-y-3">
                {[
                  { title: 'Waste Type Guide', type: 'PDF', size: '2.1 MB' },
                  { title: 'Safety Checklist', type: 'PDF', size: '1.5 MB' },
                  { title: 'Collection Best Practices', type: 'Video', size: '15 min' },
                  { title: 'Emergency Contacts', type: 'PDF', size: '0.8 MB' }
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{resource.title}</p>
                      <p className="text-sm text-gray-600">{resource.type} • {resource.size}</p>
                    </div>
                    <button className="text-green-600 hover:text-green-700">
                      <FileText className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-3">
                {[
                  { title: 'Safety Champion', description: 'Completed all safety training modules', earned: true },
                  { title: 'Efficiency Expert', description: 'Maintained 95%+ efficiency for 3 months', earned: true },
                  { title: 'Customer Favorite', description: 'Received 4.8+ rating from customers', earned: true },
                  { title: 'Waste Wizard', description: 'Correctly identified 100+ waste types', earned: false }
                ].map((achievement, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${
                    achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      achievement.earned ? 'bg-green-600' : 'bg-gray-400'
                    }`}>
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-700'}`}>
                        {achievement.title}
                      </p>
                      <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-600'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Keep other views as they were...
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">ReForm Mitra {currentView}</h2>
      <p className="text-gray-600 text-sm sm:text-base">This section is under development.</p>
    </div>
  );
}