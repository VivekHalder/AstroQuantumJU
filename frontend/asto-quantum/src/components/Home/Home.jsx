import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const checkLogin = async () => { 
    try {
      const res = await axios.get( import.meta.env.VITE_APP_BACKEND_API_GET_CURRENT_USER_END_POINT, { withCredentials: true } );
      //console.log(res.status);
      if(res){
        //console.log(res);
        navigate('/');
      } else{
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };


  useEffect( () => {
    checkLogin();
  }, [] );

  
  return (
    <>
      <></>
      <div>Home</div>
    </>
  )
}

export default Home