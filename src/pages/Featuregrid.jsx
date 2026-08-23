import React from 'react';
import Featurecard from '../component/home/Featurecard';
import { FaShieldAlt, FaAward, FaTruck, FaLeaf } from 'react-icons/fa';
import '../css/home.css/featuregrid.css';

function Featuregrid() {
  const features = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: 'Highest Hygiene & Safety',
      description: 'Baked in sanitized, temperature-controlled kitchens adhering to the strictest food safety standards.',
    },
    {
      id: 2,
      icon: <FaLeaf />,
      title: '100% Pure Natural Ingredients',
      description: 'Made with genuine dairy butter, rich Belgian cocoa, and farm-fresh dairy without artificial additives.',
    },
    {
      id: 3,
      icon: <FaAward />,
      title: 'Customer Favorite Recipes',
      description: 'Decades of perfected baking traditions bringing smiles to thousands of celebrations across the island.',
    },
    {
      id: 4,
      icon: <FaTruck />,
      title: 'Punctual & Secure Delivery',
      description: 'Carefully packaged and chauffeured in refrigerated carriers so your cake arrives pristine and photo-ready.',
    },
  ];

  return (
    <section className="features-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">The Slice of Heaven Promise</span>
          <h2>Why Celebrations Choose Us</h2>
          <p>
            We take pride in delivering an unparalleled standard of taste, craft, and trust for every joyful occasion.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-col">
              <Featurecard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featuregrid;