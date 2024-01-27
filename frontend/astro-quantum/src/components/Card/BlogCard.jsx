import React from 'react'

function BlogCard({ imgLink, title, para, author, date, time }) {
  return (
    <div className='flex flex-row m-4'>
        <div className='flex flex-col'>
            <h1 className='text-5xl m-1'>
                {
                    `${ title }`
                }
            </h1>
            <div className='flex flex-row m-2'>
                <h1 className='pr-4 font-semibold'>
                    {
                        `${ author }`
                    }
                </h1>
                <h1 className='pr-4'>
                    {
                        `${ date }`
                    }
                </h1>
                <h1>
                    {
                        `${ time }`
                    }
                </h1>
            </div>
            <p className='m-3'>
                {
                    `${ para }`
                }
            </p>
        </div>
        <img 
        src={ imgLink } 
        alt="blog-image" 
        className='h-1/6 w-1/6'
        />
    </div>
  )
}

export default BlogCard