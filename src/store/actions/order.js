import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const getIngridientsResult = (ingridients) => {
  return {
    type: actionTypes.GET_INGRIDIENTS,
    payload: ingridients,
  };
};

export const getIngridients = () => {
  return (dispatch) => {
    axios
      .get("https://burger-app-67311.firebaseio.com/ingridients.json")
      .then((response) => {
        dispatch(getIngridientsResult(response.data));
      })
      .catch((error) => {});
  };
};

export const changeIngridients = (type, mod) => {
  return {
    type: "CHANGE_INGRIDIENTS",
    payload: { type: type, mod: mod },
  };
};
