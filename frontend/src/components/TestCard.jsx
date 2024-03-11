import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestCard.css";

const TestCard = ({ id, title, icon, status, handleToggle }) => {
  const iconClass = status === "on" ? "icon-on" : "icon-off";

  return (
    <div className="card" onClick={() => handleToggle(id)}>
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="2x" className={iconClass} />
        <div className="card-column">
          <p>{title}</p>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
