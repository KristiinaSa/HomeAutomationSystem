import axios from "./axiosInstance";

const baseUrl = "/api/v1/login";

const login = async (email, password) => {
  try {
    const response = await axios.post(baseUrl, { email, password });
    console.log("response", response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${baseUrl}/logout`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

const joinSystem = async (name, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      name,
      email,
      password,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error registering:", error.message);
    throw error;
  }
};

const createSystem = async (name, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/create-system`, {
      name,
      email,
      password,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating system:", error.message);
    throw error;
  }
};

export default { login, logout, joinSystem, createSystem };
