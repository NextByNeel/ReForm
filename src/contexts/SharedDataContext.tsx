import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Shared data types
export interface MitraProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  rating: number;
  totalCollections: number;
  totalEarnings: number;
  efficiency: number;
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  location: string;
}

export interface Collection {
  id: string;
  mitraId: string;
  mitraName: string;
  businessId: string;
  businessName: string;
  wasteType: string;
  weight: number;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  earnings: number;
  notes?: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  phone: string;
  address: string;
  industry: string;
  greenCredits: number;
  totalWasteContributed: number;
  co2Saved: number;
  joinedDate: string;
  subscriptionTier: 'basic' | 'premium' | 'enterprise';
}

export interface WasteContribution {
  id: string;
  businessId: string;
  businessName: string;
  wasteType: string;
  weight: number;
  date: string;
  creditsEarned: number;
  co2Impact: number;
  status: 'pending' | 'processed' | 'verified';
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'team' | 'mitra' | 'business' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  lastLogin: string;
  company?: string;
  credits?: number;
}

export interface SystemMetrics {
  totalUsers: number;
  totalMitras: number;
  totalBusinesses: number;
  totalWasteProcessed: number;
  totalRevenue: number;
  totalCo2Saved: number;
  activeCollections: number;
  pendingOrders: number;
}

interface SharedDataContextType {
  // Mitra data
  mitras: MitraProfile[];
  addMitra: (mitra: Omit<MitraProfile, 'id'>) => void;
  updateMitra: (id: string, updates: Partial<MitraProfile>) => void;
  getMitraById: (id: string) => MitraProfile | undefined;
  
  // Collection data
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  getCollectionsByMitra: (mitraId: string) => Collection[];
  getCollectionsByBusiness: (businessId: string) => Collection[];
  
  // Business data
  businesses: BusinessProfile[];
  addBusiness: (business: Omit<BusinessProfile, 'id'>) => void;
  updateBusiness: (id: string, updates: Partial<BusinessProfile>) => void;
  getBusinessById: (id: string) => BusinessProfile | undefined;
  
  // Waste contributions
  wasteContributions: WasteContribution[];
  addWasteContribution: (contribution: Omit<WasteContribution, 'id'>) => void;
  updateWasteContribution: (id: string, updates: Partial<WasteContribution>) => void;
  getContributionsByBusiness: (businessId: string) => WasteContribution[];
  
  // System users
  systemUsers: SystemUser[];
  addSystemUser: (user: Omit<SystemUser, 'id'>) => void;
  updateSystemUser: (id: string, updates: Partial<SystemUser>) => void;
  getUsersByRole: (role: string) => SystemUser[];
  
  // System metrics
  systemMetrics: SystemMetrics;
  updateSystemMetrics: () => void;
}

const SharedDataContext = createContext<SharedDataContextType | undefined>(undefined);

export function SharedDataProvider({ children }: { children: ReactNode }) {
  // Initialize with enhanced mock data
  const [mitras, setMitras] = useState<MitraProfile[]>([
    {
      id: 'mitra-001',
      name: 'Raj Kumar',
      email: 'raj@reform.dev',
      phone: '+91 98765 43210',
      vehicleType: 'Motorcycle',
      rating: 4.8,
      totalCollections: 245,
      totalEarnings: 45680,
      efficiency: 98,
      status: 'active',
      joinedDate: '2024-01-15',
      location: 'Mumbai Central'
    },
    {
      id: 'mitra-002',
      name: 'Priya Sharma',
      email: 'priya@reform.dev',
      phone: '+91 98765 43211',
      vehicleType: 'Auto Rickshaw',
      rating: 4.6,
      totalCollections: 189,
      totalEarnings: 38920,
      efficiency: 96,
      status: 'active',
      joinedDate: '2024-02-20',
      location: 'Andheri West'
    },
    {
      id: 'mitra-003',
      name: 'Amit Singh',
      email: 'amit@reform.dev',
      phone: '+91 98765 43212',
      vehicleType: 'Small Truck',
      rating: 4.9,
      totalCollections: 312,
      totalEarnings: 62340,
      efficiency: 94,
      status: 'active',
      joinedDate: '2024-01-08',
      location: 'Bandra East'
    },
    {
      id: 'mitra-004',
      name: 'Sunita Devi',
      email: 'sunita@reform.dev',
      phone: '+91 98765 43213',
      vehicleType: 'Bicycle',
      rating: 4.7,
      totalCollections: 156,
      totalEarnings: 28450,
      efficiency: 92,
      status: 'active',
      joinedDate: '2024-03-10',
      location: 'Powai'
    },
    {
      id: 'mitra-005',
      name: 'Vikram Patel',
      email: 'vikram@reform.dev',
      phone: '+91 98765 43214',
      vehicleType: 'Van',
      rating: 4.5,
      totalCollections: 98,
      totalEarnings: 19800,
      efficiency: 88,
      status: 'inactive',
      joinedDate: '2024-04-05',
      location: 'Thane'
    }
  ]);

  const [businesses, setBusinesses] = useState<BusinessProfile[]>([
    {
      id: 'business-001',
      name: 'Green Corp Ltd',
      email: 'contact@greencorp.com',
      contactPerson: 'John Smith',
      phone: '+91 22 1234 5678',
      address: '123 Business Park, Mumbai',
      industry: 'Technology',
      greenCredits: 1250,
      totalWasteContributed: 2450,
      co2Saved: 1.2,
      joinedDate: '2024-01-10',
      subscriptionTier: 'premium'
    },
    {
      id: 'business-002',
      name: 'EcoTech Solutions',
      email: 'info@ecotech.com',
      contactPerson: 'Sarah Johnson',
      phone: '+91 22 1234 5679',
      address: '456 Tech Hub, Pune',
      industry: 'Manufacturing',
      greenCredits: 890,
      totalWasteContributed: 1890,
      co2Saved: 0.9,
      joinedDate: '2024-02-15',
      subscriptionTier: 'basic'
    },
    {
      id: 'business-003',
      name: 'Sustainable Industries',
      email: 'hello@sustainable.com',
      contactPerson: 'Rahul Mehta',
      phone: '+91 22 1234 5680',
      address: '789 Green Tower, Bangalore',
      industry: 'Retail',
      greenCredits: 2100,
      totalWasteContributed: 3200,
      co2Saved: 1.8,
      joinedDate: '2024-01-25',
      subscriptionTier: 'enterprise'
    },
    {
      id: 'business-004',
      name: 'Clean Energy Co',
      email: 'contact@cleanenergy.com',
      contactPerson: 'Anita Gupta',
      phone: '+91 22 1234 5681',
      address: '321 Solar Street, Chennai',
      industry: 'Energy',
      greenCredits: 1650,
      totalWasteContributed: 2800,
      co2Saved: 1.4,
      joinedDate: '2024-03-01',
      subscriptionTier: 'premium'
    }
  ]);

  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 'col-001',
      mitraId: 'mitra-001',
      mitraName: 'Raj Kumar',
      businessId: 'business-001',
      businessName: 'Green Corp Ltd',
      wasteType: 'Electronic Waste',
      weight: 45,
      date: '2024-12-25',
      time: '10:30',
      location: '123 Business Park, Mumbai',
      status: 'completed',
      earnings: 1350,
      notes: 'PCBs and old computers'
    },
    {
      id: 'col-002',
      mitraId: 'mitra-002',
      mitraName: 'Priya Sharma',
      businessId: 'business-002',
      businessName: 'EcoTech Solutions',
      wasteType: 'Plastic Waste',
      weight: 78,
      date: '2024-12-25',
      time: '14:00',
      location: '456 Tech Hub, Pune',
      status: 'in-progress',
      earnings: 780,
      notes: 'Mixed plastic containers'
    },
    {
      id: 'col-003',
      mitraId: 'mitra-003',
      mitraName: 'Amit Singh',
      businessId: 'business-001',
      businessName: 'Green Corp Ltd',
      wasteType: 'Paper & Cardboard',
      weight: 120,
      date: '2024-12-26',
      time: '09:00',
      location: '123 Business Park, Mumbai',
      status: 'scheduled',
      earnings: 1200
    },
    {
      id: 'col-004',
      mitraId: 'mitra-004',
      mitraName: 'Sunita Devi',
      businessId: 'business-003',
      businessName: 'Sustainable Industries',
      wasteType: 'Metal Waste',
      weight: 65,
      date: '2024-12-24',
      time: '11:15',
      location: '789 Green Tower, Bangalore',
      status: 'completed',
      earnings: 3250
    },
    {
      id: 'col-005',
      mitraId: 'mitra-001',
      mitraName: 'Raj Kumar',
      businessId: 'business-004',
      businessName: 'Clean Energy Co',
      wasteType: 'Electronic Waste',
      weight: 32,
      date: '2024-12-27',
      time: '15:30',
      location: '321 Solar Street, Chennai',
      status: 'scheduled',
      earnings: 960
    }
  ]);

  const [wasteContributions, setWasteContributions] = useState<WasteContribution[]>([
    {
      id: 'waste-001',
      businessId: 'business-001',
      businessName: 'Green Corp Ltd',
      wasteType: 'Electronic Waste',
      weight: 45,
      date: '2024-12-25',
      creditsEarned: 180,
      co2Impact: 0.045,
      status: 'verified'
    },
    {
      id: 'waste-002',
      businessId: 'business-002',
      businessName: 'EcoTech Solutions',
      wasteType: 'Plastic Waste',
      weight: 78,
      date: '2024-12-25',
      creditsEarned: 156,
      co2Impact: 0.078,
      status: 'processed'
    },
    {
      id: 'waste-003',
      businessId: 'business-003',
      businessName: 'Sustainable Industries',
      wasteType: 'Metal Waste',
      weight: 65,
      date: '2024-12-24',
      creditsEarned: 195,
      co2Impact: 0.065,
      status: 'verified'
    },
    {
      id: 'waste-004',
      businessId: 'business-004',
      businessName: 'Clean Energy Co',
      wasteType: 'Paper & Cardboard',
      weight: 120,
      date: '2024-12-23',
      creditsEarned: 120,
      co2Impact: 0.120,
      status: 'processed'
    }
  ]);

  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    // Customers
    {
      id: 'user-001',
      name: 'Test User',
      email: 'test@example.com',
      role: 'customer',
      status: 'active',
      joinedDate: '2024-12-01',
      lastLogin: '2024-12-25'
    },
    {
      id: 'user-002',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'customer',
      status: 'active',
      joinedDate: '2024-11-15',
      lastLogin: '2024-12-24'
    },
    {
      id: 'user-003',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: 'customer',
      status: 'active',
      joinedDate: '2024-10-20',
      lastLogin: '2024-12-20'
    },
    // Team Members
    {
      id: 'user-004',
      name: 'Team Lead',
      email: 'team@reform.dev',
      role: 'team',
      status: 'active',
      joinedDate: '2024-01-01',
      lastLogin: '2024-12-25'
    },
    {
      id: 'user-005',
      name: 'Operations Manager',
      email: 'ops@reform.dev',
      role: 'team',
      status: 'active',
      joinedDate: '2024-01-15',
      lastLogin: '2024-12-25'
    },
    // Business Users
    {
      id: 'user-006',
      name: 'John Smith',
      email: 'contact@greencorp.com',
      role: 'business',
      status: 'active',
      joinedDate: '2024-01-10',
      lastLogin: '2024-12-24',
      company: 'Green Corp Ltd',
      credits: 1250
    },
    {
      id: 'user-007',
      name: 'Sarah Johnson',
      email: 'info@ecotech.com',
      role: 'business',
      status: 'active',
      joinedDate: '2024-02-15',
      lastLogin: '2024-12-23',
      company: 'EcoTech Solutions',
      credits: 890
    },
    // Mitras
    {
      id: 'user-008',
      name: 'Raj Kumar',
      email: 'raj@reform.dev',
      role: 'mitra',
      status: 'active',
      joinedDate: '2024-01-15',
      lastLogin: '2024-12-25'
    },
    {
      id: 'user-009',
      name: 'Priya Sharma',
      email: 'priya@reform.dev',
      role: 'mitra',
      status: 'active',
      joinedDate: '2024-02-20',
      lastLogin: '2024-12-24'
    },
    // Admins
    {
      id: 'user-010',
      name: 'Admin User',
      email: 'admin@reform.dev',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-01',
      lastLogin: '2024-12-25'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalUsers: 2847,
    totalMitras: 156,
    totalBusinesses: 89,
    totalWasteProcessed: 45200,
    totalRevenue: 2840000,
    totalCo2Saved: 22.4,
    activeCollections: 12,
    pendingOrders: 8
  });

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedMitras = localStorage.getItem('reform-mitras');
      const savedBusinesses = localStorage.getItem('reform-businesses');
      const savedCollections = localStorage.getItem('reform-collections');
      const savedContributions = localStorage.getItem('reform-waste-contributions');
      const savedUsers = localStorage.getItem('reform-system-users');
      
      if (savedMitras) setMitras(JSON.parse(savedMitras));
      if (savedBusinesses) setBusinesses(JSON.parse(savedBusinesses));
      if (savedCollections) setCollections(JSON.parse(savedCollections));
      if (savedContributions) setWasteContributions(JSON.parse(savedContributions));
      if (savedUsers) setSystemUsers(JSON.parse(savedUsers));
    } catch (error) {
      console.error('Error loading shared data:', error);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('reform-mitras', JSON.stringify(mitras));
  }, [mitras]);

  useEffect(() => {
    localStorage.setItem('reform-businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('reform-collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('reform-waste-contributions', JSON.stringify(wasteContributions));
  }, [wasteContributions]);

  useEffect(() => {
    localStorage.setItem('reform-system-users', JSON.stringify(systemUsers));
  }, [systemUsers]);

  // Mitra functions
  const addMitra = (mitraData: Omit<MitraProfile, 'id'>) => {
    const newMitra: MitraProfile = {
      ...mitraData,
      id: 'mitra-' + Date.now()
    };
    setMitras(prev => [newMitra, ...prev]);
    updateSystemMetrics();
  };

  const updateMitra = (id: string, updates: Partial<MitraProfile>) => {
    setMitras(prev => prev.map(mitra => 
      mitra.id === id ? { ...mitra, ...updates } : mitra
    ));
  };

  const getMitraById = (id: string) => {
    return mitras.find(mitra => mitra.id === id);
  };

  // Collection functions
  const addCollection = (collectionData: Omit<Collection, 'id'>) => {
    const newCollection: Collection = {
      ...collectionData,
      id: 'col-' + Date.now()
    };
    setCollections(prev => [newCollection, ...prev]);
    
    // Update mitra stats
    const mitra = getMitraById(collectionData.mitraId);
    if (mitra) {
      updateMitra(mitra.id, {
        totalCollections: mitra.totalCollections + 1,
        totalEarnings: mitra.totalEarnings + collectionData.earnings
      });
    }
    
    updateSystemMetrics();
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(prev => prev.map(collection => 
      collection.id === id ? { ...collection, ...updates } : collection
    ));
  };

  const getCollectionsByMitra = (mitraId: string) => {
    return collections.filter(collection => collection.mitraId === mitraId);
  };

  const getCollectionsByBusiness = (businessId: string) => {
    return collections.filter(collection => collection.businessId === businessId);
  };

  // Business functions
  const addBusiness = (businessData: Omit<BusinessProfile, 'id'>) => {
    const newBusiness: BusinessProfile = {
      ...businessData,
      id: 'business-' + Date.now()
    };
    setBusinesses(prev => [newBusiness, ...prev]);
    updateSystemMetrics();
  };

  const updateBusiness = (id: string, updates: Partial<BusinessProfile>) => {
    setBusinesses(prev => prev.map(business => 
      business.id === id ? { ...business, ...updates } : business
    ));
  };

  const getBusinessById = (id: string) => {
    return businesses.find(business => business.id === id);
  };

  // Waste contribution functions
  const addWasteContribution = (contributionData: Omit<WasteContribution, 'id'>) => {
    const newContribution: WasteContribution = {
      ...contributionData,
      id: 'waste-' + Date.now()
    };
    setWasteContributions(prev => [newContribution, ...prev]);
    
    // Update business credits and stats
    const business = getBusinessById(contributionData.businessId);
    if (business) {
      updateBusiness(business.id, {
        greenCredits: business.greenCredits + contributionData.creditsEarned,
        totalWasteContributed: business.totalWasteContributed + contributionData.weight,
        co2Saved: business.co2Saved + contributionData.co2Impact
      });
    }
    
    updateSystemMetrics();
  };

  const updateWasteContribution = (id: string, updates: Partial<WasteContribution>) => {
    setWasteContributions(prev => prev.map(contribution => 
      contribution.id === id ? { ...contribution, ...updates } : contribution
    ));
  };

  const getContributionsByBusiness = (businessId: string) => {
    return wasteContributions.filter(contribution => contribution.businessId === businessId);
  };

  // System user functions
  const addSystemUser = (userData: Omit<SystemUser, 'id'>) => {
    const newUser: SystemUser = {
      ...userData,
      id: 'user-' + Date.now()
    };
    setSystemUsers(prev => [newUser, ...prev]);
    updateSystemMetrics();
  };

  const updateSystemUser = (id: string, updates: Partial<SystemUser>) => {
    setSystemUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };

  const getUsersByRole = (role: string) => {
    return systemUsers.filter(user => user.role === role);
  };

  // System metrics update
  const updateSystemMetrics = () => {
    const totalWaste = wasteContributions.reduce((sum, contrib) => sum + contrib.weight, 0);
    const totalCo2 = wasteContributions.reduce((sum, contrib) => sum + contrib.co2Impact, 0);
    const activeColls = collections.filter(col => col.status === 'in-progress' || col.status === 'scheduled').length;
    
    setSystemMetrics(prev => ({
      ...prev,
      totalUsers: systemUsers.length,
      totalMitras: mitras.length,
      totalBusinesses: businesses.length,
      totalWasteProcessed: totalWaste,
      totalCo2Saved: totalCo2,
      activeCollections: activeColls
    }));
  };

  const value = {
    mitras,
    addMitra,
    updateMitra,
    getMitraById,
    collections,
    addCollection,
    updateCollection,
    getCollectionsByMitra,
    getCollectionsByBusiness,
    businesses,
    addBusiness,
    updateBusiness,
    getBusinessById,
    wasteContributions,
    addWasteContribution,
    updateWasteContribution,
    getContributionsByBusiness,
    systemUsers,
    addSystemUser,
    updateSystemUser,
    getUsersByRole,
    systemMetrics,
    updateSystemMetrics
  };

  return (
    <SharedDataContext.Provider value={value}>
      {children}
    </SharedDataContext.Provider>
  );
}

export function useSharedData() {
  const context = useContext(SharedDataContext);
  if (context === undefined) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }
  return context;
}