import React from 'react'

function GoogleMap({ link, onLoadHandle }) {

    const handleIframeLoad = () => {
        onLoadHandle();
    }

  return (
    <iframe 
    className='mb-10 mt-5 h-3/4 w-4/5 mx-auto' 
    src={link}
    loading="lazy"
    onLoad={handleIframeLoad}
    ></iframe>
  )
}

export default GoogleMap