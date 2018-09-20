import React, { Component } from "react";
import { View, Text } from "react-native";
import { Form, Item, Input, Label, Content, Button } from "native-base";

import gStyles from "../../../config/styles";
import * as  firebase from "firebase";

export default class ForgotPassword extends Component {
  state = {
    email: "",
    error: ""
  };

  passwordResetHandler = email => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(res => {
        /*TODO: display info modal */
        this.props.navigation.goBack()
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    return (
      <Content>
        <View style={[gStyles.center, { marginTop: 150 }]}>
          <Text style={gStyles.textTitle}>Forgot Your Password?</Text>
          <Text style={gStyles.textTitle}>Dont worry, we got you covered!</Text>
          <Text style={{ fontSize: 15 }}>Please enter your email below</Text>
        </View>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              last
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
            />
          </Item>
          <Button onPress={() => this.passwordResetHandler(this.state.email)} block primary rounded style={{ margin: 20 }}>
            <Text style={{ color: "white" }}>Recover Password</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}
