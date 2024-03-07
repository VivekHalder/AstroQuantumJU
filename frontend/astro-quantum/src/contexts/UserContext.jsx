import { useContext, useEffect } from 'react';
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

    const [actualUserData, setActualUserData] = useState({});

    useEffect(() => {
        console.log("Changed");
        if(Object.keys(actualUserData).length === 0) return ;
        localStorage.setItem('user', JSON.stringify(actualUserData));
        console.log(actualUserData);
    }, [actualUserData]);

    const getActualUser = () => {
        return actualUserData;
    }    

    return (
        <UserContext.Provider value={{userData, setUserData, actualUserData, setActualUserData, getActualUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);