import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaAward, FaLeaf } from 'react-icons/fa';
import '../css/home.css/MiddleBar.css';

const MidBar = () => {
  const bgUrl = new URL('../assets/img11.jpeg', import.meta.url).href;

  return (
    <section className="story-section section-padding" role="region" aria-label="Brand Philosophy">
      <div className="container">
        <div className="story-grid">
          {/* Left Column: Image Composition */}
          <div className="story-visual">
            <div className="story-image-main" style={{ backgroundImage: `url(${bgUrl})` }}>
              <div className="story-image-badge">
                <span className="badge-number">10+</span>
                <span className="badge-text">Years of Artisanal Excellence</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="story-content">
            <span className="eyebrow">Our Philosophy & Passion</span>
            <h2 className="story-heading">
              Turning Ordinary Moments into Exquisite Sweet Memories
            </h2>
            <p className="story-lead">
              Allow us to ensure that your celebration is more than just an event, but rather an unforgettable sensory experience that leaves lasting impressions on you and your guests.
            </p>
            <p className="story-text">
              We don’t just bake cakes—we craft edible works of art designed to elevate your milestone occasions with elegance, uncompromising flavor, and artisanal charm. Every single sponge, swirl of cream, and delicate garnish is handmade daily with pure devotion.
            </p>

            <div className="story-pillars">
              <div className="pillar-item">
                <div className="pillar-icon">
                  <FaLeaf />
                </div>
                <div className="pillar-info">
                  <h4>100% Pure Ingredients</h4>
                  <p>Real butter, Belgian chocolate, fresh vanilla beans</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">
                  <FaAward />
                </div>
                <div className="pillar-info">
                  <h4>Master Patissiers</h4>
                  <p>Hand-decorated with meticulous precision</p>
                </div>
              </div>
            </div>

            <div className="story-cta-row">
              <Link to="/aboutUs" className="btn btn-primary">
                Read Our Story
              </Link>
              <Link to="/products" className="btn btn-outline">
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidBar;