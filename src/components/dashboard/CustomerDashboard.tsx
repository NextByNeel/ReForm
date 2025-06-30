import React, { useState } from 'react';
import { DashboardView } from './Dashboard';
import { User } from '../../App';
import { ShoppingBag, Package, Star, ArrowRight, Download, Eye, CheckCircle, Clock, Settings, FileText, CreditCard, Truck, Calendar, Plus, X, User as UserIcon, Mail, Phone, MapPin } from 'lucide-react';
import { useOrders } from '../../contexts/OrderContext';
import { useCart } from '../../hooks/useCart';
import { downloadFile, formatCurrency, formatDate } from '../../utils/downloadUtils';

interface CustomerDashboardProps {
  currentView: DashboardView;
  user: User;
}

export function CustomerDashboard({ currentView, user }: CustomerDashboardProps) {
  const { getOrdersByUser } = useOrders();
  const { getItemCount } = useCart();
  const userOrders = getOrdersByUser(user.email);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+91 98765 43210',
    address: '123 Green Street, Eco City, Mumbai 400001',
    preferences: {
      newsletter: true,
      orderUpdates: true,
      promotions: false
    }
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile via API
    setShowProfileModal(false);
  };

  const generateCustomerDataReport = (): string => {
    let content = `CUSTOMER DATA REPORT\n\n`;
    content += `Customer Name: ${user.name}\n`;
    content += `Email: ${user.email}\n`;
    content += `Account Type: Customer\n`;
    content += `Member Since: December 2024\n`;
    content += `Report Date: ${formatDate(new Date())}\n\n`;

    content += `PROFILE INFORMATION:\n`;
    content += `Full Name: ${profileData.name}\n`;
    content += `Email Address: ${profileData.email}\n`;
    content += `Phone Number: ${profileData.phone}\n`;
    content += `Address: ${profileData.address}\n\n`;

    content += `ACCOUNT PREFERENCES:\n`;
    content += `Newsletter Subscription: ${profileData.preferences.newsletter ? 'Yes' : 'No'}\n`;
    content += `Order Updates: ${profileData.preferences.orderUpdates ? 'Yes' : 'No'}\n`;
    content += `Promotional Offers: ${profileData.preferences.promotions ? 'Yes' : 'No'}\n\n`;

    content += `ORDER HISTORY:\n`;
    content += `Total Orders: ${userOrders.length}\n`;
    content += `Completed Orders: ${userOrders.filter(o => o.status === 'delivered').length}\n`;
    content += `Pending Orders: ${userOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}\n`;
    content += `Cancelled Orders: ${userOrders.filter(o => o.status === 'cancelled').length}\n`;
    content += `Total Amount Spent: ${formatCurrency(userOrders.reduce((sum, o) => sum + o.totalPrice, 0))}\n`;
    content += `Total Credits Used: ${userOrders.reduce((sum, o) => sum + o.totalCredits, 0)}\n\n`;

    if (userOrders.length > 0) {
      content += `RECENT ORDERS:\n`;
      userOrders.slice(0, 10).forEach((order, index) => {
        content += `${index + 1}. ${order.id} - ${formatDate(order.createdAt)} - ${order.status} - `;
        if (order.totalPrice > 0) {
          content += `${formatCurrency(order.totalPrice)}\n`;
        } else {
          content += `${order.totalCredits} credits\n`;
        }
      });
      content += `\n`;
    }

    content += `SHOPPING BEHAVIOR:\n`;
    content += `Average Order Value: ${userOrders.length > 0 ? formatCurrency(userOrders.reduce((sum, o) => sum + o.totalPrice, 0) / userOrders.length) : 'N/A'}\n`;
    content += `Preferred Payment Method: ${userOrders.length > 0 ? (userOrders.filter(o => o.totalPrice > 0).length > userOrders.filter(o => o.totalCredits > 0).length ? 'Cash' : 'Credits') : 'N/A'}\n`;
    content += `Most Ordered Category: Sustainable Products\n`;
    content += `Current Cart Items: ${getItemCount()}\n\n`;

    content += `SUSTAINABILITY IMPACT:\n`;
    content += `Sustainable Purchases: ${userOrders.length}\n`;
    content += `Estimated Waste Diverted: ${(userOrders.length * 2.3).toFixed(1)} kg\n`;
    content += `CO₂ Emissions Saved: ${(userOrders.length * 0.5).toFixed(1)} kg\n`;
    content += `Contribution to Circular Economy: Supporting ${userOrders.length} sustainable product purchases\n\n`;

    content += `ACCOUNT ACTIVITY:\n`;
    content += `Last Login: Today\n`;
    content += `Account Status: Active\n`;
    content += `Email Verified: Yes\n`;
    content += `Phone Verified: No\n\n`;

    content += `DATA USAGE CONSENT:\n`;
    content += `This report contains personal data processed in accordance with our Privacy Policy.\n`;
    content += `Data is used to improve your shopping experience and provide personalized recommendations.\n`;
    content += `You have the right to request data deletion or modification at any time.\n\n`;

    content += `CONTACT INFORMATION:\n`;
    content += `For any questions about your data or account, please contact:\n`;
    content += `Email: privacy@reform.dev\n`;
    content += `Phone: +91 (555) 123-4567\n\n`;

    return content;
  };

  const handleDownloadData = () => {
    const reportContent = generateCustomerDataReport();
    const filename = `ReForm_Customer_Data_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    downloadFile(reportContent, filename, 'Customer Data Report');
  };

  if (currentView === 'overview') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 text-sm sm:text-base">Discover sustainable products and track your orders</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userOrders.length}</p>
                <p className="text-xs sm:text-sm text-purple-600">All time</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Cart Items</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{getItemCount()}</p>
                <p className="text-xs sm:text-sm text-blue-600">Ready to checkout</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Delivered Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userOrders.filter(o => o.status === 'delivered').length}</p>
                <p className="text-xs sm:text-sm text-green-600">Successfully completed</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{userOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</p>
                <p className="text-xs sm:text-sm text-orange-600">In progress</p>
              </div>
              <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <a
                href="/shop"
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
              >
                Shop More
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {userOrders.slice(0, 3).map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{order.id}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {order.totalPrice > 0 ? `₹${order.totalPrice.toLocaleString()}` : `${order.totalCredits} credits`}
                    </p>
                  </div>
                </div>
              ))}
              {userOrders.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No orders yet</p>
                  <p className="text-sm text-gray-500">Start shopping to see your orders here</p>
                  <a
                    href="/shop"
                    className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Start Shopping
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Featured Products</h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { 
                  name: 'Artisan E-Waste Jewelry', 
                  price: '₹2,499', 
                  credits: '85 credits', 
                  image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=100',
                  category: 'Tech Waste',
                  rating: 4.6
                },
                { 
                  name: 'EcoTiles', 
                  price: '₹4,999', 
                  credits: '165 credits', 
                  image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=100',
                  category: 'Retail Market Waste',
                  rating: 4.5
                },
                { 
                  name: 'Functional Desk Art', 
                  price: '₹3,999', 
                  credits: '135 credits', 
                  image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=100',
                  category: 'Tech Waste',
                  rating: 4.5
                }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover mr-3 sm:mr-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{product.price} or {product.credits}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full ml-2">{product.category}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/shop"
                    className="text-purple-600 hover:text-purple-700 ml-2"
                  >
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <a
                href="/shop"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                View All Products →
              </a>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/shop"
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <ShoppingBag className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Browse Products</p>
              <p className="text-sm text-gray-600">Discover sustainable items</p>
            </a>
            <a
              href="/cart"
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">View Cart</p>
              <p className="text-sm text-gray-600">{getItemCount()} items ready</p>
            </a>
            <button
              onClick={() => setShowProfileModal(true)}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <UserIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Edit Profile</p>
              <p className="text-sm text-gray-600">Update your details</p>
            </button>
            <button
              onClick={handleDownloadData}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
            >
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Download Data</p>
              <p className="text-sm text-gray-600">Export your information</p>
            </button>
          </div>
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-4 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      rows={3}
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferences</label>
                  <div className="space-y-3">
                    {[
                      { key: 'newsletter', label: 'Newsletter Updates', description: 'Receive our weekly newsletter' },
                      { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about order status' },
                      { key: 'promotions', label: 'Promotional Offers', description: 'Receive special offers and discounts' }
                    ].map((pref) => (
                      <div key={pref.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{pref.label}</p>
                          <p className="text-xs text-gray-600">{pref.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileData.preferences[pref.key as keyof typeof profileData.preferences]}
                            onChange={(e) => setProfileData({
                              ...profileData,
                              preferences: {
                                ...profileData.preferences,
                                [pref.key]: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'orders') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 text-sm sm:text-base">Track your order history and status</p>
        </div>

        {userOrders.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {userOrders.map((order, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {order.totalPrice > 0 ? `₹${order.totalPrice.toLocaleString()}` : `${order.totalCredits} credits`}
                      </p>
                      <p className="text-sm text-gray-600">{order.items.length} items</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.paymentMethod === 'cash' 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.paymentMethod === 'cash' ? 'Cash' : 'Credits'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Shipping Address:</p>
                      <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        Track Order
                      </button>
                      {order.status === 'delivered' && (
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Download Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <a
              href="/shop"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'settings') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your account preferences and information</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base" defaultValue={user.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base" defaultValue={user.email} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base" defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base" rows={3} defaultValue="123 Green Street, Eco City, Mumbai 400001"></textarea>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm sm:text-base">
                  Update Information
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Order Updates', description: 'Get notified about your order status changes' },
                  { label: 'New Products', description: 'Be the first to know about new sustainable products' },
                  { label: 'Special Offers', description: 'Receive exclusive discounts and promotions' },
                  { label: 'Newsletter', description: 'Weekly updates about sustainability and eco-friendly tips' }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{setting.label}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
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
                <a
                  href="/shop"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center text-sm sm:text-base"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Products
                </a>
                <a
                  href="/cart"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-sm sm:text-base"
                >
                  <Package className="h-4 w-4 mr-2" />
                  View Cart
                </a>
                <button 
                  onClick={handleDownloadData}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center text-sm sm:text-base"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Data
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Account Type:</span>
                  <span className="font-medium">Customer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Member Since:</span>
                  <span className="font-medium">Dec 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Total Orders:</span>
                  <span className="font-medium">{userOrders.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6 border">
              <h4 className="font-semibold text-purple-900 mb-2">🌱 Sustainability Impact</h4>
              <p className="text-purple-700 text-sm mb-3">
                By shopping with ReForm, you're contributing to a circular economy and reducing environmental waste.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-purple-900">{userOrders.length}</p>
                  <p className="text-xs text-purple-700">Sustainable Purchases</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-900">2.3 kg</p>
                  <p className="text-xs text-purple-700">Waste Diverted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customer {currentView}</h2>
      <p className="text-gray-600 text-sm sm:text-base">This section is under development.</p>
    </div>
  );
}