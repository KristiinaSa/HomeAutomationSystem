import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CategoriesContext } from "../CategoriesContext";
import { RoomContext } from "../RoomContext";
import "./HomeMobile.css";
import TestCard from "./TestCard";
import Room from "./Room";
import { useEffect, useState } from "react";
import { getDevices } from "../services/accessoryServices";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const HomeMobile = () => {
  const { categories } = useContext(CategoriesContext);
  const { rooms } = useContext(RoomContext);
  // const [roomDevices, setRoomDevices] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devices = await getDevices();
        setDevices(devices);
        console.log("devices:", devices);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDevices();
  }, []);


  return (
    <>
      <div className="categories-container">
        <h1>Home</h1>
        <h2>Categories</h2>
      </div>
      <div className="card-container">
        {categories.map((category) => (
          <TestCard
            key={category.id}
            title={category.title}
            icon={category.icon}
            status={category.status}
          />
        ))}
      </div>

      <div className="rooms-container">
        <h2>Rooms</h2>
        {rooms.map((room) => (
          <div key={room.id}>
            <NavLink to={`/room/${room.id}`} className="home-link">
              <Room name={room.name} />
            </NavLink>
            <div className="card-container">
              {room && devices.filter(
                device => device.room_id === room.id
                ).map((device) => (
                <TestCard
                  key={device.id}
                  title={device.name}
                  icon={device.type === "light" | device.type === "Light" ? faLightbulb : ""}
                  status={device.status}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeMobile;
