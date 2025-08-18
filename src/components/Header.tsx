import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Building,
  UserCheck,
  Truck,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CurrencySelector from './CurrencySelector';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const aboutButtonRef = useRef<HTMLDivElement | null>(null);
  const aboutPortalRef = useRef<HTMLDivElement | null>(null);
  const [aboutPos, setAboutPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isDashboardPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');
  const isBookingPage = location.pathname.startsWith('/booking');
  const useDarkText = (isScrolled || isBookingPage) && !isDashboardPage;

  const aboutSubmenuItems = [
    { name: 'About Big Time Adventures', href: '/about/company', icon: Building },
    { name: 'Our Team', href: '/about/team', icon: UserCheck },
    { name: 'Our Vehicles', href: '/about/vehicles', icon: Truck },
  ];

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Destinations', href: '/destinations', icon: Map },
    { name: 'Experiences', href: '/experiences', icon: Compass },
    { name: 'Plan Your Trip', href: '/plan-your-trip', icon: Calendar },
    { name: 'Community Impact', href: '/impact', icon: Users },
    { name: 'Blog', href: '/blog', icon: Book },
    { name: 'About', href: '/about', icon: Info, hasSubmenu: true },
    { name: 'Contact', href: '/contact', icon: Phone },
    ...(isAuthenticated ? [{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updatePos = () => {
      if (!aboutButtonRef.current) return;
      const rect = aboutButtonRef.current.getBoundingClientRect();
      // For fixed positioning, use viewport coordinates (no scroll offsets)
      const dropdownWidth = 256; // w-64
      const padding = 8; // small offset below the button
      const maxLeft = Math.max(0, window.innerWidth - dropdownWidth - 8);
      const left = Math.min(Math.max(8, rect.left), maxLeft);
      const top = rect.bottom + padding;
      setAboutPos({ top, left, width: rect.width });
    };
    if (aboutDropdownOpen) {
      updatePos();
      window.addEventListener('scroll', updatePos, { passive: true });
      window.addEventListener('resize', updatePos);
    }
    return () => {
      window.removeEventListener('scroll', updatePos as any);
      window.removeEventListener('resize', updatePos as any);
    };
  }, [aboutDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (isMenuOpen && !(target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }

      if (aboutDropdownOpen) {
        const insideAboutButton = aboutButtonRef.current?.contains(target);
        const insideAboutPortal = aboutPortalRef.current?.contains(target);
        const insideLegacyAbout = (target as Element).closest?.('.about-dropdown');
        if (!insideAboutButton && !insideAboutPortal && !insideLegacyAbout) {
          setAboutDropdownOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, aboutDropdownOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 isolate ${
        isDashboardPage
          ? 'bg-emerald-800 shadow-classic'
          : (isScrolled || isMenuOpen || isBookingPage)
          ? 'bg-white/95 shadow-classic backdrop-blur-md border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-mobile relative">
        {/* Top Row: Logo + Actions (desktop), full header (mobile) */}
        <div className="flex items-center justify-between h-20 lg:h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/images/logo.png"
                  alt="Babblers Tours Logo"
                  className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-classic transition-all duration-300 group-hover:scale-110 group-hover:shadow-classic-lg"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-amber-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className={`hidden sm:block transition-colors duration-300 ${
                useDarkText ? 'text-gray-800' : 'text-white'
              }`}>
                <h2 className="text-xl font-bold tracking-tight">Babblers Tours</h2>
                <p className="text-xs opacity-75 font-medium">Authentic Tanzania</p>
              </div>
            </div>
          </Link>

          {/* Enhanced Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <CurrencySelector className={`h-10 min-w-[88px] px-3 text-xs truncate ${useDarkText ? 'bg-white border-gray-200 text-gray-700' : 'bg-white/90 text-gray-800 border border-white/20'} shadow-sm`} />
            <button
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 group ${
                useDarkText
                  ? 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full shadow-classic">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-classic-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                  <div className="p-2">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-semibold text-sm text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link 
                      to={user?.role === 'admin' ? '/admin' : '/dashboard'} 
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-md"
                    >
                      {user?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>
                    <button onClick={logout} className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-md">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-classic hover:shadow-classic-lg transform hover:scale-110 group"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                useDarkText
                  ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Second Row: Desktop Nav */}
        <div className="hidden lg:block">
          <nav className="relative z-[100] flex items-center justify-center border-t border-white/10 pt-3 pb-6">
            <div className="relative flex items-center max-w-[1200px] w-full overflow-x-auto overflow-y-visible no-scrollbar whitespace-nowrap gap-1 justify-center px-2">
              {navItems.map((item) => (
                <div key={item.name} className="relative about-dropdown">
                  {item.hasSubmenu ? (
                    <div className="relative" ref={aboutButtonRef}>
                      <button
                        onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                        className={`relative px-4 md:px-5 py-2 text-[13px] md:text-sm font-semibold rounded-full transition-all duration-200 group flex items-center gap-2 border ${
                          useDarkText
                            ? 'text-gray-700 border-emerald-600/50 hover:bg-emerald-50 hover:text-emerald-700'
                            : 'text-white border-white/40 hover:bg-white/10 hover:text-white'
                        } ${location.pathname.startsWith(item.href) ?
                          (useDarkText
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-600/70'
                            : 'bg-white/10 text-white border-emerald-300')
                          : ''}`}
                      >
                        <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {aboutDropdownOpen && typeof document !== 'undefined' && createPortal(
                        <div
                          ref={aboutPortalRef}
                          className="fixed w-64 bg-white rounded-xl shadow-classic-lg border border-gray-100 py-2 z-[200]"
                          style={{ top: aboutPos.top, left: aboutPos.left }}
                        >
                          {aboutSubmenuItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                onClick={() => setAboutDropdownOpen(false)}
                              >
                                <SubIcon className="w-4 h-4" />
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>,
                        (document.getElementById('portal-root') as HTMLElement) || document.body
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`relative px-4 md:px-5 py-2 text-[13px] md:text-sm font-semibold rounded-full transition-all duration-200 group border ${
                        useDarkText
                          ? 'text-gray-700 border-emerald-600/50 hover:bg-emerald-50 hover:text-emerald-700'
                          : 'text-white/90 border-white/40 hover:bg-white/10 hover:text-white'
                      } ${location.pathname === item.href ? 
                          (useDarkText
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-600/70'
                            : 'bg-white/10 text-white border-emerald-300')
                        : ''}`}
                    >
                      <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <div
        className={`mobile-menu fixed top-0 right-0 bottom-0 w-[70vw] xs:w-[72vw] sm:w-[300px] max-w-[300px] lg:hidden bg-emerald-800 text-white shadow-classic-xl transition-transform duration-300 ease-out transform z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Enhanced Mobile Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-emerald-700 to-emerald-800">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group" 
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/images/logo.png"
                alt="Babblers Tours Logo"
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform" 
              />
              <div className="text-white">
                <h3 className="font-bold text-lg tracking-wide">Babblers Tours</h3>
                <p className="text-xs opacity-90">Authentic Tanzania</p>
              </div>
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Links */}
        <nav className="flex-1 overflow-y-auto bg-emerald-800">
          <div className="p-4 space-y-1">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href || (item.hasSubmenu && location.pathname.startsWith(item.href));
              
              return (
                <div key={item.name}>
                  {item.hasSubmenu ? (
                    <div className="space-y-1 about-dropdown">
                      <button
                        onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 font-semibold tracking-wide text-sm uppercase group ${
                          isActive
                            ? 'bg-white/10 text-white border-l-4 border-white shadow-sm'
                            : 'text-white/90 hover:bg-white/5 hover:text-white'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isActive ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/15'
                          }`}>
                            <IconComponent className={`w-5 h-5 transition-colors ${
                              isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                            }`} />
                          </div>
                          <span className="flex-1">{item.name}</span>
                        </div>
                        
                        <ChevronDown className={`w-4 h-4 transition-all duration-200 ${
                          aboutDropdownOpen ? 'rotate-180' : ''
                        } ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                      </button>
                      
                      {/* Mobile Submenu */}
                      {aboutDropdownOpen && (
                        <div className="ml-4 space-y-1">
                          {aboutSubmenuItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = location.pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200 text-xs tracking-wide uppercase ${
                                  isSubActive
                                    ? 'bg-white/10 text-white border-l-2 border-white'
                                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <SubIcon className="w-4 h-4" />
                                <span>{subItem.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 font-semibold tracking-wide text-sm uppercase group ${
                        isActive
                          ? 'bg-white/10 text-white border-l-4 border-white shadow-sm'
                          : 'text-white/90 hover:bg-white/5 hover:text-white'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isActive ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/15'
                        }`}>
                          <IconComponent className={`w-5 h-5 transition-colors ${
                            isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                          }`} />
                        </div>
                        <span className="flex-1">{item.name}</span>
                      </div>
                      
                      <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
                        isActive ? 'text-white' : 'text-white/60 group-hover:text-white group-hover:translate-x-1'
                      }`} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enhanced Bottom Actions */}
          <div className="border-t border-white/10 bg-emerald-800 p-4 space-y-3">
            {/* Currency Selector */}
            <div className="w-full">
              <CurrencySelector className="w-full bg-white text-gray-700" />
            </div>
            {/* Search Button */}
            <button className="w-full flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/15 text-white py-3 px-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-200 border border-white/10">
              <Search className="w-5 h-5" />
              <span>Search Destinations</span>
            </button>
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-lg font-semibold tracking-wide text-sm uppercase transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;