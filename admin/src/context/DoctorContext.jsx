
import { createContext, useState } from "react";
// import toast from 'react-hot-toast'
import { toast } from "react-toastify";

import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(
        localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
    );
    const [appointments, setAppointments] = useState([]);
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)

    // Fetch appointments
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
                headers: { dToken },
            });

            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                console.log(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Complete appointment
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/complete-appointment',
                { appointmentId },
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments(); // Refresh appointments
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    };

    // Cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/doctor/cancel-appointment',
                { appointmentId },
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success(data.message);
                getAppointments(); // Refresh appointments
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    };

    // dashboard
    const getDashData=async()=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                setDashData(data.dashData)
                console.log(dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // profile
    const getProfile =async(req, res)=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                setProfileData(data.profileData)
                console.log(data.profileData)
            }else{
                toast.error(data.message)
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    // Context value
    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfile
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
