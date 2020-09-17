import axios from "axios";
import configureStore from "./configureStore";
import { alertActions } from "./actions";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    console.log("Starting Request:", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.request.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    configureStore.dispatch(alertActions.setAlert(error.message, "danger"));
    return Promise.reject(error);
  }
);

export default api;
