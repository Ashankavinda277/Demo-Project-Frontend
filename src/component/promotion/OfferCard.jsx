import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaBolt, FaWeightHanging } from "react-icons/fa";
import "../../css/promotions.css/offercard.css";

const PLACEHOLDER_CAKE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80";

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  const offerCardClick = () => {
    navigate("/order", { state: { offer } });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Limited Time";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDiscount = () => {
    if (!offer.Current_Price || !offer.Discount_Price) return null;
    const current = Number(offer.Current_Price);
    const discount = Number(offer.Discount_Price);
    if (current <= 0 || discount >= current) return null;
    return Math.round(((current - discount) / current) * 100);
  };

  const discountPercent = calculateDiscount();

  return (
    <div className="promo-card">
      <div className="promo-card-visual">
        <img
          src={offer.Icon || PLACEHOLDER_CAKE}
          alt={offer.Promotion_Name || "Offer Cake"}
          className="promo-image"
          onError={(e) => {
            e.target.src = PLACEHOLDER_CAKE;
            e.target.onerror = null;
          }}
        />
        {discountPercent && (
          <div className="promo-ribbon">
            <span>{discountPercent}% OFF</span>
          </div>
        )}
        <div className="promo-expiry-pill">
          <FaClock className="expiry-icon" />
          <span>Valid until: {formatDate(offer.End_Date)}</span>
        </div>
      </div>

      <div className="promo-card-body">
        <h3 className="promo-title">{offer.Promotion_Name || "Special Offer"}</h3>
        <p className="promo-desc">
          {offer.Description || "Handcrafted celebration gateau prepared with our secret recipe and finest Belgian chocolate."}
        </p>

        {offer.Weight && (
          <div className="promo-weight-badge">
            <FaWeightHanging className="weight-ico" />
            <span>Weight: {offer.Weight} kg</span>
          </div>
        )}

        <div className="promo-price-block">
          <div className="price-compare-stack">
            {offer.Current_Price && (
              <span className="promo-original-price">
                Regular: Rs. {Number(offer.Current_Price).toFixed(2)}
              </span>
            )}
            <span className="promo-deal-price">
              Rs. {Number(offer.Discount_Price || 0).toFixed(2)}
            </span>
          </div>

          <button className="btn btn-primary promo-order-btn" onClick={offerCardClick}>
            <FaBolt />
            <span>Order Deal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
