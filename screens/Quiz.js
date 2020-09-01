import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'
import SubmitButton from '../components/SubmitButton'
import PropTypes from 'prop-types'
import { Ionicons } from "@expo/vector-icons";

export default class Quiz extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
    }
    state = {
        showAnswer: false,
        quizCompleted: false,
        currentQuestion: {},
        indexQuestion: 1,
        totalCorrect: 0
    }
    componentDidMount() {
    // start the quiz component
        this.startQuiz()
    }

    startQuiz = () => {
        const { deck } = this.props.route.params
        if (deck.questions.length > 0) {
            this.quizInitialize()
        }
        clearLocalNotification()
            .then(setLocalNotification)
    }
    quizInitialize = () => {
    // initialize the quiz
        const { deck } = this.props.route.params;
        this.setState(() => ({
            showAnswer: false,
            quizCompleted: false,
            currentQuestion: deck.questions[0],
            indexQuestion: 1,
            totalCorrect: 0
        }))
    }
    submitAnswer = (correctAnswer) => {
        // Update the number of correct answers
        if (correctAnswer) {
            this.setState((prevState) => ({
                totalCorrect: prevState.totalCorrect + 1
            }))
        }
        // check if the quiz is completed
        const { deck } = this.props.route.params

        if (this.state.indexQuestion === deck.questions.length) {
            this.setState(() => ({
                quizCompleted: true,
            }))
        } else {
            this.getNextQuestion()
        }
    }

    getNextQuestion = () => {
    // get the next question to display
        const { deck } = this.props.route.params
        const indexQuestion = this.state.indexQuestion + 1
        const currentQuestion = deck.questions[indexQuestion - 1]
        this.setState((prevState) => ({
            showAnswer: false,
            currentQuestion,
            indexQuestion
        }))
    }
    goHome = () => {
    // display the Home screen with deckview
        const { navigation } = this.props;
        const { deck } = this.props.route.params;
        navigation.dispatch(CommonActions.goBack({
            key: 'DeckView'
        }))
    }
    onToggle = () => {
        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }))
    }
    render() {
        const { currentQuestion, indexQuestion, totalCorrect, showAnswer, quizCompleted } = this.state
        const { deck } = this.props.route.params
        const totalQuestions = deck.questions.length
        // prompt user to enter quiz cards if quiz is currently empty
        if (currentQuestion.question === undefined) {
            return (
                <View style={styles.center}>
					<Text style={styles.textTitle}> To play add new cards as the quiz is currently empty</Text>
					<Ionicons name={"ios-hand"} size={110} />
				</View>
            )
        }
        // display the final score if the quiz is completed
        if (quizCompleted) {
            return (
                <View style={styles.centered}>
					<Text style={styles.textTitle}>Correct Answer(s): {totalCorrect} / {totalQuestions}</Text>
					<View>
						<SubmitButton
							onPress={this.quizInitialize}>
							Restart the Quiz
						</SubmitButton>
						<SubmitButton
							onPress={this.goHome}>
							Go Back to Deck
						</SubmitButton>
					</View>
				</View>
            )
        }
        return (
            <View style={styles.container}>
				<Text>{indexQuestion}/{totalQuestions}</Text>
				<View style={styles.centered}>
					<View>
						<Text style={styles.textTitle}>
							{showAnswer
								? currentQuestion.answer
								: currentQuestion.question
							}
                        </Text>
						<SubmitButton
							onPress={this.onToggle}>
							{showAnswer
								? 'Question'
								: 'Show Answer'
							}
						</SubmitButton>
					</View>
					<View>
						<SubmitButton
							style={{backgroundColor: 'green'}}
							onPress={() => this.submitAnswer(true)}>
							Correct answer
						</SubmitButton>
						<SubmitButton
							style={{backgroundColor: 'red'}}
							onPress={() => this.submitAnswer(false)}>
							Incorrect answer
						</SubmitButton>
					</View>
				</View>
			</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-around'
    },
    centered: {
        flex: 1,
        justifyContent: 'space-around'
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 30
    },

});