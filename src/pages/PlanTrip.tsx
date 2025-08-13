import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plane, Hotel, Camera, DollarSign, CheckCircle, Send, PartyPopper } from 'lucide-react';
import FlightBookingModal from './FlightBookingModal';
import AccommodationModal from './AccommodationModal';
import ConsultationModal from './ConsultationModal';

const PlanTrip: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [view, setView] = useState('planner'); // 'planner', 'form', 'submitted'
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [tripData, setTripData] = useState({
    destination: '',
    duration: '',
    travelers: '',
    budget: '',
    interests: [],
    accommodation: '',
    startDate: ''
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Trip Data:', tripData);
    console.log('Contact Info:', formData);
    setView('submitted');
  };

  const steps = [
    { id: 1, title: 'Destination', icon: MapPin },
    { id: 2, title: 'Duration', icon: Clock },
    { id: 3, title: 'Travelers', icon: Users },
    { id: 4, title: 'Interests', icon: Camera },
    { id: 5, title: 'Budget', icon: DollarSign },
    { id: 6, title: 'Review', icon: CheckCircle }
  ];

  const destinations = [
    { name: 'Serengeti National Park', image: 'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Mount Kilimanjaro', image: 'https://media.istockphoto.com/id/2111967560/photo/masai-giraffe-in-front-of-kilimanjaro-mountain-in-amboseli-national-park-kenya.webp?a=1&b=1&s=612x612&w=0&k=20&c=8eNpVCWqfus9_Gv8otkUk1yRqDoyUBnwocauJ3JJ6OE=' },
    { name: 'Zanzibar Islands', image: 'https://media.istockphoto.com/id/1139657851/photo/coatline-of-zanzibar-at-the-indian-ocean.webp?a=1&b=1&s=612x612&w=0&k=20&c=IR1M11mtumVcLYxmjJWdMOI4FCLt5rivLu7TU_emyrQ=' },
    { name: 'Lake Manyara National Park', image: 'https://images.unsplash.com/photo-1623952625109-6c47a93f675c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1hc2FpJTIwbWFyYXxlbnwwfHwwfHx8MA%3D%3D' }
    
  ];

  const interests = [
    { name: 'Wildlife Safari', icon: '🦁' },
    { name: 'Mountain Climbing', icon: '🏔️' },
    { name: 'Beach Relaxation', icon: '🏖️' },
    { name: 'Cultural Tours', icon: '🏛️' },
    { name: 'Photography', icon: '📸' },
    { name: 'Adventure Sports', icon: '🚀' },
    { name: 'Food & Culinary', icon: '🍽️' },
    { name: 'Wellness & Spa', icon: '🧘' }
  ];

  const handleInterestToggle = (interest: string) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const renderStepContent = () => {
    switch (selectedStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Destination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                    tripData.destination === dest.name ? 'ring-4 ring-emerald-500' : ''
                  }`}
                  onClick={() => setTripData(prev => ({ ...prev, destination: dest.name }))}
                >
                  <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h4 className="text-white font-bold text-lg p-4">{dest.name}</h4>
                  </div>
                  {tripData.destination === dest.name && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-2">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How Long is Your Trip?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['3-5 days', '6-8 days', '9-12 days', '2+ weeks'].map((duration) => (
                <button
                  key={duration}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    tripData.duration === duration
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setTripData(prev => ({ ...prev, duration }))}
                >
                  <Clock className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-semibold">{duration}</span>
                </button>
              ))}
            </div>
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={tripData.startDate}
                onChange={(e) => setTripData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How Many Travelers?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Solo (1)', 'Couple (2)', 'Family (3-5)', 'Group (6+)'].map((travelers) => (
                <button
                  key={travelers}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    tripData.travelers === travelers
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setTripData(prev => ({ ...prev, travelers }))}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-semibold">{travelers}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What Interests You?</h3>
            <p className="text-gray-600 mb-6">Select all that apply to personalize your experience</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interests.map((interest) => (
                <button
                  key={interest.name}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    tripData.interests.includes(interest.name)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => handleInterestToggle(interest.name)}
                >
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <span className="font-semibold text-sm">{interest.name}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Your Budget?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Budget', range: '$500-1000/person', features: ['Basic accommodation', 'Group tours', 'Local transport'] },
                { name: 'Standard', range: '$1000-2500/person', features: ['Mid-range lodges', 'Private guides', 'Comfortable transport'] },
                { name: 'Luxury', range: '$2500+/person', features: ['Luxury lodges', 'Private tours', 'Premium experiences'] }
              ].map((budget) => (
                <div
                  key={budget.name}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    tripData.budget === budget.name
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setTripData(prev => ({ ...prev, budget: budget.name }))}
                >
                  <h4 className="font-bold text-lg mb-2">{budget.name}</h4>
                  <p className="text-emerald-600 font-semibold mb-4">{budget.range}</p>
                  <ul className="space-y-2">
                    {budget.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review Your Trip</h3>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Destination</h4>
                  <p className="text-gray-600">{tripData.destination || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                  <p className="text-gray-600">{tripData.duration || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Travelers</h4>
                  <p className="text-gray-600">{tripData.travelers || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Budget</h4>
                  <p className="text-gray-600">{tripData.budget || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Start Date</h4>
                  <p className="text-gray-600">{tripData.startDate || 'Not selected'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Interests</h4>
                  <p className="text-gray-600">{tripData.interests.length > 0 ? tripData.interests.join(', ') : 'None selected'}</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button 
                onClick={() => setView('form')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
              >
                <span>Get My Custom Itinerary</span>
                <Send className="w-5 h-5"/>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderBookingForm = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fadeIn">
      <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">Final Step!</h3>
      <p className="text-gray-600 mb-8 text-center">Please provide your contact details so we can send your custom itinerary.</p>
      <form onSubmit={handleFormSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="fullName" id="fullName" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" onChange={handleFormChange} value={formData.fullName} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" name="email" id="email" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" onChange={handleFormChange} value={formData.email} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
          <input type="tel" name="phone" id="phone" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" onChange={handleFormChange} value={formData.phone} />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes or Requests</label>
          <textarea name="notes" id="notes" rows={4} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500" onChange={handleFormChange} value={formData.notes}></textarea>
        </div>
        <div className="text-center pt-4">
          <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105">
            Submit and Send My Itinerary
          </button>
        </div>
      </form>
    </div>
  );

  const renderSubmittedView = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center animate-fadeIn">
        <PartyPopper className="w-24 h-24 text-emerald-500 mx-auto mb-6"/>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 text-lg mb-2">Your custom trip request has been submitted successfully.</p>
        <p className="text-gray-600 text-lg">Our travel experts will review your preferences and get back to you with a personalized itinerary within <strong>24-48 hours</strong>.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-emerald-600 to-blue-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your <span className="text-amber-400">Perfect Trip</span>
          </h1>
          <p className="text-xl">Let us create a personalized Tanzania adventure just for you</p>
        </div>
      </section>

      {/* Trip Planner */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {view === 'planner' && (
            <>
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            selectedStep >= step.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="ml-3 hidden md:block">
                          <p className={`font-semibold ${selectedStep >= step.id ? 'text-emerald-600' : 'text-gray-600'}`}>
                            {step.title}
                          </p>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-8 h-1 mx-4 ${selectedStep > step.id ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                {renderStepContent()}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedStep(Math.max(1, selectedStep - 1))}
                  disabled={selectedStep === 1}
                >
                  Previous
                </button>
                <button
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedStep === steps.length
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                  onClick={() => setSelectedStep(Math.min(steps.length, selectedStep + 1))}
                  disabled={selectedStep === steps.length}
                >
                  {selectedStep === steps.length ? 'Complete' : 'Next'}
                </button>
              </div>
            </>
          )}

          {view === 'form' && renderBookingForm()}
          {view === 'submitted' && renderSubmittedView()}

        </div>
      </section>

      {/* Quick Options */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Planning?</h2>
            <p className="text-xl text-gray-600">Our experts are here to assist you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <Plane className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flight Booking</h3>
              <p className="text-gray-600 mb-4">We'll help you find the best flights to Tanzania</p>
              <button onClick={() => setActiveModal('flights')} className="text-emerald-600 font-semibold hover:text-emerald-700">Learn More</button>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <Hotel className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accommodation</h3>
              <p className="text-gray-600 mb-4">From budget lodges to luxury resorts</p>
              <button onClick={() => setActiveModal('accommodation')} className="text-emerald-600 font-semibold hover:text-emerald-700">Browse Options</button>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Consultation</h3>
              <p className="text-gray-600 mb-4">Talk to our Tanzania travel specialists</p>
              <button onClick={() => setActiveModal('consultation')} className="text-emerald-600 font-semibold hover:text-emerald-700">Book Call</button>
            </div>
          </div>
        </div>
      </section>

      {activeModal === 'flights' && <FlightBookingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'accommodation' && <AccommodationModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'consultation' && <ConsultationModal onClose={() => setActiveModal(null)} />}
    </div>
  );
};

export default PlanTrip;