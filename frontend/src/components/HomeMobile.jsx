import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CategoriesContext } from "../context/CategoriesContext";
import { RoomContext } from "../context/RoomContext";
import { DeviceContext } from "../context/DeviceContext";
import { AuthContext } from "../context/AuthContext";
import "./HomeMobile.css";
import TestCard from "./TestCard";
import Room from "./Room";
import useToggle from "../hooks/useToggle";
import { useLanguage } from "../context/LanguageContext";

const HomeMobile = () => {
  const { categories } = useContext(CategoriesContext);
  const { rooms, errorMessage } = useContext(RoomContext);
  const { devices, errorMsg } = useContext(DeviceContext);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = () => {
    navigate("/add-room");
  };

  const { handleToggle } = useToggle();

  return (
    <div className="home-container">
      <h1>{t("home")}</h1>
      <div className="categories-container">
        <h2>{t("categories")}</h2>
        <div className="card-container">
          {categories.map((category) => (
            <TestCard
              key={category.id}
              title={t(category.title.toLowerCase())}
              icon={category.icon}
              status={category.status}
            />
          ))}
        </div>
      </div>

      <div className="rooms-container">
        <div className="rooms-title">
          <h2>{t("rooms")}</h2>
          {(role === "admin" || role === "owner") && (
            <button
              type="button"
              className="primary-btn"
              onClick={() => handleClick()}
            >
              {t("add")} {t("room")}
            </button>
          )}
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
                      type={device.device_type.name}
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
