import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: true,
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
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
