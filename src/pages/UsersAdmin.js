import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Admin/Sidebar";
import { API_URL } from "../services/config";
import "../styles/UsersAdmin.css";

const clientTypeConfig = {
  locataire: { label: "Locataire", className: "badge-locataire" },
  acheteur:  { label: "Acheteur",  className: "badge-acheteur"  },
};

const roleConfig = {
  admin: { label: "Admin", className: "badge-admin" },
  user:  { label: "User",  className: "badge-user"  },
};

const renderBadge = (config, value) => {
  const c = config[value] ?? { label: "Non défini", className: "badge-undefined" };
  return <span className={c.className}>{c.label}</span>;
};

const EMPTY_USER = { fullname: "", email: "", phone: "", password: "", clientType: "locataire" };

const UsersAdmin = () => {
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser]     = useState(EMPTY_USER);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data.users || []);
      setError("");
    } catch {
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, newUser);
      setShowModal(false);
      setNewUser(EMPTY_USER);
      fetchUsers();
    } catch {
      setError("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchUsers();
    } catch {
      setError("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="users-page">
      <Sidebar />

      <main className="users-main">

        <div className="users-header">
          <div className="users-header-left">
            <p className="users-eyebrow">Administration</p>
            <h1 className="users-title">Utilisateurs</h1>
            <div className="users-divider" />
          </div>
          <button className="btn-add-user" onClick={() => setShowModal(true)}>
            + Ajouter
          </button>
        </div>

        {error && <div className="users-alert">{error}</div>}

        {loading ? (
          <div className="users-loading">Chargement...</div>
        ) : (
          <div className="users-table-wrap">
            {users.length === 0 ? (
              <p className="users-empty">Aucun utilisateur trouvé.</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Type client</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user._id}>
                      <td className="cell-index">{i + 1}</td>
                      <td className="cell-name">{user.fullname}</td>
                      <td className="cell-email">{user.email}</td>
                      <td className="cell-phone">{user.phone}</td>
                      <td>{renderBadge(clientTypeConfig, user.clientType)}</td>
                      <td>{renderBadge(roleConfig, user.role)}</td>
                      <td>
                        {user.role !== "admin" && (
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Supprimer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>

              <div className="modal-header">
                <h2 className="modal-title">Ajouter un utilisateur</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>

              <form onSubmit={handleAddUser}>
                <div className="modal-body">

                  <div className="modal-group">
                    <label className="modal-label">Nom complet</label>
                    <input
                      className="modal-input"
                      type="text"
                      name="fullname"
                      value={newUser.fullname}
                      onChange={handleChange}
                      placeholder="votre nom complet"
                      required
                    />
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Email</label>
                    <input
                      className="modal-input"
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.com"
                      required
                    />
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Téléphone</label>
                    <input
                      className="modal-input"
                      type="text"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleChange}
                      placeholder="+221 77 000 00 00"
                      required
                    />
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Mot de passe</label>
                    <input
                      className="modal-input"
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="modal-group">
                    <label className="modal-label">Type client</label>
                    <select
                      className="modal-select"
                      name="clientType"
                      value={newUser.clientType}
                      onChange={handleChange}
                    >
                      <option value="locataire">Locataire</option>
                      <option value="acheteur">Acheteur</option>
                    </select>
                  </div>

                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Fermer
                  </button>
                  <button type="submit" className="btn-submit">
                    Ajouter
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default UsersAdmin;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import {Container,Table,Alert,Spinner,Badge,Button,Modal,Form} from "react-bootstrap";
// import Sidebar from "../components/Admin/Sidebar";
// import { API_URL } from "../services/config";

// const UsersAdmin = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // modal ajout utilisateur
//   const [showModal, setShowModal] = useState(false);

//   const [newUser, setNewUser] = useState({
//     fullname: "",
//     email: "",
//     phone: "",
//     password: "",
//     clientType: ""
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // récupérer les utilisateurs
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(`${API_URL}/users`);

//       setUsers(response.data.users || []);
//       setError("");

//     } catch (err) {
//       console.error(err);
//       setError("Impossible de charger les utilisateurs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // gestion formulaire ajout
//   const handleChange = (e) => {
//     setNewUser({
//       ...newUser,
//       [e.target.name]: e.target.value
//     });
//   };

//   // ajouter utilisateur
//   const handleAddUser = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`${API_URL}/auth/register`, newUser);

//       setShowModal(false);

//       setNewUser({
//         fullname: "",
//         email: "",
//         phone: "",
//         password: "",
//         clientType: ""
//       });

//       fetchUsers();

//     } catch (error) {
//       console.error("Erreur ajout utilisateur :", error);
//       alert("Erreur lors de l'ajout");
//     }
//   };

//   // supprimer utilisateur
//   const handleDeleteUser = async (id) => {
//     const confirmDelete = window.confirm(
//       "Voulez-vous vraiment supprimer cet utilisateur ?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API_URL}/users/${id}`);

//       fetchUsers();

//     } catch (error) {
//       console.error("Erreur suppression :", error);
//       alert("Erreur lors de la suppression");
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2>Liste des utilisateurs</h2>

//           <Button
//             variant="primary"
//             onClick={() => setShowModal(true)}
//           >
//             + Ajouter utilisateur
//           </Button>
//         </div>

//         {error && (
//           <Alert variant="danger">
//             {error}
//           </Alert>
//         )}

//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : (
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Nom</th>
//                 <th>Email</th>
//                 <th>Téléphone</th>
//                 <th>Type client</th>
//                 <th>Rôle</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.length > 0 ? (
//                 users.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>{user.fullname}</td>
//                     <td>{user.email}</td>
//                     <td>{user.phone}</td>

//                     <td>
//                       <Badge
//                         bg={
//                           user.clientType === "locataire"
//                             ? "primary"
//                             : user.clientType === "acheteur"
//                             ? "success"
//                             : "secondary"
//                         }
//                       >
//                         {user.clientType === "locataire"
//                           ? "Locataire"
//                           : user.clientType === "acheteur"
//                           ? "Acheteur"
//                           : "Non défini"}
//                       </Badge>
//                     </td>

//                     <td>
//                       <Badge
//                         bg={
//                           user.role === "admin"
//                             ? "danger"
//                             : "secondary"
//                         }
//                       >
//                         {user.role}
//                       </Badge>
//                     </td>

//                     <td>
//                         {user.role !== "admin" && (
//                       <Button
//                        variant="danger"
//                        size="sm"
//                       onClick={() => handleDeleteUser(user._id)}
//                    >
//                       Supprimer
//                      </Button>
//            )}
                      
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="text-center"
//                   >
//                     Aucun utilisateur trouvé
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}

//         {/* Modal ajout utilisateur */}
//         <Modal
//           show={showModal}
//           onHide={() => setShowModal(false)}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>
//               Ajouter un utilisateur
//             </Modal.Title>
//           </Modal.Header>

//           <Form onSubmit={handleAddUser}>
//             <Modal.Body>

//               <Form.Group className="mb-3">
//                 <Form.Label>Nom complet</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="fullname"
//                   value={newUser.fullname}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={newUser.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Téléphone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="phone"
//                   value={newUser.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Mot de passe</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="password"
//                   value={newUser.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Type client</Form.Label>
//                 <Form.Select
//                   name="clientType"
//                   value={newUser.clientType}
//                   onChange={handleChange}
//                 >
//                   <option value="locataire">
//                     Locataire
//                   </option>
//                   <option value="acheteur">
//                     Acheteur
//                   </option>
//                 </Form.Select>
//               </Form.Group>

//             </Modal.Body>

//             <Modal.Footer>
//               <Button
//                 variant="secondary"
//                 onClick={() => setShowModal(false)}
//               >
//                 Fermer
//               </Button>

//               <Button
//                 variant="primary"
//                 type="submit"
//               >
//                 Ajouter
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default UsersAdmin;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Table, Alert, Spinner, Badge } from "react-bootstrap";
// import Sidebar from "../components/Admin/Sidebar";
// import { API_URL } from "../services/config";

// const UsersAdmin = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get(`${API_URL}/users`);

//       // si ton backend retourne { users: [...] }
//       setUsers(response.data.users || []);
//       console.log(users);

//       setError("");
//     } catch (err) {
//       console.error("Erreur chargement utilisateurs :", err);
//       setError("Impossible de charger les utilisateurs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4">
//         <h2 className="mb-4">Liste des utilisateurs</h2>

//         {error && (
//           <Alert variant="danger">
//             {error}
//           </Alert>
//         )}

//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//           </div>
//         ) : (
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Nom</th>
//                 <th>Email</th>
//                 <th>Téléphone</th>
//                 <th>Type</th>
//                 <th>Rôle</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.length > 0 ? (
//                 users.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>{user.fullname || "Non défini"}</td>
//                     <td>{user.email}</td>
//                     <td>{user.phone || "Non défini"}</td>
//                     <td>
//                      <Badge
//                     bg={
//                       user.clientType === "locataire"
//                          ? "primary"
//                          : user.clientType === "acheteur"
//                          ? "success"
//                          : "secondary"
//                         }
//                       >
//                      {user.clientType === "locataire"
//                            ? "Locataire"
//                           : user.clientType === "acheteur"
//                            ? "Acheteur"
//                            : "Non défini"}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
//                         {user.role === "admin" ? "Admin" : "Client"}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     Aucun utilisateur trouvé
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default UsersAdmin;