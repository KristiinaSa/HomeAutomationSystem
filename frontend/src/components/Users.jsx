import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyUsers } from "../dummyData/dummyUsers";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
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
                  <h4>
                    {user.name} <span>{user.role}</span>
                  </h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-actions">
                <FontAwesomeIcon icon={faEdit} className="user-icon" />
                <FontAwesomeIcon icon={faTrash} className="user-icon" />
              </div>
            </div>
          );
        })}
      </div>
      <button className="invite-button">
        <FontAwesomeIcon icon={faPlus} />
        Invite people
      </button>
    </div>
  );
};

export default Users;
