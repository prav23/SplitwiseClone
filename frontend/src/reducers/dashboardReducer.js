import {
    GET_DASHBOARD_DETAILS,
    GET_USERGROUP_DETAILS,
    DASHBOARD_LOADING,
    CLEAR_DASHBOARD_DETAILS
  } from '../actions/types';
  
  const initialState = {
    dashboardDetails: null,
    userGroupDetails: null,
    dashboardLoading: false
  };
  
  export default function dashRed(state = initialState, action) {
    switch (action.type) {
      case DASHBOARD_LOADING:
        return {
          ...state,
          dashboardLoading: true
        };
      case GET_DASHBOARD_DETAILS:
        return {
          ...state,
          dashboardDetails: action.payload,
          dashboardLoading: false
        };
      case GET_USERGROUP_DETAILS:
        return {
          ...state,
          userGroupDetails: action.payload,
        };
      case CLEAR_DASHBOARD_DETAILS:
        return {
          ...state,
          dashboardDetails: null,
          userGroupDetails: null,
        };
      default:
        return state;
    }
  }