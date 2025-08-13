import React, { useState } from 'react';
import { Calendar, Users, MapPin, Phone, Mail, CreditCard, Check, ArrowLeft, Star, Clock, Shield, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Import experience images
import serengetiImage from "@/assets/serengeti-safari.jpg";
import kilimanjaroImage from "@/assets/kilimanjaro-trek.jpg";
import zanzibarImage from "@/assets/zanzibar-beach.jpg";
import ngorongoroImage from "@/assets/ngorongoro-crater.jpg";

interface BookingFormData {
  experience: string;
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

const BookingForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    experience: '',
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

  const experiences = [
    {
      id: 'serengeti-safari',
      name: 'Serengeti Big Five Safari',
      duration: '4 days',
      price: 1800,
      image: serengetiImage,
      description: 'Experience the legendary Serengeti National Park and witness the Big Five in their natural habitat.',
      includes: ['Game drives', 'Professional guide', 'Park fees', 'Meals']
    },
    {
      id: 'kilimanjaro-trek',
      name: 'Mount Kilimanjaro Machame Route',
      duration: '7 days',
      price: 2400,
      image: kilimanjaroImage,
      description: 'Conquer Africa\'s highest peak via the scenic Machame route with experienced guides.',
      includes: ['Mountain guide', 'Camping equipment', 'All meals', 'Park permits']
    },
    {
      id: 'zanzibar-beach',
      name: 'Zanzibar Beach Paradise',
      duration: '5 days',
      price: 1200,
      image: zanzibarImage,
      description: 'Relax on pristine white sand beaches and explore the historic Stone Town.',
      includes: ['Beach resort', 'Stone Town tour', 'Spice tour', 'Dhow cruise']
    },
    {
      id: 'ngorongoro-crater',
      name: 'Ngorongoro Crater Safari',
      duration: '3 days',
      price: 1500,
      image: ngorongoroImage,
      description: 'Explore the world\'s largest intact volcanic caldera, home to diverse wildlife.',
      includes: ['Crater tour', 'Lodge accommodation', 'All meals', 'Game drives']
    }
  ];

  const selectedExperience = experiences.find(exp => exp.id === formData.experience);

  const validateStep = (step: number): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.experience) {
          newErrors.experience = 'Please select an experience to continue';
        }
        break;

      case 2:
        if (!formData.startDate) {
          newErrors.startDate = 'Start date is required';
        } else {
          const startDate = new Date(formData.startDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (startDate < today) {
            newErrors.startDate = 'Start date cannot be in the past';
          }
        }

        if (!formData.endDate) {
          newErrors.endDate = 'End date is required';
        } else if (formData.startDate && formData.endDate) {
          const startDate = new Date(formData.startDate);
          const endDate = new Date(formData.endDate);
          
          if (endDate <= startDate) {
            newErrors.endDate = 'End date must be after start date';
          }
        }
        break;

      case 3:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        }

        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[1-9]\d{8,14}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number (e.g., +1234567890)';
        }
        break;

      case 4:
        if (!formData.cardNumber.trim()) {
          newErrors.cardNumber = 'Card number is required';
        } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
          newErrors.cardNumber = 'Please enter a valid card number';
        }

        if (!formData.expiryDate.trim()) {
          newErrors.expiryDate = 'Expiry date is required';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = 'Please enter date in MM/YY format';
        } else {
          const [month, year] = formData.expiryDate.split('/');
          const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
          const now = new Date();
          
          if (expiry < now) {
            newErrors.expiryDate = 'Card has expired';
          }
        }

        if (!formData.cvv.trim()) {
          newErrors.cvv = 'CVV is required';
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
          newErrors.cvv = 'CVV must be 3 or 4 digits';
        }

        if (!formData.cardholderName.trim()) {
          newErrors.cardholderName = 'Cardholder name is required';
        } else if (formData.cardholderName.trim().length < 3) {
          newErrors.cardholderName = 'Cardholder name is too short';
        }
        break;
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for the field that was just changed
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);
    setErrors(stepErrors);
    
    if (Object.keys(stepErrors).length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors before proceeding to the next step.",
      });
      return;
    }
    
    toast({
      title: "Step Completed",
      description: `Step ${currentStep} completed successfully!`,
    });
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalErrors = validateStep(4);
    setErrors(finalErrors);
    
    if (Object.keys(finalErrors).length > 0) {
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Please check your payment information and try again.",
      });
      return;
    }
    
    toast({
      title: "Booking Confirmed!",
      description: "Your Tanzania adventure has been booked successfully. We'll contact you within 24 hours.",
    });
  };

  const calculateTotal = () => {
    if (!selectedExperience) return 0;
    const basePrice = selectedExperience.price;
    const totalGuests = formData.adults + formData.children * 0.7; // Children 30% discount
    const accommodationMultiplier = formData.accommodation === 'luxury' ? 1.5 : formData.accommodation === 'premium' ? 1.2 : 1;
    return Math.round(basePrice * totalGuests * accommodationMultiplier);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-travel-blue text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 mb-6 hover:text-primary/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Experiences</span>
          </button>
          <h1 className="text-4xl font-bold mb-4">Book Your Tanzania Adventure</h1>
          <p className="text-xl opacity-90">Secure your dream experience in just a few steps</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Select Experience</span>
            <span>Travel Details</span>
            <span>Personal Info</span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Select Experience */}
          {currentStep === 1 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Choose Your Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {experiences.map((experience) => (
                    <div
                      key={experience.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        formData.experience === experience.id
                          ? 'border-primary bg-primary/5 shadow-lg'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('experience', experience.id)}
                    >
                      <img
                        src={experience.image}
                        alt={experience.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold mb-2">{experience.name}</h3>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <Badge variant="default" className="text-lg px-3 py-1">
                          ${experience.price}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{experience.description}</p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Includes:</p>
                        {experience.includes.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Check className="w-3 h-3 text-success" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.experience && (
                  <div className="flex items-center space-x-2 text-destructive mt-4">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.experience}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Travel Details */}
          {currentStep === 2 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Travel Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className={errors.startDate ? 'border-destructive' : ''}
                    />
                    {errors.startDate && (
                      <div className="flex items-center space-x-2 text-destructive mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{errors.startDate}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className={errors.endDate ? 'border-destructive' : ''}
                    />
                    {errors.endDate && (
                      <div className="flex items-center space-x-2 text-destructive mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{errors.endDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Adults
                    </label>
                    <select
                      value={formData.adults}
                      onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Children (under 12)
                    </label>
                    <select
                      value={formData.children}
                      onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                    >
                      {[0, 1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Accommodation Level</label>
                    <select
                      value={formData.accommodation}
                      onChange={(e) => handleInputChange('accommodation', e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                    >
                      <option value="standard">Standard (+$0)</option>
                      <option value="premium">Premium (+20%)</option>
                      <option value="luxury">Luxury (+50%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Transport</label>
                    <select
                      value={formData.transport}
                      onChange={(e) => handleInputChange('transport', e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                    >
                      <option value="included">Included in Package</option>
                      <option value="airport-only">Airport Transfer Only</option>
                      <option value="none">No Transport</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Personal Information */}
          {currentStep === 3 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-destructive' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <div className="flex items-center space-x-2 text-destructive mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{errors.firstName}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-destructive' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <div className="flex items-center space-x-2 text-destructive mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-destructive' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-2 text-destructive mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{errors.email}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-destructive' : ''}
                      placeholder="+1234567890"
                    />
                    {errors.phone && (
                      <div className="flex items-center space-x-2 text-destructive mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-xs">{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests or Dietary Requirements</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
                    placeholder="Any special requirements, dietary restrictions, or requests..."
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Payment & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedExperience && (
                    <div className="flex items-start space-x-4 mb-6">
                      <img
                        src={selectedExperience.image}
                        alt={selectedExperience.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{selectedExperience.name}</h3>
                        <p className="text-muted-foreground mb-2">{selectedExperience.duration}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{formData.adults} Adults</span>
                          {formData.children > 0 && <span>{formData.children} Children</span>}
                          <span>{formData.startDate} to {formData.endDate}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price ({formData.adults} adults)</span>
                      <span>${selectedExperience?.price || 0}</span>
                    </div>
                    {formData.children > 0 && (
                      <div className="flex justify-between">
                        <span>Children ({formData.children} × 70%)</span>
                        <span>${Math.round((selectedExperience?.price || 0) * formData.children * 0.7)}</span>
                      </div>
                    )}
                    {formData.accommodation !== 'standard' && (
                      <div className="flex justify-between">
                        <span>Accommodation Upgrade</span>
                        <span>+{formData.accommodation === 'luxury' ? '50%' : '20%'}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <CreditCard className="w-5 h-5 inline mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-travel-blue/10 border border-travel-blue/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-travel-blue">
                      <Shield className="w-5 h-5" />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <p className="text-travel-blue/80 text-sm mt-1">
                      Your payment information is encrypted and secure. We require only a 30% deposit to confirm your booking.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        className={errors.cardNumber ? 'border-destructive' : ''}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <div className="flex items-center space-x-2 text-destructive mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span className="text-xs">{errors.cardNumber}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <Input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                          className={errors.expiryDate ? 'border-destructive' : ''}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <div className="flex items-center space-x-2 text-destructive mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span className="text-xs">{errors.expiryDate}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                          className={errors.cvv ? 'border-destructive' : ''}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <div className="flex items-center space-x-2 text-destructive mt-1">
                            <AlertCircle className="w-3 h-3" />
                            <span className="text-xs">{errors.cvv}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <Input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        className={errors.cardholderName ? 'border-destructive' : ''}
                        placeholder="John Doe"
                      />
                      {errors.cardholderName && (
                        <div className="flex items-center space-x-2 text-destructive mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span className="text-xs">{errors.cardholderName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Deposit Required:</strong> ${Math.round(calculateTotal() * 0.3)} (30% of total)
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Remaining Balance:</strong> ${Math.round(calculateTotal() * 0.7)} (due 30 days before travel)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            
            {currentStep < 4 ? (
              <Button
                type="button"
                variant="default"
                onClick={nextStep}
                className="ml-auto px-6 py-3"
              >
                Next Step
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                className="ml-auto px-8 py-3 font-semibold"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;