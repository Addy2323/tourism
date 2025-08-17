import React from 'react';
import { Award, Globe, Heart, Shield, Users, MapPin, Calendar, Star } from 'lucide-react';

const AboutCompany: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '10,000+' },
    { icon: MapPin, label: 'Destinations', value: '50+' },
    { icon: Calendar, label: 'Years Experience', value: '15+' },
    { icon: Award, label: 'Awards Won', value: '25+' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Authentic Experiences',
      description: 'We believe in creating genuine connections between travelers and local communities, ensuring every journey is meaningful and transformative.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. We maintain the highest safety standards with experienced guides and well-maintained equipment.'
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We are committed to responsible tourism that benefits local communities and preserves Tanzania\'s natural heritage for future generations.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from planning to execution, ensuring unforgettable experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-20 pt-28 lg:pt-36">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Big Time Adventures</h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              For over 15 years, we've been crafting extraordinary safari experiences that connect travelers 
              with the raw beauty and authentic culture of Tanzania. Our passion for adventure and commitment 
              to excellence has made us one of East Africa's most trusted tour operators.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Big Time Adventures was born from a simple dream: to share the incredible beauty and 
                    rich culture of Tanzania with the world. Founded in 2008 by a group of passionate 
                    local guides and international adventure enthusiasts, we started with just one vehicle 
                    and an unwavering commitment to authentic experiences.
                  </p>
                  <p>
                    What began as a small operation has grown into one of Tanzania's most respected tour 
                    companies, but our core values remain unchanged. We believe that travel should be 
                    transformative, not just for our guests, but for the communities we visit and the 
                    environment we explore.
                  </p>
                  <p>
                    Today, we're proud to employ over 50 local staff members, support numerous community 
                    projects, and continue to set the standard for responsible tourism in East Africa. 
                    Every safari we organize is a testament to our belief that adventure and conservation 
                    can go hand in hand.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/images/about-story.jpg"
                  alt="Our Story"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Driving our passion for adventure and commitment to sustainable tourism
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl">
                <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To create life-changing safari experiences that connect travelers with Tanzania's 
                  incredible wildlife and vibrant cultures, while supporting local communities and 
                  conservation efforts that protect our natural heritage for future generations.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl">
                <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be East Africa's leading sustainable tourism company, recognized for our authentic 
                  experiences, exceptional service, and positive impact on wildlife conservation and 
                  community development throughout Tanzania.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and travelers worldwide
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl">
                <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">TripAdvisor Excellence</h3>
                <p className="text-gray-700">Certificate of Excellence for 5 consecutive years</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Tourism</h3>
                <p className="text-gray-700">Certified by Tanzania Tourism Association</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                <Star className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Safari Operator of the Year</h3>
                <p className="text-gray-700">East Africa Tourism Awards 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutCompany;
