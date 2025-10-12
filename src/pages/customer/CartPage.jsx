import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../../css/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    try {
      // persist cart so OrderPage can load full cart if needed
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart before checkout', e);
    }

    // also pass cart via navigation state for immediate use
    navigate('/order', { state: { cartItems } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any delicious treats yet!</p>
            <Link to="/products" className="continue-shopping-btn">
              Browse Our Cakes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.Product_Name} />
                
                <div className="item-details">
                  <h3>{item.Product_Name}</h3>
                  <p className="item-type">{item.Product_Type}</p>
                  <p className="item-description">{item.Description}</p>
                  <p className="item-weight">Weight: {item.Weight}kg</p>
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-price">
                  <p className="price">Rs. {(item.Price * item.quantity).toFixed(2)}</p>
                  <p className="unit-price">Rs. {item.Price.toFixed(2)} each</p>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                <span>Rs. {getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>Rs. 250.00</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {(getTotalPrice() + 250).toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Order
            </button>

            <Link to="/products" className="continue-link">
              ← Continue Shopping
            </Link>

            <div className="delivery-info">
              <p>🚚 Free delivery on orders above Rs. 5,000</p>
              <p>⏰ Delivery within 2-3 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;