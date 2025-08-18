import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InteractiveMapCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-10 sm:py-12 lg:py-16">
      <div className="container-mobile">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src="https://images.goway.com/production/hero/iStock-1387357630.jpg"
             alt="Interactive map"
             className="w-full h-[220px] sm:h-[280px] lg:h-[360px] object-cover"
             loading="lazy"
           />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Explore our interactive map
            </h3>
            <button
              onClick={() => navigate('/map')}
              className="bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-sm shadow-lg"
            >
              <span>Find your route</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapCTA;
