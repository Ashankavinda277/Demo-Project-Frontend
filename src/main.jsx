import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './pages/customer/HomePage.jsx';
import ProductsPage from './pages/customer/productPage.jsx';



const router = createBrowserRouter([
    {
    path: '/',
    element: <HomePage />,
  },

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
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
