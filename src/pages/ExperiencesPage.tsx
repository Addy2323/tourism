import React from 'react';
import { Camera, Mountain, Waves, Utensils, Users, Heart, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperiencesPage: React.FC = () => {
  const navigate = useNavigate();

  const experienceCategories = [
    {
      id: 1,
      title: 'Safaris & Wildlife',
      description: 'Get up close with the Big Five and witness nature\'s greatest spectacle',
      icon: Camera,
      image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1200',
      color: 'from-emerald-500 to-emerald-600',
      experiences: [
        {
          name: 'Big Five Safari',
          duration: '3 days',
          price: '$450/day',
          rating: 4.9,
          image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1200'
        },
        {
          name: 'Great Migration Tour',
          duration: '5 days',
          price: '$520/day',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1580145575237-75fec2a0320b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D'
        },
        {
          name: 'Night Game Drive',
          duration: '1 day',
          price: '$180/day',
          rating: 4.7,
          image: 'https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&w=1200'
        },
        {
          name: 'Photography Safari',
          duration: '4 days',
          price: '$480/day',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1602410132231-9e6c692e02db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRhbnphbmlhJTIwc2FmYXJpfGVufDB8fDB8fHww'
        }
      ]
    },
    {
      id: 2,
      title: 'Adventure Sports',
      description: 'Thrilling activities from mountain climbing to white-water rafting',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1628157003133-5a70219a2d30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkdmVudHVyZSUyMHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D',
      color: 'from-orange-500 to-orange-600',
      experiences: [
        { 
          name: 'Kilimanjaro Climb', 
          duration: '7 days', 
          price: '$1200', 
          rating: 4.8, 
          image: 'https://images.unsplash.com/photo-1621414050946-1b936a78491f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2lsaW1hbmphcm98ZW58MHx8MHx8fDA%3D' 
        },
        { 
          name: 'Rock Climbing', 
          duration: '2 days', 
          price: '$280/day', 
          rating: 4.6, 
          image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xpbWJ8ZW58MHx8MHx8fDA%3D' 
        },
        { 
          name: 'White Water Rafting', 
          duration: '1 day', 
          price: '$120/day', 
          rating: 4.7, 
          image: 'https://plus.unsplash.com/premium_photo-1661870730088-f9ab6784fc67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJhZnRpbmd8ZW58MHx8MHx8fDA%3D' 
        },
        { 
          name: 'Paragliding', 
          duration: '1 day', 
          price: '$150/day', 
          rating: 4.5, 
          image: 'https://images.unsplash.com/photo-1694811401930-8c827ce2342c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww' 
        }
      ]
    },
    {
      id: 3,
      title: 'Beach & Relaxation',
      description: 'Pristine beaches, crystal waters, and ultimate tropical relaxation',
      icon: Waves,
      image: 'https://images.unsplash.com/photo-1550399504-8953e1a6ac87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlbGF4aW5nJTIwYnklMjB0aGUlMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D',
      color: 'from-blue-500 to-blue-600',
      experiences: [
        { 
          name: 'Zanzibar Beach Resort', 
          duration: '5 days', 
          price: '$180/day', 
          rating: 4.7, 
          image: 'https://media.gettyimages.com/id/1299710059/photo/luxury-resort-zanzibar-island.jpg?s=612x612&w=0&k=20&c=7rZ_Fv9tVnwHbhQvS_-RSqrYonh8cU1pBHZUtYYQDA8=' 
        },
        { 
          name: 'Dhow Cruise', 
          duration: '1 day', 
          price: '$80/day', 
          rating: 4.6, 
          image: 'https://media.gettyimages.com/id/1227533295/photo/a-dhow-catching-good-wind.jpg?s=612x612&w=0&k=20&c=qShVrsbkehz9WDKTScJkC5dn9aH2LHpSrPaoafDPoiA=' 
        },
        { 
          name: 'Snorkeling Adventure', 
          duration: '1 day', 
          price: '$60/day', 
          rating: 4.8, 
          image: 'https://media.gettyimages.com/id/518408852/photo/snorkling-on-zanzibar.jpg?s=612x612&w=0&k=20&c=Xr9cwfnM_B94wntXKoN_GmddoUNMRrERcYlm0j8ZaYQ=' 
        },
        { 
          name: 'Spa & Wellness', 
          duration: '3 days', 
          price: '$220/day', 
          rating: 4.9, 
          image: 'https://media.gettyimages.com/id/1125653538/photo/smiling-young-woman-in-bathrobe-sitting-at-the-poolside-in-a-spa-with-man-in-background.jpg?s=612x612&w=0&k=20&c=H8043YGMcIOeS0JNwIDO3aj7q6OZS4zMYSJPOPAEpEU=' 
        }
      ]
    },
    {
      id: 4,
      title: 'Cultural Tours',
      description: 'Immerse yourself in local traditions and authentic community experiences',
      icon: Users,
      image: 'https://media.gettyimages.com/id/2216567308/photo/maasai-vendor-displaying-colorful-handmade-souvenirs-representing-traditional-craftsmanship.jpg?s=612x612&w=0&k=20&c=VNK2RaGdVZas5_KNdrgfh-4QONknEavptBo022yX4tE=',
      color: 'from-purple-500 to-purple-600',
      experiences: [
        { 
          name: 'Maasai Village Visit', 
          duration: '2 days', 
          price: '$120/day', 
          rating: 4.8, 
          image: 'https://media.gettyimages.com/id/912422690/photo/masai-people-performing-a-traditional-dance.jpg?s=612x612&w=0&k=20&c=eYbZgWDdK2eD9w2RXRg2j6NXN5RajMPqMKcmcrp_sA4=' 
        },
        { 
          name: 'Stone Town Tour', 
          duration: '1 day', 
          price: '$80/day', 
          rating: 4.7, 
          image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1200' 
        },
        { 
          name: 'Traditional Crafts Workshop', 
          duration: '1 day', 
          price: '$60/day', 
          rating: 4.6, 
          image: 'https://media.gettyimages.com/id/1396461623/photo/high-angle-view-of-students-practicing-painting-at-table-in-art-class.jpg?s=612x612&w=0&k=20&c=B2tJy3hxkk7COGCWS7J8E07HvzppHRP5CYOfugUIJvM=' 
        },
        { 
          name: 'Cultural Immersion', 
          duration: '4 days', 
          price: '$150/day', 
          rating: 4.9, 
          image: 'https://media.gettyimages.com/id/2169289341/photo/aerial-view-of-rural-women-on-wooden-boat-in-moc-hoa-district-long-an-province-mekong-delta.jpg?s=612x612&w=0&k=20&c=9zV6MmtmI55OalG7Imm_GF9Sg8xnrOfCUuS_NbviUGc=' 
        }
      ]
    },
    {
      id: 5,
      title: 'Food & Culinary',
      description: 'Taste authentic Tanzanian cuisine and learn traditional cooking methods',
      icon: Utensils,
      image: 'https://media.istockphoto.com/id/2191376006/photo/traditional-tanzanian-meal-displaying-rice-beans-plantains-chapati-fresh-vegetables-colorful.jpg?s=612x612&w=0&k=20&c=AXlMCtwidFIN--Z9GK2hPeXZFxOjWlKFeapXT93oMds=',
      color: 'from-red-500 to-red-600',
      experiences: [
        { 
          name: 'Spice Tour Zanzibar', 
          duration: '1 day', 
          price: '$50/day', 
          rating: 4.8, 
          image: 'https://media.gettyimages.com/id/531118782/photo/zanzibar-fruits-and-spices.jpg?s=612x612&w=0&k=20&c=aMCJLnIjzNvkex5H7p_jaN-JXOIrswxgtTaBGBTbVf0=' 
        },
        { 
          name: 'Cooking Class', 
          duration: '1 day', 
          price: '$70/day', 
          rating: 4.7, 
          image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/cd/dc/6d/caption.jpg?w=800&h=600&s=1' 
        },
        { 
          name: 'Street Food Tour', 
          duration: '1 day', 
          price: '$40/day', 
          rating: 4.6, 
          image: 'https://media.istockphoto.com/id/185599106/photo/street-food-in-stone-town-zanzibar.jpg?s=612x612&w=0&k=20&c=GhlzOTO8QwKNsX9fWlcnxn5l9Y_a8pj-1SPM6cLVf_8=' 
        },
        { 
          name: 'Farm to Table Experience', 
          duration: '2 days', 
          price: '$90/day', 
          rating: 4.9, 
          image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/Kichwa-tembo-garden-farm-to-table-wildchild-experience-with-chef.jpg' 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Unforgettable Experiences</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the magic of Tanzania through our carefully curated adventures
          </p>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Adventure</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From thrilling safaris to peaceful beach retreats, we offer experiences that create lasting memories
          </p>
        </div>

        <div className="space-y-16">
          {experienceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-8 text-white`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <IconComponent className="w-8 h-8" />
                    <h3 className="text-3xl font-bold">{category.title}</h3>
                  </div>
                  <p className="text-lg opacity-90">{category.description}</p>
                </div>

                {/* Experiences Grid */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {category.experiences.map((experience, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48">
                          <img 
                            src={experience.image} 
                            alt={experience.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold">{experience.rating}</span>
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
                          <button 
                            onClick={() => navigate('/booking')}
                            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-300 font-semibold"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Adventurers Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real travelers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                experience: "Kilimanjaro Climb",
                rating: 5,
                comment: "The most challenging yet rewarding experience of my life. The guides were incredible and the views were breathtaking!",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
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
                image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.experience}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-3">
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-6 text-red-300" />
          <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us create a personalized experience that matches your dreams and exceeds your expectations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/booking')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
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