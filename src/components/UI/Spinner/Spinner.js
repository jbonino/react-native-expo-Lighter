import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import StickAndBall from "../../../../assets/fallbacks/StickAndBall.json";
export default class Spinner extends React.Component {
    state = {
        animation: null,
    };

    componentWillMount() {
        this._playAnimation();
    }

    render() {
        return (
            <View style={styles.animationContainer}>
                <Text style={{color:'#eee'}}>Loading..</Text>
                {this.state.animation &&
                    <Lottie
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={{
                            width: 400,
                            height: 400,
                            backgroundColor: '#1B98E0',
                        }}
                        source={this.state.animation}
                    />}
            </View>
        );
    }

    _playAnimation = () => {
        if (!this.state.animation) {
            this._loadAnimationAsync();
        } else {
            this.animation.reset();
            this.animation.play();
        }
    };

    _loadAnimationAsync = async () => {
        this.setState({ animation: StickAndBall }, this._playAnimation);
    };

}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#1B98E0',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
