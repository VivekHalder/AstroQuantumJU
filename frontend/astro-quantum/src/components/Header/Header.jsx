import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();

  async function logoutUser(){
    
    try {
      const logoutResponse = await axios.post( import.meta.env.VITE_APP_BACKEND_API_LOGOUT_END_POINT, null, { withCredentials: true } );
  
      if( logoutResponse ){
        console.log("User logged-out successfully.");
        localStorage.removeItem( 'user' );
        navigate('/login');
      } else{
        console.log("Error occurred");
      }
    } catch (error) {
      console.log("Error occurred. Error ", error?.message);
    }
  }

  return (
    <header className='shadow sticky z-50 top-0'>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-3.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link to="/" className='flex items-center' >
            <img 
            src="" 
            className='mr-3 h-12'
            alt="logo" />
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
            to="#"
            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none lg:order-2"
            onClick={logoutUser}
            >
              Logout
            </Link>
            <Link
            to="/profile"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none lg:order-1"
            >
              Profile
            </Link>
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
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/about"
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/contact"
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                to="/blogs"
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Blogs
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;