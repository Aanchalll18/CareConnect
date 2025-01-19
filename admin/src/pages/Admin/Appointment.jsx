import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'


const Appointment = () => {
  const {aToken,Appointment,getAllAppointments}=useContext(AppContext)
  return (
    <div>
      a
    </div>
  )
}

export default Appointment
