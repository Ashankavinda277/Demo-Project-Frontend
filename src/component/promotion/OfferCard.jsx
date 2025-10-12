
  import React from "react";
import '../../css/promotions.css/offercard.css'



const OfferCard = ({ offer }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const calculateDiscount = () => {
        return Math.round(
            ((offer.Current_Price - offer.Discount_Price) / offer.Current_Price) * 100
        );
    };

    return (
        <div className="offer-card">
              <div className="offer-icon">
                <div className="expiry-date">
                Expires: {formatDate(offer.End_Date)}
            </div>
                  <img 
                      src={offer.Icon} 
                      alt={offer.Promotion_Name}
                      className="card-image"
                      onError={(e) => {
                          e.target.src = '/placeholder-cake.jpg';
                          e.target.onerror = null;}}/>
           
               </div> 

              <div className="discount-badge">
                    {calculateDiscount()}% OFF
                </div>

            <h3 className="product-title">{offer.Promotion_Name}</h3>
            <p className="product-description">{offer.Description}</p>
            <p className="product-weight">Weight: {offer.Weight}</p>
            
            {/* <img className="product-icon" src={offer.Icon} alt={offer.Promotion_Name} /> */}

            <div className="price-info">
                <span className="original-price">Price: Rs.{offer.Current_Price}</span>
                <span className="discount-price">Discount: Rs.{offer.Discount_Price}</span>
            </div>
            
            
            
            <button className="add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    );
};

export default OfferCard;

// const OfferCard = ({ offer }) => {
//     return (
//         <div>
//             <h3>{offer.Promotion_Name}</h3>
//             <p>{offer.Description}</p>
//             <p>Price: Rs.{offer.Current_Price}</p>
//             <p>Discount: Rs.{offer.Discount_Price}</p>
//             <button>Add to Cart</button>
//         </div>
//     );
// };

// export default OfferCard;

// const OfferCard = ({ offer }) => {
//     const discountPercentage = Math.round(
//         ((offer.Current_Price - offer.Discount_Price) / offer.Current_Price) * 100
//     );

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString();
//     };

//     return (
//         <div className="offer-card">
//             <div className="expires">
//                 Expires: {formatDate(offer.End_Date)}
//             </div>
            
//             <div className="offer-icon">
//                 <img 
//                     src={offer.Icon} 
//                     alt={offer.Promotion_Name}
//                     className="card-image"
//                     onError={(e) => {
//                         e.target.src = '/placeholder-cake.jpg';
//                         e.target.onerror = null;
//                     }}
//                 />
//                 <div className="discount-badge">
//                     {discountPercentage}% OFF
//                 </div>
//             </div>

//             <h3>{offer.Promotion_Name}</h3>
//             <p>{offer.Description}</p>

//             <div className="price-info">
//                 <span className="original-price">Rs. {offer.Current_Price}</span>
//                 <span className="discount-price">Rs. {offer.Discount_Price}</span>
//             </div>

//             <button className="add-to-cart">
//                 Add to Cart
//             </button>
//         </div>
//     );
// };

// export default OfferCard;

// latest working code
// const OfferCard = ({
//     icon,
//     title,
//     weight,
//     description,
//     discountPrice,
//     currentPrice,
//     expiryDate,
//     onAddToCart
// }) => {
//     const discountPercentage = Math.round(
//         ((currentPrice - discountPrice) / currentPrice) * 100
//     );

//     return (
//         <div className="offer-card">
//             <div className="offer-icon">
//                 <img 
//                     src={icon} 
//                     alt={`${title}`} 
//                     className="card-image"
//                     onError={(e) => {
//                         e.target.src = '/placeholder-cake.jpg'; // Add a placeholder image
//                         e.target.onerror = null;
//                     }}
//                 />
//                 <div className="discount-badge">
//                     <span>{discountPercentage}% OFF</span>
//                 </div>
//                 <div className="expiry-date">
//                     <p>Expires: {expiryDate}</p>
//                 </div>
//             </div>

//             <div className="offer-content">
//                 <h3 className="product-title">{title}</h3>
//                 <h4 className="product-weight">{weight}</h4>
//                 <p className="product-description">{description}</p>
//             </div>

//             <div className="offer-price">
//                 <div className="price-row">
//                     <span className="original-price">Rs.{currentPrice}</span>
//                     <span className="discounted-price">Rs.{discountPrice}</span>
//                 </div>
//             </div>

//             <div className="offer-action">
//                 <button
//                     className="add-to-cart-btn"
//                     onClick={onAddToCart}
//                     aria-label={`Add ${title} to cart`}
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default OfferCard;

// const OfferCard = ({
//   icon,
//   title,
//   weight,
//   description,
//   discountPrice,
//   currentPrice,
//   expiryDate,
//   onAddToCart,
// }) => {
//   const discountPercentage = Math.round(
//     ((currentPrice - discountPrice) / currentPrice) * 100
//   );

//   const handleAddToCart = () => {
//     if (onAddToCart) {
//       onAddToCart({
//         title,
//         weight,
//         discountPrice,
//         currentPrice,
//       });
//     }
//   };

//   return (
//     <div className="offer-card">
//       <div className="offer-icon">
//         <img src={icon} alt={`${title} - ${weight}`} className="card-image" />

//         <div className="discount-badge">
//           <span>{discountPercentage}% OFF</span>
//         </div>

//         <div className="expiry-date">
//           <p>Expires: {expiryDate}</p>
//         </div>
//       </div>

//       <div className="offer-content">
//         <h3 className="product-title">{title}</h3>
//         <h4 className="product-weight">{weight}</h4>
//         <p className="product-description">{description}</p>
//       </div>

//       <div className="offer-price">
//         <div className="price-row">
//           <span className="original-price">Rs.{currentPrice}</span>

//           <span className="discounted-price">Rs.{discountPrice}</span>
//         </div>
//       </div>

//       <div className="offer-action">
//         <button
//           className="add-to-cart-btn"
//           onClick={handleAddToCart}
//           aria-label={`Add ${title} to cart`}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OfferCard;
