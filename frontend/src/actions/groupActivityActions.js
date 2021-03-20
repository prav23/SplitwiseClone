import axios from "axios";

import {
  GET_GROUP_USERS_DETAILS,
} from "./types";

// Get GroupUsers Details
export const getGroupUsersDetails =  group_id => dispatch => {
  axios
    .get(`http://ec2-18-220-206-127.us-east-2.compute.amazonaws.com:3001/api/usergroups/group/${group_id}`)
    .then(res =>
      dispatch({
        type: GET_GROUP_USERS_DETAILS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GROUP_USERS_DETAILS,
        payload: {}
      })
    );
};
