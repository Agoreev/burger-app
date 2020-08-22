import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loadingOrders: false,
  loadingOrdersError: null,
  loadingOrder: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_START:
      return {
        ...state,
        loadingOrders: true,
        loadingOrdersError: null,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loadingOrders: false,
        loadingOrdersError: null,
      };
    case actionTypes.GET_ORDERS_FAILED:
      return {
        ...state,
        loadingOrders: false,
        loadingOrdersError: action.error,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loadingOrder: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loadingOrder: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loadingOrder: false,
      };
    default:
      return state;
  }
};

export default reducer;
