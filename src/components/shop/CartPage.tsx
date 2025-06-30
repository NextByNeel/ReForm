import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    getTotalCredits,
    getItemCount 
  } = useCart();

  console.log('CartPage render - cartItems:', cartItems);
  console.log('CartPage render - itemCount:', getItemCount());

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">Start shopping to add items to your cart</p>
          <Link
            to="/shop"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 text-sm sm:text-base">{getItemCount()} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={`${item.product.id}-${item.paymentMethod}-${index}`} className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">{item.product.category}</p>
                    <div className="flex items-center mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.paymentMethod === 'cash' 
                          ? 'bg-teal-100 text-teal-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.paymentMethod === 'cash' ? 'Cash Payment' : 'GreenCredits'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.paymentMethod, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.paymentMethod, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-center sm:text-right w-full sm:w-auto">
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      {item.paymentMethod === 'cash' 
                        ? `₹${(item.product.price * item.quantity).toLocaleString()}`
                        : `${item.product.credits * item.quantity} credits`
                      }
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {item.paymentMethod === 'cash' 
                        ? `₹${item.product.price.toLocaleString()} each`
                        : `${item.product.credits} credits each`
                      }
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.paymentMethod)}
                    className="text-red-500 hover:text-red-700 p-2 self-center sm:self-start"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 sticky top-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {getTotalPrice() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Cash Payment:</span>
                    <span className="font-semibold">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                )}
                
                {getTotalCredits() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">GreenCredits:</span>
                    <span className="font-semibold">{getTotalCredits()} credits</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Total Items:</span>
                  <span className="font-semibold">{getItemCount()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-base sm:text-lg font-bold">
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

              <Link
                to="/checkout"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm sm:text-base block text-center"
              >
                Proceed to Checkout
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}