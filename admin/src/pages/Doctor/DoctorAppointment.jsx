// import React, { useContext, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'

// const DoctorAppointment = () => {
//     const {dToken,appointments,getAppointments}=useContext(DoctorContext)

//     useEffect(()=>{
//         if(dToken){
//             getAppointments()
//         }
//     },[dToken])

//   return (
//     <div className='w-full max-w-6xl m-5'>

//       <p className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll '>All Appointments</p>
//         <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
//             <p>#</p>
//             <p>Patient</p>
//             <p>Payment</p>
//             <p>Age</p>
//             <p>Date & Time</p>
//             <p>Fees</p>
//             <p>Action</p>
//         </div>
//     </div>
//   )
// }

// export default DoctorAppointment
import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

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
                <p>{index + 1}</p>
                <div>
                    <img src={item.userData.image} alt="" />
                    <p>{item.userData.name}</p>
                </div>
                <div>
                    <p>
                        {item.payment ? 'Online' : 'Cash'}
                    </p>
                </div>
                <p>
                    
                </p>
                <button className="text-red-500  border border-red-600 px-4 py-1 rounded-lg">
                  Cancel
                </button>
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

