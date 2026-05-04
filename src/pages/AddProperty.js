import { useState } from "react";
import axios from "axios";
import { API_URL } from "../services/config";
import { uploadImageToCloudinary, validateImage } from "../services/cloudinaryService";
import Sidebar from "../components/Admin/Sidebar";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../styles/AddProperty.css";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    type: "",
    description: "",
    surface: "",
    status:"",
    address: "",
    city: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setMessage(validation.error);
      setMessageType("danger");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result);
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      const result = await uploadImageToCloudinary(file);
      setImageUrl(result.imageUrl);
      setMessage("Image uploadée avec succès !");
      setMessageType("success");
    } catch (error) {
      setMessage(`Erreur upload : ${error.message}`);
      setMessageType("danger");
      setImagePreview("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      setMessage("Veuillez uploader une image.");
      setMessageType("danger");
      return;
    }

    try {
      await axios.post(`${API_URL}/properties`, { ...formData, image: imageUrl });
      setMessage("Bien ajouté avec succès !");
      setMessageType("success");
      setFormData({ title: "", price: "", type: "", description: "",status: "", surface: "", address: "", city: "" });
      setImageUrl("");
      setImagePreview("");
    } catch (error) {
      setMessage(`Erreur : ${error.response?.data?.message || error.message}`);
      setMessageType("danger");
    }
  };

  return (
    <div className="add-property-page">
      <Sidebar />

      <main className="add-property-main">
        <div className="add-property-wrap">

          <p className="add-property-eyebrow">Administration</p>
          <h1 className="add-property-title">Ajouter un bien</h1>
          <div className="add-property-divider" />

          {message && (
            <div className={`add-property-alert add-property-alert--${messageType}`}>
              {message}
            </div>
          )}

          <form className="add-property-form" onSubmit={handleSubmit}>

            {/* image upload */}
            <div className="add-property-group">
              <label className="add-property-label">Image de la propriété</label>
              <label className="add-property-file-label">
                <FaCloudUploadAlt className="add-property-file-icon" />
                {imagePreview
                  ? "Changer l'image"
                  : loading
                  ? "Chargement..."
                  : "Cliquer pour uploader une image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={loading}
                />
              </label>
              {imagePreview && (
                <div className="add-property-preview">
                  <img src={imagePreview} alt="Aperçu" />
                </div>
              )}
            </div>

            {/* titre */}
            <div className="add-property-group">
              <label className="add-property-label">Titre</label>
              <input
                className="add-property-input"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex : Maison moderne à Dakar"
                required
              />
            </div>

            {/* type + prix */}
            <div className="form-row-2">
              <div className="add-property-group">
                <label className="add-property-label">Type</label>
                <select
                  className="add-property-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="maison">Maison</option>
                  <option value="appartement">Appartement</option>
                </select>
              </div>
              <div className="add-property-group">
                <label className="add-property-label">Prix (FCFA)</label>
                <input
                  className="add-property-input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="500 000 000"
                  required
                />
              </div>
            </div>

            {/* surface + ville */}
            <div className="form-row-2">
              <div className="add-property-group">
                <label className="add-property-label">Surface (m²)</label>
                <input
                  className="add-property-input"
                  type="number"
                  name="surface"
                  value={formData.surface}
                  onChange={handleChange}
                  placeholder="150"
                />
              </div>
              <div className="add-property-group">
                <label className="add-property-label">Statut</label>
                <select
                  className="add-property-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="a_vendre">À vendre</option>
                  <option value="a_louer">À louer</option>
                </select>
              </div>
              <div className="add-property-group">
                <label className="add-property-label">Ville</label>
                <input
                  className="add-property-input"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Dakar"
                  required
                />
              </div>
            </div>

            {/* adresse */}
            <div className="add-property-group">
              <label className="add-property-label">Adresse</label>
              <input
                className="add-property-input"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rue de la Paix"
                required
              />
            </div>

            {/* description */}
            <div className="add-property-group">
              <label className="add-property-label">Description</label>
              <textarea
                className="add-property-textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description détaillée du bien..."
                required
              />
            </div>

            <button
              type="submit"
              className="add-property-submit"
              disabled={loading || !imageUrl}
            >
              {loading ? "Chargement..." : "Ajouter le bien"}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProperty;

// import { useState } from "react";
// import axios from "axios";
// import { API_URL } from "../services/config";
// import { uploadImageToCloudinary, validateImage } from "../services/cloudinaryService";
// import { Form, Button, Container, Alert } from "react-bootstrap";
// import Sidebar from "../components/Admin/Sidebar";

// const AddProperty = () => {

//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     type: "",
//     description: "",
//     surface: "",
//     address: "",
//     city: ""
//   });

//   const [imageUrl, setImageUrl] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); // success ou danger
//   const [loading, setLoading] = useState(false);

//   const { title, price, type, description } = formData;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Upload image vers Cloudinary via le serveur
//   const handleImageSelect = async (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     // Valider l'image
//     const validation = validateImage(file);
//     if (!validation.valid) {
//       setMessage(validation.error);
//       setMessageType("danger");
//       return;
//     }

//     // Afficher l'aperçu
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       setImagePreview(ev.target?.result);
//     };
//     reader.readAsDataURL(file);

//     // Upload vers Cloudinary
//     setLoading(true);
//     try {
//       const result = await uploadImageToCloudinary(file);
//       setImageUrl(result.imageUrl);
//       setMessage("✅ Image uploadée avec succès !");
//       setMessageType("success");
//     } catch (error) {
//       setMessage(`❌ Erreur upload: ${error.message}`);
//       setMessageType("danger");
//       setImagePreview("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ajouter le bien
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!imageUrl) {
//       setMessage("❌ Veuillez uploader une image");
//       setMessageType("danger");
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         image: imageUrl,
//       };

//       await axios.post(`${API_URL}/properties`, payload);

//       setMessage("✅ Bien ajouté avec succès !");
//       setMessageType("success");

//       // Réinitialiser le formulaire
//       setFormData({
//         title: "",
//         price: "",
//         type: "",
//         description: "",
//         surface: "",
//         address: "",
//         city: ""
//       });
//       setImageUrl("");
//       setImagePreview("");

//     } catch (error) {
//       setMessage(`❌ Erreur: ${error.response?.data?.message || error.message}`);
//       setMessageType("danger");
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4" style={{ maxWidth: "600px", marginBottom: "50px" }}>

//       <h3 className="mb-4 text-center">Ajouter un bien</h3>

//       {message && <Alert variant={messageType}>{message}</Alert>}

//       <Form onSubmit={handleSubmit}>

//         {/* Image Upload */}
//         <Form.Group className="mb-3">
//           <Form.Label>Image de la propriété</Form.Label>
//           <Form.Control
//             type="file"
//             accept="image/*"
//             onChange={handleImageSelect}
//             disabled={loading}
//             required
//           />
//           {imagePreview && (
//             <div className="mt-3">
//               <img
//                 src={imagePreview}
//                 alt="Aperçu"
//                 style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }}
//               />
//             </div>
//           )}
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Titre</Form.Label>
//           <Form.Control
//             name="title"
//             value={title}
//             onChange={handleChange}
//             placeholder="Ex: Maison moderne à Dakar"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Type</Form.Label>
//           <Form.Select
//             name="type"
//             value={type}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Sélectionner un type</option>
//             <option value="maison">Maison</option>
//             <option value="appartement">Appartement</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Prix (FCFA)</Form.Label>
//           <Form.Control
//             type="number"
//             name="price"
//             value={price}
//             onChange={handleChange}
//             placeholder="500000000"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Surface (m²)</Form.Label>
//           <Form.Control
//             type="number"
//             name="surface"
//             value={formData.surface}
//             onChange={handleChange}
//             placeholder="150"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Adresse</Form.Label>
//           <Form.Control
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Rue de la Paix"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Ville</Form.Label>
//           <Form.Control
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             placeholder="Dakar"
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             name="description"
//             value={description}
//             onChange={handleChange}
//             placeholder="Description détaillée du bien..."
//             required
//           />
//         </Form.Group>

//         <Button
//           variant="primary"
//           type="submit"
//           disabled={loading || !imageUrl}
//           className="w-100"
//         >
//           {loading ? "⏳ Ajout en cours..." : "✅ Ajouter le bien"}
//         </Button>

//       </Form>

//       </Container>
//     </div>
//   );
// };

// export default AddProperty;