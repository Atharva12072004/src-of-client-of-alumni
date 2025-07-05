import React from 'react';
import Marquee from 'react-fast-marquee';
import './marquee.css';

// ✅ Local PNG imports from your specified path
import amazon from '../../assets/pages/landing/companies/Amazon.png';
import ibm from '../../assets/pages/landing/companies/Ibm.png';
import increff from '../../assets/pages/landing/companies/Increff.png';
import infosys from '../../assets/pages/landing/companies/Infosys.png';
import intel from '../../assets/pages/landing/companies/Intel.png';
import mahindra from '../../assets/pages/landing/companies/Mahindra.png';
import nvidia from '../../assets/pages/landing/companies/Nvidia.png';
import oracle from '../../assets/pages/landing/companies/Oracle.png';
import tcs from '../../assets/pages/landing/companies/Tcs.png';
import techmahindra from '../../assets/pages/landing/companies/Techmahindra.png';

function MarqueeCompanies() {
  const companyLogos = [
    { src: amazon, alt: 'Amazon' },
    { src: ibm, alt: 'IBM' },
    { src: increff, alt: 'Increff' },
    { src: infosys, alt: 'Infosys' },
    { src: intel, alt: 'Intel' },
    { src: mahindra, alt: 'Mahindra' },
    { src: nvidia, alt: 'Nvidia' },
    { src: oracle, alt: 'Oracle' },
    { src: tcs, alt: 'TCS' },
    { src: techmahindra, alt: 'Tech Mahindra' },
  ];

  return (
    <div className="marquee_app px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="marquee_title mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold px-2">
          FTO and Internships bagged by our Alumni
        </h1>
      </div>
      <div className="overflow-hidden">
        <Marquee direction="left" speed={100} className="py-2 sm:py-4">
          {companyLogos.map((logo, index) => (
            <div key={index} className="marquee_image_wrapper mx-2 sm:mx-4">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default MarqueeCompanies;
