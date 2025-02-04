import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOGOUT } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

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
      const { token } = res.data;
      //const { token, name, user_id } = res.data.data;
      //Set token to ls
      localStorage.setItem("jwtToken", token);
      //localStorage.setItem("authToken", token);
      //set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      //1: dispatch(setCurrentUser(decoded));
      const name = decoded.name;
      const user_id = decoded.id;
      dispatch(setCurrentUser({token, name, user_id}));
    })
    .catch(err => {
      console.log(err);
        if (err.response && err.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
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
  localStorage.removeItem("jwtToken");
  //localStorage.removeItem("authToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  //dispatch(setCurrentUser({}));
  dispatch({
    type: USER_LOGOUT
  })
};