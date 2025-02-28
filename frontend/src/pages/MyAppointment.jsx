import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
	const { backendUrl, token, getAllDoctorsData } = useContext(AppContext);

	const [appointments, setAppointments] = useState([]);

	const navigate = useNavigate();

	const getUserAppointments = async () => {
		try {
			const { data } = await axios.get(backendUrl + "/api/user/appointments", {
				headers: { token },
			});
			console.log(data);
			if (data.success) {
				setAppointments(data.appointments.reverse());
				console.log(data.appointments);
			} else {
				toast.error("Failed to fetch appointments");
			}
		} catch (error) {
			console.error("Error fetching appointments:", error);
			toast.error(
				error.message || "An error occurred while fetching appointments."
			);
		}
	};

	const cancelappointment = async (appointmentId) => {
		try {
			const { data } = await axios.post(
				backendUrl + "/api/user/cancel/appointment",
				{ appointmentId },
				{ headers: { token } }
			);

			if (data.success) {
				toast.success(data.message);
				getUserAppointments();
				getAllDoctorsData();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const initPay = (order) => {
		const options = {
			key: import.meta.env.VITE_RAZORPAY_KEY_ID,
			amount: order.amount,
			currency: order.currency,
			name: "Appointment Payment",
			description: "Appointment Payment",
			order_id: order.id,
			receipt: order.receipt,
			handler: async (response) => {
				console.log(response);

				try {
					const { data } = await axios.post(
						backendUrl + "/api/user/verifyRazorpay",
						response,
						{ headers: { token } }
					);
					if (data.success) {
						getUserAppointments();
						navigate("/my-appointments");
					}
				} catch (error) {
					console.log(error)

					toast.error(data.message)

					toast.error(error.message)

					
				}
			}
		}
		const rzp=new window.Razorpay(options)
		rzp.open()

	}
	const appointmentRazorpay = async (appointmentId) => {
		try {
			const { data } = await axios.post(
				backendUrl + "/api/user/payment-razorpay",
				{ appointmentId },
				{ headers: { token } }
			);
			console.log("razorpay");
			if (data.success) {
				console.log(data.order);
				initPay(data.order);
			}
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Something went wrong");
			}
		}
	};

	useEffect(() => {
		if (token) {
			getUserAppointments();
		}
	}, [token]);

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
								<p className="font-bold text-primary text-lg">
									{item.docData.name}
								</p>
								<p className="text-secondary">{item.docData.speciality}</p>
								<p className="mt-4 font-semibold text-secondary">Address:</p>
								<p className="text-accent">{item.docData.address.line1}</p>
								<p className="text-accent">{item.docData.address.line2}</p>

								<p className="mt-2 ">
									<span className="font-semibold text-secondary">
										Date & Time:
									</span>
									{new Date(item.slotTime).toLocaleString("en-US", {
										day: "numeric",
										month: "long",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</p>
							</div>
						</div>

						<div className="flex justify-end mt-10">
							<div className="flex flex-col gap-3 items-end">
								{/* {
								!item.cancelled &&
								item.payment && 
								<button
									className="min-w-[6rem] px-4 py-1.5 bg-green2 text-white text-sm rounded-md font-medium "
								>
									paid

								</button>
							} */}
								{console.log(
									item.payment,
									item.cancelled,
									"Paid Button Conditions"
								)}
								{!item.cancelled && item.payment && (
									<button className="min-w-[6rem] px-4 py-1.5 border border-green2 text-green2 text-sm rounded-md font-medium ">
										paid
									</button>
								)}

								{!item.cancelled && 
									!item.payment &&
								(
									<button
										onClick={() => appointmentRazorpay(item._id)}
										className="min-w-[6rem] px-4 py-1.5 bg-green2 text-white text-sm rounded-md font-medium hover:bg-lime-green  shadow-md transition-all duration-300"
									>
										Pay Online
									</button>
								)}

								{!item.cancelled && (
									<button
										onClick={() => cancelappointment(item._id)}
										className="min-w-[6rem] px-4 py-1.5 bg-red3 text-white text-sm rounded-md font-medium hover:bg-red2 shadow-md transition-all duration-300"
									>
										Cancel Appointment
									</button>
								)}
								{item.cancelled && (
									<button
										className="sm:min-w-48 py-2 border 
								 text-red3 border-red3 rounded "
										aria-label="Appointment has been cancelled"
									>
										Appointment Cancelled
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyAppointment;
