import React, { useState } from "react";
import "../../css/ImageUpload.css";

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
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

  const handleRemove = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="image-upload">
      <label htmlFor="image-input" className="upload-label">
        {preview ? (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
            <button type="button" className="remove-btn" onClick={handleRemove}>
              ✕
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v16m8-8H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p>Click to upload image</p>
            <span>JPEG, PNG, or WebP (Max 5MB)</span>
          </div>
        )}
      </label>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
