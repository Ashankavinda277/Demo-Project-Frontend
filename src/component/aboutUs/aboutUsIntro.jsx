import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaAward, FaLeaf, FaClock, FaBirthdayCake, FaArrowRight } from 'react-icons/fa';
import '../../css/aboutUs.css/aboutUsIntro.css';

const Introduction = ({ imageSrc, imageAlt = "Slice of Heaven artisanal baking" }) => {
  return (
    <section className="about-hero-section">
      {/* Top Banner */}
      <div className="about-header-banner">
        <div className="container">
          <span className="eyebrow">Our Heritage & Craft</span>
          <h1 className="about-page-headline">The Art of Handcrafted Celebrations</h1>
          <p className="about-page-tagline">
            Where every single slice is baked with passion, pure ingredients, and timeless patisserie mastery.
          </p>
        </div>
      </div>

      <div className="container about-main-container">
        {/* Editorial Story Row */}
        <div className="about-story-row">
          <div className="about-story-visual">
            <div className="about-visual-frame">
              <img
                src={imageSrc || "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"}
                alt={imageAlt}
                className="about-visual-img"
              />
              <div className="about-visual-overlay-card">
                <FaBirthdayCake className="about-card-icon" />
                <span className="about-card-title">Handmade with Devotion</span>
                <span className="about-card-sub">Daily in Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          <div className="about-story-content">
            <span className="eyebrow">Welcome to Slice of Heaven</span>
            <h2 className="about-story-title">Where Every Moment Tastes Truly Divine</h2>
            <p className="about-lead-text">
              At Slice of Heaven, we believe that life's sweetest milestones deserve to be celebrated with something extraordinary.
            </p>
            <p className="about-body-text">
              Since our founding, we have been dedicated to crafting exquisite cakes and confections that ignite joy across occasions—from grand weddings and birthdays to intimate celebrations. Using only 100% pure dairy butter, rich Belgian chocolate, and time-honored European baking techniques, each creation is a harmonious masterpiece of flavor and visual artistry.
            </p>
            <p className="about-body-text">
              Our passionate bakers and pastry decorators pour their souls into every delicate layer, silky swirl of ganache, and hand-sculpted sugar flower. Because a cake is never just a dessert—it is a cherished memory in the making.
            </p>

            <div className="about-cta-row">
              <Link to="/products" className="btn btn-primary btn-lg">
                <span>Explore Cake Menu</span>
                <FaArrowRight />
              </Link>
              <Link to="/ContactUs" className="btn btn-outline btn-lg">
                Visit Our Patisserie
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="about-values-section">
          <div className="section-header">
            <span className="eyebrow">Our Guiding Standards</span>
            <h2>Baked by Principles of Excellence</h2>
          </div>

          <div className="about-values-grid">
            <div className="value-card">
              <div className="value-icon-box"><FaLeaf /></div>
              <h3>Pure, Natural Ingredients</h3>
              <p>We source authentic real dairy butter, unadulterated cocoa, and farm-fresh ingredients without artificial compromises.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box"><FaAward /></div>
              <h3>Masterful Patisserie Art</h3>
              <p>Every cake is sculpted by seasoned pastry chefs trained in classic and modern confectionery techniques.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box"><FaClock /></div>
              <h3>Baked Fresh Daily</h3>
              <p>We never serve frozen stockpiles. Your cake is baked to order on the morning of your event.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-box"><FaHeart /></div>
              <h3>Memories in Every Layer</h3>
              <p>Dedicated customer service ensuring your celebrations are seamless, punctual, and joyful.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;