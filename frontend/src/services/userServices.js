import axios from "axios";
const baseUrl = "/api/v1/users";

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
    } catch (err) {
    throw new Error(err.response.data);
    }
}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
}

const inviteUser = async (email) => {
  try {
    const response = await axios.post(`${baseUrl}/invite-user`, { email });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
}

export { getAllUsers, deleteUser, inviteUser }