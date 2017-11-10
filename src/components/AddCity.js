import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCity, updateAsyncStorage } from '../actions/citiesAction';

const { width } = Dimensions.get('window');

class AddCity extends Component {
    state = {
        input: {}
    }

    updateInput = (key, value) => {
        this.setState({
            input: {
                ...this.state.input,
                [key]: value
            }
        });
    }

    submit = () => {
        console.log(this.props);
        if (!this.state.input['country'] || !this.state.input['name']) return
        const { addCity } = this.props;
        addCity(this.state.input)
        this.setState({ input: {} }, () => {
            this.props.updateAsyncStorage();
        })
        this.nameRef.focus()
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('../assets/citieslogo.png')}
                />
                <TextInput
                    ref={name => this.nameRef = name}
                    value={this.state.input['name']}
                    placeholder='City name'
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    style={styles.textInput}
                    onChangeText={(value) => this.updateInput('name', value)}
                />
                <TextInput
                    value={this.state.input['country']}
                    placeholder='Country name'
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    autoCorrect={false}
                    onChangeText={(value) => this.updateInput('country', value)}
                />
                <Button
                    buttonStyle={{ marginTop: 8 }}
                    title='Submit'
                    backgroundColor='#8e8e8e'
                    onPress={this.submit}
                />
            </View>
        );
    }
}

export default connect(null, { addCity, updateAsyncStorage })(AddCity);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9C27B0',
    },
    logo: {
        maxHeight: 36,
        maxWidth: width,
        marginTop: 100,
        alignItems: 'center'
    },
    textInput: {
        height: 55,
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: 8,
        padding: 9
    }
});