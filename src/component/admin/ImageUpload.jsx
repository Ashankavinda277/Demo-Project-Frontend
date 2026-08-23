import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes, FaImage } from "react-icons/fa";
import "../../css/ImageUpload.css";

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageChange = (file) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image format (JPEG, PNG, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size should be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Pass file to parent component
      onImageSelect(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="image-upload-wrapper">
      <label 
        htmlFor="image-input" 
        className={`upload-dropzone ${preview ? "has-preview" : ""} ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="image-preview-box">
            <img src={preview} alt="Product Preview" className="preview-img" />
            <div className="preview-overlay">
              <button 
                type="button" 
                className="btn-remove-preview" 
                onClick={handleRemove}
                title="Remove image"
              >
                <FaTimes />
                <span>Remove Photo</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder-content">
            <div className="upload-icon-circle">
              <FaCloudUploadAlt />
            </div>
            <p className="upload-main-text">
              <strong>Click to upload</strong> or drag and drop cake photo
            </p>
            <span className="upload-hint-text">JPEG, PNG, WebP (Max 5MB)</span>
          </div>
        )}
      </label>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
