import React from "react";
import "../../css/promotions.css/offercard.css";
import { useNavigate } from "react-router-dom";

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  const offerCardClick = () => {
    navigate("/order");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };
  const calculateDiscount = () => {
    // Add safety checks
    if (!offer.Current_Price || !offer.Discount_Price) return 0;
    return Math.round(
      ((offer.Current_Price - offer.Discount_Price) / offer.Current_Price) * 100
    );
  };

  const descHandler = (desc) => {
    if (!desc) return "No description available";
    if (desc.length > 30) {
      return desc.slice(0, 30) + "...";
    } else {
      return desc;
    }
  };

  return (
    <div className="offer-card">
      <div className="offer-icon">
        <div className="expiry-date">Expires: {formatDate(offer.End_Date)}</div>
        <img
          src={offer.Icon || "/placeholder-cake.jpg"}
          alt={offer.Promotion_Name || "Offer"}
          className="card-image"
          onError={(e) => {
            e.target.src = "/placeholder-cake.jpg";
            e.target.onerror = null;
          }}
        />
      </div>

      <div className="discount-badge">{calculateDiscount()}% OFF</div>

      <h3 className="product-title">
        {offer.Promotion_Name || "Special Offer"}
      </h3>

      <p className="product-description">{descHandler(offer.Description)}</p>

      <p className="product-weight">Weight: {offer.Weight || "N/A"}</p>

      <div className="price-info">
        <span className="original-price">
          Price: Rs.{offer.Current_Price || "0"}
        </span>
        <span className="discount-price">
          Discount: Rs.{offer.Discount_Price || "0"}
        </span>
      </div>

      <div>
        <button className="cart-button" onClick={offerCardClick}>
          {" "}
          Order Now
        </button>
      </div>
    </div>
  );
};
export default OfferCard;
