// import { createContext } from "react";

// export const AppContext=createContext()

// const AppContextProvider=(props)=>{
//         const calculateAge=(DOB) =>{
//             const today=new Date()
//             const birthdate=new Date(DOB)

//             let age=today.getFullYear()-birthdate.getFullYear()
//             return age
//         }
//         const value={
//             calculateAge()
//         }
//         return (
//             <AppContext.Provider value={value}>
//                 {props.children}
//             </AppContext.Provider>
//         )
// }

// export default AppContextProvider

import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Function to calculate age from DOB
  const calculateAge = (DOB) => {
    const today = new Date();
    const birthdate = new Date(DOB);

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--; // Decrement age if the birthday hasn't occurred yet this year
    }
    return age;
  };

  // Pass the function as a reference
  const value = {
    calculateAge, // Do not call the function here
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
