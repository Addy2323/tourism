import { useState, useEffect, useRef, type FC } from "react";
import { Search, MapPin, Calendar, Users, Play, ArrowRight } from "lucide-react";
import "./Hero.css";

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
    const isDesktop = () => window.innerWidth >= 768;
    const applyParallax = () => {
      if (!containerRef.current) return;
      if (!isDesktop()) {
        // Disable parallax on mobile to keep hero fully in view
        containerRef.current.style.transform = '';
        return;
      }
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * 0.5;
      containerRef.current.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    };

    const onScroll = () => applyParallax();
    const onResize = () => applyParallax();

    // Initial apply
    applyParallax();

    // Only listen to scroll on desktop to save work on mobile
    if (isDesktop()) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
   }, []);

  return (
    <div className="hero-root relative min-h-[100svh] short:min-h-[80svh] tall:min-h-[100svh] flex items-center overflow-hidden pt-0 md:pt-6 lg:pt-10" style={{ willChange: 'transform' }}>
      {/* Hardware-accelerated background with optimized transitions */}
      <div className="hero-video-wrapper" style={{ willChange: 'transform' }}>
        {/* Background local video */}
        <video
          className="hero-video-embed"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setIsLoaded(true)}
          onError={(e) => {
            // Surface video load/playback errors in dev tools
            console.error('Hero background video failed to load/play', e);
          }}
          aria-hidden="true"
        >
          {/* Prefer MP4 (H.264/AAC) for broad compatibility; add WebM as a modern alternative */}
          <source src="https://www.asiliaafrica.com/wp-content/uploads/2024/04/30sec-Teaser-2-master-clean.mp4" type="video/mp4" />
          {/* Optional fallback text */}
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlays disabled on small screens to show full video */}
        <div 
          className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
          style={{ willChange: 'opacity' }}
        ></div>
        <div 
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"
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
        <div className="mb-8 mt-16 sm:mt-20 md:mt-24 lg:mt-28 hero-fade-in-up hero-delay-200">
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
