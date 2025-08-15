import React, { useState, useRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface PrefetchLinkProps extends LinkProps {
  prefetchDelay?: number;
  children: React.ReactNode;
  className?: string;
}

const PrefetchLink: React.FC<PrefetchLinkProps> = ({ 
  to, 
  prefetchDelay = 100, 
  children, 
  className = '',
  ...props 
}) => {
  const [isPrefetched, setIsPrefetched] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (isPrefetched) return;

    timeoutRef.current = setTimeout(() => {
      prefetchRoute(to.toString());
      setIsPrefetched(true);
    }, prefetchDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const prefetchRoute = async (route: string) => {
    try {
      // Map routes to their corresponding lazy imports
      const routeMap: { [key: string]: () => Promise<any> } = {
        '/': () => import('../pages/Home'),
        '/destinations': () => import('../pages/Destinations'),
        '/destinations/serengeti': () => import('../pages/destinations/SerengetiDetail'),
        '/destinations/kilimanjaro': () => import('../pages/destinations/KilimanjaroDetail'),
        '/destinations/ngorongoro': () => import('../pages/destinations/NgorongoroDetail'),
        '/destinations/zanzibar': () => import('../pages/destinations/ZanzibarDetails'),
        '/destinations/tarangire': () => import('../pages/destinations/TarangireDetail'),
        '/destinations/lake-manyara': () => import('../pages/destinations/LakeManyaraDetail'),
        '/experiences': () => import('../pages/ExperiencesPage'),
        '/plan-your-trip': () => import('../pages/PlanTrip'),
        '/booking': () => import('../pages/bookingpage'),
        '/blog': () => import('../pages/Blog'),
        '/about': () => import('../pages/About'),
        '/contact': () => import('../pages/Contact'),
        '/impact': () => import('../components/CommunityImpact'),
      };

      const normalizedRoute = route.toLowerCase();
      const prefetchFunction = routeMap[normalizedRoute] || routeMap[route];
      
      if (prefetchFunction) {
        await prefetchFunction();
        console.log(`✅ Prefetched: ${route}`);
      }
    } catch (error) {
      console.log(`❌ Prefetch failed for ${route}:`, error);
    }
  };

  return (
    <Link
      to={to}
      className={`instant-feedback hover-lift gpu-accelerated ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrefetchLink;
