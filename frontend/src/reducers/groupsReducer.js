import {
    GET_GROUPS_DETAILS,
    GROUPS_LOADING,
    GET_GROUP_USERS_DETAILS,
    CLEAR_GROUPS
  } from '../actions/types';
  
  const initialState = {
    groupsDetails: null,
    groupUsersDetails: null,
    groupsLoading: false
  };
  
  export default function groupsRed(state = initialState, action) {
    switch (action.type) {
      case GROUPS_LOADING:
        return {
          ...state,
          groupsLoading: true
        };
      case GET_GROUPS_DETAILS:
        return {
          ...state,
          groupsDetails: action.payload,
          groupsLoading: false
        };
      case GET_GROUP_USERS_DETAILS:
        return {
          ...state,
          groupUsersDetails: action.payload,
        };
      case CLEAR_GROUPS:
        return {
          ...state,
          groupsDetails: null,
        };
      default:
        return state;
    }
  }