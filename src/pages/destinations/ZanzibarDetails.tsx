import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Users, Camera, Eye, Calendar, Phone, Mail, Globe, Award, Heart, Sparkles, Waves, Sun, Palmtree, Building } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

const ZanzibarDetails: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const { format } = useCurrency();

  const packages = [
    {
      name: "Stone Town Explorer",
      duration: "3 Days",
      price: "$280/person",
      includes: ["Historic tours", "Local guide", "Cultural experiences", "Traditional meals"],
      description: "Discover the UNESCO World Heritage Stone Town",
      popular: false
    },
    {
      name: "Beach & Culture",
      duration: "5 Days",
      price: "$450/person",
      includes: ["Beach resort", "Stone Town tour", "Spice farm visit", "Sunset dhow cruise"],
      description: "Perfect blend of relaxation and cultural immersion",
      popular: true
    },
    {
      name: "Spice Island Complete",
      duration: "7 Days",
      price: "$680/person",
      includes: ["Luxury accommodation", "All tours", "Private guide", "Water activities"],
      description: "Complete Zanzibar experience with premium services",
      popular: false
    }
  ];

  const activities = [
    { icon: <Building className="w-6 h-6" />, name: "Stone Town Tours", description: "Explore UNESCO World Heritage historic center", gradient: "from-amber-500 to-amber-600" },
    { icon: <Waves className="w-6 h-6" />, name: "Beach Paradise", description: "Pristine white sand beaches and turquoise waters", gradient: "from-blue-500 to-blue-600" },
    { icon: <Palmtree className="w-6 h-6" />, name: "Spice Tours", description: "Visit aromatic spice plantations and farms", gradient: "from-emerald-500 to-emerald-600" },
    { icon: <Sun className="w-6 h-6" />, name: "Dhow Cruises", description: "Traditional sailing boat sunset experiences", gradient: "from-orange-500 to-orange-600" }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800&auto=format&fit=crop&q=80"
  ];

  const handleBookNow = () => {
    const selectedPkg = packages[selectedPackage];
    navigate('/booking', {
      state: {
        bookingData: {
          destination: 'Zanzibar',
          packageName: selectedPkg.name,
          packagePrice: selectedPkg.price,
          packageDuration: selectedPkg.duration,
          packageIncludes: selectedPkg.includes,
          packageDescription: selectedPkg.description
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-amber-50">
      {/* Enhanced Hero Section */}
      <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&auto=format&fit=crop&q=80"
          alt="Zanzibar Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber-400 rounded-full blur-2xl"></div>
        </div>

        <div className="container-mobile relative z-10 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 mb-6 text-white/80 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Destinations</span>
            </button>
            
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200 text-sm font-medium">Spice Island Paradise</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="relative">
                Zanzibar
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-amber-400/20 blur-2xl -z-10"></div>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl leading-relaxed text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover pristine beaches, historic Stone Town, and aromatic spice plantations on this tropical paradise
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-base sm:text-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.8/5</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Indian Ocean</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>3-7 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-mobile py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-12 sm:space-y-16">
            
            {/* Overview Section */}
            <section className="animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Island Paradise
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p className="mb-4">
                  Zanzibar, the "Spice Island," is a tropical paradise off the coast of Tanzania, renowned for its 
                  pristine white sand beaches, crystal-clear turquoise waters, and rich cultural heritage. This 
                  enchanting archipelago offers a perfect blend of relaxation and adventure.
                </p>
                <p>
                  From the UNESCO World Heritage Stone Town with its winding alleys and historic architecture 
                  to the aromatic spice plantations and idyllic beaches, Zanzibar provides an unforgettable 
                  experience that combines African, Arab, Indian, and European influences in a unique cultural tapestry.
                </p>
              </div>
            </section>

            {/* Activities Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Island Experiences
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="card-classic hover:shadow-classic-xl transition-all duration-500 transform hover:-translate-y-2 p-6 group"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${activity.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-classic`}>
                      <div className="text-white">
                        {activity.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {activity.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Photo Gallery
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl shadow-classic hover:shadow-classic-xl transition-all duration-500 aspect-square"
                  >
                    <img
                      src={image}
                      alt={`Zanzibar Gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </section>

            {/* Best Time to Visit */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Best Time to Visit
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-classic p-6 border-l-4 border-blue-500">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sun className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-600">Dry Season</h3>
                  </div>
                  <p className="text-gray-600 mb-2 font-medium">June - October</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Perfect weather for beaches and outdoor activities
                  </p>
                </div>
                <div className="card-classic p-6 border-l-4 border-emerald-500">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-emerald-600">Peak Season</h3>
                  </div>
                  <p className="text-gray-600 mb-2 font-medium">December - March</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Warm temperatures ideal for swimming and water sports
                  </p>
                </div>
              </div>
            </section>

            {/* Cultural Highlights */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                  Cultural Heritage
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="card-classic p-8 bg-gradient-to-br from-blue-50 to-amber-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Building className="w-5 h-5 text-blue-600" />
                      <span>Stone Town</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      UNESCO World Heritage site featuring historic architecture, bustling markets, 
                      and the famous House of Wonders. Explore narrow alleyways filled with history 
                      and culture dating back centuries.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Palmtree className="w-5 h-5 text-emerald-600" />
                      <span>Spice Heritage</span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Known as the "Spice Island," Zanzibar produces cloves, nutmeg, cinnamon, 
                      and black pepper. Visit aromatic plantations and learn about the island's 
                      important role in the historic spice trade.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="card-classic p-6 sm:p-8 sticky top-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Book Your Trip</h3>
                <div className="flex items-center space-x-1">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-500">Save</span>
                </div>
              </div>
              
              {/* Package Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Select Package</label>
                <div className="space-y-4">
                  {packages.map((pkg, index) => (
                    <div
                      key={index}
                      className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPackage === index
                          ? 'border-blue-500 bg-blue-50 shadow-classic'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-3 py-1 flex items-center space-x-1 text-xs font-semibold shadow-classic">
                          <Sparkles className="w-3 h-3" />
                          <span>Popular</span>
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                        <span className="text-blue-600 font-bold text-lg">
                          {(() => {
                            const raw = pkg.price as string;
                            const amount = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
                            const perDay = /\/day\b/i.test(raw);
                            const perPerson = /\/person\b/i.test(raw);
                            return `${format(amount)}${perDay ? '/day' : perPerson ? '/person' : ''}`;
                          })()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{pkg.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">{pkg.duration}</p>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPackage === index 
                            ? 'border-blue-500 bg-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {selectedPackage === index && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Package Includes:</h4>
                <ul className="space-y-3">
                  {packages[selectedPackage].includes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl transition-all duration-300 font-semibold shadow-classic hover:shadow-classic-lg transform hover:scale-105"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold">
                  Get Custom Quote
                </button>
              </div>

              {/* Contact Info */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Need Help?</span>
                </h4>
                <div className="space-y-3 text-sm">
                  <a href="tel:+255765696445" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>+255 765 696 445</span>
                  </a>
                  <a href="mailto:info@babblerstours.com" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="break-all">info@babblerstours.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZanzibarDetails;
