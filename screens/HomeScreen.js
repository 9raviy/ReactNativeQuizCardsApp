import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Deck from './Deck'
import { getDecksData } from '../utils/helpers'
import { connect } from 'react-redux'
import { getData } from '../actions'
import PropTypes from 'prop-types'

class HomeScreen extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        decks: PropTypes.object.isRequired,
    }
    componentDidMount() {
// get data of all decks
        const { dispatch } = this.props
        getDecksData()
            .then((decks) => {
                dispatch(getData(decks))
            })
    }

    render() {
// display all decks existing in the application
        const { navigation, decks } = this.props
        return (
            <ScrollView style={styles.container}>
                {Object.keys(decks).map(id => 
                <Deck 
                    key={id} 
                    deck={decks[id]}
                    navigation={navigation}/>
                )}
            </ScrollView>
        );
    }

}

HomeScreen.navigationOptions = {
    header: null,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(HomeScreen)