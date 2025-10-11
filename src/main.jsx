import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './pages/customer/HomePage.jsx';


const router = createBrowserRouter([
  {
    path: '/Home',
    element: <HomePage />,
    errorElement: <div>Page Not Found</div>,
  },
  

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
