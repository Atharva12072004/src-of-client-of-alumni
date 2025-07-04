import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SmallTextGeneration from './animations/TextRelated/SmallTextGeneration';
import SmallPinkTextGeneration from './animations/TextRelated/SmallPinkTextGeneration';
import { PrimaryButton } from "../components/Buttons";
import LoginSignup from '../pages/LoginSignup';

// ✅ Transparent background PNGs
import NetworkMobile from '../assets/pages/landing/network.png';
import JobsMobile from '../assets/pages/landing/jobs.png';
import ScholarshipsMobile from '../assets/pages/landing/scholarships.png';

const StaticHomeMobile = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleGetStartedClick = () => {
    setLoginDialogOpen(true);
  };

  return (
    <div className='flex flex-col items-center gap-20 p-6'>

      {/* Hero Image */}
      <img
        src={NetworkMobile}
        alt="network"
        className="w-full max-w-[350px] sm:max-w-md md:max-w-lg h-auto object-contain"
      />

      {/* Text Block */}
      <div className='flex flex-col gap-10 items-center mb-8 text-center'>
        <div className='flex gap-4 flex-wrap justify-center'>
          <SmallTextGeneration words={'Connect'} />
          <SmallTextGeneration words={'With'} />
          <SmallPinkTextGeneration words={'Alumni'} />
        </div>
        <div className='flex gap-4 flex-wrap justify-center'>
          <SmallTextGeneration words={'Gain'} />
          <SmallPinkTextGeneration words={'Opportunities'} />
        </div>
        <div className='flex gap-4 flex-wrap justify-center'>
          <SmallTextGeneration words={'Boost your'} />
          <SmallPinkTextGeneration words={'Career'} />
        </div>

        {/* Get Started Button */}
        <button 
          onClick={handleGetStartedClick}
          className="mt-10 bg-[#FA005E] text-white font-semibold px-10 py-4 rounded-full hover:bg-pink-700 transition-all shadow-md text-xl"
        >
          Get Started
        </button>
      </div>

      {/* Features Title */}
      <div className='pt-6'>
        <SmallPinkTextGeneration words={"FEATURES"} />
      </div>

      {/* Jobs Section */}
      <img
        src={JobsMobile}
        alt="jobs"
        className="w-full max-w-[400px] sm:max-w-md md:max-w-xl h-auto object-contain"
      />
      <div className='flex flex-col sm:flex-row justify-center items-center gap-8 text-center'>
        <p className='text-xl sm:text-2xl font-medium'>Looking For Jobs?</p>
        <Link to="/jobs">
          <PrimaryButton name="Find Jobs" />
        </Link>
      </div>

      {/* News Section */}
      <img
        src={ScholarshipsMobile}
        alt="scholarships"
        className="w-full max-w-[400px] sm:max-w-md md:max-w-xl h-auto object-contain"
      />
      <div className='flex flex-col sm:flex-row justify-center items-center gap-8 pb-16 text-center'>
        <p className='text-xl sm:text-2xl font-medium'>Feeling Nostalgic?</p>
        <Link to="/news">
          <PrimaryButton name="Read News" />
        </Link>
      </div>

      {/* Login/Signup Dialog */}
      <LoginSignup 
        open={loginDialogOpen} 
        handleClose={handleLoginDialogClose}
        type="login"
        callToast={(msg) => console.log(msg)}
      />
    </div>
  );
};

export default StaticHomeMobile;
