import React from 'react';
import { Camera, Mountain, Waves, Utensils, Users, ArrowRight } from 'lucide-react';

const Experiences: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: 'Safaris & Wildlife',
      description: 'Get up close with the Big Five and witness nature\'s greatest spectacle',
      icon: Camera,
      image: 'https://media.istockphoto.com/id/1005476954/photo/woman-photographing-elephants-in-safari-jeep-africa.jpg?s=612x612&w=0&k=20&c=tzmrQ7Illui-bTnRySXrY--oWQ9K6lmZnTKsYlgzU1A=',
      color: 'from-emerald-500 to-emerald-600',
      tours: '25+ Tours Available'
    },
    {
      id: 2,
      title: 'Adventure Sports',
      description: 'Thrilling activities from mountain climbing to white-water rafting',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1628157003133-5a70219a2d30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkdmVudHVyZSUyMHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D',
      color: 'from-orange-500 to-orange-600',
      tours: '15+ Adventures'
    },
    {
      id: 3,
      title: 'Beach & Relaxation',
      description: 'Pristine beaches, crystal waters, and ultimate tropical relaxation',
      icon: Waves,
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-blue-500 to-blue-600',
      tours: '20+ Beach Experiences'
    },
    {
      id: 4,
      title: 'Cultural Tours',
      description: 'Immerse yourself in local traditions and authentic community experiences',
      icon: Users,
      image: 'https://media.istockphoto.com/id/507877508/photo/masai-unity.jpg?s=612x612&w=0&k=20&c=0QlmU5oKiYtiygWIxo5RlSzzBzACIFOACIucO5UOWe8=',
      color: 'from-purple-500 to-purple-600',
      tours: '18+ Cultural Experiences'
    },
    {
      id: 5,
      title: 'Food & Culinary',
      description: 'Taste authentic Tanzanian cuisine and learn traditional cooking methods',
      icon: Utensils,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-red-500 to-red-600',
      tours: '12+ Culinary Tours'
    }
  ];

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unique <span className="text-emerald-600">Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From heart-pounding adventures to soul-enriching cultural encounters, 
            discover experiences that will transform your perspective on travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <div
                key={experience.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${experience.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-80 flex flex-col justify-between text-white">
                  <div>
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{experience.title}</h3>
                      <p className="text-white/90 leading-relaxed">{experience.description}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {experience.tours}
                      </span>
                    </div>
                    
                    <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2 group">
                      <span className="font-semibold">Explore Experiences</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Your Tanzania Adventure?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let our local experts craft the perfect itinerary tailored to your interests and travel style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Plan Your Trip
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;