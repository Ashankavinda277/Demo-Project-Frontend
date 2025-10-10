import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Offers from './pages/Offers';



const router = createBrowserRouter([
  {
    path: '/offers',
    element: <Offers/>,
    errorElement: <div>Page Not Found</div>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
