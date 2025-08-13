import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Tanzania Safari"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover the
            <span className="text-amber-400 block">Magic of Tanzania</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience authentic adventures, breathtaking wildlife, and rich culture 
            while making a positive impact on local communities.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Watch Our Story
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <select className="w-full border-none bg-transparent text-gray-900 focus:outline-none">
                    <option>Serengeti</option>
                    <option>Kilimanjaro</option>
                    <option>Zanzibar</option>
                    <option>Ngorongoro</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">When</label>
                  <input type="date" className="w-full border-none bg-transparent text-gray-900 focus:outline-none" />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <Users className="w-5 h-5 text-emerald-600" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Travelers</label>
                  <select className="w-full border-none bg-transparent text-gray-900 focus:outline-none">
                    <option>2 Adults</option>
                    <option>1 Adult</option>
                    <option>Family (4+)</option>
                    <option>Group (8+)</option>
                  </select>
                </div>
              </div>
              
              <button className="bg-emerald-600 text-white p-4 rounded-xl hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Search className="w-5 h-5" />
                <span className="ml-2 font-semibold">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;