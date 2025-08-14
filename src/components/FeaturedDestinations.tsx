import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';

const FeaturedDestinations: React.FC = () => {
  const navigate = useNavigate();
  const destinations = [
    {
      id: 1,
      name: 'Serengeti National Park',
      description: 'Witness the Great Migration and endless plains teeming with wildlife',
      image: 'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3-7 days',
      rating: 4.9,
      price: 'From $450/day',
      highlights: ['Great Migration', 'Big Five', 'Hot Air Balloons'],
      route: '/destinations/serengeti'
    },
    {
      id: 2,
      name: 'Mount Kilimanjaro',
      description: 'Conquer Africa\'s highest peak and roof of the continent',
      image: 'https://plus.unsplash.com/premium_photo-1664304370557-233bccc0ac85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2lsaW1hbmphcm98ZW58MHx8MHx8fDA%3D',
      duration: '5-9 days',
      rating: 4.8,
      price: 'From $1,200',
      highlights: ['Uhuru Peak', 'Multiple Routes', 'Glaciers'],
      route: '/destinations/kilimanjaro'
    },
    {
      id: 3,
      name: 'Zanzibar Islands',
      description: 'Pristine beaches, spice tours, and rich Swahili culture',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3-10 days',
      rating: 4.7,
      price: 'From $180/day',
      highlights: ['Stone Town', 'Spice Tours', 'Pristine Beaches'],
      route: '/destinations/zanzibar'
    },
    {
      id: 4,
      name: 'Ngorongoro Crater',
      description: 'The world\'s largest intact volcanic caldera and wildlife haven',
      image: 'https://plus.unsplash.com/premium_photo-1697729506473-f0f7e3a5407c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmdvcm9uZ29ybyUyMGNyYXRlcnxlbnwwfHwwfHx8MA%3D%3D',
      duration: '1-3 days',
      rating: 4.9,
      price: 'From $380/day',
      highlights: ['Crater Floor', 'Black Rhinos', 'Maasai Culture'],
      route: '/destinations/ngorongoro'
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-amber-600">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Tanzania's most iconic locations, each offering unique experiences 
            and unforgettable memories that will last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {destination.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                  {destination.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Tanzania</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => navigate(destination.route)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-amber-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            type="button"
            onClick={() => navigate('/destinations')}
            className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
          >
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;