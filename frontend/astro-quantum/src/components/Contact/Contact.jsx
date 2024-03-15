import React from 'react'

const professors = [
  { name: 'Prof. John Doe', dept: 'Astrophysics Professor', image: '/images/professor1.jpg' },
  { name: 'Prof. Jane Smith', dept: 'Cosmology Professor', image: '/images/professor2.jpg' },
];

function Contact() {
  return (
    <div className='bg-black h-full text-white'>
      <h1 className='text-5xl font-bold text-center mb-8'>Connect with Us: Reach Out to Our Stellar Team</h1>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>Professors</h2>
            <div className='flex flex-row'>
              {
                professors.map((prof, index) => {
                  return (
                    <div key={index} className='mb-4 mx-4'>
                      <img src={prof.image} alt={prof.name} className='w-full h-auto mb-2 rounded-md' />
                      <p className='text-lg font-medium'>{prof.name}</p>
                      <p className='text-lg fon-medium'>{prof.dept}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;