import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, User, Mail, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useOrders } from '../../contexts/OrderContext';
import { User as UserType } from '../../App';

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

interface CheckoutPageProps {
  currentUser: UserType | null;
}

export function CheckoutPage({ currentUser }: CheckoutPageProps) {
  const navigate = useNavigate();
  const { 
    cartItems, 
    getTotalPrice, 
    getTotalCredits,
    getItemCount,
    clearCart 
  } = useCart();
  const { addOrder } = useOrders();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No items in cart</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checkout</p>
          <Link
            to="/shop"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order
    const newOrder = addOrder({
      items: cartItems,
      totalPrice: getTotalPrice(),
      totalCredits: getTotalCredits(),
      status: 'pending',
      shippingAddress,
      paymentMethod: 'COD',
      customerEmail: shippingAddress.email
    });
    
    // Store order details in localStorage for thank you page
    const orderDetails = {
      orderId: newOrder.id,
      items: cartItems,
      totalPrice: getTotalPrice(),
      totalCredits: getTotalCredits(),
      shippingAddress,
      paymentMethod: 'COD',
      orderDate: new Date().toISOString()
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    
    // Clear cart
    clearCart();
    
    // Navigate to thank you page
    navigate('/thank-you');
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                
                <form onSubmit={handleAddressSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={shippingAddress.fullName}
                          onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={shippingAddress.email}
                          onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                      <textarea
                        required
                        rows={3}
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="House/Flat No., Building, Street, Area"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.landmark}
                      onChange={(e) => setShippingAddress({...shippingAddress, landmark: e.target.value})}
                      className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Nearby landmark"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        value={shippingAddress.pincode}
                        onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                        className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm sm:text-base"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Shipping Address Summary */}
                <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900">{shippingAddress.fullName}</p>
                    <p>{shippingAddress.address}</p>
                    {shippingAddress.landmark && <p>{shippingAddress.landmark}</p>}
                    <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                    <p>{shippingAddress.phone}</p>
                    <p>{shippingAddress.email}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  
                  <div className="border-2 border-teal-500 bg-teal-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-teal-600 p-2 rounded-lg mr-4">
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Cash on Delivery (COD)</h4>
                        <p className="text-sm text-gray-600">Pay when your order is delivered</p>
                      </div>
                      <div className="w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">COD Information</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Pay in cash when your order arrives</li>
                      <li>• No additional charges for COD</li>
                      <li>• Please keep exact change ready</li>
                      <li>• Delivery within 3-7 business days</li>
                    </ul>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isProcessing ? 'Processing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 sticky top-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.product.id}-${item.paymentMethod}-${index}`} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.paymentMethod === 'cash' 
                          ? 'bg-teal-100 text-teal-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.paymentMethod === 'cash' ? 'Cash' : 'Credits'}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {item.paymentMethod === 'cash' 
                          ? `₹${(item.product.price * item.quantity).toLocaleString()}`
                          : `${item.product.credits * item.quantity} credits`
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{getItemCount()}</span>
                </div>
                
                {getTotalPrice() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cash Payment:</span>
                    <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                )}
                
                {getTotalCredits() > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GreenCredits:</span>
                    <span className="font-medium text-amber-600">{getTotalCredits()} credits</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <div className="text-right">
                      {getTotalPrice() > 0 && (
                        <div>₹{getTotalPrice().toLocaleString()}</div>
                      )}
                      {getTotalCredits() > 0 && (
                        <div className="text-amber-600">{getTotalCredits()} credits</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}