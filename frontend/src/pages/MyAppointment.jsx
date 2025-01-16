
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointment = () => {
	const { backedUrl,token } = useContext(AppContext);

	const [appointments,setAppointments]=useState([])

	

	const getUserAppointments = async () => {
		try {
			const { data } = await axios.get(backedUrl + '/api/user/appointments', 
				{
				headers: { token }
			});
			console.log(data)
			if (data.success) {
				setAppointments(data.appointments.reverse());
				console.log(data.appointments);
			} else {
				toast.error("Failed to fetch appointments");
			}
		} catch (error) {
			console.error("Error fetching appointments:", error);
			toast.error(error.message || "An error occurred while fetching appointments.");
		}
	};
	

	useEffect(()=>{
		if(token){
			getUserAppointments()
		}
	},[token])

	return (
		<div className="p-10 bg-background min-h-[80vh]">
			<p className="text-2xl font-semibold text-primary mb-6">
				My Appointments
			</p>

			<div className="grid gap-6 md:grid-cols-2">
				{appointments.map((item, index) => (
					<div
						key={index}
						className="p-6 bg-white border rounded-xl shadow-lg hover:shadow-[6px_6px_12px_var(--accent-color)] transition duration-300"
					>
					
						<div className="flex gap-4">
							
							<img
								src={item.docData.image}
								alt={item.docData.name}
								className="w-24 h-24 rounded-full object-cover shadow-md"
							/>

							
							<div className="flex-1">
								<p className="font-bold text-primary text-lg">{item.docData.name}</p>
								<p className="text-secondary">{item.docData.speciality}</p>
								<p className="mt-4 font-semibold text-secondary">Address:</p>
								<p className="text-accent">{item.docData.address.line1}</p>
								<p className="text-accent">{item.docData.address.line2}</p>
								<p className="mt-2">
									<span className="font-semibold text-secondary">
										Date & Time:
									</span>{item.slotDate}
											|
										{item.slotTime}
								</p>
							</div>
						</div>

					
						<div className="flex justify-end mt-10">
							<div className="flex flex-col gap-3 items-end">
								<button className="min-w-[6rem] px-4 py-1.5 bg-green2 text-white text-sm rounded-md font-medium hover:bg-lime-green  shadow-md transition-all duration-300">
									Pay Online
								</button>
								<button className="min-w-[6rem] px-4 py-1.5 bg-red3 text-white text-sm rounded-md font-medium hover:bg-red2 shadow-md transition-all duration-300">
									Cancel Appointment
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyAppointment;
