import axios from "axios";
const baseUrl = "/api/v1/accessories";

export const getAccessories = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const getDevices = async () => {
  try {
    const response = await axios.get(`${baseUrl}/devices`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};
