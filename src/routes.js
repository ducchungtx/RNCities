import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import CityRouter from './components/Cities/CityRouter';
import AddCity from './components/AddCity';

const TabConfig = {
    CityTab: {
        screen: CityRouter,
        navigationOptions: {
            tabBarLabel: 'Cities',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./assets/cityicon.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            )
        }
    },
    AddCity: {
        screen: AddCity,
        navigationOptions: {
            tabBarLabel: 'Add City',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./assets/addicon.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            )
        }
    }
}

const TabStyleConfig = {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#9C27B0',
        inactiveTintColor: '#666',
        showIcon: true,
        indicatorStyle: {
            backgroundColor: '#666'
        },
        style: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#ededed'
        },
    },
}

export default App = TabNavigator(TabConfig, TabStyleConfig);

const styles = StyleSheet.create({
    icon: {
        width: 28,
        height: 28
    }
})