import * as actionTypes from './actionsTypes';
import * as firebase from 'firebase'
//upload new story


export const uploadStoryboardWithStory = (storyboardName, description, photoUri) => {
    return async (dispatch) => {
        try {
            //push storyboard key
            const newStoryboardKey = firebase.database().ref('/storyboards').push().key;
            const storyKey = await dispatch(uploadStory(description, photoUri, newStoryboardKey));
            console.log('storyKey');
            console.log(storyKey);
            if (!storyKey) {
                dispatch(generalError({ message: 'story key null in uploadStoryboardWithStory' }))
                return null;
            }

            const updates = {};
            updates['/storyboards/' + newStoryboardKey] =
                {
                    name: storyboardName,
                    stories: { [storyKey]: true }
                };

            /* actually write to firebase now! */
            await firebase.database().ref().update(updates);
            return newStoryboardKey;
        } catch (error) {
            dispatch(generalError(error));
            return error;
        }

    }

}

export const uploadStory = (description, photoUri, storyboardId) => {
    return async (dispatch) => {
        //try catch block
        try {
            //push story key
            const newStoryKey = firebase.database().ref('/stories').push().key;

            //await upload image
            dispatch(imageUploadingStart());
            const imageUrl = await uploadStoryImage(photoUri, firebase.auth().currentUser.uid, newStoryKey);
            if (!imageUrl) {
                dispatch(generalError({ message: 'error in upload story imageUrl' }));
                return null;
            }
            dispatch(imageUploadingSuccess());

            //once image is uploaded, post data 
            //JSON story
            const fullstory = {
                grace: '50',
                description: description,
                date: new Date(),
                location: 'null',
                photo: imageUrl,
                storyboardId: storyboardId,
                storyId: newStoryKey,
                shallowUser: {
                    id: firebase.auth().currentUser.uid, //TODO: get from redux state
                    name: 'name',
                    profilePhoto: 'getUserProfile'
                },
            }

            //JSON database
            const updates = {};
            updates['/stories/' + newStoryKey] = fullstory;
            updates['/users/' + firebase.auth().currentUser.uid + '/stories/' + newStoryKey] = {
                photo: imageUrl,
                storyboardId: storyboardId
            };

            //write to firebase
            await firebase.database().ref().update(updates)
            return newStoryKey;

        } catch (error) {
            dispatch(generalError(error))
            console.log('uploadStory error');
            console.log(error);
            return null;
        }

    }
}

export const uploadStoryImage = async (photoUri, userUid, storyKey) => {
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const fireref = firebase.storage().ref('images/' + userUid + '/stories/' + storyKey)
    const snapshot = await fireref.put(blob)
    return snapshot.ref.getDownloadURL();
}

/* export const uploadStoryboard = (storyboardName) => {
    return async (dispatch) => {
        try {
            //push storyboard key
            const newStoryboardKey = firebase.database().ref('/storyboards').push().key;

            const updates = {};
            updates['/storyboards/' + newStoryboardKey] = { name: storyboardName }
            // actually write to firebase now! 
            await firebase.database().ref().update(updates);
            return newStoryboardKey;
        } catch (error) {
            dispatch(generalError(error));
            return error;
        }

    }
}
 */

const generalError = (error) => ({
    type: actionTypes.GENERAL_ERROR,
    error: error
});
const imageUploadingStart = () => ({
    type: actionTypes.FIREBASE_STORY_IMAGE_UPLOADING_START
});
const imageUploadingSuccess = () => ({
    type: actionTypes.FIREBASE_STORY_IMAGE_UPLOADING_SUCCESS
});