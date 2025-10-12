import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './pages/customer/HomePage.jsx';
import ProductsPage from './pages/customer/productPage.jsx';

import AboutUs from './pages/customer/aboutUs.jsx';
import ContactUs from './pages/customer/ContactUs.jsx';



const router = createBrowserRouter([
  {
    path: '/Home',
    element: <HomePage />,
    errorElement: <div>Page Not Found</div>,
  },

  {
    path: '/categories/:type',
    element: <ProductsPage />,
  },

   {
    path: '/products',
    element: <ProductsPage />, 
  },

  
  {
    path: '/aboutUs',
    element: <AboutUs/>,
    errorElement: <div>Page Not Found</div>,
  },

  {
    path: '/ContactUs',
    element: <ContactUs/>,
    errorElement: <div>Page Not Found</div>,
  },

]);

  



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
