import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const BookingPage = lazy(() => import('./pages/bookingpage'));
const PlanTrip = lazy(() => import('./pages/PlanTrip'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const CommunityImpact = lazy(() => import('./components/CommunityImpact'));
const Contact = lazy(() => import('./pages/Contact'));
const SerengetiDetail = lazy(() => import('./pages/destinations/SerengetiDetail'));
const KilimanjaroDetail = lazy(() => import('./pages/destinations/KilimanjaroDetail'));
const NgorongoroDetail = lazy(() => import('./pages/destinations/NgorongoroDetail'));
const ZanzibarDetail = lazy(() => import('./pages/destinations/ZanzibarDetails'));
const TarangireDetail = lazy(() => import('./pages/destinations/TarangireDetail'));
const LakeManyaraDetail = lazy(() => import('./pages/destinations/LakeManyaraDetail'));

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