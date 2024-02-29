import React from 'react'
import logo from "../assets/Asto-sci logo-horizontal-W.svg";
import gifBackground from "../assets/black-hole-icegif-1.gif";
import "./styles/auth.css";
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom'; 

function Login() {

    const navigate = useNavigate();

    const [ isLoggingIn, setIsLoggingIn ] = React.useState(false);

    const imgContainerStyle = {
        position: "relative",
        width: "100%",
        height: "100px"
    }

    const logoStyle = {
        width: "200px",
        height: "90px",
        position: "absolute",
        top: "1px",
        bottom: "5px",
        left: "20px"
    }

    const bodyStyle = {
        margin: "0px",
        padding: "0px",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${gifBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

    const overlayStyle = {
        position: "absolute",
        right: "30px",
        top: "100px",
        width: "500px",
        height: "400px",
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    } 

    const handleLogin = async () => {
        try {

            setIsLoggingIn(true);

            const response = await axios.post(import.meta.env.VITE_APP_BACKEND_API_LOGIN_END_POINT, { email: userData.email, phone: userData.phone, password: userData.password }, { withCredentials: true });

            console.log(response);

            if(!response){
                console.error("There was an error logging in the user.");
            }

            if(response && response?.data){
                localStorage.setItem( 'user', JSON.stringify( response.data.data.user ) );
                navigate('/');
                setUserData({
                    email: "",
                    phone: "",
                    password: "",
                    "phone or email": ""
                });
            }

        } catch (error) {
            console.log("Error occured whiling logging the user in. Error ", error?.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const [userData, setUserData] = React.useState({
        phone: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        //console.log(event);
        const key = event.target.name;
        const value = event.target.value;
        //console.log(key, value);

        if(key==="phone or email"){
            if(!value?.trim().length){
                setUserData((prevData)=> ({
                    ...prevData,
                    phone: "",
                    email: ""
                }))  
            }
            if(validator.isNumeric(value)){
                setUserData((prevData)=> ({
                    ...prevData,
                    phone: value,
                    email: ""
                }))
            }
            else {
                if(validator.isEmail(value)){
                    setUserData((prevData) => ({
                        ...prevData,
                        email: value,
                        phone: ""
                    }))
                }
                // else{
                //     console.log("inavlid email format");
                // }
            }
        }

        else{
            setUserData((prevData) => ({
                ...prevData,
                [key.toLowerCase()]: value,
            }));
        }

        //console.log(userData);
    };

  return (
    <div style={bodyStyle}>
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
                    Welcome Back!
                </h1>
                <h2 style={{fontFamily: "Rubik, sans-serif", color: "#E6E6E6"}} className='text-3xl pl-7 pt-5 text-white'>
                    Glad to see you back!
                </h2>

                <div className='mt-10 flex flex-col'>
                    <input 
                        type="text"
                        name="phone or email"
                        placeholder='Phone number or email' 
                        className={`w-4/5 ml-7 h-10 rounded-lg bg-transparent border-white border focus:outline-none px-4 py-4 text-xl text-white placeholder-white`}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password" 
                        className={`w-4/5 ml-7 mt-7 h-10 rounded-lg bg-transparent border-white border focus:outline-none px-4 py-4 text-xl text-{#E6E6E6} placeholder-white`}
                        onChange={handleInputChange}
                    />
                    
                    <button
                        className='inline mt-10 ml-7 text-xl text-white rounded-lg'
                        style={{width: "400px", height: "38px", backgroundColor: "#CA4308"}}
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                    >
                        {
                            isLoggingIn ? "Logging In..." : "Login"
                        }
                    </button>
                    <div 
                        className='mt-10 ml-7 flex flex-row' 
                        style={{ width: "400px", height: "38px" }}
                    >
                        <h1 className='font-bold text-white mx-auto mr-0'>
                            New User?&ensp;
                        </h1>
                        <h1 className='font-bold mx-auto ml-0' style={{ color: "#CA4308" }}>
                            <Link
                                to="/register"
                                className='hover:scale-110 hover:underline'
                            >
                                Sign Up
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;