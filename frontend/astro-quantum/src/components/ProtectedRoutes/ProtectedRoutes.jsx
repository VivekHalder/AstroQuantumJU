import React from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
    const { actualUserData } = useUserContext();
  return (
    actualUserData ? 
        (
            <>
                { children }
            </>
        )
        :
        (
            <Navigate to="/login"/>
        )
  )
}

export default ProtectedRoutes