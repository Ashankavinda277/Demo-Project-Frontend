import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Navbar from '../../component/common/Navbar/Navbar.jsx';
import Footer from '../../component/common/Footer/Footer.jsx';
import { 
  FaTrashAlt, 
  FaArrowLeft, 
  FaShoppingBag, 
  FaTruck, 
  FaShieldAlt, 
  FaArrowRight, 
  FaCheckCircle 
} from 'react-icons/fa';
import '../../css/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart before checkout', e);
    }  
    navigate('/order', { state: { cartItems } });
  };

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + deliveryFee;
  const freeDeliveryThreshold = 5000;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <>
      <Navbar />
      <main className="cart-page-wrapper">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-card">
              <div className="empty-cart-icon-wrapper">
                <FaShoppingBag className="empty-cart-icon" />
              </div>
              <h2>Your Shopping Bag is Empty</h2>
              <p>Looks like you haven't added any sweet treats or celebration cakes yet.</p>
              <Link to="/products" className="btn btn-primary btn-lg">
                <span>Browse Cake Collection</span>
                <FaArrowRight />
              </Link>
            </div>
          ) : (
            <div className="cart-container">
              {/* Header */}
              <div className="cart-header-row">
                <div>
                  <span className="eyebrow">Checkout Review</span>
                  <h1 className="cart-title">Your Shopping Bag</h1>
                </div>
                <button onClick={clearCart} className="btn-clear-cart" aria-label="Clear all items in cart">
                  <FaTrashAlt />
                  <span>Clear Bag</span>
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="free-delivery-progress-card">
                <div className="delivery-progress-header">
                  <div className="delivery-progress-title">
                    <FaTruck className="progress-truck-icon" />
                    {subtotal >= freeDeliveryThreshold ? (
                      <span><strong>Congratulations!</strong> You unlocked <strong>FREE Delivery</strong></span>
                    ) : (
                      <span>Add <strong>Rs. {(freeDeliveryThreshold - subtotal).toFixed(2)}</strong> more for <strong>FREE Delivery</strong></span>
                    )}
                  </div>
                  <span className="progress-percentage">{Math.round(progressToFreeDelivery)}%</span>
                </div>
                <div className="delivery-progress-bar">
                  <div 
                    className="delivery-progress-fill" 
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>

              {/* Layout Grid */}
              <div className="cart-main-grid">
                {/* Items List */}
                <div className="cart-items-column">
                  <div className="cart-items-list">
                    {cartItems.map((item) => (
                      <div key={item._id} className="cart-item-card">
                        <div className="cart-item-img-frame">
                          <img 
                            src={item.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'} 
                            alt={item.Product_Name} 
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80';
                              e.target.onerror = null;
                            }}
                          />
                        </div>

                        <div className="cart-item-details">
                          <div className="item-title-row">
                            <h3 className="item-name">{item.Product_Name}</h3>
                            <button 
                              onClick={() => removeFromCart(item._id)}
                              className="item-delete-btn"
                              aria-label={`Remove ${item.Product_Name}`}
                              title="Remove item"
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                          
                          <div className="item-tags">
                            {item.Product_Type && <span className="item-tag">{item.Product_Type}</span>}
                            {item.Weight && <span className="item-tag">{item.Weight} kg</span>}
                          </div>

                          <div className="item-pricing-stepper-row">
                            {/* Stepper */}
                            <div className="cart-qty-stepper">
                              <button 
                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                className="qty-btn"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="qty-count">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="qty-btn"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            {/* Price */}
                            <div className="item-price-calc">
                              <span className="item-total-price">
                                Rs. {(item.Price * item.quantity).toFixed(2)}
                              </span>
                              {item.quantity > 1 && (
                                <span className="item-unit-price">
                                  Rs. {Number(item.Price).toFixed(2)} each
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to="/products" className="continue-shopping-link">
                    <FaArrowLeft />
                    <span>Continue Browsing More Treats</span>
                  </Link>
                </div>

                {/* Order Summary Column */}
                <div className="cart-summary-column">
                  <div className="summary-card">
                    <h2 className="summary-card-title">Order Summary</h2>

                    <div className="summary-rows-group">
                      <div className="summary-line">
                        <span>Items Subtotal ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)</span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                      </div>

                      <div className="summary-line">
                        <span>Estimated Delivery</span>
                        <span>{deliveryFee === 0 ? <strong style={{color: 'var(--color-success)'}}>FREE</strong> : `Rs. ${deliveryFee.toFixed(2)}`}</span>
                      </div>

                      <div className="summary-divider"></div>

                      <div className="summary-line total-line">
                        <span>Total to Pay</span>
                        <span className="grand-total-amount">Rs. {grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button className="btn btn-primary btn-lg checkout-submit-btn" onClick={handleCheckout}>
                      <span>Proceed to Order Details</span>
                      <FaArrowRight />
                    </button>

                    <div className="summary-perks-list">
                      <div className="perk-item">
                        <FaCheckCircle className="perk-icon" />
                        <span>Freshly baked on your delivery morning</span>
                      </div>
                      <div className="perk-item">
                        <FaShieldAlt className="perk-icon" />
                        <span>Safe, climate-controlled temperature delivery</span>
                      </div>
                    </div>
                  </div>
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

export default CartPage;