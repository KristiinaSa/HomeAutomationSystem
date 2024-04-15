import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestCard.css";
import { useLanguage } from "../context/LanguageContext";

const TestCard = ({ title, icon, status, onClick }) => {
  const iconClass = status === "on" ? "icon-on" : "icon-off";
  const { t } = useLanguage();

  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="2x" className={iconClass} />
        <div className="card-column noSelect">
          <p>{title}</p>
          <p>{t(status)}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
