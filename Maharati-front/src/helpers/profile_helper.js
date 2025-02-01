import axios from "axios";
const API_URL = import.meta.env.VITE_HOST + "/users";

// update profile
export const editProfile = async (user, token) => {
  const response = await axios.put(`${API_URL}/edit-profile`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
