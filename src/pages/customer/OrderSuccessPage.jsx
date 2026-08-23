import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../component/common/Navbar/Navbar.jsx";
import Footer from "../../component/common/Footer/Footer.jsx";
import { FaCheckCircle, FaShoppingBag, FaHome, FaEnvelope, FaClock, FaBirthdayCake } from "react-icons/fa";
import "../../css/pages/OrderSuccess.css";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <>
      <Navbar />
      <main className="order-success-page">
        <div className="container">
          <div className="success-receipt-card">
            {/* Animated Celebration Icon */}
            <div className="success-icon-badge">
              <FaCheckCircle className="check-svg-icon" />
            </div>
            
            <span className="eyebrow">Celebration Confirmed</span>
            <h1 className="success-heading">Order Placed Successfully!</h1>
            <p className="success-subheading">
              Thank you for trusting Slice of Heaven with your sweet celebration. Our pastry chefs have received your order.
            </p>
            
            {orderId && (
              <div className="order-id-highlight">
                <span className="order-id-label">Confirmation Reference</span>
                <span className="order-id-val">Order #{orderId}</span>
              </div>
            )}

            {/* Next Steps Timeline */}
            <div className="order-next-steps-card">
              <h3 className="steps-title">What Happens Next?</h3>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-num-icon"><FaEnvelope /></div>
                  <div className="step-text">
                    <h4>Confirmation Dispatch</h4>
                    <p>We'll send a full order receipt to your registered email.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-num-icon"><FaBirthdayCake /></div>
                  <div className="step-text">
                    <h4>Fresh Artisanal Baking</h4>
                    <p>Your cake is handcrafted on the morning of your selected date.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-num-icon"><FaClock /></div>
                  <div className="step-text">
                    <h4>Punctual Courier Delivery</h4>
                    <p>Chauffeured safely in a temperature-controlled pastry carrier.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="success-actions-row">
              <Link to="/products" className="btn btn-primary btn-lg">
                <FaShoppingBag />
                <span>Explore More Cakes</span>
              </Link>
              <Link to="/" className="btn btn-outline btn-lg">
                <FaHome />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;