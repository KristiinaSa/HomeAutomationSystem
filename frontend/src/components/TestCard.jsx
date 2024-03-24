import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestCard.css";
import { useTranslation } from "react-i18next";

const TestCard = ({ title, icon, status, onClick }) => {
  const iconClass = status === "on" ? "icon-on" : "icon-off";
  /*const capitalizedStatus = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : ""; */
  const lowercasedStatus = status ? status.toLowerCase() : "";

  const { t } = useTranslation();

  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="2x" className={iconClass} />
        <div className="card-column noSelect">
          <p>{title}</p>
          <p>{t(lowercasedStatus)}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
