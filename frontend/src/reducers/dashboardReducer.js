import {
    GET_DASHBOARD_DETAILS,
    GET_USERGROUP_DETAILS,
    GET_ALL_GROUPS,
    GET_ALL_USERS,
    DASHBOARD_LOADING,
    CLEAR_DASHBOARD_DETAILS,
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
  } from '../actions/types';
  
  const initialState = {
    dashboardDetails: null,
    userGroupDetails: null,
    allGroups: null,
    allUsers: null,
    dashboardLoading: false,
    profile: null,
    profileloading: false
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
      case GET_ALL_GROUPS:
        return {
          ...state,
          allGroups: action.payload,
        };
        case GET_ALL_USERS:
          return {
            ...state,
            allUsers: action.payload,
          };
      case CLEAR_DASHBOARD_DETAILS:
        return {
          ...state,
          dashboardDetails: null,
          userGroupDetails: null,
        };
        case PROFILE_LOADING:
          return {
            ...state,
            profileloading: true
          };
        case GET_PROFILE:
          return {
            ...state,
            profile: action.payload,
            profileloading: false
          };
        case CLEAR_CURRENT_PROFILE:
          return {
            ...state,
            profile: null,
          };
      default:
        return state;
    }
  }