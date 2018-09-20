import * as actionTypes from './actionsTypes'

/* firebase Authentication */
export const authFirebaseStart = () => {
    console.log('authFirebaseStart');
    return {
        type: actionTypes.AUTH_START
    };
};
export const authFirebaseFail = error => {
    console.log('authFirebaseFail');

    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const authFirebaseSuccess = firebaseUser => {
    console.log('authFirebaseSuccess');

    return {
        type: actionTypes.AUTH_SUCCESS,
        firebaseUser: firebaseUser
    };
};
export const authFirebaseLogOut = () => {
    console.log('authFirebaseLogOut');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

/* firebase user data retrieval */
export const userDataStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const userDataFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const userDataSuccess = userData => {
    return {
        type: actionTypes.USER_DATA_SUCCESS,
        userData: userData
    };
};
