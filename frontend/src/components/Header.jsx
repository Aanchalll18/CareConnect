// import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 items-center">
      
      {/* Left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex items-center gap-4 text-white text-sm font-light">
          <img 
            className="w-28"
            src={assets.group_profiles} 
            alt="Group Profiles" 
          />
          <p>
            Simply browse through our extensive list of trusted doctors,<br/>
            schedule your appointment hassle-free.
          </p>
        </div>
        <a 
          href="#speciality" 
          className="flex items-center gap-2 text-white font-medium bg-secondary px-4 py-2 rounded-lg hover:bg-secondary-dark"
        >
          Book Appointment 
          <img 
          className='w-3'
            src={assets.arrow_icon} 
            alt="Arrow Icon" 
          />
        </a>
      </div>

      {/* Right side */}
      <div className="md:w-1/2 relative">
        <img 
          className="w-full h-auto rounded-lg"
          src={assets.header_img} 
          alt="Header Image" 
        />
      </div>
      
    </div>
  );
};

export default Header;
