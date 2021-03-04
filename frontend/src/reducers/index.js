import {combineReducers} from 'redux';
import authReducer from './authReducer';
// import errorReducer from './errorReducer';
// import profileReducer from './profileReducer';
// import homeReducer from './homeReducer';

export default combineReducers({
    auth:authReducer
});