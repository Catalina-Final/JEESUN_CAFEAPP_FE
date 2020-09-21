import * as types from "../constants/auth.constants";

const initialState = {
  user: {},
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOGIN_REQUEST:
    case types.LOGIN_FACEBOOK_REQUEST:
    case types.LOGIN_GOOGLE_REQUEST:
    case types.REGISTER_REQUEST:
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };

    case types.LOGIN_FACEBOOK_SUCCESS:
    case types.LOGIN_GOOGLE_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      console.log(payload.accessToken);
      return {
        ...state,
        user: { ...payload.data },
        accessToken: payload.ccessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.data.accessToken);
      console.log(payload.accessToken);
      return {
        ...state,
        user: { ...payload.data },
        accessToken: payload.data.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };

    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_FAILURE:
    case types.LOGIN_FACEBOOK_FAILURE:
    case types.LOGIN_GOOGLE_FAILURE:
    case types.REGISTER_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    default:
      return state;
  }
};

export default authReducer;
