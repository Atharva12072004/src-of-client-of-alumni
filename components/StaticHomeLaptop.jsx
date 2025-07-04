import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Grid } from "@mui/material";
import { TypeAnimation } from 'react-type-animation';

import OutlinedButton from './animations/OutlinedButton';
import CompanyMarquee from './animations/sliding-marquee-companies';
import BigTextGeneration from './animations/TextRelated/BigTextGeneration';
import BigPinkTextGeneration from './animations/TextRelated/BigPinkTextGeneration';
import LoginSignup from '../pages/LoginSignup';

// 🖼️ PNG images with transparent background
import NetworkImage from '../assets/pages/landing/network.png';
import JobsImage from '../assets/pages/landing/jobs.png';
import ScholarshipImage from '../assets/pages/landing/scholarships.png';

const StaticHomeLaptop = () => {
  const countUpRef = useRef(null);
  const [isCountUpStarted, setIsCountUpStarted] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const customFormattingFn = (value) => `${value}+`;

  useEffect(() => {
    if (inView && !isCountUpStarted) {
      setIsCountUpStarted(true);
      if (countUpRef.current) {
        countUpRef.current.start();
      }
    }
  }, [inView, isCountUpStarted]);

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const handleGetStartedClick = () => {
    setLoginDialogOpen(true);
  };

  return (
    <div className='flex flex-col gap-20 px-4 md:px-8 py-12'>

      {/* Hero Section */}
      <Grid container spacing={8} className="items-center">
        {/* Left Text */}
        <Grid item xs={12} md={6}>
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              <BigTextGeneration words={'Link with'} />
              <BigPinkTextGeneration words={'Alumni'} />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              <BigTextGeneration words={'Unlock'} />
              <BigPinkTextGeneration words={'Possibilities'} />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              <BigTextGeneration words={'Elevate your'} />
              <BigPinkTextGeneration words={'Journey'} />
            </div>

            {/* Get Started Button */}
            <div className="mt-5 flex justify-center md:justify-start">
              <OutlinedButton clr="#FA005E" title={'Get Started'} onClick={handleGetStartedClick} />
            </div>
          </div>
        </Grid>

        {/* Right Image */}
        <Grid item xs={12} md={6} className="flex justify-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md xl:max-w-lg overflow-hidden">
            <img
              src={NetworkImage}
              alt="network"
              className="w-full h-auto object-contain"
            />
          </div>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <div className='flex flex-col sm:flex-row justify-center sm:justify-evenly gap-10' ref={ref}>
        {isCountUpStarted && (
          <>
            <div className='flex flex-col bg-gradient-to-r from-[#FA003C]/20 p-8 rounded-lg text-center w-80'>
              <CountUp className='font-bold text-5xl' start={0} end={800} duration={3} formattingFn={customFormattingFn} />
              <p className='font-semibold text-2xl text-slate-600 mt-3'>Alumni across India</p>
            </div>
            <div className='flex flex-col bg-gradient-to-r from-[#FA003C]/20 p-8 rounded-lg text-center w-80'>
              <CountUp className='font-bold text-5xl' start={0} end={50} duration={3} formattingFn={customFormattingFn} />
              <p className='font-semibold text-2xl text-slate-600 mt-3'>Hiring Companies</p>
            </div>
            <div className='flex flex-col bg-gradient-to-r from-[#FA003C]/20 p-8 rounded-lg text-center w-80'>
              <CountUp className='font-bold text-5xl' start={0} end={10} duration={3} formattingFn={customFormattingFn} />
              <p className='font-semibold text-2xl text-slate-600 mt-3'>Average Package (LPA)</p>
            </div>
          </>
        )}
      </div>

      {/* Company Logos Sliding */}
      <CompanyMarquee />

      {/* Jobs Section */}
      <div className='flex flex-col lg:flex-row justify-between items-center gap-16'>
        <div className='flex flex-col justify-evenly gap-10 text-center lg:text-left'>
          <div>
            <p className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
              Connecting students and alumni unlocking
            </p>
            <p className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold bg-gradient-to-r mt-6 from-[#FA003C]/20 inline-block p-6 rounded-lg leading-normal'>
              <TypeAnimation
                sequence={['Job Opportunities', 1000, 'Intern Opportunities', 1000, 'Fellowship Opportunities', 1000, 'Research Opportunities', 1000]}
                speed={50}
                repeat={Infinity}
              />
            </p>
          </div>
          <p className='text-2xl text-slate-600 leading-relaxed'>
            This job portal empowers both students and alumni by offering curated opportunities to shape their careers.
          </p>
          <div className='flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-10'>
            <p className='text-4xl font-semibold'>Looking for openings?</p>
            <Link to="/jobs">
              <OutlinedButton clr="#FA005E" title={'Find Jobs'} />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={JobsImage} alt="jobs_page" className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl h-auto object-contain" />
        </div>
      </div>

      {/* News & Events */}
      <div className='flex flex-col lg:flex-row justify-between items-center gap-16'>
        <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
          <img src={ScholarshipImage} alt="scholarships_page" className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl h-auto object-contain" />
        </div>
        <div className='flex flex-col justify-evenly gap-10 text-center lg:text-left order-1 lg:order-2'>
          <div>
            <p className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
              Stay Connected with the Latest Updates on
            </p>
            <p className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold bg-gradient-to-r mt-6 from-[#FA003C]/20 p-6 inline-block rounded-lg leading-normal'>
              <TypeAnimation
                sequence={['College Events', 1000, 'Scholarships', 1000, 'Technical Events', 1000, 'Non-Technical Events', 1000]}
                speed={50}
                repeat={Infinity}
              />
            </p>
          </div>
          <p className='text-2xl text-slate-600 leading-relaxed'>
            Stay in the loop with all the latest happenings and reconnect with your alma mater.
          </p>
          <div className='flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-10'>
            <p className='text-4xl font-semibold'>Feeling Nostalgic?</p>
            <Link to="/news">
              <OutlinedButton clr="#FA005E" title={'Read News'} />
            </Link>
          </div>
        </div>
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

export default StaticHomeLaptop;
