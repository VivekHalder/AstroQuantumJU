import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register, Login, Layout, Home, Contact, About, Profile, Blogs, CreateNewBlog, PreviewBlog, MakeAdmin,
Notifications } from './components/index';
import { UserProvider } from './contexts/UserContext';
import toast, { Toaster } from 'react-hot-toast';


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
      },
      {
        path: '/make-admin',
        element: <MakeAdmin/>
      },
      {
        path: '/notifications',
        element: <Notifications/>
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
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
      <Toaster />
    </>
  )
}

export default App;