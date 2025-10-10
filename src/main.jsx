import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CategoryGrid from './pages/categorygrid.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryGrid />
  </StrictMode>,
)
