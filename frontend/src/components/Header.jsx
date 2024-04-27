import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

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
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import LanguageOverflow from "./LanguageOverflow";
import ProfileOverflow from "./ProfileOverflow";

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
      <div className="icon-container">
        <FontAwesomeIcon icon={icon} />
      </div>
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
  const { user, isLoggedIn } = useContext(AuthContext);
  const { role } = useContext(AuthContext);
  // const { logout } = useContext(AuthContext);
  // const navigate = useNavigate();
  const { t } = useLanguage();

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   logout();
  //   navigate("/login");
  // };

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
    }
  };

  const menuItems = isLoggedIn
    ? [
        {
          icon: faLightbulb,
          text: `${t("add")} ${t("device")}`,
          path: "/add-device",
        },
        // { icon: faHouseLaptop, text: t("accessories"), path: "/accessories" },
        {
          icon: faTachometerAlt,
          text: `${t("add")} ${t("automation")}`,
          path: "/automations/new",
        },
        {
          icon: faArrowCircleRight,
          text: `${t("add")} ${t("room")}`,
          path: "/add-room",
        },
        {
          icon: faUser,
          text: `${t("add")} ${t("users")}`,
          path: "/settings",
        },
        // { icon: faSignOut, text: t("logout"), onClick: handleLogout },
      ]
    : [
        { icon: faSignIn, text: t("login"), path: "/login" },
        { icon: faAddressBook, text: t("register"), path: "/register" },
      ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (node.current.contains(e.target) || e.target.closest(".lang-icon")) {
        return;
      }
      setIsOpen(false);
    };

    const handleClick = (e) => {
      handleClickOutside(e);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  return (
    <div className="header" ref={node}>
      {isLoggedIn && user && <ProfileOverflow user={user} />}
      <LanguageOverflow />
      <NavLink
        to="/"
        className="header-item home-icon"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <FontAwesomeIcon icon={faHome} className="header-icon" />
      </NavLink>
      {(role === "admin" || role === "owner") && (
        <div className="header-item">
          <div
            className="plus-icon"
            onClick={() => {
              // setIsLanguageMenuOpen(false);
              setIsOpen(!isOpen);
            }}
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faPlus}
              className="header-icon"
            />
          </div>
          <div className={`overflow-menu ${isOpen ? "show" : ""}`}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                {...item}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
