import * as types from "../constants/event.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const eventRequest = () => async (dispatch) => {
  dispatch({ type: types.EVENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/events`);
    dispatch({
      type: types.EVENT_SUCCESS,
      payload: { events: res.data.data },
    });
  } catch (error) {
    dispatch({ type: types.EVENT_FAILURE, payload: error });
  }
};

const getSingleEvent = (eventId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/events/${eventId}`);
    dispatch({
      type: types.GET_SINGLE_EVENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_EVENT_FAILURE, payload: error });
  }
};

const createNewEvent = ({
  images,
  title,
  owner,
  address,
  phone,
  description,
}) => async (dispatch) => {
  dispatch({ type: types.CREATE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.post("/events", {
      images,
      title,
      owner,
      address,
      phone,
      description,
    });
    dispatch({ type: types.CREATE_EVENT_SUCCESS, payload: res.data.data });
    dispatch(alertActions.setAlert("New event has been created!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_EVENT_FAILURE, payload: error });
  }
};

const updateEvent = (
  eventId,
  { images, title, owner, address, phone }
) => async (dispatch) => {
  dispatch({ type: types.UPDATE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.put(`/events/${eventId}`, { title, owner });
    dispatch({ type: types.UPDATE_EVENT_SUCCESS, payload: res.data.data });
    dispatch(alertActions.setAlert("The event has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_EVENT_FAILURE, payload: error });
  }
};

const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: types.DELETE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/events/${eventId}`);
    dispatch({
      type: types.DELETE_EVENT_SUCCESS,
      payload: res.data,
    });
    dispatch(alertActions.setAlert("The event has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_EVENT_FAILURE, payload: error });
  }
};

const setRedirectTo = (redirectTo) => ({
  type: types.SET_REDIRECT_TO,
  payload: redirectTo,
});

export const eventActions = {
  eventRequest,
  getSingleEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
  setRedirectTo,
};
