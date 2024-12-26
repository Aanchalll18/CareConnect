import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Doctorlist = () => {
  const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
       getAllDoctors()
    }
  },[aToken])

  

    return (
      <div className='m-5 max-h-[90vh] overflow-y-auto'>
        <h1 className='text-lg font-medium mb-5'>All Doctors</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {doctors.map((item, index) => (
            <div key={index} className='border border-indigo-200 rounded-lg shadow-lg overflow-hidden'>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover" 
              />
              <div className='p-4'>
                <p className='font-semibold text-lg'>{item.name}</p>
                <p className='text-sm text-gray-500'>{item.speciality}</p>
                <div className='flex items-center mt-4'>
                  <input 
                    type="checkbox" 
                    checked={item.available} 
                    onChange={() => changeAvailability(item._id)} 
                    className="form-checkbox h-5 w-5 text-indigo-500" 
                  />
                  <p className='ml-2 text-sm'>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Doctorlist
