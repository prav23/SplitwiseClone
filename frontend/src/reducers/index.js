import {combineReducers} from 'redux';
import authReducer from './authReducer';
// import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import dashboardReducer from './dashboardReducer';
import expenseReducer from './expenseReducer';
import groupsReducer from './groupsReducer';

export default combineReducers({
    auth:authReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    expense: expenseReducer,
    groups: groupsReducer
});