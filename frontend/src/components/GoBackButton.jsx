import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./GoBackButton.css";

function GoBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
        return;
      }
      if (event.key === 'Escape') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div
      onClick={() => navigate(-1)}
      className="go-back-button"
      data-testid="go-back-button-test"
    >
      <FontAwesomeIcon icon={faArrowCircleLeft} className="go-back-icon" />
    </div>
  );
}

export default GoBackButton;
