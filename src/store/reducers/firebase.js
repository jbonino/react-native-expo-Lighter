import * as actionTypes from '../actions/actionsTypes';

const initState = {
    uploadingImage: false,
    error: null,
};

const reducer = (state = initState, action) => {
    switch (action.type) {

        /* Upload image */
        case actionTypes.FIREBASE_STORY_IMAGE_UPLOADING_START:
            return { ...state, uploadingImage: true };
        case actionTypes.FIREBASE_STORY_IMAGE_UPLOADING_SUCCESS:
            return { ...state, error: null, uploadingImage: false };
        case actionTypes.GENERAL_ERROR:
            return { ...state, error: action.error }
        default:
            return state;
    }
};

export default reducer;
