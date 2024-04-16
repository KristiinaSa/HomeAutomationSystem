import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faCog,
  faHouseLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./NavbarMobile.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useLanguage } from "../context/LanguageContext";

const NavbarMobile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { t } = useLanguage();

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
    }
  };

  return (
    <div className="navbar-mobile">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "navbar-link")}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div className="navbar-mobile_item">
          <FontAwesomeIcon icon={faHome} className="navbar-mobile-icon" />
          {t("home")}
        </div>
      </NavLink>
      <NavLink
        to="/automations"
        className={({ isActive }) => (isActive ? "active" : "navbar-link")}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div className="navbar-mobile_item">
          <FontAwesomeIcon
            icon={faTachometerAlt}
            className="navbar-mobile-icon"
          />
          {t("automation")}
        </div>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? "active" : "navbar-link")}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div className="navbar-mobile_item">
          <FontAwesomeIcon icon={faCog} className="navbar-mobile-icon" />
          {t("settings")}
        </div>
      </NavLink>
      <NavLink
        to="/accessories"
        className={({ isActive }) => (isActive ? "active" : "navbar-link")}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div className="navbar-mobile_item">
          <FontAwesomeIcon
            icon={faHouseLaptop}
            className="navbar-mobile-icon"
          />
          {t("accessories")}
        </div>
      </NavLink>
    </div>
  );
};

export default NavbarMobile;
