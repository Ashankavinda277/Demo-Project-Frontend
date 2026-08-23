import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Categories = ({ image, title, subtitle }) => {
  return (
    <div className="category-card">
      <div 
        className="category-card-bg"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="category-card-overlay" />
      <div className="category-card-content">
        {subtitle && <span className="category-badge">{subtitle}</span>}
        <h3 className="category-title">{title}</h3>
        <div className="category-action">
          <span>Explore Collection</span>
          <FaArrowRight className="category-arrow" />
        </div>
      </div>
    </div>
  );
};

export default Categories;