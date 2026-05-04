import { Link } from "react-router-dom";
import './CardProperty.css';

const statusConfig = {
  a_vendre: { label: "À vendre", className: "prop-badge prop-badge--vendre" },
  a_louer:  { label: "À louer",  className: "prop-badge prop-badge--louer" },
  vendu:    { label: "Vendu",    className: "prop-badge prop-badge--vendu" },
  loue:     { label: "Loué",     className: "prop-badge prop-badge--loue" },
};

const renderStatus = (status) => {
  const config = statusConfig[status] ?? { label: status, className: "prop-badge prop-badge--default" };
  return <span className={config.className}>{config.label}</span>;
};

const CardProperty = ({ property }) => {
  const { title, type, status, price, image } = property;

  return (
    <div className="prop-card">

      <div className="prop-card__img-wrap">
        <img src={image} alt={title} className="prop-card__img" />
        <div className="prop-card__badge-wrap">
          {renderStatus(status)}
        </div>
      </div>

      <div className="prop-card__body">

        <p className="prop-card__type">{type}</p>
        <h3 className="prop-card__title">{title}</h3>

        <p className="prop-card__price">
          {price.toLocaleString()}
          <span className="prop-card__currency"> FCFA</span>
        </p>

        <Link to={`/properties/${property._id}`} className="prop-card__btn">
          Voir détails
          <span className="prop-card__btn-arrow">→</span>
        </Link>

      </div>

    </div>
  );
};

export default CardProperty;


