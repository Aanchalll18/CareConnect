import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Appointment = () => {
	const { id } = useParams();
	const { doctors, currencySymbol, backendUrl, token, getAllDoctorsData } =
		useContext(AppContext);

	const navigate = useNavigate();

	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	const [doctor, setDocInfo] = useState(null);
	const [docSlot, setDocSlot] = useState([]);
	const [slotIndex, setSlotIndex] = useState(0);
	const [slotTime, setSlotTime] = useState("");

	const fetchedDocInfo = () => {
		if (!doctors || doctors.length === 0) {
			console.error("Doctors data is not available yet.");
			return;
		}

		const foundDoctor = doctors.find((doc) => String(doc._id) === String(id));
		setDocInfo(foundDoctor);
		//console.log("Found doctor:", foundDoctor);
	};

	const getAvailableSlots = async () => {
		setDocSlot([]);
		let today = new Date();
		for (let i = 0; i < 7; i++) {
			let currentDate = new Date(today);
			currentDate.setDate(today.getDate() + i);

			let endTime = new Date();
			endTime.setDate(today.getDate() + i);
			endTime.setHours(21, 0, 0, 0);

			if (today.getDate() === currentDate.getDate()) {
				currentDate.setHours(
					currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
				);
				currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
			} else {
				currentDate.setHours(10);
				currentDate.setMinutes(0);
			}
			let timeSlots = [];
			while (currentDate < endTime) {
				let formattedTime = currentDate.toLocaleDateString([], {
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				});


				let day = currentDate.getDate();
				let month = currentDate.getMonth() + 1;
				let year = currentDate.getFullYear();

				const slotDate = `${day}-${month}-${year}`; // Defined here
				const slotTime=formattedTime
	
				const isSlotAvailable = 
					doctor?.slots_booked?.[slotDate] &&
					doctor?.slots_booked?.[slotDate]?.includes(slotTime) ? false :true
				
	
				if (isSlotAvailable) {
					timeSlots.push({
						datetime: new Date(currentDate),
						time: formattedTime,
					});
				}
	
				currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
			}
	
			setDocSlot((prev) => [...prev, timeSlots]); // Append slots for the day
		}
	
		
	};

	const bookAppointment = async () => {
		if (!token) {
			toast.warn("Login to book appointment");
			return navigate("/login");
		}
		try {
			//console.log("hi");
			const date = docSlot[slotIndex][0].datetime;

			let day = date.getDate();
			let month = date.getMonth() + 1;
			let year = date.getFullYear();

			const slotDate = day + "-" + month + "-" + year;

			const { data } = await axios.post(
				backendUrl + "/api/user/book/appointment",
				{ id, slotDate, slotTime },
				{ headers: { token } }
			);

			if (data.success) {
				toast.success(data.message);
				getAllDoctorsData();
				navigate("/my-appointments");
			} else {
				toast.error(data.message);
			}
		} catch (e) {
			console.log("Error Data:", e.response?.data);

			if (e.response) {
				const errorMessage = e.response.data.message || "An error occurred";
				toast.error(errorMessage);
			} else {
				toast.error("Unexpected error occurred");
			}
		}
	};

	useEffect(() => {
		fetchedDocInfo();
	}, [doctors, id]);

	useEffect(() => {
		getAvailableSlots();
	}, [doctor]);

	useEffect(() => {
		console.log(docSlot);
	}, [docSlot]);

	if (!doctor) {
		return <div>Loading doctor details...</div>;
	}

	return (
		<div>
			{/* Doctor's Details */}
			<div className="flex flex-col sm:flex-row gap-4 ml-2">
				<div>
					<img
						className="bg-primary w-full sm:max-w-72 rounded-lg"
						src={doctor.image || "/default-image.png"}
						alt=" "
					/>
				</div>
				<div className="flex-1 border border-gray rounded-lg bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 p-8 py-7">
					<p className="flex items-center gap-2 text-2xl font-medium ">
						{doctor.name}
						<img className="w-5" src={assets.verified_icon} alt="" />
					</p>
					<div className="flex items-center gap-2 text-sm mt-1 text-grey-500 ">
						<p>
							{doctor.degree} - {doctor.speciality}
						</p>
						<button className="py-0.5 px-2 border text-xs rounded-full">
							{doctor.experience}
						</button>
					</div>
					{/* about the doctor */}
					<div>
						<p className="flex items-center gap-1 text-sm font-medium mt-3 text-greytxt">
							About <img src={assets.info_icon} alt="" />
						</p>
						<p className="text-greytxt text-sm max-w-[700px] mt-1">
							{doctor.about}
						</p>
					</div>
					<p className="mt-4 text-greytxt font-medium">
						Appointment Fee:{" "}
						<span className="text-greytxt">
							{currencySymbol}
							{doctor.fees}
						</span>
					</p>
				</div>
			</div>
			{/* Booking Slots */}
			<div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-grey-500 ">
				<p>Booking Slots</p>
				<div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
					{docSlot.length > 0 &&
						docSlot.map((item, index) => (
							<div
								onClick={() => setSlotIndex(index)}
								className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
								${
									slotIndex === index
										? "bg-primary text-white hover:bg-purple2"
										: "border border-grey-100"
								} `}
								key={index}
							>
								<p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
								<p>{item[0] && item[0].datetime.getDate()}</p>
							</div>
						))}
				</div>
				<div className="flex items-center gap-3 w-full overflow-x-auto mt-4">
					{docSlot.length > 0 &&
						docSlot[slotIndex]?.map((item, index) => (
							<p
								onClick={() => setSlotTime(item.time)}
								className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border border-gray-300 hover:bg-gray-100 
									${
										item.time === slotTime
											? "bg-primary text-white"
											: "text-grey-100 border border-grey-100"
									}`}
								key={index}
							>
								{new Date(item.time).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						))}
				</div>
				<button
					onClick={bookAppointment}
					className="bg-purple2 text-white text-sm font-light px-4 py-3 rounded-full my-6"
				>
					Book an appointment
				</button>
			</div>
			<RelatedDoctors
				docId={id}
				speciality={doctor.speciality}
			></RelatedDoctors>
		</div>
	);
};

export default Appointment;
