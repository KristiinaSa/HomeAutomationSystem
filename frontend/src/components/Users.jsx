import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyUsers } from "../dummyData/dummyUsers";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Users.css";

const Users = () => {
  return (
    <div className="users-container">
      <h2>Users</h2>
      <div className="users-box">
        {dummyUsers.map((user) => {
          const initials = user.name
            .split(" ")
            .slice(0, 2)
            .map((namePart) => namePart[0])
            .join("")
            .toUpperCase();
          return (
            <div key={user.id} className="user-info">
              <div className="circle-and-info">
                <div className="user-initials">{initials}</div>
                <div className="user-name">
                  <h4>{user.name}</h4>
                  <p>{user.role}</p>
                </div>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="user-icon"/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
