import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-item home-icon">
        <FontAwesomeIcon icon={faHome} className="header-icon" />
      </div>
      <div className="header-item plus-icon">
        <FontAwesomeIcon icon={faPlus} className="header-icon" />
      </div>
    </div>
  );
};

export default Header;
