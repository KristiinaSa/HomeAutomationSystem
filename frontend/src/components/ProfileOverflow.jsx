import { useState, useRef, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faUserCircle,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const ProfileOverflow = ({ user }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef();
  const { t } = useLanguage();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleProfileMenuClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        !e.target.closest(".welcome-user")
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleProfileMenuClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleProfileMenuClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <div>
      <div
        className="welcome-user"
        onClick={() => {
          setIsProfileMenuOpen(!isProfileMenuOpen);
        }}
      >
        <FontAwesomeIcon icon={faUserCircle} className="header-icon" />
        <span>{user}</span>
        <FontAwesomeIcon
            icon={faChevronDown}
            className="header-icon"
            style={{ fontSize: "10px" }}
          />
      </div>

      <div
        className={`overflow-menu ${isProfileMenuOpen ? "show" : ""}`}
        ref={profileMenuRef}
      >
        <div className="menu-item" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} className="header-icon" />
          <span className="hover-underline-animation">{t("logout")}</span>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileOverflow;
