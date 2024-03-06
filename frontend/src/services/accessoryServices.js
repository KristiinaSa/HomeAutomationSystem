import axios from "./axiosInstance";
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
      console.log("Device added successfully", response.data);
      return response.data;
    } catch (err) {
      console.log("Error getting device: " + err);
      throw new Error(err.response.data);
    }
  };

  export const deleteDevice = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete-device/${id}`);
      console.log("Device deleted successfully", response.data);
      return response.data;
    } catch (err) {
      console.log("Error deleting device: " + err);
      throw new Error(err.response.data);
    }
  };
