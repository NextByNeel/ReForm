import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portals } from './components/Portals';
import { Products } from './components/Products';
import { Footer } from './components/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { ShopPage } from './components/shop/ShopPage';
import { CartPage } from './components/shop/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { ThankYouPage } from './components/checkout/ThankYouPage';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { ProductProvider } from './contexts/ProductContext';
import { SharedDataProvider } from './contexts/SharedDataContext';

export type UserRole = 'customer' | 'team' | 'mitra' | 'business' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits?: number;
  company?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Mock authentication - in production, this would be a real API call
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role,
      credits: role === 'business' ? 1250 : undefined,
      company: role === 'business' ? 'Green Corp Ltd' : undefined
    };
    setCurrentUser(mockUser);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const openAuthModal = (type: 'login' | 'register', role: UserRole = null) => {
    setAuthType(type);
    setSelectedRole(role);
    setShowAuthModal(true);
  };

  const HomePage = () => (
    <>
      <Header 
        onLogin={() => openAuthModal('login')} 
        currentUser={currentUser}
      />
      <Hero onGetStarted={() => openAuthModal('register')} />
      <Portals onPortalAccess={(role) => openAuthModal('login', role)} />
      <Products />
      <Footer />
    </>
  );

  return (
    <SharedDataProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-white">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={
                    <>
                      <Header onLogin={() => openAuthModal('login')} currentUser={currentUser} />
                      <ShopPage />
                    </>
                  } />
                  <Route path="/cart" element={
                    <>
                      <Header onLogin={() => openAuthModal('login')} currentUser={currentUser} />
                      <CartPage />
                    </>
                  } />
                  <Route path="/checkout" element={
                    <>
                      <Header onLogin={() => openAuthModal('login')} currentUser={currentUser} />
                      <CheckoutPage currentUser={currentUser} />
                    </>
                  } />
                  <Route path="/thank-you" element={
                    <>
                      <Header onLogin={() => openAuthModal('login')} currentUser={currentUser} />
                      <ThankYouPage />
                    </>
                  } />
                  <Route path="/dashboard" element={
                    currentUser ? (
                      <Dashboard user={currentUser} onLogout={handleLogout} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  } />
                </Routes>
                
                {showAuthModal && (
                  <AuthModal
                    type={authType}
                    selectedRole={selectedRole}
                    onLogin={handleLogin}
                    onClose={() => setShowAuthModal(false)}
                    onSwitchType={(type) => setAuthType(type)}
                  />
                )}
              </div>
            </Router>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </SharedDataProvider>
  );
}

export default App;