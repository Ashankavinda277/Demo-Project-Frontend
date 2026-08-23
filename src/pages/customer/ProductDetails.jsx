import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/common/Navbar/Navbar.jsx';
import Footer from '../../component/common/Footer/Footer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaBolt, 
  FaCheck, 
  FaWeightHanging, 
  FaShieldAlt, 
  FaTruck, 
  FaHeart 
} from 'react-icons/fa';
import '../../css/pages/ProductDetails.css';

const URL = 'http://localhost:5000';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [Id] = useState(slug);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/api/product/get/${Id}`);
        if (response.data && response.data.data) {
          setProduct(response.data.data);
        } else if (response.data) {
          setProduct(response.data);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Could not load cake details. Please check if backend is running.');
      } finally {
        setLoading(false);
      }
    };

    if (Id) {
      fetchProductData();
    }
  }, [Id]);

  const handleAddBag = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleOrderNow = () => {
    if (!product) return;
    navigate('/order', { state: { product, quantity } });
  };

  const formatCategory = (cat) => {
    if (!cat) return 'Artisanal Creation';
    return cat
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <>
      <Navbar />
      <main className="product-details-page">
        <div className="container">
          {/* Breadcrumb & Back Action */}
          <div className="product-details-nav">
            <button className="back-link-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              <span>Back to Menu</span>
            </button>
            <div className="breadcrumb-trail">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/products">Cakes</Link>
              <span>/</span>
              <span className="current-page">{product?.Product_Name || 'Details'}</span>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Fetching cake recipe & details...</p>
            </div>
          ) : error || !product ? (
            <div className="error-container">
              <h2>Product Not Found</h2>
              <p>{error || 'The requested cake could not be located.'}</p>
              <button className="btn btn-primary" onClick={() => navigate('/products')}>
                Explore Other Cakes
              </button>
            </div>
          ) : (
            <div className="product-showcase-grid">
              {/* Left Column: Image Frame */}
              <div className="showcase-visual-col">
                <div className="showcase-image-frame">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'}
                    alt={product.Product_Name || 'Cake'}
                    className="showcase-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
                      e.target.onerror = null;
                    }}
                  />
                  <div className="showcase-type-pill">
                    {formatCategory(product.Product_Type)}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="showcase-trust-bar">
                  <div className="trust-item">
                    <FaShieldAlt className="trust-icon" />
                    <span>Hygienic Preparation</span>
                  </div>
                  <div className="trust-item">
                    <FaTruck className="trust-icon" />
                    <span>Safe Delivery</span>
                  </div>
                  <div className="trust-item">
                    <FaHeart className="trust-icon" />
                    <span>Fresh Ingredients</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Information & Actions */}
              <div className="showcase-details-col">
                <div className="showcase-header">
                  <span className="eyebrow">{formatCategory(product.Product_Type)}</span>
                  <h1 className="showcase-title">{product.Product_Name}</h1>
                  <div className="showcase-meta-row">
                    {product.Weight && (
                      <div className="meta-pill">
                        <FaWeightHanging className="meta-icon" />
                        <span>Weight: {product.Weight} kg</span>
                      </div>
                    )}
                    <div className="meta-pill status-pill">
                      <span className="status-dot"></span>
                      <span>{product.status === 'active' || !product.status ? 'Freshly Baked to Order' : 'Pre-order Available'}</span>
                    </div>
                  </div>
                </div>

                <div className="showcase-price-box">
                  <span className="price-tag-label">Price per cake</span>
                  <div className="price-tag-amount">
                    Rs. {product.Price ? Number(product.Price).toFixed(2) : 'N/A'}
                  </div>
                </div>

                <div className="showcase-section">
                  <h3 className="section-subtitle">Flavor & Description</h3>
                  <p className="showcase-desc-text">
                    {product.Description || 'A handcrafted masterpiece made with the highest quality ingredients, layered with delicate textures and rich aroma. Perfect for birthdays, anniversaries, or an indulgent afternoon tea.'}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="showcase-quantity-section">
                  <label className="quantity-label">Select Quantity</label>
                  <div className="qty-stepper">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="showcase-action-group">
                  <button className="btn btn-primary btn-lg showcase-order-btn" onClick={handleOrderNow}>
                    <FaBolt />
                    <span>Order Now</span>
                  </button>

                  <button 
                    className={`btn btn-secondary btn-lg showcase-bag-btn ${addedToast ? 'added' : ''}`}
                    onClick={handleAddBag}
                  >
                    {addedToast ? <FaCheck /> : <FaShoppingCart />}
                    <span>{addedToast ? 'Added to Bag!' : 'Add to Bag'}</span>
                  </button>
                </div>

                {/* Total Preview */}
                <div className="order-subtotal-preview">
                  <span>Order Total ({quantity} {quantity === 1 ? 'item' : 'items'}):</span>
                  <strong>Rs. {(Number(product.Price || 0) * quantity).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
