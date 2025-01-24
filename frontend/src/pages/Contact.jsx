
import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="text-center text-3xl pt-10">
        <p className="font-semibold text-grey-500">
          CONTACT <span className="text-greytxt">US</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="my-0 flex flex-col justify-center md:flex-row gap-10 mb-20 text-sm mt-7">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-start gap-6 p-6 bg-white shadow-xl rounded-lg border border-light-grey">
          <p className="font-semibold text-lg text-grey-500">OUR OFFICE</p>
          <p className="text-greytxt">734003, Pradhan Nagar, Siliguri, West Bengal</p>

          <p className="text-greytxt">
            Tel: +91 7530-9864 <br />
            Email: careconnect18@gmail.com
          </p>

          <p className="font-semibold text-lg text-grey-500">CAREERS AT CARECONNECT</p>
          <p className="text-greytxt">Learn more about our teams and job openings.</p>

          {/* Explore Jobs Button */}
          <button className="border px-8 py-4 text-sm hover:bg-primary bg-purple2 text-white font-semibold rounded-lg shadow-md transform hover:translate-y-[-3px] transition-transform duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
