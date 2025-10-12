import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
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
      // Validation
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
          text: "Please fill in all required fields",
        });
        setLoading(false);
        return;
      }

      // Validate prices
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
          text: "Discount price must be less than current price",
        });
        setLoading(false);
        return;
      }

      // Validate end date
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

      console.log("Submitting offer data:", {
        Promotion_Name: formData.Promotion_Name,
        Discount_Price: discountPrice,
        End_Date: formData.End_Date,
        Description: formData.Description,
        Weight: weight,
        Current_Price: currentPrice,
        hasIcon: !!imageFile,
      });

      const response = await fetch("/api/promotion/add", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Offer added successfully!" });
        // Reset form
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

  const savings = calculateSavings();

  return (
    <div className="add-offer-page">
      <div className="container">
        <h1>Create New Offer</h1>
        <p className="subtitle">Set up special promotional pricing for your products</p>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="offer-form">
          <div className="form-section">
            <h3 className="form-section-title">Offer Icon</h3>
            <ImageUpload onImageSelect={handleImageSelect} currentImage={null} />
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Basic Information</h3>
            
            <div className="form-group">
              <label>
                Promotion Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="Promotion_Name"
                value={formData.Promotion_Name}
                onChange={handleChange}
                placeholder="e.g., Weekend Special Chocolate Cake"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Weight (kg) <span className="required">*</span>
              </label>
              <input
                type="number"
                name="Weight"
                value={formData.Weight}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g., 1.5"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Pricing Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>
                  Current Price (Rs) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="Current_Price"
                  value={formData.Current_Price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 2500"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Discount Price (Rs) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="Discount_Price"
                  value={formData.Discount_Price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 1999"
                  required
                />
              </div>
            </div>

            {savings && (
              <div className="savings-display">
                <span className="savings-badge">
                  🎉 Save {savings}% (Rs {(parseFloat(formData.Current_Price) - parseFloat(formData.Discount_Price)).toFixed(2)})
                </span>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Offer Duration</h3>
            
            <div className="form-group">
              <label>
                End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                name="End_Date"
                value={formData.End_Date}
                onChange={handleChange}
                required
              />
              <p className="date-info">
                Offer will be active until the selected end date
              </p>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Description</h3>
            
            <div className="form-group">
              <label>
                Offer Description <span className="required">*</span>
              </label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the offer details, terms and conditions..."
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating Offer..." : "Create Offer"}
          </button>

          <div className="form-footer">
            All fields marked with <span style={{color: '#e53e3e'}}>*</span> are required
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOfferPage;