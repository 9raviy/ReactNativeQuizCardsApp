import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { white, grey } from '../utils/colors'
import PropTypes from 'prop-types'

export default function StyledInput({ value, placeholder, onChangeText, style = {} }) {
    return (
        <TextInput
            style={styles.inputText}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
          />
    )
}



const styles = StyleSheet.create({
    inputText: {
        
        height: 50,
        borderColor: grey,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
});

StyledInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
}