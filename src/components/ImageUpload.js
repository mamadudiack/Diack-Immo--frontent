import React, { useState } from 'react';
import { uploadImageToCloudinary, validateImage } from '../services/cloudinaryService';
import './ImageUpload.css';

const ImageUpload = ({ onImageUpload, label = 'Télécharger une image' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Valider l'image
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error);
      setPreview(null);
      return;
    }

    setError(null);
    setFileName(file.name);

    // Afficher un aperçu
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result);
    };
    reader.readAsDataURL(file);

    // Upload vers Cloudinary
    setLoading(true);
    try {
      const result = await uploadImageToCloudinary(file);
      
      onImageUpload({
        url: result.imageUrl,
        publicId: result.publicId,
        fileName: file.name
      });

      setError(null);
    } catch (err) {
      setError(`Erreur upload: ${err.message}`);
      setPreview(null);
      setFileName(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <div className="upload-box">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="file-input"
        />
        <label htmlFor="imageInput" className="upload-label">
          {loading ? '📤 Upload en cours...' : `📸 ${label}`}
        </label>
      </div>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Aperçu" className="image-preview" />
          <p className="file-name">{fileName}</p>
        </div>
      )}

      {error && <p className="error-message">❌ {error}</p>}
    </div>
  );
};

export default ImageUpload;
