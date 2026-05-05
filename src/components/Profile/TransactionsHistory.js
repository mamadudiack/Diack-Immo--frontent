import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/config";
import { Container, Table, Badge, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./TransactionsHistory.css";
import NavBar from "../../layouts/NavBar";

const TransactionsHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user._id) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API_URL}/traitements/client/${user._id}`);

        setTransactions(res.data.traitements);

      } catch (error) {
        console.error("Erreur récupération transactions", error);
        setMessage("Erreur lors du chargement de l'historique");
      }
    };

    fetchTransactions();
  }, [navigate]);

  return (
    <div>
    <div className="th-page">
        <NavBar />
      <Container className="mt-5">

        <div className="th-header">
          <div className="th-eyebrow">
            <span>Compte client</span>
          </div>
          <h2 className="th-title">Historique des <em>transactions</em></h2>
        </div>

        {/* ERREUR */}
        {message && (
          <Alert variant="danger" className="th-alert">
            {message}
          </Alert>
        )}

        {/* 🔔 NOTIFICATION GLOBALE */}
        {transactions.some(t => t.status === "valide") && (
          <Alert variant="success" className="th-alert">
            🎉 Un de vos traitements a été validé par l’administrateur !
          </Alert>
        )}

        <div className="th-table-wrapper">
          <Table className="th-table">
            <thead>
              <tr>
                <th>Propriété</th>
                <th>Type</th>
                <th>Prix</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Status</th>
                <th>Notification</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t._id}>

                    <td className="th-property-name">
                      {t.property?.title}
                    </td>

                    <td>
                      <Badge
                        bg={t.traitementType === "vente" ? "danger" : "success"}
                        className="th-badge"
                      >
                        {t.traitementType}
                      </Badge>
                    </td>

                    <td className="th-price">
                      {(t.salePrice || t.rentPrice)?.toLocaleString()}{" "}
                      <span className="th-currency">FCFA</span>
                    </td>

                    <td>
                      {new Date(t.startDate).toLocaleDateString("fr-FR")}
                    </td>

                    <td>
                      {t.endDate
                        ? new Date(t.endDate).toLocaleDateString("fr-FR")
                        : <span className="th-dash">—</span>}
                    </td>

                    {/* STATUS */}
                    <td>
                      <Badge
                        bg={
                          t.status === "valide"
                            ? "success"
                            : t.status === "refuse"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {t.status || "en_attente"}
                      </Badge>
                    </td>

                    {/* NOTIFICATION */}
                    <td>
                      {t.status === "valide" && (
                        <span className="text-success">
                          ✅ Validé par l'admin
                        </span>
                      )}

                      {t.status === "en_attente" && (
                        <span className="text-warning">
                          ⏳ En attente de validation
                        </span>
                      )}

                      {t.status === "refuse" && (
                        <span className="text-danger">
                          ❌ Refusé par l'admin
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="th-empty">
                    <div className="th-empty-inner">
                      <span className="th-empty-icon">📭</span>
                      <p>Aucun historique trouvé</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

          </Table>
        </div>

      </Container>
    </div>
     </div>
  );
};

export default TransactionsHistory;
