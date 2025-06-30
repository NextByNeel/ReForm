import React from 'react';
import { Recycle, Menu, X, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User as UserType } from '../App';
import { useCart } from '../hooks/useCart';

interface HeaderProps {
  onLogin: () => void;
  currentUser: UserType | null;
}

export function Header({ onLogin, currentUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const location = useLocation();

  // Debug cart count in header
  const itemCount = getItemCount();
  console.log('Header cart count:', itemCount);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSolutionClick = () => {
    window.open('https://reformg.tiiny.site/#solution', '_blank');
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Recycle className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-2xl font-extrabold text-gray-800">
              ReForm<span className="text-teal-600">.</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={handleSolutionClick}
              className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('portals')}
              className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
            >
              Portals
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
            >
              Products
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Link
              to="/shop"
              className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 font-bold shadow-sm"
            >
              Shop
            </Link>
            
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 font-bold shadow-sm"
              >
                Login
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => { handleSolutionClick(); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Solution
              </button>
              <button 
                onClick={() => { scrollToSection('portals'); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Portals
              </button>
              <button 
                onClick={() => { scrollToSection('products'); setIsMenuOpen(false); }}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Products
              </button>
              
              <div className="flex items-center space-x-4 pt-4">
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative p-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors w-fit font-bold"
                >
                  Shop
                </Link>
                
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentUser.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => { onLogin(); setIsMenuOpen(false); }}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors w-fit font-bold"
                  >
                    Login
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}