import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowUp, Heart, Star, Award } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ];

  const destinations = [
    { name: 'Serengeti National Park', href: '/destinations/serengeti' },
    { name: 'Mount Kilimanjaro', href: '/destinations/kilimanjaro' },
    { name: 'Ngorongoro Crater', href: '/destinations/ngorongoro' },
    { name: 'Zanzibar Island', href: '/destinations/zanzibar' }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cxgenie.ai/widget.js';
    script.async = true;
    script.setAttribute('data-aid', 'd0e42a52-5172-4875-b1e9-7f11e81048e1');
    script.setAttribute('data-lang', 'en');
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white overflow-hidden">
      
      {/* Enhanced Decorative Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          className="relative block w-full h-16 sm:h-20 lg:h-24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(16 185 129)" />
              <stop offset="50%" stopColor="rgb(5 150 105)" />
              <stop offset="100%" stopColor="rgb(6 78 59)" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-amber-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container-mobile relative z-20 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          
          {/* Column 1: Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <img 
                  src="/images/logo.png" 
                  alt="Babblers Tours Logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full object-cover border-2 border-white/30 shadow-classic transition-all duration-300 hover:scale-105 hover:border-white/60"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-amber-400/20 rounded-full blur-sm -z-10"></div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Babblers Tours</h3>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-300 ml-2">5.0 Rating</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-xs sm:text-sm lg:text-base">
              Discover the magic of Tanzania with authentic experiences, responsible tourism, and meaningful community impact.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center space-x-2 sm:space-x-4 mb-6">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                <span className="text-xs sm:text-sm text-gray-300">Licensed</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                <span className="text-xs sm:text-sm text-gray-300">Trusted</span>
              </div>
            </div>
          </div>



          {/* Column 3: Popular Destinations */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                Destinations
              </span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {destinations.map((destination, index) => (
                <li key={index}>
                  <a 
                    href={destination.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-xs sm:text-sm lg:text-base hover:translate-x-1 transform inline-block"
                  >
                    {destination.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-span-1">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6 relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                Get in Touch
              </span>
            </h4>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <a href="tel:+255765696445" className="flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-all duration-300 group text-xs sm:text-sm lg:text-base">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-600/40 transition-colors duration-300">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <span className="break-all">+255 765 696 445</span>
              </a>
              <a href="mailto:reservations@babblertours.com" className="flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-all duration-300 group text-xs sm:text-sm lg:text-base">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-600/40 transition-colors duration-300">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <span className="break-all">info@babblerstours.com</span>
              </a>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-300 text-xs sm:text-sm lg:text-base">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <span>Arusha, Tanzania</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-2 sm:space-x-2 pr-1 sm:pr-3">
              <a href="#" className="w-8 h-8 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 group">
                <Facebook className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 group">
                <Twitter className="w-4 h-4 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" aria-label="Instagram" title="Instagram" className="w-8 h-8 sm:w-8 sm:h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/20 transition-all duration-300 group">
                <Instagram strokeWidth={2.5} className="w-5 h-5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Recommendations Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="text-center text-lg font-semibold text-white mb-6">Recommended & Featured On</h4>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img src="/safaribookings-logo.png" alt="SafariBookings.com" className="h-8 sm:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <img src="/tripadvisor-logo.png" alt="Tripadvisor" className="h-8 sm:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Enhanced Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm mb-2">
            Copyright 2025 Babblers Tours. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs mb-6">
            Designed with <Heart className="w-3 h-3 text-red-400 inline mx-1" /> by Codeafrica Ltd
          </p>
          {/* Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-3 sm:p-4 rounded-full shadow-classic hover:shadow-classic-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
       
      </div>

    </footer>
    
  );
};

export default Footer;
