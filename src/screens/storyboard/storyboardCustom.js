import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Container, Content, Grid, Toast } from "native-base";
import StoryCustom from "../story/storyCustom";
import QRCode from 'react-native-qrcode';
import * as firebase from 'firebase';

export default class StoryBoard extends Component {
  /*
    look up by ID and load all stories
  */
  state = {
    storyboard: {
      name: '',
      stories: null
    },
    storyboardId: null,
    fullStoryArray: []
  };

  async componentDidMount() {

    if (this.props.navigation.state.params.storyboardId) {
      this.setState({ storyboardId: this.props.navigation.state.params.storyboardId })
    }
    else return Toast.show({ text: 'error no storybooardId', type: 'danger' })


    /* get data referance to user profile and store in state */
    const refStoryboard = await firebase.database().ref("/storyboards/" + this.props.navigation.state.params.storyboardId);

    /* update profile with info */
    await refStoryboard.on("value",
      //success
      (snapShot) => {
        const storyboard = snapShot.val();
        /* set firebase data to state storyboard */
        if (storyboard) {
          this.setState({ storyboard: storyboard })
          if (storyboard.stories) this.loadStories(storyboard.stories)
        }
      },
      //error
      (err => {
        console.log('Storyboard Custom: ComponentDidMount: Error=' + err);
      }))
  };

  loadStories = async (storiesJSON) => {
    /* json with storyId as key and image as location */
    /* update profile with info */
    const storiesArrray = Object.keys(storiesJSON);
    const refStories = await firebase.database().ref("/stories/");

    storiesArrray.forEach((value, index, array) => {
      refStories.child(value).on("value",
        //success
        (snapShot) => {
          const story = snapShot.val();
          /* set firebase data to state storyboard */
          if (story) {
            const temp = this.state.fullStoryArray.concat([story]);
            this.setState({ fullStoryArray: temp })
          }
        },
        //error
        (err => {
          console.log('StoryboardCustom: loadStories: Error=' + err);
        }))
    })

  }

  onStoryPress = (id) => {
    /*TODO: this.props.navigation.navigate('Story', { id: id }) or pass loaded story from props */
    console.log('inStoryPress:' + id);
  }



  render() {
    let stories = null;
    if (this.state.fullStoryArray)
      stories = this.state.fullStoryArray.map((story, index) => {
        return <StoryCustom onPress={() => this.onStoryPress(story.storyId)} story={story} key={story.storyId} />
      });

    return (
      <Container style={styles.container}>
        <Content>
          {this.renderItemInfo()}
          {stories}
        </Content>
      </Container>
    );
  }

  renderItemInfo = () => {
    return (
      <View style={{padding:20}}>
        {this.state.storyboardId
          ? <QRCode
            value={this.state.storyboardId}
            size={100}
            bgColor='#1B98E0'
            fgColor='white' />
          : null}
        <Text>{this.state.storyboard.name}</Text>

      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
  }
});
