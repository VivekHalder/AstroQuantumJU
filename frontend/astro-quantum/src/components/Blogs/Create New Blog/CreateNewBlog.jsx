import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function CreateNewBlog() {

    const [ content, setContent ] = useState( <></> );
    const [ coverImg, setCoverImg ] = useState( "" );
    const [ title, setTitle ] = useState( "" );
    const [ isSubmiting, setIsSubmitting ] = useState(false);

    const quillRef = useRef( null );

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
    ];

    const modules = {
        toolbar: toolbarOptions
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append( 'title', title );
        formData.append( 'coverImg', coverImg );
        formData.append( 'content', content );

        console.log( `The formData is: ${formData}` );

        try{
            const res = await axios.post( import.meta.env.VITE_APP_BACKEND_API_CREATE_BLOG_END_POINT, formData, { withCredentials: true } );

            if( !!res ){
                setTitle("");
                setContent("");
                setCoverImg("");
            } else {
                console.log( "Couldnot post the blog." );
            }
        } catch( error ){
            console.log(`Error occured while posting the blog. Error: ${error.message}`);
        } finally{
            setIsSubmitting(false);
        }
    }

    const handleChange = (content, delta, source, editor) => {
        setContent( content );
    };

  return (
    <>
        <form 
            name='blog form'
            encType='multipart/form-data'
            className='flex flex-col w-auto ml-5 p-5'
        >
            <input 
                type="text"
                name='title'
                value={ title }
                onChange={ ( e ) => setTitle( e.target.value ) }
                autoComplete='off'
                placeholder='Title'
                className='w-4/5 ml-5 h-8 p-2' 
            />
            <input 
                type="file"
                name='coverImg'
                onChange={ ( e ) => setCoverImg( e.target.files[0] ) }
                className='ml-2 p-2' 
            />
            <ReactQuill
                name='content'
                modules={modules}
                ref={quillRef}
                theme='snow'
                value={ content }
                onChange={ handleChange }
            />
            <button 
                type='submit' 
                onClick={ handleSubmit }
                className={`p-4 text-white bg-orange-500 ${isSubmiting ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ alignSelf: "center" }}
                disabled={isSubmiting}
            >
                { isSubmiting ? 'Submitting' : 'Submit' }
            </button>
        </form>
    </>
  )
}

export default CreateNewBlog