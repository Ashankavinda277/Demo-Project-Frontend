import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/pages/OrderPage.css";

const PLACEHOLDER_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
      '<rect width="100%" height="100%" fill="#f3f4f6"/>' +
      '<text x="50%" y="50%" fill="#9ca3af" dominant-baseline="middle" text-anchor="middle" font-size="20">No image</text>' +
      "</svg>"
  );

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderItems, setOrderItems] = useState([]);

  // Initialize all form fields with empty strings (fixes uncontrolled input warning)
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
      Product_Type: "Special Offer",
      Weight: offer.Weight,
      Price: offer.Discount_Price,
      image: offer.Icon,
      quantity: 1,
      messageOnCake: "",
      isOffer: true, // ADDED: Flag to identify this is an offer
    };
  };

  useEffect(() => {
    // Priority: offer product -> single-product checkout -> navigation state cartItems -> localStorage

    // Check if coming from offer card
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

  const calculateTotal = () => {
    const subtotal = orderItems.reduce(
      (total, item) =>
        total + Number(item.Price || 0) * Number(item.quantity || 0),
      0
    );
    const deliveryFee = 250;
    return subtotal + deliveryFee;
  };

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
      // Construct order data with proper structure
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

      // Debug: Log the data being sent
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
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderItems.length === 0) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="container">
        <h1>Complete Your Order</h1>

        <div className="order-content">
          <div className="order-items-section">
            <h2>Order Items</h2>
            {orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <img
                  src={item.image || PLACEHOLDER_SVG}
                  alt={item.Product_Name}
                />
                <div className="item-info">
                  <h3>{item.Product_Name}</h3>
                  <p className="item-type">{item.Product_Type}</p>
                  <p className="item-weight">{item.Weight}kg</p>
                  <p className="item-price">
                    Rs. {Number(item.Price).toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="item-total">
                  Rs. {(Number(item.Price) * Number(item.quantity)).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="cake-messages">
              <h3>Message on Cake (Optional)</h3>
              {orderItems.map((item, index) => (
                <div key={index} className="message-input-group">
                  <label>{item.Product_Name}</label>
                  <input
                    type="text"
                    placeholder="e.g., Happy Birthday Sarah!"
                    value={item.messageOnCake || ""}
                    onChange={(e) => handleMessageChange(index, e.target.value)}
                    maxLength="50"
                  />
                  <small>
                    {(item.messageOnCake || "").length}/50 characters
                  </small>
                </div>
              ))}
            </div>
          </div>

          <div className="order-form-section">
            <h2>Delivery Details</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="+94 XX XXX XXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Enter complete delivery address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>
                    Rs.{" "}
                    {orderItems
                      .reduce(
                        (total, item) =>
                          total +
                          Number(item.Price || 0) * Number(item.quantity || 0),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>Rs. 250.00</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>Rs. {calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;