import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import AddDoctor from './pages/Admin/AddDoctor';
import Appointment from './pages/Admin/Appointment';
import Doctorlist from './pages/Admin/Doctorlist';
import Dashboard from './pages/Admin/Dashboard';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)

  return aToken || dToken ? (
    <div >
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <Sidebar></Sidebar>

      <Routes>

        <Route path='/' element={<></>}></Route>

        <Route path='/admin-dashboard' element={<Dashboard/>}></Route>

        <Route path='/all-appointments' element={<Appointment/>}></Route>

        <Route path='/add-doctor' element={<AddDoctor/>}></Route>

        <Route path='/doctor-list' element={<Doctorlist/>}></Route>

        {/* doctor Route */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>

        <Route path='/doctor-appointment' element={<DoctorAppointment/>}></Route>

        <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>

      </Routes>
      </div>

    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
