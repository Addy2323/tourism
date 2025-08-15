import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe', // Default name for login simulation
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login
    login({ name: formData.name, email: formData.email, role: 'user' });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slideUp overflow-hidden">
        {/* Header with Green Background */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 text-center relative">
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
              className="w-12 h-12 mx-auto rounded-full border-2 border-white shadow-lg"
            />
          </div>
          
          {/* Welcome Message */}
          <h2 className="text-lg font-bold mb-1">
            {isLogin ? 'Welcome Back to' : 'Join with'}
          </h2>
          <h3 className="text-base font-semibold text-emerald-100">
            Babblers Tours
          </h3>
          <p className="text-emerald-100 text-xs mt-1">
            {isLogin ? 'Continue your Tanzania adventure' : 'Start your Tanzania adventure today'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
                  className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
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
                className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
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
                className="w-full pl-9 pr-10 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
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
                  className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
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
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLogin ? 'Sign In' : 'Join Babblers Tours'}
          </button>
        </form>

        {/* Footer */}
        <div className="px-4 py-3 bg-emerald-50 text-center border-t border-emerald-100">
          <p className="text-xs text-gray-600">
            {isLogin ? "New to Babblers Tours?" : "Already exploring with us?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-1 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 text-sm"
          >
            {isLogin ? 'Join with Babblers Tours' : 'Welcome back to Babblers Tours'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;