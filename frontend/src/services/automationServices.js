import axios from "axios";
const baseUrl = "/api/v1/automations";

export const getAutomations = async () => {
  try {
    const response = await axios.get(baseUrl);
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

export const getTimerAutomation = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/timer/${id}`);
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

export const addTimerAutomation = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/timer`, data);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const updateTimerAutomation = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/timer/${id}`, data);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const updateAutomation = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
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
