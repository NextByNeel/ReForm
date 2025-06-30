import React from 'react';
import { Package, Leaf, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Products() {
  const allProducts = [
    // Waste Resources (3 products)
    {
      name: "Gold & Silver Bullion",
      category: "Waste Resources",
      price: "₹85,999",
      credits: "2800 credits",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Extracted from PCBs using pyro/hydrometallurgical techniques",
      highlight: "High-value metals ideal for resale or investment"
    },
    {
      name: "Copper Ingots or Wire",
      category: "Waste Resources",
      price: "₹32,999",
      credits: "1100 credits",
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Recovered from wires and circuit boards",
      highlight: "In-demand raw material for electrical industries"
    },
    {
      name: "Aluminum Sheets or Blocks",
      category: "Waste Resources",
      price: "₹28,999",
      credits: "950 credits",
      image: "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Sourced from device casings and frames",
      highlight: "Lightweight, durable, and 100% recyclable"
    },

    // Tech Waste (5 products)
    {
      name: "Artisan E-Waste Jewelry",
      category: "Tech Waste",
      price: "₹2,499",
      credits: "85 credits",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Unique, wearable art created from circuit boards and electronic components",
      highlight: "Turns tech waste into fashion statements, supports local artisans"
    },
    {
      name: "Corporate & Decor Art",
      category: "Tech Waste",
      price: "₹15,999",
      credits: "550 credits",
      image: "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Large mosaic panels and sculptures made from RAM sticks and capacitors",
      highlight: "Powerful branding for offices; communicates sustainability values through art"
    },
    {
      name: "Functional Desk Art",
      category: "Tech Waste",
      price: "₹3,999",
      credits: "135 credits",
      image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Stylish desk accessories crafted from disassembled hard drive platters",
      highlight: "Gives iconic tech components a new life, ideal for eco-conscious professionals"
    },
    {
      name: "Industrial E-Pavers",
      category: "Tech Waste",
      price: "₹8,999",
      credits: "300 credits",
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Eco-friendly paving blocks created from low-value e-waste plastics",
      highlight: "Diverts plastic waste from landfills, provides durable pavers"
    },
    {
      name: "Refined Precious Metals",
      category: "Tech Waste",
      price: "₹65,999",
      credits: "2200 credits",
      image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Hydrometallurgy-based extraction of gold, silver, copper, and palladium",
      highlight: "Sustainable 'urban mining' that produces high-purity materials"
    },

    // Agri & Defense Waste (2 products)
    {
      name: "Spice Shield Oleoresin",
      category: "Agri & Defense Waste",
      price: "₹12,999",
      credits: "450 credits",
      image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Capsaicin extract from chili waste used for non-lethal defense sprays",
      highlight: "Rural, low-cost solution aligned with defense innovation"
    },
    {
      name: "Biodegradable Grenades",
      category: "Agri & Defense Waste",
      price: "₹18,999",
      credits: "650 credits",
      image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Riot-control grenades made from sugarcane bagasse and capsaicin",
      highlight: "Safe for the environment, supports local innovation in defense"
    },

    // Retail Market Waste (3 products)
    {
      name: "EcoTiles",
      category: "Retail Market Waste",
      price: "₹4,999",
      credits: "165 credits",
      image: "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Tiles made from 70% recycled plastic + 30% agro-waste",
      highlight: "Durable, stylish, thermally insulating tiles ideal for conscious consumers"
    },
    {
      name: "SkySip",
      category: "Retail Market Waste",
      price: "₹899",
      credits: "30 credits",
      image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Biodegradable bottles made from pine husk/corn starch",
      highlight: "Replaces single-use plastic; great for green hospitality branding"
    },
    {
      name: "EcoWrap Packaging",
      category: "Retail Market Waste",
      price: "₹1,299",
      credits: "45 credits",
      image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Biodegradable packaging material made from agricultural waste",
      highlight: "Sustainable alternative to plastic packaging, supports circular economy"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Waste Resources': return 'bg-green-100 text-green-700';
      case 'Tech Waste': return 'bg-blue-100 text-blue-700';
      case 'Agri & Defense Waste': return 'bg-teal-100 text-teal-700';
      case 'Retail Market Waste': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">All Products (13 Total)</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            13 innovative products across 4 verticals, designed for maximum environmental impact and circular economy solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {allProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h4>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">{product.description}</p>
                <div className="bg-teal-50 p-3 rounded-lg mb-4">
                  <p className="text-xs text-teal-700 font-medium">✓ {product.highlight}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-gray-800">{product.price}</p>
                    <p className="text-sm text-gray-600">or {product.credits}</p>
                  </div>
                </div>
                <Link 
                  to="/shop"
                  className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors block text-center"
                >
                  View in Shop
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose ReForm Products?</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our innovative approach transforms waste into valuable resources, creating sustainable solutions 
              that benefit both the environment and your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-teal-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Circular Economy</h4>
              <p className="text-gray-600 text-sm">Every product represents a closed-loop solution that minimizes waste and maximizes value.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Premium Quality</h4>
              <p className="text-gray-600 text-sm">Advanced processing techniques ensure our recycled products meet or exceed industry standards.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Environmental Impact</h4>
              <p className="text-gray-600 text-sm">Each purchase contributes to reducing landfill waste and supporting sustainable manufacturing.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/shop"
            className="bg-gradient-to-r from-teal-600 to-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-teal-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}