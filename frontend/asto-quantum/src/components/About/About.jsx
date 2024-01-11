import React, { useState } from 'react'
import GoogleMap from '../Card/GoogleMap'

function About() {

  const [ mapLoaded, isMapLoaded ] = useState(false);

  const handleLoad = () => {
    isMapLoaded(true);
  }

  const campus = [
    {
      title: "Jadavpur University, Jadavpur Campus",
      link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.14113989448!2d88.36883737435089!3d22.498887135669857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271237f28abe9%3A0xd047bab0c8bfb11c!2sJadavpur%20University!5e0!3m2!1sen!2sin!4v1704782218697!5m2!1sen!2sin"
    },
    {
      title: "Jadavpur University, Salt Lake Campus",
      link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.48978804809!2d88.41075967435283!3d22.56077763340536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02743203255595%3A0x9c37b30c00660fab!2sJadavpur%20University%2C%20Salt%20Lake%20Campus!5e0!3m2!1sen!2sin!4v1704782364930!5m2!1sen!2sin"
    }
  ];

  return (
    <>
      <div>
        <h1 className='text-4xl font-semibold text-center mt-7 mb-8' >
          About
        </h1>
        <p className='leading-7 text-center mx-6 mb-6'>
          The First Astrophysics Club of Jadavpur University, Kolkata, India, stands as a pioneering community for students passionate about delving into the intricacies of the cosmos. Our club cultivates a dynamic atmosphere through engaging discussions, captivating stargazing events, and collaborative projects. Members actively explore the wonders of astrophysics, enriching their astronomical comprehension and scientific curiosity.

          Welcoming students from all backgrounds, our club provides an inclusive space for both novices and seasoned astrophysics enthusiasts. Through a peer-to-peer learning environment, we encourage collaboration, allowing members to share diverse perspectives and foster a collective passion for the universe.

          Our club hosts a variety of events, including thematic discussions on astrophysical topics, mesmerizing stargazing sessions, and hands-on collaborative projects. The goal is to not only deepen our members' understanding of astrophysics but also provide practical avenues for applying this knowledge to real-world scenarios.

          By participating in our club, students have the opportunity to immerse themselves in the cosmic realm and connect with valuable resources within the astrophysics community. The First Astrophysics Club at Jadavpur University is more than just a club; it's a cosmic journey of exploration and discovery, bringing together like-minded individuals who share a profound curiosity about the mysteries of the universe.
        </p>
        <div className='flex flex-row mt-10 h-screen'>
          {
            campus.map( (element, index) => (
              <div className="flex flex-col mx-auto">
                <h1 key={index} className='text-3xl text-center'>
                  { element.title }
                </h1>
                { !mapLoaded && 
                <div className='mb-10 mt-5 h-3/4 w-4/5 mx-auto bg-gray-500 animate-pulse'></div> }
                <GoogleMap key={index} link={element.link} onLoadHandle={handleLoad}/>
              </div>
            ) )
          }
        </div>
      </div>
    </>
  )
}

export default About