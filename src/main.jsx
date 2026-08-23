import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import HomePage from './pages/customer/HomePage.jsx'
import OfferPage from './pages/customer/OfferPage.jsx'
import ProductsPage from './pages/customer/productPage.jsx'
import AboutUs from './pages/customer/aboutUs.jsx'
import ContactUs from './pages/customer/ContactUs.jsx'
import AdminHome from './pages/admin/AdminHome.jsx'
import ManageProduct from './pages/admin/ManageProduct.jsx'
import ManageOffers from './pages/admin/ManageOffers.jsx'
import Order from './pages/admin/Orders.jsx'
import CartPage from './pages/customer/CartPage.jsx'
import ProductDetails from './pages/customer/ProductDetails.jsx'
import OrderSuccessPage from './pages/customer/OrderSuccessPage.jsx'
import OrderPage from './pages/customer/OrderPage.jsx'
import Navbar from './component/common/Navbar/Navbar.jsx'
import Footer from './component/common/Footer/Footer.jsx'
import './index.css'

const NotFoundPage = () => (
  <>
    <Navbar />
    <main className="container" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎂</div>
      <span className="eyebrow">404 Error</span>
      <h1 style={{ marginBottom: '1rem' }}>Page Not Found</h1>
      <p style={{ maxWidth: '480px', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
        The sweet treat or page you were looking for seems to have been whisked away or does not exist.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Return to Home Page
      </Link>
    </main>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/Home',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/Offers',
    element: <OfferPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/offers',
    element: <OfferPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/categories/:type',
    element: <ProductsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/product/:slug',
    element: <ProductDetails />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/order',
    element: <OrderPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/order-success',
    element: <OrderSuccessPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/aboutUs',
    element: <AboutUs />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/ContactUs',
    element: <ContactUs />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/contactUs',
    element: <ContactUs />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/ManageProducts',
    element: <ManageProduct />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/ManageOffers',
    element: <ManageOffers />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/ViewOrders',
    element: <Order />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
