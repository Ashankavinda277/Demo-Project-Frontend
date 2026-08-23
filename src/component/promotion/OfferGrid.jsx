import React, { useState, useEffect } from "react";
import OfferCard from "./OfferCard";
import offerService from "../../services/offerAPI";
import { FaTag, FaExclamationCircle } from "react-icons/fa";
import "../../css/promotions.css/offerGrid.css";

const OfferGrid = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await offerService.getAllOffers();
        console.log("Full API Response:", response);

        // Handle different response structures
        let offersData = [];
        if (Array.isArray(response)) {
          offersData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          offersData = response.data;
        } else if (response?.offers && Array.isArray(response.offers)) {
          offersData = response.offers;
        }

        if (offersData.length > 0) {
          setOffers(offersData);
        } else {
          setOffers([]);
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError("Could not load promotional offers. Please ensure backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading current promotional discounts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Promotions Unavailable</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="offer-grid-wrapper">
      {offers.length > 0 ? (
        <div className="promotions-grid">
          {offers.map((offer) => (
            <OfferCard key={offer._id || offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <div className="empty-offers-card">
          <div className="empty-offers-icon">🎁</div>
          <h3>No Active Offers Right Now</h3>
          <p>We are preparing seasonal festive discounts. Check back soon or explore our everyday signature menu.</p>
        </div>
      )}
    </div>
  );
};

export default OfferGrid;