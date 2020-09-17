import * as types from "../constants/shop.constants";

const initialState = {
  shops: [],
  loading: false,
  pageNum: 1,
  selectedShop: {},
};

const shopReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SHOP_REQUEST:
      return { ...state, loading: true };
    case types.SHOP_SUCCESS:
      return {
        ...state,
        shops: payload.shops.shops,
        pageNum: payload.pageNum,
        loading: false,
      };
    case types.SHOP_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_SHOP_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_SHOP_SUCCESS:
      console.log(payload);
      return {
        ...state,
        selectedShop: payload,
        loading: false,
      };
    case types.GET_SINGLE_SHOP_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_SHOP_REQUEST:
      return { ...state, loading: false };
    case types.CREATE_SHOP_SUCCESS:
      return { ...state, loading: false, redirectTo: "__GO_BACK__" };
    case types.CREATE_SHOP_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_SHOP_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_SHOP_SUCCESS:
      return { ...state, loading: false, redirectTo: "__GO_BACK__" };
    case types.UPDATE_SHOP_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_SHOP_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedShop: {},
        redirectTo: "__GO_BACK__",
      };
    case types.DELETE_SHOP_FAILURE:
      return { ...state, loading: false };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    default:
      return state;
  }
};
export default shopReducer;
