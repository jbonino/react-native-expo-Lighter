import React, { Component } from "react";
import CacheImage from "../../components/UI/CacheImage/CacheImage";

export default class ImageElement extends Component {
  render() {
    return (
      <CacheImage
        source={this.props.imgSource}
        style={{
          flex: 1,
          width: null,
          alignSelf: "stretch"
        }}
      />
    );
  }
}
