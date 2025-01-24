import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorProfile = () => {
  const { dToken, profileData, getProfile } = useContext(DoctorContext);
  const { curreny } = useContext(AppContext);
  const [edit,setisEdit]=useState(false)

  useEffect(() => {
    if (dToken) {
      getProfile();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="flex flex-col items-center bg-white shadow-2xl rounded-2xl p-4 mb-6 sm:p-6 w-full max-w-xl sm:max-w-sm lg:max-w-2xl mx-auto mt-4 space-y-1 transform hover:scale-[1.02] transition-transform duration-300">

        {/* Doctor Image */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={profileData.image || 'default-avatar.png'}
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mt-4">
            {profileData.name}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">
            {profileData.degree} - {profileData.speciality}
          </p>
          <button className="mt-3 text-xs sm:text-sm bg-green-100 text-green-800 py-1 px-3 sm:py-2 sm:px-4 rounded-full">
            {profileData.experience} experience
          </button>
        </div>

        {/* About Section */}
        <div className="w-full px-4 sm:px-6 lg:px-2">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 border-b pb-2">
            About
          </h3>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
            {profileData.about || 'No details provided.'}
          </p>
        </div>

        {/* Appointment Fee */}
        <div className="w-full px-4 sm:px-2 lg:px-2">
          <div className="flex  items-center">
            <h3 className="text-lg sm:text-xl font-medium text-gray-800">Appointment Fee</h3>
            <p className="ml-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {curreny}
              {profileData.fees}
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="w-full px-4 sm:px-2 lg:px-2">
          <h3 className="text-sm sm:text-xl font-medium text-gray-800 border-b pb-2">
            Address
          </h3>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
            {profileData.address.line1}
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">{profileData.address.line2}</p>
        </div>

        {/* Availability */}
        <div className=" mt-2 w-full px-2 sm:px-6 lg:px-6">
          <div className="flex items-center gap-3">
            <input
            checked={profileData.available}
              type="checkbox"
              id="availability"
              className="form-checkbox text-green-600 w-5 h-5 sm:w-6 sm:h-6"
            />
            <label
              htmlFor="availability"
              className="text-sm sm:text-base lg:text-lg text-gray-700"
            >
              Available
            </label>
          </div>
        </div>

        {/* Edit Button */}
        <div className="w-full flex justify-center">
          <button 
          onClick={()=>setisEdit(true)}
          className="bg-purple-600 text-white  sm:py-2 px-6 rounded-lg text-sm sm:text-base lg:text-lg hover:bg-purple-700">
            Edit
          </button>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
