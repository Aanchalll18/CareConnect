
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
	const [aToken, setaToken] = useState(
		localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
	);

	const [doctors, setDoctors] = useState([]);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            console.log("token",aToken)
          const { data } = await axios.post(
            `${backendUrl}/api/admin/all-doctors`,
            {},
            {
              headers: {
                Authorization: `Bearer ${aToken}`,
                'Content-Type': 'application/json' 
              },
            }
          );
          if (data.success) {
            setDoctors(data.doctors);
            console.log(data.doctors)
          } else {
            console.error(data.message);
            toast.error(data.message || "Something went wrong");
            console.log(data.doctors)
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
           
            await getAllDoctors(); 
          } else {
            console.error("Error fetching doctors:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || error.message);
          }
        }
      };
    
      const changeAvailability=async(docId)=>{
        try{
            const {data}=await axios.post(backendUrl + '/api/admin/change-availability')
            if(data.success){
                toast.success(data.message)
                getAllDoctors()

            }else{
                toast.error(data.message)
            }
        }
        catch(e){
                toast.error(e.message)
        }
      }
      
    
	const value = {
		aToken,
		setaToken,
		backendUrl,
		doctors,
		getAllDoctors,changeAvailability
	};
	return (
		<AdminContext.Provider value={value}>
			{props.children}
		</AdminContext.Provider>
	);
};

export default AdminContextProvider;

