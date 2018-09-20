import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';

import { Camera, Permissions, BarCodeScanner, ImagePicker } from "expo";
import { Content, Container, Header, Icon, Left, Right, Body, Toast } from 'native-base';
import { withNavigation } from 'react-navigation';



class scanner extends Component {
    state = {
        hasCameraPermission: null,
        qrCodeAlertDisplayed: false,
        camera: null,
        image: null,
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }



    render() {
        return (
            <View style={styles.container}>
                {/* if */}
                {this.state.hasCameraPermission === null
                    ? //!null
                    <Text>Requesting for camera permission</Text>
                    : //null
                    this.state.hasCameraPermission === false
                        ? //false permission
                        <Text>Camera permission is not granted</Text>
                        : //true permission
                        <Camera
                            ref={ref => { this.camera = ref }}
                            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                            onBarCodeRead={this._handleBarCodeRead}
                            style={styles.camera}
                        >
                            <Header style={styles.header}>
                                <Icon onPress={this._pickImage}
                                    name={'ios-images'}
                                    style={{ color: '#1B98E0', fontSize: 36, }}
                                />
                            </Header>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                                <Icon
                                    onPress={this._handleCameraPress}
                                    name={'md-radio-button-off'}
                                    style={{ color: '#1B98E0', fontSize: 100, alignSelf: 'center' }} />
                            </View>

                        </Camera>
                }
            </View>
        )
    }

    _handleCameraPress = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 0 })
                .catch(error => {
                    console.log('error in _handleCameraPress -> takePictureAsync')
                    console.log(error)
                })

            this.props.navigation.navigate('NewStory', {
                photo: photo.uri
            })
        }

    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.props.navigation.navigate('NewStory', {
                photo: result.uri
            })
        }
        else Toast.show({
            text: 'Canceled',
            buttonText: "Okay",
            duration: 2000
        })

    };

    _handleBarCodeRead = async ({ type, data }) => {
        /* to defeat multiple reads one after another */
        if (!this.state.qrCodeAlertDisplayed) {
            await this.setState({ qrCodeAlertDisplayed: true })
            Alert.alert(
                'Storyboard Found!',
                'Would you like to view this items life?',
                [
                    { text: 'No', onPress: async () => await this.setState({ qrCodeAlertDisplayed: false }), style: 'cancel' },
                    { text: 'OK', onPress: async () => { await this.setState({ qrCodeAlertDisplayed: false }); this._handleStoryBoardNavigation(data) } },
                ],
                { cancelable: false }
            )
        }
    }

    _handleStoryBoardNavigation = (data) => {
        //data is storyboard id
        this.props.navigation.navigate('StoryboardCustom', { storyboardId: data })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: 'transparent',
        zIndex: 100,
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'flex-start',
    }
});

export default withNavigation(scanner);