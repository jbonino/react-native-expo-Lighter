import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";


const { width, height } = Dimensions.get("window");
const imagesPerRow = 3;
const gutter = 2;

import CacheImage from '../UI/CacheImage/CacheImage'

export default class Gallery extends Component {
  /* TODO: should be passed an array of images 
    images: []
  */
  render() {
    if(!this.props.images) return (null);/* TODO: add a component to ask to add new images! start minimilism game */
    let images = this.props.images.map((img, index, array) => {
      return (
        <TouchableNativeFeedback key={index} onPress={() => this.props.onPress(index)}>
          <View
            style={[
              styles.imageWrapper,
              index % imagesPerRow !== 0
                ? { paddingLeft: gutter }
                : { paddingLeft: 0 }
            ]}
          >
            <CacheImage
              uri={array[index]}
              style={styles.image}
            />
          </View>
        </TouchableNativeFeedback>
      );
    });
    
    return <View style={styles.galleryContainer}>{images}</View>;
  }
}

const styles = StyleSheet.create({
  galleryContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  imageWrapper: {
    height: width / imagesPerRow,
    width: width / imagesPerRow,
    backgroundColor: "#fff",
    paddingBottom: gutter
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: "stretch"
  }
});
