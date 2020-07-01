import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const setIngridients = (ingridients) => {
  return {
    type: actionTypes.GET_INGRIDIENTS,
    payload: ingridients,
  };
};

const fetchIngridientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGRIDIENTS_FAILED,
  };
};

export const getIngridients = () => {
  return (dispatch) => {
    axios
      .get("https://burger-app-67311.firebaseio.com/ingridients.json")
      .then((response) => {
        dispatch(setIngridients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngridientsFailed());
      });
  };
};

export const changeIngridients = (type, mod) => {
  return {
    type: "CHANGE_INGRIDIENTS",
    payload: { type: type, mod: mod },
  };
};
