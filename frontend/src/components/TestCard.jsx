import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestCard.css";

const TestCard = ({ title, icon, status }) => {
  return (
    <div className="card">
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="2x" />
        <div className="card-column">
          <p>{title}</p>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
