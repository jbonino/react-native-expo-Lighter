import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import gStyles from "../../config/styles";
import * as actions from '../../store/actions/auth';

import { connect } from "react-redux";

import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Toast
} from "native-base";

import * as firebase from "firebase";


class Login extends Component {
  state = {
    email: "jbonino_5@yahoo.com",
    password: "hockey13",
    registerEmail: "jbonino_5@yahoo.com",
    registerPassword: "hockey13",
    loginError: "",
    registerError: ""
  };

  loginHandler = async (email, password) => {
    if (email === "" || password === "") {
      Toast.show({
        text: "Opps, please fill in your email and password.",
        buttonText: "Okay",
        type: "error"
      })
    } else {
      /* place in action creator */
      this.props.onAuthStart();
      res = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('then block');
          this.props.onAuthSuccess(res);
          return res;
        })
        .catch(error => {
          console.log('shit happens. login screen login handler');
          console.log(error);
          this.props.onAuthFail(error);
          Toast.show({
            text: error.message,
            buttonText: "Okay",
            type: "danger",
            duration: 3000,
          })
        })
    }
  }

  render() {
    return (
      <Container>
        <Content>
          {this.renderLogin()}
        </Content>
      </Container>
    );
  }

  renderLogin = () => {
    return (
      <Container>
        <Form>
          <Text style={gStyles.textTitle}> Login </Text>
          {this.renderSocialButtons()}
          <Text style={gStyles.center}>-------- OR --------</Text>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
            />
          </Item>
          {/* forgot password button */}
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={{ color: "blue", marginStart: 40 }}>
              Forget Password?
            </Text>
          </Button>
        </Form>
        {/* log in button */}
        <Button
          block
          danger
          rounded
          style={{ margin: 20 }}
          onPress={() =>
            this.loginHandler(this.state.email, this.state.password)
          }
        >
          <Text style={{ color: "white" }}>Log In</Text>
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate("Register")}
          block
          danger
          rounded
          style={{ margin: 20 }}
        >
          <Text>Register with Email</Text>
        </Button>
      </Container>
    );
  };

  renderSocialButtons() {
    return (
      <View>
        <Button
          rounded
          block
          style={{
            backgroundColor: "#3B5998",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10
          }}
        >
          <Icon name="logo-facebook" />
        </Button>
        <Button
          rounded
          block
          style={{
            backgroundColor: "#34A34F",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10
          }}
        >
          <Icon name="logo-google" />
        </Button>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthStart: () => dispatch(actions.authFirebaseStart()),
    onAuthSuccess: (userProfile) => dispatch(actions.authFirebaseSuccess(userProfile)),
    onAuthFail: (error) => dispatch(actions.authFirebaseFail(error)),
  }
}

export default connect(null, mapDispatchToProps)(Login);
