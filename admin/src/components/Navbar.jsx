
import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const { aToken, setaToken } = useContext(AdminContext);

  const navigate=useNavigate()

  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem(aToken ? 'aToken' : 'dToken');
    setaToken(null);
    window.location.reload();
  };

  

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-25 h-15 cursor-pointer"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-1 bg-purple-500 text-white text-xs font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

