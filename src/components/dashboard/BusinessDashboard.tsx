import React, { useState } from 'react';
import { DashboardView } from './Dashboard';
import { User } from '../../App';
import { Award, TrendingUp, Truck, Calendar, Package, Star, ArrowRight, Coins, Download, Eye, CheckCircle, Clock, Settings, FileText, DollarSign, BarChart3, Plus, Leaf, X } from 'lucide-react';
import { useOrders } from '../../contexts/OrderContext';
import { useSharedData } from '../../contexts/SharedDataContext';
import { downloadFile, formatCurrency, formatDate } from '../../utils/downloadUtils';

interface BusinessDashboardProps {
  currentView: DashboardView;
  user: User;
}

export function BusinessDashboard({ currentView, user }: BusinessDashboardProps) {
  const { getOrdersByUser } = useOrders();
  const { 
    wasteContributions, 
    collections, 
    addWasteContribution,
    getContributionsByBusiness,
    getCollectionsByBusiness 
  } = useSharedData();
  
  const userOrders = getOrdersByUser(user.email);
  
  // Mock business ID - in real app, this would come from auth context
  const businessId = 'business-001';
  const businessContributions = getContributionsByBusiness(businessId);
  const businessCollections = getCollectionsByBusiness(businessId);
  
  const [showContributionModal, setShowContributionModal] = useState(false);
  const [newContribution, setNewContribution] = useState({
    wasteType: 'Electronic Waste',
    weight: 0,
    notes: ''
  });

  const totalWasteContributed = businessContributions.reduce((sum, c) => sum + c.weight, 0);
  const totalCreditsEarned = businessContributions.reduce((sum, c) => sum + c.creditsEarned, 0);
  const totalCo2Saved = businessContributions.reduce((sum, c) => sum + c.co2Impact, 0);

  const handleAddContribution = (e: React.FormEvent) => {
    e.preventDefault();
    const creditsEarned = calculateCredits(newContribution.wasteType, newContribution.weight);
    const co2Impact = calculateCo2Impact(newContribution.weight);
    
    addWasteContribution({
      businessId,
      businessName: user.company || 'Green Corp Ltd',
      wasteType: newContribution.wasteType,
      weight: newContribution.weight,
      date: new Date().toISOString().split('T')[0],
      creditsEarned,
      co2Impact,
      status: 'pending'
    });
    
    setShowContributionModal(false);
    setNewContribution({
      wasteType: 'Electronic Waste',
      weight: 0,
      notes: ''
    });
  };

  const calculateCredits = (wasteType: string, weight: number) => {
    const rates = {
      'Electronic Waste': 4,
      'Plastic Waste': 2,
      'Paper & Cardboard': 1,
      'Metal Waste': 3,
      'Mixed Waste': 2
    };
    return Math.floor((rates[wasteType as keyof typeof rates] || 2) * weight);
  };

  const calculateCo2Impact = (weight: number) => {
    return Number((weight * 0.001).toFixed(3)); // 1kg = 0.001 tons CO2 saved
  };

  const generateCertificateContent = (cert: any): string => {
    let content = `SUSTAINABILITY CERTIFICATE\n\n`;
    content += `Certificate Type: ${cert.type}\n`;
    content += `Certificate ID: ${cert.certificateId}\n`;
    content += `Issued Date: ${formatDate(cert.issuedDate)}\n`;
    content += `Valid Until: ${formatDate(cert.validUntil)}\n`;
    content += `Status: ${cert.status}\n\n`;

    content += `BUSINESS INFORMATION:\n`;
    content += `Company Name: ${user.company || 'Green Corp Ltd'}\n`;
    content += `Contact Person: ${user.name}\n`;
    content += `Email: ${user.email}\n\n`;

    content += `ENVIRONMENTAL IMPACT:\n`;
    content += `Waste Processed: ${cert.wasteAmount}\n`;
    content += `CO₂ Saved: ${cert.co2Saved}\n`;
    content += `Environmental Benefit: Significant reduction in landfill waste\n\n`;

    content += `CERTIFICATION DETAILS:\n`;
    content += `This certificate confirms that the above-mentioned organization has\n`;
    content += `successfully participated in ReForm's waste management program and\n`;
    content += `has made significant contributions to environmental sustainability.\n\n`;

    content += `The waste processing activities covered under this certificate\n`;
    content += `comply with all applicable environmental regulations and standards.\n\n`;

    content += `VERIFICATION:\n`;
    content += `This certificate has been verified by ReForm's quality assurance team\n`;
    content += `and meets all requirements for environmental compliance reporting.\n\n`;

    content += `For verification of this certificate, please contact:\n`;
    content += `Email: certificates@reform.dev\n`;
    content += `Phone: +91 (555) 123-4567\n\n`;

    return content;
  };

  const generateBusinessSummaryReport = (): string => {
    let content = `BUSINESS SUSTAINABILITY SUMMARY REPORT\n\n`;
    content += `Business Name: ${user.company || 'Green Corp Ltd'}\n`;
    content += `Contact Person: ${user.name}\n`;
    content += `Email: ${user.email}\n`;
    content += `Report Date: ${formatDate(new Date())}\n\n`;

    content += `WASTE CONTRIBUTION SUMMARY:\n`;
    content += `Total Waste Contributed: ${totalWasteContributed} kg\n`;
    content += `Total GreenCredits Earned: ${totalCreditsEarned}\n`;
    content += `Total CO₂ Saved: ${totalCo2Saved.toFixed(3)} tons\n`;
    content += `Number of Contributions: ${businessContributions.length}\n\n`;

    content += `WASTE BREAKDOWN BY TYPE:\n`;
    const wasteTypes = ['Electronic Waste', 'Plastic Waste', 'Paper & Cardboard', 'Metal Waste', 'Mixed Waste'];
    wasteTypes.forEach(type => {
      const typeContributions = businessContributions.filter(c => c.wasteType === type);
      const typeWeight = typeContributions.reduce((sum, c) => sum + c.weight, 0);
      const typeCredits = typeContributions.reduce((sum, c) => sum + c.creditsEarned, 0);
      if (typeWeight > 0) {
        content += `${type}: ${typeWeight} kg (${typeCredits} credits)\n`;
      }
    });

    content += `\nCOLLECTION HISTORY:\n`;
    content += `Total Collections Scheduled: ${businessCollections.length}\n`;
    content += `Completed Collections: ${businessCollections.filter(c => c.status === 'completed').length}\n`;
    content += `Pending Collections: ${businessCollections.filter(c => c.status === 'scheduled').length}\n\n`;

    content += `RECENT CONTRIBUTIONS:\n`;
    businessContributions.slice(0, 10).forEach((contribution, index) => {
      content += `${index + 1}. ${formatDate(contribution.date)} - ${contribution.wasteType} - ${contribution.weight} kg - ${contribution.creditsEarned} credits\n`;
    });

    content += `\nENVIRONMENTAL IMPACT:\n`;
    content += `By participating in ReForm's waste management program, your business has:\n`;
    content += `- Diverted ${totalWasteContributed} kg of waste from landfills\n`;
    content += `- Saved ${totalCo2Saved.toFixed(3)} tons of CO₂ emissions\n`;
    content += `- Earned ${totalCreditsEarned} GreenCredits for sustainable practices\n`;
    content += `- Contributed to the circular economy through responsible waste management\n\n`;

    content += `RECOMMENDATIONS:\n`;
    content += `- Continue regular waste segregation and contribution\n`;
    content += `- Consider increasing electronic waste recycling\n`;
    content += `- Explore opportunities for waste reduction at source\n`;
    content += `- Share sustainability achievements with stakeholders\n\n`;

    return content;
  };

  const handleDownloadCertificate = (cert: any) => {
    const certificateContent = generateCertificateContent(cert);
    const filename = `ReForm_Certificate_${cert.certificateId}.txt`;
    downloadFile(certificateContent, filename, 'Sustainability Certificate');
  };

  const handleDownloadBusinessReport = () => {
    const reportContent = generateBusinessSummaryReport();
    const filename = `ReForm_Business_Summary_${user.company?.replace(/\s+/g, '_') || 'Business'}_${new Date().toISOString().split('T')[0]}.txt`;
    downloadFile(reportContent, filename, 'Business Sustainability Summary Report');
  };

  if (currentView === 'overview') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 text-sm sm:text-base">Track your sustainability impact and manage your GreenCredits</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">GreenCredits</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{user.credits}</p>
                <p className="text-xs sm:text-sm text-teal-600">Available balance</p>
              </div>
              <div className="bg-teal-100 p-2 sm:p-3 rounded-lg">
                <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Waste Contributed</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalWasteContributed} kg</p>
                <p className="text-xs sm:text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">CO₂ Saved</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalCo2Saved.toFixed(1)} tons</p>
                <p className="text-xs sm:text-sm text-blue-600">Environmental impact</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Next Collection</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">Dec 28</p>
                <p className="text-xs sm:text-sm text-orange-600">In 3 days</p>
              </div>
              <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Waste Contributions</h3>
              <button 
                onClick={() => setShowContributionModal(true)}
                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Add Contribution
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {businessContributions.slice(0, 3).map((contribution, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{contribution.wasteType}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{contribution.date} • {contribution.weight} kg</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contribution.status === 'verified' ? 'bg-green-100 text-green-700' :
                      contribution.status === 'processed' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {contribution.status}
                    </span>
                    <p className="text-xs sm:text-sm text-teal-600 mt-1">+{contribution.creditsEarned} credits</p>
                  </div>
                </div>
              ))}
              {businessContributions.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No contributions yet</p>
                  <p className="text-sm text-gray-500">Start contributing waste to earn GreenCredits</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Scheduled Collections</h3>
            <div className="space-y-3 sm:space-y-4">
              {businessCollections.filter(c => c.status === 'scheduled').map((collection, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{collection.wasteType}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{collection.date} at {collection.time}</p>
                      <p className="text-xs text-gray-500">Collector: {collection.mitraName}</p>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{collection.weight} kg</p>
                  </div>
                </div>
              ))}
              {businessCollections.filter(c => c.status === 'scheduled').length === 0 && (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No scheduled collections</p>
                  <p className="text-sm text-gray-500">Schedule a pickup when you have waste ready</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Contribution Modal */}
        {showContributionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add Waste Contribution</h2>
                <button
                  onClick={() => setShowContributionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddContribution} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type *</label>
                  <select
                    required
                    value={newContribution.wasteType}
                    onChange={(e) => setNewContribution({...newContribution, wasteType: e.target.value})}
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
                    value={newContribution.weight}
                    onChange={(e) => setNewContribution({...newContribution, weight: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={newContribution.notes}
                    onChange={(e) => setNewContribution({...newContribution, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional details about the waste"
                  />
                </div>

                {newContribution.weight > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      You'll earn: <span className="font-semibold">{calculateCredits(newContribution.wasteType, newContribution.weight)} GreenCredits</span>
                    </p>
                    <p className="text-sm text-green-700">
                      CO₂ Impact: <span className="font-semibold">{calculateCo2Impact(newContribution.weight)} tons saved</span>
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContributionModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add Contribution
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'certifications') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sustainability Certifications</h1>
          <p className="text-gray-600 text-sm sm:text-base">View and download your environmental compliance certificates</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[
            { 
              type: 'EPR Compliance Certificate', 
              issuedDate: '2024-12-01', 
              validUntil: '2025-11-30', 
              wasteAmount: '2,450 kg', 
              co2Saved: '1.2 tons',
              status: 'Active',
              certificateId: 'EPR-2024-001'
            },
            { 
              type: 'E-Waste Management Certificate', 
              issuedDate: '2024-11-15', 
              validUntil: '2025-11-14', 
              wasteAmount: '850 kg', 
              co2Saved: '0.8 tons',
              status: 'Active',
              certificateId: 'EWM-2024-002'
            },
            { 
              type: 'Carbon Footprint Reduction', 
              issuedDate: '2024-10-20', 
              validUntil: '2025-10-19', 
              wasteAmount: '1,200 kg', 
              co2Saved: '1.5 tons',
              status: 'Active',
              certificateId: 'CFR-2024-003'
            },
            { 
              type: 'Plastic Waste Management', 
              issuedDate: '2024-09-10', 
              validUntil: '2025-09-09', 
              wasteAmount: '400 kg', 
              co2Saved: '0.3 tons',
              status: 'Active',
              certificateId: 'PWM-2024-004'
            },
            { 
              type: 'Green Business Certification', 
              issuedDate: '2024-08-05', 
              validUntil: '2025-08-04', 
              wasteAmount: '3,100 kg', 
              co2Saved: '2.1 tons',
              status: 'Active',
              certificateId: 'GBC-2024-005'
            },
            { 
              type: 'Sustainable Operations Award', 
              issuedDate: '2024-07-15', 
              validUntil: '2025-07-14', 
              wasteAmount: '1,800 kg', 
              co2Saved: '1.0 tons',
              status: 'Active',
              certificateId: 'SOA-2024-006'
            }
          ].map((cert, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cert.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">{cert.type}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Certificate ID:</span>
                  <span className="font-medium">{cert.certificateId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Issued:</span>
                  <span className="font-medium">{cert.issuedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="font-medium">{cert.validUntil}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waste Processed:</span>
                  <span className="font-medium">{cert.wasteAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">CO₂ Saved:</span>
                  <span className="font-medium text-green-600">{cert.co2Saved}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button 
                  onClick={() => handleDownloadCertificate(cert)}
                  className="flex-1 bg-teal-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 sm:p-6 border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-3">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Compliance Status: Excellent</h3>
              <p className="text-gray-600 text-sm sm:text-base">You're meeting all environmental regulations and sustainability goals</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-teal-600">100%</p>
              <p className="text-xs sm:text-sm text-gray-600">EPR Compliance</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-green-600">6</p>
              <p className="text-xs sm:text-sm text-gray-600">Active Certificates</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-600">6.9 tons</p>
              <p className="text-xs sm:text-sm text-gray-600">Total CO₂ Saved</p>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your business profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Business Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base" defaultValue="Green Corp Ltd" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base" defaultValue={user.name} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base" defaultValue={user.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base" rows={3} defaultValue="123 Green Street, Eco City, Mumbai 400001"></textarea>
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-sm sm:text-base">
                  Update Information
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Collection Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Scheduled Collections', description: 'Regular pickup schedule notifications' },
                  { label: 'Collection Reminders', description: 'Email reminders before scheduled pickups' },
                  { label: 'Certificate Updates', description: 'Notifications when new certificates are available' },
                  { label: 'Credit Alerts', description: 'Alerts when you earn new GreenCredits' }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{setting.label}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleDownloadBusinessReport}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-sm sm:text-base"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Report
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center text-sm sm:text-base">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Collection
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center text-sm sm:text-base">
                  <Award className="h-4 w-4 mr-2" />
                  View Certificates
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Account Type:</span>
                  <span className="font-medium">Business</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Member Since:</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">GreenCredits:</span>
                  <span className="font-medium text-teal-600">{user.credits}</span>
                </div>
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
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{currentView}</h2>
      <p className="text-gray-600 text-sm sm:text-base">This section is under development.</p>
    </div>
  );
}