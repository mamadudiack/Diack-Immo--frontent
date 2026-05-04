import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/config";
import Sidebar from "../components/Admin/Sidebar";
import "../styles/PropertiesAdmin.css";

const statusConfig = {
  a_vendre: { label: "À vendre", className: "badge-vendre" },
  a_louer:  { label: "À louer",  className: "badge-louer" },
  vendu:    { label: "Vendu",    className: "badge-vendu" },
  loue:     { label: "Loué",     className: "badge-loue" },
};

const renderStatus = (status) => {
  const config = statusConfig[status] ?? { label: status, className: "badge-default" };
  return <span className={config.className}>{config.label}</span>;
};

const PropertiesAdmin = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/properties`);
      setProperties(res.data.properties);
    } catch (error) {
      console.error("Erreur chargement biens :", error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${API_URL}/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  return (
    <div className="properties-admin-page">
      <Sidebar />

      <main className="properties-admin-main">

        <div className="properties-admin-header">
          <p className="properties-admin-eyebrow">Administration</p>
          <h1 className="properties-admin-title">Gestion des biens</h1>
          <div className="properties-admin-divider" />
        </div>

        <div className="properties-admin-table-wrap">
          {properties.length === 0 ? (
            <p className="properties-admin-empty">Aucun bien enregistré.</p>
          ) : (
            <table className="properties-admin-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p._id}>
                    <td className="cell-title">{p.title}</td>
                    <td className="cell-price">{p.price.toLocaleString()} FCFA</td>
                    <td>{p.type}</td>
                    <td>{renderStatus(p.status)}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteProperty(p._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </main>
    </div>
  );
};

export default PropertiesAdmin;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Container, Badge } from "react-bootstrap";
// import { API_URL } from "../services/config";
// import Sidebar from "../components/Admin/Sidebar";
// import "../styles/PropertiesAdmin.css";

// const PropertiesAdmin = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/properties`);
//       setProperties(res.data.properties);
//     } catch (error) {
//       console.error("Erreur chargement biens :", error);
//     }
//   };

//   const deleteProperty = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/properties/${id}`);
//       fetchProperties();
//     } catch (error) {
//       console.error("Erreur suppression :", error);
//     }
//   };

//   // affichage propre du status
//   const renderStatus = (status) => {
//     switch (status) {
//       case "a_vendre":
//         return <Badge bg="danger">À vendre</Badge>;

//       case "a_louer":
//         return <Badge bg="info">À louer</Badge>;

//       case "vendu":
//         return <Badge bg="success">Vendu</Badge>;

//       case "loue":
//         return <Badge bg="warning">Loué</Badge>;

//       default:
//         return <Badge bg="secondary">{status}</Badge>;
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4">
//         <h3>Gestion des biens</h3>

//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Titre</th>
//               <th>Prix</th>
//               <th>Type</th>
//               <th>Statut</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {properties.map((p) => (
//               <tr key={p._id}>
//                 <td>{p.title}</td>
//                 <td>{p.price}</td>
//                 <td>{p.type}</td>

//                 {/* ici on affiche vendu / loué */}
//                 <td>{renderStatus(p.status)}</td>

//                 <td>
//                   <Button
//                     variant="danger"
//                     onClick={() => deleteProperty(p._id)}
//                   >
//                     Supprimer
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// };

// export default PropertiesAdmin;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Container } from "react-bootstrap";
// import { API_URL } from "../services/config";
// import Sidebar from "../components/Admin/Sidebar";

// const PropertiesAdmin = () => {

//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     const res = await axios.get(`${API_URL}/properties`);
//     setProperties(res.data.properties);
//   };

//   const deleteProperty = async (id) => {
//     await axios.delete(`${API_URL}/properties/${id}`);
//     fetchProperties();
//   };
 

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4">
//         <h3>Gestion des biens</h3>

//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Titre</th>
//               <th>Prix</th>
//               <th>Type</th>
//               <th>status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {properties.map((p) => (
//               <tr key={p._id}>
//                 <td>{p.title}</td>
//                 <td>{p.price}</td>
//                 <td>{p.type}</td>
//                 <td>{p.status}</td>
            


//                 <td>
//                   <Button variant="danger" onClick={() => deleteProperty(p._id)}>
//                     Supprimer
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </Table>
//       </Container>
//     </div>
//   );
// };

// export default PropertiesAdmin;