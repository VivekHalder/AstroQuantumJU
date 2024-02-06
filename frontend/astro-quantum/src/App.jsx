import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register, Login, Layout, Home, Contact, About, Profile, Blogs, CreateNewBlog, PreviewBlog } from './components/index';


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
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/blogs',
        element: <Blogs/>
      },
      {
        path: '/create-new-blog',
        element: <CreateNewBlog/>
      },
      {
        path: '/read-blog',
        element: <PreviewBlog/>
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