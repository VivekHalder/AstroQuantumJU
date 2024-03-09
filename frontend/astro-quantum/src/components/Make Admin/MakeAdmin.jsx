import React, { useEffect, useState } from 'react';
import axios from 'axios';


function MakeAdmin() {
  const [ users, setUsers ] = useState([]);

  async function getUsers(){
    const res = await axios.get(import.meta.env.VITE_APP_BACKEND_API_GET_NORMAL_USERS);

    setUsers(res.data.data.users);

    console.log(users);
  }

  useEffect( () => {
    getUsers();
  }, [] );

  return (
    <div className='w-full bg-black'>
        <div>
            <h1 className='text-center text-white font-bold text-3xl'>
                Users
            </h1>
            {
              users
            }
        </div>
        <div>
            <h1 className='text-center text-white font-bold text-3xl'>
                Users
            </h1>
            {
              users
            }
        </div>
    </div>
  )
}

export default MakeAdmin;