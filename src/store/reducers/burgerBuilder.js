import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingridients: null,
  totalPrice: 4,
  purchaseable: false,
  error: false,
  building: false,
};

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const getIngridients = (state, action) => {
  return {
    ...state,
    ingridients: action.payload,
    totalPrice: 4,
    error: false,
    building: false,
  };
};

const changeIngridients = (state, action) => {
  const { type, mod } = action.payload;
  if (state.ingridients[type] + mod < 0) {
    return state;
  }
  const updatedIngridients = {
    ...state.ingridients,
    [type]: state.ingridients[type] + mod,
  };
  const sum = Object.keys(updatedIngridients)
    .map((igKey) => {
      return updatedIngridients[igKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);
  return {
    ...state,
    ingridients: updatedIngridients,
    totalPrice: +(state.totalPrice + mod * INGRIDIENT_PRICES[type]).toFixed(2),
    purchaseable: sum > 0,
    building: true,
  };
};

const fetchIngridientsFailed = (state, action) => {
  return {
    ...state,
    error: true,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INGRIDIENTS:
      return getIngridients(state, action);

    case actionTypes.CHANGE_INGRIDIENTS:
      return changeIngridients(state, action);

    case actionTypes.FETCH_INGRIDIENTS_FAILED:
      return fetchIngridientsFailed(state, action);

    default:
      return state;
  }
};
export default reducer;
