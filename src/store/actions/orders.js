import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const getOrdersSuccess = (orders) => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    payload: orders,
  };
};

const getOrdersFail = (error) => {
  return {
    type: actionTypes.GET_ORDERS_FAILED,
    error: error,
  };
};

const getOrdersStart = () => {
  return {
    type: actionTypes.GET_ORDERS_START,
  };
};

export const getOrders = (token) => {
  return (dispatch) => {
    dispatch(getOrdersStart());
    axios
      .get("/orders.json?auth=" + token)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(getOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(getOrdersFail(err));
      });
  };
};
