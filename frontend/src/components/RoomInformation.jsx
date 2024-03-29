import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import TestCard from "./TestCard";
import { useParams } from "react-router-dom";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./RoomInformation.css";
import useToggle from "../hooks/useToggle";
import { DeviceContext } from "../context/DeviceContext";

const RoomInformation = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));
  const { devices, errorMsg } = useContext(DeviceContext);
  const { handleToggle } = useToggle();

  const roomDevices = room
    ? devices.filter((device) => device.room_id === room.id)
    : [];

  return (
    <div>
      <div className="room-information-container" data-testid="room-container">
        {room ? (
          <div key={room.id}>
            <h2>{room.name}</h2>
            <div className="room-cards-container">
              <div className="cards">
                {roomDevices.map((card) => (
                  <TestCard
                    key={card.id}
                    title={card.name}
                    icon={
                      (card.type === "light") | (card.type === "Light")
                        ? faLightbulb
                        : ""
                    }
                    status={card.value}
                    onClick={() => handleToggle(card.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading room information...</p>
        )}
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    </div>
  );
};

export default RoomInformation;
