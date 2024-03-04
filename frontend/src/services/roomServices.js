import axios from "axios";
const baseUrl = "/api/v1/rooms";

export const addRoom = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const getRooms = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};
