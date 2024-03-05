import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        name: "",
        faculty: "",
        year: "",
        department: "",
        phone: "",
        email: "",
        password: ""
    });

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);