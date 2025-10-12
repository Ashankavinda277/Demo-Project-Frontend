import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/customer/HomePage.jsx'
import ProductsPage from './pages/customer/productPage.jsx'
import AboutUs from './pages/customer/aboutUs.jsx'
import ProductDetails from './pages/customer/ProductDetails.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Page Not Found</div>,
  },
  {
    path: '/Home',
    element: <HomePage />,
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
    path: '/product/:id',
    element: <ProductDetails />,
  },
  {
    path: '/aboutUs',
    element: <AboutUs />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
