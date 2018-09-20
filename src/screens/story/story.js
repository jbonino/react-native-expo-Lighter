import React, { Component } from "react";
import { View, Image } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Body,
  Left,
  Button,
  Icon
} from "native-base";

/* story format

  story:{
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

*/

const story = props => {
  return (
    <Content>
      <Card>
        {/* profile photo, username and date header */}
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: props.story.shallowUser.profilePhoto
              }}
            />
            <Body>
              <Text>{props.story.shallowUser.username}</Text>
              <Text note>{props.story.date}</Text>
            </Body>
          </Left>
        </CardItem>

        {/* posted photo */}
        <CardItem cardBody>
          <Image
            source={require("../../../assets/shoes.jpg")}
            style={{ width: null, height: 200, flex: 1 }}
          />
        </CardItem>

        {/* icons below photo */}
        <CardItem style={{ height: 45 }}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart-outline" style={{ color: "black" }} />
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles-outline" style={{ color: "black" }} />
            </Button>
            <Button transparent>
              <Icon name="ios-send-outline" style={{ color: "black" }} />
            </Button>
          </Left>
        </CardItem>

        {/* description of post with username */}
        <CardItem>
          <Body>
            <Text>
              <Text style={{ fontWeight: "900" }}>
                {props.story.shallowUser.id}{" "}
              </Text>
              {props.story.description}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

export default story;
