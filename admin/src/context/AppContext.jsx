

import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
 const curreny='$'
  const calculateAge = (DOB) => {
    const today = new Date();
    const birthdate = new Date(DOB);

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--; 
    }
    return age;
  };

  
  const value = {
    calculateAge,
    curreny
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
