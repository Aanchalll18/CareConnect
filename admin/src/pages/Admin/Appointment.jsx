import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';

const Appointment = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AdminContext);

  // Fetch appointments on component mount
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <h1 className="text-3xl font-semibold mb-6">
        All Appointments
      </h1>
        <div className='bg-gray-50 border rounded text-sm max-h-[80hv] overflow-y-scrollscroll min-h-[60vh]'>
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-semibold text-purple-700'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date &Time</p>
            <p>Doctors</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {
            appointments.map((item,index)=>(
              <div key={index}>
                <p>{index+1}</p>
                <div>
                  <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  );
};

export default Appointment;
