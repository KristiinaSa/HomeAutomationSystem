import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CategoriesContext } from "../context/CategoriesContext";
import { RoomContext } from "../context/RoomContext";
import { DeviceContext } from "../context/DeviceContext";
import "./HomeMobile.css";
import TestCard from "./TestCard";
import Room from "./Room";
import useToggle from "../hooks/useToggle";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const HomeMobile = () => {
  const { categories } = useContext(CategoriesContext);
  const { rooms, errorMessage } = useContext(RoomContext);
  const { devices, errorMsg } = useContext(DeviceContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <button
            type="button"
            className="primary-btn"
            onClick={() => handleClick()}
          >
            {t("add")} {t("room")}
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
