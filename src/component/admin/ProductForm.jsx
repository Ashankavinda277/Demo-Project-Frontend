import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import "../../css/ProductForm.css";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    Product_Name: "",
    Product_Type: "",
    Price: "",
    Description: "",
    Weight: "",
    status: "active",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (
        !formData.Product_Name ||
        !formData.Product_Type ||
        !formData.Price ||
        !formData.Description ||
        !formData.Weight
      ) {
        setMessage({
          type: "error",
          text: "Please fill in all required fields",
        });
        setLoading(false);
        return;
      }

      const data = new FormData();
      data.append("Product_Name", formData.Product_Name.trim());
      data.append("Product_Type", formData.Product_Type);
      data.append("Price", parseFloat(formData.Price));
      data.append("Description", formData.Description.trim());
      data.append("Weight", parseFloat(formData.Weight));
      data.append("status", formData.status);

      if (imageFile) {
        data.append("image", imageFile);
      }

      console.log("Submitting form data:", {
        Product_Name: formData.Product_Name,
        Product_Type: formData.Product_Type,
        Price: formData.Price,
        Description: formData.Description,
        Weight: formData.Weight,
        status: formData.status,
      });

      const response = await fetch("/api/product/add", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Product added successfully!" });
        setFormData({
          Product_Name: "",
          Product_Type: "",
          Price: "",
          Description: "",
          Weight: "",
          status: "active",
        });
        setImageFile(null);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to add product",
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
        <h1>Add New Product</h1>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <ImageUpload onImageSelect={handleImageSelect} currentImage={null} />

          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="Product_Name"
              value={formData.Product_Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Product Type *</label>
            <select
              name="Product_Type"
              value={formData.Product_Type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="birthday-cakes">Birthday Cakes</option>
              <option value="wedding-cakes">Wedding Cakes</option>
              <option value="muffins">Muffins</option>
              <option value="chocolate-cakes">Chocolate Cakes</option>
              <option value="signature-gateau-cakes">
                Signature Gateau Cakes
              </option>
              <option value="cup-cakes">Others</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (Rs) *</label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Weight (kg) *</label>
              <input
                type="number"
                name="Weight"
                value={formData.Weight}
                onChange={handleChange}
                min="0"
                step="0.01"
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
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
