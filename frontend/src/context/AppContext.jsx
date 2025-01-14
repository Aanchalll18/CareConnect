import { createContext, useEffect, useState } from "react";

import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext =createContext()
const AppContextProvider= (props) =>{

    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [doctors,setDoctors]=useState([])

    const [token,settoken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    
    const [userData,setUserData]=useState(false)
   
    const getAllDoctorsData=async()=>{
        try{
            const {data}=await axios.get(backendUrl + '/api/doctor/list')
                if(data.success){
                    console.log(data)
                    setDoctors(data.doctors)
                }   
                else{
                    toast.error(data.message)
                }    
        }
        catch(e){
           console.log(e)
           toast.error(e.message)
        } 
      }
      const loadUserProfileData=async()=>{
        try{

            const {data}=await axios.get(backendUrl + '/api/user/profile',{headers:{token}})
            
            console.log("Token being sent:", token);


            if(data){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        }
        catch(e){
            console.log(e)
            toast.error(e.message)
        }
      }

      useEffect(()=>{
        getAllDoctorsData()
      },[]
      )

      useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
      },[token])

      const value={
        doctors,
        getAllDoctorsData,
        currencySymbol,
        token,
        settoken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    }

      


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
