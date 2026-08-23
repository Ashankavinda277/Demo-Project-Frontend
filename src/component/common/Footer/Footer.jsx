import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBirthdayCake, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaArrowUp
} from 'react-icons/fa';
import '../../../css/common/Footer/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-main container">
        {/* Brand Column */}
        <div className="footer-col footer-brand-col">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <FaBirthdayCake />
            </div>
            <div className="footer-brand-text">
              <h2>Slice of Heaven</h2>
              <span>Artisanal Patisserie</span>
            </div>
          </div>
          <p className="footer-about">
            Delight in every layer! We craft freshly baked artisanal cakes, delicate pastries, and memorable celebration gateaux using the finest ingredients.
          </p>
          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h3 className="footer-title">Our Collections</h3>
          <ul className="footer-links">
            <li><Link to="/categories/birthday-cakes">Birthday Cakes</Link></li>
            <li><Link to="/categories/wedding-cakes">Wedding Cakes</Link></li>
            <li><Link to="/categories/chocolate-cakes">Chocolate Cakes</Link></li>
            <li><Link to="/categories/signature-gateau-cakes">Signature Gateaux</Link></li>
            <li><Link to="/categories/muffins">Artisan Muffins</Link></li>
            <li><Link to="/categories/others">Cupcakes & Treats</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h3 className="footer-title">Explore</h3>
          <ul className="footer-links">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/offers">Special Offers & Deals</Link></li>
            <li><Link to="/aboutUs">Our Story & Craft</Link></li>
            <li><Link to="/ContactUs">Contact & Locations</Link></li>
            <li><Link to="/cart">Shopping Bag</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Contact & Hours Column */}
        <div className="footer-col">
          <h3 className="footer-title">Visit & Inquire</h3>
          <ul className="footer-contact-list">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>48, Janadhipathi Mawatha, Colombo 01, Sri Lanka</span>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <span>+94 77 123 4567 / 011 234 5678</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>orders@sliceofheaven.lk</span>
            </li>
            <li>
              <FaClock className="contact-icon" />
              <span>Mon – Sun: 8:00 AM – 9:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Slice of Heaven. All rights reserved. Crafted with passion.</p>
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Scroll to top">
            <span>Back to top</span>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;