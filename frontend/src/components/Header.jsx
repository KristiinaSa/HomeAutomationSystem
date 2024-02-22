import { useState } from "react";
import { NavLink } from "react-router-dom";
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
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

const isLoggedIn = false;

const menuItems = [
  { icon: faLightbulb, text: "Add accessory", onClick: () => {} },
  { icon: faTachometerAlt, text: "Add automation", path: "/automations/new" },
  { icon: faArrowCircleRight, text: "Add room", onClick: () => {} },
  { icon: faUser, text: "Add users", onClick: () => {} },
  isLoggedIn
    ? { icon: faSignOut, text: "Log out", path: "/logout" }
    : { icon: faSignIn, text: "Log in", path: "/login" },
];

const MenuItem = ({ icon, text, path }) => {
  return (
    <div className="menu-item">
      <FontAwesomeIcon icon={icon} />
      {path ? (
        <NavLink to={path} className="hover-underline-animation">
          {text}
        </NavLink>
      ) : (
        <span className="hover-underline-animation">{text}</span>
      )}
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="header">
      <NavLink to="/" className="header-item home-icon">
        <div className="header-item home-icon">
          <FontAwesomeIcon icon={faHome} className="header-icon" />
        </div>
      </NavLink>
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
