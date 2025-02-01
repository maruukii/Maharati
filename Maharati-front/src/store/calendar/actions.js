import {
  GET_EVENTS,
  GET_EVENTS_FAIL,
  GET_EVENTS_SUCCESS,
  ADD_NEW_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  RESET_CALENDAR,
} from "./actionTypes";

// Fetch events from the backend
export const getEvents = (id, token) => ({
  type: GET_EVENTS,
  payload: { id, token },
});

export const getEventsSuccess = (events) => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEventsFail = (error) => ({
  type: GET_EVENTS_FAIL,
  payload: error,
});

// Add a new event to the backend
export const addNewEvent = (event, token) => ({
  type: ADD_NEW_EVENT,
  payload: { event, token },
});

export const addEventSuccess = (event) => ({
  type: ADD_EVENT_SUCCESS,
  payload: event,
});

export const addEventFail = (error) => ({
  type: ADD_EVENT_FAIL,
  payload: error,
});

// Update an existing event in the backend
export const updateEvent = (event, token) => ({
  type: UPDATE_EVENT,
  payload: { event, token },
});

export const updateEventSuccess = (event) => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const updateEventFail = (error) => ({
  type: UPDATE_EVENT_FAIL,
  payload: error,
});

// Delete an event from the backend
export const deleteEvent = (eventId, token) => ({
  type: DELETE_EVENT,
  payload: { eventId, token },
});

export const deleteEventSuccess = (eventId) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventId,
});

export const deleteEventFail = (error) => ({
  type: DELETE_EVENT_FAIL,
  payload: error,
});

// Fetch categories from the backend
export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = (categories) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getCategoriesFail = (error) => ({
  type: GET_CATEGORIES_FAIL,
  payload: error,
});

// Reset specific state flags in the calendar
export const resetCalendar = (flag, value) => ({
  type: RESET_CALENDAR,
  payload: { flag, value },
});
