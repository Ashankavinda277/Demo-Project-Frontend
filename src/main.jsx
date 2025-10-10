import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import ImagesSlider from './component/ImagesSlider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ImagesSlider />,
    errorElement: <div>Page Not Found</div>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
