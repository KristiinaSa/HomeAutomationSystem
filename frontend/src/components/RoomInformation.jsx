import React, { useContext } from "react";
import { RoomContext } from "../RoomContext";
import TestCard from "./TestCard";
import { useParams } from "react-router-dom";

const RoomInformation = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const room = rooms.find((room) => room.id === parseInt(id));

  return (
    <div>
      {room && (
        <div key={room.id}>
          <h2>{room.name}</h2>
          <div className="cards">
            {room.cards.map((card) => (
              <TestCard
                key={card.id}
                title={card.title}
                icon={card.icon}
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
