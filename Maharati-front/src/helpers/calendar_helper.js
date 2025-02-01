import axios from "axios";
import { calenderDefaultCategories } from "../CommonData/Data";
const API_URL = import.meta.env.VITE_HOST + "/calendar";

// Get all events
export const getEvents = async (id, token) => {
  console.log(id);
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add a new event
export const addNewEvent = async (event, token) => {
  const response = await axios.post(`${API_URL}/new`, event, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update an event
export const updateEvent = async (event, token) => {
  const response = await axios.put(`${API_URL}/update/${event._id}`, event, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete an event
export const deleteEvent = async (eventId, token) => {
  const response = await axios.delete(`${API_URL}/delete/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get categories
export const getCategories = () => calenderDefaultCategories;
