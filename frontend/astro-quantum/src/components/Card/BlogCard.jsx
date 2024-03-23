import React, { useCallback, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function BlogCard({ onClick, id, imgLink, title, para, author, date, time }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const hasReacted = useCallback(async () => {
    try {
      const res = await axios.get( `${import.meta.env.VITE_APP_BACKEND_API_HAS_REACTED}?blogId=${id}`, { withCredentials: true } );
      if(res.data.data === -1){
        console.log("entered")
        setDisliked(true);
        setLiked(false);
      }
  
      else if(res.data.data === 1){
        setDisliked(false);
        setLiked(true);
      }
  
      else if(res.data.data === 0){
        setDisliked(false);
        setLiked(false);
      }
    } catch (error) {
      console.log(`Error occured. Error: ${error}.`);
    }
  }, [liked, disliked, likes, dislikes]);

  const getLikesCount = useCallback(async () => {
    try {
      const res = await axios.get( `${import.meta.env.VITE_APP_BACKEND_API_LIKE_COUNT}?blogId=${id}` );
      setLikes(res.data.data);
    } catch (error) {
      console.log(`Error occured. Error: ${error.message}`);
    }
  }, [liked, disliked, likes, dislikes]);

  const getDislikesCount = useCallback(async () => {
    try {
      const res = await axios.get( `${import.meta.env.VITE_APP_BACKEND_API_DISLIKE_COUNT}?blogId=${id}` ); 
      setDislikes(res.data.data);
    } catch (error) {
      console.log(`Error occured. Error: ${error.message}`)
    }
  }, [liked, disliked, likes, dislikes]);

  useEffect(() => {
    hasReacted();
    getLikesCount();
    getDislikesCount();
  }, [liked, disliked, likes, dislikes]);

  const handleLike = async () => {
    if (!liked) {
      const res = await axios.post(import.meta.env.VITE_APP_BACKEND_API_LIKE_BLOG, { blogId: id }, { withCredentials: true });
      if (res.status === 200) {
        setLiked(true);
        if (disliked) {
          setDisliked(false);
        }
      }
    }
  };

  const handleDislike = async () => {
    if (!disliked) {
        const res = await axios.post(import.meta.env.VITE_APP_BACKEND_API_DISLIKE_BLOG, { blogId: id }, { withCredentials: true });
        if(res.status === 200){
            setDisliked(true);
            if(liked){
                setLiked(false);
            }
        }
    }
  };

  return (
    <div>
      <div
        className='flex flex-row m-4 cursor-pointer p-4'
        style={{ 'height': '200px', 'overflowY': 'hidden' }}
        onClick={onClick}
      >
        <div className='flex flex-col w-3/5'>
          <h1 className='text-5xl m-1'>{title}</h1>
          <div className='flex flex-row m-2'>
            <h1 className='pr-4 font-semibold'>{author}</h1>
            <h1 className='pr-4'>{date}</h1>
            <h1>{time}</h1>
          </div>
          <p className='m-3' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(para) }} />
        </div>
        <img
          src={imgLink}
          alt="blog-image"
          style={{ "height": "200px" }}
          className='m-auto'
        />
      </div>
      <div className="flex mt-4 ml-8 pl-4">
        <button onClick={handleLike} className={`mr-4 focus:outline-none ${liked ? 'text-green-500' : 'text-gray-500'}`}>
          <FontAwesomeIcon icon={faThumbsUp} /> Like ({likes})
        </button>
        <button onClick={handleDislike} className={`focus:outline-none ${disliked ? 'text-red-500' : 'text-gray-500'}`}>
          <FontAwesomeIcon icon={faThumbsDown} /> Dislike ({dislikes})
        </button>
      </div>
    </div>
  )
}

export default BlogCard;