import { useEffect, useState } from 'react';
import '../../css/ViewOrders.css'

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/order/viewAll');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  if (loading) {
    return <div className="loading-container">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1 className="orders-title">Orders Management</h1>
        <p className="orders-subtitle">View and manage all customer orders</p>
      </div>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <p className="order-id">Order #{order._id.slice(-8)}</p>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Customer ID:</span>
                  <span className="detail-value">{order.customerId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Delivery:</span>
                  <span className="detail-value">{order.deliveryAddress}</span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="order-items">
                  <p className="items-header">Order Items ({order.items.length})</p>
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <div>
                          <div className="item-name">{item.name}</div>
                          <div className="item-details">
                            Quantity: {item.quantity} × Rs. {item.price}
                          </div>
                          {item.messageOnCake && (
                            <div className="item-details">
                              Message: "{item.messageOnCake}"
                            </div>
                          )}
                        </div>
                        <div className="item-price">
                          Rs. {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="order-total">
                <span className="total-label">Total Amount:</span>
                <span className="total-amount">Rs. {order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <p className="empty-state-text">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;