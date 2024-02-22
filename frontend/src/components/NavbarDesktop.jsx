import { useContext } from "react";
import { CategoriesContext } from "../CategoriesContext";
import { RoomContext } from "../RoomContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import "./NavbarDesktop.css";

const NavbarDesktop = () => {
  const { categories } = useContext(CategoriesContext);
  const { rooms } = useContext(RoomContext);

  return (
    <div className="navbar-desktop">
      <h2 className="logo">Smart Home Mate</h2>
      <div className="navbar-main">
        <NavLink to="/" className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}>
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faHome} />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink to="/automations" className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}>
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <p>Automation</p>
          </div>
        </NavLink>
        <NavLink to="/settings" className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}>
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faCog} />
            <p>Settings</p>
          </div>
        </NavLink>
      </div>
      <div className="navbar-categories-container">
        <h3>Categories</h3>
        <div className="navbar-categories">
          {categories.map((category) => (
            <div key={category.id} className="navbar-category">
              <FontAwesomeIcon icon={category.icon} />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="navbar-rooms-container">
        <h3>Rooms</h3>
        <div className="navbar-rooms">
          {rooms.map((room) => (
            <div key={room.id} className="navbar-room">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
              <p>{room.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;