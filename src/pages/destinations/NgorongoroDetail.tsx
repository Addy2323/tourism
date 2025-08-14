import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Eye, Shield, Users, TreePine, Phone, Mail, Award } from 'lucide-react';

const NgorongoroDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);

  const packages = [
    {
      name: "Day Safari",
      duration: "1 Day",
      price: "$380/day",
      includes: ["Crater descent", "Game drive", "Lunch", "Park fees"],
      description: "Perfect day trip to experience the crater floor"
    },
    {
      name: "Crater Explorer",
      duration: "2 Days",
      price: "$420/day",
      includes: ["Crater lodge", "Multiple game drives", "All meals", "Maasai village visit"],
      description: "Extended exploration with cultural experience"
    },
    {
      name: "Conservation Special",
      duration: "3 Days",
      price: "$480/day",
      includes: ["Premium lodge", "Conservation tour", "Research center visit", "Private guide"],
      description: "Learn about conservation efforts and research"
    }
  ];

  const wildlife = [
    { icon: <Eye className="w-6 h-6" />, name: "Black Rhinos", description: "One of the best places to see endangered black rhinos" },
    { icon: <Shield className="w-6 h-6" />, name: "Big Five", description: "All Big Five animals in a single location" },
    { icon: <Users className="w-6 h-6" />, name: "Maasai Culture", description: "Traditional Maasai communities around the crater" },
    { icon: <TreePine className="w-6 h-6" />, name: "Diverse Habitats", description: "Forest, grassland, swamps, and lakes" }
  ];

  const facts = [
    { number: "610m", label: "Crater Depth" },
    { number: "260km²", label: "Crater Floor Area" },
    { number: "25,000+", label: "Large Animals" },
    { number: "1979", label: "UNESCO World Heritage" }
  ];

  const gallery = [
    "https://plus.unsplash.com/premium_photo-1697729506473-f0f7e3a5407c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80",
    "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <img
          src="https://plus.unsplash.com/premium_photo-1697729506473-f0f7e3a5407c?w=1920&auto=format&fit=crop&q=80"
          alt="Ngorongoro Crater"
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Ngorongoro Crater</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              The world's largest intact volcanic caldera and wildlife haven - Africa's Garden of Eden
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
                <Award className="w-5 h-5" />
                <span>UNESCO World Heritage</span>
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
                  The Ngorongoro Crater is a breathtaking natural wonder and one of Africa's most incredible wildlife destinations. This massive volcanic caldera, formed over 2 million years ago, creates a unique ecosystem that supports an extraordinary concentration of wildlife. Often called "Africa's Garden of Eden," the crater floor is home to over 25,000 large animals.
                </p>
                <p>
                  What makes Ngorongoro truly special is its self-contained ecosystem. The steep crater walls act as natural boundaries, creating a year-round water supply and permanent residence for many animals. This makes it one of the best places in Africa to see the Big Five, including the rare black rhinoceros, all in a single day.
                </p>
              </div>
            </section>

            {/* Key Facts */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Crater Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {facts.map((fact, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{fact.number}</div>
                    <div className="text-gray-600 text-sm">{fact.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wildlife & Experiences */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Wildlife & Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wildlife.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-emerald-600">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
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
                      alt={`Ngorongoro ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Conservation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Conservation & Research</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Conservation Efforts</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Black rhino protection program</li>
                      <li>• Anti-poaching initiatives</li>
                      <li>• Habitat restoration projects</li>
                      <li>• Community conservation programs</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Activities</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Wildlife population monitoring</li>
                      <li>• Ecological research studies</li>
                      <li>• Climate change impact assessment</li>
                      <li>• Human-wildlife conflict mitigation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Maasai Culture */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Maasai Heritage</h2>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <p className="text-gray-700 mb-4">
                  The Ngorongoro Conservation Area is unique as it allows the coexistence of wildlife and the indigenous Maasai people. The Maasai have lived in harmony with wildlife for centuries, practicing traditional pastoralism while respecting the natural environment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Traditional Lifestyle</h4>
                    <p className="text-gray-600">Cattle herding and traditional practices</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Cultural Tours</h4>
                    <p className="text-gray-600">Visit authentic Maasai villages</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">Conservation Partners</h4>
                    <p className="text-gray-600">Working together to protect wildlife</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Time to Visit */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Time to Visit</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Dry Season</h3>
                    <p className="text-gray-600 mb-2">June - October</p>
                    <p className="text-sm text-gray-500">Best wildlife viewing, clear skies</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">Calving Season</h3>
                    <p className="text-gray-600 mb-2">December - March</p>
                    <p className="text-sm text-gray-500">Newborn animals, lush scenery</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-amber-600 mb-2">Year-round</h3>
                    <p className="text-gray-600 mb-2">All seasons</p>
                    <p className="text-sm text-gray-500">Excellent wildlife viewing anytime</p>
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
                  onClick={() => navigate('/booking', {
                    state: {
                      bookingData: {
                        destination: 'Ngorongoro Crater',
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

export default NgorongoroDetail;
