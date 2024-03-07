import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../RoomContext";
import TestCard from "./TestCard";
import { useParams } from "react-router-dom";
import { getRoomDevices } from "../services/accessoryServices";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const RoomInformation = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));
  const [roomDevices, setRoomDevices] = useState([]);

  useEffect(() => {
    if (room) {
      try {
        const fetchRoomDevices = async () => {
          const devices = await getRoomDevices(room.id);
          setRoomDevices(devices);
        };
        fetchRoomDevices();
      } catch (error) {
        console.log(error);
      }
    }}, [room]);

  return (
    <div>
      {room && (
        <div key={room.id}>
          <h2>{room.name}</h2>
          <div className="cards">
            {roomDevices.map ((card) => (
              <TestCard
                key={card.id}
                title={card.name}
                icon={card.type === "light" | card.type === "Light" ? faLightbulb : ""}
                status={card.status}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomInformation;
