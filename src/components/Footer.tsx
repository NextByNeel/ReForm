import React from 'react';
import { Recycle, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const handleSolutionClick = () => {
    window.open('https://reformg.tiiny.site/#solution', '_blank');
  };

  const handleTeamClick = () => {
    window.open('https://reformg.tiiny.site/#team', '_blank');
  };

  const handleCareerClick = () => {
    window.open('https://reformg.tiiny.site/#careers', '_blank');
  };

  const handleContactClick = () => {
    window.open('https://reformg.tiiny.site/#contact', '_blank');
  };

  const handleAgriCycleClick = () => {
    window.open('http://reformg.tiiny.site/AgriCycle.html', '_blank');
  };

  const handleCircuitBackClick = () => {
    window.open('http://reformg.tiiny.site/circuitback.html', '_blank');
  };

  const handleResourcefulClick = () => {
    window.open('http://reformg.tiiny.site/Resourceful.html', '_blank');
  };

  const handleReNewRetailClick = () => {
    window.open('http://reformg.tiiny.site/ReNewRetail.html', '_blank');
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Recycle className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-2xl font-extrabold">ReForm<span className="text-teal-500">.</span></span>
            </div>
            <p className="text-gray-300 mb-6">
              Turning today's waste into tomorrow's resources. Leading the future of waste management 
              through innovative solutions and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Our Ventures */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Our Ventures</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={handleAgriCycleClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  AgriCycle
                </button>
              </li>
              <li>
                <button 
                  onClick={handleCircuitBackClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  CircuitBack
                </button>
              </li>
              <li>
                <button 
                  onClick={handleResourcefulClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  Resourceful
                </button>
              </li>
              <li>
                <button 
                  onClick={handleReNewRetailClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  ReNew Retail
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={handleTeamClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  Team
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSolutionClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  Solution
                </button>
              </li>
              <li>
                <button 
                  onClick={handleCareerClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={handleContactClick}
                  className="hover:text-teal-500 transition-colors text-left"
                >
                  Contact us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Contact Info</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-teal-500" />
                <span>info@reform.dev</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-teal-500" />
                <span>+91 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-teal-500" />
                <span>Mumbai, India</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 uppercase tracking-wider">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-teal-500 text-white"
                />
                <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 ReForm. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-500 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-teal-500 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-teal-500 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}