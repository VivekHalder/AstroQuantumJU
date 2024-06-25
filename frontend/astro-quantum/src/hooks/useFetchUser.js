import { useEffect, useState } from "react";
import axios from "axios";

const useFetchUser = () => {
  const [ actualUser, setActualUser ] = useState( null );
  const [ loading, setLoading ] = useState( false );
  
  const fetchUsers = async () => {
    try{

        setLoading( true );

        const res = await axios.get(`${ import.meta.env.VITE_APP_BACKEND_API_GET_CURRENT_USER_END_POINT }`, { withCredentials: true });
        console.log(res);

        setActualUser( res.data.data );
        setLoading( false );

    } catch( error ){
        setLoading( false );
        setActualUser( null );
    }
  }

  useEffect( () => {
    fetchUsers();
  }, [  ] );

  return [ actualUser, setActualUser, loading, setLoading ];
}

export default useFetchUser;