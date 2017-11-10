import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { updateAsyncStorage } from '../../actions/citiesAction';

import { KEY } from '../../constants';
import PropTypes from 'prop-types';

class Cities extends Component {
    static navigationOptions = {
        headerTitle: <Image style={{ marginTop: -3, height: 32, width: 120 }} resizeMode='contain' source={require('../../assets/citieslogo.png')} />
    };

    compoonentDidMount() {
        const { updateAsyncStorage } = this.props;
        AsyncStorage.getItem(KEY)
            .then(data => {
                console.log('data: ', JSON.parse(data));
                if (!data) return;
                const cities = JSON.parse(data);
                updateAsyncStorage(cities.citiesReducer)
            })
            .catch(err => {
                console.log('error in cities componentDidMount')
                console.log('err :', err)
            })
    }

    render() {
        const { navigation } = this.props;
        const cities = Object.values(this.props.cities);
        console.log(cities);

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    cities.map((city, index) =>
                        (<ListItem
                            key={index}
                            containerStyle={{ borderBottomColor: '#e5e5e5' }}
                            title={city.name}
                            onPress={() => navigation.navigate('City', { city })}
                        />)
                    )
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        cities: state.citiesReducer.cities,
    }
}

export default connect(mapStateToProps, { updateAsyncStorage })(Cities);