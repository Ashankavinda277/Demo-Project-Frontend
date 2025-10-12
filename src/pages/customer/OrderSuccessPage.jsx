import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/pages/OrderSuccess.css";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
            <path d="M8 12l2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your order. We'll deliver your delicious treats soon!
        </p>
        
        {orderId && (
          <div className="order-details">
            <p className="order-id">Order ID: <strong>{orderId}</strong></p>
            <p className="order-info">
              You will receive a confirmation email with your order details.
            </p>
          </div>
        )}

        <div className="delivery-info-box">
          <h3>📦 What's Next?</h3>
          <ul>
            <li>✓ We'll confirm your order via email</li>
            <li>✓ Your cake will be freshly prepared</li>
            <li>✓ Delivery within 2-3 hours on your selected date</li>
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
          <Link to="/" className="home-btn">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;