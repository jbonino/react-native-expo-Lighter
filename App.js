import React from 'react';
import * as firebase from 'firebase';
import * as firebaseMethods from './src/api/firebase'

import { AppNavigator } from "./src/config/router";
import { PreAuthNavigator } from './src/config/router'
import { Root } from "native-base";
import Spinner from "./src/components/UI/Spinner/Spinner";
import Login from './src/screens/login/login'

import { Provider } from "react-redux";
import store from './src/store'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
    }
    //init firebase
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBwurM3xr32jmu5SuyawLDz6IiZ84T8PQQ",
        authDomain: "react-lighter-bonino.firebaseapp.com",
        databaseURL: "https://react-lighter-bonino.firebaseio.com",
        projectId: "react-lighter-bonino",
        storageBucket: "react-lighter-bonino.appspot.com",
        messagingSenderId: "1031362734306"
      })
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      'PermanentMarker-Regular': require('./assets/fonts/PermanentMarker-Regular.ttf')
    });
    /*TODO: access token and see if its still valid */
  }

  componentDidMount() {
    /*TODO: USER_NOT_FOUND error. when i delete user on firebase, still in local storage */
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user: user
      });
      firebaseMethods.mapFirebaseUserToRedux(store, user);
    });
  }

  render() {
    /* return app on valid login */
    let app = null;
    /* user not logged in */
    if (!this.state.user) app = <PreAuthNavigator><Login /></PreAuthNavigator>
    /* time between login and onAuthStateChanged catching state change */
    else if (this.state.loading && this.state.user.uid) app = <Spinner />;
    /* logged in! */
    else app = <AppNavigator />
    return (
      <Root>
        <Provider store={store}>
          {app}
        </Provider>
      </Root>
    );
  }
}
