import { Product } from '../types';

export const products: Product[] = [
  // Waste Resources (3 products)
  {
    id: 'wr-001',
    name: "Gold & Silver Bullion",
    category: "Waste Resources",
    price: 85999,
    credits: 2800,
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Extracted from PCBs using pyro/hydrometallurgical techniques",
    highlight: "High-value metals ideal for resale or investment",
    rating: 4.9,
    inStock: true,
    specifications: {
      "Purity": "99.9%",
      "Source": "Electronic PCBs",
      "Processing": "Hydrometallurgical",
      "Certification": "ISO 9001"
    }
  },
  {
    id: 'wr-002',
    name: "Copper Ingots or Wire",
    category: "Waste Resources",
    price: 32999,
    credits: 1100,
    image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Recovered from wires and circuit boards",
    highlight: "In-demand raw material for electrical industries",
    rating: 4.8,
    inStock: true,
    specifications: {
      "Purity": "99.5%",
      "Form": "Ingots/Wire",
      "Source": "E-waste cables",
      "Weight": "Variable"
    }
  },
  {
    id: 'wr-003',
    name: "Aluminum Sheets or Blocks",
    category: "Waste Resources",
    price: 28999,
    credits: 950,
    image: "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Sourced from device casings and frames",
    highlight: "Lightweight, durable, and 100% recyclable",
    rating: 4.7,
    inStock: true,
    specifications: {
      "Grade": "6061-T6",
      "Thickness": "1-10mm",
      "Source": "Device casings",
      "Finish": "Mill finish"
    }
  },

  // Tech Waste (5 products)
  {
    id: 'tw-001',
    name: "Artisan E-Waste Jewelry",
    category: "Tech Waste",
    price: 2499,
    credits: 85,
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Unique, wearable art created by transforming intricate circuit boards (PCBs) and other electronic components into fashion items",
    highlight: "Turns tech waste into fashion statements, supports local artisans, and promotes circular fashion",
    rating: 4.6,
    inStock: true,
    specifications: {
      "Material": "PCB, Gold plating",
      "Style": "Contemporary",
      "Handmade": "Yes",
      "Unique": "Each piece different"
    }
  },
  {
    id: 'tw-002',
    name: "Corporate & Decor Art",
    category: "Tech Waste",
    price: 15999,
    credits: 550,
    image: "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Large mosaic panels and sculptures made from RAM sticks, capacitors, and wires",
    highlight: "Powerful branding for offices; communicates sustainability values through art",
    rating: 4.8,
    inStock: true,
    specifications: {
      "Size": "Custom sizes available",
      "Material": "RAM, Capacitors, Wires",
      "Installation": "Professional required",
      "Warranty": "5 years"
    }
  },
  {
    id: 'tw-003',
    name: "Functional Desk Art",
    category: "Tech Waste",
    price: 3999,
    credits: 135,
    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Stylish desk accessories like coasters and pen holders crafted from disassembled hard drive platters",
    highlight: "Gives iconic tech components a new life and is ideal for eco-conscious tech professionals",
    rating: 4.5,
    inStock: true,
    specifications: {
      "Material": "Hard drive platters",
      "Finish": "Polished aluminum",
      "Set includes": "4 coasters, 1 pen holder",
      "Care": "Wipe clean"
    }
  },
  {
    id: 'tw-004',
    name: "Industrial E-Pavers",
    category: "Tech Waste",
    price: 8999,
    credits: 300,
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Eco-friendly paving blocks created from low-value e-waste plastics like monitor casings and keyboards",
    highlight: "Diverts plastic waste from landfills, provides durable, low-absorption pavers, and supports green construction goals",
    rating: 4.7,
    inStock: true,
    specifications: {
      "Size": "200x100x60mm",
      "Material": "Recycled e-waste plastic",
      "Strength": "M25 grade",
      "Coverage": "50 sq ft per pack"
    }
  },
  {
    id: 'tw-005',
    name: "Refined Precious Metals",
    category: "Tech Waste",
    price: 65999,
    credits: 2200,
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Hydrometallurgy-based extraction of gold, silver, copper, and palladium from circuit boards",
    highlight: "Sustainable 'urban mining' that produces high-purity materials while reducing reliance on traditional mining",
    rating: 4.9,
    inStock: true,
    specifications: {
      "Metals": "Au, Ag, Cu, Pd",
      "Purity": "99.9%+",
      "Process": "Hydrometallurgy",
      "Certification": "LBMA approved"
    }
  },

  // Agri & Defense Waste (2 products)
  {
    id: 'ad-001',
    name: "Spice Shield Oleoresin",
    category: "Agri & Defense Waste",
    price: 12999,
    credits: 450,
    image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Capsaicin extract from chili waste used for non-lethal defense sprays",
    highlight: "Rural, low-cost solution aligned with defense innovation",
    rating: 4.4,
    inStock: true,
    specifications: {
      "Active ingredient": "Capsaicin",
      "Concentration": "2-5%",
      "Source": "Chili waste",
      "Application": "Defense sprays"
    }
  },
  {
    id: 'ad-002',
    name: "Biodegradable Grenades",
    category: "Agri & Defense Waste",
    price: 18999,
    credits: 650,
    image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Riot-control grenades made from sugarcane bagasse and capsaicin",
    highlight: "Safe for the environment, supports local innovation in defense",
    rating: 4.6,
    inStock: true,
    specifications: {
      "Material": "Sugarcane bagasse",
      "Active": "Capsaicin",
      "Biodegradable": "100%",
      "Use": "Riot control"
    }
  },

  // Retail Market Waste (3 products - adding one more to make 13 total)
  {
    id: 'rm-001',
    name: "EcoTiles",
    category: "Retail Market Waste",
    price: 4999,
    credits: 165,
    image: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Tiles made from 70% recycled plastic + 30% agro-waste like husk and straw",
    highlight: "Durable, stylish, thermally insulating tiles ideal for conscious consumers and green infrastructure",
    rating: 4.5,
    inStock: true,
    specifications: {
      "Composition": "70% plastic, 30% agro-waste",
      "Size": "300x300mm",
      "Thickness": "8-12mm",
      "Coverage": "25 sq ft per pack"
    }
  },
  {
    id: 'rm-002',
    name: "SkySip",
    category: "Retail Market Waste",
    price: 899,
    credits: 30,
    image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Biodegradable bottles made from pine husk/corn starch, branded for local resale",
    highlight: "Replaces single-use plastic; great for green hospitality branding",
    rating: 4.3,
    inStock: true,
    specifications: {
      "Material": "Pine husk, Corn starch",
      "Capacity": "500ml",
      "Biodegradable": "6 months",
      "Pack size": "50 bottles"
    }
  },
  {
    id: 'rm-003',
    name: "EcoWrap Packaging",
    category: "Retail Market Waste",
    price: 1299,
    credits: 45,
    image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Biodegradable packaging material made from agricultural waste and recycled paper",
    highlight: "Sustainable alternative to plastic packaging, supports circular economy",
    rating: 4.4,
    inStock: true,
    specifications: {
      "Material": "Agricultural waste, Recycled paper",
      "Biodegradable": "3 months",
      "Strength": "High tensile",
      "Applications": "Food packaging, shipping"
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};