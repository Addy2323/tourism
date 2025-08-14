import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white pt-24 pb-12 overflow-hidden">
      
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-emerald-800"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Babblers Tours Logo" 
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-gray-200 leading-relaxed">
              Discover the magic of Tanzania with authentic experiences, responsible tourism, and meaningful community impact. Your adventure awaits in the heart of East Africa.
            </p>
          </div>

          {/* Column 2: Get in Touch */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-4">
              <a href="tel:+255765696445" className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-emerald-300" />
                <span>+255 765 696 445</span>
              </a>
              <a href="tel:+255758142203" className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-emerald-300" />
                <span>+255 758 142 203</span>
              </a>
              <a href="mailto:reservations@babblertours.com" className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-emerald-300" />
                <span>reservations@babblertours.com</span>
              </a>
              <a href="mailto:info@babblertours.com" className="flex items-center space-x-3 text-gray-200 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-emerald-300" />
                <span>info@babblertours.com</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-200">
                <MapPin className="w-5 h-5 text-emerald-300" />
                <span>Arusha City, Tanzania</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white"><Facebook/></a>
              <a href="#" className="text-gray-300 hover:text-white"><Twitter/></a>
              <a href="#" className="text-gray-300 hover:text-white"><Instagram/></a>
            </div>
          </div>

          {/* Column 3: Recommended On */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Recommended On</h4>
            <div className="space-y-4">
              <img src="/safaribookings-logo.png" alt="SafariBookings.com" className="h-12 w-auto"/>
              <img src="/tripadvisor-logo.png" alt="Tripadvisor" className="h-12 w-auto"/>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-emerald-500 text-center text-gray-200 text-sm">
          <p>Copyright 2025 Babbler Tours | Designed by Codeafrica Ltd | All Rights Reserved</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
