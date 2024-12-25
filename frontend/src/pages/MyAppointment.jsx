
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
	const { doctors } = useContext(AppContext);

	return (
		<div className="p-10 bg-background min-h-[80vh]">
			<p className="text-2xl font-semibold text-primary mb-6">
				My Appointments
			</p>

			<div className="grid gap-6 md:grid-cols-2">
				{doctors.slice(0, 3).map((item, index) => (
					<div
						key={index}
						className="p-6 bg-white border rounded-xl shadow-lg hover:shadow-[6px_6px_12px_var(--accent-color)] transition duration-300"
					>
					
						<div className="flex gap-4">
							
							<img
								src={item.image}
								alt={item.name}
								className="w-24 h-24 rounded-full object-cover shadow-md"
							/>

							
							<div className="flex-1">
								<p className="font-bold text-primary text-lg">{item.name}</p>
								<p className="text-secondary">{item.speciality}</p>
								<p className="mt-4 font-semibold text-secondary">Address:</p>
								<p className="text-accent">{item.address.line1}</p>
								<p className="text-accent">{item.address.line2}</p>
								<p className="mt-2">
									<span className="font-semibold text-secondary">
										Date & Time:
									</span>{" "}
									1, December, 2024 | 8:30 PM
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
