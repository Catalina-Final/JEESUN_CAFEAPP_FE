import * as types from "../constants/event.constants";

const initialState = {
  events: [],
  loading: false,
  selectedEvent: {},
};

const eventReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.EVENT_REQUEST:
      return { ...state, loading: true };
    case types.EVENT_SUCCESS:
      return {
        ...state,
        events: payload.events,
        loading: false,
      };
    case types.EVENT_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_EVENT_REQUEST:
      return { ...state, loading: true };

    case types.GET_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        selectedEvent: payload,
        loading: false,
      };
    case types.GET_SINGLE_EVENT_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_EVENT_REQUEST:
      return { ...state, loading: false };
    case types.CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, redirectTo: "__GO_BACK__" };
    case types.CREATE_EVENT_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_EVENT_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_EVENT_SUCCESS:
      return { ...state, loading: false, redirectTo: "__GO_BACK__" };
    case types.UPDATE_EVENT_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_EVENT_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_EVENT_SUCCESS:
      return { ...state, loading: false };
    case types.DELETE_EVENT_FAILURE:
      return { ...state, redirectTo: payload };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };

    default:
      return state;
  }
};

export default eventReducer;
