import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faCog,
  faHouseLaptop,
  faDiagramProject,
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

  if (!isLoggedIn) {
    return null;
  }

  const navItems = [
    { to: "/", icon: faHome, label: "home" },
    { to: "/automations", icon: faTachometerAlt, label: "automation" },
    { to: "/settings", icon: faCog, label: "settings" },
    { to: "/accessories", icon: faHouseLaptop, label: "accessories" },
    { to: "/analytics", icon: faDiagramProject, label: "analytics" },
  ];

  return (
    <div className="navbar-mobile">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : "navbar-link")}
          onClick={handleClick}
        >
          <div className="navbar-mobile_item">
            <FontAwesomeIcon icon={item.icon} className="navbar-mobile-icon" />
            {t(item.label)}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default NavbarMobile;
