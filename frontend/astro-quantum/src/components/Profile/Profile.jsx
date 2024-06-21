import React, { useEffect, useState } from 'react';
import PasswordCard from '../Card/PasswordCard';
import { useUserContext } from '../../contexts/UserContext';

function Profile() {
    const { actualUserData } = useUserContext();

    const [ user, setUser ] = useState( {...actualUserData} );

    const userDetails = Object.entries( user );

    const [ openModal, setOpenModal ] = useState( false );

    const [ editMode, setEditMode ] = useState({
      name: false,
      phone: false,
      email: false,
    });

    const handleSubmit = ( prev ) => {
      if(prev["edit"] === true){
        for (const key in prev) {
            if( key !== "edit" ){
              if( user[key] !== actualUserData[key] ){
                console.log( `${actualUserData[key]} !== ${user[key]}` )
                setOpenModal( true );
              }
            }
          }
        return { name: false, phone: false, email:false, edit: false };
      } else{
        return { edit: !prev["edit"] };
      }
    }


    const handleEditClick = ( field ) => {
      setEditMode( ( prev ) => ( {
        ...prev, 
        ...( field === "edit" ?  handleSubmit( prev ) : { [field]: !prev[field] } ),
      } ) )
    }

    function handleChange( event ){
      //console.log(event.target);
      setUser( ( prev ) => ( { 
        ...prev,
        [event.target.name]: event.target.value
      } ) )
    }

  return (
    <div>
      <div>
        {
          openModal
          &&
          <PasswordCard openModal={ openModal } setOpenModal={ setOpenModal } setUser={ setUser } user={ user } actualUser={ actualUserData } setActualUser={ setActualUserData }/>
        }
      </div>
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
                  name={ element[0] }
                  value={ user[element[0]] } 
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

export default Profile;