import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Container, Content } from "native-base";
import Story from "../story/story";

export default class StoryBoard extends Component {
  /* passed shallow storyboards.
    look up by ID and load all stories
  */
  state = {
    stories: [
      {
        id: "12easd124ds",
        shallowUser: {
          id: "134234",
          username: "joben123",
          profilePhoto:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Guy_Kawasaki_at_Wikimania_2015_-_2.jpg/1200px-Guy_Kawasaki_at_Wikimania_2015_-_2.jpg"
        },
        photo: "",
        location: "gps cordinates from photo",
        date: '5/6/18',
        description: "this is me wearing assless chaps on mt kilmanjoro",
        grace: "50"
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          username: "chad smite",
          profilePhoto: "https://duckduckgo.com/i/79e130ea.jpg"
        },
        photo: "url",
        location: "gps cordinates from photo",
        date: '5/6/18',
        description: "this is me wearing assless chaps on mt kilmanjoro",
        grace: "50"
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          username: "flea",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Floudwire.com%2Ffiles%2F2014%2F04%2F170197761.jpg&f=1"
        },
        photo: "url",
        location: "gps cordinates from photo",
        date: '5/6/18',        
        description: "this is me wearing assless chaps on mt kilmanjoro",
        grace: "50"
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          username: "anthony kiedes",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F12200000%2FAnthony-Kiedis-anthony-kiedis-12233434-751-909.jpg&f=1"
        },
        photo: "url",
        location: "gps cordinates from photo",
        date: '5/6/18',        
        description: "this is me wearing assless chaps on mt kilmanjoro",
        grace: "50"
      },
      {
        id: "12eqfdfds",
        shallowUser: {
          id: "134234",
          username: "John Frusciante",
          profilePhoto:
            "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.wennermedia.com%2F920-width%2Frs-134788-john-frusciante.jpg&f=1"
        },
        photo: "url",
        location: "gps cordinates from photo",
        date: '5/6/18',        
        description: "this is me wearing assless chaps on mt kilmanjoro",
        grace: "50"
      }
    ]
  };

  componentDidMount = () => {
    /*TODO: do sideeffects with firebase, load stories */
  };

  render() {
    const stories = this.state.stories.map((story, index) => {
      return <Story story={story} key={index}/>
    });
    return (
      <Container>
        <Content>{stories}</Content>
      </Container>
    );
  }
}
