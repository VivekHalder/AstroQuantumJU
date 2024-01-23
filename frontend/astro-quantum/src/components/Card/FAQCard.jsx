import React, { useState } from 'react';
import './FAQCard.css'

function FAQCard( { question, answer } ) {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleAnswer = () => {
        setIsOpen( ( prev ) => ( !prev ) )
    }
  return (
    <div className='ml-6 mb-3'>
        <div className=''>
            <h1 className='inline font-semibold text-2xl'>
                { question }
            </h1>
            <span className={`absolute right-4 cursor-pointer arrow-icon ${ isOpen ? 'rotate-up' : 'rotate-down' }`} onClick={ toggleAnswer } >
                ▲
            </span>
        </div>
        <div className={`ml-7 mb-4 mt-3 answer-container ${ isOpen ? 'open' : '' }`}>
            { 
                isOpen && <p>{ answer }</p> 

            }
        </div>
    </div>
  )
}

export default FAQCard;