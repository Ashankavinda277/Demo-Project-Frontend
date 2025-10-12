import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../component/common/Navbar/Navbar.jsx'
import Footer from '../../component/common/Footer/Footer.jsx'
import productService from '../../services/productAPI.js'
import '../../css/pages/ProductDetails.css'

const normalizeToSlug = (s) =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')

const ProductDetails = () => {
  const { slug } = useParams()
  const location = useLocation()
  const passedId = location && location.state && location.state.id
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let cancelled = false

    const fetchById = async (idVal) => {
      try {
        const data = await productService.getProductById(idVal)
        if (!cancelled) setProduct(data)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load product by id')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const fetchByName = async (nameVal) => {
      try {
        const results = await productService.getProductsByName(nameVal)
        const first = Array.isArray(results) ? results[0] : results
        if (!cancelled) setProduct(first || null)
      } catch (err) {
        try {
          const all = await productService.getAllProducts()
          const found = all.find((p) => normalizeToSlug(p.Product_Name || p.name || '') === slug)
          if (!cancelled) setProduct(found || null)
        } catch (err2) {
          if (!cancelled) setError(err2.message || 'Failed to load product by name')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    ;(async () => {
      setLoading(true)
      setError(null)
      setProduct(null)

      if (passedId) {
        await fetchById(passedId)
        return
      }

      if (slug) {
        const decoded = decodeURIComponent(slug).replace(/-/g, ' ')
        await fetchByName(decoded)
        return
      }

      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [slug, passedId])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading product...</p>
        </div>
        <Footer />
      </>
    )
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
    )
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
    )
  }

  return (
    <>
      <Navbar />
      <div className="product-details-page container">
        <div className="product-details-card">
          <div className="product-left">
            <h1 className="product-page-title">{product.Product_Name}</h1>
            <div className="product-image">
              {/* Try common image fields: image, Image, Product_Image, Photo, photos[0], images[0] */}
              {(() => {
                const imgSrc = product.image || product.Image || product.Product_Image || product.Photo ||
                  (product.photos && product.photos[0]) || (product.images && product.images[0]) || '/placeholder.jpg'
                return (
                  <>
                    <img src={imgSrc} alt={product.Product_Name} onError={(e) => { e.target.src = '/placeholder.jpg' }} />
                    {!product.image && !product.Image && !product.Product_Image && !product.photos && !product.images && (
                      <small style={{ display: 'block', marginTop: 8, color: '#8a8a8a' }}>No product image available</small>
                    )}
                  </>
                )
              })()}
            </div>
          </div>

          <div className="product-right">
            <p className="product-type">{product.Product_Type}</p>
            <p className="product-description">{product.Description}</p>

            <div className="product-meta">
              <span>Weight: {product.Weight ?? 'N/A'}kg</span>
              <span>Price: Rs. {product.Price ? Number(product.Price).toFixed(2) : 'N/A'}</span>
            </div>

            <div className="product-quantity">
              <label>Quantity</label>
              <div className="qty-controls">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <input type="number" value={quantity} readOnly />
                <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div className="product-actions">
              <button onClick={() => alert(`Order ${quantity} of ${product.Product_Name} — flow not implemented`)}>Order Now</button>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetails

