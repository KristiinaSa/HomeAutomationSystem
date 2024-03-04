import { createContext, useState, useEffect } from "react";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms([
      {
        id: 1,
        name: "Living room",
        cards: [
          { id: 1, title: "Lights", icon: faLightbulb, status: "ON" },
          { id: 2, title: "Lights", icon: faLightbulb, status: "OFF" },
          { id: 3, title: "Lights", icon: faLightbulb, status: "ON"}
        ],
      },
      {
        id: 2,
        name: "Bedroom",
        cards: [{ id: 2, title: "Lights", icon: faLightbulb, status: 1 }],
      },
    ]);
  }, []);

  return (
    <RoomContext.Provider value={{ rooms }}>{children}</RoomContext.Provider>
  );
};
