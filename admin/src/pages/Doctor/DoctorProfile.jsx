import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorProfile = () => {
  const {dToken,profileData,
    setProfileData,
    getProfile}=useContext(DoctorContext)

    useEffect(() => {
        if (dToken) {
          getProfile();
        }
      }, [dToken]);


  return (
    <div>
      
    </div>
  )
}

export default DoctorProfile
