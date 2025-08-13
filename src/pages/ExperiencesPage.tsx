import React from 'react';
import { Camera, Mountain, Waves, Utensils, Users, Heart, Star, Clock } from 'lucide-react';

const ExperiencesPage: React.FC = () => {
  const experienceCategories = [
    {
      id: 1,
      title: 'Safaris & Wildlife',
      description: 'Get up close with the Big Five and witness nature\'s greatest spectacle',
      icon: Camera,
      image: 'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-emerald-500 to-emerald-600',
      experiences: [
        { name: 'Big Five Safari', duration: '3 days', price: '$450/day', rating: 4.9 },
        { name: 'Great Migration Tour', duration: '5 days', price: '$520/day', rating: 4.8 },
        { name: 'Night Game Drive', duration: '1 day', price: '$180/day', rating: 4.7 },
        { name: 'Photography Safari', duration: '4 days', price: '$480/day', rating: 4.9 }
      ]
    },
    {
      id: 2,
      title: 'Adventure Sports',
      description: 'Thrilling activities from mountain climbing to white-water rafting',
      icon: Mountain,
      image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-orange-500 to-orange-600',
      experiences: [
        { name: 'Kilimanjaro Climb', duration: '7 days', price: '$1200', rating: 4.8 },
        { name: 'Rock Climbing', duration: '2 days', price: '$280/day', rating: 4.6 },
        { name: 'White Water Rafting', duration: '1 day', price: '$120/day', rating: 4.7 },
        { name: 'Paragliding', duration: '1 day', price: '$150/day', rating: 4.5 }
      ]
    },
    {
      id: 3,
      title: 'Beach & Relaxation',
      description: 'Pristine beaches, crystal waters, and ultimate tropical relaxation',
      icon: Waves,
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-blue-500 to-blue-600',
      experiences: [
        { name: 'Zanzibar Beach Resort', duration: '5 days', price: '$180/day', rating: 4.7 },
        { name: 'Dhow Cruise', duration: '1 day', price: '$80/day', rating: 4.6 },
        { name: 'Snorkeling Adventure', duration: '1 day', price: '$60/day', rating: 4.8 },
        { name: 'Spa & Wellness', duration: '3 days', price: '$220/day', rating: 4.9 }
      ]
    },
    {
      id: 4,
      title: 'Cultural Tours',
      description: 'Immerse yourself in local traditions and authentic community experiences',
      icon: Users,
      image: 'https://images.pexels.com/photos/6492400/pexels-photo-6492400.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-purple-500 to-purple-600',
      experiences: [
        { name: 'Maasai Village Visit', duration: '2 days', price: '$120/day', rating: 4.8 },
        { name: 'Stone Town Tour', duration: '1 day', price: '$80/day', rating: 4.7 },
        { name: 'Traditional Crafts Workshop', duration: '1 day', price: '$60/day', rating: 4.6 },
        { name: 'Cultural Immersion', duration: '4 days', price: '$150/day', rating: 4.9 }
      ]
    },
    {
      id: 5,
      title: 'Food & Culinary',
      description: 'Taste authentic Tanzanian cuisine and learn traditional cooking methods',
      icon: Utensils,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-red-500 to-red-600',
      experiences: [
        { name: 'Spice Tour Zanzibar', duration: '1 day', price: '$50/day', rating: 4.8 },
        { name: 'Cooking Class', duration: '1 day', price: '$70/day', rating: 4.7 },
        { name: 'Street Food Tour', duration: '1 day', price: '$40/day', rating: 4.6 },
        { name: 'Farm to Table Experience', duration: '2 days', price: '$90/day', rating: 4.9 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Unique <span className="text-amber-400">Experiences</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            From heart-pounding adventures to soul-enriching cultural encounters
          </p>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {experienceCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="mb-16">
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                </div>

                {/* Experience Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {category.experiences.map((experience, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image}
                          alt={experience.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-semibold">{experience.rating}</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{experience.name}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{experience.duration}</span>
                          </div>
                          <span className="font-semibold text-emerald-600">{experience.price}</span>
                        </div>
                        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300 font-semibold">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Category CTA */}
                <div className="text-center">
                  <button className={`bg-gradient-to-r ${category.color} text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    View All {category.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real adventurers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                experience: "Kilimanjaro Climb",
                rating: 5,
                comment: "The most challenging yet rewarding experience of my life. The guides were incredible and the views were breathtaking!",
                image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                name: "Michael Chen",
                experience: "Safari Adventure",
                rating: 5,
                comment: "Witnessing the Great Migration was absolutely magical. Every moment was perfectly planned and executed.",
                image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
              },
              {
                name: "Emma Rodriguez",
                experience: "Cultural Tour",
                rating: 5,
                comment: "The Maasai village visit opened my eyes to a beautiful culture. It was authentic and deeply moving.",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.experience}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create Your Perfect Tanzania Experience
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let us craft a personalized adventure that matches your interests and dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Plan My Adventure
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
              Talk to Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;