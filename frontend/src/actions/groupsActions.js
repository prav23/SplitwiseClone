import axios from "axios";

import {
  GET_GROUPS_DETAILS,
  GROUPS_LOADING,
  CLEAR_GROUPS,
  GET_ERRORS
} from "./types";

// Get UserGroup Details
export const getGroupsDetails =  user_id => dispatch => {
    dispatch(setGroupsLoading());
    axios
      .get(`http://localhost:3001/api/usergroups/user/${user_id}`)
      .then(res =>
        dispatch({
          type: GET_GROUPS_DETAILS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_GROUPS_DETAILS,
          payload: {}
        })
      );
  };
  
// Dashboard loading
export const setGroupsLoading = () => {
  return {
    type: GROUPS_LOADING
  };
};

// Clear Groups details
export const clearGroups = () => {
  return {
    type: CLEAR_GROUPS
  };
};

// Create Group
export const createGroup = (groupData, history) => dispatch => {
    axios
      .post("http://localhost:3001/api/groups", groupData)
      .then(res => {
        const userGroupData = {
            user_id: groupData.user_id,
            group_id: res.data.data.newGroup.group_id,
            status: "Registered",
            total_spent: 0,
            total_owed: 0,
          };
          axios.post("http://localhost:3001/api/usergroups", userGroupData)
          .then( res => history.push("/dashboard"))
          .catch(err => history.push("/dashboard"));
          
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
