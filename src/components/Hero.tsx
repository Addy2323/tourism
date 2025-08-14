import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const backgroundImages = [
  "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",

  "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1589177900326-900782f88a55?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1575999080555-3f7a698dd8d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHphbnppYmFyfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1661831880989-bb3184c5dcc8?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549035092-33b2937b075a?w=1920&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1586347378036-7a8c24975a61?w=1920&auto=format&fit=crop&q=80",
];

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Sliding Images */}
      <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
           style={{ transform: `translateX(-${currentImage * 100}%)` }}>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="w-full h-screen flex-shrink-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.5)",
            }}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Marquee Heading */}
        <div className="overflow-hidden whitespace-nowrap mb-6">
          <h1 className="inline-block text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-marquee">
            Discover the <span className="text-amber-400">Magic of Tanzania</span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience authentic adventures, breathtaking wildlife, and rich culture 
          while making a positive impact on local communities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Start Your Journey
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
            Watch Our Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
