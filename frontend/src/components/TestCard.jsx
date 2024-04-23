import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestCard.css";
import { useLanguage } from "../context/LanguageContext";

const DEVICE_TYPE_ICONS = {
  light: "lightbulb",
  fan: "fan",
  tv: "tv",
};

const DEVICE_TYPE_ANIMATIONS = {
  fan: "fa-spin",
};

const TestCard = ({ title, type, status, onClick }) => {
  const icon =
    type && type.trim() !== ""
      ? DEVICE_TYPE_ICONS[type.toLowerCase()]
      : undefined;
  const iconClass = status === "on" ? "icon-on" : "icon-off";
  const animation = DEVICE_TYPE_ANIMATIONS[type];
  const { t } = useLanguage();

  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            className={`${iconClass} ${type} ${
              status === "on" && animation ? animation : ""
            }`}
          />
        )}
        <div className="card-column noSelect">
          <p>{title}</p>
          <p>{t(status)}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
