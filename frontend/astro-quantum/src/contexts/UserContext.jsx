import { useContext } from 'react';
import { createContext } from 'react';
import useFetchUser from '../hooks/useFetchUser';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [ actualUserData, setActualUserData, loading, setLoading ] = useFetchUser();

    return (
        <UserContext.Provider value={{ actualUserData, setActualUserData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);