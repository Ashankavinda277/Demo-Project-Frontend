import React from 'react';
import { Link } from 'react-router-dom';
import MainOfferCard from '../component/home/Main-OfferCard';
import { FaTag, FaArrowRight } from 'react-icons/fa';
import '../css/home.css/Main-OfferGrids.css';

const MainOfferGrid = () => {
  const offers = [
    {
      id: 1,
      image: new URL('../assets/img6.jpeg', import.meta.url).href,
      title: 'Celebration Grand Offer',
      subtitle: 'Premium tiered gateaux with custom frosting',
      discount: '20% OFF',
      validity: 'Limited Time Deal',
    },
    {
      id: 2,
      image: new URL('../assets/img4.jpeg', import.meta.url).href,
      title: 'Romantic Sweetheart Special',
      subtitle: 'Hand-dipped strawberries & chocolate ganache',
      discount: '15% OFF',
      validity: 'Weekend Special',
    },
    {
      id: 3,
      image: new URL('../assets/img3.jpeg', import.meta.url).href,
      title: 'Festive Delight Hamper',
      subtitle: 'Assorted muffins, tarts & mini gateaux',
      discount: '25% OFF',
      validity: 'Seasonal Exclusive',
    },
  ];

  return (
    <section className="main-offer-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <FaTag className="eyebrow-icon" /> Limited Time Deals
          </span>
          <h2>Exclusive Offers & Sweet Deals</h2>
          <p>
            Unwrap irresistible savings on your favorite handcrafted treats—because every celebration deserves extra sweetness without compromise.
          </p>
        </div>

        <div className="main-offer-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-col">
              <MainOfferCard 
                image={offer.image}
                title={offer.title}
                subtitle={offer.subtitle}
                discount={offer.discount}
                validity={offer.validity}
              />
            </div>
          ))}
        </div>

        <div className="offer-cta-container">
          <Link to="/offers" className="btn btn-primary btn-lg">
            <span>View All Current Promotions</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainOfferGrid;