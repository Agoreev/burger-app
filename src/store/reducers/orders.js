import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loadingOrders: true,
  loadingOrder: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      const fetchedOrders = [];
      for (let key in action.payload) {
        fetchedOrders.push({ ...action.payload[key], id: key });
      }
      return {
        ...state,
        orders: fetchedOrders,
        loadingOrders: false,
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
