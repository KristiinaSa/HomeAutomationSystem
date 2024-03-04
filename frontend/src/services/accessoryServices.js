import axios from "axios";
const baseUrl = "/api/v1/accessories";

export const getAccessories = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    console.log("Error getting accessories: " + err);
    throw new Error(err.response.data);
  }
};

export const getDevices = async () => {
  try {
    const response = await axios.get(`${baseUrl}/devices`);
    return response.data;
  } catch (err) {
    console.log("Error getting devices: " + err);
    throw new Error(err.response.data);
  }
};

  export const addDevice = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/add-device/`, data);
      return response.data;
    } catch (err) {
      console.log("Error getting device: " + err);
      throw new Error(err.response.data);
    }
  };

export const getRoomNames = async () => {
  try {
    const response = await axios.get(`/api/v1/rooms`);
    return response.data;
  } catch (err) {
    console.log("Error getting rooms: " + err);
    throw new Error(err.response.data);
  }
}