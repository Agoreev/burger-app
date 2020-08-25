import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWbvpeA7rLvttr60kohM55oJU4b-OjsIM";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWbvpeA7rLvttr60kohM55oJU4b-OjsIM";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const { idToken, localId, expiresIn } = response.data;
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch((err) => {
        let errorMessage = null;
        switch (err.response.data.error.message) {
          case "EMAIL_EXISTS":
            errorMessage = "Account with the given Email already exists";
            break;
          case "INVALID_PASSWORD":
            errorMessage = "Email not found or invalid password";
            break;
          case "EMAIL_NOT_FOUND":
            errorMessage = "Email not found or invalid password";
            break;
          default:
            errorMessage = err.response.data.error.message;
            break;
        }
        dispatch(authFailed(errorMessage));
      });
  };
};
