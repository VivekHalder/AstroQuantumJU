import React, { useState } from 'react'
import GoogleMap from '../Card/GoogleMap'
import aurobindo from '../../assets/aurobindo-bhavan.jfif'
import ju from '../../assets/ju-logo.png'

function About() {

  const [ mapLoaded, isMapLoaded ] = useState(false);

  const handleLoad = () => {
    isMapLoaded(true);
  }

  const container = {
    width: "450px",
    height: "500px",
  }

  const biggerCircle = {
    width: "450px",
    height: "450px",
    backgroundImage: `url(${aurobindo})`,
    backgroundPosition: "center",
    borderRadius: "50%"
  }

  const smallerCircle = {
    width: "250px",
    height: "250px",
    backgroundImage: `url(${ju})`,
    backgroundPosition: "center",
    borderRadius: "50%",
    position: "absolute",
    bottom: "-20px",
    backgroundColor: "white",
    backgroundRepeat: "no-repeat",
  }

  return (
    <div className='w-full bg-black'>
      <div className='w-full flex flex-row'>
        <div className="w-full mx-20 py-20 flex justify-center items-center h-full">
          <div className='w-1/2 ml-10'>
            <h1 className='text-7xl text-white mb-1'>
              The <span className='bg-orange-700 font-bold px-1 py-0'>First</span>
            </h1>
            <h1 className='text-white text-7xl mb-2'>
              Astro Physics
            </h1>
            <h1 className='text-white text-7xl mb-3'>
              Club of 
            </h1>
            <h1 className='text-7xl font-bold text-white bg-orange-700 inline pt-0 py-0 mb-2 py-0 pl-3 pr-1'>
              Jadavpur 
            </h1>
            <h1 className='text-white text-7xl'>
              University
            </h1>
          </div>
          <div className='w-1/2'>
            <div style={container} className='mx-auto'>
              <div style={biggerCircle} className='mt-2 ml-6'></div>
              <div style={smallerCircle}></div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/2 text-center'>
          <h1 className='w-full mt-3 text-white text-4xl'>
            About Us
          </h1>
        </div>
        <div className='w-1/2'>
          <p className='text-white text-center mt-0 mx-6 mb-6'>
          The First Astro Physics Club of Jadavpur University, Kolkata, India. The Astro Physics Club at Jadavpur University fosters a dynamic community of passionate students exploring the mysteries of the cosmos. Through discussions, stargazing events, and collaborative projects, members delve into the wonders of astro-physics, enhancing their astronomical understanding and scientific curiosity.
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col'>
        <div className='w-4/5 flex flex-row mx-auto'>
          <div style={{height: "490px"}} className='w-1/2'>
            <GoogleMap link={`${"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.14113989448!2d88.36883737435089!3d22.498887135669857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271237f28abe9%3A0xd047bab0c8bfb11c!2sJadavpur%20University!5e0!3m2!1sen!2sin!4v1704782218697!5m2!1sen!2sin"}`} onLoadHandle={handleLoad}/>
          </div>
          <div className='mt-20 ml-20'>
            <h1 className='text-white font-bold text-5xl mb-2'>
              Jadavpur
            </h1>
            <h1 className='text-white font-bold text-5xl mb-2'>
              University,
            </h1>
            <h1 className='text-white font-bold text-5xl bg-orange-700 mb-2'>
              Jadavpur
            </h1>
            <h1 className='text-white font-bold text-5xl mb-2'>
              Campus
            </h1>
          </div>
        </div>
        <div className='w-4/5 flex flex-row mx-auto'>
            <div className='w-1/2 mt-20 text-right'>
              <h1 className='text-white font-bold text-5xl mb-2'>
                Jadavpur
              </h1>
              <span className='text-white font-bold text-5xl mb-2 bg-orange-700'>
                University,
              </span>
              <h1 className='text-white font-bold text-5xl mb-2'>
                Salt Lake
              </h1>
              <h1 className='text-white font-bold text-5xl mb-2'>
                Campus
              </h1>
            </div>
            <div style={{height: "490px", width: "633px"}} className='ml-20 '>
              <GoogleMap link={`${"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.48978804809!2d88.41075967435283!3d22.56077763340536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02743203255595%3A0x9c37b30c00660fab!2sJadavpur%20University%2C%20Salt%20Lake%20Campus!5e0!3m2!1sen!2sin!4v1704782364930!5m2!1sen!2sin"}`} onLoadHandle={handleLoad}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About;