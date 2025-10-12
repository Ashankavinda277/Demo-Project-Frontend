import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/productCard.css'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image">
        <img src={product.image || '/placeholder.jpg'} alt={product.Product_Name} />
      </div>
      <div className="product-info">
        <h3>{product.Product_Name}</h3>
        <p className="product-type">{product.Product_Type}</p>
        <p className="product-description">{product.Description}</p>
        <div className="product-details">
          <span className="product-weight">{product.Weight}kg</span>
          <span className="product-price">Rs. {Number(product.Price).toFixed(2)}</span>
        </div>
        <button className="view-details-btn" type="button">Order Now</button>
      </div>
    </Link>
  )
}

export default ProductCard