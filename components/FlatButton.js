import React, {Component} from 'react';
import {Text, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';


import {darkOrange, orange, white} from '../utils/colors'


export default function FlatButton({hasBorder, iconName, onPress, text, backgroundColor = orange, borderColor = orange}) {
    return (
        <View style={   !hasBorder ? [styles.button, {
            backgroundColor,
            borderColor
        }] : [styles.button, styles.buttonBorder, {borderColor}]   }>
            <TouchableNativeFeedback
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple("rgba(0, 0, 0, 0.5)", true)}>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <MaterialIcons name={iconName} style={{color: (hasBorder ? borderColor : white), marginRight: 1}}
                                   size={14}/>

                    <Text style={{color: (hasBorder ? borderColor : white)}}> { text } </Text>

                </View>

            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        marginRight: 10,
    },
    buttonBorder: {
        backgroundColor: null,
    }
})