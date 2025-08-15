import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LoadingScreen from './components/LoadingScreen';

// Preload critical components immediately
const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const BookingPage = lazy(() => import('./pages/bookingpage'));
const PlanTrip = lazy(() => import('./pages/PlanTrip'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const CommunityImpact = lazy(() => import('./components/CommunityImpact'));
const Contact = lazy(() => import('./pages/Contact'));

// Destination detail pages with prefetch hints
const SerengetiDetail = lazy(() => 
  import(/* webpackChunkName: "serengeti" */ './pages/destinations/SerengetiDetail')
);
const KilimanjaroDetail = lazy(() => 
  import(/* webpackChunkName: "kilimanjaro" */ './pages/destinations/KilimanjaroDetail')
);
const NgorongoroDetail = lazy(() => 
  import(/* webpackChunkName: "ngorongoro" */ './pages/destinations/NgorongoroDetail')
);
const ZanzibarDetail = lazy(() => 
  import(/* webpackChunkName: "zanzibar" */ './pages/destinations/ZanzibarDetails')
);
const TarangireDetail = lazy(() => 
  import(/* webpackChunkName: "tarangire" */ './pages/destinations/TarangireDetail')
);
const LakeManyaraDetail = lazy(() => 
  import(/* webpackChunkName: "lake-manyara" */ './pages/destinations/LakeManyaraDetail')
);

// Enhanced loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
      <p className="text-emerald-700 font-medium">Loading...</p>
    </div>
  </div>
);

// Route transition component
const RouteTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="animate-fadeIn">
      {children}
    </div>
  );
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Preload critical routes on app start
  useEffect(() => {
    const preloadRoutes = async () => {
      try {
        // Preload most visited pages
        await Promise.all([
          import('./pages/Home'),
          import('./pages/Destinations'),
        ]);
      } catch (error) {
        console.log('Preload failed:', error);
      }
    };

    preloadRoutes();
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <Suspense fallback={<PageLoader />}>
          <RouteTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/serengeti" element={<SerengetiDetail />} />
              <Route path="/destinations/zanzibar" element={<ZanzibarDetail />} />
              <Route path="/destinations/lake-Manyara" element={<LakeManyaraDetail />} />  
              <Route path="/destinations/Tarangire" element={<TarangireDetail />} />
              <Route path="/destinations/kilimanjaro" element={<KilimanjaroDetail />} />
              <Route path="/destinations/ngorongoro" element={<NgorongoroDetail />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/plan-your-trip" element={<PlanTrip />} />
              <Route path="/impact" element={<CommunityImpact />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </RouteTransition>
        </Suspense>
        
        <Footer />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </Router>
  );
}

export default App;