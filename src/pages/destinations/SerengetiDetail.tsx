import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Users, Camera, Eye, Calendar, Phone, Mail, Globe } from 'lucide-react';

const SerengetiDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);

  const packages = [
    {
      name: "Classic Safari",
      duration: "3 Days",
      price: "$450/day",
      includes: ["Game drives", "Accommodation", "Meals", "Park fees"],
      description: "Perfect introduction to Serengeti's wildlife"
    },
    {
      name: "Migration Special",
      duration: "5 Days",
      price: "$520/day",
      includes: ["Migration tracking", "Hot air balloon", "Premium lodges", "All meals"],
      description: "Follow the Great Migration with expert guides"
    },
    {
      name: "Photography Safari",
      duration: "7 Days",
      price: "$680/day",
      includes: ["Photography guide", "Hide access", "Equipment rental", "Editing workshop"],
      description: "Capture the perfect wildlife shots"
    }
  ];

  const activities = [
    { icon: <Eye className="w-6 h-6" />, name: "Game Drives", description: "Spot the Big Five in their natural habitat" },
    { icon: <Camera className="w-6 h-6" />, name: "Hot Air Balloon", description: "Aerial views of the endless plains" },
    { icon: <Users className="w-6 h-6" />, name: "Cultural Visits", description: "Meet local Maasai communities" },
    { icon: <Globe className="w-6 h-6" />, name: "Migration Tracking", description: "Follow the wildebeest migration" }
  ];

  const gallery = [
    "https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <img
          src="https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Serengeti National Park"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Serengeti National Park</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Witness the Great Migration and endless plains teeming with wildlife in Tanzania's most famous national park
            </p>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Northern Tanzania</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>3-7 Days</span>
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
                  The Serengeti National Park is Tanzania's oldest and most popular national park, covering 14,750 square kilometers of grassland plains, savanna, riverine forest, and woodlands. The park is famous for the annual Great Migration, where over 1.5 million wildebeest and 200,000 zebras move in a clockwise direction through the ecosystem.
                </p>
                <p>
                  Home to the "Big Five" - lion, leopard, elephant, buffalo, and rhinoceros - the Serengeti offers some of the best wildlife viewing in Africa. The park's diverse landscapes support an incredible variety of wildlife, making it a photographer's paradise and a must-visit destination for any safari enthusiast.
                </p>
              </div>
            </section>

            {/* Activities */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Activities & Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-emerald-600">{activity.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.name}</h3>
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
                      alt={`Serengeti ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Best Time to Visit */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Time to Visit</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-emerald-600 mb-2">Dry Season</h3>
                    <p className="text-gray-600 mb-2">June - October</p>
                    <p className="text-sm text-gray-500">Best for wildlife viewing and migration</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-amber-600 mb-2">Calving Season</h3>
                    <p className="text-gray-600 mb-2">January - March</p>
                    <p className="text-sm text-gray-500">Witness newborn animals</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Green Season</h3>
                    <p className="text-gray-600 mb-2">November - May</p>
                    <p className="text-sm text-gray-500">Lush landscapes and fewer crowds</p>
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
                        <span className="text-emerald-600 font-bold">{pkg.price}</span>
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
                  onClick={() => navigate('/plan-trip')}
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

export default SerengetiDetail;
