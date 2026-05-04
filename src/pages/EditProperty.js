// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { API_URL } from "../services/config";
// import { uploadImageToCloudinary, deleteImageFromCloudinary, validateImage } from "../services/cloudinaryService";
// import Sidebar from "../components/Admin/Sidebar";

// const EditProperty = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState({
//     title: "",
//     description: "",
//     type: "",
//     status: "",
//     price: "",
//     surface: "",
//     address: "",
//     city: "",
//     image: ""
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [imageUploading, setImageUploading] = useState(false);
//   const [currentImagePublicId, setCurrentImagePublicId] = useState("");

//   useEffect(() => {
//     fetchProperty();
//   }, []);

//   const fetchProperty = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_URL}/properties/${id}`);
//       const propertyData = res.data.property;
//       setProperty(propertyData);
//       setImagePreview(propertyData.image || "");
//     } catch (err) {
//       console.error("Erreur chargement propriété:", err);
//       setMessage("❌ Impossible de charger le bien");
//       setMessageType("danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setProperty({
//       ...property,
//       [e.target.name]: e.target.value
//     });
//   };

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
//     setImageUploading(true);
//     try {
//       const result = await uploadImageToCloudinary(file);
//       setProperty(prev => ({
//         ...prev,
//         image: result.imageUrl
//       }));
//       setCurrentImagePublicId(result.publicId);
//       setMessage("✅ Image uploadée avec succès !");
//       setMessageType("success");
//     } catch (error) {
//       setMessage(`❌ Erreur upload: ${error.message}`);
//       setMessageType("danger");
//       setImagePreview(property.image || "");
//     } finally {
//       setImageUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       await axios.put(`${API_URL}/properties/${id}`, property);

//       setMessage("✅ Bien mis à jour avec succès !");
//       setMessageType("success");

//       setTimeout(() => {
//         navigate("/admin/properties");
//       }, 1500);

//     } catch (err) {
//       console.error("Erreur mise à jour:", err);
//       setMessage("❌ Erreur lors de la modification");
//       setMessageType("danger");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ display: "flex" }}>
//         <Sidebar />
//         <Container className="mt-5 text-center">
//           <Spinner animation="border" />
//           <p className="mt-3">Chargement de la propriété...</p>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4" style={{ maxWidth: "800px", marginBottom: "50px" }}>
//         <h2 className="mb-4">✏️ Modifier un bien</h2>

//         {message && (
//           <Alert variant={messageType} dismissible onClose={() => setMessage("")}>
//             {message}
//           </Alert>
//         )}

//         <Form onSubmit={handleSubmit}>
//           <Row>
//             <Col md={8}>
//               <Form.Group className="mb-3">
//                 <Form.Label>🏠 Titre</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="title"
//                   value={property.title}
//                   onChange={handleChange}
//                   placeholder="Titre de la propriété"
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>📝 Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={4}
//                   name="description"
//                   value={property.description}
//                   onChange={handleChange}
//                   placeholder="Description détaillée..."
//                   required
//                 />
//               </Form.Group>

//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>🏢 Type</Form.Label>
//                     <Form.Select
//                       name="type"
//                       value={property.type}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Sélectionner un type</option>
//                       <option value="maison">Maison</option>
//                       <option value="appartement">Appartement</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>📊 Statut</Form.Label>
//                     <Form.Select
//                       name="status"
//                       value={property.status}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Sélectionner un statut</option>
//                       <option value="a_vendre">À vendre</option>
//                       <option value="a_louer">À louer</option>
//                       <option value="vendu">Vendu</option>
//                       <option value="loue">Loué</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>💰 Prix (FCFA)</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="price"
//                       value={property.price}
//                       onChange={handleChange}
//                       placeholder="500000000"
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>📐 Surface (m²)</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="surface"
//                       value={property.surface}
//                       onChange={handleChange}
//                       placeholder="150"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Form.Group className="mb-3">
//                 <Form.Label>📍 Adresse</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="address"
//                   value={property.address}
//                   onChange={handleChange}
//                   placeholder="Rue de la Paix"
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>🏙️ Ville</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="city"
//                   value={property.city}
//                   onChange={handleChange}
//                   placeholder="Dakar"
//                   required
//                 />
//               </Form.Group>
//             </Col>

//             <Col md={4}>
//               <Form.Group className="mb-3">
//                 <Form.Label>🖼️ Image de la propriété</Form.Label>
//                 <Form.Control
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageSelect}
//                   disabled={imageUploading}
//                 />
//                 {imageUploading && (
//                   <div className="mt-2">
//                     <Spinner animation="border" size="sm" />
//                     <span className="ms-2">Upload en cours...</span>
//                   </div>
//                 )}
//               </Form.Group>

//               {imagePreview && (
//                 <div className="mb-3">
//                   <Form.Label>Aperçu:</Form.Label>
//                   <img
//                     src={imagePreview}
//                     alt="Aperçu"
//                     style={{
//                       width: "100%",
//                       maxHeight: "200px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                       border: "1px solid #ddd"
//                     }}
//                   />
//                 </div>
//               )}
//             </Col>
//           </Row>

//           <div className="d-flex gap-2 mt-4">
//             <Button
//               variant="primary"
//               type="submit"
//               disabled={saving || imageUploading}
//               className="flex-fill"
//             >
//               {saving ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Mise à jour...
//                 </>
//               ) : (
//                 "✅ Mettre à jour"
//               )}
//             </Button>

//             <Button
//               variant="secondary"
//               onClick={() => navigate("/admin/properties")}
//               disabled={saving}
//             >
//               ❌ Annuler
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default EditProperty;