import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function BlogCard({ onClick, imgLink, title, para, author, date, time }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div>
        <div 
            className='flex flex-row m-4 cursor-pointer p-4' 
            style={
                { 
                    'height': '200px',
                    'overflowY': 'hidden'
                }
            }
            onClick={onClick}
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
        <div className="flex mt-4 ml-8 pl-4">
            <button onClick={handleLike} className="mr-4 text-green-500 focus:outline-none">
                <FontAwesomeIcon icon={faThumbsUp} /> Like ({likes})
            </button>
            <button onClick={handleDislike} className="text-red-500 focus:outline-none">
                <FontAwesomeIcon icon={faThumbsDown} /> Dislike ({dislikes})
            </button>
        </div>
    </div>
  )
}

export default BlogCard;