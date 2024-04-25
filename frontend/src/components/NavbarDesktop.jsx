import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faDiagramProject,
  faHome,
  faTachometerAlt,
  faCog,
  faHouseLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

import "./NavbarDesktop.css";

const NavbarDesktop = () => {
  const { rooms } = useContext(RoomContext);
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
    <div className="navbar-desktop">
      <h2 className="logo">Smart Home Mate</h2>
      <div className="navbar-main">
      {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : "navbar-link")}
            onClick={handleClick}
          >
            <div className="navbar-main_item">
              <FontAwesomeIcon icon={item.icon} />
              <p>{t(item.label)}</p>
            </div>
          </NavLink>
        ))}
      </div>
      {isLoggedIn && (
        <>
          <div className="navbar-rooms-container">
            <h3>{t("rooms")}</h3>
            <div className="navbar-rooms">
              {rooms.map((room) => (
                <div key={room.id} className="navbar-room">
                  <NavLink
                    to={`/room/${room.id}`}
                    className={({ isActive }) =>
                      isActive ? "active" : "navbar-link"
                    }
                  >
                    <div className="navbar-room">
                      <FontAwesomeIcon icon={faArrowAltCircleRight} />
                      <p>{room.name}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarDesktop;
