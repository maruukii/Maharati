import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  RESET_CALENDAR,
} from "./actionTypes";

const INIT_STATE = {
  events: [],
  categories: [],
  error: {},
  isEventUpdated: false, // Flag to track event update status
};

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };

    case GET_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
        isEventUpdated: true,
      };

    case ADD_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isEventUpdated: false,
      };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
        isEventUpdated: true,
      };

    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isEventUpdated: false,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== action.payload._id
        ),
        isEventUpdated: true,
      };

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
        isEventUpdated: false,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case RESET_CALENDAR:
      return {
        ...state,
        [action.payload.flag]: action.payload.value,
      };

    default:
      return state;
  }
};

export default Calendar;
