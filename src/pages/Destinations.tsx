import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Camera, Mountain, Waves, TreePine, ArrowRight, Users, Calendar } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const Destinations: React.FC = () => {
  const navigate = useNavigate();
  const { format } = useCurrency();

  const destinations = [
    {
      id: 1,
      name: 'Serengeti National Park',
      description: 'Witness the Great Migration and endless plains teeming with wildlife in one of Africa\'s most famous national parks.',
      image: 'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '3-7 days',
      rating: 4.9,
      price: 'From $450/day',
      bestTime: 'June - October',
      highlights: ['Great Migration', 'Big Five', 'Hot Air Balloons', 'Endless Plains'],
      activities: ['Game Drives', 'Photography', 'Cultural Tours', 'Balloon Safaris'],
      route: '/destinations/serengeti',
      featured: true,
      icon: TreePine
    },
    {
      id: 2,
      name: 'Mount Kilimanjaro',
      description: 'Conquer Africa\'s highest peak and roof of the continent. Multiple routes available for different skill levels.',
      image: 'https://media.istockphoto.com/id/2201321246/photo/majestic-elephant-in-front-of-mount-kilimanjaro-in-kenyas-savanna.webp?a=1&b=1&s=612x612&w=0&k=20&c=XN2hcAXaoeztp-sB0egRelVcmR7g6H-3VQZjo5Xc7n8=',
      duration: '5-9 days',
      rating: 4.8,
      price: 'From $1,200',
      bestTime: 'January - March, June - October',
      highlights: ['Uhuru Peak', 'Multiple Routes', 'Glaciers', 'Sunrise Views'],
      activities: ['Trekking', 'Photography', 'Camping', 'Wildlife Viewing'],
      route: '/destinations/kilimanjaro',
      featured: false,
      icon: Mountain
    },
    {
      id: 3,
      name: 'Zanzibar Islands',
      description: 'Pristine beaches, spice tours, and rich Swahili culture await on this tropical paradise archipelago.',
      image: 'https://images.unsplash.com/photo-1621583628955-42fbc37bf424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8emFuemliYXJ8ZW58MHx8MHx8fDA%3D',
      duration: '3-10 days',
      rating: 4.7,
      price: 'From $180/day',
      bestTime: 'June - September, December - February',
      highlights: ['Stone Town', 'Spice Tours', 'Pristine Beaches', 'Dhow Cruises'],
      activities: ['Beach Relaxation', 'Snorkeling', 'Cultural Tours', 'Water Sports'],
      route: '/destinations/zanzibar',
      featured: false,
      icon: Waves
    },
    {
      id: 4,
      name: 'Ngorongoro Crater',
      description: 'The world\'s largest intact volcanic caldera and wildlife haven, often called Africa\'s Eden.',
      image: 'https://images.unsplash.com/photo-1566296524462-e0a341bf65e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmdvcm9uZ29ybyUyMGNyYXRlcnxlbnwwfHwwfHx8MA%3D%3D',
      duration: '1-3 days',
      rating: 4.9,
      price: 'From $380/day',
      bestTime: 'Year-round',
      highlights: ['Crater Floor', 'Black Rhinos', 'Maasai Culture', 'Dense Wildlife'],
      activities: ['Game Drives', 'Cultural Visits', 'Photography', 'Crater Walks'],
      route: '/destinations/ngorongoro',
      featured: true,
      icon: Camera
    },
    {
      id: 5,
      name: 'Tarangire National Park',
      description: 'Famous for its large elephant herds and iconic baobab trees, offering a unique safari experience.',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '1-3 days',
      rating: 4.6,
      price: 'From $320/day',
      bestTime: 'June - October',
      highlights: ['Elephant Herds', 'Baobab Trees', 'Bird Watching', 'River Views'],
      activities: ['Game Drives', 'Walking Safaris', 'Bird Watching', 'Photography'],
      route: '/destinations/tarangire',
      featured: false,
      icon: TreePine
    },
    {
      id: 6,
      name: 'Lake Manyara',
      description: 'Known for tree-climbing lions and diverse ecosystems from groundwater forest to soda lake.',
      image: 'https://media.istockphoto.com/id/1224066657/photo/flying-flamingo-over-the-lake-manyara.webp?a=1&b=1&s=612x612&w=0&k=20&c=t0Sc7OfcJGE6xWKOeBtZyC0ePLdjdSYtWyuHnTLhFhA=',
      duration: '1-2 days',
      rating: 4.5,
      price: 'From $280/day',
      bestTime: 'Year-round',
      highlights: ['Tree-climbing Lions', 'Flamingos', 'Forest Walks', 'Diverse Wildlife'],
      activities: ['Game Drives', 'Bird Watching', 'Forest Walks', 'Photography'],
      route: '/destinations/lake-manyara',
      featured: false,
      icon: Waves
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white pt-28 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400">
                Choose Your
              </span>
              <span className="block mt-2">Adventure</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Welcome to Tanzania and the beautiful land of Tanzania! At Babblers, you get all you want, highly skilled and experienced staffs in planning - guiding customers tour trips throughout the land of East Africa.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-amber-400 mb-1">6+</div>
                <div className="text-sm text-gray-300">Destinations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-1">500+</div>
                <div className="text-sm text-gray-300">Happy Travelers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-amber-400 mb-1">4.8★</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold text-emerald-400 mb-1">10+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                Explore Tanzania's
              </span>
              <span className="block mt-2">Premier Destinations</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From the endless plains of Serengeti to the pristine beaches of Zanzibar, discover the magic of East Africa
            </p>
          </div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => {
              const IconComponent = destination.icon;
              return (
                <div
                  key={destination.id}
                  className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                    destination.featured ? 'ring-2 ring-amber-400/20' : ''
                  }`}
                >
                  {/* Featured Badge */}
                  {destination.featured && (
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      ⭐ Featured
                    </div>
                  )}

                  {/* Image Section */}
                  <div className="relative h-56 lg:h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {(() => {
                        const raw = destination.price as string;
                        const amount = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0;
                        const hasPerDay = /\/day\b/i.test(raw);
                        const hasFrom = /^\s*from\b/i.test(raw);
                        const prefix = hasFrom ? 'From ' : '';
                        return `${prefix}${format(amount)}${hasPerDay ? '/day' : ''}`;
                      })()}
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-600/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {destination.description}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span>{destination.bestTime}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Top Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, 3).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium border border-amber-200"
                          >
                            {highlight}
                          </span>
                        ))}
                        {destination.highlights.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            +{destination.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => navigate(destination.route)}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(destination.route)}
                        className="flex-1 border-2 border-emerald-600 text-emerald-600 py-3 px-4 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Explore Tanzania?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let our expert guides create the perfect itinerary for your African adventure
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Plan Your Trip</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
              Contact Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;