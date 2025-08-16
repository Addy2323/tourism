import { useEffect, useState, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  refreshRate: number;
  isHighRefreshRate: boolean;
  isUltraHighRefreshRate: boolean;
  devicePixelRatio: number;
  isMobile: boolean;
  supportsHardwareAcceleration: boolean;
}

interface PerformanceConfig {
  animationDuration: number;
  transitionDuration: number;
  enableParallax: boolean;
  enableHardwareAcceleration: boolean;
  preloadImages: boolean;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    refreshRate: 60,
    isHighRefreshRate: false,
    isUltraHighRefreshRate: false,
    devicePixelRatio: 1,
    isMobile: false,
    supportsHardwareAcceleration: false,
  });

  const [config, setConfig] = useState<PerformanceConfig>({
    animationDuration: 600,
    transitionDuration: 300,
    enableParallax: true,
    enableHardwareAcceleration: true,
    preloadImages: true,
  });

  const frameCountRef = useRef(0);
  const startTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number>();

  // Detect refresh rate and device capabilities
  const measureRefreshRate = useCallback(() => {
    frameCountRef.current++;
    const currentTime = performance.now();
    
    if (currentTime - startTimeRef.current >= 1000) {
      const fps = Math.round(frameCountRef.current);
      const isHighRefreshRate = fps >= 120;
      const isUltraHighRefreshRate = fps >= 240;
      
      setMetrics(prev => ({
        ...prev,
        refreshRate: fps,
        isHighRefreshRate,
        isUltraHighRefreshRate,
      }));
      
      // Update config based on refresh rate
      setConfig(prev => ({
        ...prev,
        animationDuration: isUltraHighRefreshRate ? 300 : isHighRefreshRate ? 400 : 600,
        transitionDuration: isUltraHighRefreshRate ? 150 : isHighRefreshRate ? 200 : 300,
      }));
      
      frameCountRef.current = 0;
      startTimeRef.current = currentTime;
    }
    
    rafIdRef.current = requestAnimationFrame(measureRefreshRate);
  }, []);

  // Detect device capabilities
  useEffect(() => {
    const detectCapabilities = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Test for hardware acceleration support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const supportsHardwareAcceleration = !!gl;
      
      setMetrics(prev => ({
        ...prev,
        devicePixelRatio,
        isMobile,
        supportsHardwareAcceleration,
      }));
      
      // Adjust config for mobile devices
      if (isMobile) {
        setConfig(prev => ({
          ...prev,
          enableParallax: false,
          preloadImages: false,
        }));
      }
    };

    detectCapabilities();
    rafIdRef.current = requestAnimationFrame(measureRefreshRate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureRefreshRate]);

  // Optimized scroll handler with throttling
  const createOptimizedScrollHandler = useCallback((callback: (scrollY: number) => void) => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
  }, []);

  // Preload images utility
  const preloadImages = useCallback(async (imageUrls: string[], maxConcurrent = 3) => {
    if (!config.preloadImages) return;
    
    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't fail on error
        img.src = url;
      });
    };

    // Load images in batches to avoid overwhelming the network
    for (let i = 0; i < imageUrls.length; i += maxConcurrent) {
      const batch = imageUrls.slice(i, i + maxConcurrent);
      await Promise.all(batch.map(loadImage));
    }
  }, [config.preloadImages]);

  // Hardware acceleration utility
  const getHardwareAcceleratedStyle = useCallback((additionalStyles: React.CSSProperties = {}) => {
    if (!config.enableHardwareAcceleration || !metrics.supportsHardwareAcceleration) {
      return additionalStyles;
    }

    return {
      ...additionalStyles,
      transform: additionalStyles.transform 
        ? `${additionalStyles.transform} translate3d(0, 0, 0)`
        : 'translate3d(0, 0, 0)',
      willChange: 'transform',
      backfaceVisibility: 'hidden' as const,
      perspective: '1000px',
    };
  }, [config.enableHardwareAcceleration, metrics.supportsHardwareAcceleration]);

  // Get optimized animation classes
  const getAnimationClasses = useCallback((baseClass: string) => {
    const classes = [baseClass];
    
    if (metrics.isHighRefreshRate) {
      classes.push('transition-optimized');
    }
    
    if (metrics.isUltraHighRefreshRate) {
      classes.push('transition-ultra-smooth');
    }
    
    if (config.enableHardwareAcceleration) {
      classes.push('hw-accelerated');
    }
    
    return classes.join(' ');
  }, [metrics.isHighRefreshRate, metrics.isUltraHighRefreshRate, config.enableHardwareAcceleration]);

  // Intersection Observer for lazy loading
  const createIntersectionObserver = useCallback((
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, defaultOptions);
  }, []);

  // Performance monitoring
  const measurePerformance = useCallback((name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} took ${end - start} milliseconds`);
    }
  }, []);

  return {
    metrics,
    config,
    createOptimizedScrollHandler,
    preloadImages,
    getHardwareAcceleratedStyle,
    getAnimationClasses,
    createIntersectionObserver,
    measurePerformance,
  };
};
