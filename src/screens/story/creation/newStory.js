import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Form, Input, Container, Content, Item, Label, Picker, Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import * as actionsFirebase from '../../../store/actions/firebase'

class NewStory extends Component {

    state = {
        selected: 0,
        storyboardName: '',
        uploading: false,
        photoUri: "",
        description: "",

    }


    componentWillMount() {
        let photoUri = this.props.navigation.state.params.photo;
        if (photoUri) this.setState({ photoUri: photoUri })
    }

    _onShareHandler = () => {
        //new image
        this.props.uploadStoryboardWithStory(this.state.storyboardName, this.state.description, this.state.photoUri)
        //navigate to profile
        this.props.navigation.navigate('Profile');

    }

    render() {
        /* TODO: sspinner if loading */
        return (
            <Container>
                <Content>
                    <Form>
                        {this.renderStoryboardPicker()}
                        <Image
                            style={{ height: 300, width: null, flex: 1, marginTop: 5, marginBottom: 5 }}
                            source={{ uri: this.state.photoUri }} >

                        </Image>
                        <Item>
                            <Label>Description</Label>
                            <Input
                                onChangeText={text => this.setState({ description: text })}
                                value={this.state.description}

                            />
                        </Item>
                        <Button block rounded light
                            style={{ marginTop: 5 }}
                            onPress={() => this._onShareHandler()}>
                            <Text>Share</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }

    renderStoryboardPicker = () => {
        return <View><Item>
            <Label>Storyboard</Label>
            <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="arrow-dropdown-circle"
                    style={{ color: "#007aff", fontSize: 25 }} />}

                style={{ width: undefined }}
                selectedValue={this.state.selected}
                onValueChange={(value) => { this.setState({ selected: value }) }}
            >
                <Picker.Item label="New Storyboard" value="0" />
                {/* render array from user storyboards up to 5*/}
                <Picker.Item label="Storyboard 1" value="1" />
                <Picker.Item label="Storyboard 2" value="2" />
                <Picker.Item label="Storyboard 3" value="3" />
                {/* hint: cant find your storyboard? add story
            OR
            You can only create a new storyboard in this flow.
        */}
            </Picker>
        </Item>
            {this.state.selected === 0
                ?
                <Item>
                    <Label>Name</Label>
                    <Input
                        onChangeText={text => this.setState({ storyboardName: text })}
                        value={this.state.storyboardName}
                    />
                </Item>
                :
                null
            }
        </View>

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        uploadStoryboardWithStory: (storyboardName, description, photoUri) => dispatch(actionsFirebase.uploadStoryboardWithStory(storyboardName, description, photoUri)),
    }
}

export default connect(null, mapDispatchToProps)(NewStory)
