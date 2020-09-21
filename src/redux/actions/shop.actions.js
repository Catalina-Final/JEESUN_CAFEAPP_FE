import * as types from "../constants/shop.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const pageLimit = 10;

const shopsRequest = (page) => async (dispatch) => {
  dispatch({ type: types.SHOP_REQUEST, payload: null });
  try {
    const res = await api.get(`/shops?page=${page}&limit=${pageLimit}`);
    dispatch({
      type: types.SHOP_SUCCESS,
      payload: { shops: res.data.data },
    });
  } catch (error) {
    dispatch({ type: types.SHOP_FAILURE, payload: error });
  }
};

const getSingleShop = (shopId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_SHOP_REQUEST, payload: null });
  try {
    const res = await api.get(`/shops/${shopId}`);
    dispatch({
      type: types.GET_SINGLE_SHOP_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_SHOP_FAILURE, payload: error });
  }
};

const createNewShop = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_SHOP_REQUEST, payload: null });
  try {
    const res = await api.post("/shops", formData);
    dispatch({
      type: types.CREATE_SHOP_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("New shop has been created!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_SHOP_FAILURE, payload: error });
  }
};

const updateShop = (shopId, formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_SHOP_REQUEST, payload: null });
  try {
    const res = await api.put(`/shops/${shopId}`, formData);
    dispatch({
      type: types.UPDATE_SHOP_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("The shop has been updated!", "success"));
  } catch (error) {
    dispatch({ type: types.UPDATE_SHOP_FAILURE, payload: error });
  }
};

const deleteShop = (shopId) => async (dispatch) => {
  dispatch({ type: types.DELETE_SHOP_REQUEST, payload: null });
  try {
    const res = await api.delete(`/shops/${shopId}`);
    dispatch({
      type: types.DELETE_SHOP_SUCCESS,
      payload: res.data,
    });
    dispatch(alertActions.setAlert("The shop has been deleted!", "success"));
  } catch (error) {
    dispatch({ type: types.DELETE_SHOP_FAILURE, payload: error });
  }
};

const createReview = (shopId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/shops/${shopId}/reviews`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const setRedirectTo = (redirectTo) => ({
  type: types.SET_REDIRECT_TO,
  payload: redirectTo,
});

export const shopActions = {
  shopsRequest,
  getSingleShop,
  createNewShop,
  updateShop,
  deleteShop,
  createReview,
  setRedirectTo,
};
