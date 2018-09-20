import { combineReducers } from 'redux';
import authReducer from './auth';
import firebaseReducer from './firebase';

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
});