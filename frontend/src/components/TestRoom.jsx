import React from "react";
import "./TestRoom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const TestRoom = ({ name }) => {
  return (
    <div className="room-header">
      <h3>{name}</h3>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export default TestRoom;
