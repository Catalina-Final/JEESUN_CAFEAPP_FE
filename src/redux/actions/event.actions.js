import * as types from "../constants/event.constants";
import api from "../api";
import * as authTypes from "../constants/auth.constants";
import { alertActions } from "./alert.actions";
import { toast } from "react-toastify";

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

const createNewEvent = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.post("/events", formData);
    dispatch({ type: types.CREATE_EVENT_SUCCESS, payload: res.data.data });
    toast.success("New event has been created!");
  } catch (error) {
    dispatch({ type: types.CREATE_EVENT_FAILURE, payload: error });
  }
};

const updateEvent = (eventId, formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_EVENT_REQUEST, payload: null });
  try {
    const res = await api.put(`/events/${eventId}`, formData);
    dispatch({ type: types.UPDATE_EVENT_SUCCESS, payload: res.data.data });
    toast.success("The event has been updated!");
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
    toast.success("The event has been deleted!");
  } catch (error) {
    dispatch({ type: types.DELETE_EVENT_FAILURE, payload: error });
  }
};

const interestFromSingleEvent = (eventId) => async (dispatch) => {
  dispatch({ type: types.CREATE_INTEREST_REQUEST, payload: null });
  try {
    const res = await api.put(`/events/${eventId}/interest`, {});
    dispatch({
      type: authTypes.UPDATE_EVENT_INTEREST_COUNT,
      payload: res.data.data.user.interested,
    });
    dispatch({
      type: types.CREATE_INTEREST_SUCCESS,
      payload: res.data.data.event.interestedCount,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_INTEREST_FAILURE, payload: error });
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
  interestFromSingleEvent,
  setRedirectTo,
};
