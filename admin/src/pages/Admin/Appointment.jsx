import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const Appointment = () => {
	const { aToken, appointments, getAllAppointments ,cancelappointment} = useContext(AdminContext);

	const { calculateAge, curreny } = useContext(AppContext);

	useEffect(() => {
		if (aToken) {
			getAllAppointments();
		}
	}, [aToken]);

	return (
		<div className="w-full max-w-6xl m-5">
			<h1 className="text-3xl font-semibold mb-6">All Appointments</h1>
			<div className="bg-gray-50 border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
				<div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-semibold text-purple-700">
					<p>#</p>
					<p>Patient</p>
					<p>Age</p>
					<p>Date & Time</p>
					<p>Doctors</p>
					<p>Fees</p>
					<p>Actions</p>
				</div>
				{appointments.map((item, index) => (
					<div
						className="flex items-center gap-4 py-3 px-6 border-b hover:bg-gray-50"
						key={index}
					>
						{/* LHS Image */}
						<p className="max-sm:hidden">{index + 1}</p>
						<img
							src={item.userData.image}
							alt={item.userData.name}
							className="w-12 h-12 rounded-full"
						/>

						{/* Appointment Details */}
						<div className="flex-1 grid sm:grid-cols-[3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500">
							{/* <p>{index + 1}</p> */}
							<p>{item.userData.name}</p>
							<p className="max-sm:hidden">{calculateAge(item.userData.DOB)}</p>
							<p>{item.slotTime}</p>
							<p>{item.docData.name}</p>
							<p>
								{curreny}
								{item.docData.fees}
							</p>
              {
                item.cancelled ?
                <p className="text-red-700">Cancelled</p>
                :
                <img
								onClick={()=>cancelappointment(item._id)}
								className="rounded-full cursor-pointer hover:bg-red-400"
								src={assets.cancel_icon}
								alt="Cancel Icon"
							/>
              }
							
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Appointment;

