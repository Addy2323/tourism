import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  User,
  Search,
  Home,
  Map,
  Compass,
  Calendar,
  Users,
  Book,
  Info,
  Phone,
  CreditCard, // New icon for Green Card
} from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Destinations', href: '/destinations', icon: Map },
    { name: 'Experiences', href: '/experiences', icon: Compass },
    { name: 'Plan Your Trip', href: '/plan-your-trip', icon: Calendar },
    { name: 'Community Impact', href: '/impact', icon: Users },
    { name: 'Blog', href: '/blog', icon: Book },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
    // New item added
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white/90 shadow-md backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Babblers Tours Logo"
              className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-semibold transition-colors duration-200 ${
                  isScrolled
                    ? 'text-gray-800 hover:text-emerald-600'
                    : 'text-white hover:text-gray-200'
                } ${location.pathname === item.href ? '!text-emerald-500' : ''}`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-600 hover:text-emerald-600'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={onAuthClick}
              className="flex items-center justify-center w-12 h-12 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg transform hover:scale-110"
            >
              <User className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled
                  ? 'text-gray-600 hover:text-emerald-600'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm lg:hidden bg-emerald-50 shadow-xl transition-all duration-300 ease-in-out transform z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Section */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
              <img
                src="/images/logo.png"
                alt="Babblers Tours Logo"
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm" 
              />
              <span className="text-white font-bold text-lg">Babblers Tours</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto bg-emerald-50">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 font-medium text-base group ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-600 shadow-sm'
                      : 'bg-emerald-50 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-emerald-600' : 'text-gray-500 group-hover:text-emerald-600'
                  }`} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-emerald-200 bg-emerald-50 p-4 space-y-3">
            {/* Search Button */}
            <button className="w-full flex items-center justify-center space-x-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 py-3 px-4 rounded-xl font-medium transition-colors">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
            
            {/* Auth Button */}
            <button
              onClick={onAuthClick}
              className="w-full flex items-center justify-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-sm"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;