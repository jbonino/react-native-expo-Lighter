import * as actionTypes from '../actions/actionsTypes';

const initState = {
  firebaseUser: null,
  userData: null,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {

    /* firebase Authentication */
    case actionTypes.AUTH_START:
      return { ...state, error: null };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, firebaseUser: action.firebaseUser, error: null }
    case actionTypes.AUTH_FAIL:
      return { ...state, error: action.error }
    case actionTypes.AUTH_LOGOUT:
      return { ...state, firebaseUser: null, userData: null, error: null }

    /* firebase user data retrieval */
    case actionTypes.USER_DATA_START:
      return { ...state, error: null }
    case actionTypes.USER_DATA_SUCCESS:
      return { ...state, userData: action.userData, error: null }
    case actionTypes.USER_DATA_FAIL:
      return { ...state, error: action.error }
    default:
      return state;
  }
};

export default reducer;
