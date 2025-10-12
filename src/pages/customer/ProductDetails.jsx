import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../../css/pages/ProductDetails.css'
import axios from 'axios'
import Navbar from '../../component/common/Navbar/Navbar.jsx';
import Footer from '../../component/common/Footer/Footer.jsx';

const URL = 'http://localhost:5000'

const ProductDetails = () => {

  const { slug } = useParams()

  const navigate = useNavigate()

  const [Id, setID] = useState(slug);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)


  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${URL}/api/product/get/${Id}`)
      console.log(response)
      setProduct(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${URL}/api/product/get/${Id}`)
        console.log(response)
        setProduct(response.data.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (Id) {
      fetchProductData()
    }
  }, [Id])

  if (error) {
    return (
      <div className="product-details-page container">
        <div className="error-message">
          <p>Error:{error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-details-page container">
        <h2>Loading product...</h2>
      </div>
    )
  }

  const clickHandler = () => {
    console.log(product)
  }


  return (
    <>
    <Navbar />
    <div className="product-details-page container">
      {/* <div className="product-details-card">
        <h1 className="product-page-title">{product.Product_Name}</h1>
        <h4 className="product-page-title">{product.Description}</h4>
        <h2 className="product-page-title">{product.Price}</h2>
        <h3 className="product-page-title">{product.Product_Type}</h3>
        <h3 className="product-page-title">{product.Weight}</h3>
        
        <h1 className="product-page-title">{product.image}</h1>
        
        <h3 className="product-page-title">{product.status}</h3>
        
      </div> */}

      <div className="product-details-card">
        <div>
          <h1 className="product-page-title">{product.Product_Name}</h1>
          <div className="product-image">
            <img src={product.image || '/placeholder.jpg'} alt={product.Product_Name || 'product'} onError={(e)=>{e.target.src='/placeholder.jpg'}} />
          </div>
        </div>



      <div>
          <p className="product-description">{product.Description}</p>
          <p className="product-type">{product.Product_Type}</p>

          <div className="product-meta">
            <div className="product-weight">{product.Weight ?? 'N/A'}kg</div>
            <div className="product-price">{product.Price ? Number(product.Price).toFixed(2) : 'N/A'}</div>
          </div>

           <div className="product-quantity">
            <label>Quantity</label>
            <div className="qty-controls">
              <button type="button" onClick={()=>setQuantity((q)=>Math.max(1, q-1))} aria-label="Decrease quantity">-</button>
              <input type="number" value={quantity} readOnly />
              <button type="button" onClick={()=>setQuantity((q)=>q+1)} aria-label="Increase quantity">+</button>
            </div>
          </div>

           <div className="product-quantity">
            <button onClick={() => navigate('/order', { state: { product, quantity } })}>Order Now</button>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
          </div> 
        </div>
      </div>
    </div>
    <Footer />
    </>

  )
}
export default ProductDetails

