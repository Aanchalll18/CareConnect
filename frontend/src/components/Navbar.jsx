import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	//const [token, setToken] = useState(true);
	const {token,settoken}=useContext(AppContext)

	const logout = ()=>{
		settoken(false)
		localStorage.removeItem('token')
	}

	return (
		<div className="flex flex-row items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
			<img
				onClick={() => navigate("/")}
				className="w-60 cursor-pointer"
				src={assets.logo}
				alt=""
			/>
			<ul className="hidden md:flex items-start gap-5 font-medium">
				<NavLink to="/">
					<li className="py-1">HOME</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/doctors">
					<li className="py-1">ALL DOCTOR</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/about">
					<li className="py-1">ABOUT</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
				<NavLink to="/contact">
					<li className="py-1">CONTACT</li>
					<hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
				</NavLink>
			</ul>
			<div className="flex items-center gap-4">
				{token ? (
					<div className="flex items-center gap-2 cursor-pointer group relative">
						<img className="w-8 rounded-full" src={assets.profile_pic} alt="" />

						<img className="w-2.5" src={assets.dropdown_icon} alt="" />

						<div className="absolute top-full right-0 mt-0 text-base font-medium z-20 hidden group-hover:block bg-white shadow-md rounded-md">
							<div className="flex flex-col">
								<p
									onClick={() => navigate("my-profile")}
									className="px-4 py-2 hover:bg-gray cursor-pointer"
								>
									My Profile
								</p>
								<p
									onClick={() => navigate("my-appointments")}
									className="px-4 py-2 hover:bg-gray cursor-pointer whitespace-nowrap"
								>
									My Appointment
								</p>
								<p
									onClick={logout }
									className="px-4 py-2 hover:bg-gray cursor-pointer"
								>
									Logout
								</p>
							</div>
						</div>
					</div>
				) : (
					<button
						onClick={() => navigate("/login")}
						className=" text-White bg-primary px-8 py-3 rounded-full font-light hidden md:block hover:bg-purple2"
					>
						Create account
					</button>
				)}
				<img
					onClick={() => setShowMenu(true)}
					className="w-6 md:hidden"
					src={assets.menu_icon}
					alt=""
				/>
				{/* Mobile Menu */}
				<div
					className={` ${
						showMenu ? "fixed w-full" : "h-0 w-0"
					} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
				>
					<div className="flex items-center justify-between px-6 py-5">
						<img className="w-36" src={assets.logo} alt="" />
						<img
							className="w-7"
							onClick={() => setShowMenu(false)}
							src={assets.cross_icon}
							alt=""
						/>
					</div>
					<ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
						<NavLink
							to="/"
							onClick={() => setShowMenu(false)}
							className={({ isActive }) =>
								`px-4 py-2 rounded inline-block transition-all transform ${
									isActive
										? "bg-primary text-white shadow-lg translate-y-0"
										: "hover:bg-gray-200 hover:text-primary hover:shadow-md hover:translate-y-[-2px]"
								}`
							}
						>
							Home
						</NavLink>

						<NavLink
							to="/doctors"
							onClick={() => setShowMenu(false)}
							className={({ isActive }) =>
								`px-4 py-2 rounded inline-block transition-all transform ${
									isActive
										? "bg-primary text-white shadow-lg translate-y-0"
										: "hover:bg-gray-200 hover:text-primary hover:shadow-md hover:translate-y-[-2px]"
								}`
							}
						>
							All Doctors
						</NavLink>

						<NavLink
							to="/about"
							onClick={() => setShowMenu(false)}
							className={({ isActive }) =>
								`px-4 py-2 rounded inline-block transition-all transform ${
									isActive
										? "bg-primary text-white shadow-lg translate-y-0"
										: "hover:bg-gray-200 hover:text-primary hover:shadow-md hover:translate-y-[-2px]"
								}`
							}
						>
							About
						</NavLink>

						<NavLink
							to="/contact"
							onClick={() => setShowMenu(false)}
							className={({ isActive }) =>
								`px-4 py-2 rounded inline-block transition-all transform ${
									isActive
										? "bg-primary text-white shadow-lg translate-y-0"
										: "hover:bg-gray-200 hover:text-primary hover:shadow-md hover:translate-y-[-2px]"
								}`
							}
						>
							Contact
						</NavLink>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
