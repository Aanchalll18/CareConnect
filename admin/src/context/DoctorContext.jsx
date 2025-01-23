import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
    const backendUrl =import.meta.env.VITE_BACKEND_URL 

    const [dToken, setDToken] = useState(
		localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
	);
    const [appointments,setAppointments]=useState([])
    
    const getAppointments =async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})

            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                console.log(data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };
<<<<<<<<< Temporary merge branch 1
=========

    const completeAppointment=async()=>{
        try {
            const {data}=await axios.post(backendUrl + '/api/complete-appointment',{appointmentId},{headers:{dtoken}})

            if(data.success){
                toast.success(data.message)
                getAppointments()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
>>>>>>>>> Temporary merge branch 2

        const value={
            dToken,setDToken,
            backendUrl,
            appointments,setAppointments,
            getAppointments,completeAppointment,cancelAppointment
        }

        return (
            <DoctorContext.Provider value={value}>
                {props.children}
            </DoctorContext.Provider>
        )
}

export default DoctorContextProvider