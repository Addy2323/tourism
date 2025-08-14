import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Camera, Mountain, Waves, TreePine } from 'lucide-react';

const Destinations: React.FC = () => {
  const navigate = useNavigate();

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
      route: '/destinations/serengeti'
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
      route: '/destinations/kilimanjaro'
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
      route: '/destinations/zanzibar'
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
      route: '/destinations/ngorongoro'
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
      route: '/destinations/tarangire'
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
      highlights: ['Tree-climbing Lions', 'Flamingos', 'Forest Walks', 'Hot Springs'],
      activities: ['Game Drives', 'Canoeing', 'Forest Walks', 'Bird Watching'],
      route: '/destinations/lake-manyara'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Discover <span className="text-amber-400">Tanzania</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            From the Serengeti plains to Kilimanjaro's peak, explore Africa's most iconic destinations
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.bestTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => navigate(destination.route)}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold"
                    >
                      Book Now
                    </button>
                    <button 
                      onClick={() => navigate(destination.route)}
                      className="flex-1 border-2 border-emerald-600 text-emerald-600 py-3 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-semibold"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore Tanzania?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let our expert guides create the perfect itinerary for your African adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Plan Your Trip
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