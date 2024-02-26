import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DescriptionCard from '../Card/DescriptionCard';
import FAQCard from '../Card/FAQCard';

function Home() {

  const desc = [
    {
      title: "Foster a Passion for Astrophysics",
      description: "Our primary goal is to ignite and nurture a deep-seated passion for astrophysics among our members. Through engaging discussions, hands-on activities, and shared experiences, we aim to cultivate a love for the wonders of the universe."
    },
    {
      title: "Create a Collaborative Learning Environment",
      description: "We aspire to establish a space where students can collaborate, share ideas, and learn together. By organizing workshops, lectures, and group projects, we intend to foster a supportive community that encourages the exchange of knowledge and diverse perspectives."
    },
    {
      title: "Promote STEM Education and Outreach",
      description: "The club is committed to promoting science, technology, engineering, and mathematics (STEM) education. Through outreach programs, school visits, and interactive sessions, we aim to inspire the next generation of scientists and make astrophysics accessible to a wider audience."
    },
    {
      title: "Connect with the Larger Astrophysics Community",
      description: "The club aims to establish connections with professionals, researchers, and institutions in the astrophysics community. Through guest lectures, collaborative projects, and networking events, we hope to provide our members with valuable insights and opportunities within the broader astrophysical landscape."
    }
  ];

  const faq = [
    {
      question: "What qualifications do I need to join the Astrophysics Club?",
      answer: "No specific qualifications are required! The club is open to all university students passionate about astrophysics, regardless of their academic background. Whether you're a seasoned astrophysics enthusiast or a beginner with a curiosity for the cosmos, you're welcome to join and explore the wonders of the universe with us."
    },
    {
      question: "How often does the Astrophysics Club meet, and what activities can I expect?",
      answer: "The club meets regularly, typically once or twice a month. Activities include engaging discussions on various astrophysical topics, hands-on workshops, stargazing sessions, and collaborative projects. We aim to provide a diverse range of activities to cater to different interests within the field of astrophysics."
    },
    {
      question: "Can I join if I don't have any prior knowledge of astrophysics?",
      answer: "Absolutely! The club is designed for individuals at all levels of familiarity with astrophysics. Our goal is to foster a learning environment where members can share their knowledge and experiences. Beginners are encouraged to join, ask questions, and embark on a journey of discovery alongside more experienced members."
    },
    {
      question: "How can I get involved in research projects within the Astrophysics Club?",
      answer: "Getting involved in research projects is encouraged! We regularly announce opportunities for members to join ongoing projects or propose their own ideas. Workshops and training sessions are also organized to equip members with the necessary skills for research endeavors, ensuring everyone has a chance to contribute."
    },
    {
      question: "Is the Astrophysics Club only for astrophysics majors, or can students from other disciplines join?",
      answer: "The club is open to students from all disciplines! While astrophysics majors may find the discussions aligned with their academic interests, we welcome diverse perspectives. Interdisciplinary collaboration is encouraged, as astrophysics encompasses aspects of physics, mathematics, computer science, and more. Join us to explore the cosmic wonders regardless of your major!"
    }
  ];

  const navigate = useNavigate();
  const checkLogin = async () => { 
    try {
      const res = await axios.post( import.meta.env.VITE_APP_BACKEND_API_GET_CURRENT_USER_END_POINT, { withCredentials: true } );
      //console.log(res.status);
      if(res){
        //console.log(res);
        //navigate('/');
      } else{
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };


  useEffect( () => {
    checkLogin();
  }, [] );

  
  return (
    <>
      <div className='h-full'>
        <div className='mt-10 ml-6 w-1/2'>
          <h1 className='mb-4 text-6xl font-semibold'>
            Jadavpur University
          </h1>
          <h2 className='text-5xl my-6'>
            AstroPhysics Club
          </h2>
          <div>
            <p className='mt-6 leading-7'>
              The First Astro Physics Club of Jadavpur University, Kolkata, India. The Astro Physics Club at Jadavpur University fosters a dynamic community of passionate students exploring the mysteries of the cosmos. Through discussions, stargazing events, and collaborative projects, members delve into the wonders of astro-physics, enhancing their astronomical understanding and scientific curiosity.
            </p>
          </div>
        </div>
        <div>
          <h1 className='h-100 w-full text-center text-6xl mt-10 mb-20'>
            What Do We Aim For?
          </h1>
            {
              desc.map( ( element ) => {
                return <DescriptionCard key={element.title} title={element.title} desciption={element.description}/>
              } )
            }
        </div>
        <div>
            <h1 className='text-4xl ml-6 mt-4 mb-10'>
              FAQs 
            </h1>
            <div className='mb-8'>
              {
                faq.map( ( element ) => (
                  <FAQCard key={element.question} question={element.question} answer={element.answer} />
                ) )
              }
            </div>
        </div>
      </div>
    </>
  )
}

export default Home