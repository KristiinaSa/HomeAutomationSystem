import { useEffect, useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  deleteUser,
  inviteUser,
  getAllUsers,
  changeRole,
} from "../services/userServices";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
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
  const [message, setMessage] = useState("");
  const { t } = useLanguage();
  const { role } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setPersons(users);
      setUpdate(false);
      console.log(users);
    } catch (error) {
      console.log(error);
      setMessage(
        t(
          "Oops! There was a hiccup fetching user details. Please refresh and try once more."
        )
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [update]);

  const deletePerson = async (id) => {
    if (!window.confirm(t("Are you sure you want to delete this user?")))
      return;
    else {
      try {
        await deleteUser(id);
        setUpdate(true);
        setMessage(t("All set! The user has been successfully removed."));
      } catch (error) {
        console.log("Error delete user", error.message);
        setMessage(
          t("Could not delete user this time. Please try again later.")
        );
      }
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const editPerson = (id) => {
    setEditingId(id);
    console.log("Editing user with id:", id);
  };

  const updateRole = async (id, newRole) => {
    if (newRole === persons.find((user) => user.id === editingId).role) {
      setEditingId(null);
      return;
    }
    try {
      await changeRole(id, newRole);
      setEditingId(null);
      setUpdate(true);
      setMessage(t("Role updated successfully!"));
    } catch (error) {
      console.log("Failed to update role:", error.message);
      setMessage(
        t(
          "Oops! Updating the role didn't quite work out. Let's give it another shot."
        )
      );
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const invitePerson = async (email) => {
    try {
      await inviteUser(email);
      reset();
      setShowInvite(false);
      setInviteSent(true);
      setUpdate(true);
    } catch (error) {
      console.log("Failed to invite user:", error.message);
      setMessage(
        t(
          "Looks like sending the invitation hit a snag. How about we try that once more?"
        )
      );
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="users-container">
      <h2>{t("users")}</h2>
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
                        <option value="admin">{t("admin")}</option>
                        <option value="resident">{t("resident")}</option>
                      </select>
                    ) : (
                      <span className="user-role">{t(user.role)}</span>
                    )}
                  </h4>
                  <p>{user.email}</p>
                </div>
              </div>
              {(role === "admin" || role === 'owner') && (
                <div className="user-actions">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit"
                    data-testid={`edit-${user.id}`}
                    onClick={() => editPerson(user.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete"
                    data-testid={`delete-${user.id}`}
                    onClick={() => deletePerson(user.id)}
                  />
                </div>
              )}
            </div>
          );
        })}
        {(role === "admin" || role === 'owner') &&
          (showInvite ? (
            <form onSubmit={handleSubmit(invitePerson)} className="invite-form">
              <input
                {...register("email", {
                  required: t("Email is required"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: t("Invalid email address"),
                  },
                })}
                type="email"
                placeholder={t("Enter email")}
                className="invite-input"
                data-testid="invite-input"
              />
              {isSubmitted && errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}

              <button
                type="submit"
                className="invite-button"
                data-testid="invite-submit"
              >
                {t("Send")}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowInvite(false)}
              >
                {t("cancel")}
              </button>
            </form>
          ) : inviteSent ? (
            <p className="invite-sent">{t("Invitation sent")}</p>
          ) : (
            <div className="invite" onClick={() => setShowInvite(true)}>
              <FontAwesomeIcon icon={faPlus} />
              {t("Invite people")}
            </div>
          ))}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Users;
