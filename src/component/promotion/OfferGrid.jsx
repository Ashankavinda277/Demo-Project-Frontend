import React, { useState, useEffect } from 'react';
import Offercard from './OfferCard';
import offerService from '../../services/offerAPI';
import '../../css/promotions.css/offerGrid.css';

const OfferGrid = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await offerService.getAllOffers();
                console.log('Offers data:', response);
                if (Array.isArray(response)) {
                    setOffers(response);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching offers:', err);
                setError('Failed to fetch offers');
                setLoading(false);
            }
        };

        fetchOffers();
        // Remove any intervals or additional fetches
    }, []); // Empty dependency array

    if (loading) return <div className="loading">Loading offers...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="offer-grid-container">
            <h2>Featured Offers</h2>
            <div className="offer-grid">
                {offers.length > 0 ? (
                    offers.map((offer) => (
                        <Offercard
                            key={offer._id}
                            offer={offer}
                        />
                    ))
                ) : (
                    <div className="no-offers">No offers available</div>
                )}
            </div>
        </div>
    );
};

export default OfferGrid;




//latestm
// import React, { useState, useEffect } from 'react';
// import Offercard from './OfferCard';
// import offerService from '../../services/offerAPI';
// import '../../css/promotions.css/offerGrid.css';


// const OfferGrid = () => {
//     const [offers, setOffers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchOffers = async () => {
//         try {
//             const response = await offerService.getAllOffers();
//             console.log('Raw response:', response);
//             setOffers(response || []);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching offers:', err);
//             setError('Failed to fetch offers');
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         fetchOffers();
       
//     }, []);

//     if (loading) return <div className="loading">Loading offers...</div>;
//     if (error) return <div className="error">{error}</div>;

//     return (
//         <div className="offer-grid-container">
//             <h2>Featured Offers</h2>
//             <div className="offer-grid">
//                 {Array.isArray(offers) && offers.length > 0 ? (
//                     offers.map((offer) => (
//                         <Offercard
//                             key={offer._id}
//                             offer={offer}
//                         />
//                     ))
//                 ) : (
//                     <div className="no-offers">No offers available</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OfferGrid;




//  latest working code
// const OfferGrid = () => {
//     const [offers, setOffers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchOffers = async () => {
//         try {
//             const data = await offerService.getAllOffers();
//             console.log('Response data:', data);
//             setOffers(data);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching offers:', err);
//             setError('Failed to fetch offers');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOffers();
//     }, []);

//     if (loading) return <div className="loading">Loading offers...</div>;
//     if (error) return <div className="error">{error}</div>;

//     return (
//         <div className="offer-grid-container">
//             <h2>Featured Offers</h2>
//             <div className="offer-grid">
//                 {(!offers || offers.length === 0) ? (
//                     <div className="no-offers">No offers available</div>
//                 ) : (
//                     offers.map((offer) => (
//                         <Offercard
//                             key={offer._id}
//                             {...offer}
//                         />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OfferGrid;


// const OfferGrid = () => {
//     const [offers, setOffers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchOffers = async () => {
//         try {
//             const data = await offerService.getAllOffers();
//             console.log('Offers fetched:', data);
//             setOffers(data || []);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching offers:', err);
//             setError('Failed to fetch offers');
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOffers();
//     }, []);

//     if (loading) return <div className="loading">Loading offers...</div>;
//     if (error) return <div className="error">{error}</div>;

//     return (
//         <div className="offer-grid-container">
//             <h2>Featured Offers</h2>
//             <div className="offer-grid">
//                 {offers.length === 0 ? (
//                     <div className="no-offers">No offers available</div>
//                 ) : (
//                     offers.map((offer) => (
//                         <Offercard
//                             key={offer._id}
//                             icon={offer.Icon}
//                             title={offer.Promotion_Name}
//                             weight={offer.Weight}
//                             description={offer.Description}
//                             discountPrice={offer.Discount_Price}
//                             currentPrice={offer.Current_Price}
//                             expiryDate={new Date(offer.End_Date).toLocaleDateString()}
//                             onAddToCart={() => console.log('Added to cart:', offer)}
//                         />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OfferGrid;



// const OfferGrid = ({ onAddToCart }) => {
//     const [offers, setOffers] = useState([]);  // ✅ Initialize as empty ARRAY
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchOffers = async () => {
//         try {
//             setLoading(true);
//             const data = await offerService.getAllOffers();
//             console.log('Offers fetched:', data);
            
//             // ✅ Check if data is array or object
//             if (Array.isArray(data)) {
//                 setOffers(data);  // ✅ If array, set directly
//             } else if (data && typeof data === 'object') {
//                 setOffers([data]);  // ✅ If single object, wrap in array
//             } else {
//                 setOffers([]);  // ✅ Fallback to empty array
//             }
            
//             setError(null);
//         } catch (err) {
//             console.error('Error fetching offers:', err);
//             setError('Failed to load offers. Please try again later.');
//             setOffers([]);  // ✅ Reset to empty array on error
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOffers();
//         const intervalId = setInterval(fetchOffers, 30000);
//         return () => clearInterval(intervalId);
//     }, []);

//     if (loading) {
//         return <div className="loading">Loading amazing offers...</div>;
//     }

//     if (error) {
//         return <div className="error">{error}</div>;
//     }

//     return (
//         <div className="offer-grid-container">
//             <h2>Featured Offers</h2>
//             <div className="offer-grid">
//                 {offers?.length === 0 ? (  // ✅ Safe optional chaining
//                     <div className="no-offers">No offers available at the moment</div>
//                 ) :       offers?.map((offer) => (  // ✅ Now safely maps array
//                     /  <OfferCard
//                     /      key={offer._id}
//                          icon={offer.icon}
//                             title={offer.title}
//                             weight={offer.weight}
//                             description={offer.Description}
//                             currentPrice={offer.currentPrice}
//                             discountPrice={offer.discountPrice}
//                             expiryDate={offer.expiryDate}
//                             onAddToCart={onAddToCart}
//                         />
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OfferGrid;