import React, { useEffect, useState } from 'react';
import BlogCard from '../Card/BlogCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PreviewBlog from './PreviewBlog';
import { useNavigate } from 'react-router-dom';

function Blogs() {

  const navigate = useNavigate();

  const [ preview, setPreview ] = useState(false);
  const [ selectedBlog, setSelectedBlog ] = useState({});

  const [ blogPresent, setBlogPresent ] = useState( false );
  const [ blogs, setBlogs ] = useState( [] );

  async function fetchData(){
    const res = await axios.get( import.meta.env.VITE_APP_BACKEND_API_GET_ALL_POSTS_END_POINT );
    console.log( res.data.data );
    if( res.data.data.length == 0 ){
      setBlogs( [] );
      setBlogPresent( false );
    } else{
      setBlogs( res.data.data );
      setBlogPresent( true );
    }
  }

  useEffect( () => {
    fetchData();
  }, [] );

  const handlePreview = (blog) => {
    setSelectedBlog(blog);
    setPreview(true);
    navigate(
      `/read-blog`,
      {
        state: blog
      }
    )
  }

  return (
    <div className='flex flex-col'>
      <>
      {
        blogPresent ? ( 
          preview ? <PreviewBlog blogDetails={selectedBlog}/> :
            <>
            {
              blogs.map((blog, index) => (
                <BlogCard
                  onClick={() => handlePreview(blog)}
                  key={index} 
                  imgLink={blog.coverImg} 
                  title={blog.title}
                  para={blog.content}
                  author={blog.owner}
                  date={blog.date}
                  time={blog.time}
                />
                )
              )
            }
            </>
        ) : (
              <div className='w-full h-screen flex'>
                <p className='mx-auto my-auto text-9xl'>
                  No posts found...
                </p>
              </div>
          )
        }
      </>
      { !preview && 
        <div 
          className='flex justify-end sticky w-full bottom-2'
        >
          <Link
            to='/create-new-blog'
          >
            <FontAwesomeIcon 
              icon={ faSquarePlus } 
              className='p-2 w-11 h-11 cursor-pointer'
            />
          </Link>
        </div>
      }
    </div>
  )
}

export default Blogs;