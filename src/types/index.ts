export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  credits: number;
  image: string;
  description: string;
  highlight: string;
  rating: number;
  inStock: boolean;
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  paymentMethod: 'cash' | 'credits';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  totalCredits: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: 'cash' | 'credits' | 'mixed';
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface Collection {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  location: string;
  collector?: string;
  estimatedCredits: number;
}

export interface Certificate {
  id: string;
  type: string;
  issuedDate: string;
  validUntil: string;
  wasteAmount: string;
  co2Saved: string;
  status: 'active' | 'expired';
}