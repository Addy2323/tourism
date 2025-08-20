import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Users, Camera, Eye, Calendar, Phone, Mail, Award, Heart, Sparkles, Mountain, TreePine } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

const MkomaziDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const { format } = useCurrency();

  const packages = [
    {
      name: "Wildlife Discovery",
      duration: "2 Days",
      price: "$280/day",
      includes: ["Game drives", "Accommodation", "Meals", "Park fees"],
      description: "Explore diverse wildlife in pristine wilderness",
      popular: true
    },
    {
      name: "Rhino Sanctuary Visit",
      duration: "3 Days",
      price: "$350/day",
      includes: ["Rhino tracking", "Conservation talk", "Premium lodge", "All meals"],
      description: "Visit the black rhino sanctuary and conservation center",
      popular: false
    },
    {
      name: "Complete Mkomazi",
      duration: "4 Days",
      price: "$420/day",
      includes: ["Extended game drives", "Wild dog tracking", "Cultural visit", "Photography guide"],
      description: "Comprehensive exploration of the park's ecosystems",
      popular: false
    }
  ];

  const activities = [
    { icon: <Eye className="w-6 h-6" />, name: "Game Drives", description: "Spot elephants, giraffes, and rare species", gradient: "from-emerald-500 to-emerald-600" },
    { icon: <Mountain className="w-6 h-6" />, name: "Rhino Sanctuary", description: "Visit black rhino conservation project", gradient: "from-blue-500 to-blue-600" },
    { icon: <TreePine className="w-6 h-6" />, name: "Wild Dog Tracking", description: "Track endangered African wild dogs", gradient: "from-amber-500 to-amber-600" },
    { icon: <Camera className="w-6 h-6" />, name: "Photography", description: "Capture stunning landscapes and wildlife", gradient: "from-purple-500 to-purple-600" }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&auto=format&fit=crop&q=80",
    "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const handleBookNow = () => {
    const selectedPkg = packages[selectedPackage];
    navigate('/booking', {
      state: {
        bookingData: {
          destination: 'Mkomazi National Park',
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50">
      {/* Enhanced Hero Section */}
      <div className="relative h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&auto=format&fit=crop&q=80"
          alt="Mkomazi National Park"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
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
            
            <div className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-200 text-sm font-medium">Hidden Wilderness Gem</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="relative">
                Mkomazi National Park
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-amber-400/20 blur-2xl -z-10"></div>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl leading-relaxed text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              A pristine wilderness sanctuary home to black rhinos, wild dogs, and spectacular landscapes beneath the Pare Mountains
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-base sm:text-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.7/5</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Northern Tanzania</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>2-4 Days</span>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700">
                  Park Overview
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p className="mb-4">
                  Mkomazi National Park is a spectacular wilderness area in northern Tanzania, bordering Kenya's Tsavo National Park. 
                  This pristine ecosystem is famous for its successful black rhino and African wild dog conservation programs.
                </p>
                <p>
                  The park features diverse landscapes from acacia woodlands to open grasslands, set against the dramatic backdrop 
                  of the Pare and Usambara Mountains. Wildlife includes elephants, giraffes, zebras, and over 450 bird species.
                </p>
              </div>
            </section>

            {/* Activities Section */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700">
                  Activities & Experiences
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="card-classic hover:shadow-classic-xl transition-all duration-500 transform hover:-translate-y-2 p-6 group relative cursor-pointer"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    {/* Enhanced Destination Tooltip */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 pointer-events-none px-4 py-3">
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Mkomazi National Park</h4>
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-orange-400 text-lg">4.4</span>
                          <span className="text-orange-400">⭐</span>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                    
                    <div className={`w-12 h-12 bg-gradient-to-r ${activity.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-classic relative cursor-pointer`}>
                      <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                        {activity.icon}
                      </div>
                      {/* Activity Tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
                        {activity.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700">
                  Photo Gallery
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl shadow-classic hover:shadow-classic-xl transition-all duration-500 aspect-square"
                  >
                    <img
                      src={image}
                      alt={`Mkomazi Gallery ${index + 1}`}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700">
                  Best Time to Visit
                </span>
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-classic p-6 border-l-4 border-emerald-500">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-emerald-600">Dry Season</h3>
                  </div>
                  <p className="text-gray-600 mb-2 font-medium">June - October</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Best wildlife viewing with clear skies and accessible roads
                  </p>
                </div>
                <div className="card-classic p-6 border-l-4 border-blue-500">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-600">Green Season</h3>
                  </div>
                  <p className="text-gray-600 mb-2 font-medium">November - May</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Lush landscapes, excellent birding, and fewer crowds
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="card-classic p-6 sm:p-8 sticky top-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Book Your Safari</h3>
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
                          ? 'border-emerald-500 bg-emerald-50 shadow-classic'
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
                        <span className="text-emerald-600 font-bold text-lg">
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
                            ? 'border-emerald-500 bg-emerald-500' 
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
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 rounded-xl transition-all duration-300 font-semibold shadow-classic hover:shadow-classic-lg transform hover:scale-105"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 font-semibold">
                  Get Custom Quote
                </button>
              </div>

              {/* Contact Info */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Need Help?</span>
                </h4>
                <div className="space-y-3 text-sm">
                  <a href="tel:+255765696445" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span>+255 765 696 445</span>
                  </a>
                  <a href="mailto:info@babblerstours.com" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-emerald-600" />
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

export default MkomaziDetail;
