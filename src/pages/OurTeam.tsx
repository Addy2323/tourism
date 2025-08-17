import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Award, Users, Camera, Compass, Heart } from 'lucide-react';

const OurTeam: React.FC = () => {
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

  const leadership = [
    {
      name: 'James Mwangi',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'With over 20 years in the tourism industry, James founded Big Time Adventures with a vision to showcase Tanzania\'s beauty while supporting local communities.',
      email: 'james@bigtimeadventures.com',
      phone: '+255 123 456 789',
      specialties: ['Business Strategy', 'Community Development', 'Conservation']
    },
    {
      name: 'Sarah Kimani',
      position: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      bio: 'Sarah ensures every safari runs smoothly with her exceptional organizational skills and deep knowledge of Tanzania\'s national parks.',
      email: 'sarah@bigtimeadventures.com',
      phone: '+255 123 456 790',
      specialties: ['Operations Management', 'Logistics', 'Customer Service']
    },
    {
      name: 'Michael Temba',
      position: 'Head Guide & Safety Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'A certified wilderness first aid instructor and master tracker, Michael leads our guide training programs and maintains our safety standards.',
      email: 'michael@bigtimeadventures.com',
      phone: '+255 123 456 791',
      specialties: ['Wildlife Tracking', 'Safety Training', 'Guide Development']
    }
  ];

  const guides = [
    {
      name: 'Emmanuel Mollel',
      position: 'Senior Safari Guide',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      experience: '12 years',
      languages: ['English', 'Swahili', 'Maasai'],
      specialties: ['Big Five Tracking', 'Bird Watching', 'Cultural Tours'],
      bio: 'Emmanuel\'s passion for wildlife and storytelling makes every safari unforgettable. He holds a degree in Wildlife Management.'
    },
    {
      name: 'Grace Mushi',
      position: 'Cultural Experience Guide',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      experience: '8 years',
      languages: ['English', 'Swahili', 'Chagga'],
      specialties: ['Cultural Immersion', 'Local Traditions', 'Community Tours'],
      bio: 'Grace bridges cultures with her warm personality and deep knowledge of Tanzanian traditions and customs.'
    },
    {
      name: 'David Lyimo',
      position: 'Mountain Guide',
      image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
      experience: '15 years',
      languages: ['English', 'Swahili', 'German'],
      specialties: ['Kilimanjaro Climbing', 'High Altitude Safety', 'Photography'],
      bio: 'David has successfully guided over 500 climbers to Kilimanjaro\'s summit with an impressive 98% success rate.'
    },
    {
      name: 'Amina Hassan',
      position: 'Wildlife Photographer Guide',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      experience: '10 years',
      languages: ['English', 'Swahili', 'French'],
      specialties: ['Wildlife Photography', 'Behavioral Studies', 'Conservation'],
      bio: 'Amina combines her photography expertise with wildlife knowledge to help guests capture stunning safari memories.'
    },
    {
      name: 'Peter Massawe',
      position: 'Adventure Guide',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      experience: '9 years',
      languages: ['English', 'Swahili', 'Italian'],
      specialties: ['Walking Safaris', 'Camping Expeditions', 'Survival Skills'],
      bio: 'Peter specializes in off-the-beaten-path adventures and has extensive knowledge of Tanzania\'s remote wilderness areas.'
    },
    {
      name: 'Fatuma Juma',
      position: 'Family Safari Specialist',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
      experience: '7 years',
      languages: ['English', 'Swahili', 'Arabic'],
      specialties: ['Family Tours', 'Educational Programs', 'Child Safety'],
      bio: 'Fatuma creates magical safari experiences for families, ensuring both adventure and safety for travelers of all ages.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-20 pt-28 lg:pt-36">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Meet Our Team</h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Our passionate team of local experts, experienced guides, and dedicated professionals 
              are committed to creating extraordinary safari experiences while supporting Tanzania's 
              communities and conservation efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the visionaries behind Big Time Adventures
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <div 
                  key={index} 
                  ref={el => cardRefs.current[index] = el}
                  data-index={index}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700 transform ${
                    visibleCards.has(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: visibleCards.has(index) ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                    <p className="text-emerald-600 font-semibold mb-4">{leader.position}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{leader.bio}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{leader.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{leader.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {leader.specialties.map((specialty, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safari Guides */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Guides</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced local professionals who bring Tanzania's wildlife and culture to life
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide, index) => {
                const cardIndex = leadership.length + index;
                return (
                  <div 
                    key={index} 
                    ref={el => cardRefs.current[cardIndex] = el}
                    data-index={cardIndex}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-700 transform ${
                      visibleCards.has(cardIndex) 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: visibleCards.has(cardIndex) ? `${(index % 3) * 200}ms` : '0ms'
                    }}
                  >
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{guide.name}</h3>
                      <p className="text-emerald-600 font-semibold text-sm mb-2">{guide.position}</p>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{guide.experience}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">{guide.bio}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Languages:</h4>
                        <div className="flex flex-wrap gap-1">
                          {guide.languages.map((lang, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {guide.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Our Team Special</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The qualities that set our team apart
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
                <p className="text-gray-700">Born and raised in Tanzania, our team knows every trail, every animal behavior, and every cultural nuance.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Professionals</h3>
                <p className="text-gray-700">All our guides are certified by Tanzania Tourism Association and undergo continuous training.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Passionate Storytellers</h3>
                <p className="text-gray-700">Every team member is passionate about sharing Tanzania's incredible stories and natural wonders.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Safety First</h3>
                <p className="text-gray-700">Wilderness first aid certified and trained in emergency procedures to ensure your safety.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h2>
            <p className="text-xl text-gray-700 mb-8">
              Are you passionate about wildlife, conservation, and creating unforgettable experiences? 
              We're always looking for talented individuals to join our growing family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                View Open Positions
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                Submit Your CV
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
