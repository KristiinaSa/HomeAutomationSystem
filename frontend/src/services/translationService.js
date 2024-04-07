import axios from "./axiosInstance";
const baseUrl = "/api/v1/languages";

const getTranslation = async (language) => {
  try {
    const response = await axios.get(
      `${baseUrl}/translations/?lng=${language}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export default getTranslation;
