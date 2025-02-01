import { takeEvery, put, call } from "redux-saga/effects";

// Calendar Redux States
import {
  ADD_NEW_EVENT,
  DELETE_EVENT,
  GET_CATEGORIES,
  GET_EVENTS,
  UPDATE_EVENT,
} from "./actionTypes";
import {
  getEventsSuccess,
  getEventsFail,
  addEventFail,
  addEventSuccess,
  updateEventSuccess,
  updateEventFail,
  deleteEventSuccess,
  deleteEventFail,
  getCategoriesSuccess,
  getCategoriesFail,
} from "./actions";

import {
  getEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
  getCategories,
} from "../../helpers/calendar_helper";

function* fetchEvents({ payload: { id, token } }) {
  try {
    const response = yield call(getEvents, id, token);
    yield put(getEventsSuccess(response));
  } catch (error) {
    yield put(getEventsFail(error));
  }
}

function* onAddNewEvent({ payload: { event, token } }) {
  try {
    const response = yield call(addNewEvent, event, token);
    yield put(addEventSuccess(response));
  } catch (error) {
    yield put(addEventFail(error));
  }
}

function* onUpdateEvent({ payload: { event, token } }) {
  try {
    const response = yield call(updateEvent, event, token);
    yield put(updateEventSuccess(response));
  } catch (error) {
    yield put(updateEventFail(error));
  }
}

function* onDeleteEvent({ payload: { eventId, token } }) {
  try {
    const response = yield call(deleteEvent, eventId, token);
    yield put(deleteEventSuccess(response));
  } catch (error) {
    yield put(deleteEventFail(error));
  }
}

function* onGetCategories() {
  try {
    const response = yield call(getCategories);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    yield put(getCategoriesFail(error));
  }
}

function* calendarSaga() {
  yield takeEvery(GET_EVENTS, fetchEvents);
  yield takeEvery(ADD_NEW_EVENT, onAddNewEvent);
  yield takeEvery(UPDATE_EVENT, onUpdateEvent);
  yield takeEvery(DELETE_EVENT, onDeleteEvent);
  yield takeEvery(GET_CATEGORIES, onGetCategories);
}

export default calendarSaga;
