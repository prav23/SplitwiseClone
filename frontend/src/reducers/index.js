import {combineReducers} from 'redux';
import authReducer from './authReducer';
// import errorReducer from './errorReducer';
import dashboardReducer from './dashboardReducer';
import expenseReducer from './expenseReducer';
import groupsReducer from './groupsReducer';
import groupActivityReducer from './groupActivityReducer';
// export default combineReducers({
//     auth:authReducer,
//     dashboard: dashboardReducer,
//     expense: expenseReducer,
//     groups: groupsReducer
// });

import { USER_LOGOUT } from '../actions/types';

const appReducer = combineReducers({
/* your app’s top-level reducers */
    auth:authReducer,
    dashboard: dashboardReducer,
    expense: expenseReducer,
    groups: groupsReducer,
    groupActivity: groupActivityReducer,
})
  
const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;