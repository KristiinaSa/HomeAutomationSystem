import axios from "axios";
const baseUrl = "/api/v1/automations";

export const getAutomations = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const getAutomation = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const addAutomation = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const updateAutomation = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const deleteAutomation = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};
