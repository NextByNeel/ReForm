import React from 'react';
import { Star, ShoppingCart, Coins } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, paymentMethod: 'cash' | 'credits') => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Waste Resources': return 'bg-green-100 text-green-700';
      case 'Tech Waste': return 'bg-blue-100 text-blue-700';
      case 'Agri & Defense Waste': return 'bg-teal-100 text-teal-700';
      case 'Retail Market Waste': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddToCart = (paymentMethod: 'cash' | 'credits') => {
    console.log('Adding to cart:', product.name, paymentMethod);
    onAddToCart(product, paymentMethod);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => onViewDetails(product)}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm sm:text-base">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(product.category)}`}>
            {product.category}
          </span>
          <div className="flex items-center">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
            <span className="text-xs sm:text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <h3 
          className="text-base sm:text-lg font-bold text-gray-800 mb-2 cursor-pointer hover:text-teal-600 transition-colors line-clamp-2"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-3 text-xs sm:text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        <div className="bg-teal-50 p-2 sm:p-3 rounded-lg mb-4">
          <p className="text-xs text-teal-700 font-medium">✓ {product.highlight}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-base sm:text-lg font-bold text-gray-800">₹{product.price.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-gray-600">or {product.credits} credits</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => handleAddToCart('cash')}
            disabled={!product.inStock}
            className="flex-1 bg-teal-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-xs sm:text-sm"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Buy
          </button>
          <button
            onClick={() => handleAddToCart('credits')}
            disabled={!product.inStock}
            className="flex-1 bg-amber-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-xs sm:text-sm"
          >
            <Coins className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Credits
          </button>
        </div>
      </div>
    </div>
  );
}