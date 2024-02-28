import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { dummyUsers } from "../dummyData/dummyUsers";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteUser,
  inviteUser,
  getAllUsers,
  changeRole,
} from "../services/userServices";
import "./Users.css";

const Users = () => {
  const [persons, setPersons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm();
  const [update, setUpdate] = useState(false);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setPersons(users);
      setUpdate(false);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [update]);

  const deletePerson = async (id) => {
    try {
      console.log("Deleting user with id:", id);
      await deleteUser(id);
      setUpdate(true);
    } catch (error) {
      console.log("Error delete user", error.message);
    }
  };

  const editPerson = (id) => {
    setEditingId(id);
    console.log("Editing user with id:", id);
  };

  const updateRole = async (id, role) => {
    console.log(
      "hfghfg",
      persons.find((user) => user.id === editingId)
    );
    if (role === persons.find((user) => user.id === editingId).role) {
      setEditingId(null);
      return;
    }
    try {
      await changeRole(id, role);
      setEditingId(null);
      console.log("in updateRole");
      setUpdate(true);
    } catch (error) {
      console.log("Failed to update role:", error.message);
    }
  };

  const invitePerson = async (email) => {
    console.log("Inviting user with email:", email);
    try {
      await inviteUser(email);
    console.log("Invitation sent to:", email);
    reset();
    setShowInvite(false);
    setInviteSent(true);
    setUpdate(true);
  } catch (error) {
    console.log("Failed to invite user:", error.message);
  }
}

  useEffect(() => {
    if (inviteSent) {
      setTimeout(() => {
        setInviteSent(false);
      }, 3000);
      return () => clearTimeout();
    }
  }, [inviteSent]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEditingId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="users-container">
      <h2>Users</h2>
      <div className="users-box">
        {persons.map((user) => {
          let initials = "";
          if (user.name) {
            initials = user.name
              .split(" ")
              .slice(0, 2)
              .map((namePart) => namePart[0])
              .join("")
              .toUpperCase();
          }
          return (
            <div key={user.id} className="user-info">
              <div className="circle-and-info">
                <div className="user-initials">{initials}</div>
                <div className="user-name">
                  <h4>
                    {user.name}
                    {editingId === user.id ? (
                      <select
                        ref={dropdownRef}
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        className="role-choicebox"
                      >
                        <option value="admin">Admin</option>
                        <option value="resident">Resident</option>
                      </select>
                    ) : (
                      <span className="user-role">{user.role}</span>
                    )}
                  </h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-actions">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="user-icon, edit"
                  onClick={() => editPerson(user.id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="user-icon, delete"
                  onClick={() => deletePerson(user.id)}
                />
              </div>
            </div>
          );
        })}
        {showInvite ? (
          <form onSubmit={handleSubmit(invitePerson)} className="invite-form">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter email"
              className="invite-input"
            />
            {isSubmitted && errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}

            <button type="submit" className="invite-button">
              Send
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowInvite(false)}
            >
              Cancel
            </button>
          </form>
        ) : inviteSent ? (
          <p className="invite-sent">Invitation sent!</p>
        ) : (
          <div className="invite" onClick={() => setShowInvite(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Invite people
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
