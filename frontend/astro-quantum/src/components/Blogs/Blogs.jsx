import React from 'react';
import BlogCard from '../Card/BlogCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Blogs() {
  return (
    <div className='flex flex-col'>
      <>
        <BlogCard 
          imgLink={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzEI-0DaKwl8qER5Vp7TeQ.png"} 
          title={ "Back-End & Web Development Trends For 2024" } 
          para={ "By Mary Moore, copywriter at Shakuro The ever-shifting landscape of digital innovation can feel like a relentless race, a whirlwind of challenges and opportunities." }
          author="Vivek Halder"
          date="24-01-2024"
          time="18:49"
        />
        <BlogCard 
          imgLink={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzEI-0DaKwl8qER5Vp7TeQ.png"} 
          title={ "Back-End & Web Development Trends For 2024" } 
          para={ "By Mary Moore, copywriter at Shakuro The ever-shifting landscape of digital innovation can feel like a relentless race, a whirlwind of challenges and opportunities." }
          author="Vivek Halder"
          date="24-01-2024"
          time="18:49"
        />
        <BlogCard 
          imgLink={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzEI-0DaKwl8qER5Vp7TeQ.png"} 
          title={ "Back-End & Web Development Trends For 2024" } 
          para={ "By Mary Moore, copywriter at Shakuro The ever-shifting landscape of digital innovation can feel like a relentless race, a whirlwind of challenges and opportunities." }
          author="Vivek Halder"
          date="24-01-2024"
          time="18:49"
        />
        <BlogCard 
          imgLink={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzEI-0DaKwl8qER5Vp7TeQ.png"} 
          title={ "Back-End & Web Development Trends For 2024" } 
          para={ "By Mary Moore, copywriter at Shakuro The ever-shifting landscape of digital innovation can feel like a relentless race, a whirlwind of challenges and opportunities." }
          author="Vivek Halder"
          date="24-01-2024"
          time="18:49"
        />
        <BlogCard 
          imgLink={"https://miro.medium.com/v2/resize:fit:720/format:webp/1*DzEI-0DaKwl8qER5Vp7TeQ.png"} 
          title={ "Back-End & Web Development Trends For 2024" } 
          para={ "By Mary Moore, copywriter at Shakuro The ever-shifting landscape of digital innovation can feel like a relentless race, a whirlwind of challenges and opportunities." }
          author="Vivek Halder"
          date="24-01-2024"
          time="18:49"
        />
      </>
      <div className='flex justify-end sticky w-full bottom-2'>
        <Link
          to='/create-new-blog'
        >
          <FontAwesomeIcon 
            icon={ faSquarePlus } 
            className='p-2 w-11 h-11 cursor-pointer'
          />
        </Link>
      </div>
    </div>
  )
}

export default Blogs;