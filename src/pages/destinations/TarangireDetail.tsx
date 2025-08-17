import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Users, Camera, Eye, Calendar, Phone, Mail, Globe, TreePine } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

const TarangireDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const { format } = useCurrency();

  const packages = [
    {
      name: "Day Safari",
      duration: "1 Day",
      price: "$320/day",
      includes: ["Game drives", "Lunch", "Park fees", "Professional guide"],
      description: "Perfect day trip to see Tarangire's famous elephants and baobab trees"
    },
    {
      name: "Elephant Special",
      duration: "2 Days",
      price: "$380/day",
      includes: ["Elephant tracking", "Camping", "All meals", "Park fees", "Expert guide"],
      description: "Focus on Tarangire's large elephant herds with overnight camping"
    },
    {
      name: "Baobab Explorer",
      duration: "3 Days",
      price: "$450/day",
      includes: ["Extended game drives", "Lodge accommodation", "All meals", "Photography guide"],
      description: "Comprehensive exploration of Tarangire's diverse ecosystems"
    }
  ];

  const activities = [
    { icon: <Eye className="w-6 h-6" />, name: "Elephant Watching", description: "See large herds of elephants up close" },
    { icon: <TreePine className="w-6 h-6" />, name: "Baobab Trees", description: "Ancient baobab trees dotting the landscape" },
    { icon: <Camera className="w-6 h-6" />, name: "Bird Watching", description: "Over 550 bird species recorded" },
    { icon: <Users className="w-6 h-6" />, name: "Cultural Visits", description: "Visit local Maasai communities" }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
    "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&auto=format&fit=crop&q=80"
          alt="Tarangire National Park"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Tarangire National Park</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Famous for its large elephant herds and iconic baobab trees, offering a unique safari experience
            </p>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.6/5</span>
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
                  Tarangire National Park is renowned for its spectacular elephant migration, ancient baobab trees, 
                  and diverse wildlife. During the dry season, thousands of animals migrate to the Tarangire River, 
                  creating one of the greatest concentrations of wildlife outside the Serengeti ecosystem.
                </p>
                <p>
                  The park is famous for its large elephant herds, often seen bathing in the river or seeking shade 
                  under the iconic baobab trees. With over 550 bird species, it's also a paradise for bird watchers.
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

            {/* Gallery */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`Tarangire ${index + 1}`}
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
                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">Dry Season</h3>
                    <p className="text-gray-600 mb-2">June - October</p>
                    <p className="text-sm text-gray-500">Best wildlife viewing and elephant migration</p>
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Wet Season</h3>
                    <p className="text-gray-600 mb-2">November - May</p>
                    <p className="text-sm text-gray-500">Lush landscapes and excellent bird watching</p>
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
                        destination: 'Tarangire National Park',
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

export default TarangireDetail;
