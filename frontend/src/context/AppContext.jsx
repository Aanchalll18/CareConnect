// import { createContext, useState } from "react";
// import { doctors } from "../assets/assets";
// import axios from 'axios'
// import {toast} from 'react-toastify'

// export const AppContext =createContext()
// const AppContextProvider= (props) =>{

//     const currencySymbol='$'
//     const backendUrl=import.meta.env.VITE_BACKEND_URL
//     const [doctors,setDoctors]=useState([])

//     const [token,settoken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    
//     const [userData,setUserData]=useState(false)
   
//     const getAllDoctorsData=async()=>{
//         try{
//             const {data}=await axios.get(backendUrl + '/api/doctor/list')
//                 if(data.success){
//                     console.log(data)
//                     setDoctors(data.doctors)
//                 }   
//                 else{
//                     toast.error(data.message)
//                 }    
//         }
//         catch(e){
//            console.log(e)
//            toast.error(e.message)
//         } 
//       }
//       const loadUserProfileData=async()=>{
//         try{

//             const {data}=await axios.get(backendUrl + '/api/user/profile',{headers:{token}})
            
//             console.log("Token being sent:", token);


//             if(data){
//                 setUserData(data.userData)
//             }else{
//                 toast.error(data.message)
//             }

//         }
//         catch(e){
//             console.log(e)
//             toast.error(e.message)
//         }
//       }

//       const value={
//         doctors,getAllDoctorsData,
//         currencySymbol,
//         token,
//         settoken,
//         backendUrl,
//         userData,setUserData,
//         loadUserProfileData
//     }

//       useState(()=>{
//         getAllDoctorsData()
//       },[]
//       )

//       useState(()=>{
//         if(token){
//             loadUserProfileData()
//         }else{
//             setUserData(false)
//         }
//       },[token])


//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }
// export default AppContextProvider
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [userData, setUserData] = useState(null);

    const getAllDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                console.log(data);
                setDoctors(data.doctors);
            } else {
                toast.error(data.message || "Failed to fetch doctors.");
            }
        } catch (e) {
            console.error("Error fetching doctors:", e);
            toast.error(e.response?.data?.message || "An error occurred while fetching doctors.");
        }
    };

    const loadUserProfileData = async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: { token },
            });
            if (data) {
                setUserData(data.userData);
            } else {
                toast.error(data.message || "Failed to load user data.");
            }
        } catch (e) {
            console.error("Error loading user profile:", e);
            toast.error(e.response?.data?.message || "An error occurred while loading user data.");
        }
    };

    // Synchronize token state with localStorage
    const updateToken = (newToken) => {
        if (newToken) {
            localStorage.setItem("token", newToken);
            setToken(newToken);
        } else {
            localStorage.removeItem("token");
            setToken(null);
        }
    };

    useEffect(() => {
        getAllDoctorsData();
    }, []); // Runs once when the component mounts

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]); // Runs whenever the token changes

    const value = {
        doctors,
        getAllDoctorsData,
        currencySymbol,
        token,
        updateToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
    };

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
