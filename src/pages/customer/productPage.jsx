import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProduct.js';
import ProductCard from '../../component/product/productCard.jsx';
import Navbar from '../../component/common/Navbar/Navbar.jsx';
import Footer from '../../component/common/Footer/Footer.jsx';
import '../../css/pages/productPage.css';

const ProductsPage = () => {
  const { type } = useParams();
  const { products, loading, error } = useProducts(type);

  console.log('ProductsPage - type:', type, 'products:', products, 'loading:', loading, 'error:', error);

  const formatCategoryName = (categoryType) => {
    if (!categoryType) return 'All Products';
    return categoryType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
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
          <h2>Error Loading Products</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
        <Footer />
      </>
    );
  }

  // Safety check: ensure products is an array
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <>
      <Navbar />
      <div className="products-page">
        <div className="container">
          <h1 className="page-title">{formatCategoryName(type)}</h1>
          
          {safeProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found in this category.</p>
              <p>Category: {type || 'All'}</p>
            </div>
          ) : (
            <div className="products-grid">
              {safeProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;