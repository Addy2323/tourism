import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { 
  Calendar, Users, MapPin, Phone, Mail, CreditCard, Check, ArrowLeft, 
  Star, Clock, Shield, AlertCircle, X, Award, Eye, TreePine 
} from 'lucide-react';

interface BookingFormData {
  destination: string;
  packageName: string;
  packagePrice: string;
  packageDuration: string;
  packageIncludes: string[];
  packageDescription: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  accommodation: string;
  transport: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get booking data from navigation state or URL params
  const bookingData = location.state?.bookingData;
  
  const [formData, setFormData] = useState<BookingFormData>({
    destination: bookingData?.destination || searchParams.get('destination') || '',
    packageName: bookingData?.packageName || searchParams.get('package') || '',
    packagePrice: bookingData?.packagePrice || searchParams.get('price') || '',
    packageDuration: bookingData?.packageDuration || searchParams.get('duration') || '',
    packageIncludes: bookingData?.packageIncludes || [],
    packageDescription: bookingData?.packageDescription || '',
    startDate: '',
    endDate: '',
    adults: 2,
    children: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    accommodation: 'standard',
    transport: 'included',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Redirect if no booking data is available
  useEffect(() => {
    if (!formData.destination || !formData.packageName) {
      navigate('/destinations');
    }
  }, [formData.destination, formData.packageName, navigate]);

  // Validation and helper functions will go here
  const validateStep = (step: number): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    if (step === 1) {
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.endDate) newErrors.endDate = 'End date is required';
      if (formData.adults < 1) newErrors.adults = 'At least 1 adult is required';
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    
    if (step === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (step === 3) {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      if (!formData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
      if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (formData.cvv && formData.cvv.length < 3) {
        newErrors.cvv = 'CVV must be at least 3 digits';
      }
    }
    
    return newErrors;
  };

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const calculateTotal = () => {
    const basePrice = parseFloat(formData.packagePrice.replace(/[^0-9.]/g, '')) || 0;
    const adultPrice = basePrice * formData.adults;
    const childPrice = basePrice * 0.7 * formData.children;
    const accommodationFee = formData.accommodation === 'luxury' ? 200 : formData.accommodation === 'premium' ? 100 : 0;
    const transportFee = formData.transport === 'private' ? 150 : 0;
    
    return adultPrice + childPrice + accommodationFee + transportFee;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(3);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page or show success message
      navigate('/booking-success', { 
        state: { 
          bookingData: formData,
          bookingId: 'BKG' + Date.now(),
          total: calculateTotal()
        }
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Details</h3>
            
            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>

            {/* Guest Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Adults
                </label>
                <select
                  value={formData.adults}
                  onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.adults ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
                {errors.adults && <p className="text-red-500 text-sm mt-1">{errors.adults}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Children
                </label>
                <select
                  value={formData.children}
                  onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {[0, 1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Accommodation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Accommodation Level</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'standard', label: 'Standard', price: 0, desc: 'Comfortable lodges' },
                  { value: 'premium', label: 'Premium', price: 100, desc: 'Luxury lodges' },
                  { value: 'luxury', label: 'Luxury', price: 200, desc: 'Ultra-luxury resorts' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('accommodation', option.value)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.accommodation === option.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                    <p className="text-emerald-600 font-semibold mt-1">
                      {option.price > 0 ? `+$${option.price}` : 'Included'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Transport Option</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'included', label: 'Group Transport', price: 0, desc: 'Shared safari vehicle' },
                  { value: 'private', label: 'Private Vehicle', price: 150, desc: 'Dedicated safari vehicle' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('transport', option.value)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.transport === option.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                    <p className="text-emerald-600 font-semibold mt-1">
                      {option.price > 0 ? `+$${option.price}` : 'Included'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                rows={4}
                placeholder="Any dietary restrictions, accessibility needs, or special requests..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h3>
            
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Secure Payment</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Your payment information is encrypted and secure. We use industry-standard SSL encryption.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="w-4 h-4 inline mr-2" />
                Card Number
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                  handleInputChange('cardNumber', value);
                }}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                    handleInputChange('expiryDate', value);
                  }}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    handleInputChange('cvv', value);
                  }}
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Name as it appears on card"
              />
              {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
            </div>

            {/* Final Total */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-emerald-600">${calculateTotal()}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Base price ({formData.adults} adults, {formData.children} children):</span>
                  <span>${(parseFloat(formData.packagePrice.replace(/[^0-9.]/g, '')) || 0) * formData.adults + (parseFloat(formData.packagePrice.replace(/[^0-9.]/g, '')) || 0) * 0.7 * formData.children}</span>
                </div>
                {formData.accommodation !== 'standard' && (
                  <div className="flex justify-between">
                    <span>Accommodation upgrade:</span>
                    <span>+${formData.accommodation === 'luxury' ? 200 : 100}</span>
                  </div>
                )}
                {formData.transport === 'private' && (
                  <div className="flex justify-between">
                    <span>Private transport:</span>
                    <span>+$150</span>
                  </div>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">Booking Error</span>
                </div>
                <p className="text-red-700 text-sm mt-1">{errors.submit}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!formData.destination || !formData.packageName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking data found</h2>
          <p className="text-gray-600 mb-6">Please select a package from one of our destinations.</p>
          <button
            onClick={() => navigate('/destinations')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Browse Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {formData.destination}</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Secure your adventure in {formData.destination}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-20">
            <span className={`text-sm ${currentStep >= 1 ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
              Trip Details
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
              Personal Info
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
              Payment
            </span>
          </div>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900">{formData.destination}</h4>
              <p className="text-emerald-600 font-semibold">{formData.packageName}</p>
              <p className="text-sm text-gray-600">{formData.packageDuration}</p>
              <p className="text-lg font-bold text-gray-900 mt-2">Total: ${calculateTotal()}</p>
            </div>
            {formData.packageIncludes.length > 0 && (
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Includes:</h5>
                <ul className="space-y-1">
                  {formData.packageIncludes.slice(0, 4).map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Form steps will be added in the next part */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Complete Booking'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;