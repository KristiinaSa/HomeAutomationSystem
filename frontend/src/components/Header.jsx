import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
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
} from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ icon, text, path, onClick }) => {
  return (
    <div className="menu-item" onClick={onClick}>
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
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/login/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      navigate("/login");
      logout();
    } else {
      console.error("Logout failed");
    }
  };

  const menuItems = [
    {
      icon: faLightbulb,
      text: "Add accessory",
      onClick: () => {
        console.log("Add accessory clicked");
      },
    },
    { icon: faTachometerAlt, text: "Add automation", path: "/automations/new" },
    {
      icon: faArrowCircleRight,
      text: "Add room",
      onClick: () => {
        console.log("Add room clicked");
      },
    },
    {
      icon: faUser,
      text: "Add users",
      onClick: () => {
        console.log("Add users clicked");
      },
    },
    isLoggedIn
      ? { icon: faSignOut, text: "Log out", onClick: handleLogout }
      : { icon: faSignIn, text: "Log in", path: "/login" },
    !isLoggedIn && { icon: faAddressBook, text: "Register", path: "/register" },
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
      <NavLink to="/" className="header-item home-icon">
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
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
