import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Button, Container, Content, Icon } from "native-base";

import * as firebase from "firebase";

import { connect } from "react-redux";

import Gallery from "../../../components/ImageGallery/Gallery";
import Spinner from '../../../components/UI/Spinner/Spinner'


class ProfileTab extends Component {

  state = {

  };

  onGalleryPressHandler = index => {
    /* TODO: error, passing story id not storyboard id. Need to create shallow stories in user profile */
    const ids = Object.keys(this.props.userData.stories);
    /*
     get index of element from gallery (index)
     get array of stories from json (ids)
     get storyboardId from json with key at index
    */
    const storyboardId = this.props.userData.stories[ids[index]].storyboardId;

    this.props.navigation.navigate("StoryboardCustom", { storyboardId: storyboardId });
  };

  onEditProfilePress = () => {
    /* pass user profile */
    this.props.navigation.navigate("EditProfile", {
      userData: this.props.userData
    });
  }

  render() {
    let images = null;

    if (!this.props.userData) return <Spinner />
    if (this.props.userData.stories) {
      const keys = Object.keys(this.props.userData.stories);
      images = keys.map(key => {
        return this.props.userData.stories[key].photo
      })
    }

    return (
      <Container>
        <Content>
          {/* header */}
          <View style={{ padding: 10 }}>
            {this.topRow()}
            {this.profileDescription()}
          </View>
          {/* Gallery */}
          <Gallery
            images={images}
            onPress={key => {
              this.onGalleryPressHandler(key);
            }}
          />
        </Content>
        <Button block onPress={() => { firebase.auth().signOut() }} danger><Text>LOGOUT</Text></Button>
      </Container>
    );
  }

  topRow = () => {
    return (
      <View style={{ flexDirection: "row", paddingBottom: 5 }}>
        {/* profile photo take 1/3rd */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Image
            style={{ width: 75, height: 75, borderRadius: 37.5 }}
            source={(this.props.userData.profilePicture) ? { uri: this.props.userData.profilePicture } : require('../../../../assets/fallbacks/profile.png')}
          />
        </View>
        {/* User Stats take 2/3rd */}
        <View style={{ flex: 3 }}>
          {/* Stats */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end"
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text>{this.props.userData.stats.stories}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Stories</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>{this.props.userData.stats.donatedItems}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Donations</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>{this.props.userData.stats.miles}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Miles</Text>
            </View>
          </View>
          {/**Edit profile and Settings Buttons **/}
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingTop: 10
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {/** Edit profile takes up 3/4th **/}
              <Button
                bordered
                dark
                style={{
                  flex: 3,
                  marginLeft: 10,
                  justifyContent: "center",
                  height: 30
                }}
                onPress={() => this.onEditProfilePress()}
              >
                <Text>Edit Profile</Text>
              </Button>

              {/** Settings takes up  1/4th place **/}
              <Button
                bordered
                dark
                style={{
                  flex: 1,
                  height: 30,
                  marginRight: 10,
                  marginLeft: 5,
                  justifyContent: "center"
                }}
              >
                <Icon name="settings" style={{ color: "black" }} />
              </Button>
            </View>
          </View>
          {/**End edit profile**/}
        </View>
      </View>
    );
  };

  profileDescription = () => {
    return (
      <View style={{ paddingBottom: 10 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold" }}>
            {this.props.userData.name}
          </Text>
          <Text>{this.props.userData.description}</Text>
        </View>
      </View>
    );
  };

}

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData
  }
}

export default connect(mapStateToProps)(ProfileTab)
