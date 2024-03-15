import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import logo from "../../assets/Asto-sci logo-horizontal-W.svg";
import { toast } from 'react-hot-toast';

function Header() {
  const navigate = useNavigate();

  const { actualUserData, setActualUserData,isUserPresent } = useUserContext();

  async function logoutUser(){
    
    try {
      const logoutResponse = await axios.post( import.meta.env.VITE_APP_BACKEND_API_LOGOUT_END_POINT, null, { withCredentials: true } );
  
      if( logoutResponse ){
        console.log("User logged-out successfully.");
        localStorage.removeItem( 'user' );
        setActualUserData({});
        navigate('/login');
        localStorage.removeItem('user');
        toast.success('Logged-out successfully.');
      } else{
        console.log("Error occurred");
      }
    } catch (error) {
      console.log("Error occurred. Error ", error?.message);
    }
  }

  return (
    <header className='shadow sticky z-50 top-0'>
      <nav  style={{backgroundColor: "#0F0F0F"}} className='border-orange-700 px-4 lg:px-6 py-3.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link to="/" className='flex items-center' >
            <img 
            src={logo} 
            className='mr-3 h-12'
            alt="logo" />
          </Link>
          <div className="flex items-center lg:order-2">
            { localStorage.getItem('user') ? 
              <>
                <Link
                  to="#"
                  className="text-xl text-white hover:bg-gray-50 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none lg:order-2"
                  onClick={logoutUser}
                >
                  Logout
                </Link>
                <Link
                to="/profile"
                style={{color: "#FFFFFF"}}
                className="text-xl bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none lg:order-1"
                >
                  Profile
                </Link>
              </>
              :
              <>
                <Link
                to="/login"
                className="text-xl text-white hover:bg-gray-50 hover:text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none lg:order-2"
                onClick={logoutUser}
                >
                  Login
                </Link>
              </>
            }
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                to="/"
                className={({isActive}) =>
                    `text-xl block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/about"
                className={({isActive}) =>
                    `text-xl block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/contact"
                className={({isActive}) =>
                    `text-xl block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/blogs"
                className={({isActive}) =>
                    `text-xl block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Blogs
                </NavLink>
              </li>
              { localStorage.getItem('user') && (Object.keys(JSON.parse(localStorage.getItem('user')) || '{}')).length > 0 && JSON.parse(localStorage.getItem('user')).role === "admin" &&
                <li>
                  <NavLink
                  to="/make-admin"
                  className={({isActive}) =>
                      `text-xl block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Make Admin
                  </NavLink>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;