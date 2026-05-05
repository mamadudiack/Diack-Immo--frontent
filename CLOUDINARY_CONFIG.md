# 📸 Configuration Cloudinary - Guide Complet

## ✅ Backend - Configuration Complétée

### 1. **Fichier `.env` - Variables d'environnement**
```env
PORT=5010
MONGO_URI=mongodb+srv://mamadou:q6dCcCrBBNSBS606@cluster0.iypnzgz.mongodb.net/ProjetFinal
JWT_SECRET="seccret-keyforfirtsapp51cf68ee-1838-454b-98b3-3db3ed4d1026"
CLOUD_NAME=dulumzgpi
API_KEY=479826755793499
API_SECRET=Q0SbP5K1yxdOiuUo8kYg9bs9djQ
```

### 2. **Serveur Express - Augmenté la limite d'upload**
- ✅ Limite JSON: 50MB
- ✅ Support images base64
- ✅ CORS configuré

### 3. **Routes disponibles**
```
POST   /api/upload          → Uploader une image
DELETE /api/upload          → Supprimer une image (avec publicId)
```

### 4. **Contrôleur amélioré**
- ✅ Validation des images
- ✅ Dossier "properties" sur Cloudinary
- ✅ Retourne: `success`, `imageUrl`, `publicId`

---

## ✅ Frontend - Configuration Complétée

### 1. **Fichier `.env` - Variables React**
```env
REACT_APP_API_URL=http://localhost:5010/api
REACT_APP_CLOUD_NAME=dulumzgpi
REACT_APP_API_KEY=479826755793499
```

### 2. **Service Cloudinary** (`cloudinaryService.js`)
```javascript
// Fonctions disponibles:
- uploadImageToCloudinary(image)    // Upload une image
- deleteImageFromCloudinary(publicId) // Supprime une image
- validateImage(file)               // Valide avant upload
- fileToBase64(file)                // Convertit File → Base64
```

### 3. **Composant ImageUpload** (`ImageUpload.js`)
```javascript
// Utilisation simple:
<ImageUpload 
  onImageUpload={(data) => {
    console.log(data.url);      // URL Cloudinary
    console.log(data.publicId); // ID public
  }}
  label="Ajouter une propriété"
/>
```

**Fonctionnalités:**
- ✅ Validation automatique (taille, format)
- ✅ Aperçu de l'image
- ✅ Indicateur de chargement
- ✅ Gestion des erreurs

---

## 🚀 Utilisation - Exemple Complet

### Dans un composant (ex: `AddProperty.js`)

```javascript
import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import axios from 'axios';
import { API_URL } from '../services/config';

export default function AddProperty() {
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    type: 'maison',
    price: '',
    surface: '',
    address: '',
    city: '',
    image: ''
  });

  const handleImageUpload = (imageData) => {
    setPropertyData(prev => ({
      ...prev,
      image: imageData.url // URL Cloudinary
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${API_URL}/properties`, propertyData);
      console.log('Propriété créée:', response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ImageUpload 
        onImageUpload={handleImageUpload}
        label="Télécharger la photo de la propriété"
      />

      <input 
        type="text"
        placeholder="Titre"
        value={propertyData.title}
        onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
      />

      {/* Autres champs... */}

      <button type="submit">Créer la propriété</button>
    </form>
  );
}
```

---

## 🔧 Dépannage

### **Erreur: "Cannot find module 'cloudinary'"**
```bash
cd serveur
npm install cloudinary
```

### **Erreur: "CORS blocked"**
- Vérifiez que le backend CORS est configuré ✅ (déjà fait)

### **Erreur: "API_KEY invalid"**
- Assurez-vous que les variables `.env` sont correctes
- Relancez le serveur après modification du `.env`

### **Image très lente à charger**
- Cloudinary optimise automatiquement les images
- Les images sont cachées localement par le navigateur

---

## ✨ Prochaines étapes

1. **Adapter les composants existants** pour utiliser `ImageUpload`
2. **Tester l'upload** avec Postman ou le frontend
3. **Configurer la suppression** des images quand une propriété est supprimée

