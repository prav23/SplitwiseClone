import {
    GET_GROUP_USERS_DETAILS
  } from '../actions/types';
  
  const initialState = {
    groupUsersDetails: null,
  };
  
  export default function groupsRed(state = initialState, action) {
    switch (action.type) {
      case GET_GROUP_USERS_DETAILS:
        return {
          ...state,
          groupUsersDetails: action.payload,
        };
      default:
        return state;
    }
  }