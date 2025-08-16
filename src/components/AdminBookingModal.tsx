import React, { useState, useEffect } from 'react';
import { X, Calendar, User, MapPin, DollarSign, Clock, CheckCircle, AlertTriangle, CreditCard } from 'lucide-react';

export interface BookingData {
  id?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  totalPrice: number;
  paidAmount: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'Refunded';
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Refunded';
  bookingDate: string;
  specialRequests: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  accommodation: string;
  transportation: string;
  meals: string;
  guide: string;
  notes: string;
}

interface AdminBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: BookingData;
  onSave: (booking: BookingData) => void;
}

const AdminBookingModal: React.FC<AdminBookingModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSave
}) => {
  const [formData, setFormData] = useState<BookingData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    destination: '',
    startDate: '',
    endDate: '',
    groupSize: 1,
    totalPrice: 0,
    paidAmount: 0,
    status: 'Pending',
    paymentStatus: 'Pending',
    bookingDate: new Date().toISOString().split('T')[0],
    specialRequests: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    accommodation: '',
    transportation: '',
    meals: '',
    guide: '',
    notes: ''
  });

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    } else {
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        destination: '',
        startDate: '',
        endDate: '',
        groupSize: 1,
        totalPrice: 0,
        paidAmount: 0,
        status: 'Pending',
        paymentStatus: 'Pending',
        bookingDate: new Date().toISOString().split('T')[0],
        specialRequests: '',
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        },
        accommodation: '',
        transportation: '',
        meals: '',
        guide: '',
        notes: ''
      });
    }
  }, [booking, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof BookingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmergencyContactChange = (field: keyof BookingData['emergencyContact'], value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-emerald-600 bg-emerald-50';
      case 'Pending': return 'text-amber-600 bg-amber-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      case 'Completed': return 'text-blue-600 bg-blue-50';
      case 'Refunded': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <select
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select destination</option>
            <option value="Serengeti National Park">Serengeti National Park</option>
            <option value="Zanzibar Beach">Zanzibar Beach</option>
            <option value="Mount Kilimanjaro">Mount Kilimanjaro</option>
            <option value="Ngorongoro Crater">Ngorongoro Crater</option>
            <option value="Tarangire National Park">Tarangire National Park</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
          <input
            type="number"
            value={formData.groupSize}
            onChange={(e) => handleInputChange('groupSize', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any special dietary requirements, accessibility needs, etc."
        />
      </div>
    </div>
  );

  const renderPaymentStatus = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="text-emerald-600" size={20} />
            <h4 className="font-semibold text-gray-900">Pricing Information</h4>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Price ($)</label>
              <input
                type="number"
                value={formData.totalPrice}
                onChange={(e) => handleInputChange('totalPrice', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount ($)</label>
              <input
                type="number"
                value={formData.paidAmount}
                onChange={(e) => handleInputChange('paidAmount', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                max={formData.totalPrice}
              />
            </div>
            <div className="pt-2 border-t border-emerald-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Remaining Balance:</span>
                <span className="font-semibold text-emerald-600">
                  ${(formData.totalPrice - formData.paidAmount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="text-blue-600" size={20} />
            <h4 className="font-semibold text-gray-900">Status Management</h4>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div className="pt-2">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(formData.status)}`}>
                {formData.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
          <select
            value={formData.accommodation}
            onChange={(e) => handleInputChange('accommodation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select accommodation</option>
            <option value="Luxury Lodge">Luxury Lodge</option>
            <option value="Safari Camp">Safari Camp</option>
            <option value="Budget Hotel">Budget Hotel</option>
            <option value="Camping">Camping</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
          <select
            value={formData.transportation}
            onChange={(e) => handleInputChange('transportation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select transportation</option>
            <option value="4WD Safari Vehicle">4WD Safari Vehicle</option>
            <option value="Minibus">Minibus</option>
            <option value="Private Car">Private Car</option>
            <option value="Flight">Flight</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meals</label>
          <select
            value={formData.meals}
            onChange={(e) => handleInputChange('meals', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select meal plan</option>
            <option value="Full Board">Full Board</option>
            <option value="Half Board">Half Board</option>
            <option value="Breakfast Only">Breakfast Only</option>
            <option value="Self Catering">Self Catering</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guide</label>
          <input
            type="text"
            value={formData.guide}
            onChange={(e) => handleInputChange('guide', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Guide name or assignment"
          />
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <User className="text-amber-600" size={20} />
          <h4 className="font-semibold text-gray-900">Emergency Contact</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.emergencyContact.name}
              onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Emergency contact name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.emergencyContact.phone}
              onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 987-6543"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <select
              value={formData.emergencyContact.relationship}
              onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Internal notes for staff..."
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {booking ? 'Edit Booking' : 'Create New Booking'}
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
        <div className="border-b border-gray-200 flex-shrink-0">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basic', label: 'Basic Info', icon: User },
              { id: 'payment', label: 'Payment & Status', icon: CreditCard },
              { id: 'services', label: 'Services & Notes', icon: MapPin }
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
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'payment' && renderPaymentStatus()}
            {activeTab === 'services' && renderServices()}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
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
                {booking ? 'Update Booking' : 'Create Booking'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBookingModal;
