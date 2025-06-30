import React from 'react';
import { ArrowRight, Leaf, Recycle, Award } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700"></div>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Reimagining Urban Mining.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
          Transform India's e-waste crisis into a sustainable, profitable, and scalable opportunity 
          with our technology-driven platform and innovative circular economy solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={onGetStarted}
            className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
          >
            Explore Our Ventures
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">True Circular Value</h3>
            <p className="text-gray-200">Your old items help create new products you can own and love</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">13 Innovative Products</h3>
            <p className="text-gray-200">Across 4 verticals for comprehensive waste management solutions</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">GreenCredits System</h3>
            <p className="text-gray-200">Earn rewards for recycling and use them for exclusive products</p>
          </div>
        </div>
      </div>
    </section>
  );
}