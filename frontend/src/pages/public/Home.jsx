// src/pages/public/Home.jsx
import React from 'react';
import Hero from '../../components/home/Hero';
import About from '../../components/home/About';
import LatestFormations from '../../components/home/LatestFormations';  
import RecentProjects from '../../components/home/RecentProjects';
import CallToAction from '../../components/home/CallToAction';
const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About/>
      <LatestFormations />
      <RecentProjects />
      <CallToAction />
      {/* <Stats /> */}
    </div>
  );
};      
   

export default Home;