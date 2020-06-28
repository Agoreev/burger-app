import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const getOrdersResult = (orders) => {
  return {
    type: actionTypes.GET_ORDERS,
    payload: orders,
  };
};

export const getOrders = () => {
  return (dispatch) => {
    axios
      .get("/orders.json")
      .then((res) => {
        dispatch(getOrdersResult(res.data));
      })
      .catch((err) => {});
  };
};
