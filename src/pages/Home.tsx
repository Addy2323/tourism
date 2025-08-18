import React from 'react';
import Hero from '../components/Hero';
import FeaturedDestinations from '../components/FeaturedDestinations';
import InteractiveMapCTA from '../components/InteractiveMapCTA';
import Experiences from '../components/Experiences';
import CommunityImpact from '../components/CommunityImpact';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
      <InteractiveMapCTA />
      <Experiences />
      <CommunityImpact />
    </div>
  );
};

export default Home;