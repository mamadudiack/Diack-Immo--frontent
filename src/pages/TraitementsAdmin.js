import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/config";
import Sidebar from "../components/Admin/Sidebar";
import "../styles/TraitementsAdmin.css";

const statusConfig = {
  valide:     { label: "Validé",     className: "badge-valide"  },
  refuse:     { label: "Refusé",     className: "badge-refuse"  },
  en_attente: { label: "En attente", className: "badge-attente" },
};

const typeConfig = {
  vente:    { label: "Vente",    className: "badge-vente"    },
  location: { label: "Location", className: "badge-location" },
};

const renderBadge = (config, value) => {
  const c = config[value] ?? { label: value, className: "badge-default" };
  return <span className={c.className}>{c.label}</span>;
};

const fmt = (date) => new Date(date).toLocaleDateString("fr-FR");

const TraitementsAdmin = () => {
  const [traitements, setTraitements]           = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [message, setMessage]                   = useState("");
  const [messageType, setMessageType]           = useState("");
  const [selectedTraitement, setSelectedTraitement] = useState(null);
  const [filterStatus, setFilterStatus]         = useState("all");

  useEffect(() => { fetchTraitements(); }, []);

  const fetchTraitements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/traitements`);
      setTraitements(res.data.traitements);
    } catch {
      setMessage("Erreur lors du chargement des traitements.");
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/traitements/${id}/status`, { status });
      setMessage(`Traitement ${status === "valide" ? "validé" : "refusé"} avec succès.`);
      setMessageType("success");
      setSelectedTraitement(null);
      fetchTraitements();
    } catch {
      setMessage("Erreur lors de la mise à jour du statut.");
      setMessageType("danger");
    }
  };

  const stats = {
    total:     traitements.length,
    en_attente: traitements.filter(t => t.status === "en_attente").length,
    valide:    traitements.filter(t => t.status === "valide").length,
    refuse:    traitements.filter(t => t.status === "refuse").length,
  };

  const filtered = filterStatus === "all"
    ? traitements
    : traitements.filter(t => t.status === filterStatus);

  const filters = [
    { key: "all",        label: "Tous",       count: stats.total,      mod: "all"     },
    { key: "en_attente", label: "En attente", count: stats.en_attente, mod: "attente" },
    { key: "valide",     label: "Validés",    count: stats.valide,     mod: "valide"  },
    { key: "refuse",     label: "Refusés",    count: stats.refuse,     mod: "refuse"  },
  ];

  if (loading) {
    return <div className="traitements-loading">Chargement...</div>;
  }

  return (
    <div className="traitements-page">
      <Sidebar />

      <main className="traitements-main">

        <p className="traitements-eyebrow">Administration</p>
        <h1 className="traitements-title">Gestion des traitements</h1>
        <div className="traitements-divider" />

        {message && (
          <div className={`traitements-alert traitements-alert--${messageType}`}>
            <span>{message}</span>
            <button className="traitements-alert__close" onClick={() => setMessage("")}>✕</button>
          </div>
        )}

        {/* stats */}
        <div className="traitements-stats">
          <div className="stat-pill stat-pill--total">
            <span className="stat-pill__value">{stats.total}</span>
            <span className="stat-pill__label">Total</span>
          </div>
          <div className="stat-pill stat-pill--attente">
            <span className="stat-pill__value">{stats.en_attente}</span>
            <span className="stat-pill__label">En attente</span>
          </div>
          <div className="stat-pill stat-pill--valide">
            <span className="stat-pill__value">{stats.valide}</span>
            <span className="stat-pill__label">Validés</span>
          </div>
          <div className="stat-pill stat-pill--refuse">
            <span className="stat-pill__value">{stats.refuse}</span>
            <span className="stat-pill__label">Refusés</span>
          </div>
        </div>

        {/* filters */}
        <div className="traitements-filters">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${filterStatus === f.key ? `filter-btn--active-${f.mod}` : ""}`}
              onClick={() => setFilterStatus(f.key)}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* table */}
        <div className="traitements-table-wrap">
          {filtered.length === 0 ? (
            <p className="traitements-empty">Aucun traitement pour ce filtre.</p>
          ) : (
            <table className="traitements-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Propriété</th>
                  <th>Type</th>
                  <th>Date début</th>
                  <th>Date fin</th>
                  <th>Prix</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <span className="cell-name">{t.client?.fullname}</span>
                      <span className="cell-sub">{t.client?.email}</span>
                    </td>
                    <td>
                      <span className="cell-name">{t.property?.title}</span>
                      <span className="cell-sub">{t.property?.address}, {t.property?.city}</span>
                    </td>
                    <td>{renderBadge(typeConfig, t.traitementType)}</td>
                    <td>{fmt(t.startDate)}</td>
                    <td>{t.endDate ? fmt(t.endDate) : <span style={{ color: "#333" }}>—</span>}</td>
                    <td>
                      <span className="cell-price">
                        {(t.salePrice || t.rentPrice)?.toLocaleString()} FCFA
                      </span>
                      {t.traitementType === "location" && (
                        <span className="cell-sub">par mois</span>
                      )}
                    </td>
                    <td>{renderBadge(statusConfig, t.status)}</td>
                    <td>
                      <div className="actions-wrap">
                        {t.status === "en_attente" && (
                          <>
                            <button className="btn-valider" onClick={() => updateStatus(t._id, "valide")}>Valider</button>
                            <button className="btn-refuser" onClick={() => updateStatus(t._id, "refuse")}>Refuser</button>
                          </>
                        )}
                        <button className="btn-details" onClick={() => setSelectedTraitement(t)}>Détails</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* modal */}
        {selectedTraitement && (
          <div className="modal-overlay" onClick={() => setSelectedTraitement(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>

              <div className="modal-header">
                <h2 className="modal-title">Détails du traitement</h2>
                <button className="modal-close" onClick={() => setSelectedTraitement(null)}>✕</button>
              </div>

              <div className="modal-body">
                <div>
                  <p className="modal-section-title">Client</p>
                  <div className="modal-row">
                    <div className="modal-field">
                      <span className="modal-field__key">Nom</span>
                      <span className="modal-field__val">{selectedTraitement.client?.fullname}</span>
                    </div>
                    <div className="modal-field">
                      <span className="modal-field__key">Email</span>
                      <span className="modal-field__val">{selectedTraitement.client?.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="modal-section-title">Propriété</p>
                  <div className="modal-row">
                    <div className="modal-field">
                      <span className="modal-field__key">Titre</span>
                      <span className="modal-field__val">{selectedTraitement.property?.title}</span>
                    </div>
                    <div className="modal-field">
                      <span className="modal-field__key">Adresse</span>
                      <span className="modal-field__val">{selectedTraitement.property?.address}, {selectedTraitement.property?.city}</span>
                    </div>
                    <div className="modal-field">
                      <span className="modal-field__key">Prix bien</span>
                      <span className="modal-field__val">{selectedTraitement.property?.price?.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="modal-section-title">Traitement</p>
                  <div className="modal-row">
                    <div className="modal-field">
                      <span className="modal-field__key">Type</span>
                      <span className="modal-field__val">{renderBadge(typeConfig, selectedTraitement.traitementType)}</span>
                    </div>
                    <div className="modal-field">
                      <span className="modal-field__key">Date début</span>
                      <span className="modal-field__val">{fmt(selectedTraitement.startDate)}</span>
                    </div>
                    {selectedTraitement.endDate && (
                      <div className="modal-field">
                        <span className="modal-field__key">Date fin</span>
                        <span className="modal-field__val">{fmt(selectedTraitement.endDate)}</span>
                      </div>
                    )}
                    <div className="modal-field">
                      <span className="modal-field__key">Prix</span>
                      <span className="modal-field__val" style={{ color: "#c8a050" }}>
                        {(selectedTraitement.salePrice || selectedTraitement.rentPrice)?.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="modal-section-title">Statut</p>
                  <div className="modal-row">
                    <div className="modal-field">
                      <span className="modal-field__key">Statut actuel</span>
                      <span className="modal-field__val">{renderBadge(statusConfig, selectedTraitement.status)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTraitement.status === "en_attente" && (
                <div className="modal-footer">
                  <button className="btn-valider" onClick={() => updateStatus(selectedTraitement._id, "valide")}>
                    Valider ce traitement
                  </button>
                  <button className="btn-refuser" onClick={() => updateStatus(selectedTraitement._id, "refuse")}>
                    Refuser ce traitement
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default TraitementsAdmin;












