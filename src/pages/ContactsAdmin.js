import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/config";
import Sidebar from "../components/Admin/Sidebar";
import "../styles/ContactsAdmin.css";

const fmt = (date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${API_URL}/contact`);
        setContacts(res.data.contacts);
      } catch (error) {
        console.error("Erreur chargement contacts :", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="contacts-page">
      <Sidebar />

      <main className="contacts-main">

        <p className="contacts-eyebrow">Administration</p>
        <h1 className="contacts-title">Gestion des contacts</h1>
        <div className="contacts-divider" />

        <div className="contacts-table-wrap">
          {contacts.length === 0 ? (
            <p className="contacts-empty">Aucun message trouvé.</p>
          ) : (
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td className="cell-name">{contact.name}</td>
                    <td className="cell-email">{contact.email}</td>
                    <td className="cell-phone">{contact.phone || "—"}</td>
                    <td className="cell-message">{contact.message}</td>
                    <td className="cell-date">{fmt(contact.createdAt)}</td>
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

export default ContactsAdmin;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Table, Badge } from "react-bootstrap";
// import { API_URL } from "../services/config";
// import Sidebar from "../components/Admin/Sidebar";
// import "../styles/ContactsAdmin.css";

// const ContactsAdmin = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/contact`);
//       setContacts(res.data.contacts);
//     } catch (error) {
//       console.error("Erreur chargement contacts :", error);
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4">
//         <h3 className="mb-4">Gestion des Contacts</h3>

//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Nom</th>
//               <th>Email</th>
//               <th>Téléphone</th>
//               <th>Message</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {contacts.length > 0 ? (
//               contacts.map((contact) => (
//                 <tr key={contact._id}>
//                   <td>{contact.name}</td>

//                   <td>{contact.email}</td>

//                   <td>{contact.phone}</td>

//                   <td style={{ maxWidth: "350px" }}>
//                     {contact.message}
//                   </td>

//                   <td>
//                     <Badge bg="info">
//                       {new Date(contact.createdAt).toLocaleDateString()}
//                     </Badge>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   Aucun message trouvé
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// };

// export default ContactsAdmin;