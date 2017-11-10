import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Modal,
    StyleSheet,
    TextInput
} from 'react-native';

import { Icon, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { addLocation, updateAsyncStorage } from '../../actions/citiesAction';

class City extends Component {
    static navigationOptions = (props) => {
        const { name } = props.navigation.state.params.city
        return {
            title: name
        }
    }
    state = {
        location: {},
        modalVisible: false,
    }

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible })
    }

    addLocation = () => {
        const { name } = this.props.navigation.state.params.city
        const { addLocation } = this.props;
        if (!this.state.location['name'] || !this.state.location['type']) return
        addLocation(name, this.state.location)
        this.setState({
            location: {}
        }, () => {
            this.props.updateAsyncStorage();
        })
        this.nameRef.focus();
    }

    updateInput = (key, value) => {
        this.setState({
            location: {
                ...this.state.location,
                [key]: value,
            }
        })
    }

    render() {
        const { locations } = this.props;
        return (
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Icon
                        underlayColor='#9C27B0'
                        onPress={this.toggleModal}
                        raised
                        icon
                        color='white'
                        containerStyle={{ backgroundColor: '#9C27B0', position: 'absolute', bottom: 10, right: 10 }}
                        name='add'
                    />


                    {
                        locations.map((location, index) => (
                            <View key={index}>
                                <Card
                                    title={location.name}
                                >
                                    <Text style={{ marginBottom: 10 }}>
                                        Type: {location.type}
                                    </Text>
                                    {
                                        location.address && (
                                            <Text style={{ marginBottom: 10 }}>
                                                Address: {location.address}
                                            </Text>
                                        )
                                    }
                                    {
                                        location.notes && (
                                            <Text>
                                                Notes: {location.notes}
                                            </Text>
                                        )
                                    }
                                </Card>
                            </View>
                        ))
                    }
                    <Modal
                        onRequestClose={this.toggleModal}
                        animationType='slide'
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>
                                New Location in {this.props.navigation.state.params.city.name}
                            </Text>

                            <TextInput
                                ref={name => this.nameRef = name}
                                value={this.state.location['name']}
                                onChangeText={(value) => this.updateInput('name', value)}
                                placeholder='Name'
                                style={styles.input}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                value={this.state.location['type']}
                                onChangeText={(value) => this.updateInput('type', value)}
                                placeholder='Type'
                                style={styles.input}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                value={this.state.location['address']}
                                onChangeText={(value) => this.updateInput('address', value)}
                                placeholder='Address'
                                style={styles.input}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                value={this.state.location['notes']}
                                onChangeText={(value) => this.updateInput('notes', value)}
                                multiline
                                placeholder='Notes'
                                style={styles.multilineInput}
                                underlineColorAndroid='transparent'
                            />

                            <Button
                                containerViewStyle={{ marginLeft: 10, marginRight: 10 }}
                                onPress={this.addLocation}
                                title='Add Location'
                                backgroundColor='#8e8e8e'
                            />

                            <Button
                                containerViewStyle={{ position: 'absolute', bottom: 20 }}
                                title='Close'
                                onPress={this.toggleModal}
                            />

                        </View>
                    </Modal>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    title: {
        marginTop: 60,
        fontSize: 23,
        marginBottom: 8,
        textAlign: 'center'
    },
    input: {
        height: 55,
        backgroundColor: '#e2e2e2',
        marginHorizontal: 10,
        marginBottom: 9,
        padding: 9
    },
    multilineInput: {
        height: 145,
        backgroundColor: '#e2e2e2',
        marginHorizontal: 10,
        marginBottom: 9,
        padding: 9,
        fontSize: 16
    }
});

function mapStateToProps(state, ownProps) {
    const { name } = ownProps.navigation.state.params.city;
    return {
        locations: state.citiesReducer.cities[name]['locations']
    }
}

export default connect(mapStateToProps, { addLocation, updateAsyncStorage })(City);