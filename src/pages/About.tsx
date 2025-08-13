import React from 'react';
import { ShieldCheck, Star, BedDouble, Users, MapPin, Phone, Mail } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Emmanuel Mbise",
      role: "Safari Guide",
      image: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "At Babbler we challenge our employees to be leaders in our industry. This philosophy is embodied in our 3 core values: People, professionalism, and partnership. We professionally serve you through our vast experience in the industry and the kind of exposure we have on the land."
    },
    {
      name: "Noel Nkirwa",
      role: "Operations Manager",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "My role is to make sure your travel, tour, and safaris meet your expectations and cost-effective to meet your budget. We are using proven methods and cutting-edge technology to successfully cut costs, streamline operations and increase productivity."
    }
  ];

  const whyChooseUs = [
    {
      title: "Exceptional Services",
      description: "We meticulously handle every detail of your travel from booking to departure, ensuring a seamless and stress-free adventure.",
      icon: Star
    },
    {
      title: "Tailored Itineraries",
      description: "We customize each itinerary to match your travel dates and preferences, placing you in the right location at the perfect time.",
      icon: Users
    },
    {
      title: "Premium Accommodations",
      description: "We offer a diverse range of accommodations, from luxury to budget-friendly, guaranteeing comfort and quality for every traveler.",
      icon: BedDouble
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About <span className="text-amber-400">Babblers Tours & Safaris</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Crafting personalized safari experiences in the heart of Tanzania.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Babblers Tours & Safaris, we believe that every journey should be an unforgettable experience. Founded in 2017 in Arusha, Tanzania, your gateway to the country’s iconic national parks, we are a socially responsible adventure travel company dedicated to crafting personalized safari experiences that showcase the breathtaking landscapes, incredible wildlife, and vibrant culture of Tanzania.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our roots run deep within the local community, allowing us to provide authentic and immersive safaris tailored to your interests. Whether you’re trekking Mount Kilimanjaro, exploring the vast Serengeti, or discovering the hidden gems of Tanzania’s National Parks, our expert team will ensure your adventure exceeds expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate experts behind your unforgettable journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full md:w-1/3 h-64 md:h-full object-cover"
                />
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-base leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Remarks */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-4xl font-bold mb-4">KARIBU SANA!</h2>
           <p className="text-xl mb-8">We warmly welcome you to join our global network and experience the home of hospitality and unforgettable safaris. Hakuna Matata!</p>
           <a href="/plan-your-trip" className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block">
              Start Your Adventure
            </a>
        </div>
      </section>
    </div>
  );
};

export default About;