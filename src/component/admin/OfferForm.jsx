import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { FaTag, FaCheckCircle, FaExclamationCircle, FaPercent } from "react-icons/fa";
import "../../css/OfferForm.css";

const AddOfferPage = () => {
  const [formData, setFormData] = useState({
    Promotion_Name: "",
    Discount_Price: "",
    End_Date: "",
    Description: "",
    Weight: "",
    Current_Price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
  };

  // Calculate savings percentage
  const calculateSavings = () => {
    if (formData.Current_Price && formData.Discount_Price) {
      const current = parseFloat(formData.Current_Price);
      const discount = parseFloat(formData.Discount_Price);
      if (current > 0 && discount < current) {
        const savings = ((current - discount) / current) * 100;
        return savings.toFixed(1);
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (
        !formData.Promotion_Name ||
        !formData.Discount_Price ||
        !formData.End_Date ||
        !formData.Description ||
        !formData.Weight ||
        !formData.Current_Price
      ) {
        setMessage({
          type: "error",
          text: "Please fill in all required fields marked with *",
        });
        setLoading(false);
        return;
      }

      const currentPrice = parseFloat(formData.Current_Price);
      const discountPrice = parseFloat(formData.Discount_Price);
      const weight = parseFloat(formData.Weight);

      if (currentPrice <= 0 || discountPrice <= 0 || weight <= 0) {
        setMessage({
          type: "error",
          text: "Price and weight must be greater than 0",
        });
        setLoading(false);
        return;
      }

      if (discountPrice >= currentPrice) {
        setMessage({
          type: "error",
          text: "Discount price must be less than regular current price",
        });
        setLoading(false);
        return;
      }

      const endDate = new Date(formData.End_Date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (endDate < today) {
        setMessage({
          type: "error",
          text: "End date cannot be in the past",
        });
        setLoading(false);
        return;
      }

      const data = new FormData();
      data.append("Promotion_Name", formData.Promotion_Name.trim());
      data.append("Discount_Price", discountPrice);
      data.append("End_Date", formData.End_Date);
      data.append("Description", formData.Description.trim());
      data.append("Weight", weight);
      data.append("Current_Price", currentPrice);

      if (imageFile) {
        data.append("icon", imageFile);
      }

      const response = await fetch("http://localhost:5000/api/promotion/add", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Promotional offer created successfully!" });
        setFormData({
          Promotion_Name: "",
          Discount_Price: "",
          End_Date: "",
          Description: "",
          Weight: "",
          Current_Price: "",
        });
        setImageFile(null);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to create offer",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage({ type: "error", text: "Network error: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  const savings = calculateSavings();

  return (
    <div className="admin-page-container">
      <div className="container container-narrow">
        <div className="admin-page-header">
          <span className="eyebrow">Promotions & Marketing</span>
          <h1 className="admin-page-title">Create Special Offer</h1>
          <p className="admin-page-desc">Set up discounted pricing and limited-time deals for customer celebration gateaux.</p>
        </div>

        {message.text && (
          <div className={`admin-alert ${message.type === 'success' ? 'admin-alert-success' : 'admin-alert-error'}`}>
            {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="admin-form-card">
          <form onSubmit={handleSubmit} className="admin-offer-form">
            <div className="form-section-group">
              <label className="section-label">Offer Photo / Banner</label>
              <ImageUpload onImageSelect={handleImageSelect} currentImage={null} />
            </div>

            <div className="form-group">
              <label>Promotion Title *</label>
              <input
                type="text"
                name="Promotion_Name"
                value={formData.Promotion_Name}
                onChange={handleChange}
                placeholder="e.g. Weekend Special Chocolate Gateau"
                required
              />
            </div>

            <div className="form-group">
              <label>Cake Weight (kg) *</label>
              <input
                type="number"
                name="Weight"
                value={formData.Weight}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g. 1.5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Regular Price (Rs) *</label>
                <input
                  type="number"
                  name="Current_Price"
                  value={formData.Current_Price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g. 4500"
                  required
                />
              </div>

              <div className="form-group">
                <label>Discounted Price (Rs) *</label>
                <input
                  type="number"
                  name="Discount_Price"
                  value={formData.Discount_Price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g. 3600"
                  required
                />
              </div>
            </div>

            {savings && (
              <div className="savings-preview-pill">
                <FaPercent className="savings-ico" />
                <span>
                  <strong>Customer Saves {savings}%</strong> (Rs. {(parseFloat(formData.Current_Price) - parseFloat(formData.Discount_Price)).toFixed(2)} off regular price)
                </span>
              </div>
            )}

            <div className="form-group">
              <label>Offer Expiration Date *</label>
              <input
                type="date"
                name="End_Date"
                value={formData.End_Date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
              <small className="field-hint">
                The offer will automatically display the validity badge until this date.
              </small>
            </div>

            <div className="form-group">
              <label>Promotion Description *</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe special features, flavors, or celebration terms..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg admin-submit-btn" disabled={loading}>
              <FaTag />
              <span>{loading ? "Publishing Offer..." : "Launch Special Offer"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOfferPage;