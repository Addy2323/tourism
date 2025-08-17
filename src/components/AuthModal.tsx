import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type StoredUser = {
  name: string;
  email: string;
  password: string; // Note: plain text for demo only
  role: 'user';
};

const REGISTERED_USERS_KEY = 'registered_users';

type FlashType = '' | 'success' | 'error';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [flash, setFlash] = useState<string>('');
  const [flashType, setFlashType] = useState<FlashType>('');
  const [formData, setFormData] = useState({
    name: '', // Default name for login simulation
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const loadRegistered = (): StoredUser[] => {
    try {
      const s = localStorage.getItem(REGISTERED_USERS_KEY);
      return s ? JSON.parse(s) as StoredUser[] : [];
    } catch {
      return [];
    }
  };
  const saveRegistered = (users: StoredUser[]) => {
    try { localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users)); } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Test credentials with passwords
    const testAccounts = [
      {
        email: 'admin@babblerstours.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin' as const
      },
      {
        email: 'superadmin@babblerstours.com',
        password: 'super123',
        name: 'Super Admin',
        role: 'admin' as const
      },
      {
        email: 'user@babblerstours.com',
        password: 'user123',
        name: 'John Doe',
        role: 'user' as const
      },
      {
        email: 'sarah@example.com',
        password: 'sarah123',
        name: 'Sarah Johnson',
        role: 'user' as const
      }
    ];

    const registered = loadRegistered();

    if (isLogin) {
      // Try local registered users first
      const local = registered.find(u => u.email === formData.email && u.password === formData.password);
      if (local) {
        login({ name: local.name, email: local.email, role: 'user' });
        onClose();
        navigate('/dashboard', { replace: true });
        return;
      }

      // Fallback: test accounts
      const account = testAccounts.find(acc => 
        acc.email === formData.email && acc.password === formData.password
      );

      if (account) {
        login({ name: account.name, email: account.email, role: account.role });
        onClose();
        if (account.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setFlashType('error');
        setFlash('Invalid email or password. If you are new, please register.');
        setTimeout(() => { setFlash(''); setFlashType(''); }, 6000);
      }
    } else {
      // Registration flow
      if (!formData.name.trim()) {
        alert('Please enter your full name.');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      // Prevent duplicate emails (across registered and test accounts)
      const exists = registered.some(u => u.email === formData.email) || testAccounts.some(t => t.email === formData.email);
      if (exists) {
        alert('An account with this email already exists. Please log in.');
        return;
      }

      const newUser: StoredUser = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: 'user'
      };

      const updated = [newUser, ...registered];
      saveRegistered(updated);

      setIsLogin(true);
      setFlashType('success');
      setFlash('Account created successfully! Please sign in to continue.');
      setFormData(prev => ({ ...prev, email: newUser.email, password: '', confirmPassword: '' }));
      setTimeout(() => { setFlash(''); setFlashType(''); }, 6000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start short:items-center justify-center p-2 xs:p-3 pt-4 short:pt-6 sm:p-4 sm:pt-10 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[22rem] xs:max-w-sm sm:max-w-md md:max-w-lg 2xl:max-w-xl animate-slideUp overflow-hidden">
        {/* Header with Green Background */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-3 sm:p-4 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
          
          {/* Logo */}
          <div className="mb-2">
            <img
              src="/images/logo.png"
              alt="Babblers Tours"
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border-2 border-white shadow-lg"
            />
          </div>
          
          {/* Welcome Message */}
          <h2 className="text-base sm:text-lg font-bold mb-1">
            {isLogin ? 'Welcome Back to' : 'Join with'}
          </h2>
          <h3 className="text-sm sm:text-base font-semibold text-emerald-100">
            Babblers Tours
          </h3>
          <p className="text-emerald-100 text-[11px] sm:text-xs mt-1">
            {isLogin ? 'Continue your Tanzania adventure' : 'Start your Tanzania adventure today'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 xs:p-4 space-y-3 sm:space-y-4">
          {isLogin && flash && (
            <div className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-lg border shadow-sm animate-slideDown ${
              flashType === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}>
              <div className="mt-0.5">
                {flashType === 'error' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-red-600">
                    <path fillRule="evenodd" d="M9.401 3.004a3.75 3.75 0 0 1 5.197 0l6.398 6.397a3.75 3.75 0 0 1 0 5.197l-6.398 6.398a3.75 3.75 0 0 1-5.197 0L3.004 14.598a3.75 3.75 0 0 1 0-5.197l6.397-6.397Zm3.099 4.246a.75.75 0 0 0-1.5 0v5.25a.75.75 0 0 0 1.5 0V7.25Zm-.75 8.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-2.59a.75.75 0 10-1.22-.86l-3.284 4.662-1.69-1.69a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.155-.094l3.85-5.328z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="text-sm">
                <p className="font-semibold">{flashType === 'error' ? 'Sign-in Failed' : 'Registration Successful'}</p>
                <p className={flashType === 'error' ? 'text-red-700' : 'text-emerald-700'}>{flash}</p>
              </div>
              <button type="button" onClick={() => { setFlash(''); setFlashType(''); }} className={`${flashType === 'error' ? 'text-red-700 hover:text-red-900' : 'text-emerald-700 hover:text-emerald-900'} ml-auto`}>✕</button>
            </div>
          )}
          {!isLogin && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-8 sm:pl-9 pr-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-8 sm:pl-9 pr-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-8 sm:pl-9 pr-10 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-8 sm:pl-9 pr-3 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                <span className="ml-2 text-xs text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 sm:transform sm:hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            {isLogin ? 'Sign In' : 'Join Babblers Tours'}
          </button>
        </form>

        {/* Footer */}
        <div className="px-3 xs:px-4 py-2.5 sm:py-3 bg-emerald-50 text-center border-t border-emerald-100">
          <p className="text-xs text-gray-600">
            {isLogin ? "New to Babblers Tours?" : "Already exploring with us?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 text-xs sm:text-sm"
          >
            {isLogin ? 'Join with Babblers Tours' : 'Welcome back to Babblers Tours'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;