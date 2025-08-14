import React, { useState } from 'react';
import { Camera, Mountain, Waves, Utensils, Users, Heart, Star, Clock, CheckCircle, AlertCircle, User, Mail, Phone, Calendar, MapPin, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperiencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [flashMessage, setFlashMessage] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Trip Details
    experience: '',
    startDate: '',
    endDate: '',
    groupSize: '1',
    specialRequests: '',
    // Payment Details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const showFlashMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setFlashMessage({ type, message });
    setTimeout(() => setFlashMessage(null), 4000);
  };

  const validateStep = (step: number) => {
    const errors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) {
        errors.firstName = ' First name is required for your booking';
      } else if (formData.firstName.trim().length < 2) {
        errors.firstName = ' First name must be at least 2 characters long';
      }
      
      if (!formData.lastName.trim()) {
        errors.lastName = ' Last name is required for your booking';
      } else if (formData.lastName.trim().length < 2) {
        errors.lastName = ' Last name must be at least 2 characters long';
      }
      
      if (!formData.email.trim()) {
        errors.email = ' Email address is required to confirm your booking';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = ' Please enter a valid email address (e.g., john@example.com)';
      }
      
      if (!formData.phone.trim()) {
        errors.phone = ' Phone number is required for booking confirmation';
      } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
        errors.phone = ' Please enter a valid phone number (minimum 10 digits)';
      }
    }
    
    if (step === 2) {
      if (!formData.experience.trim()) {
        errors.experience = ' Please select your preferred adventure experience';
      }
      
      if (!formData.startDate.trim()) {
        errors.startDate = ' Start date is required for your adventure';
      } else {
        const startDate = new Date(formData.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (startDate < today) {
          errors.startDate = ' Start date cannot be in the past';
        }
      }
      
      if (!formData.endDate.trim()) {
        errors.endDate = ' End date is required to complete your booking';
      } else if (formData.startDate && formData.endDate) {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        if (endDate <= startDate) {
          errors.endDate = ' End date must be after the start date';
        }
        
        // Calculate trip duration and provide helpful feedback
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
          errors.endDate = ' Maximum trip duration is 30 days. Please adjust your dates.';
        }
      }
      
      if (!formData.groupSize || parseInt(formData.groupSize) < 1) {
        errors.groupSize = ' Group size must be at least 1 person';
      } else if (parseInt(formData.groupSize) > 20) {
        errors.groupSize = ' Maximum group size is 20 people. Contact us for larger groups.';
      }
    }
    
    if (step === 3) {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = ' Credit card number is required for payment';
      } else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = ' Please enter a valid 16-digit credit card number';
      }
      
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = ' Card expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = ' Please enter expiry date in MM/YY format';
      } else {
        // Validate expiry date is not in the past
        const [month, year] = formData.expiryDate.split('/');
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        if (expiryDate < today) {
          errors.expiryDate = ' Card has expired. Please use a valid card.';
        }
      }
      
      if (!formData.cvv.trim()) {
        errors.cvv = ' CVV security code is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = ' CVV must be 3 or 4 digits (found on back of card)';
      }
      
      if (!formData.cardName.trim()) {
        errors.cardName = ' Cardholder name is required as it appears on card';
      } else if (formData.cardName.trim().length < 3) {
        errors.cardName = ' Cardholder name must be at least 3 characters long';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      
      // Enhanced success messages for each step
      if (currentStep === 1) {
        showFlashMessage('success', ` Personal details completed! Welcome ${formData.firstName}! Moving to trip selection...`);
      } else if (currentStep === 2) {
        const selectedExperience = formData.experience.split(' - ')[0];
        showFlashMessage('success', ` Amazing choice! ${selectedExperience} selected. Let's proceed to secure payment...`);
      }
    } else {
      // Enhanced error messages based on step
      if (currentStep === 1) {
        showFlashMessage('error', ' Please complete all personal details to continue your booking');
      } else if (currentStep === 2) {
        showFlashMessage('error', ' Please complete all trip details and select your adventure');
      } else if (currentStep === 3) {
        showFlashMessage('error', ' Please complete all payment information to finalize your booking');
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      const selectedExperience = formData.experience.split(' - ')[0];
      const startDate = new Date(formData.startDate).toLocaleDateString();
      const endDate = new Date(formData.endDate).toLocaleDateString();
      
      showFlashMessage('success', ` Booking confirmed! Your ${selectedExperience} adventure from ${startDate} to ${endDate} is secured! We'll contact you within 24 hours with detailed itinerary. Get ready for an unforgettable experience! `);
      
      setTimeout(() => {
        setShowBookingForm(false);
        setCurrentStep(1);
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          experience: '', startDate: '', endDate: '', groupSize: '1', specialRequests: '',
          cardNumber: '', expiryDate: '', cvv: '', cardName: ''
        });
        setFormErrors({});
      }, 5000); // Extended time to read the success message
    } else {
      showFlashMessage('error', ' Please complete all payment details correctly to finalize your amazing adventure booking');
    }
  };

  const experienceOptions = [
    // Safari & Wildlife Experiences
    'Serengeti National Park Safari - $450/day',
    'Ngorongoro Crater Safari - $380/day', 
    'Tarangire National Park Safari - $320/day',
    'Lake Manyara National Park Safari - $290/day',
    'Big Five Safari Experience - $520/day',
    'Great Migration Tour - $520/day',
    'Night Game Drive - $180/day',
    'Photography Safari - $480/day',
    
    // Adventure & Mountain Experiences
    'Mount Kilimanjaro Climb (Machame Route) - $1200/person',
    'Mount Kilimanjaro Climb (Marangu Route) - $1100/person',
    'Mount Kilimanjaro Climb (Lemosho Route) - $1300/person',
    'Mount Meru Climb - $800/person',
    'Rock Climbing Adventure - $280/day',
    'White Water Rafting - $120/day',
    
    // Beach & Island Experiences
    'Zanzibar Beach Holiday - $250/day',
    'Stone Town Cultural Tour - $80/day',
    'Spice Tour Zanzibar - $50/day',
    'Dhow Sunset Cruise - $60/day',
    'Snorkeling & Diving Experience - $90/day',
    'Prison Island Tour - $45/day',
    
    // Cultural & Community Experiences
    'Maasai Village Visit - $120/day',
    'Traditional Crafts Workshop - $60/day',
    'Cultural Immersion Experience - $150/day',
    'Local Community Project - $100/day',
    
    // Food & Culinary Experiences
    'Cooking Class Experience - $70/day',
    'Street Food Tour - $40/day',
    'Farm to Table Experience - $90/day',
    'Coffee Plantation Tour - $55/day'
  ];

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
          <p className="text-xl text-gray-600">From thrilling safaris to peaceful beach retreats, we offer experiences that create lasting memories</p>
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

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Flash Message */}
            {flashMessage && (
              <div className={`mx-6 mt-6 p-4 rounded-lg flex items-center space-x-3 ${
                flashMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                flashMessage.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                'bg-blue-100 text-blue-800 border border-blue-200'
              }`}>
                {flashMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-medium">{flashMessage.message}</span>
              </div>
            )}

            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Book Your Adventure</h2>
                  <p className="text-gray-600 mt-1">Step {currentStep} of 3</p>
                </div>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 h-2 rounded-full ${
                        step <= currentStep ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Personal Details</span>
                  <span>Trip Details</span>
                  <span>Payment</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-emerald-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Trip Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                    Trip Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Experience *</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        formErrors.experience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Choose your adventure...</option>
                      {experienceOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                    {formErrors.experience && <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                            formErrors.startDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {formErrors.startDate && <p className="text-red-500 text-sm mt-1">{formErrors.startDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          min={formData.startDate || new Date().toISOString().split('T')[0]}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                            formErrors.endDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {formErrors.endDate && <p className="text-red-500 text-sm mt-1">{formErrors.endDate}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group Size *</label>
                    <select
                      value={formData.groupSize}
                      onChange={(e) => handleInputChange('groupSize', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        formErrors.groupSize ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                    {formErrors.groupSize && <p className="text-red-500 text-sm mt-1">{formErrors.groupSize}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                    Payment Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                        handleInputChange('cardNumber', value);
                      }}
                      maxLength={19}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {formErrors.cardNumber && <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          handleInputChange('expiryDate', value);
                        }}
                        maxLength={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                      />
                      {formErrors.expiryDate && <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        maxLength={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          formErrors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        formErrors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Name as it appears on card"
                    />
                    {formErrors.cardName && <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>}
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-medium">{formData.experience || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dates:</span>
                        <span className="font-medium">
                          {formData.startDate && formData.endDate 
                            ? `${formData.startDate} to ${formData.endDate}`
                            : 'Not selected'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Group Size:</span>
                        <span className="font-medium">{formData.groupSize} {parseInt(formData.groupSize) === 1 ? 'person' : 'people'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Booking</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Book Your Adventure
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105"
            >
              Talk to Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesPage;