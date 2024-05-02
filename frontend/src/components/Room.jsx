import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Room.css";

const Room = ({ name }) => {
  return (
    <div className="room-box">
      <h3>{name}</h3>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

Room.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Room;
