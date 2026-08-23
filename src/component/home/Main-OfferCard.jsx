import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const MainOfferCard = ({ image, title, subtitle, discount, validity }) => {
  return (
    <div className="main-deal-card">
      <div className="deal-image-wrapper">
        <img src={image} alt={title} className="deal-image" />
        <div className="deal-discount-badge">
          <span>{discount}</span>
        </div>
      </div>
      
      <div className="deal-content">
        {validity && <span className="deal-validity">{validity}</span>}
        <h3 className="deal-title">{title}</h3>
        {subtitle && <p className="deal-subtitle">{subtitle}</p>}
        
        <Link to="/offers" className="deal-action-link">
          <span>Claim Offer</span>
          <FaArrowRight className="deal-arrow" />
        </Link>
      </div>
    </div>
  );
};

export default MainOfferCard;