import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBoxOpen, FaTag, FaClipboardList, FaStore } from "react-icons/fa";
import "../../css/AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <div className="admin-subnav-bar">
      <div className="container admin-subnav-inner">
        <div className="admin-badge-label">
          <span>Admin Portal</span>
        </div>
        <nav className="adminnav-links" aria-label="Admin navigation tabs">
          <Link
            to="/ManageProducts"
            className={location.pathname === "/ManageProducts" ? "admin-tab active" : "admin-tab"}
          >
            <FaBoxOpen />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/ManageOffers"
            className={location.pathname === "/ManageOffers" ? "admin-tab active" : "admin-tab"}
          >
            <FaTag />
            <span>Manage Offers</span>
          </Link>
          <Link
            to="/ViewOrders"
            className={location.pathname === "/ViewOrders" ? "admin-tab active" : "admin-tab"}
          >
            <FaClipboardList />
            <span>View Orders</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
