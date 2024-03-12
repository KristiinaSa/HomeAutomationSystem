import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import TestCard from "./TestCard";
import { useParams } from "react-router-dom";
import { getRoomDevices } from "../services/accessoryServices";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./RoomInformation.css";

const RoomInformation = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));
  const [roomDevices, setRoomDevices] = useState([]);
  const [message, setMessage] = useState("");

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
        setMessage(
          "Uh-oh! We ran into a snag pulling up your room's devices. Could you try again later?"
        );
      }
    }
  }, [room]);

  return (
    <div>
      <div className="room-information-container">
      {room && (
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
                status={card.status}
              />
            ))}
            </div>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default RoomInformation;
