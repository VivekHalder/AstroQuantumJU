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

    const [ isUserPresent, setIsUserPresent ] = useState(null);

    useEffect(() => {
        console.log("Changed");
        if(isUserPresent === null){

        } else if(!actualUserData || Object.keys(actualUserData).length === 0){
            console.log("no there");
            setIsUserPresent(false);
            return ;
        } else{
            console.log("done");
            localStorage.setItem('user', JSON.stringify(actualUserData));
            setIsUserPresent(true);
        }
    }, [actualUserData, isUserPresent]);

    const getActualUser = () => {
        return actualUserData;
    }    

    return (
        <UserContext.Provider value={{userData, setUserData, actualUserData, setActualUserData, getActualUser, isUserPresent, setIsUserPresent}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);