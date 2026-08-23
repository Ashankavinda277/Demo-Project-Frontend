import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaCheck, FaWeightHanging } from 'react-icons/fa';
import '../../css/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setShowSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const formatCategory = (cat) => {
    if (!cat) return 'Signature Cake';
    return cat
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const formattedPrice = typeof product.Price === 'number' 
    ? product.Price.toFixed(2) 
    : parseFloat(product.Price || 0).toFixed(2);

  return (
    <div className="product-card">
      <Link 
        to={`/product/${product._id}`} 
        state={{ id: product._id }} 
        className="product-card-link"
        aria-label={`View details of ${product.Product_Name}`}
      >
        <div className="product-image-container">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'} 
            alt={product.Product_Name || 'Artisanal Cake'} 
            className="product-img"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';
              e.target.onerror = null;
            }}
          />
          <div className="product-type-badge">
            {formatCategory(product.Product_Type)}
          </div>
          {product.Weight && (
            <div className="product-weight-tag">
              <FaWeightHanging className="weight-icon" />
              <span>{product.Weight} kg</span>
            </div>
          )}
        </div>
        
        <div className="product-card-body">
          <h3 className="product-title">{product.Product_Name}</h3>
          <p className="product-description">
            {product.Description 
              ? (product.Description.length > 70 ? product.Description.slice(0, 70) + '...' : product.Description)
              : 'Handcrafted with fine ingredients and layered to delicious perfection.'}
          </p>
        </div>
      </Link>

      <div className="product-card-footer">
        <div className="price-stack">
          <span className="price-label">Price</span>
          <span className="product-price">Rs. {formattedPrice}</span>
        </div>

        <button 
          className={`add-to-cart-btn ${showSuccess ? 'added' : ''}`}
          onClick={handleAddToCart}
          aria-label={`Add ${product.Product_Name} to cart`}
        >
          {showSuccess ? (
            <>
              <FaCheck />
              <span>Added!</span>
            </>
          ) : (
            <>
              <FaShoppingCart />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>

      {showSuccess && (
        <div className="card-toast" role="status">
          ✓ Added to bag!
        </div>
      )}
    </div>
  );
};

export default ProductCard;