import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, MapPin, Umbrella, Anchor, Users, Calendar,
  Phone, Mail, AlertTriangle
} from 'lucide-react';

const ZanzibarDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);

  const packages = [
    {
      name: "Stone Town Heritage Tour",
      duration: "1 Day",
      difficulty: "Easy",
      price: "$80",
      includes: ["Professional guide", "Entrance fees", "Lunch", "Hotel pickup"],
      description: "Explore the narrow streets, markets, and historical landmarks of Zanzibar’s UNESCO World Heritage capital."
    },
    {
      name: "Spice Farm & Village Experience",
      duration: "Half Day",
      difficulty: "Easy",
      price: "$50",
      includes: ["Spice farm tour", "Cooking demo", "Tasting session", "Local lunch"],
      description: "Discover the island’s famous spices, meet local farmers, and enjoy an authentic Swahili meal."
    },
    {
      name: "Beach & Snorkeling Adventure",
      duration: "Full Day",
      difficulty: "Easy",
      price: "$120",
      includes: ["Boat trip", "Snorkeling gear", "Beach BBQ", "Drinks"],
      description: "Relax on white sandy beaches and snorkel in the crystal-clear waters of the Indian Ocean."
    }
  ];

  const highlights = [
    { icon: <Umbrella className="w-6 h-6" />, name: "Pristine Beaches", description: "White sand beaches and turquoise waters perfect for relaxation." },
    { icon: <Anchor className="w-6 h-6" />, name: "Water Adventures", description: "Snorkeling, diving, and sailing in the Indian Ocean." },
    { icon: <Users className="w-6 h-6" />, name: "Cultural Heritage", description: "Rich Swahili culture, history, and architecture in Stone Town." },
    { icon: <Calendar className="w-6 h-6" />, name: "Year-Round Destination", description: "Tropical climate makes Zanzibar perfect for travel anytime." }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1683322753580-6bf07759dbfe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHphbnppYmFyfGVufDB8fDB8fHww",
    "https://media.istockphoto.com/id/2191376209/photo/female-tourist-is-relaxing-in-the-crystal-clear-waters-of-maalum-cave-a-natural-wonder.webp?a=1&b=1&s=612x612&w=0&k=20&c=HXSjUZ2AqJ2k2I4pCvJJL_Q65w6DQWg2xGsdDJPbUuU=",
    "https://images.unsplash.com/photo-1577315734214-4b3dec92d9ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHphbnppYmFyfGVufDB8fDB8fHww",
    "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-black/50 to-black/30">
        <img
          src="https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8emFuemliYXJ8ZW58MHx8MHx8fDA%3D"
          alt="Zanzibar Beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 mb-4 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Destinations</span>
            </button>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Zanzibar</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl">
              Experience the Spice Island’s stunning beaches, vibrant culture, and rich history.
            </p>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Tanzania</span>
              </div>
              <div className="flex items-center space-x-2">
                <Umbrella className="w-5 h-5" />
                <span>Indian Ocean</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Zanzibar is a tropical paradise off the coast of Tanzania, renowned for its white sandy beaches, turquoise waters, and rich cultural heritage. The island blends African, Arab, and European influences, creating a unique atmosphere full of history and flavor.
                </p>
                <p>
                  Visitors can explore the winding alleys of Stone Town, a UNESCO World Heritage site, embark on spice tours, or relax at world-class beach resorts. With year-round sunshine and warm waters, Zanzibar is the ultimate destination for relaxation and adventure.
                </p>
              </div>
            </section>

            {/* Travel Notice */}
            <section className="mb-12">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Travel Information</h3>
                    <ul className="text-amber-700 space-y-1 text-sm">
                      <li>• Best months: June–October & December–February</li>
                      <li>• Light clothing, sunscreen, and swimwear recommended</li>
                      <li>• Respect local culture – dress modestly in towns</li>
                      <li>• Tap water not recommended – use bottled water</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Visit Zanzibar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl">
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
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`Zanzibar ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tour Packages</h3>
              <div className="space-y-4 mb-6">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer ${
                      selectedPackage === index
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPackage(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <span className="text-emerald-600 font-bold">{pkg.price}</span>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm text-gray-600">{pkg.duration}</span>
                      <span className="text-sm text-emerald-600">Easy</span>
                    </div>
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <h4 className="font-semibold mb-3">Includes:</h4>
              <ul className="space-y-2 mb-6">
                {packages[selectedPackage].includes.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/booking', {
                    state: {
                      bookingData: {
                        destination: 'Zanzibar',
                        packageName: packages[selectedPackage].name,
                        packagePrice: packages[selectedPackage].price,
                        packageDuration: packages[selectedPackage].duration,
                        packageIncludes: packages[selectedPackage].includes,
                        packageDescription: packages[selectedPackage].description
                      }
                    }
                  })}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 font-semibold"
                >
                  Book Now
                </button>
                <button className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl hover:bg-emerald-50 font-semibold">
                  Get Quote
                </button>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">Need Help?</h4>
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

export default ZanzibarDetail;
