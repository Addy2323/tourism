import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Mountain, Thermometer, Users, Calendar, Phone, Mail, AlertTriangle } from 'lucide-react';

const KilimanjaroDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState(0);

  const routes = [
    {
      name: "Marangu Route",
      duration: "5 Days",
      difficulty: "Moderate",
      price: "$1,200",
      success: "65%",
      includes: ["Hut accommodation", "All meals", "Park fees", "Professional guide"],
      description: "The 'Coca-Cola' route - most popular with hut accommodation"
    },
    {
      name: "Machame Route",
      duration: "6 Days",
      difficulty: "Challenging",
      price: "$1,400",
      success: "85%",
      includes: ["Camping equipment", "All meals", "Park fees", "Experienced guide"],
      description: "The 'Whiskey' route - scenic but more demanding"
    },
    {
      name: "Lemosho Route",
      duration: "7 Days",
      difficulty: "Moderate-Hard",
      price: "$1,600",
      success: "90%",
      includes: ["Premium camping", "Gourmet meals", "Park fees", "Expert guide"],
      description: "Best acclimatization and highest success rate"
    }
  ];

  const highlights = [
    { icon: <Mountain className="w-6 h-6" />, name: "Uhuru Peak", description: "Reach Africa's highest point at 5,895m" },
    { icon: <Thermometer className="w-6 h-6" />, name: "Climate Zones", description: "Experience 5 different climate zones" },
    { icon: <Users className="w-6 h-6" />, name: "Expert Guides", description: "Professional mountain guides and porters" },
    { icon: <Calendar className="w-6 h-6" />, name: "Year Round", description: "Climbing available throughout the year" }
  ];

  const gallery = [
    "https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80"
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Moderate': return 'text-green-600 bg-green-100';
      case 'Challenging': return 'text-orange-600 bg-orange-100';
      case 'Moderate-Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <img
          src="https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?w=1920&auto=format&fit=crop&q=80"
          alt="Mount Kilimanjaro"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 mb-4 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Destinations</span>
            </button>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Mount Kilimanjaro</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Conquer Africa's highest peak and roof of the continent at 5,895 meters above sea level
            </p>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.8/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Northern Tanzania</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mountain className="w-5 h-5" />
                <span>5,895m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Mount Kilimanjaro is Africa's highest mountain and the world's tallest free-standing mountain, rising majestically from the African plains to 5,895 meters (19,341 feet). Located in Tanzania near the Kenyan border, this iconic stratovolcano consists of three volcanic cones: Kibo, Mawenzi, and Shira.
                </p>
                <p>
                  What makes Kilimanjaro unique is that it's one of the few places on Earth where you can walk from tropical rainforest to arctic conditions in just a few days. The mountain offers several routes to the summit, each with its own character and challenges, making it accessible to climbers of various experience levels.
                </p>
              </div>
            </section>

            {/* Important Notice */}
            <section className="mb-12">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Climbing Information</h3>
                    <ul className="text-amber-700 space-y-1 text-sm">
                      <li>• No technical climbing experience required, but good physical fitness essential</li>
                      <li>• Altitude sickness is a real concern - proper acclimatization is crucial</li>
                      <li>• Weather can change rapidly - proper gear is mandatory</li>
                      <li>• Best climbing months: January-March and June-October</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Climb Kilimanjaro</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-emerald-600">{highlight.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.name}</h3>
                        <p className="text-gray-600">{highlight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`Kilimanjaro ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Climate Zones */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Climate Zones</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-green-800">Rainforest Zone</h3>
                      <p className="text-sm text-green-600">800-1,800m • Tropical climate</p>
                    </div>
                    <span className="text-green-600 font-bold">20-25°C</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-yellow-800">Heath & Moorland</h3>
                      <p className="text-sm text-yellow-600">1,800-3,000m • Cooler temperatures</p>
                    </div>
                    <span className="text-yellow-600 font-bold">10-15°C</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-orange-800">Alpine Desert</h3>
                      <p className="text-sm text-orange-600">3,000-4,000m • Harsh conditions</p>
                    </div>
                    <span className="text-orange-600 font-bold">0-10°C</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-blue-800">Arctic Zone</h3>
                      <p className="text-sm text-blue-600">4,000m+ • Extreme cold</p>
                    </div>
                    <span className="text-blue-600 font-bold">-20 to 0°C</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Route</h3>
              
              {/* Route Selection */}
              <div className="mb-6">
                <div className="space-y-4">
                  {routes.map((route, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedRoute === index
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedRoute(index)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{route.name}</h4>
                        <span className="text-emerald-600 font-bold">{route.price}</span>
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-gray-600">{route.duration}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(route.difficulty)}`}>
                          {route.difficulty}
                        </span>
                        <span className="text-sm text-emerald-600 font-medium">Success: {route.success}</span>
                      </div>
                      <p className="text-sm text-gray-600">{route.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Package Includes:</h4>
                <ul className="space-y-2">
                  {routes[selectedRoute].includes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/booking', {
                    state: {
                      bookingData: {
                        destination: 'Mount Kilimanjaro',
                        packageName: routes[selectedRoute].name,
                        packagePrice: routes[selectedRoute].price,
                        packageDuration: routes[selectedRoute].duration,
                        packageIncludes: routes[selectedRoute].includes,
                        packageDescription: routes[selectedRoute].description
                      }
                    }
                  })}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Book Climb
                </button>
                <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl hover:bg-emerald-50 transition-colors font-semibold">
                  Get Quote
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                   <Phone className="w-4 h-4" />
                                       <span>+255 765 696 445</span>
                                     </div>
                                     <div className="flex items-center space-x-2">
                                       <Mail className="w-4 h-4" />
                                       <span>info@babblerstours.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KilimanjaroDetail;
