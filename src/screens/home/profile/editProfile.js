import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Content, Form, Item, Icon, Input, Label, Button, Toast } from 'native-base';
import * as firebase from 'firebase';

export default class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <Icon name='ios-checkbox' onPress={params.onEditProfileHandler} style={{ fontSize: 75, margin: 0, color: 'blue' }} />
      )
    }
  }
  state = {
    userData: {
      name: '',
      username: "",
      description: "",
      profilePicture: "",
      stories: [],
      stats: {
        miles: 0,
        grace: 0,
        donatedItems: 0,
        countries: 0,
        connections: 0,
        stories: 0,
      }
    }
  }

  componentWillMount() {
    const userData = this.props.navigation.getParam('userData');
    /* set profile state */
    if (userData) this.setState({ userData: userData })
    else console.log("EditProfile componentWillMount: userData was not passed as prop. Please do!");
    
    /* set method to header button */
    this.props.navigation.setParams({ onEditProfileHandler: this.onEditProfileHandler });
  }

  onEditProfileHandler = () => {
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({ ...this.state.userData })
      .then(res => {
        this.props.navigation.goBack()
      })
      .catch(err => {
        Alert.alert('firebase Error', err.message)
      })
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Icon name='ios-happy-outline' style={{ color: 'grey' }} />
              <Input placeholder='Name' onChangeText={text => this.setState((state) => ({ userData: { ...state.userData, name: text } }))} value={this.state.userData.name} />
            </Item>
            <Item>
              <Icon name='ios-person-outline' style={{ color: 'grey' }} />
              <Input placeholder='Username' onChangeText={text => this.setState((state) => ({ userData: { ...state.userData, username: text } }))} value={this.state.userData.username} />
            </Item>
            <Item>
              <Icon name='ios-quote-outline' style={{ color: 'grey' }} />
              <Input placeholder='Bio' multiline onChangeText={text => this.setState((state) => ({ userData: { ...state.userData, description: text } }))} value={this.state.userData.description} />
              {/*TODO: 280 char limit */}
            </Item>
            <Item style={{ marginTop: 20 }}>
              <Label style={{ color: 'grey' }}>PRIVATE INFORMATION</Label>
            </Item>
            {/*TODO: change email handler */}
            <Item>
              <Icon active name='ios-mail-outline' style={{ color: 'grey' }} />
              <Input placeholder='Email' />
            </Item>
            <Item>
              <Icon active name='ios-phone-portrait-outline' style={{ color: 'grey' }} />
              <Input placeholder='Phone' />
            </Item>
            <Item>
              <Icon active name='ios-lock-outline' style={{ color: 'grey' }} />
              <Input placeholder='Change Password' disabled />
              {/* TODO: change password button and handler. firebase stuff */}
            </Item>
            {/* TODO: link facebook and google acounts here if not already */}
          </Form>
        </Content>
      </Container>
    );
  }
}


