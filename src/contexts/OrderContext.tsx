import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  totalCredits: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  paymentMethod: string;
  customerEmail: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUser: (userEmail: string) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([
    // Add some dummy orders for testing
    {
      id: 'ORD-1735123456789',
      items: [
        {
          product: {
            id: 'tw-001',
            name: 'Artisan E-Waste Jewelry',
            category: 'Tech Waste',
            price: 2499,
            credits: 85,
            image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Unique, wearable art created from circuit boards',
            highlight: 'Turns tech waste into fashion statements',
            rating: 4.6,
            inStock: true
          },
          quantity: 1,
          paymentMethod: 'cash'
        }
      ],
      totalPrice: 2499,
      totalCredits: 0,
      status: 'delivered',
      createdAt: '2024-12-20T10:30:00Z',
      shippingAddress: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        address: '123 Green Street, Eco City',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      paymentMethod: 'COD',
      customerEmail: 'test@example.com'
    },
    {
      id: 'ORD-1735123456790',
      items: [
        {
          product: {
            id: 'rm-001',
            name: 'EcoTiles',
            category: 'Retail Market Waste',
            price: 4999,
            credits: 165,
            image: 'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Tiles made from recycled plastic and agro-waste',
            highlight: 'Durable, stylish, thermally insulating tiles',
            rating: 4.5,
            inStock: true
          },
          quantity: 2,
          paymentMethod: 'credits'
        }
      ],
      totalPrice: 0,
      totalCredits: 330,
      status: 'processing',
      createdAt: '2024-12-22T14:15:00Z',
      shippingAddress: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        address: '123 Green Street, Eco City',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      paymentMethod: 'Credits',
      customerEmail: 'test@example.com'
    },
    {
      id: 'ORD-1735123456791',
      items: [
        {
          product: {
            id: 'tw-003',
            name: 'Functional Desk Art',
            category: 'Tech Waste',
            price: 3999,
            credits: 135,
            image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: 'Stylish desk accessories from hard drive platters',
            highlight: 'Gives iconic tech components a new life',
            rating: 4.5,
            inStock: true
          },
          quantity: 1,
          paymentMethod: 'cash'
        }
      ],
      totalPrice: 3999,
      totalCredits: 0,
      status: 'shipped',
      createdAt: '2024-12-24T09:45:00Z',
      shippingAddress: {
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+91 98765 43210',
        address: '123 Green Street, Eco City',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      paymentMethod: 'COD',
      customerEmail: 'test@example.com'
    }
  ]);

  // Load orders from localStorage on mount
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('reform-orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        console.log('Loading orders from localStorage:', parsedOrders);
        setOrders(parsedOrders);
      }
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    try {
      console.log('Saving orders to localStorage:', orders);
      localStorage.setItem('reform-orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: 'ORD-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    
    console.log('Adding new order:', newOrder);
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    console.log('Updating order status:', orderId, status);
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getOrdersByUser = (userEmail: string) => {
    return orders.filter(order => order.customerEmail === userEmail);
  };

  const getAllOrders = () => {
    return orders;
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrdersByUser,
    getAllOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}