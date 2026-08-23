import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "../../component/common/Navbar/Navbar.jsx";
import Footer from "../../component/common/Footer/Footer.jsx";
import { 
  FaShoppingBag, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaPenFancy, 
  FaTruck, 
  FaShieldAlt, 
  FaArrowLeft, 
  FaExclamationCircle 
} from "react-icons/fa";
import "../../css/pages/OrderPage.css";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80";

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderItems, setOrderItems] = useState([]);

  // Initialize all form fields with empty strings
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    deliveryDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getStoredCartItems = () => {
    try {
      const raw = localStorage.getItem("cartItems");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to parse cartItems from localStorage", e);
      return [];
    }
  };

  const clearLocalCart = () => {
    try {
      localStorage.removeItem("cartItems");
    } catch (e) {
      console.error("Failed to clear cart", e);
    }
  };

  // Convert offer data to product format for OrderPage
  const convertOfferToProduct = (offer) => {
    return {
      _id: offer._id,
      id: offer._id,
      Product_Name: offer.Promotion_Name,
      Product_Type: "Special Promotional Offer",
      Weight: offer.Weight,
      Price: offer.Discount_Price,
      image: offer.Icon,
      quantity: 1,
      messageOnCake: "",
      isOffer: true,
    };
  };

  useEffect(() => {
    // Priority: offer product -> single-product checkout -> navigation state cartItems -> localStorage
    if (location.state?.offer) {
      const convertedProduct = convertOfferToProduct(location.state.offer);
      setOrderItems([convertedProduct]);
      return;
    }

    if (location.state?.product) {
      setOrderItems([
        {
          ...location.state.product,
          quantity: location.state.quantity || 1,
          messageOnCake: "",
        },
      ]);
      return;
    }

    if (
      Array.isArray(location.state?.cartItems) &&
      location.state.cartItems.length > 0
    ) {
      setOrderItems(
        location.state.cartItems.map((i) => ({
          ...i,
          quantity: i.quantity || 1,
          messageOnCake: "",
        }))
      );
      return;
    }

    const stored = getStoredCartItems();
    if (stored.length > 0) {
      setOrderItems(
        stored.map((i) => ({
          ...i,
          quantity: i.quantity || 1,
          messageOnCake: "",
        }))
      );
    } else {
      navigate("/products");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMessageChange = (index, message) => {
    setOrderItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], messageOnCake: message };
      return copy;
    });
  };

  const subtotal = orderItems.reduce(
    (total, item) =>
      total + Number(item.Price || 0) * Number(item.quantity || 0),
    0
  );

  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const calculateTotal = () => subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      setError("No items in the order.");
      setLoading(false);
      return;
    }

    // Validate all required form fields
    if (!formData.customerName || formData.customerName.trim() === "") {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    if (!formData.customerEmail || formData.customerEmail.trim() === "") {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    if (!formData.customerPhone || formData.customerPhone.trim() === "") {
      setError("Please enter your phone number.");
      setLoading(false);
      return;
    }

    if (!formData.deliveryAddress || formData.deliveryAddress.trim() === "") {
      setError("Please enter delivery address.");
      setLoading(false);
      return;
    }

    if (!formData.deliveryDate || formData.deliveryDate.trim() === "") {
      setError("Please select delivery date.");
      setLoading(false);
      return;
    }

    try {
      // Construct order data exactly as required by the backend
      const orderData = {
        customer: {
          name: formData.customerName.trim(),
          email: formData.customerEmail.trim(),
          phone: formData.customerPhone.trim(),
        },
        items: orderItems.map((item) => ({
          productId: item.isOffer ? null : (item._id || item.id),
          offerId: item.isOffer ? (item._id || item.id) : null,
          isOffer: item.isOffer || false,
          quantity: Number(item.quantity) || 1,
          messageOnCake: item.messageOnCake || "",
        })),
        deliveryAddress: formData.deliveryAddress.trim(),
        deliveryDate: formData.deliveryDate,
      };

      console.log("Sending order data:", JSON.stringify(orderData, null, 2));

      const response = await fetch("http://localhost:5000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const contentType = response.headers.get("content-type");
      let result = {};

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        result = { message: "Server returned non-JSON response", raw: text };
      }

      console.log("Server response:", result);

      if (response.ok) {
        // Clear cart if order was from cart
        if (!location.state?.product && !location.state?.offer) {
          clearLocalCart();
        }

        const orderId =
          result?.order?._id ||
          result?.data?._id ||
          result?._id ||
          null;

        navigate("/order-success", { state: { orderId } });
      } else {
        const serverMessage =
          result?.message ||
          result?.error ||
          `Failed with status ${response.status}`;
        console.error("Order failed:", serverMessage);
        setError(`Failed to place order: ${serverMessage}`);
      }
    } catch (err) {
      console.error("Order error:", err);
      setError("Network error. Please make sure the backend server is running on port 5000 and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Preparing your order items...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="order-page-wrapper">
        <div className="container">
          {/* Header */}
          <div className="order-page-header">
            <Link to="/cart" className="back-link">
              <FaArrowLeft />
              <span>Back to Bag</span>
            </Link>
            <span className="eyebrow">Direct Checkout</span>
            <h1 className="order-headline">Complete Your Order</h1>
            <p className="order-subheadline">
              Please review your selected items and provide delivery coordinates for our pastry courier.
            </p>
          </div>

          {error && (
            <div className="order-error-banner">
              <FaExclamationCircle className="error-banner-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="order-checkout-grid">
            {/* Left Column: Order Items & Inscriptions */}
            <div className="order-items-column">
              <div className="checkout-card items-summary-card">
                <div className="checkout-card-header">
                  <h2>Order Items ({orderItems.length})</h2>
                  <span className="badge badge-caramel">Fresh Baked</span>
                </div>

                <div className="checkout-items-list">
                  {orderItems.map((item, index) => (
                    <div key={index} className="checkout-item-row">
                      <div className="checkout-item-thumb">
                        <img
                          src={item.image || PLACEHOLDER_IMG}
                          alt={item.Product_Name}
                          onError={(e) => {
                            e.target.src = PLACEHOLDER_IMG;
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                      <div className="checkout-item-info">
                        <h3>{item.Product_Name}</h3>
                        <div className="checkout-item-meta">
                          {item.Product_Type && <span>{item.Product_Type}</span>}
                          {item.Weight && <span>• {item.Weight} kg</span>}
                        </div>
                        <div className="checkout-item-qty-price">
                          Qty: {item.quantity} × Rs. {Number(item.Price).toFixed(2)}
                        </div>
                      </div>
                      <div className="checkout-item-total">
                        Rs. {(Number(item.Price) * Number(item.quantity)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cake Messages / Custom Inscription */}
                <div className="cake-inscriptions-section">
                  <div className="inscription-header">
                    <FaPenFancy className="inscription-icon" />
                    <div>
                      <h3>Message on Cake (Optional)</h3>
                      <p>Custom chocolate plaque inscription for your celebrations</p>
                    </div>
                  </div>

                  {orderItems.map((item, index) => (
                    <div key={index} className="inscription-input-group">
                      <label htmlFor={`msg-${index}`}>
                        Inscription for: <strong>{item.Product_Name}</strong>
                      </label>
                      <div className="input-with-counter">
                        <input
                          id={`msg-${index}`}
                          type="text"
                          placeholder="e.g., Happy Birthday Amaya! 🎉"
                          value={item.messageOnCake || ""}
                          onChange={(e) => handleMessageChange(index, e.target.value)}
                          maxLength="50"
                        />
                        <span className="char-count">
                          {(item.messageOnCake || "").length}/50
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Customer & Delivery Details Form */}
            <div className="order-form-column">
              <div className="checkout-card form-card">
                <div className="checkout-card-header">
                  <h2>Delivery Information</h2>
                </div>

                <form onSubmit={handleSubmit} className="checkout-form">
                  <div className="form-group">
                    <label>
                      <FaUser className="form-icon" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Ruwan Fernando"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <FaEnvelope className="form-icon" /> Email Address *
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        placeholder="ruwan@example.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <FaPhoneAlt className="form-icon" /> Contact Number *
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaMapMarkerAlt className="form-icon" /> Delivery Address *
                    </label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      placeholder="Street address, apartment or landmark in Sri Lanka..."
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaCalendarAlt className="form-icon" /> Delivery Date *
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                    <small className="field-hint">
                      Cakes are baked fresh on the morning of your selected date.
                    </small>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="checkout-summary-box">
                    <div className="summary-row">
                      <span>Items Subtotal</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                      <span>Delivery Service</span>
                      <span>{deliveryFee === 0 ? <strong style={{color: 'var(--color-success)'}}>FREE</strong> : `Rs. ${deliveryFee.toFixed(2)}`}</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total">
                      <span>Total Amount</span>
                      <span className="total-price">Rs. {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg place-order-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-sm"></div>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <span>Place & Confirm Order</span>
                    )}
                  </button>

                  <div className="security-note">
                    <FaShieldAlt className="shield-icon" />
                    <span>Payment on Delivery / Direct Bank Confirmation</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderPage;