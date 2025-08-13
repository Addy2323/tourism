import React from 'react';
import Hero from '../components/Hero';
import FeaturedDestinations from '../components/FeaturedDestinations';
import Experiences from '../components/Experiences';
import CommunityImpact from '../components/CommunityImpact';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
      <Experiences />
      <CommunityImpact />
    </div>
  );
};

export default Home;