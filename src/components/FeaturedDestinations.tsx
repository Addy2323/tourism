import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Star, Sparkles } from 'lucide-react';
import Price from './Price';

const FeaturedDestinations: React.FC = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const destinations = [
    {
      id: 1,
      name: 'Serengeti National Park',
      description: 'Witness the Great Migration and endless plains teeming with wildlife in Africa\'s most famous safari destination',
      image: 'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3-7 days',
      rating: 4.9,
      priceUSD: 450,
      priceUnit: '/day',
      highlights: ['Great Migration', 'Big Five', 'Hot Air Balloons'],
      route: '/destinations/serengeti',
      featured: true
    },


    {
      id: 4,
      name: 'Ngorongoro Crater',
      description: 'The world\'s largest intact volcanic caldera and wildlife haven with incredible biodiversity',
      image: 'https://plus.unsplash.com/premium_photo-1697729506473-f0f7e3a5407c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmdvcm9uZ29ybyUyMGNyYXRlcnxlbnwwfHwwfHx8MA%3D%3D',
      duration: '1-3 days',
      rating: 4.9,
      priceUSD: 380,
      priceUnit: '/day',
      highlights: ['Crater Floor', 'Black Rhinos', 'Maasai Culture'],
      route: '/destinations/ngorongoro',
      featured: true
    },
    {
      id: 5,
      name: 'Mikumi National Park',
      description: 'Tanzania\'s fourth largest national park, offering excellent wildlife viewing with diverse landscapes and abundant game',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2-4 days',
      rating: 4.6,
      priceUSD: 320,
      priceUnit: '/day',
      highlights: ['Elephants', 'Lions', 'Baobab Trees'],
      route: '/destinations/mikumi',
      featured: false
    },
    {
      id: 6,
      name: 'Udzungwa Mountains National Park',
      description: 'A biodiversity hotspot with pristine rainforests, endemic species, and spectacular waterfalls perfect for hiking',
      image: 'https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2-5 days',
      rating: 4.7,
      priceUSD: 280,
      priceUnit: '/day',
      highlights: ['Waterfalls', 'Endemic Primates', 'Hiking Trails'],
      route: '/destinations/udzungwa',
      featured: false
    },
    {
      id: 7,
      name: 'Selous Game Reserve',
      description: 'Africa\'s largest game reserve offering pristine wilderness, boat safaris, and walking safaris in untouched nature',
      image: 'https://images.pexels.com/photos/1670732/pexels-photo-1670732.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3-6 days',
      rating: 4.8,
      priceUSD: 420,
      priceUnit: '/day',
      highlights: ['Boat Safaris', 'Walking Safaris', 'Wild Dogs'],
      route: '/destinations/selous',
      featured: true
    },
    {
      id: 8,
      name: 'Saadani National Park',
      description: 'The only park where beach meets bush - unique coastal safari experience with elephants on pristine beaches',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2-4 days',
      rating: 4.5,
      priceUSD: 350,
      priceUnit: '/day',
      highlights: ['Beach Safari', 'Sea Turtles', 'Coastal Wildlife'],
      route: '/destinations/saadani',
      featured: false
    }
  ];

  return (
    <section id="destinations" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-mobile">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-amber-800 text-sm font-medium tracking-wide">
              Handpicked Destinations
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up text-balance" style={{ animationDelay: '0.1s' }}>
            Featured{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
                Destinations
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-amber-600/20 blur-lg -z-10"></div>
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover Tanzania's most iconic locations, each offering unique experiences 
            and unforgettable memories that will last a lifetime through sustainable tourism.
          </p>
        </div>

        {/* Enhanced Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              ref={(ref) => cardRefs.current[index] = ref}
              data-index={index}
              className={`group card-classic hover:shadow-classic-xl transition-all duration-500 transform hover:-translate-y-2 ${visibleCards.has(index) ? 'animate-fadeIn' : 'opacity-0'}`}
            >
              {/* Enhanced Image Container */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Enhanced Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Featured Badge */}
                {destination.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-classic">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-semibold">Featured</span>
                  </div>
                )}
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-classic">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-emerald-600/95 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-classic">
                  <Price amountUSD={destination.priceUSD} prefix="From " unit={destination.priceUnit} />
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                  {destination.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                  {destination.description}
                </p>

                {/* Enhanced Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Tanzania</span>
                  </div>
                </div>

                {/* Enhanced Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-amber-100 transition-colors duration-200"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <button 
                  onClick={() => navigate(destination.route)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 flex items-center justify-center space-x-2 group/btn shadow-classic hover:shadow-classic-lg transform hover:scale-[1.02] font-semibold"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-100 rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Explore More?
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discover all our incredible destinations across Tanzania, from wildlife safaris to cultural experiences.
            </p>
            
            <button 
              type="button"
              onClick={() => navigate('/destinations')}
              className="btn-accent text-lg px-8 py-4 inline-flex items-center gap-3 group"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;