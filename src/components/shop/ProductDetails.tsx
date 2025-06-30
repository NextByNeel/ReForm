import React, { useState } from 'react';
import { X, Star, ShoppingCart, Coins, Minus, Plus } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, paymentMethod: 'cash' | 'credits') => void;
}

export function ProductDetails({ product, onClose, onAddToCart }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash' | 'credits'>('cash');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Waste Resources': return 'bg-green-100 text-green-700';
      case 'Tech Waste': return 'bg-blue-100 text-blue-700';
      case 'Agri & Defense Waste': return 'bg-teal-100 text-teal-700';
      case 'Retail Market Waste': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddToCart = () => {
    console.log('ProductDetails handleAddToCart:', { product: product.name, quantity, selectedPaymentMethod });
    onAddToCart(product, quantity, selectedPaymentMethod);
    onClose();
  };

  const totalPrice = selectedPaymentMethod === 'cash' 
    ? product.price * quantity 
    : product.credits * quantity;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
              />
              
              {!product.inStock && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-medium text-sm sm:text-base">Currently out of stock</p>
                  <p className="text-red-600 text-xs sm:text-sm">We'll notify you when it's available again.</p>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                  <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                    <span className="text-gray-600 ml-1 text-sm sm:text-base">{product.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">{product.description}</p>
                
                <div className="bg-teal-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-teal-700 font-medium text-sm sm:text-base">✓ {product.highlight}</p>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <dl className="grid grid-cols-1 gap-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <dt className="text-gray-600 font-medium text-sm sm:text-base">{key}:</dt>
                          <dd className="text-gray-900 text-sm sm:text-base">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {/* Pricing and Purchase */}
              <div className="border-t pt-4 sm:pt-6">
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Payment Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPaymentMethod('cash')}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                        selectedPaymentMethod === 'cash'
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">Cash Payment</p>
                        <p className="text-xl sm:text-2xl font-bold text-teal-600">₹{product.price.toLocaleString()}</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setSelectedPaymentMethod('credits')}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                        selectedPaymentMethod === 'credits'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">GreenCredits</p>
                        <p className="text-xl sm:text-2xl font-bold text-amber-600">{product.credits} credits</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg sm:text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-xl sm:text-2xl">
                      {selectedPaymentMethod === 'cash' 
                        ? `₹${totalPrice.toLocaleString()}`
                        : `${totalPrice} credits`
                      }
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors flex items-center justify-center text-sm sm:text-base ${
                    selectedPaymentMethod === 'cash'
                      ? 'bg-teal-600 hover:bg-teal-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                >
                  {selectedPaymentMethod === 'cash' ? (
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  ) : (
                    <Coins className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  )}
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}