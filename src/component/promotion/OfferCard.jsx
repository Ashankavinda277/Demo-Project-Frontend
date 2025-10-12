import React from "react";
import "../../css/promotions.css/offercard.css";
import { useNavigate } from "react-router-dom";

const OfferCard = ({ offer }) => {

    const navigate = useNavigate();

    const offerCardClick = () => {
        navigate('/order');
    };  

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateDiscount = () => {
    return Math.round(
      ((offer.Current_Price - offer.Discount_Price) / offer.Current_Price) * 100
    );
  };

  const descHandler = (desc) => {
    if (desc.length > 20) {
      return desc.slice(0, 40) + "...";
    } else {
      return desc;
    }
  };
  return (
    <div className="offer-card">
      <div className="offer-icon">
        <div className="expiry-date">Expires: {formatDate(offer.End_Date)}</div>
        <img
          src={offer.Icon}
          alt={offer.Promotion_Name}
          className="card-image"
          onError={(e) => {
            e.target.src = "/placeholder-cake.jpg";
            e.target.onerror = null;
          }}
        />
      </div>

      <div className="discount-badge">{calculateDiscount()}% OFF</div>

      <h3 className="product-title">{offer.Promotion_Name}</h3>

      <p className="product-description">{descHandler(offer.Description)}</p>

      <p className="product-weight">Weight: {offer.Weight}</p>

      <div className="price-info">
        <span className="original-price">Price: Rs.{offer.Current_Price}</span>
        <span className="discount-price">
          Discount: Rs.{offer.Discount_Price}
        </span>
      </div>

      <div>
        <button className="cart-button" onClick={offerCardClick}> Order Now</button>
      </div>
    </div>
  );
};

export default OfferCard;
