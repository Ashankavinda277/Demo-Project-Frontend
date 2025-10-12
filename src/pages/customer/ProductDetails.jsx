import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../component/common/Navbar/Navbar.jsx';
import Footer from '../../component/common/Footer/Footer.jsx';
import productService from '../../services/productAPI.js';
import '../../css/pages/productPage.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService.getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="no-products">
          <p>Product not found.</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-details-page container">
        <div className="product-details-card">
          <div className="product-image">
            <img src={product.image || '/placeholder.jpg'} alt={product.Product_Name} />
          </div>
          <div className="product-info">
            <h2>{product.Product_Name}</h2>
            <p className="product-type">{product.Product_Type}</p>
            <p className="product-description">{product.Description}</p>
            <div className="product-meta">
              <span>Weight: {product.Weight}kg</span>
              <span>Price: Rs. {Number(product.Price).toFixed(2)}</span>
            </div>
            <div className="product-actions">
              <button onClick={() => alert('Order flow not implemented')}>Order Now</button>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
