import * as types from "../constants/shop.constants";
import * as authTypes from "../constants/auth.constants";
import api from "../api";
import { alertActions } from "./alert.actions";
import { toast } from "react-toastify";

const pageLimit = 10;

const shopsRequest = (
  page = 1,
  query = null,
  option = null,
  sortBy = null,
  lat = null,
  lng = null
) => async (dispatch) => {
  dispatch({ type: types.SHOP_REQUEST, payload: null });
  try {
    console.log("middleware call okay?");
    let queryString = "";
    if (query) {
      if (option === "name") {
        queryString = `&sortName[$regex]=${query}&sortName[$options]=i`;
      }
      if (option === "district") {
        queryString = `&district=${query}`;
      }
      if (option === "distance") {
        queryString = `&distance=${query}&latlng=${lat},${lng}`;
      }
      if (option === "tags") {
        // {tags : { $in: ["modern"]} }
        queryString = `&tags[$in][]=${query}`;
      }
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/shops?page=${page}&limit=${pageLimit}${queryString}${sortByString}`
    );
    console.log("Do i have data?", res.data.data);
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
    toast.success("New shop has been created!");
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
    toast.success("The shop has been updated!");
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
    toast.success("The shop has been deleted!");
  } catch (error) {
    dispatch({ type: types.DELETE_SHOP_FAILURE, payload: error });
  }
};

const createReview = (shopId, reviewText, useRating) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/shops/${shopId}/reviews`, {
      content: reviewText,
      rating: useRating,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const favoriteFromSingleShop = (shopId) => async (dispatch) => {
  dispatch({ type: types.CREATE_FAVORITE_REQUEST, payload: null });
  try {
    const res = await api.post(`/shops/${shopId}/favorite`, {});
    dispatch({
      type: authTypes.UPDATE_SHOP_FAVORITE_COUNT,
      payload: res.data.data.user.favorites,
    });
    dispatch({
      type: types.CREATE_FAVORITE_SUCCESS,
      payload: res.data.data.shop.favoriteUserCount,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_FAVORITE_FAILURE, payload: error });
  }
};

const favoriteFromShopList = (shopId) => async (dispatch) => {
  dispatch({ type: types.CREATE_FAVORITE_REQUEST, payload: null });
  try {
    const res = await api.post(`/shops/${shopId}/favorite`, {});
    dispatch({
      type: authTypes.UPDATE_SHOP_FAVORITE_COUNT,
      payload: res.data.data.user.favorites,
    });

    dispatch({
      type: types.CREATE_FAVORITE_FROM_LIST_SUCCESS,
      payload: {
        shopId,
        data: res.data.data.shop.favoriteUserCount,
      },
    });
  } catch (error) {
    dispatch({ type: types.CREATE_FAVORITE_FAILURE, payload: error });
  }
};

const getUserFavoriteShops = (
  userId,
  pageNum = 1,
  limit = 3,
  query = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_USER_FAVORITE_SHOP_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&name[$regex]=${query}&name[$options]=i`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/shops/user/${userId}?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({
      type: types.GET_USER_FAVORITE_SHOP_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_USER_FAVORITE_SHOP_FAILURE, payload: error });
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
  favoriteFromShopList,
  favoriteFromSingleShop,
  getUserFavoriteShops,
  setRedirectTo,
};
