import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Button } from "native-base";
import gStyles from "../../../config/styles";

/* Required, control props title, summary, onOk and onCancel methods */
const InfoModal = props => {
  return (
    <Modal
      animationIn={"zoomInUp"}
      animationOut={"zoomInDown"}
      isVisible={props.isVisible}
      onBackButtonPress={props.onCancel}
      onBackdropPress={props.onCancel}
    >
      <View style={styles.container}>
        <View>
          <Text style={[gStyles.textTitle, { fontWeight: "bold", borderBottomColor:'grey', marginBottom:20 }]}>
            {props.title}
          </Text>
        </View>
        <Text style={{marginBottom:40}}>{props.summary}</Text>

        <View style={{ flexDirection: "row", borderTopColor:'grey' }}>
          <Button block light onPress={props.onCancel} style={styles.cancel}>
            <Text style={{textAlign:'center',flex:1}}>Cancel</Text>
          </Button>
          <View style={{flex:2}}/>
          <Button block primary onPress={props.onOk} style={styles.ok}>
            <Text style={{textAlign:'center',flex:1}}>Ok</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginLeft: 1,
    marginRight: 1,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  title: {},
  ok: {
    flex:1,
    justifyContent: "flex-end",
    padding:16
  },
  cancel: {
    flex:1,
    justifyContent: "flex-start",
    padding:16    
  }
});
