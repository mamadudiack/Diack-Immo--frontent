import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const getUserTypeLabel = () => {
    if (user.clientType === "locataire") return "Locataire";
    if (user.clientType === "acheteur") return "Acheteur";
    return "Non défini";
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Avatar + identité */}
        <div className="profile-header">
          <div className={`profile-avatar ${isAdmin ? "profile-avatar--admin" : "profile-avatar--client"}`}>
            {user.fullname?.charAt(0)?.toUpperCase()}
          </div>
          <h1 className="profile-name">{user.fullname}</h1>
          <span className={`profile-badge ${isAdmin ? "profile-badge--admin" : "profile-badge--client"}`}>
            {isAdmin ? "Administrateur" : "Client"}
          </span>
        </div>

        <div className="profile-divider" />

        {/* Champs */}
        <dl className="profile-fields">

          <div className="profile-row">
            <dt className="profile-key">Nom complet</dt>
            <dd className="profile-value">{user.fullname}</dd>
          </div>

          <div className="profile-row">
            <dt className="profile-key">Email</dt>
            <dd className="profile-value">{user.email}</dd>
          </div>

          {user.phone && (
            <div className="profile-row">
              <dt className="profile-key">Téléphone</dt>
              <dd className="profile-value">{user.phone}</dd>
            </div>
          )}

          <div className="profile-row">
            <dt className="profile-key">Rôle</dt>
            <dd className="profile-value">{isAdmin ? "Administrateur" : "Client"}</dd>
          </div>

          {!isAdmin && (
            <div className="profile-row">
              <dt className="profile-key">Type client</dt>
              <dd className="profile-value">
                <span className="profile-tag">{getUserTypeLabel()}</span>
              </dd>
            </div>
          )}

          {isAdmin && (
            <div className="profile-row">
              <dt className="profile-key">Accès</dt>
              <dd className="profile-value">Gestion complète de la plateforme</dd>
            </div>
          )}

        </dl>

      </div>
    </div>
  );
};

export default Profile;



