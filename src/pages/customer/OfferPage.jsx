import React from 'react';
import Navbar from '../../component/common/Navbar/Navbar';
import OfferGrid from '../../component/promotion/OfferGrid';
import Footer from '../../component/common/Footer/Footer';
import '../../css/offerPage.css';

const OfferPage = () => {
  return (
    <>
      <Navbar />
      <main className="offers-page-wrapper">
        <section className="offers-hero-banner">
          <div className="container">
            <span className="eyebrow">Limited Time Delights</span>
            <h1 className="offers-page-title">Special Promotions & Sweet Deals</h1>
            <p className="offers-hero-subtitle">
              Indulge in our artisanal celebration cakes at irresistible promotional pricing. Freshly baked, handcrafted to order.
            </p>
          </div>
        </section>

        <div className="container offers-content-area">
          <OfferGrid />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OfferPage;
