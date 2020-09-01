import React, { Component } from 'react'
import { View, StyleSheet,KeyboardAvoidingView } from 'react-native'
import { addDeckContainer } from '../utils/helpers'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import SubmitButton from '../components/SubmitButton'
import StyledInput from '../components/StyledInput'
import PropTypes from 'prop-types'
import {white} from '../utils/colors'

class NewDeck extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
    }
    state = {
        value: '',
    }
    onChangeText = (value) => {
        this.setState(() => ({
            value
        }))
    }

    saveData = () => {
        const { dispatch } = this.props
        let title = this.state.value;
        addDeck(title)
            .then((newDeck) => {
                dispatch(addDeck(newDeck))
                this.toIndividualDeck(title)
            })

    }

    toIndividualDeck = (title) => {
        const { navigation } = this.props
        navigation.navigate('DeckView', { deckId: title })
    }

    render() {
        const { value } = this.state
        return (
            
            <View style={styles.container}>
                <StyledInput 
                  value={value} 
                  placeholder='Enter Deck title'
                  onChangeText={text => this.onChangeText(text)}/>
                  <SubmitButton
                    onPress = {this.saveData}
                    disabled={value===""}>CREATE NEW DECK
                    </SubmitButton>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: "space-around",
    },
});

export default connect()(NewDeck)