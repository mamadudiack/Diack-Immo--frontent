import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/config";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    clientType: "",
    password: ""
  });

  const { fullname, email, phone, clientType, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await axios.post(`${API_URL}/auth/register`, formData);
      console.log("Utilisateur créé :", result.data);
      navigate("/login");
    } catch (error) {
      console.log("ERREUR BACKEND :", error.response?.data);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <div className="register-header">
          <div className="register-logo">✦</div>
          <h1 className="register-title">Créer un compte</h1>
          <p className="register-subtitle">Rejoignez-nous en quelques secondes</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="register-alert">
              <span className="register-alert-icon">!</span>
              {errorMessage}
            </div>
          )}

          <div className="register-field">
            <label className="register-label" htmlFor="fullname">Nom complet</label>
            <input
              className="register-input"
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Jean Dupont"
              value={fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="email">Email</label>
            <input
              className="register-input"
              type="email"
              id="email"
              name="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="phone">Téléphone</label>
            <input
              className="register-input"
              type="tel"
              id="phone"
              name="phone"
              placeholder="+221 77 000 00 00"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="clientType">Type de client</label>
            <select
              className="register-select"
              id="clientType"
              name="clientType"
              value={clientType}
              onChange={handleChange}
              required
            >
              <option value="">— Sélectionner un type —</option>
              <option value="locataire">Locataire</option>
              <option value="acheteur">Acheteur</option>
            </select>
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="password">Mot de passe</label>
            <input
              className="register-input"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className={`register-btn${isLoading ? " register-btn--loading" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <p className="register-footer">
          Déjà un compte ?{" "}
          <Link className="register-link" to="/login">Se connecter</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;



