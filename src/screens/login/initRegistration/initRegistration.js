import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import {
  Container,
  Content,
  Button,
  Tabs,
  Tab,
  Form,
  Item,
  Input,
  Label
} from "native-base";

import gStyles from "../../../config/styles";

import InfoModal from "../../../components/UI/Modal/InfoModal";
import * as firebase from "firebase";

export default class InitRegistration extends Component {
  state = {
    email: "jbonino_5@yahoo.com",
    password: "hockey13",
    username: "jbonino",
    fullName: "joe bonino",
    phone: "",
    error: ""
  };

  registerHandler = (email, password, username, fullName) => {
    if (email === "" || password === "" || username === "" || fullName === "") {
      this.setState({
        error: "Opps, please fill in all fields!"
      });
    } else {
      let user = null;
      if (email !== "") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            //App.js is listeing for state change so it will automatically redirect
          })
          .catch(err => {
            console.log(err);
            this.setState({ error: err.message });
          });
      } else {
        /*TODO: phone registation*/
      }
    }
  };

  registerErrorHandler = () => {
    this.setState({ error: "" });
  };

  firebaseUserDataInit = user => {
    const initProfileData = {
      username: "",
      description: "",
      profilePicture: "",
      stories: [],
      stats: {
        miles: "",
        grace: "",
        donatedItems: "",
        countries: "",
        connections: "",
        stories: ""
      }
    };
    return firebase
      .database()
      .ref("users/" + user.uid)
      .set(initProfileData);
  };

  render() {
    return (
      <Container>
        <Content>
          {/* error modal */}
          <InfoModal
            summary={this.state.error}
            title={"Error with Registration"}
            onOk={() => this.registerErrorHandler()}
            onCancel={() => this.registerErrorHandler()}
            isVisible={this.state.error !== ""}
          />
          {/* Circle user logo */}
          <View style={gStyles.center}>
            <Image
              style={{ height: 150, marginTop: 50 }}
              source={require("../../../../assets/fallbacks/profile.png")}
            />
          </View>

          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
              />
            </Item>
            <Item floatingLabel>
              <Label>FullName</Label>
              <Input
                onChangeText={text => this.setState({ fullName: text })}
                value={this.state.fullName}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </Item>
          </Form>

          {/* Tabview -phone,email */}
          <Tabs
            locked
            style={{ marginStart: 20, marginEnd: 20 }}
            initialPage={0}
          >
            <Tab heading="PHONE">
              <Form>
                <Item floatingLabel>
                  <Label>Phone</Label>
                  <Input
                    editable={false}
                    onChangeText={text => this.setState({ phone: text })}
                    value={this.state.phone}
                  />
                </Item>
              </Form>
            </Tab>
            <Tab heading="EMAIL">
              <Form>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                  />
                </Item>
              </Form>
            </Tab>
          </Tabs>

          {/* sign up button */}
          <Button
            onPress={() =>
              this.registerHandler(this.state.email, this.state.password, this.state.user, this.state.fullName)
            }
            danger
            block
            rounded
            style={{ margin: 20, alignItems: "center" }}
          >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }

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
