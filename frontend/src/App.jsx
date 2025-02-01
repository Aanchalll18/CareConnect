// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Doctor from './pages/Doctor';
// import About from './pages/About';
// import Login from './pages/Login';
// import Contact from './pages/Contact';
// import Myprofile from './pages/Myprofile';
// import MyAppointment from './pages/MyAppointment';
// import Appointment from './pages/Appointment';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Banner from './components/Banner';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//   return (
//     <div className='mx-4 sm:mx-[10%]'>
//         <ToastContainer/>
//        <Navbar/>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/doctors' element={<Doctor/>}/>
//         <Route path='/doctors/:speciality' element={<Doctor/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/my-profile' element={<Myprofile/>}/>
//         <Route path='/my-appointments' element={<MyAppointment/>}/>
//         <Route path='/appointment/:id' element={<Appointment/>}/>
//         <Route path="/" element={<Banner />} />
//       </Routes>
//       <Footer/>
//     </div>
//   );
// }

// export default App;

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import toast, { ToastContainer } from 'react-hot-toast';  // Ensure ToastContainer is imported
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddDoctor from './pages/Admin/AddDoctor';
import Appointment from './pages/Admin/Appointment';
import Doctorlist from './pages/Admin/Doctorlist';
import Dashboard from './pages/Admin/Dashboard';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div>
      <ToastContainer /> {/* Ensure ToastContainer is here */}
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<Appointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<Doctorlist />} />
          {/* doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointment" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer /> {/* Ensure ToastContainer is here as well */}
    </>
  );
};

export default App;
