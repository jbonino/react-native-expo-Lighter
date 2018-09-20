import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Scanner from '../../components/UI/Camera/Scanner'

export default class CameraTab extends Component {
  render() {
    return (
      <Scanner />
    );
  }
}

const styles = StyleSheet.create({
  camera:{
    height:'100%',
    alignContent: 'flex-start',
  }
});
