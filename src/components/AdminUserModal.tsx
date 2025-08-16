import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Shield, CheckCircle, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { UserData } from '../data/adminMockData';

interface AdminUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserData;
  onSave: (user: UserData) => void;
}

const AdminUserModal: React.FC<AdminUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const [formData, setFormData] = useState<UserData>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    location: '',
    joinDate: new Date().toISOString().split('T')[0],
    role: 'user',
    status: 'Active',
    verified: false,
    totalBookings: 0,
    totalSpent: 0,
    membershipLevel: 'Basic',
    preferences: [],
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
    generatePassword: false,
    showPassword: false,
    showConfirmPassword: false
  });

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        id: 0,
        name: '',
        email: '',
        phone: '',
        location: '',
        joinDate: new Date().toISOString().split('T')[0],
        role: 'user',
        status: 'Active',
        verified: false,
        totalBookings: 0,
        totalSpent: 0,
        membershipLevel: 'Basic',
        preferences: [],
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        }
      });
    }
    // Reset password fields when modal opens/closes
    setPasswordData({
      password: '',
      confirmPassword: '',
      generatePassword: false,
      showPassword: false,
      showConfirmPassword: false
    });
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof UserData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmergencyContactChange = (field: keyof UserData['emergencyContact'], value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordData(prev => ({
      ...prev,
      password,
      confirmPassword: password
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords if creating new user
    if (!user && passwordData.password !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!user && !passwordData.password) {
      alert('Password is required for new users!');
      return;
    }
    
    onSave(formData);
    onClose();
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="New York, USA"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Membership Level</label>
          <select
            value={formData.membershipLevel}
            onChange={(e) => handleInputChange('membershipLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.verified}
            onChange={(e) => handleInputChange('verified', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Email Verified</span>
        </label>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="text-amber-600" size={20} />
          <h4 className="font-semibold text-gray-900">Password Management</h4>
        </div>
        
        {user ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For existing users, password changes require additional verification steps in production.
              </p>
            </div>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => alert('Password reset email would be sent to user in production')}
            >
              Send Password Reset Email
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={passwordData.generatePassword}
                  onChange={(e) => {
                    const generate = e.target.checked;
                    setPasswordData(prev => ({ ...prev, generatePassword: generate }));
                    if (generate) {
                      generateRandomPassword();
                    } else {
                      setPasswordData(prev => ({ ...prev, password: '', confirmPassword: '' }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Generate Random Password</span>
              </label>
              {passwordData.generatePassword && (
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Regenerate
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={passwordData.showPassword ? 'text' : 'password'}
                    value={passwordData.password}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter password"
                    required={!user}
                    disabled={passwordData.generatePassword}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {passwordData.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={passwordData.showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm password"
                    required={!user}
                    disabled={passwordData.generatePassword}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordData(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {passwordData.showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {passwordData.password && passwordData.confirmPassword && (
              <div className="mt-2">
                {passwordData.password === passwordData.confirmPassword ? (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Passwords match</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">Passwords do not match</span>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-3 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Password Requirements:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase and lowercase letters</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="text-blue-600" size={20} />
          <h4 className="font-semibold text-gray-900">Booking Statistics</h4>
        </div>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Bookings</label>
            <input
              type="number"
              value={formData.totalBookings}
              onChange={(e) => handleInputChange('totalBookings', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent ($)</label>
            <input
              type="number"
              value={formData.totalSpent}
              onChange={(e) => handleInputChange('totalSpent', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <User className="text-emerald-600" size={20} />
          <h4 className="font-semibold text-gray-900">Account Details</h4>
        </div>
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
            <input
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleInputChange('joinDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 pt-2">
            {formData.verified ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Verified Account</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">Unverified Account</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmergencyContact = () => (
    <div className="space-y-4">
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="text-red-600" size={20} />
          <h4 className="font-semibold text-gray-900">Emergency Contact Information</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
            <input
              type="text"
              value={formData.emergencyContact.name}
              onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jane Doe"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 987-6543"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
              <select
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select relationship</option>
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Child">Child</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {user ? 'Edit User' : 'Add New User'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basic', label: 'Basic Info', icon: User },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'stats', label: 'Statistics', icon: Calendar },
              { id: 'emergency', label: 'Emergency Contact', icon: Phone }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'security' && renderSecurity()}
            {activeTab === 'stats' && renderStats()}
            {activeTab === 'emergency' && renderEmergencyContact()}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {user ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserModal;
