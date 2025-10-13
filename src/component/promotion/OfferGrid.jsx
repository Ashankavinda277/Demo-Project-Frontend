import React, { useState, useEffect } from "react";
import Offercard from "./OfferCard";
import offerService from "../../services/offerAPI";
import "../../css/promotions.css/offerGrid.css";

const OfferGrid = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await offerService.getAllOffers();
        console.log("Full API Response:", response); // Debug log

        // Handle different response structures
        let offersData = [];
        
        if (Array.isArray(response)) {
          offersData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          offersData = response.data; // If data is nested
        } else if (response?.offers && Array.isArray(response.offers)) {
          offersData = response.offers; // Alternative nesting
        }

        console.log("Processed offers:", offersData); // Debug log
        
        if (offersData.length > 0) {
          setOffers(offersData);
        } else {
          setError("No offers found in the database");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError(`Failed to fetch offers: ${err.message}`);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <div className="loading">Loading offers...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="offer-grid-container">
      <h2>Featured Offers</h2>
      <div className="offer-grid">
        {offers.length > 0 ? (
          offers.map((offer) => <Offercard key={offer._id} offer={offer} />)
        ) : (
          <div className="no-offers">No offers available</div>
        )}
      </div>
    </div>
  );
};

export default OfferGrid;