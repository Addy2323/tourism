import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mountain, Waves, Utensils, Users, ArrowRight, Sparkles, Star } from 'lucide-react';

const Experiences: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/experiences');
  };

  const experiences = [
    {
      id: 1,
      title: 'Safaris & Wildlife',
      description: 'Get up close with the Big Five and witness nature\'s greatest spectacle in Tanzania\'s pristine wilderness',
      icon: Camera,
      image: 'https://media.istockphoto.com/id/1005476954/photo/woman-photographing-elephants-in-safari-jeep-africa.jpg?s=612x612&w=0&k=20&c=tzmrQ7Illui-bTnRySXrY--oWQ9K6lmZnTKsYlgzU1A=',
      gradient: 'from-emerald-500/90 to-emerald-700/90',
      tours: '25+ Tours Available',
      rating: 4.9,
      featured: true
    },
    {
      id: 2,
      title: 'Adventure Sports',
      description: 'Thrilling activities from mountain climbing to white-water rafting for the ultimate adrenaline rush',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1628157003133-5a70219a2d30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkdmVudHVyZSUyMHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D',
      gradient: 'from-amber-500/90 to-orange-600/90',
      tours: '15+ Adventures',
      rating: 4.8,
      featured: false
    },
    {
      id: 3,
      title: 'Beach & Relaxation',
      description: 'Pristine beaches, crystal waters, and ultimate tropical relaxation on Zanzibar\'s stunning coastline',
      icon: Waves,
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600',
      gradient: 'from-blue-500/90 to-cyan-600/90',
      tours: '20+ Beach Experiences',
      rating: 4.7,
      featured: false
    },
    {
      id: 4,
      title: 'Cultural Tours',
      description: 'Immerse yourself in local traditions and authentic community experiences with Maasai and local tribes',
      icon: Users,
      image: 'https://media.istockphoto.com/id/507877508/photo/masai-unity.jpg?s=612x612&w=0&k=20&c=0QlmU5oKiYtiygWIxo5RlSzzBzACIFOACIucO5UOWe8=',
      gradient: 'from-purple-500/90 to-indigo-600/90',
      tours: '18+ Cultural Experiences',
      rating: 4.9,
      featured: true
    },
    {
      id: 5,
      title: 'Food & Culinary',
      description: 'Taste authentic Tanzanian cuisine and learn traditional cooking methods from local chefs and families',
      icon: Utensils,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      gradient: 'from-red-500/90 to-rose-600/90',
      tours: '12+ Culinary Tours',
      rating: 4.6,
      featured: false
    }
  ];

  return (
    <section id="experiences" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-mobile">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-800 text-sm font-medium tracking-wide">
              Curated Adventures
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up text-balance" style={{ animationDelay: '0.1s' }}>
            Unique{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700">
                Experiences
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 blur-lg -z-10"></div>
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From heart-pounding adventures to soul-enriching cultural encounters, 
            discover experiences that will transform your perspective on travel and create lasting memories.
          </p>
        </div>

        {/* Enhanced Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <div
                key={experience.id}
                className="group relative overflow-hidden rounded-2xl shadow-classic hover:shadow-classic-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 150 + 300}ms` }}
              >
                {/* Enhanced Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${experience.gradient} group-hover:opacity-95 transition-opacity duration-300`}></div>
                  
                  {/* Enhanced Overlay Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Enhanced Badges */}
                {experience.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-classic z-20">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-semibold">Popular</span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-classic z-20">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">{experience.rating}</span>
                </div>

                {/* Enhanced Content */}
                <div className="relative z-10 p-6 sm:p-8 h-80 sm:h-96 flex flex-col justify-between text-white">
                  <div>
                    <div className="mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-classic">
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-amber-100 transition-colors duration-300">
                        {experience.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base line-clamp-3">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-classic">
                        {experience.tours}
                      </span>
                    </div>
                    
                    <button 
                      onClick={handleExploreClick}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 px-4 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 group/btn shadow-classic hover:shadow-classic-lg transform hover:scale-[1.02] font-semibold"
                    >
                      <span>Explore Experiences</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-16 sm:mt-20 lg:mt-24 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-classic-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready for Your Tanzania Adventure?
              </h3>
              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                Let our local experts craft the perfect itinerary tailored to your interests and travel style. 
                Experience authentic Tanzania with sustainable and responsible tourism.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <button 
                  onClick={() => navigate('/plan-your-trip')}
                  className="w-full sm:w-auto bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-classic hover:shadow-classic-lg inline-flex items-center justify-center gap-2"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;