import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Truck, Calendar, Download, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadFile, formatCurrency, formatDate } from '../../utils/downloadUtils';

interface OrderDetails {
  orderId: string;
  items: any[];
  totalPrice: number;
  totalCredits: number;
  shippingAddress: any;
  paymentMethod: string;
  orderDate: string;
}

export function ThankYouPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Get order details from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  const generateInvoiceContent = (orderDetails: OrderDetails): string => {
    let content = `INVOICE\n\n`;
    content += `Order ID: ${orderDetails.orderId}\n`;
    content += `Order Date: ${formatDate(orderDetails.orderDate)}\n`;
    content += `Payment Method: ${orderDetails.paymentMethod}\n\n`;

    content += `BILLING & SHIPPING ADDRESS:\n`;
    content += `${orderDetails.shippingAddress.fullName}\n`;
    content += `${orderDetails.shippingAddress.address}\n`;
    if (orderDetails.shippingAddress.landmark) {
      content += `${orderDetails.shippingAddress.landmark}\n`;
    }
    content += `${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} - ${orderDetails.shippingAddress.pincode}\n`;
    content += `Phone: ${orderDetails.shippingAddress.phone}\n`;
    content += `Email: ${orderDetails.shippingAddress.email}\n\n`;

    content += `ORDER ITEMS:\n`;
    content += `${'Item'.padEnd(40)} ${'Qty'.padEnd(5)} ${'Payment'.padEnd(12)} ${'Amount'.padStart(15)}\n`;
    content += `${'-'.repeat(80)}\n`;

    orderDetails.items.forEach(item => {
      const itemName = item.product.name.length > 35 ? 
        item.product.name.substring(0, 35) + '...' : 
        item.product.name;
      const paymentType = item.paymentMethod === 'cash' ? 'Cash' : 'Credits';
      const amount = item.paymentMethod === 'cash' ? 
        formatCurrency(item.product.price * item.quantity) :
        `${item.product.credits * item.quantity} credits`;
      
      content += `${itemName.padEnd(40)} ${item.quantity.toString().padEnd(5)} ${paymentType.padEnd(12)} ${amount.padStart(15)}\n`;
    });

    content += `${'-'.repeat(80)}\n`;
    content += `Total Items: ${orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)}\n`;
    
    if (orderDetails.totalPrice > 0) {
      content += `Total Amount (Cash): ${formatCurrency(orderDetails.totalPrice)}\n`;
    }
    if (orderDetails.totalCredits > 0) {
      content += `Total Amount (Credits): ${orderDetails.totalCredits} GreenCredits\n`;
    }
    
    content += `Shipping: FREE\n\n`;

    content += `PAYMENT INFORMATION:\n`;
    content += `Payment Method: Cash on Delivery (COD)\n`;
    content += `Payment Status: Pending (Pay on delivery)\n\n`;

    content += `DELIVERY INFORMATION:\n`;
    content += `Estimated Delivery: ${formatDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))}\n`;
    content += `Delivery Method: Standard Delivery\n`;
    content += `Tracking: Available after shipment\n\n`;

    content += `TERMS & CONDITIONS:\n`;
    content += `- Please keep exact change ready for COD orders\n`;
    content += `- Delivery within 3-7 business days\n`;
    content += `- Items are non-returnable due to their sustainable nature\n`;
    content += `- For support, contact: support@reform.dev\n\n`;

    content += `Thank you for choosing ReForm and supporting sustainable practices!\n`;

    return content;
  };

  const handleDownloadInvoice = () => {
    if (orderDetails) {
      const invoiceContent = generateInvoiceContent(orderDetails);
      const filename = `ReForm_Invoice_${orderDetails.orderId}.txt`;
      downloadFile(invoiceContent, filename, 'Order Invoice');
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
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

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days from now

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Success Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 text-sm sm:text-lg">Thank you for your order. We'll send you a confirmation email shortly.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Order Info */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Information</h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Order ID:</span>
                  <span className="font-semibold text-gray-900">{orderDetails.orderId}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Order Date:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(orderDetails.orderDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Payment Method:</span>
                  <span className="font-semibold text-gray-900">Cash on Delivery</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Total Amount:</span>
                  <div className="font-semibold text-gray-900">
                    {orderDetails.totalPrice > 0 && (
                      <div>₹{orderDetails.totalPrice.toLocaleString()}</div>
                    )}
                    {orderDetails.totalCredits > 0 && (
                      <div className="text-amber-600">{orderDetails.totalCredits} credits</div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Estimated Delivery:</span>
                  <span className="font-semibold text-gray-900">
                    {estimatedDelivery.toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Shipping Address</h2>
              
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="font-semibold text-gray-900">{orderDetails.shippingAddress.fullName}</p>
                <p className="text-gray-700 text-sm sm:text-base">{orderDetails.shippingAddress.address}</p>
                {orderDetails.shippingAddress.landmark && (
                  <p className="text-gray-700 text-sm sm:text-base">{orderDetails.shippingAddress.landmark}</p>
                )}
                <p className="text-gray-700 text-sm sm:text-base">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">{orderDetails.shippingAddress.phone}</p>
                <p className="text-gray-700 text-sm sm:text-base">{orderDetails.shippingAddress.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Items</h2>
          
          <div className="space-y-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.product.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.product.category}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.paymentMethod === 'cash' 
                        ? 'bg-teal-100 text-teal-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.paymentMethod === 'cash' ? 'Cash' : 'Credits'}
                    </span>
                  </div>
                </div>
                
                <div className="text-right w-full sm:w-auto">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {item.paymentMethod === 'cash' 
                      ? `₹${(item.product.price * item.quantity).toLocaleString()}`
                      : `${item.product.credits * item.quantity} credits`
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Status</h2>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center">
              <div className="bg-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">Order Placed</p>
                <p className="text-gray-600 text-xs sm:text-sm">Your order has been confirmed</p>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">Just now</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 text-sm sm:text-base">Processing</p>
                <p className="text-gray-500 text-xs sm:text-sm">We're preparing your order</p>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">1-2 days</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <Truck className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 text-sm sm:text-base">Shipped</p>
                <p className="text-gray-500 text-xs sm:text-sm">Your order is on the way</p>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">3-5 days</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-600 text-sm sm:text-base">Delivered</p>
                <p className="text-gray-500 text-xs sm:text-sm">Order delivered successfully</p>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">5-7 days</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleDownloadInvoice}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Download Invoice
          </button>
          
          <Link
            to="/shop"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Continue Shopping
          </Link>
          
          <Link
            to="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 bg-blue-50 rounded-xl p-4 sm:p-6">
          <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">What happens next?</h3>
          <ul className="text-blue-700 space-y-2 text-xs sm:text-sm">
            <li className="flex items-start">
              <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>You'll receive an email confirmation with your order details</span>
            </li>
            <li className="flex items-start">
              <Package className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>We'll notify you when your order is being prepared and shipped</span>
            </li>
            <li className="flex items-start">
              <Truck className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Track your order status and get delivery updates via SMS/email</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Pay cash on delivery when your order arrives (keep exact change ready)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}