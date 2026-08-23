import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../css/home.css/ImageSlider.css';

const slides = [
  {
    src: new URL('../../assets/img9.jpg', import.meta.url).href,
    alt: 'Orange White Choco Chip Gateau',
    eyebrow: 'Signature Gateaux Collection',
    title: 'Orange White Choco Gateau',
    description: 'A harmonious symphony of citrus zest, delicate sponge, and creamy white chocolate chips crafted for discerning palates.',
    primaryLink: '/categories/signature-gateau-cakes',
    primaryLabel: 'Explore Gateaux',
  },
  {
    src: new URL('../../assets/image1.jpg', import.meta.url).href,
    alt: 'Delectable Chocolate Dream Cake',
    eyebrow: 'Artisanal Chocolate Creations',
    title: 'Delectable Chocolate Dream',
    description: 'Decadent rich dark cocoa layers cloaked in silky Belgian ganache and adorned with hand-carved chocolate shavings.',
    primaryLink: '/categories/chocolate-cakes',
    primaryLabel: 'Discover Chocolate',
  },
  {
    src: new URL('../../assets/img1.jpg', import.meta.url).href,
    alt: 'Berry Burst Fruit Tart',
    eyebrow: 'Fresh Daily Specials',
    title: 'Berry Burst Garden Tart',
    description: 'Crisp butter pastry filled with luscious vanilla bean cream and topped with an abundance of farm-fresh seasonal berries.',
    primaryLink: '/products',
    primaryLabel: 'Order Fresh Treats',
  },
];

const ImagesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section 
      className="hero-slider-section" 
      aria-label="Featured Bakery Highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.src})` }}
        >
          <div className="hero-slide-overlay" />
          <div className="container hero-content-container">
            <div className="hero-content">
              <span className="hero-eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              
              <div className="hero-btn-group">
                <Link to={slide.primaryLink} className="btn btn-primary btn-lg">
                  <span>{slide.primaryLabel}</span>
                  <FaArrowRight />
                </Link>
                <Link to="/offers" className="btn btn-outline hero-secondary-btn btn-lg">
                  View Special Offers
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="slider-arrow slider-arrow-prev" aria-label="Previous Slide">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="slider-arrow slider-arrow-next" aria-label="Next Slide">
        <FaChevronRight />
      </button>

      {/* Slide Indicators */}
      <div className="hero-slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className="hero-dot-bar"></span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ImagesSlider;