import { createContext, useState, useEffect } from "react";
import { getRooms } from "../services/roomServices";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <RoomContext.Provider value={{ rooms }}>{children}</RoomContext.Provider>
  );
};
