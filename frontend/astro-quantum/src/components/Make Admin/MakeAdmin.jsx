import React from 'react';
import axios from 'axios'
;
const users = await axios.get(VITE_APP_BACKEND_API_GET_NORMAL_USERS);

function MakeAdmin() {
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
    </div>
  )
}

export default MakeAdmin;