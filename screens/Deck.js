import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import { blue, black } from '../utils/colors'
import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types'


class Deck extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        deck: PropTypes.object.isRequired,
    }
    state = {
        scaleValue: new Animated.Value(0) }

    startAnimation = () => {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 300
        }).start()
    }

    toDeckView = () => {
        const { navigation, deck } = this.props
        this.startAnimation()
        navigation.navigate('DeckDetails', { deckId: deck.title })
    }

    render() {
        const { deck } = this.props
        let { scaleValue } = this.state;
        return (
            <View style={styles.container}>
			<TouchableOpacity 
				style={styles.row}
				onPress={this.toDeckView}>
						<Animated.View
			 style={{
            transform: [
              { scale: scaleValue.interpolate({
			      inputRange: [0, 0.6, 1],
			      outputRange: [1, 0.6, 1]
			    }) }
            ],
          }}
        >
			<Text style={styles.cardTitle}>{deck.title}</Text>
			<Text style={styles.cardQuestion}>{deck.questions.length} quiz card(s)</Text>
		</Animated.View>
			</TouchableOpacity>
			<Divider style={{ backgroundColor: 'orange', height: 3 }} />
		</View>
        )
    }
}

export default Deck

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        padding: 10,
        marginTop: 10,
    },
    cardTitle: {
        color: black,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    cardQuestion: {
        fontSize: 15,
        textAlign: "center"
    }
});