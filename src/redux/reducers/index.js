import authReducer from "./auth.reducer";
import { combineReducers } from "redux";
import alertReducer from "./alert.reducer";
import shopReducer from "./shop.reducer";
import eventReducer from "./event.reducers";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  shop: shopReducer,
  event: eventReducer,
});
