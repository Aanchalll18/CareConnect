import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const {dToken,profileData,
    setProfileData,
    getProfile}=useContext(DoctorContext)

    const {currency,backendUrl}=useContext(AppContext)

    useEffect(() => {
        if (dToken) {
          getProfile();
        }
      }, [dToken]);


  return profileData &&(
    <div>
      <div>
        <div>
          <img src={profileData.image} alt="" />
        </div>
      </div>
      {/* Doc info */}
      <p>{profileData.name}</p>
      <div>
        <p>{profileData.degree} - {profileData.speciality}</p>
        <button>{profileData.experience}</button>
      </div>
      {/* about */}
      <div>
        <p>About:</p>
        <p>
          {profileData.about}
        </p>
      </div>
    </div>
  )
}

export default DoctorProfile
