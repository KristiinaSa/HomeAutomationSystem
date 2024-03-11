import { createContext, useState, useEffect } from "react";
import { getRooms } from "../services/roomServices";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [update, setUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
        setUpdate(false);
      } catch (error) {
        console.log(error);
        setErrorMessage("Looks like we stumbled while fetching your rooms. Mind trying again shortly?");
      }
    };
    fetchRooms();
  }, [update]);

  return (
    <RoomContext.Provider value={{ rooms, update, setUpdate, errorMessage }}>{children}</RoomContext.Provider>
  );
};
