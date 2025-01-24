
import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* About Us Section */}
      <div className="text-center text-3xl pt-10 text-grey-500 font-bold">
        <p>
          ABOUT <span className="text-greytxt font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-grey-500">
          <p>
            Welcome to CareConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At CareConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            CareConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, CareConnect is here to support you every step of the way.
          </p>
          <b className="text-greytxt text-lg">Our Vision</b>
          <p>
            Our vision at CareConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-2xl font-semibold my-10">
        <p>
          WHY <span className="text-grey-500">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        {/* Efficiency */}
        <div className="border border-gray shadow-lg px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-gradient-to-br from-white to-light-grey rounded-lg transform hover:translate-y-[-4px] hover:shadow-2xl transition duration-300">
          <b className="text-primary">EFFICIENCY:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        {/* Convenience */}
        <div className="border border-gray shadow-lg px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-gradient-to-br from-white to-light-grey rounded-lg transform hover:translate-y-[-4px] hover:shadow-2xl transition duration-300">
          <b className="text-primary">CONVENIENCE:</b>
          <p>
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>

        {/* Personalization */}
        <div className="border border-gray shadow-lg px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-gradient-to-br from-white to-light-grey rounded-lg transform hover:translate-y-[-4px] hover:shadow-2xl transition duration-300">
          <b className="text-primary">PERSONALIZATION:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
