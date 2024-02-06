import React from 'react';
import DOMPurify from 'dompurify';

 function BlogCard({ imgLink, title, para, author, date, time }) {
  return (
    <div 
        className='flex flex-row m-4 cursor-pointer p-4' 
        style={
            { 
                'height': '200px',
                'overflowY': 'hidden'
            }
        }
    >
        <div className='flex flex-col w-3/5'>
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
            <p 
                className='m-3' 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(para) }}
            />
        </div>
        <img 
        src={ imgLink } 
        alt="blog-image" 
        style={{
            "height": "200px"
        }}
        className='m-auto'
        />
    </div>
  )
}

export default BlogCard