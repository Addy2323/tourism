import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, Home, Map, Compass, Calendar, Users, Book, Info, Phone } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
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
                className={`relative text-sm font-semibold transition-colors duration-200 ${isScrolled ? 'text-gray-800 hover:text-emerald-600' : 'text-white hover:text-gray-200'} ${location.pathname === item.href ? '!text-emerald-500' : ''}`}>
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className={`p-2 rounded-full transition-colors duration-200 ${isScrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white hover:text-gray-200'}`}>
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
              className={`p-2 rounded-md transition-colors duration-200 ${isScrolled ? 'text-gray-600 hover:text-emerald-600' : 'text-white hover:text-gray-200'}`}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        <nav className="px-4 pt-4 pb-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg p-3 transition-all duration-200 font-semibold ${location.pathname === item.href ? 'text-emerald-600 bg-emerald-50' : ''}`}>
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="border-t pt-4 space-y-2">
             <button className="w-full flex items-center space-x-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg p-3 transition-all duration-200 font-semibold">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
              <button 
                onClick={onAuthClick}
                className="w-full flex items-center space-x-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg p-3 transition-all duration-200 font-semibold">
                <User className="w-5 h-5" />
                <span>Sign In / Register</span>
              </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;