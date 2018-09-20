import * as firebase from "firebase";
import * as actions from '../../store/actions/auth'

const initUserProfile = async () => {
    /* Init User Profile */
    const ref = await firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
    ref.update({
        name: '',
        username: "",
        description: "",
        profilePicture: "",
        stories: {},
        stats: {
            miles: 0,
            grace: 0,
            donatedItems: 0,
            countries: 0,
            connections: 0,
            stories: 0,
        }
    }).catch(error => {
        console.log('error in initUserProfile -> api/firebase/index.js')
        console.log(error)
    })
}


export const mapFirebaseUserToRedux = async (store, user) => {
    if (user) {
        store.dispatch(actions.userDataStart())
        const userRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
        if (userRef) {
            userRef.on('value', (snapshot) => {
                const value = snapshot.val();
                if (value) store.dispatch(actions.userDataSuccess(value));
                else {
                    initUserProfile();
                    console.log('mapFirebaseUserToRedux: value of userData is null!');
                    store.dispatch(actions.userDataFail({ message: 'mapFirebaseUserToRedux: value of userData is null!' }));
                }
            }, (error) => {
                console.log('mapFirebaseUserToRedux: error in tryCatch');
                console.log(error);
                store.dispatch(actions.userDataFail(error))
            })
        }
    }
    else store.dispatch(actions.authFirebaseLogOut());
}


//error handlers
const getUserUId = () => {
    /* TODO: error handling */
    return firebase.auth().currentUser.uid
}





