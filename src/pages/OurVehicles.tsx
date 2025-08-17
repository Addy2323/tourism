import React, { useEffect, useRef, useState } from 'react';
import { Users, Shield, Compass, Camera, Wifi, Snowflake, Radio, MapPin, Award, CheckCircle } from 'lucide-react';

const OurVehicles: React.FC = () => {
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

  const vehicles = [
    {
      name: 'Toyota Land Cruiser V8',
      type: 'Premium Safari Vehicle',
      image: 'https://images.unsplash.com/photo-1623264025997-7f3e64bec444?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRveW90YSUyMGxhbmQlMjBjcnVpc2VyfGVufDB8fDB8fHww',
      capacity: '7 passengers',
      features: ['Pop-up roof', '360° viewing', 'Air conditioning', 'GPS navigation', 'First aid kit', 'Cooler box'],
      specifications: {
        engine: '4.5L V8 Diesel',
        transmission: 'Automatic',
        drivetrain: '4WD',
        fuelCapacity: '138L',
        range: '800km'
      },
      description: 'Our flagship safari vehicle offering the ultimate in comfort and game viewing. Perfect for luxury safaris and photography tours.'
    },
    {
      name: 'Toyota Land Cruiser Prado',
      type: 'Standard Safari Vehicle',
      image: 'https://images.unsplash.com/photo-1668171938674-abc34c21fd7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG95b3RhJTIwbGFuZCUyMGNydWlzZXIlMjBwcmFkb3xlbnwwfHwwfHx8MA%3D%3D',
      capacity: '7 passengers',
      features: ['Pop-up roof', 'Window seats', 'Air conditioning', 'Radio communication', 'Safety equipment', 'Storage space'],
      specifications: {
        engine: '3.0L Diesel',
        transmission: 'Manual/Automatic',
        drivetrain: '4WD',
        fuelCapacity: '87L',
        range: '600km'
      },
      description: 'Reliable and comfortable safari vehicle ideal for game drives and cultural tours. Excellent visibility and smooth ride.'
    },
    {
      name: 'Toyota Hiace Super Custom',
      type: 'Group Safari Van',
      image: 'https://images.unsplash.com/photo-1727908147407-fa90e969c4dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRveW90YSUyMGhpYWNlfGVufDB8fDB8fHww',
      capacity: '14 passengers',
      features: ['Large windows', 'Comfortable seating', 'Air conditioning', 'PA system', 'Luggage space', 'Easy access'],
      specifications: {
        engine: '2.7L Petrol',
        transmission: 'Manual',
        drivetrain: '2WD',
        fuelCapacity: '70L',
        range: '500km'
      },
      description: 'Perfect for larger groups and airport transfers. Spacious interior with excellent comfort for longer journeys.'
    },
    {
      name: 'Land Rover Defender',
      type: 'Adventure Vehicle',
      image: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFuZCUyMHJvdmVyJTIwZGVmZW5kZXJ8ZW58MHx8MHx8fDA%3D',
      capacity: '8 passengers',
      features: ['Open roof', 'Rugged design', 'Off-road capability', 'Safari seating', 'Communication radio', 'Recovery equipment'],
      specifications: {
        engine: '2.4L Diesel',
        transmission: 'Manual',
        drivetrain: '4WD',
        fuelCapacity: '93L',
        range: '650km'
      },
      description: 'Classic safari experience with authentic open-air game viewing. Perfect for adventurous travelers seeking the traditional safari feel.'
    },
    {
      name: 'Toyota Coaster',
      type: 'Large Group Transport',
      image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG95b3RhfGVufDB8fDB8fHww',
      capacity: '29 passengers',
      features: ['Panoramic windows', 'Reclining seats', 'Air conditioning', 'Entertainment system', 'Ample luggage', 'Comfortable ride'],
      specifications: {
        engine: '4.2L Diesel',
        transmission: 'Manual',
        drivetrain: '2WD',
        fuelCapacity: '100L',
        range: '550km'
      },
      description: 'Ideal for large groups, school trips, and conference transfers. Maximum comfort for extended travel periods.'
    },
    {
      name: 'Specialized Photography Vehicle',
      type: 'Photography Safari',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyfGVufDB8fDB8fHww',
      capacity: '6 passengers',
      features: ['Bean bag supports', 'Camera mounts', 'Extended roof', 'Charging ports', 'Lens storage', 'Quiet operation'],
      specifications: {
        engine: '4.2L Diesel',
        transmission: 'Manual',
        drivetrain: '4WD',
        fuelCapacity: '90L',
        range: '700km'
      },
      description: 'Specially modified for wildlife photography with professional camera support systems and optimal positioning.'
    }
  ];

  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All vehicles equipped with first aid kits, fire extinguishers, and emergency communication devices.'
    },
    {
      icon: Award,
      title: 'Regular Maintenance',
      description: 'Comprehensive maintenance schedule ensures all vehicles are in peak condition for your safari.'
    },
    {
      icon: Radio,
      title: '24/7 Communication',
      description: 'Radio communication with base and other vehicles ensures constant contact and support.'
    },
    {
      icon: MapPin,
      title: 'GPS Tracking',
      description: 'All vehicles equipped with GPS tracking for navigation and emergency location services.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-20 pt-28 lg:pt-36">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Safari Fleet</h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Discover our modern, well-maintained fleet of safari vehicles designed for comfort, safety, 
              and optimal wildlife viewing. From luxury Land Cruisers to specialized photography vehicles, 
              we have the perfect ride for your Tanzania adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vehicle Fleet</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our diverse range of safari vehicles, each designed for specific experiences and group sizes
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {vehicles.map((vehicle, index) => (
                <div 
                  key={index} 
                  ref={(ref) => cardRefs.current[index] = ref} 
                  data-index={index} 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${visibleCards.has(index) ? 'animate-fadeIn' : 'opacity-0'}`}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.name}</h3>
                        <p className="text-emerald-600 font-semibold text-sm">{vehicle.type}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{vehicle.capacity}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{vehicle.description}</p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {vehicle.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Specifications */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3">Specifications:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="font-medium">Engine:</span> {vehicle.specifications.engine}</div>
                        <div><span className="font-medium">Transmission:</span> {vehicle.specifications.transmission}</div>
                        <div><span className="font-medium">Drive:</span> {vehicle.specifications.drivetrain}</div>
                        <div><span className="font-medium">Fuel:</span> {vehicle.specifications.fuelCapacity}</div>
                        <div><span className="font-medium">Range:</span> {vehicle.specifications.range}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Maintenance */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Safety & Maintenance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your safety is our top priority. Every vehicle in our fleet meets the highest safety standards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {safetyFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Standards</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Rigorous Maintenance</h3>
                      <p className="text-gray-700">Every vehicle undergoes comprehensive maintenance checks before and after each safari to ensure optimal performance and safety.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                      <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Certified Drivers</h3>
                      <p className="text-gray-700">All our drivers are professionally trained, licensed, and experienced in safari conditions and wildlife behavior.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                      <Compass className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Modern Equipment</h3>
                      <p className="text-gray-700">GPS navigation, satellite communication, and emergency equipment ensure you're always connected and safe.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFuemFuaWF8ZW58MHx8MHx8fDA%3D"
                  alt="Safari Vehicle in Tanzania"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Safety Record</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready for Your Safari?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Choose your preferred vehicle and let us create an unforgettable Tanzania safari experience for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                Book Your Safari
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurVehicles;
