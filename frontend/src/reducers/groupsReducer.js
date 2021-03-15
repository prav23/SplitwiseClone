import {
    GET_GROUPS_DETAILS,
    GROUPS_LOADING,
    CLEAR_GROUPS
  } from '../actions/types';
  
  const initialState = {
    groupsDetails: null,
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
      case CLEAR_GROUPS:
        return {
          ...state,
          groupsDetails: null,
        };
      default:
        return state;
    }
  }