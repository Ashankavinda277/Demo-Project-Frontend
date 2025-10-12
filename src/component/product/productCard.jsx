import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../css/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setShowSuccess(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // helper to make a URL-friendly slug from product name
  // const makeSlug = (name) =>
  //   name
  //     .toString()
  //     .toLowerCase()
  //     .trim()
  //     .replace(/[\s_]+/g, '-')
  //     .replace(/[^a-z0-9-]/g, '')
  //     .replace(/-+/g, '-')

  // const slug = makeSlug(product.Product_Name || product.name || 'product')

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} state={{ id: product._id }} className="product-card-link">
        <div className="product-image">
          <img 
            src={product.image || '/placeholder.jpg'} 
            alt={product.Product_Name} 
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.Product_Name}</h3>
          <p className="product-category">{product.Product_Type}</p>
          <p className="product-description">{product.Description}</p>
          <p className="product-weight">{product.Weight}kg</p>
        </div>
      </Link>

  <div className="product-footer">
        <p className="product-price">Rs. {product.Price.toFixed(2)}</p>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          {showSuccess ? 'Added! ✓' : 'Add to Cart'}
        </button>
      </div>

      {showSuccess && (
        <div className="success-toast">
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard