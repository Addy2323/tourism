import { useState, useEffect, useRef, type FC } from "react";
import { Search, MapPin, Calendar, Users, Play, ArrowRight } from "lucide-react";
import "./Hero.css";

const YT_VIDEO_ID = 'Cv61LWMZBxA';

const Hero: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleStats, setVisibleStats] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleStats(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    statsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Mark content as loaded once the video iframe loads
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Smooth scroll optimization
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxOffset = scrollY * 0.5;
        
        // Use transform3d for hardware acceleration
        containerRef.current.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen short:min-h-[80vh] tall:min-h-screen flex items-center overflow-hidden pt-28 short:pt-24 port:pt-24 lg:pt-36" style={{ willChange: 'transform' }}>
      {/* Hardware-accelerated background with optimized transitions */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Background YouTube video */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[67.5vw] min-w-full min-h-full"
            src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${YT_VIDEO_ID}&modestbranding=1&iv_load_policy=3&playsinline=1`}
            title="Background video"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen={false}
            frameBorder={0}
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        
        {/* Hardware-accelerated gradient overlays */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
          style={{ willChange: 'opacity' }}
        ></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"
          style={{ willChange: 'opacity' }}
        ></div>
      </div>

      {/* Optimized main content with hardware acceleration */}
      <div 
        ref={containerRef}
        className={`relative z-10 container-mobile text-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform, opacity' }}
      >
     
         
        

        {/* Enhanced main heading with optimized animations */}
        <div className="mb-8 mt-4 lg:mt-6 hero-fade-in-up hero-delay-200">
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

        {/* Optimized subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light hero-fade-in-up hero-delay-400">
          Experience authentic adventures, breathtaking wildlife, and rich culture 
          while making a positive impact on local communities through sustainable tourism.
        </p>

        {/* Hardware-accelerated CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 hero-fade-in-up hero-delay-600">
          <button className="group bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-amber-800 hero-button-transition flex items-center justify-center gap-3 min-w-[200px]">
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 hero-arrow-transition" />
          </button>
          
          <button className="group border-2 border-white/80 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 hero-button-transition backdrop-blur-sm flex items-center justify-center gap-3 min-w-[200px]">
            <Play className="w-5 h-5 hero-play-transition" />
            <span>Watch Our Story</span>
          </button>
        </div>

        {/* Optimized stats grid with scroll animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto hero-fade-in-up hero-delay-800">
          {[
            { icon: MapPin, label: "Destinations", value: "15+" },
            { icon: Users, label: "Happy Travelers", value: "5,000+" },
            { icon: Calendar, label: "Years Experience", value: "12+" },
            { icon: Search, label: "Safari Tours", value: "200+" }
          ].map((stat, index) => (
            <div 
              key={index} 
              ref={el => statsRefs.current[index] = el}
              data-index={index}
              className={`text-center group transition-all duration-700 transform ${
                visibleStats.has(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{
                transitionDelay: visibleStats.has(index) ? `${index * 150}ms` : '0ms'
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-3 hero-stat-transition">
                <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-200 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
};

export default Hero;
