// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "../../assets/assets";

// const Dashboard = () => {
// 	const { aToken, getdashData, dashdata, cancelappointment } =
// 		useContext(AdminContext);

// 	useEffect(() => {
// 		if (aToken) {
// 			getdashData();
// 		}
// 	}, [aToken]);

// 	return (
// 		dashdata && (
// 			<div className="m-5">
// 				<div className="flex flex-wrap gap-3">
// 					<div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
// 						<img className="w-14" src={assets.doctor_icon} alt="" />
// 						<div>
// 							<p className="text-xl font-semibold text-gray-600">
// 								{dashdata.doctors}
// 							</p>
// 							<p className="text-gray-400">Doctors</p>
// 						</div>
// 					</div>
// 					<div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
// 						<img className="w-14" src={assets.patients_icon} alt="" />
// 						<div>
// 							<p className="text-xl font-semibold text-gray-600">
// 								{dashdata.patients}
// 							</p>
// 							<p className="text-gray-400">Patients</p>
// 						</div>
// 					</div>
// 					<div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
// 						<img className="w-14" src={assets.appointments_icon} alt="" />
// 						<div>
// 							<p className="text-xl font-semibold text-gray-600">
// 								{dashdata.appointments}
// 							</p>
// 							<p className="text-gray-400">Appointments</p>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="bg-white">
// 					<div className="flex ic gap-2.5 px-4 py-4 mt-10 rounded-t border">
// 						<img src={assets.list_icon} alt="" />
// 						<p>Latest Booking</p>
// 					</div>
// 					<div>
// 						{dashdata.latestAppointments.map((item, index) => (
// 							<div key={index}>
// 								<img src={dashdata.docData.image} alt="" />
// 								<div>
// 									<p>{item.docData.name}</p>
// 									<p>{item.slotTime}</p>
// 								</div>
// 								{item.cancelled ? (
// 									<p className="text-red-700">Cancelled</p>
// 								) : (
// 									<img
// 										onClick={() => cancelappointment(item._id)}
// 										className="rounded-full cursor-pointer hover:bg-red-400"
// 										src={assets.cancel_icon}
// 										alt="Cancel Icon"
// 									/>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	);
// };

// export default Dashboard;
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const StatCard = ({ icon, label, value }) => (
	<div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-gray-100 cursor-pointer hover:scale-105 transition-all">
		<img className="w-14" src={icon} alt={`${label} Icon`} />
		<div>
			<p className="text-xl font-semibold text-gray-600">{value}</p>
			<p className="text-gray-400">{label}</p>
		</div>
	</div>
);

const LatestBookingItem = ({ booking, onCancel }) => (
	<div className="flex items-center justify-between p-4 border-b">
		<div className="flex items-center gap-3">
			<img
				src={booking.docData?.image || assets.default_avatar}
				alt="Doctor"
				className="w-12 h-12 rounded-full"
			/>
			<div>
				<p className="font-medium">{booking.docData?.name || "Unknown Doctor"}</p>
				<p className="text-gray-500">{booking.slotTime}</p>
			</div>
		</div>
		{booking.cancelled ? (
			<p className="text-red-700">Cancelled</p>
		) : (
			<img
				onClick={() => onCancel(booking._id)}
				className="w-6 h-6 rounded-full cursor-pointer hover:bg-red-400"
				src={assets.cancel_icon}
				alt="Cancel Booking"
			/>
		)}
	</div>
);

const Dashboard = () => {
	const { aToken, getdashData, dashdata, cancelappointment } =
		useContext(AdminContext);

	useEffect(() => {
		if (aToken) {
			getdashData();
		}
	}, [aToken]);

	if (!dashdata) {
		return <p className="text-center text-gray-500">Loading dashboard data...</p>;
	}

	return (
		<div className="m-5">
			<div className="flex flex-wrap gap-3">
				<StatCard icon={assets.doctor_icon} label="Doctors" value={dashdata.doctors} />
				<StatCard icon={assets.patients_icon} label="Patients" value={dashdata.patients} />
				<StatCard icon={assets.appointments_icon} label="Appointments" value={dashdata.appointments} />
			</div>
			<div className="bg-white mt-10">
				<div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
					<img src={assets.list_icon} alt="List Icon" />
					<p className="font-medium">Latest Booking</p>
				</div>
				<div>
					{dashdata.latestAppointments?.length > 0 ? (
						dashdata.latestAppointments.map((item, index) => (
							<LatestBookingItem key={index} booking={item} onCancel={cancelappointment} />
						))
					) : (
						<p className="text-center text-gray-500 p-4">No recent bookings available.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
