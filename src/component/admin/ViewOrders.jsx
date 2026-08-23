import React, { useEffect, useState } from "react";
import { 
  FaClipboardList, 
  FaClock, 
  FaUser, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBirthdayCake, 
  FaExclamationCircle, 
  FaCheck 
} from "react-icons/fa";
import "../../css/ViewOrders.css";

const STATUS_LIST = ["Pending", "Processing", "Completed", "Cancelled"];

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:5000/api/order/viewAll");
      const data = await response.json();
      console.log("Fetched orders:", data);
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Unable to connect to backend server. Make sure port 5000 is online.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      const response = await fetch(`http://localhost:5000/api/order/update/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const payload = await response.json();

      if (response.ok) {
        const updatedOrder = payload.order;
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? (updatedOrder || { ...o, status: newStatus }) : o
          )
        );
      } else {
        console.error("Update failed:", payload);
        alert("Failed to update order status: " + (payload.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Error updating order status. Please check backend connection.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const grouped = STATUS_LIST.reduce((acc, s) => {
    acc[s] = orders.filter((o) => (o.status || "").toLowerCase() === s.toLowerCase());
    return acc;
  }, {});

  return (
    <div className="admin-orders-page">
      <div className="container">
        {/* Header */}
        <div className="orders-header-row">
          <div>
            <span className="eyebrow">Bakery Fulfillment</span>
            <h1 className="orders-page-title">Order Dispatch & Management</h1>
            <p className="orders-page-subtitle">Track customer orders from baking queue to delivery completion.</p>
          </div>
          <button className="btn btn-outline" onClick={fetchData}>
            Refresh Orders
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading active and historical orders...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <FaExclamationCircle className="error-icon" />
            <h2>Order Connection Error</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchData}>Retry Connection</button>
          </div>
        ) : (
          <div className="status-kanban-board">
            {STATUS_LIST.map((status) => {
              const statusOrders = grouped[status] || [];
              return (
                <div key={status} className={`kanban-column column-${status.toLowerCase()}`}>
                  <div className="kanban-column-header">
                    <div className="column-title-box">
                      <h2>{status}</h2>
                      <span className="column-counter">{statusOrders.length}</span>
                    </div>
                  </div>

                  <div className="kanban-cards-stack">
                    {statusOrders.length > 0 ? (
                      statusOrders.map((order) => (
                        <div key={order._id} className="admin-order-card">
                          <div className="order-card-topbar">
                            <div className="order-ref-box">
                              <span className="order-code">#{order._id.slice(-6).toUpperCase()}</span>
                              <span className="order-time">{formatDate(order.createdAt)}</span>
                            </div>

                            <select
                              className={`status-select status-${(order.status || "").toLowerCase()}`}
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              disabled={updatingOrderId === order._id}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          {/* Customer Info */}
                          <div className="order-customer-box">
                            <div className="customer-detail-line">
                              <FaUser className="cust-ico" />
                              <strong>{order.customerId?.Customer_Name || "Customer"}</strong>
                            </div>
                            <div className="customer-detail-line">
                              <FaPhoneAlt className="cust-ico" />
                              <span>{order.customerId?.Contact_Number || "N/A"}</span>
                            </div>
                            <div className="customer-detail-line">
                              <FaEnvelope className="cust-ico" />
                              <span>{order.customerId?.Email || "N/A"}</span>
                            </div>
                            <div className="customer-detail-line">
                              <FaMapMarkerAlt className="cust-ico" />
                              <span>{order.deliveryAddress || "N/A"}</span>
                            </div>
                            {order.deliveryDate && (
                              <div className="customer-detail-line highlight-date">
                                <FaCalendarAlt className="cust-ico" />
                                <span>Delivery on: <strong>{new Date(order.deliveryDate).toLocaleDateString()}</strong></span>
                              </div>
                            )}
                          </div>

                          {/* Items List */}
                          {order.items && order.items.length > 0 && (
                            <div className="order-items-sublist">
                              <span className="sublist-heading">Cakes Ordered ({order.items.length})</span>
                              {order.items.map((item, idx) => (
                                <div key={idx} className="ordered-item-row">
                                  <div className="item-title-qty">
                                    <FaBirthdayCake className="cake-ico" />
                                    <span>{item.name || "Special Cake"} × {item.quantity}</span>
                                  </div>
                                  <span className="item-row-price">
                                    Rs. {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                  </span>
                                  {item.messageOnCake && (
                                    <div className="cake-inscription-preview">
                                      "{item.messageOnCake}"
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Card Footer Total */}
                          <div className="order-card-footer">
                            <span className="total-label">Total Amount:</span>
                            <span className="total-amount-val">
                              Rs. {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-column-placeholder">
                        <span>No {status.toLowerCase()} orders</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
