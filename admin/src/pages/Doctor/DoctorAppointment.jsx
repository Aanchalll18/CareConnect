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
