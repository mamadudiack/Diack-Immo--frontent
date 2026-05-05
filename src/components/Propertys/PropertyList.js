import { useEffect, useState } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import CardProperty from "./CardProperty";
import { API_URL } from "../../services/config";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties`);
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Erreur lors du chargement des propriétés", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
    const availableProperties = properties.filter(
      (p) => p.status === "a_vendre" || p.status === "a_louer"
    );

  return (
    <div className="pl-page">
      <NavBar />

      {/* ── Hero Header ── */}
      <div className="pl-hero">
        <div className="pl-hero__orb pl-hero__orb--1" />
        <div className="pl-hero__orb pl-hero__orb--2" />

        <span className="pl-hero__badge"> Immobilier</span>
        <h1 className="pl-hero__title">
          Nos Biens <span className="pl-hero__title--accent">Immobiliers</span>
        </h1>
        <p className="pl-hero__sub">
          Trouvez le bien de vos rêves parmi notre sélection exclusive
        </p>
        <div className="pl-hero__line" />
      </div>

      {/* ── Grille de propriétés ── */}
      <div className="pl-body">
        <Container>

          {/* Compteur */}
          {!loading && (
        <p className="pl-count">
          <span>{availableProperties.length}</span> bien
          {availableProperties.length > 1 ? "s" : ""} disponible
           {availableProperties.length > 1 ? "s" : ""}
          </p>
         )}
          {/* Loader */}
          {loading && (
            <div className="pl-loader">
              <div className="pl-spinner" />
              <p>Chargement des biens…</p>
            </div>
          )}

          {/* Liste vide */}
          {!loading && properties.length === 0 && (
            <div className="pl-empty">
              <span className="pl-empty__icon">🏚️</span>
              <p>Aucune propriété disponible pour le moment.</p>
            </div>
          )}

          {/* Cards */}
          {!loading && properties.length > 0 && (
            <Row>
              {properties.map((property) => (
                <Col md={4} className="mb-4" key={property._id}>
                  <CardProperty property={property} />
                </Col>
              ))}
            </Row>
          )}

        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyList;










