import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './component/common/Navbar/Navbar.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <div>Page Not Found</div>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
