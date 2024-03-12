import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CategoriesContext } from "../context/CategoriesContext";
import { RoomContext } from "../context/RoomContext";
import { DeviceContext } from "../context/DeviceContext";
import "./HomeMobile.css";
import TestCard from "./TestCard";
import Room from "./Room";
import { toggleOnOff } from "../services/accessoryServices";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const HomeMobile = () => {
  const { categories } = useContext(CategoriesContext);
  const { rooms, errorMessage } = useContext(RoomContext);
  const { devices, setDevices, errorMsg } = useContext(DeviceContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-room");
  };

  const handleToggle = async (id) => {
    try {
      const device = await toggleOnOff(id);
      console.log("Toggled device:", device);
      const updatedDevices = devices.map((d) =>
        d.id === device.id ? { ...d, value: device.value } : d
      );
      setDevices(updatedDevices);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="categories-container">
        <h2>Categories</h2>
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
      </div>

      <div className="rooms-container">
        <div className="rooms-title">
          <h2>Rooms</h2>
          <button
            type="button"
            className="primary-btn"
            onClick={() => handleClick()}
          >
            Add room
          </button>
        </div>
        {rooms.map((room) => (
          <div key={room.id} className="room-container">
            <NavLink to={`/room/${room.id}`} className="home-link">
              <Room name={room.name} />
            </NavLink>
            <div className="card-container">
              {room &&
                devices
                  .filter((device) => device.room_id === room.id)
                  .map((device) => (
                    <TestCard
                      key={device.id}
                      title={device.name}
                      icon={
                        (device.type === "light") | (device.type === "Light")
                          ? faLightbulb
                          : ""
                      }
                      status={device.value}
                      onClick={() => handleToggle(device.id)}
                    />
                  ))}
            </div>
          </div>
        ))}
      </div>
      {(errorMessage || errorMsg) && <p>{errorMessage || errorMsg}</p>}
    </div>
  );
};

export default HomeMobile;
