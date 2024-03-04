import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CategoriesContext } from "../CategoriesContext";
import { RoomContext } from "../RoomContext";
import "./HomeMobile.css";
import TestCard from "./TestCard";
import Room from "./Room";

const HomeMobile = () => {
  const { categories } = useContext(CategoriesContext);
  const { rooms } = useContext(RoomContext);

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
              {room.cards &&
                room.cards.map((card) => (
                  <TestCard
                    key={card.id}
                    title={card.title}
                    icon={card.icon}
                    status={card.status}
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
