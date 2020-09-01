import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import SubmitButton from '../components/SubmitButton'
import { removeDeck } from '../actions'
import { deleteDeck } from '../utils/helpers'
import PropTypes from 'prop-types'
import {orange, blue, grey} from '../utils/colors'


class DeckDetails extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        deck: PropTypes.object,
    }
    toNewQuestion = () => {
        const { deck, navigation } = this.props
        navigation.navigate('NewQuestion', { deckId: deck.title })
    }
    toQuiz = () => {
        const { deck, navigation } = this.props
        navigation.navigate('Quiz', { deck })
    }
    onDelete = () => {
        const { deck, dispatch, navigation } = this.props
        deleteDeck(deck.title)
            .then(() => {
                dispatch(removeDeck(deck.title))
                navigation.navigate('Root')
            })
    }

    render() {
        const { deck, navigation } = this.props
        let title = ''
        let numQuestions = 0
    
        if (deck !== undefined) {
            numQuestions = deck.questions.length
            title = deck.title
        }

        return (
            <View style={styles.container}>
				<View>
					<Text style={styles.titleText}>{title} Quiz Deck</Text>
					<Text style={styles.smallText}>{numQuestions} card(s)</Text>
				</View>
				<View>
					<SubmitButton
						onPress={this.toNewQuestion}>
						Add Quiz Card
					</SubmitButton>
					<SubmitButton
						onPress={this.toQuiz}>
						Start Quiz
					</SubmitButton>
                </View>
                <View>
			        <TouchableOpacity onPress = {this.onDelete}>
                        <Text style={styles.deleteText}>Delete this Quiz Deck</Text>
                    </TouchableOpacity>
                </View>
				
			</View>
        )
    }

}

function mapStateToProps(state, { route }) {
    const { deckId } = route.params
    return {
        deck: state[deckId]
    }
}
export default connect(mapStateToProps)(DeckDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30
    },
    smallText: {
        textAlign: 'center',
        fontSize: 20,
        color: grey
    },
    deleteText: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20
    }

});