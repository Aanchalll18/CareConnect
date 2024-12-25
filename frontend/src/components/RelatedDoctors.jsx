import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({speciality, docId}) => {
	const { doctors } = useContext(AppContext);
    const navigate=useNavigate()
	const [relDoc, setrelDoc] = useState([]);

	useEffect(() => {
		if (doctors.length > 0 && speciality) {
			const doctorsData = doctors.filter(
				(doc) => doc.speciality === speciality && doc._id !== docId
			);
			setrelDoc(doctorsData);
		}
	}, [doctors, speciality, docId]);

	return (
		<div className="flex flex-col items-center gap-4 my-16 md:mx-1">
			<h1 className="text-3xl font-medium">Top Doctors to Book</h1>
			<p className="text-grey-500">
				Simply browse through our extensive list of trusted doctors.
			</p>
			<div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
				{relDoc.slice(0, 5).map((item, index) => (
					<div
						onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
						className="border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
						key={index}
					>
						<img className="bg-gray" src={item.image} alt="" />

						<div className="p-4">
							<div className="flex items-center gap-2 text-sm text-center text-lime-green">
								<p className="w-2 h-2 bg-lime-green rounded-full"></p>
								<p>Available</p>
							</div>
							<p className="text-lg font-medium">{item.name}</p>
							<p className="text-grey-500 ">{item.speciality}</p>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={() => {
					navigate("/doctors");
					scrollTo(0, 0);
				}}
				className="bg-primary  px-12 py-3 rounded-md font-bold text-white hover:bg-purple2"
			>
				more
			</button>
		</div>
	);
};

export default RelatedDoctors;
