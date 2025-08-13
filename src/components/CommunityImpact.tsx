import React from 'react';
import { Heart, TreePine, GraduationCap, HandHeart, Users, TrendingUp } from 'lucide-react';

const CommunityImpact: React.FC = () => {
  const impactStats = [
    { number: '2,500+', label: 'Local Jobs Created', icon: Users },
    { number: '15', label: 'Schools Built', icon: GraduationCap },
    { number: '50,000+', label: 'Trees Planted', icon: TreePine },
    { number: '$1.2M', label: 'Community Investment', icon: TrendingUp }
  ];

  const projects = [
    {
      id: 1,
      title: 'Education Support',
      description: 'Building schools and providing scholarships to local children',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '500+ students supported',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Wildlife Conservation',
      description: 'Protecting endangered species and their natural habitats',
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '10,000 acres protected',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Community Development',
      description: 'Supporting local businesses and sustainable tourism practices',
      image: 'https://images.pexels.com/photos/6492400/pexels-photo-6492400.jpeg?auto=compress&cs=tinysrgb&w=600',
      impact: '200+ families benefited',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-emerald-600">Community Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every journey with us creates positive change. See how your travels contribute 
            to conservation efforts, education, and community development across Tanzania.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <div className={`${project.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {project.impact}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-300 flex items-center space-x-2">
                  <span>Learn More</span>
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center">
            <HandHeart className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Mission
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your travel choices can make a difference. Partner with us to create 
              meaningful impact while experiencing the wonders of Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105">
                Support Our Projects
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                Volunteer With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;