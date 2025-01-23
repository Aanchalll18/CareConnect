import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const {dToken,dashData,setDashData,getDashData}=useContext(DoctorContext)

  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  },[dToken])

  return dToken && (
    <div className='m-5'>
     
          </div>
      
    
  )
}

export default DoctorDashboard

