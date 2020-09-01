import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {  white, orange, grey } from '../utils/colors'
import PropTypes from 'prop-types'

export default function SubmitBtn({ children, onPress, disabled = false, style = {} }) {
    return (
        <TouchableOpacity
            style={disabled
              ? [styles.btn, style, {backgroundColor: orange}]
              : [styles.btn, style]
            }
            onPress = {onPress}
            disabled = {disabled}>
            <Text style={styles.btnText}> {children} </Text>
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        
        backgroundColor: orange,
        borderRadius: 10,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 80,
        marginRight: 80,
    },
    btnText: {
        color: white,
        textAlign: 'center',
    }
});

SubmitBtn.propTypes = {
    children: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
    disabled: PropTypes.bool
}