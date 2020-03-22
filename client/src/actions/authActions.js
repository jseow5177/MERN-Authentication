// These are action creators that will dispatch action objects to reducers

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from "./types";

// Register user
export const registerUser = (userData, history) => {
  return (dispatch) => {
    axios.post("/api/users/register", userData)
      .then(res => history.push("/login")) // Re-direct to login page on successful registration
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data // Errors will be picked up by errorReducer
      }));
  }
}

// Login - get user token
export const loginUser = (userData) => {
  return (dispatch) => {
    axios.post("/api/users/login", userData)
      .then(res => {
        const token = res.data.token; // Get user token
        // Save token to local storage
        // LocalStorage is a type of web storage that allows Javascript websites and apps to store and access data right in the browser
        // There are other ways to store JWT Tokens: session storage and cookies
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to access user data (user id and name)
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      }));
  }
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => {
  return (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove Auth header from future requests
    setAuthToken(false);
    // Set current user to empty object. This will make isAuthenticated false
    dispatch(setCurrentUser({}));
  }
}
