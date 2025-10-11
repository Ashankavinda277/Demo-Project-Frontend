import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offercard from '../component/promotion/OfferCard';
import '../css/promotion.css/offerGrid.css';


const OfferGrid = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/offers');
            setOffers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch offers');
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchOffers();
        
        // Set up polling for updates every 30000 mili seconds
        const intervalId = setInterval(fetchOffers, 30000);
        
        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div className="loading">Loading offers...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="offer-grid-container">
            <h2>Special Offers</h2>
            <div className="offer-grid">
                {offers.map((offer) => (
                    <Offercard
                        key={offer.id}
                        icon={offer.icon}
                        title={offer.title}
                        weight={offer.weight}
                        description={offer.description}
                        discountPrice={offer.discountPrice}
                        currentPrice={offer.currentPrice}
                        expiryDate={offer.expiryDate}
                    />
                ))}
            </div>
        </div>
    );
};

export default OfferGrid;