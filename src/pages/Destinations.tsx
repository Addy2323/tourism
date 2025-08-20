import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Camera, Mountain, Waves, TreePine, ArrowRight, Users, Calendar, Compass, Sunrise } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';

const Destinations = () => {
  const navigate = useNavigate();
  const { format } = useCurrency();

  // Northern Circuit Destinations
  const northernCircuit = [
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
    },
    {
      id: 11,
      name: 'Mkomazi National Park',
      description: 'A pristine wilderness sanctuary home to black rhinos, wild dogs, and spectacular landscapes beneath the Pare Mountains.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80',
      duration: '2-4 days',
      rating: 4.7,
      price: 'From $280/day',
      bestTime: 'June - October',
      highlights: ['Black Rhinos', 'Wild Dogs', 'Conservation', 'Pare Mountains'],
      activities: ['Game Drives', 'Rhino Tracking', 'Photography', 'Conservation Tours'],
      route: '/destinations/mkomazi',
      featured: false,
      icon: TreePine
    },
    {
      id: 12,
      name: 'Arusha National Park',
      description: 'A compact park offering incredible diversity from alkaline lakes to montane forests, crowned by Mount Meru.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80',
      duration: '1-4 days',
      rating: 4.5,
      price: 'From $180/day',
      bestTime: 'June - October, December - March',
      highlights: ['Mount Meru', 'Momella Lakes', 'Canoe Safari', 'Flamingos'],
      activities: ['Game Drives', 'Mount Meru Trek', 'Canoe Safari', 'Photography'],
      route: '/destinations/arusha',
      featured: false,
      icon: Mountain
    }
  ];

  // Southern Circuit Destinations
  const southernCircuit = [
    {
      id: 7,
      name: 'Mikumi National Park',
      description: 'Tanzania\'s fourth largest national park, offering excellent wildlife viewing with diverse landscapes and abundant game.',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '2-4 days',
      rating: 4.6,
      price: 'From $320/day',
      bestTime: 'June - October',
      highlights: ['Elephants', 'Lions', 'Baobab Trees', 'Hippo Pools'],
      activities: ['Game Drives', 'Photography', 'Bird Watching', 'Walking Safaris'],
      route: '/destinations/mikumi',
      featured: false,
      icon: TreePine
    },
    {
      id: 8,
      name: 'Udzungwa Mountains National Park',
      description: 'A biodiversity hotspot with pristine rainforests, endemic species, and spectacular waterfalls perfect for hiking.',
      image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '2-5 days',
      rating: 4.7,
      price: 'From $280/day',
      bestTime: 'June - October, December - March',
      highlights: ['Waterfalls', 'Endemic Primates', 'Hiking Trails', 'Rainforest'],
      activities: ['Hiking', 'Bird Watching', 'Photography', 'Primate Tracking'],
      route: '/destinations/udzungwa',
      featured: false,
      icon: Mountain
    },
    {
      id: 9,
      name: 'Selous Game Reserve',
      description: 'Africa\'s largest game reserve offering pristine wilderness, boat safaris, and walking safaris in untouched nature.',
      image: 'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '3-6 days',
      rating: 4.8,
      price: 'From $420/day',
      bestTime: 'June - October',
      highlights: ['Boat Safaris', 'Walking Safaris', 'Wild Dogs', 'Rufiji River'],
      activities: ['Game Drives', 'Boat Safaris', 'Walking Safaris', 'Photography'],
      route: '/destinations/selous',
      featured: true,
      icon: Waves
    },
    {
      id: 10,
      name: 'Saadani National Park',
      description: 'The only park where beach meets bush - unique coastal safari experience with elephants on pristine beaches.',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1200',
      duration: '2-4 days',
      rating: 4.5,
      price: 'From $350/day',
      bestTime: 'June - September, December - March',
      highlights: ['Beach Safari', 'Sea Turtles', 'Coastal Wildlife', 'Indian Ocean'],
      activities: ['Game Drives', 'Beach Activities', 'Turtle Watching', 'Cultural Tours'],
      route: '/destinations/saadani',
      featured: false,
      icon: Waves
    }
  ];

  // Special Destinations (Zanzibar)

  const renderDestinationCard = (destination: any, index: number, circuitColor: string) => {
    const IconComponent = destination.icon;
    return (
      <div
        key={destination.id}
        className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
          destination.featured ? `ring-2 ${circuitColor === 'emerald' ? 'ring-emerald-400/30' : 'ring-amber-400/30'}` : ''
        }`}
      >
        {/* Featured Badge */}
        {destination.featured && (
          <div className={`absolute top-4 left-4 z-20 bg-gradient-to-r ${
            circuitColor === 'emerald' ? 'from-emerald-500 to-emerald-600' : 'from-amber-500 to-orange-500'
          } text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
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
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
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
          <div className={`absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r ${
            circuitColor === 'emerald' ? 'from-emerald-600 to-emerald-700' : 'from-amber-600 to-orange-600'
          } rounded-full flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h3 className={`text-2xl font-bold text-gray-900 mb-3 group-hover:${
            circuitColor === 'emerald' ? 'text-emerald-600' : 'text-amber-600'
          } transition-colors duration-300`}>
            {destination.name}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {destination.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className={`w-4 h-4 ${circuitColor === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span>{destination.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Calendar className={`w-4 h-4 ${circuitColor === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`} />
              <span>{destination.bestTime}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Top Highlights:</h4>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                <span
                  key={idx}
                  className={`${
                    circuitColor === 'emerald' 
                      ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border-emerald-200' 
                      : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200'
                  } px-3 py-1 rounded-full text-xs font-medium border`}
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
              className={`flex-1 bg-gradient-to-r ${
                circuitColor === 'emerald' 
                  ? 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800' 
                  : 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
              } text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate(destination.route)}
              className={`flex-1 border-2 ${
                circuitColor === 'emerald' 
                  ? 'border-emerald-600 text-emerald-600 hover:bg-emerald-50' 
                  : 'border-amber-600 text-amber-600 hover:bg-amber-50'
              } py-3 px-4 rounded-xl transition-all duration-300 font-semibold`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

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
                <div className="text-3xl font-bold text-amber-400 mb-1">12+</div>
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

      {/* Northern Circuit Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Northern Circuit Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full mb-6 shadow-lg">
              <Sunrise className="w-6 h-6" />
              <span className="font-semibold text-lg">Northern Circuit</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Classic Safari
              </span>
              <span className="block mt-2">Adventures</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the world-famous Serengeti, Ngorongoro Crater, and Mount Kilimanjaro in Tanzania's premier safari circuit
            </p>
          </div>

          {/* Northern Circuit Destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {northernCircuit.map((destination, index) => renderDestinationCard(destination, index, 'emerald'))}
          </div>
        </div>
      </section>

      {/* Southern Circuit Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Southern Circuit Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-amber-100 text-amber-800 px-6 py-3 rounded-full mb-6 shadow-lg">
              <Compass className="w-6 h-6" />
              <span className="font-semibold text-lg">Southern Circuit</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Hidden Wilderness
              </span>
              <span className="block mt-2">Gems</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover pristine wilderness, untouched landscapes, and unique experiences in Tanzania's lesser-known southern parks
            </p>
          </div>

          {/* Southern Circuit Destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {southernCircuit.map((destination, index) => renderDestinationCard(destination, index, 'amber'))}
          </div>
        </div>
      </section>

      {/* Special Destinations Section */}


    

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
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
              <Users className="w-5 h-5" />
              <span>Plan Your Trip</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;