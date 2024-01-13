import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Profile() {
    const actualUser = useSelector( state => state.user );
    const user = Object.assign( {}, actualUser )
    const userDetails = Object.entries( user );

    const [ editMode, setEditMode ] = useState({
      name: false,
      phone: false,
      email: false,
    });

    const handleEditClick = ( field ) => {
      setEditMode( ( prev ) => ( {
        ...prev, 
        ...( field === "edit" ? ( prev["edit"] === true ? { name: false, phone: false, email:false, edit: false } : { [field]: !prev[field] } ) : { [field]: !prev[field] } ),
      } ) )
    }

    function handleChange( event ){
      console.log(event.target);
      user[event.target.name] = event.target.value;
    }

  return (
    <div>
      <div className='w-full'>
        <h1 className='text-5xl text-center mt-5'>
          { user.name }'s Profile
        </h1>
      </div>
      <div className='flex flex-row'>
        <div className='w-1/3'>

        </div>
        <div className='flex flex-col mt-20 w-2/3'>
          <div>
            {
              userDetails.map( ( element ) => ( element[0] !== '_id' && element[0] !== '__v' &&
                <div key={element[0]} className='flex flex-row mb-3'>
                  <div className='text-3xl text-center w-1/3 flex justify-end mr-4'>
                    <h1>{ element[0].charAt(0).toUpperCase() + element[0].slice(1) }:</h1>
                  </div>
                  <input 
                  className={`bg-gray-300 text-3xl text-center w-1/2 rounded-lg mr-3 
                  ${ editMode[element[0]] ? "bg-white" : "" }`}
                  value={ element[1] } 
                  readOnly={ !editMode[element[0]] }
                  onChange={handleChange}
                  />
                  {
                    ( element[0] === 'name' || element[0] === 'phone' || element[0] === 'email' ) 
                    &&
                    ( editMode.edit )
                    &&
                    <button
                    className='rounded-lg bg-green-500 p-2'
                    onClick={() => handleEditClick( element[0] )}
                    >
                      { editMode[element[0]] ? 'Save' : 'Edit' }
                    </button>
                  }
                </div>
              ) )
            }
          </div>
          <button className='p-1 m-10 bg-gray-200 w-1/3 mx-auto' onClick={() => handleEditClick('edit')}>
            { editMode.edit ? 'Save Changes' : 'Edit Profile' }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile