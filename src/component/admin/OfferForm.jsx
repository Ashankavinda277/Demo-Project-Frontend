import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import '../../css/OfferForm.css';

const AddOffer = () => {
  const [formData, setFormData] = useState({
    Promotion_Name: "",
    Promotion_Type: "",
    Discount_Percentage: "",
    Start_Date: "",
    End_Date: "",
    Description: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Validation
      if (
        !formData.Promotion_Name ||
        !formData.Promotion_Type ||
        !formData.Discount_Percentage ||
        !formData.Start_Date ||
        !formData.End_Date ||
        !formData.Description
      ) {
        setMessage({
          type: "error",
          text: "Please fill in all required fields",
        });
        setLoading(false);
        return;
      }

      // Validate discount percentage
      const discount = parseFloat(formData.Discount_Percentage);
      if (discount < 0 || discount > 100) {
        setMessage({
          type: "error",
          text: "Discount percentage must be between 0 and 100",
        });
        setLoading(false);
        return;
      }

      // Validate dates
      const startDate = new Date(formData.Start_Date);
      const endDate = new Date(formData.End_Date);
      if (endDate <= startDate) {
        setMessage({
          type: "error",
          text: "End date must be after start date",
        });
        setLoading(false);
        return;
      }

      const data = {
        Promotion_Name: formData.Promotion_Name.trim(),
        Promotion_Type: formData.Promotion_Type,
        Discount_Percentage: discount,
        Start_Date: formData.Start_Date,
        End_Date: formData.End_Date,
        Description: formData.Description.trim(),
      };

      console.log("Submitting offer data:", data);

      const response = await fetch("/api/offer/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Offer added successfully!" });
        // Reset form
        setFormData({
          Promotion_Name: "",
          Promotion_Type: "",
          Discount_Percentage: "",
          Start_Date: "",
          End_Date: "",
          Description: "",
        });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to add offer",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setMessage({ type: "error", text: "Error: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="add-product-page">
      <div className="container">
        <h1>Add New Offer</h1>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="offer-form">
            <ImageUpload onImageSelect={handleImageSelect} currentImage={null} /> 
          <div className="form-group">
            <label>Promotion Name *</label>
            <input
              type="text"
              name="Promotion_Name"
              value={formData.Promotion_Name}
              onChange={handleChange}
              placeholder="e.g., Summer Sale, Weekend Special"
              required
            />
          </div>

          <div className="form-group">
            <label>Promotion Type *</label>
            <select
              name="Promotion_Type"
              value={formData.Promotion_Type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="seasonal">Seasonal Offer</option>
              <option value="flash-sale">Flash Sale</option>
              <option value="weekend-special">Weekend Special</option>
              <option value="holiday-promo">Holiday Promotion</option>
              <option value="bulk-discount">Bulk Discount</option>
              <option value="clearance">Clearance Sale</option>
            </select>
          </div>

          <div className="form-group">
            <label>Discount Percentage (%) *</label>
            <input
              type="number"
              name="Discount_Percentage"
              value={formData.Discount_Percentage}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              placeholder="e.g., 15"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                name="Start_Date"
                value={formData.Start_Date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date *</label>
              <input
                type="date"
                name="End_Date"
                value={formData.End_Date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the offer details, terms and conditions..."
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Offer..." : "Add Offer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;