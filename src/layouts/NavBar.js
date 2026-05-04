import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../layouts/imgs/logo.jpg";

/* ─── Icônes SVG inline (supprime react-icons) ─── */
const IconUser = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconHistory = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconShield = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="rgba(200,169,106,0.7)" strokeWidth="2"
    style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
const NavBar = () => {
  const [user, setUser]         = useState(null);
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef             = useRef(null);
  const navigate                = useNavigate();

  useEffect(() => {
    const token    = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try { setUser(JSON.parse(userData)); }
      catch { localStorage.removeItem("token"); localStorage.removeItem("user"); }
    }
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className={`nb${scrolled ? " nb--scrolled" : ""}`}>

      {/* ── LOGO ── */}
      <Link to="/" className="nb__logo">
        <div className="nb__logo-img">
          <img src={logo} alt="SEN IMMO" />
        </div>
        <div className="nb__brand">
          <span className="nb__brand-main">SEN IMMO</span>
          <span className="nb__brand-sub">Immobilier · Dakar</span>
        </div>
      </Link>

      {/* ── NAVIGATION ── */}
      <nav className="nb__nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">Mes projets</Link></li>
          {isAdmin ? (
            <li><Link to="/admin">Admin</Link></li>
          ) : (
            <>
              <li><Link to="/profile/transactionsHistory">Historique</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* ── PROFIL / LOGIN ── */}
      <div className="nb__right">
        {user ? (
          <div className="nb__profile" ref={dropdownRef}>

            {/* Trigger cliquable */}
            <button
              className={`nb__trigger${open ? " nb__trigger--open" : ""}`}
              onClick={() => setOpen((v) => !v)}
            >
              <div className={`nb__avatar${isAdmin ? " nb__avatar--admin" : ""}`}>
                {getInitials(user.fullname)}
              </div>
              <div className="nb__trigger-info">
                <span className="nb__trigger-name">{user.fullname}</span>
                {isAdmin && <span className="nb__trigger-badge">Admin</span>}
              </div>
              <IconChevron open={open} />
            </button>

            {/* Dropdown */}
            <div className={`nb__dropdown${open ? " nb__dropdown--open" : ""}`}>

              {/* En-tête carte */}
              <div className="nb__dd-header">
                <div className={`nb__dd-avatar${isAdmin ? " nb__dd-avatar--admin" : ""}`}>
                  {getInitials(user.fullname)}
                </div>
                <div>
                  <p className="nb__dd-name">{user.fullname}</p>
                  <p className="nb__dd-role">{isAdmin ? "Administrateur" : "client"}</p>
                </div>
              </div>

              {/* Items */}
              <div className="nb__dd-menu">
                <Link to="/profile" className="nb__dd-item" onClick={() => setOpen(false)}>
                  <IconUser /> <span>Mon profil</span>
                </Link>
                <Link to="/properties" className="nb__dd-item" onClick={() => setOpen(false)}>
                  <IconGrid /> <span>Mes projets</span>
                </Link>

                {isAdmin ? (
                  <Link to="/admin" className="nb__dd-item nb__dd-item--admin" onClick={() => setOpen(false)}>
                    <IconShield /> <span>Dashboard Admin</span>
                  </Link>
                ) : (
                  <Link to="/profile/transactionsHistory" className="nb__dd-item" onClick={() => setOpen(false)}>
                    <IconHistory /> <span>Historique</span>
                  </Link>
                )}

                <div className="nb__dd-sep" />

                <button className="nb__dd-logout" onClick={handleLogout}>
                  <IconLogout /> <span>Déconnexion</span>
                </button>
              </div>

            </div>
          </div>
        ) : (
          <Link to="/login" className="nb__btn-login">
            <IconUser size={14} />
            Connexion
          </Link>
        )}
      </div>

    </header>
  );
};

export default NavBar;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./NavBar.css";
// import logo from "../layouts/imgs/logo.jpg";
// import { FaUser, FaSignOutAlt } from "react-icons/fa";

// const NavBar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (error) {
//         console.error("Erreur user:", error);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const isAdmin = user?.role === "admin";

//   return (
//     <header className="navbar">

//       {/* LOGO */}
//       <div className="logo">
//         <Link to="/">
//           <img src={logo} alt="logo" />
//         </Link>
//         <p style={{ color: "red", fontSize: "18px", fontWeight: "bold", marginLeft: "10px" }}>
//           SEN IMMO
//         </p>
//       </div>

//       {/* NAVIGATION */}
//      <nav className="nav-center">
//   <ul>
//     <li>
//       <Link to="/">Home</Link>
//     </li>

//     <li>
//       <Link to="/properties">Mes projects</Link>
//     </li>

//     {/* Si admin → afficher seulement Admin */}
//     {isAdmin ? (
//       <li>
//         <Link to="/admin">Admin</Link>
//       </li>
//     ) : (
//       /* Si client → afficher Contact */
//        <>
//         <li>
//           <Link to="/profile/transactionsHistory">
//             Historique
//           </Link>
//         </li>

//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//       </>
   
//     )}
//   </ul>
// </nav>

//       {/* PROFIL / LOGIN */}
//       <div className="login-link">

//         {user ? (
//           <div style={styles.profileBox}>

//             {/* NOM + ROLE */}
//             <div style={{ textAlign: "right" }}>
//               <div style={styles.name}>
//                 {user.fullname}
//               </div>
//               {isAdmin && (
//                 <div style={styles.role}>Admin</div>
//               )}
//             </div>

//             {/* ICON / AVATAR */}
//             <div style={styles.avatar}>
//               <FaUser />
//             </div>

//             {/* LOGOUT */}
//             <button onClick={handleLogout} style={styles.logoutBtn}>
//               <FaSignOutAlt />
//             </button>

//           </div>
//         ) : (
//           <Link to="/login" style={styles.loginBtn}>
//             <FaUser />
//           </Link>
//         )}

//       </div>

//     </header>
//   );
// };

// export default NavBar;

// /* ================= STYLES ================= */
// const styles = {
//   profileBox: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px"
//   },

//   name: {
//     fontSize: "14px",
//     fontWeight: "bold",
//     color: "#000"
//   },

//   role: {
//     fontSize: "11px",
//     color: "gray"
//   },

//   avatar: {
//     width: "35px",
//     height: "35px",
//     borderRadius: "50%",
//     background: "#ddd",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer"
//   },

//   logoutBtn: {
//     background: "none",
//     border: "none",
//     color: "#8B4513",
//     fontSize: "18px",
//     cursor: "pointer"
//   },

//   loginBtn: {
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     color: "#000",
//     fontSize: "18px"
//   }
// };

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./NavBar.css";
// import logo from "../layouts/imgs/logo.jpg"
// import { FaUser, FaSignOutAlt } from "react-icons/fa";

// const NavBar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Vérifier si l'utilisateur est connecté au chargement du composant
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Erreur lors du parsing des données utilisateur:", error);
//         // Nettoyer les données corrompues
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     // Supprimer les données de l'utilisateur du localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     // Rediriger vers la page d'accueil
//     navigate("/");
//   };

//   return (
//     <header className="navbar">

//       {/* Logo à gauche */}
//       <div className="logo">
//         <Link to="/">
//           <img src={logo} alt="logo" />
        
//         </Link>
//           <p style={{ color: "red", fontSize: "18px", fontWeight: "bold", marginLeft: "10px" }}>SEN IMMO</p>
//       </div>

//       {/* Routes au milieu */}
//       <nav className="nav-center">
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/properties">Mes projects</Link></li>
//           <li><Link to="/profile/transactionsHistory">Historique</Link></li>
//           <li><Link to="/profile/traitement">traitement</Link></li>
//            <li><Link to="/contact">Contact</Link></li>
//         </ul>
//       </nav>

//       {/* Connexion/Déconnexion à droite */}
//       <div className="login-link">
//         {user ? (
//           <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//             <span style={{ color: "#000", fontSize: "14px", fontWeight: "bold" }}>
//               Bonjour, {user.fullname}
//             </span>
//             <button
//               onClick={handleLogout}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#8B4513",
//                 fontSize: "20px",
//                 cursor: "pointer",
//                 padding: "0",
//                 transition: "transform 0.3s ease, color 0.3s ease"
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "scale(1.3)";
//                 e.currentTarget.style.color = "#A0522D";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.color = "#8B4513";
//               }}
//               title="Déconnexion"
//             >
//               <FaSignOutAlt />
//               deconnexion
//             </button>
//           </div>
//         ) : (
//           <Link
//             to="/login"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//               color: "#fff",
//               fontSize: "20px",
//               cursor: "pointer",
//               transition: "transform 0.3s ease, color 0.3s ease"
//             }}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = "scale(1.2)";
//               e.currentTarget.style.color = "#8B4513";
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//               e.currentTarget.style.color = "#fff";
//             }}
//           >
//             <FaUser title="Se connecter" />
//           </Link>
//         )}
//       </div>

//     </header>
//   );
// };

// export default NavBar;




// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../layouts/imgs/logo.jpg";

// /* ─── Icônes inline (pas besoin de react-icons) ─── */
// const IconUser = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//     <circle cx="12" cy="7" r="4"/>
//   </svg>
// );
// const IconGrid = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
//     <rect x="3" y="3" width="7" height="7" rx="1"/>
//     <rect x="14" y="3" width="7" height="7" rx="1"/>
//     <rect x="3" y="14" width="7" height="7" rx="1"/>
//     <rect x="14" y="14" width="7" height="7" rx="1"/>
//   </svg>
// );
// const IconHistory = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
//     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
//   </svg>
// );
// const IconSettings = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
//     <circle cx="12" cy="12" r="3"/>
//     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
//   </svg>
// );
// const IconLogout = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//     <polyline points="16 17 21 12 16 7"/>
//     <line x1="21" y1="12" x2="9" y2="12"/>
//   </svg>
// );
// const IconChevron = ({ open }) => (
//   <svg
//     width="14" height="14" viewBox="0 0 24 24" fill="none"
//     stroke="rgba(200,169,106,0.7)" strokeWidth="2"
//     style={{ transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
//   >
//     <polyline points="6 9 12 15 18 9"/>
//   </svg>
// );

// /* ─── Utilitaire : initiales de l'utilisateur ─── */
// const getInitials = (name = "") =>
//   name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

// /* ══════════════════════════════════════════════
//    COMPOSANT NAVBAR
// ══════════════════════════════════════════════ */
// const NavBar = () => {
//   const [user, setUser]       = useState(null);
//   const [open, setOpen]       = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const dropdownRef           = useRef(null);
//   const navigate              = useNavigate();

//   /* Chargement utilisateur + listener scroll */
//   useEffect(() => {
//     const token    = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       }
//     }
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Fermeture dropdown au clic extérieur */
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setOpen(false);
//     navigate("/");
//   };

//   return (
//     <>
//       {/* ── STYLES INJECTÉS ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

//         /* ---- Navbar ---- */
//         .nb {
//           font-family: 'DM Sans', sans-serif;
//           background: linear-gradient(135deg, #1a1209 0%, #2d1f0e 60%, #3a2810 100%);
//           border-bottom: 1px solid rgba(200,169,106,0.35);
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 2.5rem;
//           height: 68px;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           transition: box-shadow 0.3s ease;
//         }
//         .nb::before {
//           content: '';
//           position: absolute; top: 0; left: 0; right: 0; height: 1px;
//           background: linear-gradient(90deg, transparent, #c8a96a 30%, #e8c87a 50%, #c8a96a 70%, transparent);
//         }
//         .nb--scrolled {
//           box-shadow: 0 6px 40px rgba(0,0,0,0.5);
//         }

//         /* ---- Logo ---- */
//         .nb__logo {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           text-decoration: none;
//           flex-shrink: 0;
//         }
//         .nb__logo-img {
//           width: 38px; height: 38px;
//           border-radius: 50%;
//           border: 1.5px solid #c8a96a;
//           overflow: hidden;
//           flex-shrink: 0;
//         }
//         .nb__logo-img img { width: 100%; height: 100%; object-fit: cover; }
//         .nb__brand { display: flex; flex-direction: column; line-height: 1; }
//         .nb__brand-main {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 19px; font-weight: 600;
//           color: #c8a96a; letter-spacing: 0.08em;
//         }
//         .nb__brand-sub {
//           font-size: 9px; letter-spacing: 0.22em;
//           color: rgba(200,169,106,0.45);
//           text-transform: uppercase; margin-top: 3px;
//         }

//         /* ---- Navigation centrale ---- */
//         .nb__nav ul {
//           display: flex; gap: 0;
//           list-style: none; margin: 0; padding: 0;
//         }
//         .nb__nav a {
//           display: block;
//           padding: 0 18px; height: 68px; line-height: 68px;
//           font-size: 12.5px; font-weight: 400; letter-spacing: 0.06em;
//           color: rgba(245,235,210,0.65);
//           text-decoration: none; position: relative;
//           transition: color 0.25s ease;
//         }
//         .nb__nav a::after {
//           content: ''; position: absolute;
//           bottom: 0; left: 50%; right: 50%;
//           height: 2px; background: #c8a96a;
//           transition: left 0.25s ease, right 0.25s ease;
//         }
//         .nb__nav a:hover { color: #e8c87a; }
//         .nb__nav a:hover::after { left: 18px; right: 18px; }
//         .nb__nav a.active { color: #c8a96a; }
//         .nb__nav a.active::after { left: 18px; right: 18px; }

//         /* ---- Zone droite ---- */
//         .nb__right { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

//         /* ---- Bouton connexion (visiteur) ---- */
//         .nb__btn-login {
//           display: flex; align-items: center; gap: 8px;
//           border: 1px solid rgba(200,169,106,0.4);
//           color: rgba(245,235,210,0.78);
//           padding: 0 18px; height: 34px; border-radius: 2px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 11.5px; letter-spacing: 0.1em;
//           text-transform: uppercase; text-decoration: none;
//           transition: background 0.2s, border-color 0.2s, color 0.2s;
//         }
//         .nb__btn-login:hover {
//           background: rgba(200,169,106,0.1);
//           border-color: #c8a96a; color: #c8a96a;
//         }

//         /* ---- Profil trigger ---- */
//         .nb__profile { position: relative; }
//         .nb__trigger {
//           display: flex; align-items: center; gap: 10px;
//           cursor: pointer; padding: 5px 10px 5px 5px;
//           border-radius: 30px;
//           border: 1px solid rgba(200,169,106,0.3);
//           background: none;
//           transition: background 0.2s, border-color 0.2s;
//         }
//         .nb__trigger:hover,
//         .nb__trigger--open {
//           background: rgba(200,169,106,0.09);
//           border-color: rgba(200,169,106,0.7);
//         }
//         .nb__avatar {
//           width: 34px; height: 34px; border-radius: 50%;
//           background: #c8a96a; color: #1a1209;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 13px; font-weight: 600;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//         }
//         .nb__trigger-name {
//           font-size: 12.5px; color: rgba(245,235,210,0.82);
//           font-weight: 400; letter-spacing: 0.03em;
//         }

//         /* ---- Dropdown ---- */
//         .nb__dropdown {
//           position: absolute; top: calc(100% + 10px); right: 0;
//           width: 224px;
//           background: #231708;
//           border: 1px solid rgba(200,169,106,0.22);
//           border-radius: 12px; overflow: hidden;
//           transform-origin: top right;
//           transform: scale(0.9) translateY(-8px);
//           opacity: 0; pointer-events: none;
//           transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease;
//           z-index: 200;
//         }
//         .nb__dropdown--open {
//           transform: scale(1) translateY(0);
//           opacity: 1; pointer-events: all;
//         }

//         /* En-tête dropdown */
//         .nb__dd-header {
//           display: flex; align-items: center; gap: 12px;
//           padding: 16px 16px 14px;
//           border-bottom: 1px solid rgba(200,169,106,0.14);
//         }
//         .nb__dd-avatar {
//           width: 44px; height: 44px; border-radius: 50%;
//           background: linear-gradient(135deg, #c8a96a, #e8c87a);
//           color: #1a1209;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 17px; font-weight: 600;
//           display: flex; align-items: center; justify-content: center;
//           border: 2px solid rgba(200,169,106,0.35);
//           flex-shrink: 0;
//         }
//         .nb__dd-name {
//           font-size: 13.5px; font-weight: 500;
//           color: #e8d8b0; letter-spacing: 0.02em; margin: 0;
//         }
//         .nb__dd-role {
//           font-size: 10.5px; color: rgba(200,169,106,0.5);
//           letter-spacing: 0.1em; text-transform: uppercase;
//           margin: 3px 0 0;
//         }

//         /* Items menu */
//         .nb__dd-menu { padding: 6px; }
//         .nb__dd-item {
//           display: flex; align-items: center; gap: 10px;
//           padding: 9px 12px; border-radius: 8px;
//           text-decoration: none;
//           color: rgba(245,235,210,0.7);
//           font-size: 13px; letter-spacing: 0.01em;
//           transition: background 0.15s, color 0.15s;
//         }
//         .nb__dd-item svg { flex-shrink: 0; stroke: rgba(200,169,106,0.45); transition: stroke 0.15s; }
//         .nb__dd-item:hover { background: rgba(200,169,106,0.09); color: #e8c87a; }
//         .nb__dd-item:hover svg { stroke: #c8a96a; }

//         /* Séparateur */
//         .nb__dd-sep {
//           height: 1px;
//           background: rgba(200,169,106,0.12);
//           margin: 4px 8px;
//         }

//         /* Bouton déconnexion */
//         .nb__dd-logout {
//           display: flex; align-items: center; gap: 10px;
//           width: 100%; padding: 9px 12px; border-radius: 8px;
//           background: none; border: none; cursor: pointer;
//           color: rgba(240,149,149,0.65);
//           font-family: 'DM Sans', sans-serif;
//           font-size: 13px; letter-spacing: 0.01em;
//           transition: background 0.15s, color 0.15s;
//         }
//         .nb__dd-logout svg { flex-shrink: 0; stroke: rgba(240,149,149,0.45); transition: stroke 0.15s; }
//         .nb__dd-logout:hover { background: rgba(226,75,74,0.12); color: #f09595; }
//         .nb__dd-logout:hover svg { stroke: #f09595; }
//       `}</style>

//       {/* ── MARKUP ── */}
//       <header className={`nb${scrolled ? " nb--scrolled" : ""}`}>

//         {/* Logo */}
//         <Link to="/" className="nb__logo">
//           <div className="nb__logo-img">
//             <img src={logo} alt="SEN IMMO" />
//           </div>
//           <div className="nb__brand">
//             <span className="nb__brand-main">SEN IMMO</span>
//             <span className="nb__brand-sub">Immobilier · Dakar</span>
//           </div>
//         </Link>

//         {/* Navigation centrale */}
//         <nav className="nb__nav">
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/properties">Mes projets</Link></li>
//             <li><Link to="/profile/transactionsHistory">Historique</Link></li>
//             <li><Link to="/profile/traitement">Traitement</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//           </ul>
//         </nav>

//         {/* Zone droite */}
//         <div className="nb__right">
//           {user ? (
//             /* ── Profil avec dropdown ── */
//             <div className="nb__profile" ref={dropdownRef}>
//               <button
//                 className={`nb__trigger${open ? " nb__trigger--open" : ""}`}
//                 onClick={() => setOpen((v) => !v)}
//               >
//                 <div className="nb__avatar">{getInitials(user.fullname)}</div>
//                 <span className="nb__trigger-name">{user.fullname}</span>
//                 <IconChevron open={open} />
//               </button>

//               <div className={`nb__dropdown${open ? " nb__dropdown--open" : ""}`}>
//                 {/* En-tête */}
//                 <div className="nb__dd-header">
//                   <div className="nb__dd-avatar">{getInitials(user.fullname)}</div>
//                   <div>
//                     <p className="nb__dd-name">{user.fullname}</p>
//                     <p className="nb__dd-role">Propriétaire</p>
//                   </div>
//                 </div>

//                 {/* Menu */}
//                 <div className="nb__dd-menu">
//                   <Link to="/profile" className="nb__dd-item" onClick={() => setOpen(false)}>
//                     <IconUser />
//                     <span>Mon profil</span>
//                   </Link>
//                   <Link to="/properties" className="nb__dd-item" onClick={() => setOpen(false)}>
//                     <IconGrid />
//                     <span>Mes projets</span>
//                   </Link>
//                   <Link to="/profile/transactionsHistory" className="nb__dd-item" onClick={() => setOpen(false)}>
//                     <IconHistory />
//                     <span>Historique</span>
//                   </Link>
//                   <Link to="/profile/traitement" className="nb__dd-item" onClick={() => setOpen(false)}>
//                     <IconSettings />
//                     <span>Traitement</span>
//                   </Link>

//                   <div className="nb__dd-sep" />

//                   <button className="nb__dd-logout" onClick={handleLogout}>
//                     <IconLogout />
//                     <span>Déconnexion</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             /* ── Bouton connexion ── */
//             <Link to="/login" className="nb__btn-login">
//               <IconUser />
//               Connexion
//             </Link>
//           )}
//         </div>

//       </header>
//     </>
//   );
// };

// export default NavBar;






