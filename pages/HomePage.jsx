import React, { useEffect, useState } from 'react';
import Navbar from '../template/Navbar';
import Footer from '../template/Footer';
import StaticHomeLaptop from '../components/StaticHomeLaptop';
import StaticHomeMobile from '../components/StaticHomeMobile';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section - Laptop */}
      <div className="hidden sm:block">
        <StaticHomeLaptop />
      </div>

      {/* Hero Section - Mobile */}
      <div className="block sm:hidden">
        <StaticHomeMobile />
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
