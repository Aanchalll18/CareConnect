
import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const {calculateAge,curreny}=useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="bg-white shadow-md border rounded-lg overflow-hidden">
        <p className=" text-purple-600 text-lg font-semibold py-4 px-6 border-b">
          All Appointments
        </p>
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 py-3 px-6 border-b bg-gray-100">
          <p className="font-medium">#</p>
          <p className="font-medium">Patient</p>
          <p className="font-medium">Payment</p>
          <p className="font-medium">Age</p>
          <p className="font-medium">Date & Time</p>
          <p className="font-medium">Fees</p>
          <p className="font-medium">Action</p>
        </div>
        <div className="sm:block bg-white max-h-[70vh] min-h-[50vh] overflow-y-auto">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_1fr_1fr] gap-4 items-center py-3 px-6 border-b hover:bg-gray-50"
              >
                <p className='max-sm:hidden'>{index + 1}</p>
                <div>
                    <img 
                    className="w-12 h-12 rounded-full"
                    src={item.userData.image} alt="" />
                    <p>{item.userData.name}</p>
                </div>
                <div>
                    <p className='text-sm inline border border-purple-300 px-2 rounded-full'>
                        {item.payment ? 'Online' : 'Cash'}
                    </p>
                </div>
                <p className='max-sm:hidden'>
                    {calculateAge(item.userData.DOB)}
                </p>
                <p>{item.slotTime}</p>
                <p>{curreny}{item.amount}</p>
                <div>
                    <img
                    className='w-10 cursor-pointer'
                     src={assets.cancel_icon} alt="" />
                    <img 
                    className='w-10 cursor-pointer'
                    src={assets.tick_icon} alt="" />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No Appointments Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;

