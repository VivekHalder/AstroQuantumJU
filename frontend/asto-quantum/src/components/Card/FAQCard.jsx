import React, { useState } from 'react'

function FAQCard( { question, answer } ) {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleAnswer = () => {
        setIsOpen( ( prev ) => ( !prev ) )
    }
  return (
    <div className='ml-6 mb-3'>
        <div>
            <h1 className='inline font-semibold text-2xl'>
                { question }
            </h1>
            <span onClick={ toggleAnswer } >
                { isOpen ? '▲' : '▼' }
            </span>
        </div>
        <div className='ml-7 mb-4 mt-3'>
            { 
                isOpen && <p>{ answer }</p> 

            }
        </div>
    </div>
  )
}

export default FAQCard;