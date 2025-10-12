import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../css/pages/OrderPage.css';

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, clearCart, getTotalPrice } = useCart();
  
  // Get order items from either cart or single product
  const [orderItems, setOrderItems] = useState([]);
  
  useEffect(() => {
    // Check if coming from product details with single item
    if (location.state?.product) {
      setOrderItems([{
        ...location.state.product,
        quantity: location.state.quantity || 1,
        messageOnCake: ''
      }]);
    } 
    // Otherwise use cart items
    else if (cartItems.length > 0) {
      setOrderItems(cartItems.map(item => ({
        ...item,
        messageOnCake: ''
      })));
    } else {
      // No items, redirect to products
      navigate('/products');
    }
  }, [location.state, cartItems, navigate]);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMessageChange = (index, message) => {
    const updatedItems = [...orderItems];
    updatedItems[index].messageOnCake = message;
    setOrderItems(updatedItems);
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((total, item) => 
      total + (item.Price * item.quantity), 0
    );
    const deliveryFee = 250;
    return subtotal + deliveryFee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For now, we'll use a temporary customer ID
      // In production, you'd get this from authentication
      const tempCustomerId = '507f1f77bcf86cd799439011'; // Replace with actual customer ID

      const orderData = {
        customerId: tempCustomerId,
        items: orderItems.map(item => ({
          productId: item._id,
          name: item.Product_Name,
          price: item.Price,
          quantity: item.quantity,
          messageOnCake: item.messageOnCake || ''
        })),
        totalAmount: calculateTotal(),
        deliveryAddress: formData.deliveryAddress,
        customerDetails: {
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone
        },
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        specialInstructions: formData.specialInstructions
      };

      const response = await fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok) {
        // Clear cart if order was from cart
        if (!location.state?.product) {
          clearCart();
        }
        
        // Navigate to success page
        navigate('/order-success', { 
          state: { orderId: result.data._id } 
        });
      } else {
        setError(result.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderItems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-page">
      <div className="container">
        <h1>Complete Your Order</h1>

        <div className="order-content">
          {/* Order Items Section */}
          <div className="order-items-section">
            <h2>Order Items</h2>
            {orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.Product_Name} />
                <div className="item-info">
                  <h3>{item.Product_Name}</h3>
                  <p className="item-type">{item.Product_Type}</p>
                  <p className="item-weight">{item.Weight}kg</p>
                  <p className="item-price">Rs. {item.Price.toFixed(2)} × {item.quantity}</p>
                </div>
                <div className="item-total">
                  Rs. {(item.Price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Message on Cake */}
            <div className="cake-messages">
              <h3>Message on Cake (Optional)</h3>
              {orderItems.map((item, index) => (
                <div key={index} className="message-input-group">
                  <label>{item.Product_Name}</label>
                  <input
                    type="text"
                    placeholder="e.g., Happy Birthday Sarah!"
                    value={item.messageOnCake}
                    onChange={(e) => handleMessageChange(index, e.target.value)}
                    maxLength="50"
                  />
                  <small>{item.messageOnCake.length}/50 characters</small>
                </div>
              ))}
            </div>
          </div>

          {/* Order Form */}
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
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                 </div>


              {/* Order Summary */}
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {orderItems.reduce((total, item) => 
                    total + (item.Price * item.quantity), 0).toFixed(2)}</span>
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

              <button type="submit" className="place-order-btn" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;