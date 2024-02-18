import { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faTimes,
  faLightbulb,
  faTachometerAlt,
  faArrowCircleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { icon: faLightbulb, text: "Add accessory", onClick: () => {} },
  { icon: faTachometerAlt, text: "Add automation", onClick: () => {} },
  { icon: faArrowCircleRight, text: "Add room", onClick: () => {} },
  { icon: faUser, text: "Add users", onClick: () => {} },
];

const MenuItem = ({ icon, text, onClick }) => {
  return (
    <div className="menu-item" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <span className="hover-underline-animation">{text}</span>
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="header">
      <div className="header-item home-icon">
        <FontAwesomeIcon icon={faHome} className="header-icon" />
      </div>
      <div className="header-item">
        <div className="plus-icon" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faPlus}
            className="header-icon"
          />
        </div>
        {isOpen && (
          <div className="overflow-menu">
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
