import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register, Login, Layout, Home, Contact, About } from './components/index';


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
    ],
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
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