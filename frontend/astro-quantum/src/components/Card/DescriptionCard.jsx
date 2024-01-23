import React from 'react';

function DescriptionCard( { title, desciption } ) {
  return (
    <div className='my-10'>
        <h1 className='text-center text-4xl mb-5'>
            {title}
        </h1>
        <div className='w-1/2 ml-6'>
          <p className='leading-7'>
              {desciption}
          </p>
        </div>
    </div>
  )
}

export default DescriptionCard;