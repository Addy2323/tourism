import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, Play, ArrowRight } from "lucide-react";

const backgroundImages = [

"https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1589177900326-900782f88a55?w=1920&auto=format&fit=crop&q=80",
"https://images.unsplash.com/photo-1575999080555-3f7a698dd8d9?w=1920&auto=format&fit=crop&q=80",
"https://plus.unsplash.com/premium_photo-1661831880989-bb3184c5dcc8?w=1920&auto=format&fit=crop&q=80",
"https://images.unsplash.com/photo-1549035092-33b2937b075a?w=1920&auto=format&fit=crop&q=80",
"https://images.unsplash.com/photo-1586347378036-7a8c24975a61?w=1920&auto=format&fit=crop&q=80",
"https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/11081448/pexels-photo-11081448.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1605706177774-8b50d8457dfe?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/8828591/pexels-photo-8828591.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/802112/pexels-photo-802112.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1549366021-9f761d040ed2?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/3551227/pexels-photo-3551227.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1563833717765-00460e0a9772?w=1920&auto=format&fit=crop&q=80",
"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/6633919/pexels-photo-6633919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1589177736491-9d2c3e7b0c4e?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/3889871/pexels-photo-3889871.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/3889727/pexels-photo-3889727.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&auto=format&fit=crop&q=80",
"https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"



];

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Slower transition for elegance
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload first image for better performance
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = backgroundImages[0];
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background with Overlay */}
      <div className="absolute inset-0">
        {/* Sliding Images */}
        <div 
          className="absolute inset-0 flex transition-transform duration-[2000ms] ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="w-full h-screen flex-shrink-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 container-mobile text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Elegant Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Award-Winning Tanzania Tours
          </span>
        </div>

        {/* Enhanced Main Heading */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 text-balance">
            Discover the{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                Magic
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-lg -z-10"></div>
            </span>
            {" "}of Tanzania
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Enhanced Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Experience authentic adventures, breathtaking wildlife, and rich culture 
          while making a positive impact on local communities through sustainable tourism.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button className="group bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-classic-lg hover:shadow-classic-xl flex items-center justify-center gap-3 min-w-[200px]">
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group border-2 border-white/80 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-3 min-w-[200px]">
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Watch Our Story</span>
          </button>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {[
            { icon: MapPin, label: "Destinations", value: "15+" },
            { icon: Users, label: "Happy Travelers", value: "5,000+" },
            { icon: Calendar, label: "Years Experience", value: "12+" },
            { icon: Search, label: "Safari Tours", value: "200+" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-3 group-hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-200 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white/70 text-xs mt-2 font-medium">Scroll to explore</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
