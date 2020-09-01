import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/helpers'
import { addQuestion } from '../actions'
import SubmitButton from '../components/SubmitButton'
import StyledInput from '../components/StyledInput'
import PropTypes from 'prop-types'

class NewQuestion extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
    }
    state = {
        question: '',
        answer: ''
    }

    onChangeText(name) {
        return (text) => {
            this.setState(() => ({
                [name]: text
            }))
        }
    }

    onSubmit = () => {
        const { deckId } = this.props.route.params
        const { dispatch } = this.props
        const card = this.state
        addCardToDeck(deckId, card)
            .then(() => {
                dispatch(addQuestion(deckId, card))
            })
        this.toDeckView()
    }

    toDeckView = () => {
        const { deckId } = this.props.route.params
        const { navigation } = this.props
        navigation.navigate('DeckView', { deckId })
    }

    render() {
        const { question, answer } = this.state
        return (
            <View style={styles.container}>
				<View>
					<Text style={styles.titleText}>Question</Text>
					<StyledInput
				      onChangeText={this.onChangeText('question')}
				      value={question}
				      placeholder="React native has been invented by which company?"
				    />
				    <Text style={styles.titleText}>Answer</Text>
					<StyledInput
				      onChangeText={this.onChangeText('answer')}
				      value={answer}
				      placeholder="Facebook"
				    />
			    </View>
			    <View>
				    <SubmitButton 
				    	onPress={this.onSubmit}
				    	disabled={question==="" || answer===""}>Add Question</SubmitButton>
			    </View>
			</View>
        )
    }
}


export default connect()(NewQuestion)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
    },
    titleText: {
        textAlign: 'center',
        fontSize: 20
    },
});