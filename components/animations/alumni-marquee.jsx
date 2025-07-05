import React from 'react';
import Marquee from 'react-fast-marquee';
import img2 from "../../assets/pages/landing/alumni/kshitiz.jpg";
import './alumni-marquee.css';
import {Stack} from "@mui/material";

function MarqueeCompanies() {
  return (
    <div className="marquee_app flex flex-col items-center">
      <Stack direction={'row'} spacing={0} className="w-full overflow-x-hidden">
        <Marquee direction="up" speed={50} className="w-4/5"> {/* Adjusted width to 80% */}
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
        </Marquee>
        <Marquee direction="down" speed={50} className="w-4/5"> {/* Adjusted width to 80% */}
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
          <div className="marquee_image_wrapper">
            <img src={img2} alt="" className='size-60'/>
          </div>
        </Marquee>
      </Stack>
    </div>
  );
}

export default MarqueeCompanies;
