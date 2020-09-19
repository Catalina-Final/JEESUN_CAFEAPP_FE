import * as types from "../constants/event.constants";
import api from "../api";

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

// const createNewEvent = () => {};

// const updateEvent = () => {};

// const deleteEvent = () => {};

const setRedirectTo = (redirectTo) => ({
  type: types.SET_REDIRECT_TO,
  payload: redirectTo,
});

export const eventActions = {
  eventRequest,
  getSingleEvent,
  //   createNewEvent,
  //   updateEvent,
  //   deleteEvent,
  setRedirectTo,
};
