import axios from "axios";

import {
  GET_DASHBOARD_DETAILS,
  GET_USERGROUP_DETAILS,
  DASHBOARD_LOADING,
  CLEAR_DASHBOARD_DETAILS,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

// Get Dashboard Details
export const getDashboardDetails =  user_id => dispatch => {
  dispatch(setDashboardLoading());
  axios
    .get(`http://localhost:3001/api/userfriends/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_DASHBOARD_DETAILS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DASHBOARD_DETAILS,
        payload: {}
      })
    );
};

// Get UserGroup Details
export const getUserGroupDetails =  user_id => dispatch => {
    dispatch(setDashboardLoading());
    axios
      .get(`http://localhost:3001/api/usergroups/user/${user_id}`)
      .then(res =>
        dispatch({
          type: GET_USERGROUP_DETAILS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_USERGROUP_DETAILS,
          payload: {}
        })
      );
  };
  
// Dashboard loading
export const setDashboardLoading = () => {
  return {
    type: DASHBOARD_LOADING
  };
};

// Clear Dashboard details
export const clearDashboarDetails = () => {
  return {
    type: CLEAR_DASHBOARD_DETAILS
  };
};

// Get current profile
export const getCurrentProfile = user_id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:3001/api/profile/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("http://localhost:3001/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Profile
export const updateProfile = (profileData, history) => dispatch => {
  axios
    .put("http://localhost:3001/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};