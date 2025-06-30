import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, paymentMethod?: 'cash' | 'credits') => void;
  removeFromCart: (productId: string, paymentMethod: 'cash' | 'credits') => void;
  updateQuantity: (productId: string, paymentMethod: 'cash' | 'credits', quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalCredits: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('reform-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Loading cart from localStorage:', parsedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      console.log('Saving cart to localStorage:', cartItems);
      localStorage.setItem('reform-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1, paymentMethod: 'cash' | 'credits' = 'cash') => {
    console.log('CartContext addToCart called with:', { 
      productId: product.id, 
      productName: product.name, 
      quantity, 
      paymentMethod 
    });
    
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.product.id === product.id && item.paymentMethod === paymentMethod
      );

      let newCart;
      if (existingItem) {
        console.log('Updating existing item quantity from', existingItem.quantity, 'to', existingItem.quantity + quantity);
        newCart = prev.map(item =>
          item.product.id === product.id && item.paymentMethod === paymentMethod
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log('Adding new item to cart');
        const newItem: CartItem = { product, quantity, paymentMethod };
        newCart = [...prev, newItem];
      }
      
      console.log('New cart state:', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string, paymentMethod: 'cash' | 'credits') => {
    console.log('CartContext removeFromCart called with:', { productId, paymentMethod });
    setCartItems(prev => {
      const newCart = prev.filter(item => 
        !(item.product.id === productId && item.paymentMethod === paymentMethod)
      );
      console.log('Cart after removal:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId: string, paymentMethod: 'cash' | 'credits', quantity: number) => {
    console.log('CartContext updateQuantity called with:', { productId, paymentMethod, quantity });
    
    if (quantity <= 0) {
      removeFromCart(productId, paymentMethod);
      return;
    }

    setCartItems(prev => {
      const newCart = prev.map(item =>
        item.product.id === productId && item.paymentMethod === paymentMethod
          ? { ...item, quantity }
          : item
      );
      console.log('Cart after quantity update:', newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    console.log('CartContext clearCart called');
    setCartItems([]);
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => {
      if (item.paymentMethod === 'cash') {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
    console.log('Total price calculated:', total);
    return total;
  };

  const getTotalCredits = () => {
    const total = cartItems.reduce((total, item) => {
      if (item.paymentMethod === 'credits') {
        return total + (item.product.credits * item.quantity);
      }
      return total;
    }, 0);
    console.log('Total credits calculated:', total);
    return total;
  };

  const getItemCount = () => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('Item count calculated:', count, 'from items:', cartItems);
    return count;
  };

  // Debug: Log current cart state
  console.log('CartContext current cart items:', cartItems);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalCredits,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}