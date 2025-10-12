import React from "react";

const OrderSuccessPage = () => {
  return (
    <>
      <div className="order-success-page">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you for your order. We'll deliver your delicious treats soon!
          </p>
          {orderId && <p className="order-id">Order ID: {orderId}</p>}

          <div className="success-actions">
            <Link to="/products" className="continue-btn">
              Continue Shopping
            </Link>
            <Link to="/" className="home-btn">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
