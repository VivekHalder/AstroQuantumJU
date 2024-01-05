import { useEffect } from 'react';
import { RouterProvider, useNavigate, createBrowserRouter } from 'react-router-dom';
import { Layout, Home, Contact, About } from './components/index';

function NavigationHandler(){
  const navigate = useNavigate();
  if(window.location.pathname === '/'){
    useEffect(()=>{
      navigate('/login');
    })
  }
  return null;
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      }
    ]
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;