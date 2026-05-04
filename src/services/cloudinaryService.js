import axios from 'axios';
import { API_URL } from './config';

/**
 * Upload une image vers Cloudinary via le serveur backend
 * @param {File | string} image - Le fichier image ou la chaîne base64
 * @returns {Promise} Retourne { success, imageUrl, publicId }
 */
export const uploadImageToCloudinary = async (image) => {
  try {
    let imageData;

    // Si c'est un File, convertir en base64 avec compression si nécessaire
    if (image instanceof File) {
      // Compresser si l'image fait plus de 2MB
      if (image.size > 2 * 1024 * 1024) {
        console.log('Compression de l\'image avant upload...');
        imageData = await compressImage(image);
      } else {
        imageData = await fileToBase64(image);
      }
    } else {
      imageData = image; // Supposé être une chaîne base64
    }

    const response = await axios.post(`${API_URL}/upload`, {
      image: imageData
    }, {
      timeout: 60000, // 60 secondes timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      imageUrl: response.data.imageUrl,
      publicId: response.data.publicId
    };

  } catch (error) {
    console.error('Erreur upload Cloudinary:', error);
    throw error;
  }
};

/**
 * Supprime une image de Cloudinary via le serveur backend
 * @param {string} publicId - L'ID public de l'image à supprimer
 * @returns {Promise}
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await axios.delete(`${API_URL}/upload`, {
      data: { publicId }
    });

    return response.data;

  } catch (error) {
    console.error('Erreur suppression Cloudinary:', error);
    throw error;
  }
};

/**
 * Convertit un File en chaîne base64
 * @param {File} file
 * @returns {Promise<string>}
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Compresse une image avant l'upload
 * @param {File} file
 * @param {number} maxWidth - Largeur maximale (défaut: 1920)
 * @param {number} quality - Qualité de compression (0-1, défaut: 0.8)
 * @returns {Promise<string>} Image compressée en base64
 */
export const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculer les nouvelles dimensions en gardant le ratio
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Dessiner et compresser
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        },
        file.type,
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Valide une image avant upload
 * @param {File} file
 * @returns {object} { valid, error }
 */
export const validateImage = (file) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (!file) {
    return { valid: false, error: 'Aucune image sélectionnée' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'L\'image doit être inférieure à 5MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Format non autorisé. Utilisez JPG, PNG, GIF ou WebP' };
  }

  return { valid: true };
};
