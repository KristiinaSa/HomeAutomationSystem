import { createContext, useState, useEffect, useContext } from "react";
import { getRooms } from "../services/roomServices";
import { AuthContext } from "./AuthContext";
import { useLanguage } from "./LanguageContext";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [update, setUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
        setUpdate(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(
          t(
            "Looks like we stumbled while fetching your rooms. Mind trying again shortly?"
          )
        );
      }
    };
    if (isLoggedIn) {
      fetchRooms();
    }
  }, [update, isLoggedIn]);

  return (
    <RoomContext.Provider value={{ rooms, update, setUpdate, errorMessage }}>
      {children}
    </RoomContext.Provider>
  );
};
