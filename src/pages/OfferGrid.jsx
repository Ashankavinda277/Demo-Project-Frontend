import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Offercard from '../component/promotion/OfferCard';
import '../css/promotion.css/offerGrid.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OfferGrid = () =>{
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const fetchOffers = async () => {
        try {
            const response = await axios.get('/promotion'); // Updated endpoint
            console.log('Response:', response.data);
            setOffer(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching offers:', err);
            setError('Failed to fetch offers');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffer();
        const intervalId = setInterval(fetchOffers, 30000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div className="loading">Loading offers...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="offer-grid-container">
            <h2>Special Offers</h2>
            <div className="offer-grid">
                {offer?.length === 0 ? (
                    <div className="no-offers">No offers available</div>
                ) : (
                    offer?.map((offer) => (
                        <Offercard
                            key={offer._id} // Changed from id to _id for MongoDB
                            {...offer}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default OfferGrid;