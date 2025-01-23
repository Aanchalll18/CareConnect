import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext)

  return (
    <div className="w-60 h-full shadow-md p-4">
      {aToken  &&  (
        <ul className="space-y-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.doctor_icon} alt="Doctors List" className="w-5 h-5" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
        {dToken  &&  (
        <ul className="space-y-4">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointment"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-md ${
                isActive ? 'bg-purple-500 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
            <p>Profile</p>
          </NavLink>
        </ul>
        )}
    </div>
  );
};

export default Sidebar;


