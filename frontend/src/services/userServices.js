import axios from "./axiosInstance";
const baseUrl = "/api/v1/users";

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete-user/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (err) {
    console.error("Error deleting user:", err.message);
    throw err;
  }
};

const inviteUser = async (email) => {
  try {
    const response = await axios.post(`${baseUrl}/invite-user`, { email });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

const changeRole = async (id, role) => {
  try {
    const response = await axios.patch(`${baseUrl}/change-role/${id}`, {
      role,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (err) {
    console.error("Error changing role:", err.message);
    throw err;
  }
};

const themeToggler = async () => {
  try {
    const response = await axios.post(`${baseUrl}/theme`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (err) {
    console.error("Error changing role:", err.message);
    throw err;
  }
};

export { getAllUsers, deleteUser, inviteUser, changeRole, themeToggler };
