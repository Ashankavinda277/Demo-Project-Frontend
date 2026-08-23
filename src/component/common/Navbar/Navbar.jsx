import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaBirthdayCake } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";
import "../../../css/common/Navbar/navbar.css";

function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems ? cartItems.reduce((total, item) => total + (item.quantity || 1), 0) : 0;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Add scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <p>
          <span className="top-bar-sparkle">✨</span> Freshly Baked Everyday — Free delivery on orders over Rs. 5,000!
        </p>
      </div>

      {/* Main Navbar */}
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="main-nav container">
          {/* Logo & Brand Identity */}
          <Link to="/" className="brand-logo" aria-label="Slice of Heaven Home">
            <div className="logo-icon-wrapper">
              <FaBirthdayCake className="logo-icon" />
            </div>
            <div className="shop-name">
              <span className="brand-title">Slice of Heaven</span>
              <span className="brand-tagline">Artisanal Patisserie</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search cakes, gateaux, muffins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search for products"
            />
            <button type="submit" aria-label="Search">
              <FaSearch />
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Primary Navigation">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Cakes & Menu
            </NavLink>
            <NavLink to="/offers" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Special Offers
            </NavLink>
            <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              About Us
            </NavLink>
            <NavLink to="/ContactUs" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Contact
            </NavLink>
          </nav>

          {/* Nav Actions (Cart & Mobile Menu Trigger) */}
          <div className="nav-actions">
            <Link to="/cart" className="cart-btn" aria-label={`Shopping Bag with ${cartCount} items`}>
              <FaShoppingCart className="cart-icon" />
              <span className="cart-label">Bag</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}>
          <div className="mobile-drawer-content">
            <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search cakes, desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <FaSearch />
              </button>
            </form>

            <div className="mobile-nav-links">
              <NavLink to="/" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
                Home
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
                Cakes & Menu
              </NavLink>
              <NavLink to="/offers" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
                Special Offers
              </NavLink>
              <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
                About Us
              </NavLink>
              <NavLink to="/ContactUs" className={({ isActive }) => (isActive ? "mobile-link active" : "mobile-link")}>
                Contact Us
              </NavLink>
              <NavLink to="/admin" className="mobile-link admin-shortcut">
                Admin Dashboard
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
