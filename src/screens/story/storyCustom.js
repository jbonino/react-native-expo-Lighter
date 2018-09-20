import React from 'react';
import { Container, Content, Grid, Col, Row, Button, Card, CardItem, Footer, Left, Body, Right } from 'native-base';
import { Text, StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native'


/* story formary */
const story = {
  id: "12easd124ds",
  shallowUser: {
    id: "134234",
    name: "joben123",
    profilePhoto:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Guy_Kawasaki_at_Wikimania_2015_-_2.jpg/1200px-Guy_Kawasaki_at_Wikimania_2015_-_2.jpg"
  },
  photo: "",
  location: "gps cordinates from photo",
  date: '5/6/18',
  description: "this is me wearing assless chaps on mt kilmanjoro",
  grace: "50"
}

export default (props) => {
  return (
    <Content>
      <Row style={styles.container}>
        {/* donation colomn */}
        <Col size={15}>
          <View style={styles.lineSeperatorTop} />
          <View style={styles.imageContainer}>

            <Image style={styles.image} source={props.story.isDonated ? require('../../../assets/icons/donatedd.png') : require('../../../assets/icons/crap.png')} />

          </View>
          <Text style={{ alignSelf: 'center', paddingBottom: 5 }}>{props.story.isDonated ? 'Donated' : 'Adopted'}</Text>
          <View style={styles.lineSeperator} />
        </Col>

        {/* image column */}
        <Col style={styles.col} size={85}>
          <TouchableNativeFeedback onPress={() => props.onPress(props.story.id)}>

            <Card onPres style={styles.card}>
              {/* date */}
              <Text style={{ paddingStart: 10, paddingTop: 2, color: '#262626', fontFamily: 'PermanentMarker-Regular' }}>
                {/* TODO: fix date to be local */}
                {props.story ? props.story.date.slice(0,10) : null}
              </Text>
              {/* image */}
              <Image source={{ uri: props.story.photo }} style={styles.picture} />

              <CardItem style={{ paddingTop: 10 }}>
                <Body>
                  <Text >
                    <Text style={{ color: '#262626', fontFamily: 'PermanentMarker-Regular' }}>
                      {props.story.shallowUser.name ? (props.story.shallowUser.name).toUpperCase() : null}
                    </Text>
                    {"  "}{props.story.description}
                    <Text style={{ color: 'blue', fontSize: 16 }}>...</Text>
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableNativeFeedback >
        </Col>
      </Row>
    </Content>

  )
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  col: {
    paddingBottom: 20,
  },
  date: {
    padding: 5,
    alignSelf: 'center',
  },
  lineSeperator: {
    borderLeftColor: 'grey',
    borderLeftWidth: 2,
    alignSelf: 'center',
    height: '100%'
  },
  lineSeperatorTop: {
    borderLeftColor: 'grey',
    borderLeftWidth: 2,
    alignSelf: 'center',
    height: 20
  },
  picture: {
    height: 200,
    width: null,
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  card: {
  },
  imageContainer: {
    alignSelf: 'center',
    margin: 2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#1B98E0',
    padding: 5
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    fontFamily: 'PermanentMarker-Regular',
  }
});

