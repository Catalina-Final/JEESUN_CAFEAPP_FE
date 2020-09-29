import axios from "axios";
import configureStore from "./configureStore";
import { alertActions } from "./actions";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
//before
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request:", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);

    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    error = error.response.data;
    let errorMsg = error.message || "";
    if (error.errors && error.errors.message)
      errorMsg = errorMsg + ": " + error.errors.message;
    // configureStore.dispatch(alertActions.setAlert(errorMsg, "danger"));
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default api;
