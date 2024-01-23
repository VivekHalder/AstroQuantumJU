import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
            <span className='w-full h-20 bg-yellow-400 text-4xl flex items-center justify-center'>
                <h1 className=''>
                    JOIN THE ASTRO-QUANTUM JU CLUB TODAY!!!
                </h1>
            </span>
            <div className='flex justify-end' >
                <ul className='flex flex-row'>
                    <li  className="transition duration-150 ease-in-out hover:underline hover:scale-110 p-2">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    
                    <li  className='transition duration-150 ease-in-out hover:underline hover:scale-110 p-2'>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li  className='transition duration-150 ease-in-out hover:underline hover:scale-110 p-2'>
                        <Link to="/contact">
                            Contact
                        </Link>
                    </li>
                    <li  className='transition duration-150 ease-in-out hover:underline hover:scale-110 p-2'>
                        <a href="">
                            GitHub
                        </a>
                    </li>
                </ul>
            </div>
    </>
  )
}

export default Footer