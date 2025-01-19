// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'
// import { AppContext } from '../../context/AppContext'


// const Appointment = () => {
//   const {aToken,Appointment,getAllAppointments}=useContext(AppContext)
//   return (
//     <div>
//       a
//     </div>
//   )
// }

// export default Appointment

import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Appointment = () => {
  const { aToken, appointments, getAllAppointments } = useContext(AppContext);

  // Fetch appointments on component mount
  useEffect(() => {
    if (aToken) {
      getAllAppointments().catch((error) =>
        toast.error("Failed to fetch appointments")
      );
    }
    console.log(appointments); // Debugging line
  }, [aToken]);
  

  return (
    <div className="p-10 bg-background min-h-screen">
      <h1 className="text-3xl font-semibold text-primary mb-6">
        All Appointments
      </h1>
      {appointments && appointments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="p-6 bg-white border rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-lg font-semibold text-primary">
                Doctor: {item.docData.name}
              </h2>
              <p className="text-secondary">
                Speciality: {item.docData.speciality}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Patient:</span>{" "}
                {item.userData.name}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(item.slotDate).toLocaleDateString()}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Time:</span> {item.slotTime}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Payment:</span>{" "}
                {item.payment ? (
                  <span className="text-green-600">Paid</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Status:</span>{" "}
                {item.cancelled ? (
                  <span className="text-red-600">Cancelled</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </p>
              {item.isCompleted && (
                <p className="mt-1 text-blue-600 font-semibold">
                  Appointment Completed
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}
    </div>
  );
};

export default Appointment;
