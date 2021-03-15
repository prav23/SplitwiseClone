import axios from "axios";

import {
  GET_DASHBOARD_DETAILS,
  GET_USERGROUP_DETAILS,
  DASHBOARD_LOADING,
  CLEAR_DASHBOARD_DETAILS
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
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_DASHBOARD_DETAILS
  };
};