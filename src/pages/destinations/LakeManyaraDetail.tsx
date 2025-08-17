import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Users, Camera, Eye, Calendar, Phone, Mail, Globe, Bird, TreePine } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

const LakeManyaraDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const { format } = useCurrency();

  const packages = [
    {
      name: "Tree Climbing Lions",
      duration: "1 Day",
      price: "$280/day",
      includes: ["Game drives", "Lunch", "Park fees", "Professional guide"],
      description: "Discover the famous tree-climbing lions and diverse ecosystems"
    },
    {
      name: "Flamingo Spectacular",
      duration: "2 Days",
      price: "$350/day",
      includes: ["Extended game drives", "Bird watching", "Camping", "All meals", "Park fees"],
      description: "Focus on flamingos and the incredible bird diversity"
    },
    {
      name: "Forest & Lake Explorer",
      duration: "3 Days",
      price: "$420/day",
      includes: ["Forest walks", "Canoe safari", "Lodge accommodation", "All meals", "Expert guide"],
      description: "Complete exploration of forest, lake, and wildlife ecosystems"
    }
  ];

  const activities = [
    { icon: <Eye className="w-6 h-6" />, name: "Tree-Climbing Lions", description: "Unique lions that climb acacia trees" },
    { icon: <Bird className="w-6 h-6" />, name: "Flamingo Watching", description: "Thousands of flamingos on the lake" },
    { icon: <TreePine className="w-6 h-6" />, name: "Forest Walks", description: "Guided walks through groundwater forest" },
    { icon: <Camera className="w-6 h-6" />, name: "Bird Photography", description: "Over 400 bird species to photograph" }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
    "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <img
          src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1920&auto=format&fit=crop&q=80"
          alt="Lake Manyara National Park"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Lake Manyara</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Known for tree-climbing lions and diverse ecosystems from groundwater forest to soda lake
            </p>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.5/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Northern Tanzania</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>1-3 Days</span>
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
                  Lake Manyara National Park is a compact gem that offers an incredible diversity of habitats 
                  within a small area. From the dense groundwater forest to the open grasslands and the 
                  alkaline lake itself, this park showcases Tanzania's ecological variety.
                </p>
                <p>
                  Famous for its tree-climbing lions, Lake Manyara is also a paradise for bird watchers 
                  with over 400 species recorded. The lake attracts thousands of flamingos during certain 
                  seasons, creating a spectacular pink carpet across the water.
                </p>
              </div>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Activities & Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="text-emerald-600 mt-1">
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{activity.name}</h3>
                        <p className="text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wildlife Highlights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Wildlife Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Tree-Climbing Lions</h3>
                  <p className="text-gray-600 text-sm">Unique behavior of lions resting in acacia trees</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Flamingos</h3>
                  <p className="text-gray-600 text-sm">Thousands of flamingos create pink spectacles</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Forest Wildlife</h3>
                  <p className="text-gray-600 text-sm">Blue monkeys, baboons, and forest antelope</p>
                </div>
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
                      alt={`Lake Manyara ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Best Time to Visit */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Time to Visit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Dry Season</h3>
                    <p className="text-gray-600 mb-2">June - October</p>
                    <p className="text-sm text-gray-500">Best for wildlife viewing and tree-climbing lions</p>
                  </div>
                </div>
                <div className="bg-pink-50 p-6 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-pink-600 mb-2">Flamingo Season</h3>
                    <p className="text-gray-600 mb-2">November - April</p>
                    <p className="text-sm text-gray-500">Peak flamingo numbers and bird watching</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Safari</h3>
              
              {/* Package Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Package</label>
                <div className="space-y-3">
                  {packages.map((pkg, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPackage === index
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                        <span className="text-emerald-600 font-bold">
                          {(() => {
                            const raw = pkg.price as string;
                            const amount = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
                            const perDay = /\/day\b/i.test(raw);
                            const perPerson = /\/person\b/i.test(raw);
                            return `${format(amount)}${perDay ? '/day' : perPerson ? '/person' : ''}`;
                          })()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                      <p className="text-sm text-gray-500">{pkg.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Package Includes:</h4>
                <ul className="space-y-2">
                  {packages[selectedPackage].includes.map((item, index) => (
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
                        destination: 'Lake Manyara',
                        packageName: packages[selectedPackage].name,
                        packagePrice: packages[selectedPackage].price,
                        packageDuration: packages[selectedPackage].duration,
                        packageIncludes: packages[selectedPackage].includes,
                        packageDescription: packages[selectedPackage].description
                      }
                    }
                  })}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Book Now
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

export default LakeManyaraDetail;
