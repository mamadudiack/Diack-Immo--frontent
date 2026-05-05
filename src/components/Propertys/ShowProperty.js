import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/config";
import CreateTraitement from "../Profile/Traitement";
import "./ShowProperty.css";
import Footer from "../../layouts/Footer";

/* ── Status config ── */
const statusConfig = {
  a_vendre: { label: "À vendre", className: "badge-vendre" },
  a_louer:  { label: "À louer",  className: "badge-louer"  },
  vendu:    { label: "Vendu",    className: "badge-vendu"  },
  loue:     { label: "Loué",     className: "badge-loue"   },
};

const renderStatus = (status) => {
  const config = statusConfig[status] ?? { label: status, className: "badge-default" };
  return <span className={`sp-badge ${config.className}`}>{config.label}</span>;
};

/* ── Meta row ── */
const MetaRow = ({ label, value }) => (
  <div className="sp-meta-row">
    <span className="sp-meta-key">{label}</span>
    <span className="sp-meta-value">{value}</span>
  </div>
);

/* ── Component ── */
const ShowProperty = () => {
  const { propertyId } = useParams();
  const [property, setProperty]   = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties/${propertyId}`);
        setProperty(response.data.property);
      } catch (error) {
        console.error("Error fetching property details", error);
      }
    };
    fetchPropertyDetails();
  }, [propertyId]);

  if (!property) {
    return <div className="sp-loading">Chargement…</div>;
  }

  const images = Array.isArray(property.images) && property.images.length
    ? property.images
    : property.image
      ? [property.image]
      : [];

  const prev = () => setActiveImg(i => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg(i => (i + 1) % images.length);

  return (
      <div>
    <div className="sp-page">

      {/* Breadcrumb */}
      <div className="sp-breadcrumb">
        Accueil &rsaquo; Biens &rsaquo; <span>{property.title}</span>
      </div>

      {/* Two-column grid */}
      <div className="sp-grid">

        {/* ── LEFT ── */}
        <div>

          {/* Title block */}
          <div className="sp-title-block">
            {renderStatus(property.status)}
            <h1>{property.title}</h1>
            {property.address && (
              <p className="sp-address">
                📍 {property.address}{property.city ? `, ${property.city}` : ""}
              </p>
            )}
          </div>

          {/* Main image */}
          <div className="sp-main-img-wrap">
            <img
              src={images[activeImg] || property.image}
              alt={property.title}
              className="sp-main-img"
            />
            {images.length > 1 && (
              <>
                <button className="sp-nav-btn prev" onClick={prev}>&#8249;</button>
                <button className="sp-nav-btn next" onClick={next}>&#8250;</button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="sp-thumbs">
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`sp-thumb${activeImg === i ? " active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`vue ${i + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="sp-card">
            <h2 className="sp-section-title">Description</h2>
            <p className="sp-description">{property.description}</p>
          </div>

          {/* Details */}
          <div className="sp-card">
            <h2 className="sp-section-title">Détails</h2>

            <div className="sp-price-band">
              <span className="sp-price-amount">
                {property.price.toLocaleString("fr-FR")}
              </span>
              <span className="sp-price-currency">FCFA</span>
            </div>

            <MetaRow label="Surface" value={`${property.surface} m²`} />
            <MetaRow label="Adresse" value={property.address} />
            <MetaRow label="Ville"   value={property.city} />
          </div>

        </div>

        {/* ── RIGHT — Traitement ── */}
        <div className="sp-right">
          <div className="sp-traitement-panel">
            <div className="sp-traitement-header">
              <h3>Traitement du dossier</h3>
            </div>
            <div className="sp-traitement-body">
              <CreateTraitement
                propertyId={propertyId}
                propertyPrice={property.price}
              />
            </div>
          </div>
        </div>
       
      </div>
     
    </div>
   <Footer />
     </div>
  );
};

export default ShowProperty;






