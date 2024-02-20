import { useContext } from "react";
import { CategoriesContext } from "../CategoriesContext";
import { RoomContext } from "../RoomContext";
import "./HomeMobile.css";
import TestCard from "./TestCard";
import Room from "./Room";

const HomeMobile = () => {
  const {categories} = useContext(CategoriesContext);
  const {rooms} = useContext(RoomContext);

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
            count={category.count}
          />
        ))}
      </div>

      <div className="rooms-container">
        <h2>Rooms</h2>
        {rooms.map((room) => (
          <div key={room.id}>
            <Room name={room.name} />
            <div className="card-container">
              {room.cards &&
                room.cards.map((card) => (
                  <TestCard
                    key={card.id}
                    title={card.title}
                    icon={card.icon}
                    count={card.count}
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
