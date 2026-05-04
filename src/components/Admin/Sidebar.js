import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaHome,
  FaFileAlt,
  FaEnvelope,
  FaUsers,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [openBiens, setOpenBiens] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* header */}
      <div className="sidebar__header">
        <p className="sidebar__eyebrow">Panneau</p>
        <h2 className="sidebar__brand">Administrateur</h2>
        <div className="sidebar__divider" />
      </div>

      {/* nav */}
      <nav className="sidebar__nav">

        <Link
          to="/admin"
          className={`sidebar__link ${isActive("/admin") ? "active" : ""}`}
        >
          <FaTachometerAlt className="sidebar__link-icon" />
          Dashboard
        </Link>

        <button
          className="sidebar__link"
          onClick={() => setOpenBiens(!openBiens)}
        >
          <FaHome className="sidebar__link-icon" />
          Biens
          {openBiens
            ? <FaChevronUp style={{ marginLeft: "auto", fontSize: 10, opacity: 0.5 }} />
            : <FaChevronDown style={{ marginLeft: "auto", fontSize: 10, opacity: 0.5 }} />
          }
        </button>

        {openBiens && (
          <div className="sidebar__submenu">
            <Link
              to="/admin/properties"
              className="sidebar__sublink"
            >
              Liste des biens
            </Link>
            <Link
              to="/admin/add-property"
              className="sidebar__sublink"
            >
              Ajouter un bien
            </Link>
          </div>
        )}

        <Link
          to="/admin/traitements"
          className={`sidebar__link ${isActive("/admin/traitements") ? "active" : ""}`}
        >
          <FaFileAlt className="sidebar__link-icon" />
          Traitements
        </Link>

        <Link
          to="/admin/users"
          className={`sidebar__link ${isActive("/admin/users") ? "active" : ""}`}
        >
          <FaUsers className="sidebar__link-icon" />
          Utilisateurs
        </Link>

        <Link
          to="/admin/contacts"
          className={`sidebar__link ${isActive("/admin/contacts") ? "active" : ""}`}
        >
          <FaEnvelope className="sidebar__link-icon" />
          Contacts
        </Link>

      </nav>

      {/* logout */}
      <div className="sidebar__footer">
        <button className="sidebar__logout" onClick={handleLogout}>
          <FaSignOutAlt />
          Déconnexion
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;





