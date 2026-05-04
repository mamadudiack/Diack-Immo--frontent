import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/config";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await axios.post(`${API_URL}/auth/login`, formData);
      const { token, user } = result.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.log("ERREUR BACKEND", error.response?.data);
      setErrorMessage("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">✦</div>
          <h1 className="login-title">Connexion</h1>
          <p className="login-subtitle">Bienvenue, connectez-vous pour continuer</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="login-alert">
              <span className="login-alert-icon">!</span>
              {errorMessage}
            </div>
          )}

          <div className="login-field">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              className="login-input"
              type="email"
              id="email"
              name="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">Mot de passe</label>
            <input
              className="login-input"
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
            className={`login-btn${isLoading ? " login-btn--loading" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <p className="login-footer">
          Pas encore de compte ?{" "}
          <Link className="login-link" to="/register">Créer un compte</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;

