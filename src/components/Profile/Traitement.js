import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/config";
import { Form, Button, Container, Alert, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Traitement.css";

const CreateTraitement = ({ propertyId, propertyPrice }) => {
  const [traitementType, setTraitementType] = useState("vente");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [propertyStatus, setPropertyStatus] = useState("");
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) setClientId(user._id);
  }, []);

  // récupérer le statut du bien
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${API_URL}/properties/${propertyId}`);
        setPropertyStatus(res.data.property.status);
      } catch (error) {
        console.log("Erreur chargement propriété :", error);
      }
    };

    if (propertyId) fetchProperty();
  }, [propertyId]);

// ajuster automatiquement le type de traitement en fonction du statut du bien
   useEffect(() => {
     if (propertyStatus === "a_louer") {
     setTraitementType("location");
    } else if (propertyStatus === "a_vendre") {
     setTraitementType("vente");
   }
}, [propertyStatus]);

  // vérifier si déjà demandé
  useEffect(() => {
    const checkExisting = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/traitements/check/${propertyId}/${clientId}`
        );

        if (res.data.exists) {
          setAlreadyRequested(true);
          setMessage(" Vous avez déjà demandé ce bien");
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (clientId) checkExisting();
  }, [clientId, propertyId]);

  // bien indisponible
  const isUnavailable =
    propertyStatus === "vendu" || propertyStatus === "loue";

  //  AJOUT LOGIQUE TYPE
  const isVenteOnly = propertyStatus === "a_vendre";
  const isLocationOnly = propertyStatus === "a_louer";

  // message indisponible
  useEffect(() => {
    if (isUnavailable) {
      setMessage("ce bien n'est pas disponible à la vente ou à la location");
    }
  }, [isUnavailable]);

  //  message type
  useEffect(() => {
    if (isVenteOnly) {
      setMessage("Ce bien est uniquement disponible à la vente");
    } else if (isLocationOnly) {
      setMessage("Ce bien est uniquement disponible à la location");
    }
  }, [isVenteOnly, isLocationOnly]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientId) { navigate("/login"); return; }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        traitementType,
        property: propertyId,
        client: clientId,
        startDate,
        clientEmail: user.email,
        ...(traitementType === "vente" ? { salePrice: propertyPrice } : {}),
        ...(traitementType === "location"
          ? { rentPrice: propertyPrice, endDate }
          : {}),
      };

      const res = await axios.post(`${API_URL}/traitements`, payload);

      setMessage(res.data.message || "Traitement créé avec succès");
      setStatus("en_attente");

      setStartDate("");
      setEndDate("");

    } catch (error) {
      console.log("Erreur complète :", error);
      console.log("Erreur backend :", error.response?.data);
      setMessage(error.response?.data?.message || "Erreur paiement traitement");
    }
  };

  return (
    <div className="ct-page">
      <Container className="mt-5">

        <div className="ct-header">
          <div className="ct-eyebrow">
            <span>{traitementType === "vente" ? "Acquisition" : "Location"}</span>
          </div>

          <h2 className="ct-title">
            {traitementType === "vente"
              ? <>Finaliser l'<em>achat</em></>
              : <>Finaliser la <em>location</em></>}
          </h2>

          {propertyPrice && (
            <p className="ct-price">
              {Number(propertyPrice).toLocaleString()}{" "}
              <span className="ct-currency">FCFA</span>
            </p>
          )}
        </div>

        {message && (
          <Alert variant="info" className="ct-alert">
            {message}
          </Alert>
        )}

        {status === "en_attente" && (
          <Badge bg="warning" className="ct-status-badge">
            ⏳ Traitement enregistré — en attente de validation par l’administrateur
          </Badge>
        )}

        {isUnavailable && (
          <Badge bg="danger" className="ct-status-badge">
             Bien non disponible
          </Badge>
        )}

        <div className="ct-card">
          <Form onSubmit={handleSubmit} className="ct-form">

            {/* TYPE */}
            <div className="ct-type-toggle">
              <button
                type="button"
                className={`ct-toggle-btn ${traitementType === "vente" ? "active" : ""}`}
                onClick={() => setTraitementType("vente")}
                disabled={isUnavailable || alreadyRequested || isLocationOnly}
              >
                Acheter
              </button>

              <button
                type="button"
                className={`ct-toggle-btn ${traitementType === "location" ? "active" : ""}`}
                onClick={() => setTraitementType("location")}
                disabled={isUnavailable || alreadyRequested || isVenteOnly}
              >
                Louer
              </button>
            </div>

            <Form.Group className="mb-3 ct-form-group">
              <Form.Label className="ct-label">Date de début</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="ct-input"
                disabled={isUnavailable || alreadyRequested}
              />
            </Form.Group>

            {traitementType === "location" && (
              <Form.Group className="mb-3 ct-form-group">
                <Form.Label className="ct-label">Date de fin</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="ct-input"
                  disabled={isUnavailable || alreadyRequested}
                />
              </Form.Group>
            )}

            <div className="d-grid">
              <Button
                variant={(isUnavailable || alreadyRequested) ? "secondary" : "success"}
                type="submit"
                className="ct-submit"
                disabled={isUnavailable || alreadyRequested}
              >
                {isUnavailable
                  ? " Bien non disponible"
                  : alreadyRequested
                  ? " Déjà demandé"
                  : "valider →"}
              </Button>
            </div>

          </Form>
        </div>

      </Container>
    </div>
  );
};

export default CreateTraitement;

















