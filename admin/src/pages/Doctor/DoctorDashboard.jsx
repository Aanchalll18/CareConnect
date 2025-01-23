
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const StatCard = ({ icon, label, value }) => (
	<div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg">
		<img className="w-14" src={icon} alt={`${label} Icon`} />
		<div>
			<p className="text-xl font-semibold text-gray-600">{value}</p>
			<p className="text-gray-400">{label}</p>
		</div>
	</div>
);

const LatestAppointmentItem = ({ appointment }) => (
	<div className="flex justify-between items-center px-4 py-2 border-b hover:bg-gray-100">
		<div className="flex items-center gap-3">
      <img className="w-12 h-12 rounded-full"
      src={appointment.userData.image} alt="" />
			<div>
				<p className="text-gray-600 font-medium">{appointment.userData.name}</p>
				<p className="text-sm text-gray-400">{appointment.slotTime}</p>
			</div>
		</div>
    <p className={appointment.payment ? 'text-green-500' : 'text-yellow-500'}>
      {appointment.payment ? "Paid" : "Pending"}
    </p>
	</div>
);

const DoctorDashboard = () => {
	const { dToken, dashData, getDashData } = useContext(DoctorContext);

	useEffect(() => {
		if (dToken) {
			getDashData();
		}
	}, [dToken]);

	return (
		dToken && (
			<div className="m-5">
				<div className="flex flex-wrap gap-4">
					<StatCard
						icon={assets.earning_icon}
						label="Earnings"
						value={`$${dashData.earnings}`}
					/>
					<StatCard
						icon={assets.appointments_icon}
						label="Appointments"
						value={dashData.appointments}
					/>
					<StatCard
						icon={assets.patients_icon}
						label="Patients"
						value={dashData.patients}
					/>
				</div>

				<div className="bg-white mt-10 rounded-lg shadow-md">
					<div className="flex items-center gap-2.5 px-4 py-4 border-b">
						<img src={assets.list_icon} alt="List Icon" />
						<p className="font-medium text-lg">Latest Appointments</p>
					</div>
					<div>
						{dashData.latestAppointments?.length > 0 ? (
							dashData.latestAppointments.map((item, index) => (
								<LatestAppointmentItem
									key={index}
									appointment={item}
								/>
							))
						) : (
							<p className="text-center text-gray-500 p-4">
								No recent appointments.
							</p>
						)}
					</div>
				</div>
			</div>
		)
	);
};

export default DoctorDashboard;
