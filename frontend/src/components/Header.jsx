import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

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
  faAddressBook,
  faHouseLaptop,
} from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ icon, text, path, onClick, onClose }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="menu-item" onClick={handleClick}>
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
  const node = useRef();
  const { isLoggedIn } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
    }
  };

  const menuItems = isLoggedIn
    ? [
        {
          icon: faLightbulb,
          text: "Add device",
          path: "/add-device",
        },
        { icon: faHouseLaptop, text: "Accessories", path: "/accessories" },
        {
          icon: faTachometerAlt,
          text: "Add automation",
          path: "/automations/new",
        },
        {
          icon: faArrowCircleRight,
          text: "Add room",
          path: "/add-room",
        },
        {
          icon: faUser,
          text: "Add users",
          path: "/settings",
        },
        { icon: faSignOut, text: "Log out", onClick: handleLogout },
      ]
    : [
        { icon: faSignIn, text: "Log in", path: "/login" },
        { icon: faAddressBook, text: "Register", path: "/register" },
      ];

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="header" ref={node}>
      <NavLink
        to="/"
        className="header-item home-icon"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <FontAwesomeIcon icon={faHome} className="header-icon" />
      </NavLink>
      <div className="header-item">
        <div className="plus-icon" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faPlus}
            className="header-icon"
          />
        </div>
        <div className={`overflow-menu ${isOpen ? "show" : ""}`}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} onClose={() => setIsOpen(false)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
