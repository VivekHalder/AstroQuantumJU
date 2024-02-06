import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function PreviewBlog() {

  const [ goBack, setGoBack ] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const blogDetails = location.state;

  if( goBack ){
    navigate("/blogs");
  }

  return (
    <>
      <div className='flex justify-end m-5'>
        <FontAwesomeIcon 
          onClick={() => {
              setGoBack(true)
            }
          }
          className='cursor-pointer h-10'
          icon={faSquareXmark} 
        />
      </div>
      <div className='h-full flex flex-col'>
        <header className='text-center p-4 text-6xl'>
          {
            blogDetails.title
          }
        </header>
        <div className='flex justify-end space-x-9 pt-4 pr-2'>
          <span>
            Created By:&ensp;
            {
              blogDetails.owner
            }
          </span>
          <span>
            Posted on:&ensp;
            {
              blogDetails.date
            }
          </span>
          <span>
            At:&ensp;
            {
              blogDetails.time
            }
          </span>
        </div>
        <img 
          className="p-4 h-auto w-auto mx-auto"
          src={ blogDetails.coverImg } 
          alt="Blog Cover Image" 
        />
        <div>
          <p
            className='p-4'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${blogDetails.content}`) }} 
          />
        </div>
      </div>
    </>
  );
}

export default PreviewBlog