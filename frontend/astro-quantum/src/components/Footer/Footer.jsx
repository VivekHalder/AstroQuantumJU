import React from 'react';
import { Link } from 'react-router-dom';

const footerStyles = {
    height: "100px"
}

function Footer() {
  return (
    <>
            <div style={footerStyles} className='flex justify-end bg-orange-700' >
                <ul className='flex flex-row mx-auto mt-10'>
                    <li  className="text-2xl transition duration-150 ease-in-out hover:underline hover:scale-110 p-4 text-white font-bold">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    
                    <li  className='text-2xl font-bold text-white transition duration-150 ease-in-out hover:underline hover:scale-110 p-4'>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li  className='text-2xl font-bold text-white transition duration-150 ease-in-out hover:underline hover:scale-110 p-4'>
                        <Link to="/contact">
                            Contact
                        </Link>
                    </li>
                    <li  className='text-2xl font-bold text-white transition duration-150 ease-in-out hover:underline hover:scale-110 p-4'>
                        <Link to="/blogs">
                            Blogs
                        </Link>
                    </li>
                </ul>
            </div>
    </>
  )
}

export default Footer