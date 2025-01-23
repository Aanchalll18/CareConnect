import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
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

const LatestBookingItem = ({ booking, onCancel }) => (
	<div className="flex items-center justify-between p-4 border-b hover:bg-gray-100 transition-colors">
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
				className="w-6 h-6 rounded-full cursor-pointer hover:bg-red-400 hover:p-1 transition-all"
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
