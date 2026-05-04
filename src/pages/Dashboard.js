import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Admin/Sidebar";
import { API_URL } from "../services/config";
import { FaHome, FaFileAlt, FaUsers } from "react-icons/fa";
import "../styles/Dashboard.css";

const StatCard = ({ label, value, icon, colorClass }) => (
  <div className="stat-card">
    <div>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
    </div>
    <div className={`stat-card__icon-wrap ${colorClass}`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    traitements: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [propertiesRes, traitementsRes, usersRes] = await Promise.all([
          axios.get(`${API_URL}/properties`),
          axios.get(`${API_URL}/traitements`),
          axios.get(`${API_URL}/users`),
        ]);

        setStats({
          properties: propertiesRes.data.properties.length,
          traitements: traitementsRes.data.traitements.length,
          users: usersRes.data.users.length,
        });
      } catch (error) {
        console.error("Erreur chargement dashboard :", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">

        <div className="dashboard-header">
          <p className="dashboard-eyebrow">Vue générale</p>
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-divider" />
        </div>

        <div className="dashboard-grid">
          <StatCard
            label="Biens"
            value={stats.properties}
            icon={<FaHome />}
            colorClass="stat-card__icon-wrap--blue"
          />
          <StatCard
            label="Traitements"
            value={stats.traitements}
            icon={<FaFileAlt />}
            colorClass="stat-card__icon-wrap--gold"
          />
          <StatCard
            label="Utilisateurs"
            value={stats.users}
            icon={<FaUsers />}
            colorClass="stat-card__icon-wrap--red"
          />
        </div>

      </main>
    </div>
  );
};

export default Dashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import Sidebar from "../components/Admin/Sidebar";
// import { API_URL } from "../services/config";
// import {
//   FaHome,
//   FaFileAlt,
//   FaUsers
// } from "react-icons/fa";
// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     properties: 0,
//     traitements: 0,
//     users: 0
//   });

//   useEffect(() => {
//     fetchDashboardStats();
//   }, []);

//   const fetchDashboardStats = async () => {
//     try {
//       // récupération des données depuis le backend
//       const propertiesRes = await axios.get(`${API_URL}/properties`);
//       const traitementsRes = await axios.get(`${API_URL}/traitements`);
//       const usersRes = await axios.get(`${API_URL}/users`);

//       setStats({
//         properties: propertiesRes.data.properties.length,
//         traitements: traitementsRes.data.traitements.length,
//         users: usersRes.data.users.length
//       });

//     } catch (error) {
//       console.error("Erreur chargement dashboard :", error);
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />

//       <Container className="mt-4">
//         <h2 className="mb-4">Dashboard Admin</h2>

//         <Row>
//           {/* Biens */}
//           <Col md={4}>
//             <Card
//               className="p-4 shadow-sm"
//               style={{
//                 border: "none",
//                 borderRadius: "15px"
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5>Biens</h5>
//                   <h2 style={{ fontWeight: "bold" }}>
//                     {stats.properties}
//                   </h2>
//                 </div>

//                 <FaHome
//                   size={40}
//                   style={{
//                     color: "#0d6efd"
//                   }}
//                 />
//               </div>
//             </Card>
//           </Col>

//           {/* Traitements */}
//           <Col md={4}>
//             <Card
//               className="p-4 shadow-sm"
//               style={{
//                 border: "none",
//                 borderRadius: "15px"
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5>Traitements</h5>
//                   <h2 style={{ fontWeight: "bold" }}>
//                     {stats.traitements}
//                   </h2>
//                 </div>

//                 <FaFileAlt
//                   size={40}
//                   style={{
//                     color: "#198754"
//                   }}
//                 />
//               </div>
//             </Card>
//           </Col>

//           {/* Utilisateurs */}
//           <Col md={4}>
//             <Card
//               className="p-4 shadow-sm"
//               style={{
//                 border: "none",
//                 borderRadius: "15px"
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5>Utilisateurs</h5>
//                   <h2 style={{ fontWeight: "bold" }}>
//                     {stats.users}
//                   </h2>
//                 </div>

//                 <FaUsers
//                   size={40}
//                   style={{
//                     color: "#dc3545"
//                   }}
//                 />
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;


