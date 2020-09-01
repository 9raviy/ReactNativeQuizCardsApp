import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavHome from './navigation/NavHome'
import reducer from './reducers'
import middleware from './middleware'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/helpers'
import { grey, white } from './utils/colors'
import Constants from 'expo-constants';


function StyledStatusBar() {
// settings for the statusbar
    return (
        <View style={{ backgroundColor: grey, height: Constants.statusBarHeight }}>
           <StatusBar translucent backgroundColor='#fff' barStyle="dark-content" />
        </View>
    )
}

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }
    render() {
    // display the home screen with build in navigation and connecting redux through provider
        return (
            <Provider store={createStore(reducer, middleware)} >
                <View style={styles.mainContainer} >
                    <StyledStatusBar />
                    <NavigationContainer >
                        <NavHome/>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }

}

const styles = StyleSheet.create({
// styling the main container
    mainContainer: {
        flex: 1,
        backgroundColor: white,
    },
});