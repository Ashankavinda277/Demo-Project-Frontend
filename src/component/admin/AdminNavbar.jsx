import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <>
      <div className="adminnav-links">
        <Link
          to="/ManageProducts"
          className={location.pathname === "/ManageProducts" ? "active" : ""}
        >
          Manage Products
        </Link>
        <Link
          to="/ManageOffers"
          className={location.pathname === "/ManageOffers" ? "active" : ""}
        >
          Manage Offers
        </Link>
        <Link
          to="/ViewOrders"
          className={location.pathname === "/ViewOrders" ? "active" : ""}
        >
          View Orders
        </Link>
      </div>
    </>
  );
};

export default AdminNavbar;
