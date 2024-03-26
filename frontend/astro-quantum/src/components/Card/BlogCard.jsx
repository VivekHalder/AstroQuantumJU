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
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API_HAS_REACTED}?blogId=${id}`, { withCredentials: true });
      const reaction = res.data.data;

      // Set liked and disliked based on reaction data
      if (reaction === -1) {
        setDisliked(true);
        setLiked(false);
      } else if (reaction === 1) {
        setDisliked(false);
        setLiked(true);
      } else {
        setDisliked(false);
        setLiked(false);
      }
    } catch (error) {
      console.log(`Error occurred while checking reaction: ${error.message}`);
    }
  }, [id]);

  const getLikesCount = useCallback(async () => {
    try {
      console.log(`likes   ${import.meta.env.VITE_APP_BACKEND_API_LIKE_COUNT}?blogId=${id}`);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API_LIKE_COUNT}?blogId=${id}`);
      return res.data.data;
    } catch (error) {
      console.log(`Error fetching likes count: ${error.message}`);
      return 0;
    }
  }, [id]);

  const getDislikesCount = useCallback(async () => {
    try {
      console.log(`dislikes ${import.meta.env.VITE_APP_BACKEND_API_LIKE_COUNT}?blogId=${id}`);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API_DISLIKE_COUNT}?blogId=${id}`);
      return res.data.data;
    } catch (error) {
      console.log(`Error fetching dislikes count: ${error.message}`);
      return 0;
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [likesCount, dislikesCount] = await Promise.all([
          getLikesCount(),
          getDislikesCount()
        ]);
        setLikes(likesCount);
        setDislikes(dislikesCount);
        hasReacted();
      } catch (error) {
        console.log(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, [id, getLikesCount, getDislikesCount, hasReacted]);

  const handleLike = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_APP_BACKEND_API_LIKE_BLOG, { blogId: id }, { withCredentials: true });
      if (res.status === 200) {
        setLiked(true);
        if (disliked) {
          setDisliked(false);
          setDislikes(prev => prev - 1);
        }
        setLikes(prev => prev + 1);
      }
    } catch (error) {
      console.log(`Error liking blog: ${error.message}`);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_APP_BACKEND_API_DISLIKE_BLOG, { blogId: id }, { withCredentials: true });
      if (res.status === 200) {
        setDisliked(true);
        if (liked) {
          setLiked(false);
          setLikes(prev => prev - 1);
        }
        setDislikes(prev => prev + 1);
      }
    } catch (error) {
      console.log(`Error disliking blog: ${error.message}`);
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
  );
}

export default BlogCard;