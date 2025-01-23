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
