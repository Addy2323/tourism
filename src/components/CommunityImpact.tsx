import React from 'react';
import { Heart, TreePine, GraduationCap, HandHeart, Users, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const CommunityImpact: React.FC = () => {
  const impactStats = [
    { number: '2,500+', label: 'Local Jobs Created', icon: Users, color: 'from-emerald-500 to-emerald-600' },
    { number: '15', label: 'Schools Built', icon: GraduationCap, color: 'from-blue-500 to-blue-600' },
    { number: '50,000+', label: 'Trees Planted', icon: TreePine, color: 'from-green-500 to-green-600' },
    { number: '$1.2M', label: 'Community Investment', icon: TrendingUp, color: 'from-amber-500 to-amber-600' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Education Support',
      description: 'Building schools and providing scholarships to local children, empowering the next generation with quality education',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '500+ students supported',
      gradient: 'from-blue-500/90 to-indigo-600/90',
      featured: true
    },
    {
      id: 2,
      title: 'Wildlife Conservation',
      description: 'Protecting endangered species and their natural habitats through sustainable tourism and conservation initiatives',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '10,000 acres protected',
      gradient: 'from-green-500/90 to-emerald-600/90',
      featured: false
    },
    {
      id: 3,
      title: 'Community Development',
      description: 'Supporting local businesses and sustainable tourism practices that benefit entire communities long-term',
      image: 'https://images.pexels.com/photos/6492400/pexels-photo-6492400.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '200+ families benefited',
      gradient: 'from-purple-500/90 to-violet-600/90',
      featured: true
    }
  ];

  return (
    <section id="impact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50">
      <div className="container-mobile">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-800 text-sm font-medium tracking-wide">
              Making a Difference
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up text-balance" style={{ animationDelay: '0.1s' }}>
            Our{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700">
                Community Impact
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 blur-lg -z-10"></div>
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Every journey with us creates positive change. See how your travels contribute 
            to conservation efforts, education, and community development across Tanzania through responsible tourism.
          </p>
        </div>

        {/* Enhanced Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <div className="card-classic hover:shadow-classic-xl transition-all duration-500 transform hover:-translate-y-2 p-4 sm:p-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-classic group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm sm:text-base leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group card-classic hover:shadow-classic-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 150 + 600}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Enhanced Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-classic z-10">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-semibold">Featured</span>
                  </div>
                )}
                
                {/* Impact Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-classic">
                  {project.impact}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-all duration-300 flex items-center space-x-2 group/btn">
                  <span>Learn More</span>
                  <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-classic-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-classic">
                <HandHeart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Join Our Mission
              </h3>
              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                Your travel choices can make a difference. Partner with us to create 
                meaningful impact while experiencing the wonders of Tanzania through sustainable tourism.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <button className="w-full sm:w-auto bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-classic hover:shadow-classic-lg inline-flex items-center justify-center gap-2">
                  <span>Support Our Projects</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  Volunteer With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;