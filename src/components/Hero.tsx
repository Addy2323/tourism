import { useState, useEffect, useRef, useCallback, type FC } from "react";
import { Search, MapPin, Calendar, Users, Play, ArrowRight } from "lucide-react";
import "./Hero.css";

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

const Hero: FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshRate, setRefreshRate] = useState(60);
  const [visibleStats, setVisibleStats] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
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

  // Detect display refresh rate for optimal animations
  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    
    const measureRefreshRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - startTime >= 1000) {
        const fps = Math.round(frameCount);
        setRefreshRate(fps);
        frameCount = 0;
        startTime = currentTime;
      }
      
      requestAnimationFrame(measureRefreshRate);
    };
    
    requestAnimationFrame(measureRefreshRate);
  }, []);

  // Optimized image transition with hardware acceleration
  const handleImageTransition = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleImageTransition, 6000);
    return () => clearInterval(interval);
  }, [handleImageTransition]);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = backgroundImages.slice(0, 3).map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        });
      });
      
      await Promise.all(imagePromises);
      setIsLoaded(true);
    };

    preloadImages();
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
    <div className="relative min-h-screen flex items-center overflow-hidden" style={{ willChange: 'transform' }}>
      {/* Hardware-accelerated background with optimized transitions */}
      <div className="absolute inset-0" style={{ willChange: 'transform' }}>
        {/* Optimized sliding images with GPU acceleration */}
        <div 
          className="absolute inset-0 flex"
          style={{ 
            transform: `translate3d(-${currentImage * 100}%, 0, 0)`,
            transition: `transform ${refreshRate >= 120 ? '1500ms' : '2000ms'} cubic-bezier(0.4, 0, 0.2, 1)`,
            willChange: 'transform'
          }}
        >
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="w-full h-screen flex-shrink-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: '1000px'
              }}
            />
          ))}
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
        <div className="mb-8 mt-16 lg:mt-20 hero-fade-in-up hero-delay-200">
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
