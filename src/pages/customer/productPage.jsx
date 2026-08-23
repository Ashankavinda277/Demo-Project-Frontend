import React, { useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import useProducts from '../../hooks/useProduct.js';
import ProductCard from '../../component/product/productCard.jsx';
import Navbar from '../../component/common/Navbar/Navbar.jsx';
import Footer from '../../component/common/Footer/Footer.jsx';
import { FaFilter, FaSearch, FaExclamationCircle } from 'react-icons/fa';
import '../../css/pages/productPage.css';

const CATEGORIES = [
  { slug: '', label: 'All Delights' },
  { slug: 'birthday-cakes', label: 'Birthday Cakes' },
  { slug: 'wedding-cakes', label: 'Wedding Cakes' },
  { slug: 'chocolate-cakes', label: 'Chocolate Cakes' },
  { slug: 'signature-gateau-cakes', label: 'Signature Gateaux' },
  { slug: 'muffins', label: 'Muffins' },
  { slug: 'others', label: 'Cupcakes & Others' },
];

const ProductsPage = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(urlSearch);

  const { products, loading, error } = useProducts(type);

  const formatCategoryName = (categoryType) => {
    if (!categoryType) return 'Our Complete Cake & Patisserie Collection';
    return categoryType
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter products based on search term if present
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter((product) => {
    if (!localSearch.trim()) return true;
    const query = localSearch.toLowerCase();
    const name = (product.Product_Name || product.name || '').toLowerCase();
    const desc = (product.Description || '').toLowerCase();
    const pType = (product.Product_Type || '').toLowerCase();
    return name.includes(query) || desc.includes(query) || pType.includes(query);
  });

  return (
    <>
      <Navbar />
      <main className="products-page">
        {/* Page Banner Header */}
        <section className="products-hero-banner">
          <div className="container">
            <span className="eyebrow">Artisanal Bakery</span>
            <h1 className="products-page-title">{formatCategoryName(type)}</h1>
            <p className="products-hero-subtitle">
              Every creation is baked to perfection using premium Belgian chocolate, farm dairy, and master craftsmanship.
            </p>
          </div>
        </section>

        {/* Filter & Category Pills */}
        <section className="products-nav-section">
          <div className="container">
            <div className="products-toolbar">
              {/* Category Pills */}
              <div className="category-pills-scroll" role="tablist">
                {CATEGORIES.map((cat) => {
                  const isActive = (!type && cat.slug === '') || type === cat.slug;
                  return (
                    <Link
                      key={cat.slug}
                      to={cat.slug ? `/categories/${cat.slug}` : '/products'}
                      className={`category-pill ${isActive ? 'active' : ''}`}
                    >
                      {cat.label}
                    </Link>
                  );
                })}
              </div>

              {/* Local Search within Category */}
              <div className="products-search-box">
                <FaSearch className="search-box-icon" />
                <input
                  type="text"
                  placeholder="Filter by flavor or name..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  aria-label="Filter cakes in category"
                />
                {localSearch && (
                  <button className="clear-search-btn" onClick={() => setLocalSearch('')}>
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="container products-content-area">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Preparing our fresh cake collection...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <FaExclamationCircle className="error-icon" />
              <h2>Unable to Load Products</h2>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-products-state">
              <div className="empty-state-icon">🎂</div>
              <h2>No Cakes Found</h2>
              <p>
                {localSearch
                  ? `No treats found matching "${localSearch}". Try clearing your search.`
                  : 'We are currently baking fresh items for this collection. Please check back shortly!'}
              </p>
              {localSearch ? (
                <button className="btn btn-secondary" onClick={() => setLocalSearch('')}>
                  Clear Filter
                </button>
              ) : (
                <Link to="/products" className="btn btn-primary">
                  View All Products
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="results-count-bar">
                <span>Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'creation' : 'creations'}</span>
              </div>
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;