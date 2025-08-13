import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LoadingScreen from './components/LoadingScreen';
const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const PlanTrip = lazy(() => import('./pages/PlanTrip'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const CommunityImpact = lazy(() => import('./components/CommunityImpact'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/plan-your-trip" element={<PlanTrip />} />
            <Route path="/impact" element={<CommunityImpact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
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