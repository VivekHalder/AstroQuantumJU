import React from 'react'

const professors = [
  { name: 'Prof. John Doe', dept: 'Astrophysics Professor', image: '/images/professor1.jpg' },
  { name: 'Prof. Jane Smith', dept: 'Cosmology Professor', image: '/images/professor2.jpg' },
];

const coreTeam = [
  { name: 'John Smith', dept: 'Project Manager', image: '/images/core_team_member1.jpg' },
  { name: 'Jane Doe', dept: 'Lead Developer', image: '/images/core_team_member2.jpg' },
];

const coreDevTeam = [
  { name: 'Alex Johnson', role: 'Senior Developer', image: '/images/core_dev_team_member1.jpg' },
  { name: 'Emily Brown', role: 'Junior Developer', image: '/images/core_dev_team_member2.jpg' },
];

function Contact() {
  return (
    <div className='bg-black h-full text-white'>
      <h1 className='text-5xl font-bold text-center mb-8'>Connect with Us: Reach Out to Our Stellar Team</h1>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-8'>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>Professors</h2>
            <div className='flex flex-row'>
              {professors.map((prof, index) => (
                <div key={index} className='mb-4 mx-4'>
                  <img src={prof.image} alt={prof.name} className='w-full h-auto mb-2 rounded-md' />
                  <p className='text-lg font-medium'>{prof.name}</p>
                  <p className='text-lg fon-medium'>{prof.dept}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>Core Team</h2>
            <div className='flex flex-row'>
              {coreTeam.map((member, index) => (
                <div key={index} className='mb-4 mx-4'>
                  <img src={member.image} alt={member.name} className='w-full h-auto mb-2 rounded-md' />
                  <p className='text-lg font-medium'>{member.name}</p>
                  <p className='text-lg fon-medium'>{member.dept}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>Core Dev Team</h2>
            <div className='flex flex-row'>
              {coreDevTeam.map((member, index) => (
                <div key={index} className='mb-4 mx-4'>
                  <img src={member.image} alt={member.name} className='w-full h-auto mb-2 rounded-md' />
                  <p className='text-lg font-medium'>{member.name}</p>
                  <p className='text-lg fon-medium'>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;