import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:3001/api/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login- Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:3001/api/login", userData)
    .then(res => {
      //Save to localStorage
      const { token, name, user_id } = res.data.data;
      //Set token to ls
      localStorage.setItem("authToken", token);
      //set token to Auth header
      setAuthToken(token);
      
      // Set current user
      dispatch(setCurrentUser({token, name, user_id}));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    })
};

//Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("authToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};