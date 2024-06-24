import React from 'react'
import logo from "../assets/Asto-sci logo-horizontal-W.svg";
import gifBackground from "../assets/register-gif.webp";
import "./styles/auth.css";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; 
import { useUserContext } from '../contexts/UserContext';

function Register() {

    const navigate = useNavigate();

    const list = [
        {
            name: "Name",
            dummy: "Full Name"
        },
        {
            name: "Faculty",
            dummy: "Faculty"
        },
        {
            name: "Year",
            dummy: "Year"
        },
        {
            name: "Department",
            dummy: "Department"
        },
        {
            name: "Phone",
            dummy: "Phone Number"
        },
        {
            name: "Email",
            dummy: "Email"
        },
        {
            name: "Password",
            dummy: "Password"
        }
    ];

    const [ isSigningIn, setIsSigningIn ] = React.useState(false);

    const imgContainerStyle = {
        position: "relative",
        width: "100%",
        height: "100px"
    }

    const logoStyle = {
        width: "200px",
        height: "90px",
        position: "fixed",
        top: "1px",
        bottom: "5px",
        left: "20px"
    }

    const backgroundContainerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: `url(${gifBackground})`,
        backgroundSize: "100vw 110vh",
        backgroundRepeat: "no-repeat",
    }

    const bodyStyle = {
        margin: "0px",
        padding: "0px",
        width: "100%",
        height: "auto",
    }

    const overlayStyle = {
        position: "absolute",
        right: "30px",
        top: "100px",
        width: "500px",
        height: "700px",
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    } 

    const handleInputChange = (event) => {
        //console.log(event);
        const key = event.target.name;
        const value = event.target.value;
        console.log(key, value);
        setUserData((prevData) => ({
            ...prevData,
            [key.toLowerCase()]: value,
        }));
    };

    const handleRegistration = async () => {
        try {
            //console.log(import.meta.env.VITE_APP_BACKEND_API_REGISTRATION_END_POINT);
            console.log(userData);
            
            setIsSigningIn(true);

            const response = await axios.post(import.meta.env.VITE_APP_BACKEND_API_REGISTRATION_END_POINT, userData);
    
            if (response) {
                // Check if response.data is not undefined
                if (response.data) {

                    try {
                        const directLogin = await axios.post( import.meta.env.VITE_APP_BACKEND_API_LOGIN_END_POINT, { email: userData.email, password: userData.password }, { withCredentials: true } );
                        
                        console.log(response.data.data.user);
                        if( directLogin ){
                            navigate('/');
                        }
                    } catch (error) {
                        console.log("Couldnot directly login the user.")
                    }

                    
                    setUserData({
                        name: '',
                        faculty: '',
                        year: '',
                        department: '',
                        phone: '',
                        email: '',
                        password: '',
                    });
                } else {
                    console.log('Error registering the user. response.data is undefined.');
                }
            } else {
                console.log('Error registering the user. response is undefined.');
            }
        } catch (error) {
            console.error('Error registering the user. Error ', error?.message);
        } finally{
            setIsSigningIn(false);
        }
    };

  return (
    <div style={bodyStyle}>
        <div style={backgroundContainerStyle}></div>
        <div style={imgContainerStyle}>
            <img 
                src={logo} 
                alt="Logo" 
                style={logoStyle}
            />
        </div>
        <div>
            <div style={overlayStyle}>
                <h1 style={{fontFamily: "Rubik, sans-serif", color: "#E6E6E6"}} className='text-6xl pl-7 pt-5'>
                    Create Account
                </h1>
                <h2 style={{fontFamily: "Rubik, sans-serif", color: "#E6E6E6"}} className='text-3xl pl-7 pt-5 text-white'>
                    Be a part of the Community
                </h2>

                <div className='mt-10 flex flex-col'>
                    { list.map((element) => {
                        return (
                            <input 
                                key={element.name.toLowerCase()}
                                type={element.name === "Password" ? "password" : "text"}
                                name={element.name.toLowerCase()}
                                placeholder={element.dummy} 
                                value={userData[element.name.toLowerCase()]}
                                onChange={handleInputChange}
                                className={`w-4/5 ml-7 h-10 rounded-lg bg-transparent border-white border focus:outline-none px-4 py-4 text-xl text-white placeholder-white mt-3`}
                            />
                        )
                    }) }
                    <button
                        className='inline mt-10 ml-7 text-xl text-white rounded-lg'
                        style={{width: "400px", height: "38px", backgroundColor: "#CA4308"}}
                        onClick={handleRegistration}
                        disabled={isSigningIn}
                    >
                        {
                            isSigningIn ? "Signing In..." : "Sign In"
                        }
                    </button>
                    <div 
                        className='mt-10 ml-7 flex flex-row' 
                        style={{ width: "400px", height: "38px" }}
                    >
                        <h1 className='font-bold text-white mx-auto mr-0'>
                            Already Registered?&ensp;
                        </h1>
                        <h1 className='font-bold mx-auto ml-0' style={{ color: "#CA4308" }}>
                            <Link
                                to="/login"
                                className='hover:scale-110 hover:underline'
                            >
                                Login
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register;