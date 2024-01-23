import React from 'react';
import axios from 'axios';

const OVERLAY_STYLE = {
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '0',
  top: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const MODAL_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '30px',
  zIndex: 1000,
  backgroundColor: '#FFF',
  width: '60%',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
}

const PASSWORD_INPUT_STYLE = {
  width: '100%',
  padding: '10px',
  margin: '15px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
}

const UPDATE_BUTTON_STYLE = {
  backgroundColor: '#fff',
  color: '#ff5555',
  fontSize: '18px',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid #ff5555',
}

function PasswordCard({ openModal, setOpenModal, setUser, user, actualUser, setActualUser }) {

    const [ isHovered, setIsHovered ] = React.useState( false );

    const [ password, setPassword ] = React.useState( "" );

    function handleOnEnter(){
        setIsHovered( true );
    }

    function handleOnLeave(){
        setIsHovered( false );
    }

    function handlePasswordChange( event ){
        setPassword( event.target.value )
    }

    async function handleOnSubmit(){
        try {
          //console.log(import.meta.env.VITE_APP_BACKEND_API_AUTHENTICATE_USER_END_POINT,);
          setPassword( "" );
          const res = await axios.post( import.meta.env.VITE_APP_BACKEND_API_AUTHENTICATE_USER_END_POINT, { password: password }, { withCredentials: true } );
          
          //console.log(`this is ${res.data}`)
          if( res?.data && res?.data?.success ){
            try {
              let emailChange = false;
              let phoneChange = false;
              if( user.email !== actualUser.email ) emailChange = true;
              if( user.phone !== actualUser.phone ) phoneChange = true;
              const res_update = await axios.patch( import.meta.env.VITE_APP_BACKEND_API_UPDATE_USER_DETAILS_END_POINT, { email: user.email, phone: user.phone, name: user.name, emailChange, phoneChange }, { withCredentials: true } );

              if( res_update?.data ){
                console.log( res_update );
                actualUser = Object.assign( {}, user );
                localStorage.setItem( 'user', JSON.stringify( actualUser ) );
                setActualUser( JSON.parse( localStorage.getItem( 'user' ) ) );
                setUser( ...actualUser )
              }

            } catch (error) {
              console.log(`Error occured while updating the details. Error: ${ error.message }`);
            }
            setOpenModal( false );
          }
        } catch (error) {
          console.log(`Error: ${ error.message }`);
        }
    }

    const BUTTON_STYLES = {
        ...UPDATE_BUTTON_STYLE,
        color: isHovered ? "#fff" : UPDATE_BUTTON_STYLE.color,
        backgroundColor: isHovered ? "#ff5555" : UPDATE_BUTTON_STYLE.backgroundColor,
    }

  if( !openModal ) return null;

  return (
    <div>
      <div 
      style={OVERLAY_STYLE} 
      onClick={ () => { 
          setUser( Object.assign( {}, actualUser ) ); 
          setOpenModal( false );
        } 
      }
      ></div>
      <div style={MODAL_STYLE} >
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>
          Enter Your Password:
        </div>
        <input
          type="password"
          placeholder="Your Password"
          style={PASSWORD_INPUT_STYLE}
          value={password}
          name='password'
          onChange={ handlePasswordChange }
        />
        <button 
            style={BUTTON_STYLES}
            onMouseEnter={ handleOnEnter }
            onMouseLeave={ handleOnLeave }
            onClick={ handleOnSubmit }
        >
          Update Details
        </button>
      </div>
    </div>
  );
}

export default PasswordCard;