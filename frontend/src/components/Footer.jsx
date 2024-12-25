// import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="md:mx-10">
      <div className="grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img src={assets.logo} alt="CareConnect Logo" className="w-32 mb-4" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
            veritatis natus vitae nemo dolores laboriosam ratione libero
            explicabo nisi, aspernatur, quisquam molestias quos perspiciatis
            reiciendis.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="font-bold mb-2">COMPANY</p>
          <ul className="space-y-1">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="font-bold mb-2">GET IN TOUCH</p>
          <ul className="space-y-1">
            <li>+91 7530-9864</li>
            <li>careconnect18@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-xs text-grey-500 font-semibold">
        <hr className="my-4" />
        <p>Copyright 2024 © CareConnect. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
